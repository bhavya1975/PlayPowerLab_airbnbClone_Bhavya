'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Share2, Heart, X } from 'lucide-react';

export interface PhotoItem {
  id: string;
  url: string;
  alt: string;
  layout?: 'full' | 'grid';
}

export interface PhotoCategoryGroup {
  id: string;
  category: string;
  subtext: string;
  thumbnail: string;
  images: PhotoItem[];
}

export const PHOTO_TOUR_GROUPS: PhotoCategoryGroup[] = [
  {
    id: 'living-room-1',
    category: 'Living room 1',
    subtext: 'Sofa · Air conditioning · Ceiling fan · TV',
    thumbnail: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=400&q=80',
    images: [
      {
        id: 'lr1-1',
        url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
        alt: 'Living room overview with sofa and dining table',
        layout: 'full',
      },
      {
        id: 'lr1-2',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        alt: 'TV unit and lounge seating',
        layout: 'grid',
      },
      {
        id: 'lr1-3',
        url: 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?auto=format&fit=crop&w=800&q=80',
        alt: 'Seating corner and warm lighting',
        layout: 'grid',
      },
    ],
  },
  {
    id: 'living-room-2',
    category: 'Living room 2',
    subtext: 'Ceiling fan · Hot tub',
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
    images: [
      {
        id: 'lr2-1',
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        alt: 'Jacuzzi lounge terrace area',
        layout: 'full',
      },
      {
        id: 'lr2-2',
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        alt: 'Rattan seating and private hot tub',
        layout: 'grid',
      },
      {
        id: 'lr2-3',
        url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
        alt: 'Outdoor patio lighting',
        layout: 'grid',
      },
    ],
  },
  {
    id: 'full-kitchen',
    category: 'Full kitchen',
    subtext: 'Refrigerator · Microwave · Stove · Cooking basics',
    thumbnail: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80',
    images: [
      {
        id: 'fk-1',
        url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
        alt: 'Modern full kitchen with dining counter',
        layout: 'full',
      },
    ],
  },
  {
    id: 'bedroom',
    category: 'Bedroom',
    subtext: '1 double bed · Air conditioning · Wardrobe · Mirror',
    thumbnail: 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?auto=format&fit=crop&w=400&q=80',
    images: [
      {
        id: 'br-1',
        url: 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?auto=format&fit=crop&w=1200&q=80',
        alt: 'Cozy master bedroom with double bed',
        layout: 'full',
      },
      {
        id: 'br-2',
        url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        alt: 'Bedroom window view and curtains',
        layout: 'grid',
      },
      {
        id: 'br-3',
        url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
        alt: 'Full length mirror and wardrobe',
        layout: 'grid',
      },
    ],
  },
  {
    id: 'full-bathroom',
    category: 'Full bathroom',
    subtext: 'Hot water · Shower · Hair dryer · Towels',
    thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
    images: [
      {
        id: 'fb-1',
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
        alt: 'Clean modern bathroom with glass shower',
        layout: 'full',
      },
    ],
  },
  {
    id: 'gym',
    category: 'Gym',
    subtext: 'Shared gym equipment · Treadmill · Weights',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80',
    images: [
      {
        id: 'gym-1',
        url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
        alt: 'Building shared fitness center',
        layout: 'full',
      },
    ],
  },
  {
    id: 'exterior',
    category: 'Exterior',
    subtext: 'Free parking on premises · Gated apartment complex',
    thumbnail: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80',
    images: [
      {
        id: 'ex-1',
        url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
        alt: 'Amor De Goa building exterior facade',
        layout: 'full',
      },
    ],
  },
  {
    id: 'pool',
    category: 'Pool',
    subtext: 'Outdoor shared pool · Sun loungers',
    thumbnail: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=400&q=80',
    images: [
      {
        id: 'pool-1',
        url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
        alt: 'Swimming pool view',
        layout: 'full',
      },
    ],
  },
  {
    id: 'additional-photos',
    category: 'Additional photos',
    subtext: 'Decor · Balcony view · Amenities',
    thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
    images: [
      {
        id: 'add-1',
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        alt: 'Cozy interior details',
        layout: 'full',
      },
    ],
  },
];

export interface PhotoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  groups?: PhotoCategoryGroup[];
  initialCategoryId?: string;
}

export const PhotoTourModal: React.FC<PhotoTourModalProps> = ({
  isOpen,
  onClose,
  groups = PHOTO_TOUR_GROUPS,
  initialCategoryId,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Flatten all images into a single list for the lightbox modal
  const allImages = groups.flatMap((g) => g.images);

  // Lock body scroll & Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedImageIndex !== null) {
          setSelectedImageIndex(null);
        } else {
          onClose();
        }
      } else if (selectedImageIndex !== null) {
        if (e.key === 'ArrowRight') {
          setSelectedImageIndex((prev) => (prev !== null && prev < allImages.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowLeft') {
          setSelectedImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, selectedImageIndex, allImages.length]);

  const scrollToCategory = (categoryId: string) => {
    const section = document.getElementById(`tour-section-${categoryId}`);
    const container = scrollContainerRef.current;
    if (section && container) {
      const containerTop = container.getBoundingClientRect().top;
      const sectionTop = section.getBoundingClientRect().top;
      const offset = sectionTop - containerTop + container.scrollTop;
      container.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  // Scroll to initial category when modal opens with initialCategoryId
  useEffect(() => {
    if (isOpen) {
      if (initialCategoryId) {
        // Small timeout to allow modal DOM rendering
        const timer = setTimeout(() => {
          scrollToCategory(initialCategoryId);
        }, 100);
        return () => clearTimeout(timer);
      } else if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
  }, [isOpen, initialCategoryId]);

  const openLightbox = (imgId: string) => {
    const idx = allImages.findIndex((img) => img.id === imgId);
    if (idx !== -1) {
      setSelectedImageIndex(idx);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Photo tour"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed inset-0 z-50 bg-white flex flex-col overflow-hidden"
        >
          {/* ── Fixed Header (outside scroll) ── */}
          <header className="flex-shrink-0 bg-white border-b border-[#DDDDDD] h-16 px-4 sm:px-8 flex items-center justify-between z-10">
            <button
              type="button"
              onClick={onClose}
              aria-label="Exit photo tour"
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#222222] hover:bg-[#F7F7F7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <h2 className="text-base font-semibold text-[#222222]">Photo tour</h2>

            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Share listing"
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#222222] hover:bg-[#F7F7F7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222]"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                onClick={() => setIsWishlisted((p) => !p)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#222222] hover:bg-[#F7F7F7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222]"
              >
                <Heart
                  className="w-4 h-4"
                  fill={isWishlisted ? '#FF385C' : 'none'}
                  stroke={isWishlisted ? '#FF385C' : 'currentColor'}
                />
              </button>
            </div>
          </header>

          {/* ── Scrollable Body ── */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto"
          >
            <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 pt-8">

              {/* ── Top Category Thumbnails Collection Grid ── */}
              <div className="mb-12">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                  {groups.map((group) => (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => scrollToCategory(group.id)}
                      className="group flex flex-col items-start text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222] rounded-xl"
                    >
                      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-2 border border-[#DDDDDD] group-hover:border-[#222222] transition-colors">
                        <img
                          src={group.thumbnail}
                          alt={group.category}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-xs font-semibold text-[#222222] group-hover:underline line-clamp-1">
                        {group.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Category Photo Feed Rows ── */}
              {groups.map((group, idx) => {
                const fullImgs = group.images.filter((i) => i.layout === 'full' || !i.layout);
                const gridImgs = group.images.filter((i) => i.layout === 'grid');

                return (
                  <div
                    key={group.id}
                    id={`tour-section-${group.id}`}
                    className={`flex flex-col md:flex-row gap-8 lg:gap-16 items-stretch ${
                      idx === 0 ? 'pt-4' : 'pt-16'
                    } pb-12 border-b border-[#DDDDDD] last:border-b-0 scroll-mt-20`}
                  >
                    {/* ── Left: Sticky Category Title ── */}
                    <div className="hidden md:block w-[260px] lg:w-[320px] flex-shrink-0 self-stretch">
                      <div className="sticky top-20 pt-2">
                        <h3 className="text-[28px] font-semibold text-[#222222] leading-tight mb-2">
                          {group.category}
                        </h3>
                        <p className="text-sm text-[#717171] leading-relaxed">
                          {group.subtext}
                        </p>
                      </div>
                    </div>

                    {/* ── Right: Photo Feed for this Group ── */}
                    <div className="flex-1 min-w-0 space-y-3">
                      {/* Mobile-only inline title */}
                      <div className="md:hidden mb-3">
                        <h3 className="text-2xl font-semibold text-[#222222]">{group.category}</h3>
                        <p className="text-sm text-[#717171] mt-0.5">{group.subtext}</p>
                      </div>

                      {/* Full-width images */}
                      {fullImgs.map((img) => (
                        <div
                          key={img.id}
                          onClick={() => openLightbox(img.id)}
                          className="rounded-2xl overflow-hidden bg-gray-100 cursor-pointer group relative"
                        >
                          <img
                            src={img.url}
                            alt={img.alt}
                            className="w-full aspect-[16/10] object-cover group-hover:scale-[1.01] transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}

                      {/* 2-column grid images */}
                      {gridImgs.length > 0 && (
                        <div className="grid grid-cols-2 gap-3">
                          {gridImgs.map((img) => (
                            <div
                              key={img.id}
                              onClick={() => openLightbox(img.id)}
                              className="rounded-2xl overflow-hidden bg-gray-100 cursor-pointer group relative"
                            >
                              <img
                                src={img.url}
                                alt={img.alt}
                                className="w-full aspect-[4/3] object-cover group-hover:scale-[1.01] transition-transform duration-300"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Bottom padding */}
              <div className="h-20" />
            </div>
          </div>

          {/* ── Full Image Lightbox Modal (White BG) ── */}
          <AnimatePresence>
            {selectedImageIndex !== null && (() => {
              // Derive the current category name from the flat image index
              let runningCount = 0;
              let currentCategory = '';
              for (const group of groups) {
                if (selectedImageIndex < runningCount + group.images.length) {
                  currentCategory = group.category;
                  break;
                }
                runningCount += group.images.length;
              }

              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-50 bg-white flex flex-col"
                >
                  {/* ── Lightbox Header ── */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 flex-shrink-0">
                    {/* Left: 9-dot grid icon → back to Photo Tour */}
                    <button
                      type="button"
                      onClick={() => setSelectedImageIndex(null)}
                      aria-label="Back to photo tour"
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <circle cx="2" cy="2" r="1.5" fill="#222" />
                        <circle cx="8" cy="2" r="1.5" fill="#222" />
                        <circle cx="14" cy="2" r="1.5" fill="#222" />
                        <circle cx="2" cy="8" r="1.5" fill="#222" />
                        <circle cx="8" cy="8" r="1.5" fill="#222" />
                        <circle cx="14" cy="8" r="1.5" fill="#222" />
                        <circle cx="2" cy="14" r="1.5" fill="#222" />
                        <circle cx="8" cy="14" r="1.5" fill="#222" />
                        <circle cx="14" cy="14" r="1.5" fill="#222" />
                      </svg>
                    </button>

                    {/* Center: Category title */}
                    <span className="text-sm font-semibold text-[#222222] absolute left-1/2 -translate-x-1/2">
                      {currentCategory}
                    </span>

                    {/* Right: Counter + Close button */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#222222]">
                        {selectedImageIndex + 1} of {allImages.length}
                      </span>
                      <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close all modals"
                        className="p-1 hover:opacity-70 transition-opacity"
                      >
                        <X className="w-4 h-4 text-[#222222]" />
                      </button>
                    </div>
                  </div>

                  {/* ── Center: Main Image ── */}
                  <div className="flex-1 flex items-center justify-center relative overflow-hidden px-16">
                    <img
                      src={allImages[selectedImageIndex].url}
                      alt={allImages[selectedImageIndex].alt}
                      className="max-h-[85vh] max-w-full object-contain rounded-lg"
                    />

                    {/* Left nav arrow — outer left edge */}
                    {selectedImageIndex > 0 && (
                      <button
                        type="button"
                        aria-label="Previous image"
                        onClick={() => setSelectedImageIndex(selectedImageIndex - 1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:shadow-md hover:border-gray-400 transition-all"
                      >
                        <ChevronLeft className="w-4 h-4 text-[#222222]" />
                      </button>
                    )}

                    {/* Right nav arrow — outer right edge */}
                    {selectedImageIndex < allImages.length - 1 && (
                      <button
                        type="button"
                        aria-label="Next image"
                        onClick={() => setSelectedImageIndex(selectedImageIndex + 1)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:shadow-md hover:border-gray-400 transition-all"
                      >
                        <ChevronRight className="w-4 h-4 text-[#222222]" />
                      </button>
                    )}
                  </div>

                  {/* ── Footer Caption ── */}
                  <div className="text-center text-sm text-[#717171] py-3 border-t border-gray-100 flex-shrink-0">
                    {allImages[selectedImageIndex].alt}
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
