export interface SearchEngineFilterInterface {
  advertisementOrigin: string | SearchEngineFilterConditionInterface
  vehicleTypeSlug: string | SearchEngineFilterConditionInterface
}

export interface SearchEngineFilterConditionInterface {
  in: string
  lt: string
  lte: string
  gt: string
  gte: string
  bw: string
  lk: string
  not: string
  notlk: string
}
