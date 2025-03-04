
export interface CreateAnnouncementDto {
    title: string;
    description: string;
    status: 'active' | 'inactive';
    locationId?: number;
    areaId?: number;
    userCompanyId?: number;
    publicationStatus: 'published' | 'draft';
    positions?: {
      positionId: number;
      specialtyId?: number;
      positionLevelId?: number;
      socialNetworkId?: number;
      experienceRequired?: string;
    }[];
    studies?: {
      institutionId?: number;
      degreeId?: number;
      educationLevelId?: number;
      skillId?: number;
    }[];
  }


  export interface IQueryAnnouncementInput {
    filter: IQueryFilterAnnouncementInput;
    page: number;
    limit: number
  }


  export interface IQueryFilterAnnouncementInput {
    title: string;
    description: string;
    status: 'active' | 'inactive';
    locationId?: number;
    areaId?: number;
    userCompanyId?: number;
    publicationStatus: 'published' | 'draft'
  }