import { BadRequestInfrastructureException } from '@common/infrastructure/exceptions/bad-request-infrastructure.exception';
import { type Client, createClient, type Query } from 'solr-client'
import { CoreEnum } from '@common/domain/enum/core.enum'
import { type SearchEngineFilter } from '@common/domain/model/search/search-engine-filter'
import { HttpStatus } from '@nestjs/common'
const networkErrors = ['ECONNREFUSED', 'ECONNRESET', 'ETIMEDOUT', 'EAI_AGAIN', 'ENETUNREACH', 'UND_ERR_CONNECT_TIMEOUT']

export class SolrRepository {
  public client: Client

  protected images: {
    HOST_CDE: string
    IMAGE_LARGE: string
    IMAGE_MEDIUM: string
    IMAGE_SMALL: string
    IMAGE_XLARGE: string
    IMAGE_LARGE_CONCESSIONAIRE: string
    IMAGE_MEDIUM_CONCESSIONAIRE: string
    IMAGE_SMALL_CONCESSIONAIRE: string
    IMAGE_XLARGE_CONCESSIONAIRE: string
    IMAGE_DEFAULT: string
    IMAGE_STORE: string
    IMAGE_OFFER_STRIPE: string
    IMAGE_OFFER_TAG: string
    MODEL_FILE: string
  }

  constructor(host: string, port: string, user: string, password: string, core: string = CoreEnum.ADVERTISEMENT) {
    this.client = createClient({
      host,
      port: Number(port),
      core,
    })
    console.log('createClient: ', {
      host,
      port: Number(port),
      core,
    })
    this.client.basicAuth(user, password)
  }



  public async deleteByQuery(query: string): Promise<void> {
    try {
        await this.client.deleteByQuery(query);
        await this.commitDocuments();
    } catch (error) {
        console.error("Error deleting Solr documents:", error);
        await this.handlerNetworkErrors(error);
    }
  }

  // Método privado que envuelve el commit de Solr en una Promesa
  private commitChanges(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.commit((err, result) => {
        if (err) {
          return reject(err);
        }
        console.log('Commit realizado:', result);
        resolve();
      });
    });
  }
  
  // Método público asíncrono para indexar un documento
  public async indexDocument(document: object): Promise<void> {
    try {
      await this.addDocument(document);
      await this.commitChanges();
      console.log('Documento indexado y commit realizado con éxito.');
    } catch (error) {
      console.error('Error al indexar documento:', error);
    }
  }

  private addDocument(document: object): Promise<void> {
    return new Promise((resolve, reject) => {
      
      this.client.add(document, (err, result) => {
        if (err) {
          return reject(err);
        }
        console.log('Documento agregado:', result);
        resolve();
      });
    });
  }

  public async commitDocuments(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.commit((error: any, response: any) => {
        if (error) {
          console.error('Error committing Solr documents:', JSON.stringify(error, null, 2))
          reject(error)
        } else {
          resolve()
        }
      })
    })
  }

  public async query(page: number, limit: number, query: SearchEngineFilter): Promise<Query> {
    try {
      const querySolr: Query = this.client.query().q('*:*')
      querySolr.requestHandler(query.getHandler())

      const start = page === 1 ? 0 : limit * (page - 1)
      querySolr.start(start).rows(limit)
      querySolr.sort(query.getSort())

      query.getFilterQuery().forEach((items) => {
        querySolr.matchFilter(items.field, items.value)
      })
      return querySolr
    } catch (error: any) {
      await this.handlerNetworkErrors(error)
    }
  }

  private validateGroupFilter(queryString: string, value: string): string {
    return queryString.includes('vehicleTypeSlug:motos') && value === 'price' ? 'price_motos' : value
  }

  public async performQuerySearch(query: Query): Promise<any> {
    try {
        const response = await this.client.search(query);
        
        if (!response || !response.response) {
            throw new BadRequestInfrastructureException(
                HttpStatus.BAD_REQUEST,
                "Invalid Solr response",
                response
            );
        }

        return response.response;
    } catch (error) {
        console.error("Error fetching Solr documents:", error);
        throw new BadRequestInfrastructureException(
            HttpStatus.INTERNAL_SERVER_ERROR,
            error instanceof Error ? error.message : "Unknown error",
            error
        );
    }
  }


  async handlerNetworkErrors(error: any): Promise<void> {
    if (error instanceof BadRequestInfrastructureException) {
      throw error
    }

    if (error?.code && networkErrors.includes(String(error.code))) {
      throw new BadRequestInfrastructureException(HttpStatus.INTERNAL_SERVER_ERROR, error.message, error)
    }

    throw new BadRequestInfrastructureException(HttpStatus.BAD_REQUEST, 'Request HTTP error 400', error)
  }
}
