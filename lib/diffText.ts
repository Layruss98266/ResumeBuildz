// Word-level diff for resume before/after comparison.
//
// Pure TypeScript, zero dependencies. Uses LCS (longest common subsequence)
// with O(n*m) time / O(n*m) space — fine for bullet-sized strings.
//
// Output format: array of { op, text } segments consumed by ResumeDiff.tsx.

export type DiffOp = 'keep' | 'add' | 'remove';
export interface DiffSegment { op: DiffOp; text: string }

function tokenize(s: string): string[] {
  // Split on whitespace but preserve the whitespace itself so we can rejoin.
  return s.split(/(\s+)/).filter((t) => t.length > 0);
}

function lcs(a: string[], b: string[]): number[][] {
  const n = a.length, m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp;
}

export function diffWords(before: string, after: string): DiffSegment[] {
  const a = tokenize(before);
  const b = tokenize(after);
  const dp = lcs(a, b);

  // Walk back through the LCS table to reconstruct the edit script.
  const segments: DiffSegment[] = [];
  let i = a.length, j = b.length;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      segments.push({ op: 'keep', text: a[i - 1] });
      i--; j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      segments.push({ op: 'remove', text: a[i - 1] });
      i--;
    } else {
      segments.push({ op: 'add', text: b[j - 1] });
      j--;
    }
  }
  while (i > 0) { segments.push({ op: 'remove', text: a[i - 1] }); i--; }
  while (j > 0) { segments.push({ op: 'add', text: b[j - 1] }); j--; }

  segments.reverse();

  // Merge adjacent same-op segments for cleaner rendering.
  const merged: DiffSegment[] = [];
  for (const s of segments) {
    const last = merged[merged.length - 1];
    if (last && last.op === s.op) last.text += s.text;
    else merged.push({ ...s });
  }
  return merged;
}
