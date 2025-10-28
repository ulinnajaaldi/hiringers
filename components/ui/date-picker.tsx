"use client";

import { useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface DatePickerProps {
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
}

export function DatePicker({ onDateSelect, selectedDate }: DatePickerProps) {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const [displayMonth, setDisplayMonth] = useState(currentDate.getMonth());
  const [displayYear, setDisplayYear] = useState(currentDate.getFullYear());
  const [showMonthYearPicker, setShowMonthYearPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [selectorYear, setSelectorYear] = useState(displayYear);
  const [yearRangeStart, setYearRangeStart] = useState(
    Math.floor(displayYear / 12) * 12,
  );

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const monthName = new Date(displayYear, displayMonth).toLocaleString(
    "default",
    {
      month: "short",
    },
  );

  const daysInMonth = getDaysInMonth(displayMonth, displayYear);
  const firstDay = getFirstDayOfMonth(displayMonth, displayYear);
  const daysInPrevMonth = getDaysInMonth(displayMonth - 1, displayYear);

  const calendarDays = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      isToday: false,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(displayYear, displayMonth, i);
    const isToday = date.toDateString() === new Date().toDateString();
    calendarDays.push({
      day: i,
      isCurrentMonth: true,
      isToday,
    });
  }

  // Next month's days
  const remainingDays = 42 - calendarDays.length;
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: false,
      isToday: false,
    });
  }

  const handlePrevMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
  };

  const handlePrevYear = () => {
    setDisplayYear(displayYear - 1);
  };

  const handleNextYear = () => {
    setDisplayYear(displayYear + 1);
  };

  const handleDateClick = (day: number, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      const newDate = new Date(displayYear, displayMonth, day);
      setCurrentDate(newDate);
      onDateSelect?.(newDate);
    }
  };

  const handleMonthSelect = (month: number) => {
    setDisplayMonth(month);
    setDisplayYear(selectorYear);
    setShowMonthYearPicker(false);
    setShowYearPicker(false);
  };

  const handleYearSelect = (year: number) => {
    setSelectorYear(year);
    setShowYearPicker(false);
  };

  const handlePrevYearRange = () => {
    setYearRangeStart(yearRangeStart - 12);
  };

  const handleNextYearRange = () => {
    setYearRangeStart(yearRangeStart + 12);
  };

  const handlePrevYearInSelector = () => {
    setSelectorYear(selectorYear - 1);
  };

  const handleNextYearInSelector = () => {
    setSelectorYear(selectorYear + 1);
  };

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const yearRange = Array.from({ length: 12 }, (_, i) => yearRangeStart + i);

  return (
    <div className="border-border bg-card w-full max-w-sm rounded-2xl border p-6 shadow-sm">
      {/* Header with navigation */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={handlePrevYear}
            className="hover:bg-muted rounded-lg p-2 transition-colors"
            aria-label="Previous year"
          >
            <ChevronsLeft className="text-foreground h-5 w-5" />
          </button>
          <button
            onClick={handlePrevMonth}
            className="hover:bg-muted rounded-lg p-2 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="text-foreground h-5 w-5" />
          </button>
        </div>

        <button
          onClick={() => {
            setShowMonthYearPicker(!showMonthYearPicker);
            setShowYearPicker(false);
          }}
          className="hover:bg-muted rounded-lg px-3 py-1 text-center transition-colors"
        >
          <div className="text-foreground text-l font-bold">
            {monthName} {displayYear}
          </div>
        </button>

        <div className="flex gap-2">
          <button
            onClick={handleNextMonth}
            className="hover:bg-muted rounded-lg p-2 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="text-foreground h-5 w-5" />
          </button>
          <button
            onClick={handleNextYear}
            className="hover:bg-muted rounded-lg p-2 transition-colors"
            aria-label="Next year"
          >
            <ChevronsRight className="text-foreground h-5 w-5" />
          </button>
        </div>
      </div>

      {showYearPicker ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevYearRange}
              className="hover:bg-muted rounded-lg p-2 transition-colors"
              aria-label="Previous year range"
            >
              <ChevronLeft className="text-foreground h-5 w-5" />
            </button>
            <div className="text-foreground text-lg font-semibold">
              {yearRange[0]} - {yearRange[11]}
            </div>
            <button
              onClick={handleNextYearRange}
              className="hover:bg-muted rounded-lg p-2 transition-colors"
              aria-label="Next year range"
            >
              <ChevronRight className="text-foreground h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {yearRange.map((year) => (
              <button
                key={year}
                onClick={() => handleYearSelect(year)}
                className={`rounded-lg py-2 text-sm font-medium transition-colors ${
                  year === selectorYear
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "text-foreground hover:bg-muted"
                } `}
              >
                {year}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowYearPicker(false)}
            className="bg-muted text-foreground hover:bg-muted/80 w-full rounded-lg py-2 text-sm font-medium transition-colors"
          >
            Back
          </button>
        </div>
      ) : showMonthYearPicker ? (
        <div className="space-y-4">
          {/* Year selector with clickable year */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevYearInSelector}
              className="hover:bg-muted rounded-lg p-2 transition-colors"
              aria-label="Previous year"
            >
              <ChevronLeft className="text-foreground h-5 w-5" />
            </button>
            <button
              onClick={() => {
                setYearRangeStart(Math.floor(selectorYear / 12) * 12);
                setShowYearPicker(true);
              }}
              className="text-foreground hover:bg-muted rounded-lg px-3 py-1 text-lg font-semibold transition-colors"
            >
              {selectorYear}
            </button>
            <button
              onClick={handleNextYearInSelector}
              className="hover:bg-muted rounded-lg p-2 transition-colors"
              aria-label="Next year"
            >
              <ChevronRight className="text-foreground h-5 w-5" />
            </button>
          </div>

          {/* Month grid */}
          <div className="grid grid-cols-3 gap-2">
            {months.map((month, index) => (
              <button
                key={month}
                onClick={() => handleMonthSelect(index)}
                className={`rounded-lg py-2 text-sm font-medium transition-colors ${
                  index === displayMonth && selectorYear === displayYear
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "text-foreground hover:bg-muted"
                } `}
              >
                {month}
              </button>
            ))}
          </div>

          {/* Close button */}
          <button
            onClick={() => setShowMonthYearPicker(false)}
            className="bg-muted text-foreground hover:bg-muted/80 w-full rounded-lg py-2 text-sm font-medium transition-colors"
          >
            Done
          </button>
        </div>
      ) : (
        <>
          {/* Weekday headers */}
          <div className="mb-4 grid grid-cols-7 gap-2 text-center">
            {weekDays.map((day, index) => (
              <div
                key={`${day}-${index}`}
                className="text-foreground text-m font-bold"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((dayObj, index) => (
              <button
                key={index}
                onClick={() =>
                  handleDateClick(dayObj.day, dayObj.isCurrentMonth)
                }
                disabled={!dayObj.isCurrentMonth}
                className={`text-m aspect-square rounded-lg transition-colors ${
                  dayObj.isCurrentMonth
                    ? dayObj.isToday
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : currentDate.getDate() === dayObj.day &&
                          currentDate.getMonth() === displayMonth &&
                          currentDate.getFullYear() === displayYear
                        ? "bg-accent text-accent-foreground hover:bg-accent/90"
                        : "text-foreground hover:bg-muted"
                    : "text-muted-foreground cursor-not-allowed"
                } `}
              >
                {dayObj.day}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
