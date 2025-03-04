export interface AdvertisementInterface {
    id: number;
    title: string;
    description: string;
    company: string;
    companySlug: string;
    publicationDate: string;
    publicationStatus: string;
    announcementPosition: AnnouncementPosition[];
    announcementStudy: AnnouncementStudy[];
  }
  
export interface AnnouncementPosition {
  positionId: string;
  positionName: string;
  positionSlug: string;
  specialtyId: string;
  specialtyName: string;
  specialtySlug: string;
  levelId: string;
  levelName: string;
  levelSlug: string;
  experienceRequired: string;
}

export interface AnnouncementStudy {
  institutionId: string;
  institutionName: string;
  institutionSlug: string;
  degreeId: string;
  degreeName: string;
  degreeSlug: string;
  educationLevelId: string;
  educationLevelName: string;
  educationLevelParent: string;
  skillId: string;
  skillName: string;
  skillSlug: string;
}

export interface AdvertisementPhotosInterface {
  HOST_CDE: string
  IMAGE_LARGE: string
  IMAGE_MEDIUM: string
  IMAGE_SMALL: string
  IMAGE_XLARGE: string
  IMAGE_LARGE_CONCESSIONAIRE: string
  IMAGE_MEDIUM_CONCESSIONAIRE: string
  IMAGE_SMALL_CONCESSIONAIRE: string
  IMAGE_XLARGE_CONCESSIONAIRE: string
  IMAGE_DEFAULT: string
  IMAGE_STORE: string
  IMAGE_OFFER_STRIPE: string
  IMAGE_OFFER_TAG: string
  MODEL_FILE: string
}


export interface FacetResponseInterface {
  total: number
  items: any[]
}