export interface LocationInterface {
    id: number;
    name: string;
    parentId?: number | null;
    code?: string | null;
    displayName?: string | null;
    searchName?: string | null;
    slug?: string | null;
    capitalId?: number | null;
    latitude?: number | null;
    longitude?: number | null;
    childrenCount?: number | null;
    level?: number | null;
    adecsysId?: number | null;
    adCount: number;
    indexName: string;
    countryCode?: number | null;
    departmentCode?: number | null;
    provinceCode?: number | null;
    districtCode?: number | null;
    status: number;
}
  