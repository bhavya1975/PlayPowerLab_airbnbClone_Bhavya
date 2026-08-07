'use client';

import React, { useState } from 'react';
import {
  UtensilsCrossed, Wifi, BriefcaseBusiness, Car, Waves, Flame, PawPrint, Camera, AlertTriangle,
  Bath, Wind, Monitor, Snowflake, Home, ShieldAlert, Key, Shirt, Coffee, Wine, Tv, SunSnow, TreeDeciduous, 
  MapPin, Baby, CheckSquare, Droplets, ThermometerSun
} from 'lucide-react';

interface AmenityItem {
  name: string;
  unavailable?: boolean;
}

interface AmenityCategory {
  category: string;
  items: AmenityItem[];
}

const AMENITIES_DATA: AmenityCategory[] = [
  {
    category: 'Bathroom',
    items: [
      { name: 'Hairdryer' },
      { name: 'Cleaning products' },
      { name: 'Shampoo' },
      { name: 'Hot water' },
      { name: 'Shower gel' },
    ]
  },
  {
    category: 'Bedroom and laundry',
    items: [
      { name: 'Washing machine' },
      { name: 'Hangers' },
      { name: 'Bed linen' },
      { name: 'Room-darkening blinds' },
      { name: 'Iron' },
      { name: 'Clothes storage' },
    ]
  },
  {
    category: 'Entertainment',
    items: [
      { name: 'TV' },
    ]
  },
  {
    category: 'Family',
    items: [
      { name: 'Cot' },
    ]
  },
  {
    category: 'Heating and cooling',
    items: [
      { name: 'Air conditioning' },
      { name: 'Ceiling fan' },
    ]
  },
  {
    category: 'Home safety',
    items: [
      { name: 'Exterior security cameras on property' },
      { name: 'Carbon monoxide alarm', unavailable: true },
      { name: 'Smoke alarm', unavailable: true },
    ]
  },
  {
    category: 'Internet and office',
    items: [
      { name: 'Wifi' },
      { name: 'Dedicated workspace' },
    ]
  },
  {
    category: 'Kitchen and dining',
    items: [
      { name: 'Kitchen' },
      { name: 'Fridge' },
      { name: 'Freezer' },
      { name: 'Microwave' },
      { name: 'Cooking basics' },
      { name: 'Crockery and cutlery' },
      { name: 'Kettle' },
      { name: 'Coffee' },
      { name: 'Wine glasses' },
      { name: 'Toaster' },
      { name: 'Blender' },
      { name: 'Cooker' },
    ]
  },
  {
    category: 'Location features',
    items: [
      { name: 'Private entrance' },
    ]
  },
  {
    category: 'Outdoor',
    items: [
      { name: 'Patio or balcony' },
      { name: 'Outdoor dining area' },
    ]
  },
  {
    category: 'Parking and facilities',
    items: [
      { name: 'Free parking on premises' },
      { name: 'Pool' },
      { name: 'Hot tub' },
      { name: 'Gym' },
    ]
  },
  {
    category: 'Services',
    items: [
      { name: 'Pets allowed' },
      { name: 'Cleaning available during stay' },
      { name: 'Long-term stays allowed' },
      { name: 'Self check-in' },
    ]
  }
];

const getIconForAmenity = (name: string): React.ReactNode => {
  const n = name.toLowerCase();
  if (n.includes('wifi')) return <Wifi className="w-6 h-6 stroke-[1.5]" />;
  if (n.includes('kitchen') || n.includes('cook')) return <UtensilsCrossed className="w-6 h-6 stroke-[1.5]" />;
  if (n.includes('parking')) return <Car className="w-6 h-6 stroke-[1.5]" />;
  if (n.includes('pool')) return <Waves className="w-6 h-6 stroke-[1.5]" />;
  if (n.includes('hot tub')) return <Flame className="w-6 h-6 stroke-[1.5]" />;
  if (n.includes('pet')) return <PawPrint className="w-6 h-6 stroke-[1.5]" />;
  if (n.includes('camera')) return <Camera className="w-6 h-6 stroke-[1.5]" />;
  if (n.includes('alarm')) return <AlertTriangle className="w-6 h-6 stroke-[1.5]" />;
  if (n.includes('workspace')) return <BriefcaseBusiness className="w-6 h-6 stroke-[1.5]" />;
  if (n.includes('bath') || n.includes('shower') || n.includes('shampoo')) return <Bath className="w-6 h-6 stroke-[1.5]" />;
  if (n.includes('wash') || n.includes('iron') || n.includes('cloth') || n.includes('hanger')) return <Shirt className="w-6 h-6 stroke-[1.5]" />;
  if (n.includes('tv')) return <Tv className="w-6 h-6 stroke-[1.5]" />;
  if (n.includes('air conditioning') || n.includes('fan')) return <Wind className="w-6 h-6 stroke-[1.5]" />;
  if (n.includes('fridge') || n.includes('freezer')) return <Snowflake className="w-6 h-6 stroke-[1.5]" />;
  if (n.includes('coffee') || n.includes('kettle')) return <Coffee className="w-6 h-6 stroke-[1.5]" />;
  if (n.includes('wine')) return <Wine className="w-6 h-6 stroke-[1.5]" />;
  if (n.includes('entrance') || n.includes('check-in')) return <Key className="w-6 h-6 stroke-[1.5]" />;
  if (n.includes('patio') || n.includes('outdoor')) return <TreeDeciduous className="w-6 h-6 stroke-[1.5]" />;
  if (n.includes('cot') || n.includes('baby')) return <Baby className="w-6 h-6 stroke-[1.5]" />;
  if (n.includes('water')) return <Droplets className="w-6 h-6 stroke-[1.5]" />;
  if (n.includes('clean')) return <CheckSquare className="w-6 h-6 stroke-[1.5]" />;
  return <CheckSquare className="w-6 h-6 stroke-[1.5]" />;
};

export interface AmenitiesSectionProps {
  totalCount?: number;
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = () => {
  const [showModal, setShowModal] = useState(false);

  // Flatten for the preview
  const previewAmenities = [
    { name: 'Kitchen', icon: getIconForAmenity('Kitchen') },
    { name: 'Wifi', icon: getIconForAmenity('Wifi') },
    { name: 'Dedicated workspace', icon: getIconForAmenity('Dedicated workspace') },
    { name: 'Free parking on premises', icon: getIconForAmenity('Free parking on premises') },
    { name: 'Pool', icon: getIconForAmenity('Pool') },
    { name: 'Hot tub', icon: getIconForAmenity('Hot tub') },
    { name: 'Pets allowed', icon: getIconForAmenity('Pets allowed') },
    { name: 'TV', icon: getIconForAmenity('TV') },
    { name: 'Carbon monoxide alarm', icon: getIconForAmenity('Carbon monoxide alarm'), unavailable: true },
    { name: 'Smoke alarm', icon: getIconForAmenity('Smoke alarm'), unavailable: true },
  ];

  // Calculate total amenities
  const totalAmenities = AMENITIES_DATA.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <section id="section-amenities" className="py-6 border-b border-[#DDDDDD]" aria-labelledby="amenities-heading">
      <h3 id="amenities-heading" className="text-[22px] font-semibold text-[#222222] mb-6">
        What this place offers
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        {previewAmenities.map((amenity, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-4 ${amenity.unavailable ? 'opacity-50' : ''}`}
          >
            <span
              className={`flex-shrink-0 text-[#222222] ${amenity.unavailable ? 'line-through opacity-70' : ''}`}
              aria-hidden="true"
            >
              {amenity.icon}
            </span>
            <span
              className={`text-base text-[#222222] ${amenity.unavailable ? 'line-through text-[#717171]' : ''}`}
            >
              {amenity.name}
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
        className="mt-8 px-6 py-3 border border-[#222222] rounded-lg text-base font-semibold text-[#222222] hover:bg-[#F7F7F7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222]"
      >
        Show all {totalAmenities} amenities
      </button>

      {/* ── Amenities Full Modal ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white w-full sm:max-w-3xl sm:rounded-2xl max-h-[90vh] sm:max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:fade-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center px-6 py-4 border-b border-[#DDDDDD] flex-shrink-0">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Close amenities modal"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F7F7F7] transition-colors -ml-2"
              >
                <svg viewBox="0 0 32 32" className="w-4 h-4" aria-hidden="true"><path d="M6 6L26 26M26 6L6 26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 pb-20 sm:px-10">
              <h2 className="text-[28px] font-semibold text-[#222222] mb-8">What this place offers</h2>
              
              <div className="space-y-10">
                {AMENITIES_DATA.map((cat, idx) => (
                  <div key={idx}>
                    <h3 className="text-lg font-semibold text-[#222222] mb-6">{cat.category}</h3>
                    <div className="space-y-4">
                      {cat.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-4 py-1">
                          <span className={`text-[#222222] flex-shrink-0 ${item.unavailable ? 'opacity-40 line-through' : ''}`}>
                            {getIconForAmenity(item.name)}
                          </span>
                          <span className={`text-[#222222] text-base ${item.unavailable ? 'line-through text-[#717171]' : ''}`}>
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                    {idx < AMENITIES_DATA.length - 1 && (
                      <div className="border-b border-[#DDDDDD] mt-8" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
