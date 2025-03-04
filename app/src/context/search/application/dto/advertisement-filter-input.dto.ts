import { SortEnum } from '@common/domain/enum/sort.enum';
import { type FilterConditionsInputDto } from '@search/application/dto/filter-conditions-input.dto'
import { FacetEnum } from '@search/domain/enum/facet.enum';

export interface AdvertisementFilterInputDto {
  advertisementId?: number | FilterConditionsInputDto

  advertisementOrigin?: string | FilterConditionsInputDto

  visiblePrice?: number | FilterConditionsInputDto

  price?: number | FilterConditionsInputDto

  numberPhotos?: number | FilterConditionsInputDto

  brandId?: number | FilterConditionsInputDto

  brandName?: string | FilterConditionsInputDto

  modelId?: number | FilterConditionsInputDto

  modelName?: string | FilterConditionsInputDto

  modelYear?: number | FilterConditionsInputDto

  vehicleTypeSlug?: string | FilterConditionsInputDto

  carConditionId?: number | FilterConditionsInputDto

  carTypeId?: number | FilterConditionsInputDto

  entityId?: number | FilterConditionsInputDto

  similarAdvertisementFlag?: number | FilterConditionsInputDto
}

export interface GetSearchEngineInput {
  filters?: AdvertisementFilterInputDto
  sort?: AdvertisementSortInput
  facets: FacetEnum[]
  page:number
  limit: number
}

export interface AdvertisementSortInput {
  id: SortEnum;
  title: SortEnum;
  description: SortEnum;
  company: SortEnum;
  companySlug: SortEnum;
  publicationDate: SortEnum;
  publicationStatus: SortEnum;
}
