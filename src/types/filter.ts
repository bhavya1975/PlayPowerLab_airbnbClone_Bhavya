import { Listing } from './listing';

export interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export interface DateRange {
  startDate: string | null;
  endDate: string | null;
}

export type PlaceType = 'any' | 'entire' | 'room' | 'shared';

export interface FilterState {
  category: string | null;
  searchLocation: string;
  dateRange: DateRange;
  guests: GuestCounts;
  priceRange: [number, number];
  placeType: PlaceType;
  bedrooms: number | 'any';
  beds: number | 'any';
  bathrooms: number | 'any';
  amenities: string[];
  instantBook: boolean;
  selfCheckIn: boolean;
  allowsPets: boolean;
}

/**
 * Open/Closed Principle Strategy interface for pluggable list filters
 */
export interface IFilterStrategy {
  id: string;
  apply(listings: Listing[], state: FilterState): Listing[];
}
