import { IListingRepository } from './IListingRepository';
import { Listing, Category, FilterState } from '@/types';
import { MOCK_CATEGORIES, MOCK_LISTINGS } from '../constants/mockData';
import { FilterEngine } from '../filters/FilterEngine';
import {
  CategoryFilterStrategy,
  LocationFilterStrategy,
  PriceFilterStrategy,
  GuestFilterStrategy,
  PlaceTypeFilterStrategy,
  AmenityFilterStrategy,
} from '../filters/strategies';

export class MockListingRepository implements IListingRepository {
  private filterEngine: FilterEngine;

  constructor() {
    this.filterEngine = new FilterEngine([
      new CategoryFilterStrategy(),
      new LocationFilterStrategy(),
      new PriceFilterStrategy(),
      new GuestFilterStrategy(),
      new PlaceTypeFilterStrategy(),
      new AmenityFilterStrategy(),
    ]);
  }

  async getListings(filterState?: FilterState): Promise<Listing[]> {
    if (!filterState) {
      return MOCK_LISTINGS;
    }
    return this.filterEngine.execute(MOCK_LISTINGS, filterState);
  }

  async getListingById(id: string): Promise<Listing | null> {
    const found = MOCK_LISTINGS.find(l => l.id === id);
    return found || null;
  }

  async getCategories(): Promise<Category[]> {
    return MOCK_CATEGORIES;
  }
}

export const listingRepository = new MockListingRepository();
