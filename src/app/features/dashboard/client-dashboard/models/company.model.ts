export interface Company {
  id: number;
  name: string;
  description: string;
  images: CompanyImage[];
  locations: CompanyLocation[];
  openingHours: OpeningHours[];
  services?: Service[];
}

export interface CompanyLocation {
  id: number;
  addressLine1: string;
  addressLine2?: string;
  cityId: number;
  countryId: number;
  postalCodeId: number;
  city?: {
    name: string;
  };
  country?: {
    name: string;
  };
  postalCode?: {
    code1: string;
    code2: string;
  };
}

export interface CompanyImage {
  id: number;
  imageUrl: string;
}

export interface OpeningHours {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface Service {
  name: string;
  description: string[];
}
