import { Injectable } from "@nestjs/common"
import { AdvertisementSearchRepository } from "@search/domain/repositories/advertisement.search.repository";


@Injectable()
export class DeleteService {
  constructor(
    private readonly solrRepository: AdvertisementSearchRepository
  ) {}

  public async execute(request: any): Promise<void> {
    try {
      const deleteQuery = request.ids.map(item => `id:(${item})`).join(" OR ");
      await this.solrRepository.deleteByQuery(deleteQuery)

    } catch (error) {
      console.error('Error al eliminar:', error)
    }
  }
}
