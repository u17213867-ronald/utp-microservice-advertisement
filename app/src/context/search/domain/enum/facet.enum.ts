export enum RULES_FACET_FILTER_CONCESSIONAIRE {
  LIMITED_AMOUNT_DEALERSHIP_FILTER_NOTICES = 1,
}
export enum FacetEnum {
  facetBrand = 'facetBrand',
  facetModel = 'facetModel',
  facetVehicleCategory = 'facetVehicleCategory',
  facetHeadCarType = 'facetHeadCarType',
  facetConcessionaire = 'facetConcessionaire',
  facetMileage = 'mileage',
  facetCarConditionSlug = 'carConditionSlug',
  facetPublicationAt = 'facetPublicationAt',
  facetFuel = 'facetFuel',
  facetPrice = 'price',
  facetDrivetrain = 'facetDrivetrain',
  facetTransmission = 'facetTransmission',
  facetLocationDepartment = 'facetLocationDepartment',
  facetLocationProvince = 'facetLocationProvince',
  facetLocationDistrict = 'facetLocationDistrict',
  facetModelYear = 'modelYear',
  facetSantanderFee = 'santanderFee',
  facetNumberTonnage = 'numberTonnage',
  facetOfferSlug = 'offerSlug',
  facetCertificateFilterName = 'certificateFilterName',
  facetEntity = 'facetEntity',
  facetBonus = 'santanderBonus',
  facetFilterConcessionaire = 'facetFilterConcessionaire',
  facetVerifiedVehicle = 'verifiedVehicleFlag',
  facetAAPCertified = 'isAAPCertified',
}

export const FACET_GROUP = [
  FacetEnum.facetMileage,
  FacetEnum.facetPublicationAt,
  FacetEnum.facetPrice,
  FacetEnum.facetModelYear,
  FacetEnum.facetSantanderFee,
  FacetEnum.facetNumberTonnage,
  FacetEnum.facetBonus,
]

export const FACET_QUERY = {
  mileage: {
    filter: [
      {
        query: 'mileage:[0 TO 15000]',
        label: 'Hasta 15,000 Kms',
        slug: '0-15000',
      },
      {
        query: 'mileage:[15000 TO 30000]',
        label: '15,000 a 30,000 Kms',
        slug: '15000-30000',
      },
      {
        query: 'mileage:[30000 TO 50000]',
        label: '30,000 a 50,000 Kms',
        slug: '30000-50000',
      },
      {
        query: 'mileage:[50000 TO 100000]',
        label: '50,000 a 100,000 Kms',
        slug: '50000-100000',
      },
      {
        query: 'mileage:[100000 TO *]',
        label: '100,000 Kms a más',
        slug: '100000-0',
      },
    ],
  },
  facetPublicationAt: {
    filter: [
      {
        query: 'facetPublicationAt:[NOW/DAY TO NOW]',
        label: 'Publicados hoy',
        slug: 'hoy',
      },
      {
        query: 'facetPublicationAt:[NOW-7DAY/DAY TO NOW]',
        label: 'Últimos 7 días',
        slug: '7dias',
      },
      {
        query: 'facetPublicationAt:[NOW-15DAY/DAY TO NOW]',
        label: 'Últimos 15 días',
        slug: '15dias',
      },
      {
        query: 'facetPublicationAt:[NOW-30DAY/DAY TO NOW]',
        label: 'Últimos 30 días',
        slug: '30dias',
      },
    ],
  },
  price: {
    filter: [
      {
        query: 'price:[1 TO 5000] AND visiblePrice:1',
        label: 'Hasta US$5,000',
        slug: '1-5000',
      },
      {
        query: 'price:[5000 TO 10000] AND visiblePrice:1',
        label: 'US$5,000 a US$10,000',
        slug: '5000-10000',
      },
      {
        query: 'price:[10000 TO 20000] AND visiblePrice:1',
        label: 'US$10,000 a US$20,000',
        slug: '10000-20000',
      },
      {
        query: 'price:[20000 TO 35000] AND visiblePrice:1',
        label: 'US$20,000 a US$35,000',
        slug: '20000-35000',
      },
      {
        query: 'price:[35000 TO *] AND visiblePrice:1',
        label: 'US$35,000 a más',
        slug: '35000-0',
      },
      {
        query: 'price:0 OR visiblePrice:0',
        label: 'Consultar Precio',
        slug: 'consultar',
      },
    ],
  },
  price_motos: {
    filter: [
      {
        query: 'price:[1 TO 2000] AND visiblePrice:1',
        label: 'Hasta US$2,000',
        slug: '1-2000',
      },
      {
        query: 'price:[2000 TO 5000] AND visiblePrice:1',
        label: 'US$2,000 a US$5,000',
        slug: '2000-5000',
      },
      {
        query: 'price:[5000 TO 10000] AND visiblePrice:1',
        label: 'US$5,000 a US$10,000',
        slug: '5000-10000',
      },
      {
        query: 'price:[10000 TO 20000] AND visiblePrice:1',
        label: 'US$10,000 a US$20,000',
        slug: '10000-20000',
      },
      {
        query: 'price:[20000 TO *] AND visiblePrice:1',
        label: 'US$20,000 a más',
        slug: '20000-0',
      },
      {
        query: 'price:0 OR visiblePrice:0',
        label: 'Consultar Precio',
        slug: 'consultar',
      },
    ],
  },
  modelYear: {
    filter: [
      {
        query: 'modelYear:[2018 TO 2024]',
        label: '2018 a 2024',
        slug: '2018-2024',
      },
      {
        query: 'modelYear:[2012 TO 2017]',
        label: '2012 a 2017',
        slug: '2012-2017',
      },
      {
        query: 'modelYear:[2006 TO 2011]',
        label: '2006 a 2011',
        slug: '2006-2011',
      },
      {
        query: 'modelYear:[2000 TO 2005]',
        label: '2000 a 2005',
        slug: '2000-2005',
      },
      {
        query: 'modelYear:[1960 TO 1999]',
        label: 'Hasta 1999',
        slug: '1960-1999',
      },
    ],
  },
  santanderFee: {
    filter: [
      {
        query: 'santanderFee:[1 TO 300] AND santanderFlag:1 AND showSantanderPrice:0',
        label: 'Hasta US$300',
        slug: '1-300',
      },
      {
        query: 'santanderFee:[300 TO 600] AND santanderFlag:1 AND showSantanderPrice:0',
        label: 'US$300 a US$600',
        slug: '300-600',
      },
      {
        query: 'santanderFee:[600 TO 900] AND santanderFlag:1 AND showSantanderPrice:0',
        label: 'US$600 a US$900',
        slug: '600-900',
      },
      {
        query: 'santanderFee:[900 TO 1200] AND santanderFlag:1 AND showSantanderPrice:0',
        label: 'US$900 a US$1,200',
        slug: '900-1200',
      },
      {
        query: 'santanderFee:[1200 TO *] AND santanderFlag:1 AND showSantanderPrice:0',
        label: 'US$1,200 a más',
        slug: '1200-0',
      },
    ],
  },
  numberTonnage: {
    filter: [
      {
        query: 'numberTonnage:[0 TO 3]',
        label: 'Hasta 3 Tn',
        slug: '0-3',
      },
      {
        query: 'numberTonnage:[3 TO 6]',
        label: '3 - 6 Tn',
        slug: '3-6',
      },
      {
        query: 'numberTonnage:[6 TO 15]',
        label: '6 - 15 Tn',
        slug: '6-15',
      },
      {
        query: 'numberTonnage:[15 TO 30]',
        label: '15 - 30 Tn',
        slug: '15-30',
      },
      {
        query: 'numberTonnage:[30 TO *]',
        label: 'Más De 30 Tn',
        slug: '30-0',
      },
    ],
  },
  santanderBonus: {
    filter: [
      {
        query: 'santanderBonus:[1 TO 200] AND santanderFlag:1 AND showSantanderPrice:1',
        label: 'Hasta US$200',
        slug: '1-200',
      },
      {
        query: 'santanderBonus:[201 TO 500] AND santanderFlag:1 AND showSantanderPrice:1',
        label: 'US$201 a US$500',
        slug: '201-500',
      },
      {
        query: 'santanderBonus:[501 TO 1000] AND santanderFlag:1 AND showSantanderPrice:1',
        label: 'US$501 a US$1,000',
        slug: '501-1000',
      },
      {
        query: 'santanderBonus:[1001 TO 2500] AND santanderFlag:1 AND showSantanderPrice:1',
        label: 'US$1,001 a US$2,500',
        slug: '1001-2500',
      },
      {
        query: 'santanderBonus:[2501 TO 5500] AND santanderFlag:1 AND showSantanderPrice:1',
        label: 'US$2,501 a US$5,500',
        slug: '2501-5500',
      },
      {
        query: 'santanderBonus:[5501 TO *] AND santanderFlag:1 AND showSantanderPrice:1',
        label: 'US$5,501 a más',
        slug: '5501-0',
      },
    ],
  },
}
