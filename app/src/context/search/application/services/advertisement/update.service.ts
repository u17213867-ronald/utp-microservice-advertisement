import { Injectable, HttpStatus } from "@nestjs/common"
import { BaseException } from "@src/context/common/application/exceptions/base.exception"
import { AdvertisementSearchRepository } from "@search/domain/repositories/advertisement.search.repository";

@Injectable()
export class UpdateService {
  constructor(
    private readonly solrRepository: AdvertisementSearchRepository
  ) {}

  public async execute(request: any): Promise<void> {

    if (request.length > 0) {

      const deleteQuery = request.map(item => `id:(${item.id})`).join(" OR ");
      console.log('deleteQuery: ',deleteQuery)

      await this.solrRepository.deleteByQuery(deleteQuery)

      await this.solrRepository.addAll(request)
    } else {
      throw new BaseException(HttpStatus.NOT_FOUND, 'No hay datos.', [])
    }
  }
}
