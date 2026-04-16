// ATS score trend tracking — stores time-series snapshots of the ATS score
// in localStorage so the user can see improvement over time.
//
// Storage key: `resumeforge-ats-trend`
// Format: [{ t: epochMs, s: scoreInt }, ...]  (max 200 points, oldest first)
//
// Snapshots are only taken when the score CHANGES. No spam on every render.

const KEY = 'resumeforge-ats-trend';
const MAX_POINTS = 200;

export interface TrendPoint { t: number; s: number }

function read(): TrendPoint[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function write(points: TrendPoint[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(points.slice(-MAX_POINTS)));
  } catch {
    /* ignore */
  }
}

export function getTrend(): TrendPoint[] {
  return read();
}

/** Append a score snapshot. No-op if identical to the latest recorded score. */
export function recordScore(score: number) {
  const rounded = Math.round(score);
  const list = read();
  const last = list[list.length - 1];
  if (last && last.s === rounded) return;
  // Also skip if multiple snapshots within the same minute — avoids noise.
  if (last && Date.now() - last.t < 60_000 && Math.abs(last.s - rounded) < 2) return;
  list.push({ t: Date.now(), s: rounded });
  write(list);
}

export function resetTrend() {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
}
