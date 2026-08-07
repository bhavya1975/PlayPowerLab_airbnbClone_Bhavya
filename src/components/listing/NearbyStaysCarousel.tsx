'use client';

import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Heart } from 'lucide-react';

interface NearbyStay {
  id: string;
  title: string;
  pricePerNight: number;
  rating: number;
  image: string;
  isSuperhost?: boolean;
}

const NEARBY_STAYS: NearbyStay[] = [
  {
    id: 's1',
    title: 'Beautiful Studio with a view to die for',
    pricePerNight: 23600,
    rating: 4.91,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 's2',
    title: 'NAQAB - 1bhk with private pool',
    pricePerNight: 42218,
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 's3',
    title: 'Greentique Luxury Flat with plunge pool, Calangute',
    pricePerNight: 44506,
    rating: 4.94,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 's4',
    title: 'The Tropical Studio | 5 mins to Beach',
    pricePerNight: 22824,
    rating: 4.96,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 's5',
    title: 'Luxury Casa Bella 1BHK with plunge pool, Calangute',
    pricePerNight: 39942,
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 's6',
    title: 'Cozy retreat in the heart of Anjuna',
    pricePerNight: 18500,
    rating: 4.88,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 's7',
    title: 'Serene Villa near Vagator Beach',
    pricePerNight: 35000,
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 's8',
    title: 'Modern Loft with private terrace',
    pricePerNight: 26400,
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
  },
];

export const NearbyStaysCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
      setCurrentPage(1);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
      setCurrentPage(2);
    }
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-8" aria-labelledby="nearby-heading">
      {/* Header with pagination */}
      <div className="flex items-center justify-between mb-6">
        <h3 id="nearby-heading" className="text-xl font-semibold text-[#222222]">
          More stays nearby
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#717171]">{currentPage}/{totalPages}</span>
          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Previous stays"
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-full border border-[#DDDDDD] flex items-center justify-center text-[#222222] hover:border-black disabled:opacity-30 disabled:hover:border-[#DDDDDD] transition-colors focus:outline-none"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={scrollRight}
            aria-label="Next stays"
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-full border border-[#DDDDDD] flex items-center justify-center text-[#222222] hover:border-black disabled:opacity-30 disabled:hover:border-[#DDDDDD] transition-colors focus:outline-none"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cards Carousel */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-5 overflow-x-auto scrollbar-none pb-4"
      >
        {NEARBY_STAYS.map((stay) => (
          <article
            key={stay.id}
            className="w-[240px] flex-shrink-0 group cursor-pointer"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3">
              <img
                src={stay.image}
                alt={stay.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <button
                type="button"
                aria-label="Save to wishlist"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(stay.id);
                }}
                className="absolute top-3 right-3 p-1.5 rounded-full hover:scale-110 transition-transform focus:outline-none"
              >
                <Heart
                  className="w-5 h-5 drop-shadow-md transition-colors"
                  fill={wishlist[stay.id] ? '#FF385C' : 'rgba(0,0,0,0.5)'}
                  stroke={wishlist[stay.id] ? '#FF385C' : '#ffffff'}
                  strokeWidth={2}
                />
              </button>
            </div>

            <h4 className="text-sm font-semibold text-[#222222] line-clamp-2 group-hover:underline">
              {stay.title}
            </h4>

            <div className="mt-1 flex items-baseline justify-between text-sm">
              <span className="font-semibold text-[#222222]">
                ₹{stay.pricePerNight.toLocaleString('en-IN')}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-[#222222] text-[#222222]" />
                <span className="text-xs font-semibold text-[#222222]">{stay.rating}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
