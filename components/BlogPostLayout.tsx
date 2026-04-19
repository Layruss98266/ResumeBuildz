'use client';

// Shared blog-post layout (docs-style). Wraps article content with:
//  - SiteNavbar + SiteFooter
//  - Left sidebar TOC (sticky, scroll-anchor links)
//  - Article header: breadcrumb, indigo category eyebrow, H1, subtitle,
//    author strip (monogram avatar + byline + dateModified + readingTime)
//  - Children render in the main column
//  - Bottom block order: Was-this-helpful row, Prev/Next nav, Related cards

import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { ChevronRight, ArrowUpRight, List, ChevronDown } from 'lucide-react';
import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';

export interface TocItem {
  id: string;
  label: string;
}

export interface RelatedItem {
  title: string;
  slug: string; // relative to site root, no leading slash
  excerpt: string;
  read: number;
}

export interface PrevNextItem {
  title: string;
  slug: string;
}

export interface BlogPostLayoutProps {
  category: string;
  breadcrumbCurrent: string;
  title: string;
  subtitle?: string;
  author?: string;
  dateModified: string; // ISO
  readingTime: number; // minutes
  toc: TocItem[];
  related?: RelatedItem[];
  prev?: PrevNextItem;
  next?: PrevNextItem;
  children: ReactNode;
}

export default function BlogPostLayout({
  category,
  breadcrumbCurrent,
  title,
  subtitle,
  author = 'Surya L',
  dateModified,
  readingTime,
  toc,
  related = [],
  prev,
  next,
  children,
}: BlogPostLayoutProps) {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteNavbar />

      <div className="flex-1 w-full mx-auto max-w-[1200px] grid lg:grid-cols-[260px_1fr]">
        {/* Left sidebar: On this page TOC (desktop only) */}
        <aside className="hidden lg:block border-r border-gray-200 py-10 px-6 sticky top-0 h-screen overflow-y-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
            On this page
          </p>
          <ul className="space-y-1 text-sm">
            {toc.map((item, idx) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block py-1 line-clamp-2 pl-3 border-l-2 transition ${
                    idx === 0
                      ? 'text-gray-900 font-medium border-indigo-600'
                      : 'text-gray-600 hover:text-indigo-600 border-transparent hover:border-gray-200'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main article column. min-w-0 allows grid children to shrink;
            without it, a wide <pre> or <table> would push the column past
            viewport width. */}
        <article className="py-8 md:py-10 px-4 sm:px-6 md:px-12 w-full max-w-4xl mx-auto lg:mx-0 min-w-0">
          {/* Breadcrumb */}
          <nav className="text-xs text-gray-500 mb-5 md:mb-6 flex items-center gap-1 flex-wrap">
            <Link href="/blog" className="hover:text-gray-900">
              Guides
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="truncate">{category}</span>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="text-gray-900 truncate">{breadcrumbCurrent}</span>
          </nav>

          {/* Category eyebrow */}
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-2 md:mb-3">
            {category}
          </p>

          {/* Title: responsive size so narrow phones aren't crowded */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-3 md:mb-4 scroll-mt-6 break-words">
            {title}
          </h1>

          {/* Subtitle: step down on phones */}
          {subtitle && (
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 md:mb-8">{subtitle}</p>
          )}

          {/* Author strip: tighter gap + smaller avatar on phones */}
          <div className="flex items-center gap-3 md:gap-4 pb-5 md:pb-6 mb-8 md:mb-10 border-b border-gray-200 text-xs md:text-sm text-gray-600 flex-wrap">
            <div
              className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0"
              aria-hidden
            >
              {author.charAt(0)}
            </div>
            <span>
              By <strong className="text-gray-900">{author}</strong>
            </span>
            <span className="text-gray-300">.</span>
            <span>Updated {formatDate(dateModified)}</span>
            <span className="text-gray-300">.</span>
            <span>{readingTime} min</span>
          </div>

          {/* Mobile TOC: collapsible. Hidden on lg where the sticky sidebar
              is visible. Closed by default to keep the article start unblocked. */}
          {toc.length > 0 && (
            <details
              open={tocOpen}
              onToggle={(e) => setTocOpen((e.target as HTMLDetailsElement).open)}
              className="lg:hidden mb-8 border border-gray-200 rounded-lg group"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <List className="h-4 w-4 text-indigo-600" />
                  On this page
                  <span className="text-xs font-normal text-gray-500 ml-1">({toc.length})</span>
                </span>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${tocOpen ? 'rotate-180' : ''}`} />
              </summary>
              <ul className="border-t border-gray-200 py-2 px-4 space-y-1 text-sm">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setTocOpen(false)}
                      className="block py-1.5 text-gray-600 hover:text-indigo-600"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}

          {/* Article body */}
          <div className="text-gray-800 text-[15px] md:text-[16px] leading-[1.65] md:leading-[1.7] blog-post-body">{children}</div>

          {/* Feedback strip. Kept minimal until a real backend lands so no dead
              buttons are in the UI. */}
          <div className="mt-14 pt-6 border-t border-gray-200 flex items-center gap-3 text-sm flex-wrap">
            <p className="text-gray-500">Spotted something off?</p>
            <Link
              href="/contact"
              className="md:ml-auto text-indigo-600 hover:underline"
            >
              Suggest an edit
            </Link>
          </div>

          {/* Prev / Next: stack on narrow phones, side-by-side from sm up */}
          {(prev || next) && (
            <nav className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {prev ? (
                <Link
                  href={`/${prev.slug}`}
                  className="border border-gray-200 rounded-md p-3 hover:border-indigo-300 transition"
                >
                  <p className="text-xs text-gray-500 mb-1">← Previous</p>
                  <p className="font-semibold text-gray-900 line-clamp-2">{prev.title}</p>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}
              {next ? (
                <Link
                  href={`/${next.slug}`}
                  className="border border-gray-200 rounded-md p-3 hover:border-indigo-300 transition sm:text-right"
                >
                  <p className="text-xs text-gray-500 mb-1">Next →</p>
                  <p className="font-semibold text-gray-900 line-clamp-2">{next.title}</p>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}
            </nav>
          )}

          {/* Related articles (5th bottom block, card grid) */}
          {related.length > 0 && (
            <section
              id="related"
              className="mt-16 pt-10 border-t border-gray-200 scroll-mt-6"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
                Related articles
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Keep going. More guides on adjacent topics.
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/${r.slug}`}
                    className="group block border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-sm hover:bg-gray-50 transition"
                  >
                    <h3 className="font-semibold text-gray-900 group-hover:text-indigo-700 leading-snug mb-2 tracking-tight">
                      {r.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{r.excerpt}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{r.read} min read</span>
                      <span className="inline-flex items-center gap-1 text-indigo-600 font-medium group-hover:gap-2 transition-all">
                        Read <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>

      <SiteFooter />
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
