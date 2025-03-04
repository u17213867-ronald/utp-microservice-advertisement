export class SearchDto {
  response: Response
  facet_counts?: FacetFields
  responseHeader: any
}

export interface FacetFields {
  facet_fields?: any
  facet_queries?: any
}

export interface Facet<T> {
  facetConcessionaire: T;
  facetDrivetrain: T;
  facetFuel: T;
  facetTransmission: T;
  facetOther?: T; // Si alguna propiedad es opcional, usa `?`
}

export interface Response {
  numFound: number
  start: number
  numFoundExact: boolean
  docs: []
}
