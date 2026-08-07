'use client';

import React from 'react';
import { Logo } from './Logo';
import { CompactSearchPill } from './CompactSearchPill';
import { UserMenu } from './UserMenu';

export interface HeaderProps {
  onSearchWhereClick?: () => void;
  onSearchWhenClick?: () => void;
  onSearchGuestsClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchWhereClick,
  onSearchWhenClick,
  onSearchGuestsClick,
}) => {
  return (
    <header
      className="relative z-50 bg-white border-b border-[#DDDDDD]"
      role="banner"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[80px] gap-4">
          {/* Left: Logo */}
          <div className="flex-shrink-0 w-[120px] lg:w-[160px]">
            <Logo />
          </div>

          {/* Center: Search Pill */}
          <div className="flex-1 flex justify-center max-w-[480px] mx-auto">
            <CompactSearchPill
              onWhereClick={onSearchWhereClick}
              onWhenClick={onSearchWhenClick}
              onGuestsClick={onSearchGuestsClick}
            />
          </div>

          {/* Right: User Menu */}
          <div className="flex-shrink-0 flex justify-end w-[120px] lg:w-[220px]">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
