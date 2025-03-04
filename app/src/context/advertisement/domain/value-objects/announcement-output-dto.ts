import { AnnouncementOutputInterface } from "./announcement-model.interface";

export class AnnouncementOutputDto {
    id: number;
    title: string;
    description: string;
    company: string;
    companySlug: string;
    publicationDate: Date;
    publicationStatus: string;
    areaId: number;
    areaName: string;
    areaSlug: string;
    announcementPosition: string[];
    announcementStudy: string[];
  
    constructor(data: AnnouncementOutputInterface) {
      this.id = data.id;
      this.title = data.title;
      this.description = data.description;
      this.company = data.company;
      this.companySlug = data.companySlug;
      this.publicationDate = new Date(data.publicationDate);
      this.publicationStatus = data.publicationStatus;
      this.areaId = data.areaId;
      this.areaName = data.areaName;
      this.areaSlug = data.areaSlug;
      this.announcementPosition = this.parseStringArray(data.announcementPosition);
      this.announcementStudy = this.parseStringArray(data.announcementStudy);
    }
  
    private parseStringArray(value: string | null): string[] {
      return value ? value.split('|--|') : [];
    }
  }
  