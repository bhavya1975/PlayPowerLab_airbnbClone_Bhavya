import { IFilterStrategy, Listing, FilterState } from '@/types';

export class CategoryFilterStrategy implements IFilterStrategy {
  id = 'category';
  apply(listings: Listing[], state: FilterState): Listing[] {
    if (!state.category || state.category.toLowerCase() === 'all') return listings;
    return listings.filter(l => l.category.toLowerCase() === state.category?.toLowerCase());
  }
}

export class LocationFilterStrategy implements IFilterStrategy {
  id = 'location';
  apply(listings: Listing[], state: FilterState): Listing[] {
    if (!state.searchLocation.trim()) return listings;
    const term = state.searchLocation.toLowerCase();
    return listings.filter(l =>
      l.location.city.toLowerCase().includes(term) ||
      l.location.country.toLowerCase().includes(term) ||
      (l.location.state && l.location.state.toLowerCase().includes(term))
    );
  }
}

export class PriceFilterStrategy implements IFilterStrategy {
  id = 'price';
  apply(listings: Listing[], state: FilterState): Listing[] {
    const [min, max] = state.priceRange;
    return listings.filter(l => l.pricePerNight >= min && l.pricePerNight <= max);
  }
}

export class GuestFilterStrategy implements IFilterStrategy {
  id = 'guests';
  apply(listings: Listing[], state: FilterState): Listing[] {
    const totalGuests = state.guests.adults + state.guests.children;
    if (totalGuests <= 0) return listings;
    return listings.filter(l => l.maxGuests >= totalGuests);
  }
}

export class PlaceTypeFilterStrategy implements IFilterStrategy {
  id = 'placeType';
  apply(listings: Listing[], state: FilterState): Listing[] {
    if (state.placeType === 'any') return listings;
    return listings.filter(l => {
      if (state.placeType === 'entire') return l.bedrooms > 0;
      if (state.placeType === 'room') return l.bedrooms === 1;
      return true;
    });
  }
}

export class AmenityFilterStrategy implements IFilterStrategy {
  id = 'amenities';
  apply(listings: Listing[], state: FilterState): Listing[] {
    if (state.amenities.length === 0) return listings;
    return listings.filter(l =>
      state.amenities.every(amenity => l.amenities.includes(amenity))
    );
  }
}
