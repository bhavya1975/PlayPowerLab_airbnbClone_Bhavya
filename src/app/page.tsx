'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Header } from '@/components/header/Header';
import { ListingSubHeader } from '@/components/header/ListingSubHeader';
import { AmenitiesSection } from '@/components/listing/AmenitiesSection';
import { CalendarSection } from '@/components/listing/CalendarSection';
import { ReviewsSection } from '@/components/listing/ReviewsSection';
import { LocationMapSection } from '@/components/listing/LocationMapSection';
import { HostProfileSection } from '@/components/listing/HostProfileSection';
import { ThingsToKnowSection } from '@/components/listing/ThingsToKnowSection';
import { NearbyStaysCarousel } from '@/components/listing/NearbyStaysCarousel';
import { PhotoTourModal } from '@/components/listing/PhotoTourModal';
import { Share2, Heart, Star, ChevronRight } from 'lucide-react';

const LISTING = {
  title: 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10',
  subtitle: 'Entire serviced apartment in Candolim, India',
  specs: '3 guests · 1 bedroom · 1 bed · 1 bathroom',
  rating: 4.95,
  reviewCount: 19,
  pricePerNight: 28499,
  currency: '₹',
  nights: 5,
  checkIn: '10/18/2026',
  checkOut: '10/23/2026',
  host: {
    name: 'Mirashya Homes',
    avatar: 'MH',
    years: 2,
    color: '#2D5A27',
  },
  images: [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  ],
  highlights: [
    {
      icon: '🌿',
      title: 'Outdoor entertainment',
      description: 'The pool and alfresco dining are great for summer trips.',
    },
    {
      icon: '❄️',
      title: 'Designed for staying cool',
      description: 'Beat the heat with the A/C and ceiling fan.',
    },
    {
      icon: '🚪',
      title: 'Self check-in',
      description: 'You can check in with the building staff.',
    },
  ],
};

const PHOTO_TOUR_PARAM = 'PHOTO_TOUR_SCROLLABLE';

export default function HomePage() {
  const [isSubHeaderVisible, setIsSubHeaderVisible] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const [initialCategoryId, setInitialCategoryId] = useState<string | undefined>(undefined);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Category mapping for main gallery thumbnails
  const GALLERY_CATEGORIES = [
    'living-room-2', // Main photo (terrace jacuzzi)
    'living-room-1', // Photo 2 (living room)
    'full-kitchen',  // Photo 3 (kitchen)
    'bedroom',       // Photo 4 (bedroom)
    'full-bathroom', // Photo 5 (bathroom)
  ];

  // Sync photo tour modal state with URL parameter `?modal=PHOTO_TOUR_SCROLLABLE`
  useEffect(() => {
    const checkUrlParam = () => {
      const params = new URLSearchParams(window.location.search);
      const isModal = params.get('modal') === PHOTO_TOUR_PARAM;
      setIsPhotoTourOpen(isModal);
      if (isModal) {
        const photoId = params.get('photo_id');
        if (photoId) setInitialCategoryId(photoId);
      }
    };

    checkUrlParam();
    window.addEventListener('popstate', checkUrlParam);
    return () => window.removeEventListener('popstate', checkUrlParam);
  }, []);

  const openPhotoTour = useCallback((categoryId?: string) => {
    setInitialCategoryId(categoryId);
    setIsPhotoTourOpen(true);
    const url = new URL(window.location.href);
    url.searchParams.set('modal', PHOTO_TOUR_PARAM);
    if (categoryId) {
      url.searchParams.set('photo_id', categoryId);
    }
    window.history.pushState({}, '', url.toString());
  }, []);

  const closePhotoTour = useCallback(() => {
    setIsPhotoTourOpen(false);
    setInitialCategoryId(undefined);
    const url = new URL(window.location.href);
    url.searchParams.delete('modal');
    url.searchParams.delete('photo_id');
    window.history.pushState({}, '', url.pathname);
  }, []);

  // Show the listing navigation after the gallery leaves the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSubHeaderVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    const el = galleryRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  const totalPrice = LISTING.pricePerNight * LISTING.nights;

  return (
    <>
      <Header />
      <ListingSubHeader
        isVisible={isSubHeaderVisible}
        pricePerNight={LISTING.pricePerNight}
        nights={LISTING.nights}
        currency={LISTING.currency}
        rating={LISTING.rating}
        reviewCount={LISTING.reviewCount}
      />

      <main className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* ── Listing Title Row ── */}
        <section className="pt-6 pb-4">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-[22px] font-semibold text-[#222222] leading-snug">
              {LISTING.title}
            </h1>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                type="button"
                aria-label="Share this listing"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-[#222222] underline hover:bg-[#F7F7F7] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222]"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                type="button"
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                onClick={() => setIsWishlisted(prev => !prev)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-[#222222] underline hover:bg-[#F7F7F7] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222]"
              >
                <Heart
                  className="w-4 h-4 transition-colors duration-200"
                  fill={isWishlisted ? '#FF385C' : 'none'}
                  stroke={isWishlisted ? '#FF385C' : 'currentColor'}
                />
                Save
              </button>
            </div>
          </div>
        </section>

        {/* ── Photo Gallery ── */}
        <section id="section-photos" ref={galleryRef} className="rounded-2xl overflow-hidden cursor-pointer">
          <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[480px]">
            {/* Large main photo */}
            <div
              onClick={() => openPhotoTour(GALLERY_CATEGORIES[0])}
              className="col-span-2 row-span-2 overflow-hidden bg-gray-100 relative group"
            >
              <img
                src={LISTING.images[0]}
                alt="Main listing photo"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>

            {/* 4 smaller photos */}
            {LISTING.images.slice(1, 5).map((img, i) => (
              <div
                key={i}
                onClick={() => openPhotoTour(GALLERY_CATEGORIES[i + 1])}
                className="overflow-hidden bg-gray-100 relative group"
              >
                <img
                  src={img}
                  alt={`Listing photo ${i + 2}`}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                {/* "Show all photos" button on last thumbnail */}
                {i === 3 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openPhotoTour();
                    }}
                    aria-label="Show all photos"
                    className="absolute bottom-3 right-3 flex items-center gap-2 bg-white border border-[#222222] rounded-lg px-3 py-1.5 text-xs font-semibold text-[#222222] hover:bg-[#F7F7F7] transition-colors duration-150 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222]"
                  >
                    <svg viewBox="0 0 16 16" aria-hidden="true" className="w-3.5 h-3.5">
                      <path d="M3 1h10a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V3a1 1 0 00-1-1H3zm4 8H4v-1h3V6h1v3h3v1H8v3H7v-3z" />
                    </svg>
                    Show all photos
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Two-column listing content. This boundary ends after the calendar
            so the booking card naturally stops here and cannot overlap the
            full-width content that follows. ── */}
        <div className="mt-8 flex flex-col lg:flex-row gap-12 items-start">
          {/* ── Left Column ── */}
          <div className="flex-1 min-w-0">
            {/* Listing subtitle + specs */}
            <div className="pb-6 border-b border-[#DDDDDD]">
              <h2 className="text-2xl font-semibold text-[#222222]">{LISTING.subtitle}</h2>
              <p className="mt-1 text-[#717171] text-sm">{LISTING.specs}</p>
            </div>

            {/* Guest Favourite Banner */}
            <div className="py-6 border-b border-[#DDDDDD] flex items-center gap-6">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex flex-col items-center justify-center border border-[#DDDDDD] rounded-xl px-4 py-3 min-w-[110px]">
                  <span className="text-[10px] font-bold text-[#222222] tracking-wide uppercase leading-none">Guest</span>
                  <div className="flex items-center gap-0.5 my-0.5">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#222222]" aria-hidden="true">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold text-[#222222] tracking-wide uppercase leading-none">favourite</span>
                </div>
                <p className="text-sm text-[#717171] max-w-[180px] leading-snug">
                  One of the most loved homes on Airbnb, according to guests
                </p>
              </div>
              <div className="border-l border-[#DDDDDD] pl-6">
                <div className="text-3xl font-semibold text-[#222222]">{LISTING.rating}</div>
                <div className="flex gap-0.5 my-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-[#222222] text-[#222222]" />
                  ))}
                </div>
              </div>
              <div className="border-l border-[#DDDDDD] pl-6">
                <div className="text-3xl font-semibold text-[#222222]">{LISTING.reviewCount}</div>
                <div className="text-xs text-[#717171] underline cursor-pointer mt-1">Reviews</div>
              </div>
            </div>

            {/* Host row */}
            <div className="py-6 border-b border-[#DDDDDD] flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: LISTING.host.color }}
                aria-label={`Host: ${LISTING.host.name}`}
              >
                {LISTING.host.avatar}
              </div>
              <div>
                <p className="text-base font-semibold text-[#222222]">Hosted by {LISTING.host.name}</p>
                <p className="text-sm text-[#717171]">{LISTING.host.years} years hosting</p>
              </div>
            </div>

            {/* Highlights */}
            <div className="py-6 border-b border-[#DDDDDD] space-y-5">
              {LISTING.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{h.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-[#222222]">{h.title}</p>
                    <p className="text-sm text-[#717171] mt-0.5">{h.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Translation notice */}
            <div className="py-5 border-b border-[#DDDDDD]">
              <div className="flex items-start gap-3 bg-[#F7F7F7] rounded-xl px-4 py-3">
                <p className="text-sm text-[#717171]">
                  Some info has been automatically translated.{' '}
                  <button className="underline text-[#222222] font-semibold hover:text-[#717171] transition-colors">
                    Show original
                  </button>
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="py-6 border-b border-[#DDDDDD]">
              <p className="text-sm text-[#222222] leading-relaxed">
                🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind.
                Enjoy high-speed WiFi 📶, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍷, it&apos;s ideal for couples and solo travelers seeking a tranquil retreat with modern conveniences.
              </p>
              <button
                type="button"
                onClick={() => setShowFullDescription(prev => !prev)}
                className="mt-3 flex items-center gap-1 text-sm font-semibold text-[#222222] underline hover:text-[#717171] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222] rounded"
              >
                {showFullDescription ? 'Show less' : 'Show more'}
                <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${showFullDescription ? 'rotate-90' : ''}`} />
              </button>
            </div>

            {/* Where you'll sleep */}
            <div className="py-6 border-b border-[#DDDDDD]">
              <h3 className="text-xl font-semibold text-[#222222] mb-5">Where you&apos;ll sleep</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden border border-[#DDDDDD]">
                  <img
                    src="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=600&q=80"
                    alt="Bedroom"
                    className="w-full aspect-[16/10] object-cover"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <p className="text-base font-semibold text-[#222222]">Bedroom</p>
                    <p className="text-sm text-[#717171] mt-0.5">1 double bed</p>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-[#DDDDDD]">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
                    alt="Living room"
                    className="w-full aspect-[16/10] object-cover"
                    loading="lazy"
                  />
                  <div className="p-4">
                    <p className="text-base font-semibold text-[#222222]">Living room</p>
                    <p className="text-sm text-[#717171] mt-0.5">1 sofa</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What this place offers */}
            <AmenitiesSection totalCount={50} />

            {/* Calendar */}
            <CalendarSection location="Candolim" nights={5} />

          </div>

          {/* This sticky element is bounded by its two-column parent above. */}
          <aside className="lg:w-[380px] flex-shrink-0 self-start sticky top-20 z-20">
            {/* Discount banner */}
            <div className="flex items-center justify-between mb-4 px-4 py-3 border border-[#DDDDDD] rounded-xl bg-white shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-green-700" aria-hidden="true">🏷️</span>
                <div>
                  <p className="text-xs font-semibold text-[#222222]">Get 10% off your next stay.</p>
                  <p className="text-xs text-[#222222] underline cursor-pointer">Terms apply</p>
                </div>
              </div>
              <button
                type="button"
                className="text-sm font-semibold text-[#222222] border border-[#222222] rounded-lg px-3 py-1.5 hover:bg-[#F7F7F7] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222]"
              >
                Claim
              </button>
            </div>

            {/* Booking card */}
            <div className="border border-[#DDDDDD] rounded-2xl p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)] bg-white">
              {/* Price */}
              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="text-2xl font-semibold text-[#222222]">
                  {LISTING.currency}{LISTING.pricePerNight.toLocaleString('en-IN')}
                </span>
                <span className="text-base text-[#717171]">for {LISTING.nights} nights</span>
              </div>

              {/* Date inputs */}
              <div className="border border-[#DDDDDD] rounded-xl overflow-hidden mb-3">
                <div className="grid grid-cols-2">
                  <div className="p-3 border-r border-[#DDDDDD]">
                    <p className="text-[10px] font-bold text-[#222222] uppercase tracking-wide">Check-in</p>
                    <p className="text-sm text-[#222222] mt-0.5">{LISTING.checkIn}</p>
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] font-bold text-[#222222] uppercase tracking-wide">Checkout</p>
                    <p className="text-sm text-[#222222] mt-0.5">{LISTING.checkOut}</p>
                  </div>
                </div>
                <div className="border-t border-[#DDDDDD] p-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-[#222222] uppercase tracking-wide">Guests</p>
                    <p className="text-sm text-[#222222] mt-0.5">2 guests</p>
                  </div>
                  <svg viewBox="0 0 32 32" aria-hidden="true" className="w-4 h-4 text-[#222222]">
                    <path d="M28 12l-2-2-10 10-10-10-2 2 12 12z" fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* Free cancellation */}
              <p className="text-sm text-[#717171] text-center mb-4">
                Free cancellation before{' '}
                <span className="font-semibold text-[#222222]">17 October</span>
              </p>

              {/* Reserve button */}
              <button
                type="button"
                className="w-full h-12 rounded-lg bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white text-base font-semibold hover:from-[#D00837] hover:via-[#D10B58] hover:to-[#C30362] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF385C] focus-visible:ring-offset-2"
              >
                Reserve
              </button>

              <p className="text-center text-sm text-[#717171] mt-3">You won&apos;t be charged yet</p>

              {/* Price breakdown */}
              <div className="mt-5 pt-4 border-t border-[#DDDDDD] space-y-3">
                <div className="flex justify-between text-sm text-[#222222]">
                  <span className="underline">
                    {LISTING.currency}{LISTING.pricePerNight.toLocaleString('en-IN')} × {LISTING.nights} nights
                  </span>
                  <span>{LISTING.currency}{totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

            </div>

            {/* This action is intentionally outside the booking-card boundary. */}
            <div className="mt-4 flex items-center justify-center gap-1">
              <svg viewBox="0 0 16 16" aria-hidden="true" className="w-3.5 h-3.5 text-[#717171]">
                <path fillRule="evenodd" d="M3 2a1 1 0 011-1h8a1 1 0 011 1v1.586l1.707 1.707A1 1 0 0115 6v7a1 1 0 01-1 1H2a1 1 0 01.293-.707L3 3.586V2zm1 0v2h8V2H4zM2 6.414l1-1V5h10v.414l1 1V13H2V6.414z" fill="currentColor" clipRule="evenodd" />
              </svg>
              <button type="button" className="text-xs text-[#717171] underline hover:text-[#222222] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#222222] rounded">
                Report this listing
              </button>
            </div>
          </aside>
        </div>

        {/* ── Full-width listing content after the calendar ── */}
        {/* Full-width border line spanning the entire container */}
        <div className="border-t border-[#DDDDDD] w-full mt-0" />
        <div className="w-full">
          <ReviewsSection rating={LISTING.rating} reviewCount={LISTING.reviewCount} />
          <LocationMapSection locationTitle="Candolim, Goa, India" />
          <HostProfileSection />
          <ThingsToKnowSection />
          <NearbyStaysCarousel />
        </div>
      </main>

      {/* ── Full-Screen Photo Tour Modal ── */}
      <PhotoTourModal
        isOpen={isPhotoTourOpen}
        onClose={closePhotoTour}
        initialCategoryId={initialCategoryId}
      />
    </>
  );
}
