'use client';

import { useEffect, useState, useRef } from 'react';
import { List, ChevronDown } from 'lucide-react';

/**
 * Reusable Table of Contents.
 *
 * Auto-detects all H2 elements inside the nearest <main> on mount, assigns
 * stable IDs if missing, and builds a sticky TOC from them.
 *
 * Desktop: fixed sidebar on the right side of the content.
 * Mobile: collapsible accordion at the top of the content.
 *
 * IntersectionObserver highlights the current section as the user scrolls.
 */
export default function TOC() {
  const [items, setItems] = useState<Array<{ id: string; label: string }>>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Give the page a tick to render content sections
    const timer = setTimeout(() => {
      const main = document.querySelector('main');
      if (!main) return;
      const h2s = Array.from(main.querySelectorAll('h2'));
      if (h2s.length === 0) return;

      const slugify = (text: string) =>
        text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-')
          .slice(0, 60);

      const seen = new Set<string>();
      const parsed = h2s.map((h) => {
        const label = h.textContent?.trim() || '';
        let id = h.id;
        if (!id) {
          id = slugify(label);
          let suffix = 1;
          while (seen.has(id)) {
            id = `${slugify(label)}-${++suffix}`;
          }
          h.id = id;
        }
        seen.add(id);
        // Add scroll-margin so the sticky navbar doesn't cover the heading
        h.style.scrollMarginTop = '5rem';
        return { id, label };
      });

      setItems(parsed);

      // Setup intersection observer for active section highlighting
      observerRef.current?.disconnect();
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (visible.length > 0) {
            setActiveId(visible[0].target.id);
          }
        },
        { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
      );
      h2s.forEach((h) => observerRef.current?.observe(h));
    }, 120);

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, []);

  if (items.length < 3) return null; // TOC not useful for very short pages

  const handleClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update URL hash without triggering a jump
      history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <>
      {/* Mobile + medium: collapsible accordion (desktop-xl gets the sidebar) */}
      <div className="xl:hidden mb-8 bg-gray-50 border border-gray-200 rounded-xl">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-900"
          aria-expanded={mobileOpen}
        >
          <span className="flex items-center gap-2">
            <List className="h-4 w-4 text-blue-600" />
            On this page ({items.length})
          </span>
          <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${mobileOpen ? 'rotate-180' : ''}`} />
        </button>
        {mobileOpen && (
          <nav className="px-4 pb-4 border-t border-gray-200 pt-3">
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleClick(item.id)}
                    className={`text-left text-sm block w-full py-1 transition ${
                      activeId === item.id
                        ? 'text-blue-600 font-semibold'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop: sticky sidebar — only on xl+ to avoid overlapping content */}
      <aside className="hidden xl:block fixed top-24 right-[max(1rem,calc((100vw-56rem)/2-15rem))] w-56 z-30 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
            <List className="h-3.5 w-3.5" />
            On this page
          </p>
          <nav>
            <ul className="space-y-1.5">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleClick(item.id)}
                    className={`text-left text-xs block w-full leading-relaxed transition border-l-2 pl-3 py-0.5 ${
                      activeId === item.id
                        ? 'border-blue-600 text-blue-600 font-semibold'
                        : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-gray-300'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
