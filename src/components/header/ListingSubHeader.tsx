'use client';

import React, { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SubHeaderTab {
  id: string;
  label: string;
  targetSectionId?: string;
}

const DEFAULT_TABS: SubHeaderTab[] = [
  { id: 'photos', label: 'Photos', targetSectionId: 'section-photos' },
  { id: 'amenities', label: 'Amenities', targetSectionId: 'section-amenities' },
  { id: 'reviews', label: 'Reviews', targetSectionId: 'section-reviews' },
  { id: 'location', label: 'Location', targetSectionId: 'section-location' },
];

export interface ListingSubHeaderProps {
  isVisible: boolean;
  pricePerNight?: number;
  nights?: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  onReserveClick?: () => void;
}

export const ListingSubHeader: React.FC<ListingSubHeaderProps> = ({
  isVisible,
  pricePerNight = 28499,
  nights = 5,
  currency = '₹',
  rating = 4.95,
  reviewCount = 19,
  onReserveClick,
}) => {
  const [activeTab, setActiveTab] = useState<string>('photos');
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Scroll spy: update active tab based on visible section
  React.useEffect(() => {
    if (!isVisible) return;

    const sections = DEFAULT_TABS.map(tab => ({
      id: tab.id,
      el: tab.targetSectionId ? document.getElementById(tab.targetSectionId) : null,
    })).filter((s): s is { id: string; el: HTMLElement } => s.el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const found = sections.find((s) => s.el === entry.target);
            if (found) {
              setActiveTab(found.id);
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: '-60px 0px -40% 0px' }
    );

    sections.forEach((s) => observer.observe(s.el));
    return () => observer.disconnect();
  }, [isVisible]);

  const handleTabClick = useCallback((tab: SubHeaderTab) => {
    setActiveTab(tab.id);
    if (tab.targetSectionId) {
      const section = document.getElementById(tab.targetSectionId);
      section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Keyboard: ArrowLeft / ArrowRight navigation for roving tabIndex
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, currentIdx: number) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIdx = (currentIdx + 1) % DEFAULT_TABS.length;
        const nextId = DEFAULT_TABS[nextIdx].id;
        setActiveTab(nextId);
        tabRefs.current[nextId]?.focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIdx = (currentIdx - 1 + DEFAULT_TABS.length) % DEFAULT_TABS.length;
        const prevId = DEFAULT_TABS[prevIdx].id;
        setActiveTab(prevId);
        tabRefs.current[prevId]?.focus();
      }
    },
    []
  );

  const totalPrice = pricePerNight * nights;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="sticky top-0 z-40 bg-white border-b border-[#DDDDDD]"
          role="navigation"
          aria-label="Listing sections"
        >
          <div className="max-w-[2520px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
            <div className="flex items-center justify-between">
              {/* Tab bar */}
              <div role="tablist" aria-label="Listing details sections" className="flex items-center gap-1">
                {DEFAULT_TABS.map((tab, idx) => (
                  <button
                    key={tab.id}
                    ref={el => { tabRefs.current[tab.id] = el; }}
                    role="tab"
                    type="button"
                    aria-selected={activeTab === tab.id}
                    tabIndex={activeTab === tab.id ? 0 : -1}
                    onClick={() => handleTabClick(tab)}
                    onKeyDown={e => handleKeyDown(e, idx)}
                    className={`relative px-3 py-5 text-sm font-semibold transition-colors duration-150 focus:outline-none focus-visible:underline whitespace-nowrap
                      ${activeTab === tab.id ? 'text-[#222222]' : 'text-[#717171] hover:text-[#222222]'}`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#222222] rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Price + Reserve (right side) */}
              <div className="hidden md:flex items-center gap-3">
                <div className="text-right">
                  <span className="text-sm font-semibold text-[#222222]">
                    {currency}{pricePerNight.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-[#717171]"> for {nights} nights</span>
                  <div className="flex items-center justify-end gap-1 mt-0.5">
                    <svg viewBox="0 0 32 32" className="w-3 h-3 fill-[#222222]" aria-hidden="true">
                      <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.124-8.885a1 1 0 0 0-1.816 0z" />
                    </svg>
                    <span className="text-xs font-semibold text-[#222222]">{rating}</span>
                    <span className="text-xs text-[#717171]">· {reviewCount} reviews</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onReserveClick}
                  className="h-10 px-5 bg-[#FF385C] text-white text-sm font-semibold rounded-lg hover:bg-[#E00B41] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF385C] focus-visible:ring-offset-2"
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
