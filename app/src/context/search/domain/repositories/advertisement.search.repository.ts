import { SearchEngineFilter } from '@common/domain/model/search/search-engine-filter'
import { AdvertisementModel } from '../model/advertisement.model'
import { SearchResultInterface } from '@search/domain/advertisement.interface'

export abstract class AdvertisementSearchRepository {
  addAll: (params: AdvertisementModel[]) => Promise<void>
  deleteByQuery: (query: string) => Promise<void>
  search: (page: number, limit: number, query: SearchEngineFilter) => Promise<SearchResultInterface>
}

