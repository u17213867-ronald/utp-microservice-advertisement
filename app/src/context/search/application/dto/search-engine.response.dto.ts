export interface SearchEngineResponseDto {
  code: number
  message: string
  data: SearchEngineServiceResponseDto
}

export interface SearchEngineServiceResponseDto {
  facets: object[]
  items: object[]
  total: number
  page: number
}
