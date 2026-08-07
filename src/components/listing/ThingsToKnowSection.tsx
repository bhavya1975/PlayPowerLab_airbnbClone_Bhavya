'use client';

import React from 'react';
import { Calendar, KeyRound, ShieldAlert } from 'lucide-react';

export const ThingsToKnowSection: React.FC = () => {
  return (
    <section className="py-8 border-b border-[#DDDDDD]" aria-labelledby="things-to-know-heading">
      <h3 id="things-to-know-heading" className="text-xl font-semibold text-[#222222] mb-6">
        Things to know
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cancellation policy */}
        <div className="space-y-3">
          <Calendar className="w-6 h-6 text-[#222222]" />
          <h4 className="text-base font-semibold text-[#222222]">Cancellation policy</h4>
          <p className="text-sm text-[#717171] leading-relaxed">
            Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.
          </p>
          <p className="text-sm text-[#717171]">Review this host&apos;s full policy for details.</p>
          <button
            type="button"
            className="text-sm font-semibold text-[#222222] underline hover:text-[#717171] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222] rounded inline-block pt-1"
          >
            Learn more
          </button>
        </div>

        {/* House rules */}
        <div className="space-y-3">
          <KeyRound className="w-6 h-6 text-[#222222]" />
          <h4 className="text-base font-semibold text-[#222222]">House rules</h4>
          <ul className="text-sm text-[#717171] space-y-1">
            <li>Check-in after 2:00 pm</li>
            <li>Checkout before 11:00 am</li>
            <li>3 guests maximum</li>
          </ul>
          <button
            type="button"
            className="text-sm font-semibold text-[#222222] underline hover:text-[#717171] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222] rounded inline-block pt-1"
          >
            Learn more
          </button>
        </div>

        {/* Safety & property */}
        <div className="space-y-3">
          <ShieldAlert className="w-6 h-6 text-[#222222]" />
          <h4 className="text-base font-semibold text-[#222222]">Safety &amp; property</h4>
          <ul className="text-sm text-[#717171] space-y-1">
            <li>Carbon monoxide alarm not reported</li>
            <li>Smoke alarm not reported</li>
            <li>Exterior security cameras on property</li>
          </ul>
          <button
            type="button"
            className="text-sm font-semibold text-[#222222] underline hover:text-[#717171] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222] rounded inline-block pt-1"
          >
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
};
