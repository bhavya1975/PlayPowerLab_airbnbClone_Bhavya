'use client';

import React, { useState } from 'react';
import { Search, Plus, Minus, Home, ChevronRight } from 'lucide-react';

export interface LocationMapSectionProps {
  locationTitle?: string;
  neighbourhoodText?: string;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({
  locationTitle = 'Candolim, Goa, India',
  neighbourhoodText = 'Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.',
}) => {
  const [showFullHighlights, setShowFullHighlights] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <section id="section-location" className="py-8 border-b border-[#DDDDDD]" aria-labelledby="location-heading">
      <h3 id="location-heading" className="text-xl font-semibold text-[#222222] mb-1">
        Where you&apos;ll be
      </h3>
      <p className="text-sm text-[#222222] mb-6">{locationTitle}</p>

      {/* Styled Interactive Map */}
      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-[#e5ece4] border border-[#DDDDDD]">
        {/* Map Vector Graphic (Water & Land zones) */}
        <svg className="w-full h-full object-cover opacity-90" viewBox="0 0 1000 500" preserveAspectRatio="none">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#d5ded3" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="#e5ece4" />
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Water polygon */}
          <path d="M 0 0 L 350 0 L 220 500 L 0 500 Z" fill="#b4d7e8" />

          {/* Green land circles / parks */}
          <circle cx="360" cy="210" r="35" fill="#d0e2c6" opacity="0.8" />
          <circle cx="640" cy="270" r="45" fill="#d0e2c6" opacity="0.8" />
        </svg>

        {/* Top-left search button */}
        <button
          type="button"
          aria-label="Search map"
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#222222] hover:bg-[#F7F7F7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Top-right zoom controls */}
        <div className="absolute top-4 right-4 flex flex-col bg-white rounded-xl shadow-md overflow-hidden border border-[#DDDDDD]">
          <button
            type="button"
            aria-label="Zoom in"
            onClick={() => setZoomLevel(z => Math.min(z + 0.2, 2))}
            className="w-10 h-10 flex items-center justify-center text-[#222222] hover:bg-[#F7F7F7] border-b border-[#DDDDDD] transition-colors focus:outline-none"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Zoom out"
            onClick={() => setZoomLevel(z => Math.max(z - 0.2, 0.6))}
            className="w-10 h-10 flex items-center justify-center text-[#222222] hover:bg-[#F7F7F7] transition-colors focus:outline-none"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* Center Home Location Pin */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-transform duration-300"
          style={{ transform: `translate(-50%, -50%) scale(${zoomLevel})` }}
        >
          <div className="relative flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#222222] text-white flex items-center justify-center shadow-2xl z-10 border-2 border-white">
              <Home className="w-6 h-6 fill-white stroke-none" />
            </div>
            {/* Soft pulse glow */}
            <div className="absolute w-16 h-16 rounded-full bg-black/10 animate-ping" />
          </div>
        </div>
      </div>

      <p className="text-xs text-[#717171] mt-3">Exact location will be provided after booking.</p>

      {/* Neighbourhood highlights */}
      <div className="mt-8">
        <h4 className="text-base font-semibold text-[#222222] mb-2">Neighbourhood highlights</h4>
        <p className="text-sm text-[#222222] leading-relaxed">
          {neighbourhoodText}
          {showFullHighlights && (
            <span> The property is situated in a tranquil residential pocket, making it ideal for families and couples alike.</span>
          )}
        </p>
        <button
          type="button"
          onClick={() => setShowFullHighlights(prev => !prev)}
          className="mt-3 flex items-center gap-1 text-sm font-semibold text-[#222222] underline hover:text-[#717171] transition-colors focus:outline-none rounded"
        >
          {showFullHighlights ? 'Show less' : 'Show more'}
          <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${showFullHighlights ? 'rotate-90' : ''}`} />
        </button>
      </div>
    </section>
  );
};
