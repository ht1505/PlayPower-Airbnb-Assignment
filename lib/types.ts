export type PhotoCategory =
  | "Living room 1"
  | "Living room 2"
  | "Full kitchen"
  | "Bedroom"
  | "Full bathroom"
  | "Gym"
  | "Exterior"
  | "Pool"
  | "Additional photos";

export interface Photo {
  id: number;
  src: string;
  alt: string;
  category: PhotoCategory;
  categoryIndex: number;
}

export interface Property {
  title: string;
  location: string;
  propertyType: string;
  rating: number;
  reviewCount: number;
  guestFavourite: boolean;

  host: {
    name: string;
    reviewCount: number;
    rating: number;
    hostingDuration: string;
    responseRate: string;
    responseTime: string;
    coHostCount: number;
    bornIn: string;
    education: string;
  };

  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;

  highlights: string[];
  description: string;

  sleepingArrangements: {
    room: string;
    bed: string;
  }[];

  amenitiesCount: number;
}

export interface Amenity {
  id: string;
  name: string;
  category: string;
  available: boolean;
}

export interface Review {
  id: number;
  guestName: string;
  guestLocation?: string;
  date: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface ReviewCategory {
  name: string;
  score: number;
}

export interface BookingInfo {
  pricePerNight: number;
  totalPrice: number;
  nights: number;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface CalendarDay {
  date: string;
  available: boolean;
  selected?: boolean;
}

export interface CalendarMonth {
  year: number;
  month: number;
  days: CalendarDay[];
}

export interface NearbyStay {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: number;
}