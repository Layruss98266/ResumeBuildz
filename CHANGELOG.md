# Changelog

All notable changes to ResumeForge are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [1.4.0] - 2026-04-11

### Added

- Skill suggestions based on job title (from 201-role industry data).
- Page transition animations across all pages (fadeInUp, slideIn, scaleIn).
- Section completion indicators (green/gray dots in dropdown).
- Cover letter auto-fill from Personal Info job title.
- Export loading states with disabled buttons.
- Mobile profile manager in bottom bar.

### Improved

- Improved skill matching accuracy (prefix stripping, quality scoring).
- Fixed Help/Profile button visibility in light mode.
- Comprehensive monetization plan document.

---

## [1.3.0] - 2026-04-11

### Added

- PDF import support via `pdfjs-dist` -- upload existing PDF resumes and extract content automatically.
- Multiple resume profiles -- save up to 10 separate resume versions, each with its own data and template selection.
- Template preview modal with full-size preview before applying a template.
- Drag-and-drop entry reordering within Experience, Education, and Projects sections.

### Improved

- Print CSS polish with `color-adjust: exact`, proper `page-break` rules, and consistent spacing across all templates.

---

## [1.2.0] - 2026-04-11

### Improved

- Modernized help dialog with icons, card-based layout, and gradient header for a cleaner look.
- Modernized onboarding flow with progress bar, achievement badges, and larger action buttons.
- Updated README with expanded Getting Started instructions and inline changelog.

---

## [1.1.0] - 2026-04-11

### Added

- 12 ATS analysis tools: readability score, formatting checker, active voice detector, industry keywords matcher, section completeness, bullet point analyzer, quantification checker, verb strength analyzer, length optimizer, consistency checker, contact info validator, and file format advisor.
- 20 industries with 201 roles and 25-30 keywords each for targeted keyword analysis.
- AI Gap Analysis powered by Groq -- identify missing skills and experience relative to job descriptions.
- HelpTip tooltips on all major sections to guide users through the resume building process.
- Custom section dropdown navigator for quick access to resume sections.
- Smart Matching suggestion triggered on job title input to recommend relevant keywords.
- Clickable contact links (email, phone, LinkedIn, GitHub) in all 20 templates.

### Improved

- Navbar redesign with better navigation and branding.
- Footer update with improved layout and links.
- Text size adjustments across the application for better readability.

---

## [1.0.0] - 2026-04-10

### Added

- Initial release of ResumeForge.
- 20 professionally designed resume templates, each ATS-optimized.
- AI writing assistant powered by Groq for generating summaries, bullet points, and cover letters.
- Cover letter builder with customizable templates.
- ATS score checker with job description keyword matching.
- Multi-format import: DOCX, TXT, HTML, and Markdown.
- Multi-format export: PDF, DOCX, and HTML.
- Dark mode and light mode with system preference detection.
- Progressive Web App (PWA) support for offline use.
- SEO optimization with meta tags and Open Graph support.
- Fully client-side -- no data ever leaves the browser.
- localStorage-based data persistence.
- Responsive design for desktop, tablet, and mobile.
