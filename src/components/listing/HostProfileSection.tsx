'use client';

import React from 'react';
import { Star, ShieldCheck, GraduationCap, Lightbulb } from 'lucide-react';

interface CoHost {
  name: string;
  avatarColor: string;
  avatarImage?: string;
  initials: string;
}

const CO_HOSTS: CoHost[] = [
  { name: 'Sharath', avatarColor: '#7A6B5D', initials: 'S', avatarImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80' },
  { name: 'Aman Dev Pahwa', avatarColor: '#A85E48', initials: 'A', avatarImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80' },
  { name: 'Maria Karen Priyanka', avatarColor: '#8C6C82', initials: 'M', avatarImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80' },
  { name: 'Simran', avatarColor: '#4C6E65', initials: 'S', avatarImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80' },
  { name: 'Pallavi', avatarColor: '#4A6185', initials: 'P', avatarImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80' },
  { name: 'Sanyukta', avatarColor: '#855E4A', initials: 'S', avatarImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80' },
  { name: 'Shruti', avatarColor: '#F5E6EB', initials: 'S' },
  { name: 'Amisha', avatarColor: '#E6F0FA', initials: 'A' },
];

export const HostProfileSection: React.FC = () => {
  return (
    <section className="py-8 border-b border-[#DDDDDD]" aria-labelledby="host-heading">
      <h3 id="host-heading" className="text-xl font-semibold text-[#222222] mb-8">
        Meet your host
      </h3>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left Column: Host Hero Card */}
        <div className="w-full lg:w-[380px] flex-shrink-0">
          <div className="border border-[#DDDDDD] rounded-3xl p-6 shadow-[0_6px_16px_rgba(0,0,0,0.08)] bg-white flex items-center justify-between">
            {/* Host Avatar & Name */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-2">
                <div className="w-24 h-24 rounded-full bg-[#1B4332] text-white flex items-center justify-center font-bold text-xs p-2 overflow-hidden shadow-inner text-center leading-tight">
                  MIRASHYA<br />HOMES
                </div>
                {/* Verified pink check badge */}
                <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#FF385C] border-2 border-white flex items-center justify-center text-white shadow-sm">
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                    <path d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" />
                  </svg>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-[#222222]">Mirashya Homes</h4>
              <p className="text-xs text-[#717171] mt-0.5 font-medium">Host</p>
            </div>

            {/* Metrics column */}
            <div className="space-y-4 pl-4 border-l border-[#DDDDDD] text-left">
              <div>
                <p className="text-xl font-bold text-[#222222]">1,463</p>
                <p className="text-xs text-[#717171]">Reviews</p>
              </div>
              <div className="pt-2 border-t border-[#DDDDDD]">
                <p className="text-xl font-bold text-[#222222] flex items-center gap-0.5">
                  4.68 <Star className="w-3.5 h-3.5 fill-[#222222] text-[#222222]" />
                </p>
                <p className="text-xs text-[#717171]">Rating</p>
              </div>
              <div className="pt-2 border-t border-[#DDDDDD]">
                <p className="text-xl font-bold text-[#222222]">2</p>
                <p className="text-xs text-[#717171]">Years hosting</p>
              </div>
            </div>
          </div>

          {/* Extra host info below card */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm text-[#222222]">
              <Lightbulb className="w-5 h-5 text-[#222222] flex-shrink-0" />
              <span>Born in the 80s</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#222222]">
              <GraduationCap className="w-5 h-5 text-[#222222] flex-shrink-0" />
              <span>Where I went to school: NICMAR GOA</span>
            </div>
          </div>
        </div>

        {/* Right Column: Co-Hosts & Host Details */}
        <div className="flex-1 space-y-8 min-w-0">
          {/* Co-Hosts */}
          <div>
            <h4 className="text-base font-semibold text-[#222222] mb-4">Co-Hosts</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {CO_HOSTS.map((ch, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center text-sm font-semibold"
                    style={{ backgroundColor: ch.avatarColor, color: ch.avatarImage ? 'inherit' : '#222222' }}
                  >
                    {ch.avatarImage ? (
                      <img src={ch.avatarImage} alt={ch.name} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      ch.initials
                    )}
                  </div>
                  <span className="text-sm text-[#222222] font-medium truncate">{ch.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Host details */}
          <div className="space-y-4 pt-4 border-t border-[#DDDDDD]">
            <h4 className="text-base font-semibold text-[#222222]">Host details</h4>
            <div className="text-sm text-[#222222] space-y-1">
              <p>Response rate: 100%</p>
              <p>Responds within an hour</p>
            </div>

            <button
              type="button"
              className="px-6 py-3.5 bg-[#F7F7F7] border border-[#222222] rounded-xl text-sm font-semibold text-[#222222] hover:bg-[#EEEEEE] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222]"
            >
              Message host
            </button>

            {/* Security disclaimer */}
            <div className="flex items-start gap-3 pt-4">
              <ShieldCheck className="w-5 h-5 text-[#717171] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#717171] leading-relaxed">
                To help protect your payment, always use Airbnb to send money and communicate with hosts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
