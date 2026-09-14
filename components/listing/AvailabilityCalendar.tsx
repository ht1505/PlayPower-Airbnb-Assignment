"use client";

import { cn } from "@/lib/utils";
import styles from "./AvailabilityCalendar.module.css";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/* Selected range: Oct 18-23, 2026 */
const SELECTED_START = new Date(2026, 9, 18);
const SELECTED_END = new Date(2026, 9, 23);

/* Unavailable dates: Nov 18-24 and Nov 29-30 */
const UNAVAILABLE = new Set([
  "2026-11-18", "2026-11-19", "2026-11-20", "2026-11-21",
  "2026-11-22", "2026-11-23", "2026-11-24",
  "2026-11-29", "2026-11-30",
]);

function isUnavailable(date: Date): boolean {
  const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return UNAVAILABLE.has(key);
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isInRange(date: Date): boolean {
  return date > SELECTED_START && date < SELECTED_END;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function MonthGrid({ year, month }: { year: number; month: number }) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);

  const cells: React.ReactNode[] = [];

  // Empty cells for days before the first
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} className={cn(styles.day, styles.dayEmpty)} />);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const unavailable = isUnavailable(date);
    const isStart = isSameDay(date, SELECTED_START);
    const isEnd = isSameDay(date, SELECTED_END);
    const inRange = isInRange(date);
    const selected = isStart || isEnd;

    const className = cn(
      styles.day,
      unavailable && styles.dayUnavailable,
      !unavailable && !selected && !inRange && styles.dayAvailable,
      selected && styles.daySelected,
      inRange && styles.dayInRange,
      isStart && styles.dayRangeStart,
      isEnd && styles.dayRangeEnd,
    );

    cells.push(
      <div key={d} className={className}>
        {d}
      </div>,
    );
  }

  return (
    <div className={styles.month}>
      <div className={styles.monthHeader}>
        <span className={styles.monthTitle}>
          {MONTH_NAMES[month]} {year}
        </span>
      </div>
      <div className={styles.weekdays}>
        {WEEKDAYS.map((wd) => (
          <div key={wd} className={styles.weekday}>{wd}</div>
        ))}
      </div>
      <div className={styles.days}>{cells}</div>
    </div>
  );
}

export default function AvailabilityCalendar() {
  return (
    <section className={styles.calendar} id="section-calendar">
      <div className={styles.calendarHeader}>
        <h2>5 nights in Candolim</h2>
        <p className={styles.calendarSubtitle}>18 Oct – 23 Oct</p>
      </div>

      <div className={styles.months}>
        <MonthGrid year={2026} month={9} />
        <MonthGrid year={2026} month={10} />
      </div>
    </section>
  );
}
