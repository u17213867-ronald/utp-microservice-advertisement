import { FACET_QUERY, type FacetEnum } from '@search/domain/enum/facet.enum'
type Group<T> = Record<string, T>

export class FacetGroupResponseDto {
  total = 0
  items: any[] = []

  constructor(facet: FacetEnum, data?: any[], query?: string) {
    this.setItems(facet, data, query)
  }

  setItems(facet: FacetEnum, data: any | undefined, query?: string): void {
    let modelFacets: Group<object>
    let key = facet
    if (FACET_QUERY[key] !== undefined) {
      FACET_QUERY[key].filter.forEach((facet) => {
        Object.keys(data).forEach((items) => {
          if (items.includes(facet.query)) {
            modelFacets = {
              name: facet.label,
              slug: facet.slug,
              count: data[items],
            }
          }
        })
        this.items.push(modelFacets)
      })
    }
  }
}
