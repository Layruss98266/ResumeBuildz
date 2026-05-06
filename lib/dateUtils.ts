import { parse, format, isValid, isBefore, differenceInMonths } from 'date-fns';

// Try display format (MMM yyyy) before ISO (yyyy-MM); display is the primary UI input so it gets priority.
const PARSE_FORMATS = ['MMM yyyy', 'MMMM yyyy', 'yyyy-MM', 'MM/yyyy', 'yyyy'];

function parseDisplay(display: string): Date | null {
  for (const fmt of PARSE_FORMATS) {
    const d = parse(display, fmt, new Date());
    if (isValid(d)) return d;
  }
  return null; // Callers treat null as "no date" rather than crashing on parse failure.
}

/** Convert "Jan 2020" / "January 2020" / "2020-01" → "2020-01" for <input type="month"> */
export function toMonthInput(display: string): string {
  if (!display || display === 'Present') return '';
  if (/^\d{4}-\d{2}$/.test(display)) return display;
  const d = parseDisplay(display);
  return d ? format(d, 'yyyy-MM') : '';
}

/** Convert "2020-01" → "Jan 2020" for display / storage */
export function fromMonthInput(value: string): string {
  if (!value) return '';
  const d = parse(value, 'yyyy-MM', new Date());
  return isValid(d) ? format(d, 'MMM yyyy') : value;
}

/**
 * Human-readable duration between two "MMM yyyy" strings.
 * e.g. formatDuration("Jan 2021", "Apr 2023") → "2 yrs 3 mos"
 * Pass "Present" (or omit end) to calculate from startDate to today.
 */
export function formatDuration(start: string, end?: string): string {
  const startDate = parseDisplay(start);
  if (!startDate || !isValid(startDate)) return '';

  const endDate =
    !end || end === 'Present'
      ? new Date()
      : parseDisplay(end) ?? new Date();

  const totalMonths = differenceInMonths(endDate, startDate);
  if (totalMonths < 0) return '';

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) return `${months} mo${months !== 1 ? 's' : ''}`;
  if (months === 0) return `${years} yr${years !== 1 ? 's' : ''}`;
  return `${years} yr${years !== 1 ? 's' : ''} ${months} mo${months !== 1 ? 's' : ''}`;
}

/**
 * Returns true when startDate precedes endDate (or endDate is "Present").
 * Both values should be in "MMM yyyy" or "yyyy-MM" format.
 */
export function isValidDateRange(start: string, end: string): boolean {
  // Present/empty end is always valid (ongoing role).
  // Parse failure on either date is treated as valid to avoid blocking input with false errors.
  if (!start || !end || end === 'Present') return true;
  const s = parseDisplay(start);
  const e = parseDisplay(end);
  if (!s || !e || !isValid(s) || !isValid(e)) return true;
  return isBefore(s, e) || format(s, 'yyyy-MM') === format(e, 'yyyy-MM');
}
