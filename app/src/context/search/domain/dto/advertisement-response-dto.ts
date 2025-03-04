import { DateTime } from "@common/domain/helper/date";
import { AdvertisementInterface, AdvertisementPhotosInterface, AnnouncementPosition, AnnouncementStudy } from "../model/advertisement.interface";
import { AdvertisementModel } from "../model/advertisement.model";
import { FACET_GROUP, FacetEnum } from "../enum/facet.enum";
import { FacetResponseDto } from '@search/domain/dto/facet-response-dto'
import { FacetGroupResponseDto } from '@search/domain/dto/facet-group-response.dto'
import { Facet, FacetFields } from "@common/domain/dto/search.dto";

export class AdvertisementResponseDto {
  facets: object[];
  items: AdvertisementInterface[] = []
  total: number
  page: number

  constructor(    
    items: AdvertisementModel[],
    page: number,
    total: number,
    images: AdvertisementPhotosInterface
  ) {
    this.items = this.transform(items, images);
    this.page = page
    this.total = total
  }

  setFacets(facetsInput?: FacetEnum[], result?: FacetFields, query?: string): void {
    const listFacet: any = [];
  
    if (facetsInput) {
      facetsInput = Array.isArray(facetsInput) ? facetsInput : Object.values(facetsInput);
    }
  
    facetsInput?.forEach((facet) => {
      const modelFacets: any = {};
      modelFacets[facet] = new FacetResponseDto(facet, result?.facet_fields?.[facet], query);
  
      if (FACET_GROUP.includes(facet)) {
        modelFacets[facet] = new FacetGroupResponseDto(facet, result?.facet_queries, query);
      }
  
      if (Object.keys(modelFacets).length > 0) {
        listFacet.push(modelFacets);
      }
    });
  
    this.facets = listFacet;
  }
  

  getDocs(): AdvertisementInterface[] {
    return this.items;
  }

  private transform(data: any[], images: AdvertisementPhotosInterface): AdvertisementInterface[] {
    return data.map((item) => ({
      id: Number(item.id),
      title: item.title,
      description: this.formatDescription(item.description),
      company: item.company,
      companySlug: item.companySlug,
      publicationDate: DateTime.convertToZone(item.publicationDate), // Convertir fecha
      publicationStatus: item.publicationStatus,
      announcementPosition: item.announcementPosition
        ? item.announcementPosition.map((pos: string) => this.parsePosition(pos))
        : [],
      announcementStudy: item.announcementStudy
        ? item.announcementStudy.map((study: string) => this.parseStudy(study))
        : [],
    }));
  }
  

  private parsePosition(positionStr: string): AnnouncementPosition {
    const parts = positionStr.split("|-|");
    return {
      positionId: parts[0].split("||")[0] || "",
      positionName: parts[0].split("||")[1] || "",
      positionSlug: parts[0].split("||")[2] || "",
      specialtyId: parts[1]?.split("||")[0] || "",
      specialtyName: parts[1]?.split("||")[1] || "",
      specialtySlug: parts[1]?.split("||")[2] || "",
      levelId: parts[2]?.split("||")[0] || "",
      levelName: parts[2]?.split("||")[1] || "",
      levelSlug: parts[2]?.split("||")[2] || "",
      experienceRequired: parts[3] || "",
    };
  }

  private parseStudy(studyStr: string): AnnouncementStudy {
    const parts = studyStr.split("|-|");
    return {
      institutionId: parts[0]?.split("||")[0] || "",
      institutionName: parts[0]?.split("||")[1] || "",
      institutionSlug: parts[0]?.split("||")[2] || "",
      degreeId: parts[1]?.split("||")[0] || "",
      degreeName: parts[1]?.split("||")[1] || "",
      degreeSlug: parts[1]?.split("||")[2] || "",
      educationLevelId: parts[2]?.split("||")[0] || "",
      educationLevelName: parts[2]?.split("||")[1] || "",
      educationLevelParent: parts[2]?.split("||")[2] || "",
      skillId: parts[3]?.split("||")[0] || "",
      skillName: parts[3]?.split("||")[1] || "",
      skillSlug: parts[3]?.split("||")[2] || "",
    };
  }

  private formatDescription(description: string): string {
    return description
      .replace(/<br>/g, "")
      .replace(/<script>/g, "")
      .replace(/<\/script>/g, "")
      .replace(/\(\)/g, "")
      .replace(/</g, "")
      .replace(/>/g, "");
  }

  setPage(page: number): void {
    this.page = page
  }

  getTotal(): number {
    return this.total
  }
}
