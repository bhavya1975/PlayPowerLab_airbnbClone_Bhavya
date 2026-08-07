'use client';

import React from 'react';
import { Search } from 'lucide-react';

export interface CompactSearchPillProps {
  onWhereClick?: () => void;
  onWhenClick?: () => void;
  onGuestsClick?: () => void;
}

export const CompactSearchPill: React.FC<CompactSearchPillProps> = ({
  onWhereClick,
  onWhenClick,
  onGuestsClick,
}) => {
  return (
    <div
      role="search"
      className="flex items-center h-[48px] border border-[#DDDDDD] rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-shadow duration-200 bg-white cursor-pointer"
    >
      {/* Anywhere segment */}
      <button
        type="button"
        onClick={onWhereClick}
        aria-label="Search location – Anywhere"
        className="flex items-center h-full px-5 rounded-full text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#222222]"
      >
        Anywhere
      </button>

      {/* Divider */}
      <div className="h-5 w-px bg-[#DDDDDD] flex-shrink-0" aria-hidden="true" />

      {/* Anytime segment */}
      <button
        type="button"
        onClick={onWhenClick}
        aria-label="Search dates – Anytime"
        className="flex items-center h-full px-5 rounded-full text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#222222]"
      >
        Anytime
      </button>

      {/* Divider */}
      <div className="h-5 w-px bg-[#DDDDDD] flex-shrink-0" aria-hidden="true" />

      {/* Add guests segment */}
      <button
        type="button"
        onClick={onGuestsClick}
        aria-label="Search guests – Add guests"
        className="flex items-center h-full pl-5 pr-2 rounded-full gap-3 hover:bg-[#F7F7F7] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#222222]"
      >
        <span className="text-sm font-normal text-[#717171] whitespace-nowrap">
          Add guests
        </span>
        {/* Pink Search Button */}
        <span
          aria-hidden="true"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF385C] flex-shrink-0"
        >
          <Search className="w-3.5 h-3.5 text-white" strokeWidth={3} />
        </span>
      </button>
    </div>
  );
};
