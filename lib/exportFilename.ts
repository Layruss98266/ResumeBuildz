// Generate a predictable, scannable export filename for the builder.
// Pattern: {lastName}_{firstName}_{jobTitle?}_{YYYY-MM-DD}.{ext}
// Falls back to "resume_{date}" when no name is set.
//
// All tokens are sanitised to [A-Za-z0-9-] and trimmed to keep the filename
// short across Windows / macOS / Linux path-length limits.

export function resumeFilename(
  resumeData: { personalInfo?: { fullName?: string; jobTitle?: string } },
  ext: string,
): string {
  const name = (resumeData.personalInfo?.fullName || '').trim();
  const role = (resumeData.personalInfo?.jobTitle || '').trim();
  const iso = new Date().toISOString().slice(0, 10);
  const tokens: string[] = [];
  if (name) {
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      tokens.push(sanitize(parts[parts.length - 1]));
      tokens.push(sanitize(parts.slice(0, -1).join('_')));
    } else {
      tokens.push(sanitize(parts[0] || ''));
    }
  }
  if (role) tokens.push(sanitize(role));
  tokens.push(iso);
  const stem = tokens.filter(Boolean).join('_') || `resume_${iso}`;
  return `${stem.slice(0, 120)}.${ext.replace(/^\./, '')}`;
}

function sanitize(s: string): string {
  return s
    .normalize('NFKD')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
}
