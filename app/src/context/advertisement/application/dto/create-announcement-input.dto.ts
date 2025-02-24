
export interface CreateAnnouncementDto {
    title: string;
    description: string;
    status: 'active' | 'inactive';
    locationId?: number;
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
