'use client';

import React, { useRef, useState } from 'react';
import { Star, ChevronRight } from 'lucide-react';

interface ReviewCategory {
  id: string;
  label: string;
  score: number;
  icon: React.ReactNode;
}

interface ReviewKeyword {
  id: string;
  label: string;
  count: number;
  emoji: string;
}

interface Review {
  id: string;
  author: string;
  avatarInitial: string;
  avatarColor: string;
  avatarImage?: string;
  tenure: string;
  rating: number;
  date: string;
  text: string;
  truncated?: boolean;
}

// Clean vertical-stacked category ratings matching targeted Airbnb design
const CATEGORY_RATINGS: ReviewCategory[] = [
  {
    id: 'cleanliness',
    label: 'Cleanliness',
    score: 5.0,
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-none stroke-[#222222] stroke-[2]" aria-hidden="true">
        <path d="M14 4h4v4h-4zM16 8v5M12 13h8l-1.5 15h-5L12 13zM20 10l3 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'accuracy',
    label: 'Accuracy',
    score: 5.0,
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-none stroke-[#222222] stroke-[2]" aria-hidden="true">
        <circle cx="16" cy="16" r="11" />
        <path d="M11 16l3.5 3.5 6.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'checkin',
    label: 'Check-in',
    score: 5.0,
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-none stroke-[#222222] stroke-[2]" aria-hidden="true">
        <circle cx="10" cy="22" r="5" />
        <path d="M14 18l12-12M22 10l3 3M19 13l2 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'communication',
    label: 'Communication',
    score: 5.0,
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-none stroke-[#222222] stroke-[2]" aria-hidden="true">
        <path d="M25 6H7a2 2 0 00-2 2v14a2 2 0 002 2h4l4 4 4-4h8a2 2 0 002-2V8a2 2 0 00-2-2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'location',
    label: 'Location',
    score: 4.8,
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-none stroke-[#222222] stroke-[2]" aria-hidden="true">
        <path d="M6 7l7-3 6 3 7-3v18l-7 3-6-3-7 3V7zM13 4v18M19 7v18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'value',
    label: 'Value',
    score: 4.8,
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-none stroke-[#222222] stroke-[2]" aria-hidden="true">
        <path d="M4 16L16 4h12v12L16 28 4 16z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="22" cy="10" r="1.5" fill="#222222" />
      </svg>
    ),
  },
];

const KEYWORDS: ReviewKeyword[] = [
  { id: 'comfort', label: 'Comfort', count: 6, emoji: '🛋️' },
  { id: 'accuracy', label: 'Accuracy', count: 5, emoji: '✅' },
  { id: 'hottub', label: 'Hot tub', count: 5, emoji: '🛁' },
  { id: 'condition', label: 'Condition', count: 4, emoji: '🏠' },
  { id: 'hospitality', label: 'Hospitality', count: 8, emoji: '🤝' },
  { id: 'cleanliness', label: 'Cleanliness', count: 4, emoji: '✨' },
  { id: 'amenities', label: 'Amenities', count: 2, emoji: '🎯' },
];

const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1', author: 'Amit', avatarInitial: 'A', avatarColor: '#E8A87C',
    tenure: '2 months on Airbnb', rating: 5, date: '1 week ago',
    text: 'Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.',
  },
  {
    id: 'r2', author: 'Aheesh', avatarInitial: 'A', avatarColor: '#5B8DB8',
    avatarImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
    tenure: '3 years on Airbnb', rating: 5, date: '2 weeks ago',
    text: 'We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.',
    truncated: true,
  },
  {
    id: 'r3', author: 'Samiksha', avatarInitial: 'S', avatarColor: '#E8C99A',
    avatarImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80',
    tenure: '8 months on Airbnb', rating: 4, date: 'May 2026',
    text: 'the host nitish was really great help',
  },
  {
    id: 'r4', author: 'Vedant', avatarInitial: 'V', avatarColor: '#9B8EA0',
    tenure: '4 years on Airbnb', rating: 5, date: 'May 2026',
    text: 'We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived.',
    truncated: true,
  },
  {
    id: 'r5', author: 'Vaibhav S', avatarInitial: 'V', avatarColor: '#6BA8A9',
    tenure: '3 years on Airbnb', rating: 5, date: 'May 2026',
    text: "Great great experience living out there, can't expect more, will always look for it in the future and will recommend my friends too.",
  },
  {
    id: 'r6', author: 'Mohd', avatarInitial: 'M', avatarColor: '#C49A8A',
    avatarImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80',
    tenure: '5 years on Airbnb', rating: 5, date: 'May 2026',
    text: 'Great place. Exactly as described in the listing.',
  },
];

const RATING_BARS = [
  { stars: 5, count: 17 },
  { stars: 4, count: 2 },
  { stars: 3, count: 0 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];
const TOTAL_REVIEWS = RATING_BARS.reduce((s, r) => s + r.count, 0);

function LaurelLeft({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 49 80"
      aria-hidden="true"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M38.3 72.6c-1.7-3.2-4.8-5.5-8.4-6.1 2.5-2.5 3.8-6 3.4-9.6-.4-3.4-2.2-6.4-4.9-8.3 3.1-.1 6.1-1.5 8.2-4 2.2-2.7 3-6.2 2.3-9.5 2.7 1.1 5.8 1.1 8.5-.1 2.8-1.3 4.9-3.7 5.7-6.6-2.1 1.1-4.6 1.4-6.9.7 2.5-1.8 4.1-4.6 4.3-7.7.3-3.1-.9-6.1-3-8.3-1.2 2.4-1.6 5.2-.9 7.8-2-2.1-4.9-3.3-7.9-3.1-3 .2-5.7 1.7-7.4 4-1.8 2.3-2.4 5.3-1.8 8.1-2.5-1.7-5.6-2.3-8.5-1.6-3 .7-5.5 2.7-6.9 5.4-1.4 2.7-1.5 5.8-.4 8.6-2.7-.8-5.7-.5-8.2.9-2.5 1.4-4.3 3.8-4.9 6.6-.6 2.8.1 5.7 1.7 7.9C1.2 56 .7 53.2 1.4 50.6c.8 3 2.8 5.6 5.6 7.1 2.7 1.5 5.9 1.7 8.7.7-1.4 2.5-1.7 5.5-.8 8.2.9 2.7 2.9 4.9 5.5 6.1 2.6 1.2 5.6 1.2 8.2 0-1 2.8-.9 5.9.4 8.5H44c-1.5-2.6-4.2-4.5-5.7-8.6z" />
    </svg>
  );
}

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-2.5 h-2.5 ${i < count ? 'fill-[#222222] text-[#222222]' : 'fill-[#DDDDDD] text-[#DDDDDD]'}`}
        />
      ))}
    </div>
  );
}

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const MAX_CHARS = 140;
  const shouldTruncate = review.truncated && review.text.length > MAX_CHARS && !expanded;

  return (
    <article className="space-y-3">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
          style={{ backgroundColor: review.avatarColor }}
        >
          {review.avatarImage ? (
            <img src={review.avatarImage} alt={review.author} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-sm font-semibold">
              {review.avatarInitial}
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#222222]">{review.author}</p>
          <p className="text-xs text-[#717171]">{review.tenure}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <StarRow count={review.rating} />
        <span className="text-xs text-[#717171]">· {review.date}</span>
      </div>

      <p className="text-sm text-[#222222] leading-relaxed">
        {shouldTruncate ? `${review.text.slice(0, MAX_CHARS)}...` : review.text}
      </p>

      {review.truncated && review.text.length > MAX_CHARS && (
        <button
          type="button"
          onClick={() => setExpanded(prev => !prev)}
          className="flex items-center gap-1 text-sm font-semibold text-[#222222] underline hover:text-[#717171] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222] rounded"
        >
          {expanded ? 'Show less' : 'Show more'}
          <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`} />
        </button>
      )}
    </article>
  );
};

export interface ReviewsSectionProps {
  rating?: number;
  reviewCount?: number;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  rating = 4.95,
  reviewCount = 19,
}) => {
  const keywordRef = useRef<HTMLDivElement>(null);

  return (
    <section id="section-reviews" className="w-full py-12" aria-labelledby="reviews-heading">

      {/* ── Rating Hero: large number flanked by laurel branches ── */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-4 mb-3">
          <LaurelLeft className="w-14 h-14 text-[#222222] flex-shrink-0" />

          <span className="text-6xl sm:text-[72px] font-semibold text-[#222222] tracking-tight leading-none">
            {rating}
          </span>

          <LaurelLeft className="w-14 h-14 text-[#222222] flex-shrink-0 scale-x-[-1]" />
        </div>

        <h2
          id="reviews-heading"
          className="text-2xl sm:text-[26px] font-semibold text-[#222222] mb-2"
        >
          Guest favourite
        </h2>

        <p className="text-base text-[#717171] max-w-[320px] mx-auto leading-relaxed">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>

        <button
          type="button"
          className="mt-2 text-sm font-semibold text-[#222222] underline hover:text-[#717171] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222] rounded"
        >
          How reviews work
        </button>
      </div>

      {/* ── Rating Breakdown: 7-column layout with vertical dividers ── */}
      <div className="py-6 border-t border-b border-gray-200 mb-8">
        <div className="grid grid-cols-7 gap-0 divide-x divide-gray-200">
          {/* Column 1: Overall rating (stacked 5-to-1 distribution bars) */}
          <div className="pr-5 flex flex-col">
            <p className="text-sm font-semibold text-[#222222] mb-3">Overall rating</p>
            <div className="space-y-1.5 flex-1 flex flex-col justify-center">
              {RATING_BARS.map(({ stars, count }) => (
                <div key={stars} className="flex items-center gap-2">
                  <span className="text-xs text-[#717171] w-2 text-right">{stars}</span>
                  <div className="flex-1 h-[3px] bg-[#EBEBEB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#222222] rounded-full"
                      style={{ width: `${TOTAL_REVIEWS > 0 ? (count / TOTAL_REVIEWS) * 100 : 0}%` }}
                      role="presentation"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Columns 2–7: Category ratings (Label → Score → Icon, vertical stack) */}
          {CATEGORY_RATINGS.map((cat) => (
            <div
              key={cat.id}
              className="px-5 flex flex-col justify-between"
            >
              <span className="text-sm text-[#222222]">{cat.label}</span>
              <span className="text-base font-bold text-[#222222] mt-2">
                {cat.score.toFixed(1)}
              </span>
              <div className="mt-auto pt-2">{cat.icon}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Keyword chips row ── */}
      <div
        ref={keywordRef}
        className="flex items-center gap-2.5 overflow-x-auto scrollbar-none pb-1 mb-6"
        role="list"
        aria-label="Review keywords"
      >
        {KEYWORDS.map(kw => (
          <button
            key={kw.id}
            type="button"
            role="listitem"
            className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 bg-gray-50/50 rounded-full text-sm text-[#222222] whitespace-nowrap hover:border-[#222222] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222] flex-shrink-0"
          >
            <span aria-hidden="true">{kw.emoji}</span>
            <span className="font-medium">{kw.label}</span>
            <span className="text-[#717171]">{kw.count}</span>
          </button>
        ))}
      </div>

      {/* ── Divider between chips and review cards ── */}
      <div className="border-b border-gray-200 mb-8" />

      {/* ── Review Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10 mb-10">
        {MOCK_REVIEWS.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Show all button */}
      <button
        type="button"
        className="px-6 py-3.5 border border-[#222222] rounded-lg text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222]"
      >
        Show all {reviewCount} reviews
      </button>

      {/* Bottom border */}
      <div className="border-b border-gray-200 mt-12" />
    </section>
  );
};
