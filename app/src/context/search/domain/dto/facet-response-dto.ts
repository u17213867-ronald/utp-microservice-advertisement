import { type FacetInterface } from '@search/domain/facet.interface'
import { FacetEnum } from '@search/domain/enum/facet.enum'
export class FacetResponseDto {
  total = 0
  items: any[] = []

  constructor(facet: FacetEnum, data?: any[], query?: string) {
    this.setItems(facet, data, query)
  }

  getItems(): any[] {
    return this.items
  }

  setItems(facet: FacetEnum, data?: any[], query?: string): void {
    if (data === undefined) return
    const separator = facet === FacetEnum.facetConcessionaire ? '|' : '||'
    for (let i = 0; i < data.length; i += 2) {
      if (data[i] !== undefined && data[i + 1] > 0 && data[i] !== '0' && data[i] !== '0.0' && data[i] !== '') {
        const body = data[i].split(separator)
        const facetProperties = this.getFacetProperties(facet, body, data[i + 1])

        const item: FacetInterface = { ...facetProperties, count: data[i + 1] }
        this.items.push(item)
      }
    }

    this.total = this.items.length
  }

  private getFacetProperties(facet: FacetEnum, body: string[], count: number): any {
    const properties = {
      [FacetEnum.facetBrand]: {
        id: Number(body[2]),
        name: body[1],
        slug: body[0],
      },
      [FacetEnum.facetModel]: {
        name: body[1],
        slug: body[0],
        slugTypeVehicleDetailSearch: body[2],
        brandId: Number(body[5]),
        brandSlug: body[3],
        vehicleTypeId: Number(body[4]),
      },
      [FacetEnum.facetConcessionaire]: {
        name: body[0],
        slug: body[1],
      },
      [FacetEnum.facetCarConditionSlug]: {
        name: body[0],
        slug: body[0],
      },
      [FacetEnum.facetFuel]: {
        name: body[1],
        slug: body[0],
      },
      [FacetEnum.facetDrivetrain]: {
        name: body[1],
        slug: body[0],
      },
      [FacetEnum.facetTransmission]: {
        name: body[1],
        slug: body[0],
      },
      [FacetEnum.facetLocationDepartment]: {
        id: Number(body[0]),
        name: body[1],
        slug: body[2],
      },
      [FacetEnum.facetModelYear]: {
        name: body[0],
        slug: body[1],
      },
      [FacetEnum.facetLocationProvince]: {
        id: Number(body[0]),
        name: body[1],
        slug: body[2],
        departmentId: Number(body[3]),
      },
      [FacetEnum.facetLocationDistrict]: {
        id: Number(body[0]),
        name: body[1],
        slug: body[2],
        provinceId: Number(body[3]),
        provinceName: body[4],
        provinceSlug: body[5],
      },
      [FacetEnum.facetVehicleCategory]: {
        name: body[1],
        slug: body[0],
        vehicle: body[2],
        typeCarId: body[3],
        typeVehicleId: body[4],
      },
      [FacetEnum.facetOfferSlug]: {
        id: Number(body[0]),
        name: body[2],
        slug: body[1],
      },
      [FacetEnum.facetCertificateFilterName]: {
        name: body[0],
        slug: body[0].replace(/ /g, '-'),
      },
      [FacetEnum.facetEntity]: {
        id: Number(body[0]),
        name: body[1],
        slug: body[2],
      },
      [FacetEnum.facetBonus]: {
        name: body[0],
        slug: body[0],
      },
      [FacetEnum.facetFilterConcessionaire]: {
        name: 'Concesionarios destacados',
        slug: body[0],
      },
      [FacetEnum.facetVerifiedVehicle]: {
        name: 'Autos verificados',
        slug: '1',
      },
      [FacetEnum.facetAAPCertified]: {
        name: 'Concesionarios miembros de la AAP',
        slug: '1',
      },
    }

    return properties[facet]
  }
}
