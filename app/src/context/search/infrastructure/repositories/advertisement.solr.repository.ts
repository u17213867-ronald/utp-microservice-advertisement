import { SearchDto } from './../../../common/domain/dto/search.dto';
import { BabRequestInfrastructureSolrException } from '@search/infrastructure/exception/bab-request-infrastructure-solr.exception';
import { CoreEnum } from '@common/domain/enum/core.enum';
import { type ConfigService } from '@common/infrastructure/services/config.service'
import { HttpStatus, Injectable } from '@nestjs/common'
import { SolrRepository } from '@common/infrastructure/repositories/solr.repository';
import { SearchResultInterface } from '@search/domain/advertisement.interface'
import { type SearchEngineFilter } from '@common/domain/model/search/search-engine-filter'
import { FACET_QUERY } from '../../domain/enum/facet.enum';
import { type Query } from 'solr-client'
import { AdvertisementSearchRepository } from '../../domain/repositories/advertisement.search.repository';

@Injectable()
export class AdvertisementSolrRepository extends SolrRepository implements AdvertisementSearchRepository {
  protected images: any= [];
  constructor(private readonly config: ConfigService) {
    super(
      config.get('HOST_CORE_ADVERTISEMENT'),
      config.get('PORT_CORE_ADVERTISEMENT'),
      config.get('USER_CORE_ADVERTISEMENT'),
      config.get('PASSWORD_CORE_ADVERTISEMENT'),
      CoreEnum.ADVERTISEMENT,
    )
    this.images = config.getFilter([
      'HOST_CDE',
      'IMAGE_LARGE',
      'IMAGE_MEDIUM',
      'IMAGE_SMALL',
      'IMAGE_XLARGE',
      'IMAGE_LARGE_CONCESSIONAIRE',
      'IMAGE_MEDIUM_CONCESSIONAIRE',
      'IMAGE_SMALL_CONCESSIONAIRE',
      'IMAGE_XLARGE_CONCESSIONAIRE',
      'IMAGE_DEFAULT',
      'IMAGE_STORE',
      'IMAGE_OFFER_STRIPE',
      'IMAGE_OFFER_TAG',
      'MODEL_FILE',
    ])
  }
  async addAll(documents: object[]): Promise<void> {
    try {
        if (!documents || documents.length === 0) {
            throw new Error("No hay documentos para indexar en Solr.");
        }
        documents.forEach(async (document) => {
          console.log("Documents to index:", JSON.stringify(document)); 

          await this.indexDocument(document);
        })
    } catch (error) {
        console.error("Error adding Solr documents:", error);
        await this.handlerNetworkErrors(error);
    }
  }
  async search(page: number, limit: number, query: SearchEngineFilter): Promise<SearchResultInterface> {
    try {

      const querySolr = await this.query(page, limit, query)
      let queryString = query.getFilterQueryString()
      queryString = queryString.length > 0 ? `${queryString} AND` : ''
      query.getFacets().forEach((value) => {
        const field = value
        if (FACET_QUERY[value] !== undefined) {
          FACET_QUERY[value].filter.forEach((items) => {
            querySolr.facet({
              on: true,
              field,
              limit: 700,
              query: `${queryString} ${String(items.query)}`,
              pivot: field,
            })
          })
        } else {
          querySolr.facet({ on: true, field, pivot: field })
        }
      })

      const responseSearch = await this.performQuerySearch(querySolr)
      const result: SearchDto = (await responseSearch) as SearchDto

      return { result: result, page: page, limit:limit, images: this.images }
    } catch (error: any) {
      await this.handlerNetworkErrors(error)
    }
  }

  public async performQuerySearch(query: Query): Promise<any> {
    try {
        const response = await this.client.search(query);
        
        if (!response || !response.response) {
            throw new BabRequestInfrastructureSolrException(
                HttpStatus.BAD_REQUEST,
                "Invalid Solr response",
                response
            );
        }

        return response.response;
    } catch (error) {
        console.error("Error fetching Solr documents:", error);
        throw new BabRequestInfrastructureSolrException(
            HttpStatus.INTERNAL_SERVER_ERROR,
            error instanceof Error ? error.message : "Unknown error",
            error
        );
    }
  }
}
