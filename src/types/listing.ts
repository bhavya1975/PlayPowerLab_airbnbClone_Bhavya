export interface ListingHost {
  name: string;
  avatar: string;
  isSuperhost: boolean;
}

export interface ListingLocation {
  city: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  category: string;
  location: ListingLocation;
  distanceDescription?: string;
  availableDatesDescription?: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  images: string[];
  isGuestFavorite?: boolean;
  isSuperhost?: boolean;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[];
  host: ListingHost;
}
