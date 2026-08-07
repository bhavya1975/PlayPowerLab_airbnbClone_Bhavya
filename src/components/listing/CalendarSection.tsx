'use client';

import React, { useCallback, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isBetween(date: Date, start: Date, end: Date) {
  return date > start && date < end;
}

function getDaysInMonth(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
  return days;
}

interface MonthCalendarProps {
  year: number;
  month: number;
  dateRange: DateRange;
  onDayClick: (date: Date) => void;
}

const MonthCalendar: React.FC<MonthCalendarProps> = ({ year, month, dateRange, onDayClick }) => {
  const days = getDaysInMonth(year, month);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="flex-1 min-w-[280px]">
      <h4 className="text-sm font-semibold text-[#222222] text-center mb-4">
        {MONTHS[month]} {year}
      </h4>
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS_OF_WEEK.map((d, i) => (
          <div key={i} className="text-center text-xs text-[#717171] font-normal py-1">
            {d}
          </div>
        ))}
      </div>
      {/* Day cells */}
      <div className="grid grid-cols-7">
        {days.map((date, idx) => {
          if (!date) return <div key={`empty-${idx}`} />;

          const isPast = date < today;
          const isStart = Boolean(dateRange.start && isSameDay(date, dateRange.start));
          const isEnd = Boolean(dateRange.end && isSameDay(date, dateRange.end));
          const isInRange = Boolean(
            dateRange.start && dateRange.end && isBetween(date, dateRange.start, dateRange.end)
          );

          return (
            <div key={date.toISOString()} className={clsx('relative flex items-center justify-center', isInRange && 'bg-[#F7F7F7]')}>
              {/* Range start cap */}
              {isStart && dateRange.end && (
                <div className="absolute right-0 top-0 bottom-0 left-1/2 bg-[#F7F7F7]" aria-hidden="true" />
              )}
              {/* Range end cap */}
              {isEnd && dateRange.start && (
                <div className="absolute left-0 top-0 bottom-0 right-1/2 bg-[#F7F7F7]" aria-hidden="true" />
              )}
              <button
                type="button"
                disabled={isPast}
                onClick={() => !isPast && onDayClick(date)}
                aria-label={`${date.getDate()} ${MONTHS[month]} ${year}${isStart ? ' (check-in)' : ''}${isEnd ? ' (checkout)' : ''}`}
                aria-pressed={isStart || isEnd}
                className={clsx(
                  'relative z-10 w-9 h-9 rounded-full text-sm flex items-center justify-center transition-colors duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222]',
                  isPast && 'text-[#DDDDDD] cursor-not-allowed',
                  !isPast && !isStart && !isEnd && 'text-[#222222] hover:border hover:border-[#222222]',
                  (isStart || isEnd) && 'bg-[#222222] text-white font-semibold',
                )}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export interface CalendarSectionProps {
  location?: string;
  nights?: number;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  location = 'Candolim',
  nights = 5,
}) => {
  // Default to Oct/Nov 2026
  const [leftYear, setLeftYear] = useState(2026);
  const [leftMonth, setLeftMonth] = useState(9); // 0-indexed, 9 = October

  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(2026, 9, 18),  // Oct 18
    end: new Date(2026, 9, 23),    // Oct 23
  });

  const rightMonth = leftMonth === 11 ? 0 : leftMonth + 1;
  const rightYear = leftMonth === 11 ? leftYear + 1 : leftYear;

  const goPrev = useCallback(() => {
    if (leftMonth === 0) {
      setLeftMonth(11);
      setLeftYear(y => y - 1);
    } else {
      setLeftMonth(m => m - 1);
    }
  }, [leftMonth]);

  const goNext = useCallback(() => {
    if (leftMonth === 11) {
      setLeftMonth(0);
      setLeftYear(y => y + 1);
    } else {
      setLeftMonth(m => m + 1);
    }
  }, [leftMonth]);

  const handleDayClick = useCallback((date: Date) => {
    setDateRange(prev => {
      if (!prev.start || (prev.start && prev.end)) {
        return { start: date, end: null };
      }
      if (date < prev.start) {
        return { start: date, end: prev.start };
      }
      return { start: prev.start, end: date };
    });
  }, []);

  const clearDates = useCallback(() => {
    setDateRange({ start: null, end: null });
  }, []);

  const formatDate = (d: Date | null) =>
    d ? `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)} ${d.getFullYear()}` : '';

  return (
    <section id="section-calendar" className="py-6 border-b border-[#DDDDDD]" aria-labelledby="calendar-heading">
      <h3 id="calendar-heading" className="text-xl font-semibold text-[#222222] mb-1">
        {nights} nights in {location}
      </h3>
      {(dateRange.start || dateRange.end) && (
        <p className="text-sm text-[#717171] mb-5">
          {formatDate(dateRange.start)}{dateRange.end ? ` – ${formatDate(dateRange.end)}` : ''}
        </p>
      )}

      {/* Navigation row */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous month"
          className="w-8 h-8 rounded-full flex items-center justify-center border border-[#DDDDDD] hover:border-black text-[#222222] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222]"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next month"
          className="w-8 h-8 rounded-full flex items-center justify-center border border-[#DDDDDD] hover:border-black text-[#222222] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222]"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Two month calendars */}
      <div className="flex flex-col sm:flex-row gap-8">
        <MonthCalendar
          year={leftYear}
          month={leftMonth}
          dateRange={dateRange}
          onDayClick={handleDayClick}
        />
        <div className="hidden sm:block w-px bg-[#DDDDDD]" aria-hidden="true" />
        <MonthCalendar
          year={rightYear}
          month={rightMonth}
          dateRange={dateRange}
          onDayClick={handleDayClick}
        />
      </div>

      {/* Footer row */}
      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          aria-label="Keyboard input"
          className="w-8 h-8 border border-[#DDDDDD] rounded flex items-center justify-center text-[#717171] hover:border-black transition-colors"
        >
          <svg viewBox="0 0 32 32" className="w-4 h-4" aria-hidden="true">
            <path d="M28 8H4a2 2 0 00-2 2v12a2 2 0 002 2h24a2 2 0 002-2V10a2 2 0 00-2-2zm-18 9H8v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm4 2h-6v-2h6v2zm0-4h-2v-2h2v2zm-14-2H8v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" fill="currentColor" />
          </svg>
        </button>
        <button
          type="button"
          onClick={clearDates}
          className="text-sm font-semibold text-[#222222] underline hover:text-[#717171] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#222222] rounded"
        >
          Clear dates
        </button>
      </div>
    </section>
  );
};
