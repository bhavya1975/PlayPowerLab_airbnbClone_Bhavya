'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe, Menu, User } from 'lucide-react';

const MENU_ITEMS_TOP = [
  { id: 'signup', label: 'Sign up' },
  { id: 'login', label: 'Log in' },
];

const MENU_ITEMS_BOTTOM = [
  { id: 'host', label: 'Airbnb your home' },
  { id: 'experiences', label: 'Host an experience' },
  { id: 'help', label: 'Help Centre' },
];

export const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  return (
    <div className="flex items-center gap-1 flex-shrink-0">
      {/* Become a host */}
      <a
        href="#"
        className="hidden md:flex items-center h-10 px-4 rounded-full text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222]"
      >
        Become a host
      </a>

      {/* Language Globe */}
      <button
        type="button"
        aria-label="Choose a language and currency"
        className="flex items-center justify-center w-10 h-10 rounded-full text-[#222222] hover:bg-[#F7F7F7] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222]"
      >
        <Globe className="w-4 h-4" />
      </button>

      {/* Hamburger + Avatar Trigger */}
      <div className="relative" ref={menuRef}>
        <button
          ref={triggerRef}
          type="button"
          aria-label="Open user menu"
          aria-expanded={isOpen}
          aria-haspopup="menu"
          onClick={() => setIsOpen(prev => !prev)}
          className="flex items-center gap-2 h-10 px-3 border border-[#DDDDDD] rounded-full hover:shadow-md transition-shadow duration-200 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222]"
        >
          <Menu className="w-4 h-4 text-[#222222]" />
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#717171]">
            <User className="w-4 h-4 text-white" />
          </span>
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              role="menu"
              aria-label="User menu"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute right-0 top-12 w-56 bg-white rounded-2xl border border-[#DDDDDD] shadow-[0_6px_20px_rgba(0,0,0,0.15)] overflow-hidden z-50"
            >
              {/* Top section */}
              <div className="py-2">
                {MENU_ITEMS_TOP.map(item => (
                  <button
                    key={item.id}
                    role="menuitem"
                    type="button"
                    className="w-full text-left px-4 py-3 text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] transition-colors duration-100 focus:outline-none focus-visible:bg-[#F7F7F7]"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-[#DDDDDD]" />

              {/* Bottom section */}
              <div className="py-2">
                {MENU_ITEMS_BOTTOM.map(item => (
                  <button
                    key={item.id}
                    role="menuitem"
                    type="button"
                    className="w-full text-left px-4 py-3 text-sm font-normal text-[#222222] hover:bg-[#F7F7F7] transition-colors duration-100 focus:outline-none focus-visible:bg-[#F7F7F7]"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
