import { Listing, Category, FilterState } from '@/types';

export interface IListingRepository {
  getListings(filterState?: FilterState): Promise<Listing[]>;
  getListingById(id: string): Promise<Listing | null>;
  getCategories(): Promise<Category[]>;
}
