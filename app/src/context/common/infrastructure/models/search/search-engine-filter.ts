import { HandlerEnum } from '@common/domain/enum/handler.enum'
import {
  type SearchEngineFilterConditionInterface,
  type SearchEngineFilterInterface,
} from '@common/domain/model/search/search-engine-filter-interface'
import { SortEnum } from '@common/domain/enum/sort.enum'
import { DateTime } from '@common/domain/helper/date'

export class SearchEngineFilter {
  public handler = String(HandlerEnum.SELECT)
  public filterQuery: any[] = []
  public facets: string[] = []
  public facetsQuery: any[] = []
  public sort: any = []

  getHandler(): string {
    return this.handler
  }

  setHandler(handler: string): void {
    if (handler !== undefined) this.handler = handler
  }

  getFilterQuery(): any[] {
    return this.filterQuery
  }

  getFilterQueryString(): string {
    return this.filterQuery.map((param) => `${encodeURIComponent(param.field)}:${param.value as string}`).join(' AND ')
  }

  setFilterQuery(filterQuery?: object): void {
    if (filterQuery !== undefined) {
      Object.entries(filterQuery).forEach(([key, value]) => {
        if (typeof value === 'object') {
          value = value as SearchEngineFilterConditionInterface | unknown
          this.filterQuery.push(SearchEngineFilter.addConditionsToFilter(key, value))
          this.addSortSearch(key, value)
        } else {
          this.addSortSearch(key, value)
          this.filterQuery.push(SearchEngineFilter.addConditionsToFilter(key, String(value)))
        }
      })
    }
  }

  getFacets(): any {
    return this.facets
  }

  setFacets(facets: any): void {
    if (facets !== undefined) {
      this.facets = Array.isArray(facets) ? facets : Object.values(facets)
    }
  }

  setFacetsQuery(facetsQuery: any): void {
    if (facetsQuery !== undefined) this.facetsQuery = facetsQuery
  }

  getSort(): any {
    return this.sort
  }

  setSort(sort: any): void {
    if (sort === undefined) {
      sort = {
        orderAdvertisementType: SortEnum.ASC,
        order: SortEnum.ASC,
        publicationDate: SortEnum.DESC,
        verifiedVehicleFlag: SortEnum.DESC,
        numberPhotos: SortEnum.DESC,
        visiblePrice: SortEnum.DESC,
      }
    }

    if (sort.random) {
      sort[`random_${Math.floor(Math.random() * 10000)}`] = sort.random
      delete sort.random
    }

    if (sort.random_desc) {
      sort[`random_${Math.floor(Math.random() * 10000)}`] = 'DESC'
      delete sort.random
    }

    if (sort.search && sort.search !== '') {
      delete sort.search
    }
    this.sort = sort
  }

  private static addConditionsToFilter(key: string, value?: string | SearchEngineFilterInterface | unknown): any {
    if (typeof value !== 'object') {
      const input = DateTime.transformOnlyDates(key, value)
      return { field: key, value: input }
    }

    const obj = value as SearchEngineFilterConditionInterface
    if (obj.in !== undefined) {
      const filters = obj.in.replace(/,/g, ' OR ')
      return { field: key, value: `(${filters})` }
    } else if (obj.lt !== undefined) {
      obj.lt = DateTime.transformOnlyDates(key, obj.lt)
      return { field: key, value: `[* TO ${obj.lt}] AND -(${key}:${obj.lt})` }
    } else if (obj.lte !== undefined) {
      obj.lte = DateTime.transformOnlyDates(key, obj.lte)
      return { field: key, value: `[* TO ${obj.lte}]` }
    } else if (obj.gt !== undefined) {
      obj.gt = DateTime.transformOnlyDates(key, obj.gt)
      return { field: key, value: `[${obj.gt} TO *] AND -(${key}:${obj.gt})` }
    } else if (obj.gte !== undefined) {
      obj.gte = DateTime.transformOnlyDates(key, obj.gte)
      return { field: key, value: `[${obj.gte} TO *]` }
    } else if (obj.bw !== undefined) {
      const filters = obj.bw.split(',')
      const oneFilter = DateTime.transformOnlyDates(key, filters[0])
      const twoFilter = DateTime.transformOnlyDates(key, filters[1])
      return { field: key, value: `[${oneFilter} TO ${twoFilter}]` }
    } else if (obj.lk !== undefined) {
      obj.lk = DateTime.transformOnlyDates(key, obj.lk)
      return { field: key, value: `(*${obj.lk}*)` }
    } else if (obj.notlk !== undefined) {
      obj.notlk = DateTime.transformOnlyDates(key, obj.notlk)
      return { field: `-${key}`, value: `(*${obj.notlk}*)` }
    } else if (obj.not !== undefined) {
      obj.not = DateTime.transformOnlyDates(key, obj.not)
      if (!obj.not || obj.not.toLowerCase() === 'null') {
        return { field: key, value: '*' }
      } else {
        return { field: `-${key}`, value: `(${obj.not})` }
      }
    }
  }

  private addSortSearch(key: string, value?: string | SearchEngineFilterInterface | unknown): void {
    if (key === 'search') {
      if (typeof value !== 'object') {
        this.sort[`termfreq(search,${String(value)}`] = 'DESC'
        this.sort[`sum(termfreq(search,${String(value)})`] = 'DESC'
      }
      const obj = value as SearchEngineFilterConditionInterface

      if (obj.in) {
        let termFreq = ''
        const sumTerm: string[] = []

        obj.in.split(',').forEach((item, index) => {
          termFreq = `termfreq(search,${String(item)})`
          sumTerm.push(termFreq)
          this.sort[termFreq] = 'DESC'
        })
        this.sort[`sum(${sumTerm.join(',')})`] = 'DESC'
      }
    }
  }
}
