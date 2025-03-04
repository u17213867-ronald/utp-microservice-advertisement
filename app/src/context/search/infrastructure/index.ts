import { AdvertisementSolrRepository } from "./repositories/advertisement.solr.repository"
import { AdvertisementSearchRepository } from "@search/domain/repositories/advertisement.search.repository"
import { ConfigService } from '@common/infrastructure/services/config.service';

// search module entry point
export const AdvertisementSolrProvider = {
    provide: AdvertisementSearchRepository,
    useFactory: async (config: ConfigService) => {
      return new AdvertisementSolrRepository(config)
    },
    inject: [ConfigService],
  }
export const Infrastructure = [
  AdvertisementSolrProvider
]
  