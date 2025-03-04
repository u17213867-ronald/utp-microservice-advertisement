import { SearchDto } from "@common/domain/dto/search.dto";

export interface SearchResultInterface {
  result: SearchDto;
  page: number;
  limit: number;
  images: any;
}

export interface AdvertisementInterface {
  id: number
  highlightId?: number
  logoType?: string
  resellerId?: number
  sellerConcessionaireId?: number
  defaultLabel?: string
  announcement?: Announcement
  verifiedVehicle?: VerifiedVehicle
  bootType?: BootType
  brake?: Brake
  brand?: Brand
  contact?: Contact
  coordinate?: Coordinate
  cylinder?: Cylinder
  entity?: Entity
  fuel?: Fuel
  model?: Model
  price?: Price
  publicationType?: PublicationType
  traction?: Traction
  transmission?: Transmission
  ubigeo?: Location
  user?: User
  vehicle?: Vehicle
  vehicleType?: VehicleType
  santander?: Santander
  photos?: Photos[]
  offer?: Offer
}

export interface Announcement {
  id: number
  entityPackageId: number
  title: string
  subTitle: string
  description: string
  labelId: number
  label: string
  urlId: string
  slug: string
  publicationDate: string
  publicationEndAt: string | null
  clientId: number
  flagSimilar: boolean
  flagPhotosSlider: number
  order: number
  featuredOrder: number
  origin: string
  referenceCode: string
  viewType: number
  photo: string
  status: number
  photosNumber: number
  photos: string
  url360: string
  view360Url: string | null
  datasheet: string
  datasheetUrl: string | null
  video: string
  whatsapp: string
  hasLatamMiles: boolean
  offerSlug: string
  slugStore: string
  versionName: string
  versionId: number
  isAAPCertified: boolean
  certificateFilterName: string
  tagImageUrlDesktop: string
  tagImageUrlMobile: string
  stripeImageUrlDesktop: string
  stripeImageUrlMobile: string
}

export interface VerifiedVehicle {
  isVerified: boolean
  verifiedAt: string | null
}

export interface BootType {
  id: number
  name: string
}

export interface Brake {
  id: number
  name: string
  idSystem: number
  systemName: string
}

export interface Brand {
  id: number
  name: string
  slug: string
  image: string
}

export interface Contact {
  name: string
  email: string
  phone: string
  sellerLogo: string
  bannerImageUrl: string
}

export interface Coordinate {
  longitude: number
  latitude: number
}

export interface Cylinder {
  id: number
  capacity: number
}

export interface Entity {
  id: number
  name: string
  slug: string
  type: number
}

export interface Fuel {
  id: number
  name: string
  slug: string
}

export interface Model {
  id: number
  name: string
  slug: string
  typeId: number
  typeName: string
  typeSlug: string
  typeDescription: string
  typeFatherId: number
  typeFatherName: string
  typeFatherSlug: string
}

export interface Price {
  price: number
  viewPrice: boolean
  listPrice: number
  viewListPrice: boolean
  priceLabel: string
}

export interface PublicationType {
  id: number
  name: string
}

export interface Traction {
  id: number
  name: string
  slug: string
}

export interface Transmission {
  id: number
  name: string
  slug: string
}

export interface Location {
  id: number
  name: string
  slug: string
  provinceId: number
  provinceName: string
  provinceSlug: string
  departmentId: number
  departmentName: string
  departmentSlug: string
}

export interface User {
  id: number
  typeId: number
  agencyId: number
  name?: string
  lastName?: string
}

export interface Vehicle {
  id: number
  fabricationYear: number
  modelYear: number
  licensePlate: string
  mileage: number
  doorNumber: string
  rudderName: string
  color: string
  status: number
  statusSlug: string
  engineCylinder: number
  transmissionBox: string
  versionsNumber: number
  potencyRPM: number
  passengersNumber: number
  tonsNumber: number
  tireMeasurement: number
  certifiedConcessionaire: number
  mileageLabel: string
}

export interface VehicleType {
  id: number
  name: string
  slug: string
}

export interface Santander {
  flagActive: boolean
  fee: number
  quantityFees: number
  price: number
  showPrice: boolean
  bonus: number
}

export interface Photos {
  priority: number
  xlarge: string
  large: string
  medium: string
  small: string
}

export interface Offer {
  id: number
  name: string
  slug: string
  tagImage: string
  stripeImage: string
}
