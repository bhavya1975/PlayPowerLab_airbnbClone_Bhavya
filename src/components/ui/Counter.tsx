import React from 'react';
import { Minus, Plus } from 'lucide-react';

export interface CounterProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  label?: string;
  subtitle?: string;
}

export const Counter: React.FC<CounterProps> = ({
  value,
  onIncrement,
  onDecrement,
  min = 0,
  max = 16,
  label,
  subtitle,
}) => {
  return (
    <div className="flex items-center justify-between py-3">
      {label && (
        <div>
          <p className="text-sm font-semibold text-[#222222]">{label}</p>
          {subtitle && <p className="text-xs text-[#717171]">{subtitle}</p>}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDecrement}
          disabled={value <= min}
          aria-label={`Decrease ${label || 'count'}`}
          className="w-8 h-8 rounded-full border border-[#DDDDDD] flex items-center justify-center text-[#717171] hover:border-black hover:text-[#222222] disabled:opacity-30 disabled:hover:border-[#DDDDDD] disabled:hover:text-[#717171] transition"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <span className="w-6 text-center text-sm font-semibold text-[#222222]">
          {value}
        </span>

        <button
          type="button"
          onClick={onIncrement}
          disabled={value >= max}
          aria-label={`Increase ${label || 'count'}`}
          className="w-8 h-8 rounded-full border border-[#DDDDDD] flex items-center justify-center text-[#717171] hover:border-black hover:text-[#222222] disabled:opacity-30 disabled:hover:border-[#DDDDDD] disabled:hover:text-[#717171] transition"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
