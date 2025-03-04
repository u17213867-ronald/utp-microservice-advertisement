import { GetSearchEngineInput } from '@search/application/dto/advertisement-filter-input.dto';
import { HttpStatus, Injectable } from '@nestjs/common'
import { SearchEngineFilter } from '@common/domain/model/search/search-engine-filter'
import { AdvertisementResponseDto } from '@search/domain/dto/advertisement-response-dto'
import { type SearchEngineServiceResponseDto } from '@search/application/dto/search-engine.response.dto'
import { BaseException } from '@common/application/exceptions/base.exception'
import { AdvertisementSearchRepository } from '@search/domain/repositories/advertisement.search.repository';

@Injectable()
export class SearchAdvertisementsService {
  constructor(private readonly solrRepository: AdvertisementSearchRepository) {}

  public async execute(request: GetSearchEngineInput): Promise<SearchEngineServiceResponseDto> {
    try {
      const query = new SearchEngineFilter()
      if (request.filters) query.setFilterQuery(request.filters)
      query.setSort(request.sort)
      if (request.facets) query.setFacets(request.facets)
      if (request.page) request.page = Number(request.page)
      const { result, page, limit, images } = await this.solrRepository.search(request.page, request.limit, query)

      const searchResponse = new AdvertisementResponseDto(
        result.response.docs, page, result.response.numFound, images
      )
      searchResponse.setFacets(
        request.facets, 
        result?.facet_counts,
        query.getFilterQueryString()
      )

      return {
        facets: searchResponse.facets,
        items: searchResponse.getDocs(),
        total: searchResponse.getTotal(),
        page: page,
      }
    } catch (error: any) {
      if (!(error instanceof Error)) {
        throw error
      }

      throw new BaseException(HttpStatus.BAD_REQUEST, 'Input', error)
    }
  }
}
