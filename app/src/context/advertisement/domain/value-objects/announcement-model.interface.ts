export enum AnnouncementStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}
export interface AnnouncementInterface {
    id: number;
    title: string;
    description: string;
    status: AnnouncementStatus;
    locationId?: number | null;
    userCompanyId?: number | null;
    publicationStatus: 'published' | 'draft';
    positions?: AnnouncementPositionInterface[];
    studies?: AnnouncementStudyInterface[];
  }
  
export interface AnnouncementPositionInterface {
    id: number;
    announcementId: number;
    positionId: number;
    specialtyId?: number | null;
    positionLevelId?: number | null;
    socialNetworkId?: number | null;
    experienceRequired?: string | null;
}

export interface AnnouncementStudyInterface {
    id: number;
    announcementId: number;
    institutionId?: number | null;
    degreeId?: number | null;
    educationLevelId?: number | null;
    skillId?: number | null;
}
