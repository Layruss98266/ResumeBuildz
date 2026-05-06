// Lightweight overused-keyword detector for the ATS score panel. Given the
// full resume text, counts single-token occurrences (4+) excluding stopwords,
// and returns the top 5 for display as density chips.
//
// Deliberately minimal. A full density heatmap over the preview pane is a
// bigger visualisation task; this helper powers the 80/20 version that
// surfaces the same insight in a single card.

const STOPWORDS = new Set([
  'a', 'an', 'and', 'or', 'the', 'of', 'in', 'to', 'for', 'on', 'at', 'by',
  'with', 'from', 'as', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'this', 'that', 'these', 'those', 'it', 'its', 'i', 'we', 'my', 'our',
  'he', 'she', 'they', 'them', 'us', 'you', 'your',
  'do', 'did', 'does', 'has', 'had', 'have', 'will', 'would', 'could',
  'should', 'can', 'may', 'might',
  'but', 'not', 'no', 'so', 'if', 'than', 'then', 'which', 'who', 'what',
  'when', 'where', 'why', 'how',
  'all', 'any', 'each', 'every', 'also', 'only', 'other', 'such',
  'one', 'two', 'three',
  // Resume-domain stopwords: very common verbs that will always top the list
  // and aren't useful feedback on their own.
  'led', 'managed', 'developed', 'built', 'created', 'designed', 'used',
]);

export interface KeywordCount {
  word: string;
  count: number;
}

export function overusedKeywords(text: string, minCount = 4, top = 5): KeywordCount[] {
  if (!text) return [];
  const tokens = text
    .toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length >= 3 && !STOPWORDS.has(t)); // Skip two-letter tokens and stopwords; neither are meaningful keyword signals.

  const counts = new Map<string, number>();
  for (const t of tokens) counts.set(t, (counts.get(t) || 0) + 1);

  return [...counts.entries()]
    .map(([word, count]) => ({ word, count }))
    .filter((x) => x.count >= minCount) // 4+ occurrences signals repetition noticeable to a reader; lower counts are normal topic coverage.
    .sort((a, b) => b.count - a.count)
    .slice(0, top);
}
