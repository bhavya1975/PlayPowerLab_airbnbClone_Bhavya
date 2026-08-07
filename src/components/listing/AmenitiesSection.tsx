'use client';

import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Wifi,
  BriefcaseBusiness,
  Car,
  Waves,
  Flame,
  PawPrint,
  Camera,
  AlertTriangle,
} from 'lucide-react';

interface Amenity {
  id: string;
  label: string;
  icon: React.ReactNode;
  unavailable?: boolean;
}

const ALL_AMENITIES: Amenity[] = [
  { id: 'kitchen', label: 'Kitchen', icon: <UtensilsCrossed className="w-5 h-5" /> },
  { id: 'wifi', label: 'Wifi', icon: <Wifi className="w-5 h-5" /> },
  { id: 'workspace', label: 'Dedicated workspace', icon: <BriefcaseBusiness className="w-5 h-5" /> },
  { id: 'parking', label: 'Free parking on premises', icon: <Car className="w-5 h-5" /> },
  { id: 'pool', label: 'Pool', icon: <Waves className="w-5 h-5" /> },
  { id: 'hottub', label: 'Hot tub', icon: <Flame className="w-5 h-5" /> },
  { id: 'pets', label: 'Pets allowed', icon: <PawPrint className="w-5 h-5" /> },
  { id: 'cameras', label: 'Exterior security cameras on property', icon: <Camera className="w-5 h-5" /> },
  { id: 'co-alarm', label: 'Carbon monoxide alarm', icon: <AlertTriangle className="w-5 h-5" />, unavailable: true },
  { id: 'smoke-alarm', label: 'Smoke alarm', icon: <AlertTriangle className="w-5 h-5" />, unavailable: true },
];

const PREVIEW_COUNT = 10;

export interface AmenitiesSectionProps {
  totalCount?: number;
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({
  totalCount = 50,
}) => {
  const [showModal, setShowModal] = useState(false);
  const displayedAmenities = ALL_AMENITIES.slice(0, PREVIEW_COUNT);

  return (
    <section id="section-amenities" className="py-6 border-b border-[#DDDDDD]" aria-labelledby="amenities-heading">
      <h3 id="amenities-heading" className="text-xl font-semibold text-[#222222] mb-5">
        What this place offers
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        {displayedAmenities.map((amenity) => (
          <div
            key={amenity.id}
            className={`flex items-center gap-3 ${amenity.unavailable ? 'opacity-40' : ''}`}
          >
            <span
              className={`flex-shrink-0 text-[#222222] ${amenity.unavailable ? 'line-through' : ''}`}
              aria-hidden="true"
            >
              {amenity.icon}
            </span>
            <span
              className={`text-sm text-[#222222] ${amenity.unavailable ? 'line-through text-[#717171]' : ''}`}
            >
              {amenity.label}
              {amenity.unavailable && (
                <span className="sr-only"> (not available)</span>
              )}
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="mt-6 px-5 py-3 border border-[#222222] rounded-xl text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222]"
      >
        Show all {totalCount} amenities
      </button>

      {/* Simple amenities modal placeholder */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white w-full sm:max-w-2xl sm:rounded-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#DDDDDD] sticky top-0 bg-white z-10">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Close amenities"
                className="p-2 rounded-full hover:bg-[#F7F7F7] transition-colors"
              >
                <svg viewBox="0 0 32 32" className="w-4 h-4" aria-hidden="true"><path d="M6 6L26 26M26 6L6 26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
              </button>
              <h2 className="text-base font-semibold text-[#222222]">What this place offers</h2>
              <div className="w-8" />
            </div>
            <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ALL_AMENITIES.map((amenity) => (
                <div
                  key={amenity.id}
                  className={`flex items-center gap-3 py-2 ${amenity.unavailable ? 'opacity-40' : ''}`}
                >
                  <span className="flex-shrink-0 text-[#222222]" aria-hidden="true">{amenity.icon}</span>
                  <span className={`text-sm text-[#222222] ${amenity.unavailable ? 'line-through text-[#717171]' : ''}`}>
                    {amenity.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
