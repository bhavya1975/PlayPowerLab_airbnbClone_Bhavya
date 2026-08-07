import { Category, Listing } from '@/types';

export const MOCK_CATEGORIES: Category[] = [
  { id: 'icons', label: 'Icons', iconName: 'Sparkles', description: 'Extraordinary experiences hosted by icons' },
  { id: 'beachfront', label: 'Beachfront', iconName: 'Umbrella', description: 'Properties right on the water' },
  { id: 'cabins', label: 'Cabins', iconName: 'Home', description: 'Cozy rustic retreats in nature' },
  { id: 'amazing-pools', label: 'Amazing pools', iconName: 'Waves', description: 'Listings with spectacular private pools' },
  { id: 'mansions', label: 'Mansions', iconName: 'Building', description: 'Luxurious estates and villas' },
  { id: 'trending', label: 'Trending', iconName: 'Flame', description: 'Most popular stays this week' },
  { id: 'countryside', label: 'Countryside', iconName: 'Trees', description: 'Peaceful rural hideaways' },
  { id: 'lakefront', label: 'Lakefront', iconName: 'Compass', description: 'Secluded stays on serene lakes' },
  { id: 'tiny-homes', label: 'Tiny homes', iconName: 'Box', description: 'Charming compact living spaces' },
  { id: 'design', label: 'Design', iconName: 'Palette', description: 'Architecturally distinct properties' },
  { id: 'luxe', label: 'Luxe', iconName: 'Crown', description: 'High-end luxury with pristine reviews' }
];

export const MOCK_LISTINGS: Listing[] = [
  {
    id: 'listing-1',
    title: 'Modern Minimalist Villa with Ocean Panoramas',
    description: 'Breathtaking cliffside infinity pool residence overlooking pristine blue ocean waters.',
    category: 'beachfront',
    location: { city: 'Malibu', state: 'California', country: 'United States', lat: 34.0259, lng: -118.7798 },
    distanceDescription: '1,240 miles away',
    availableDatesDescription: 'Sep 12 – 17',
    pricePerNight: 480,
    rating: 4.98,
    reviewCount: 142,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    isGuestFavorite: true,
    isSuperhost: true,
    bedrooms: 4,
    beds: 5,
    bathrooms: 4,
    maxGuests: 8,
    amenities: ['Wifi', 'Pool', 'Ocean View', 'Kitchen', 'Air Conditioning', 'Free Parking'],
    host: { name: 'Elena Vance', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', isSuperhost: true }
  },
  {
    id: 'listing-2',
    title: 'Secluded Glass Cabin in Alpine Forest',
    description: 'Panoramic glass cabin nested deep within pine trees with stargazing skylight roof.',
    category: 'cabins',
    location: { city: 'Aspen', state: 'Colorado', country: 'United States', lat: 39.1911, lng: -106.8175 },
    distanceDescription: '850 miles away',
    availableDatesDescription: 'Oct 1 – 6',
    pricePerNight: 320,
    rating: 4.95,
    reviewCount: 89,
    images: [
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80'
    ],
    isGuestFavorite: true,
    isSuperhost: true,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    maxGuests: 4,
    amenities: ['Wifi', 'Hot Tub', 'Fireplace', 'Heating', 'Mountain View'],
    host: { name: 'Marcus Sterling', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', isSuperhost: true }
  },
  {
    id: 'listing-3',
    title: 'The X-Mansion - Live like an Icon',
    description: 'Experience an exclusive stay inside the iconic Xavier Institute for Higher Learning.',
    category: 'icons',
    location: { city: 'Westchester', state: 'New York', country: 'United States', lat: 41.122, lng: -73.7949 },
    distanceDescription: 'Live Experience',
    availableDatesDescription: 'Coming Nov 15',
    pricePerNight: 0,
    rating: 5.0,
    reviewCount: 312,
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    isGuestFavorite: true,
    isSuperhost: true,
    bedrooms: 6,
    beds: 8,
    bathrooms: 6,
    maxGuests: 12,
    amenities: ['Danger Room Access', 'Cerebro Suite', 'Helipad', 'Pool', 'Wifi'],
    host: { name: 'Professor Charles', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', isSuperhost: true }
  },
  {
    id: 'listing-4',
    title: 'Luxury Mediterranean Pool Villa',
    description: 'Stunning contemporary villa featuring private heated pool and panoramic sunset deck.',
    category: 'amazing-pools',
    location: { city: 'Santorini', country: 'Greece', lat: 36.3932, lng: 25.4615 },
    distanceDescription: '6,450 miles away',
    availableDatesDescription: 'Aug 20 – 25',
    pricePerNight: 650,
    rating: 4.97,
    reviewCount: 204,
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80'
    ],
    isGuestFavorite: true,
    isSuperhost: false,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    maxGuests: 6,
    amenities: ['Pool', 'Wifi', 'Sea View', 'Air Conditioning', 'Kitchen'],
    host: { name: 'Sophia Rossi', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', isSuperhost: false }
  }
];
