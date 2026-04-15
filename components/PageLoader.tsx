'use client';

// Global page-transition loading indicator.
//
// Two visual elements:
//   1. Thin blue progress bar fixed to the top of the viewport
//   2. Small floating "resume building" card in the bottom-right corner
//      that mirrors the homepage hero animation (skeletal bars filling)
//
// Triggers on every <Link> click and on browser back/forward navigation.
// Hides automatically when the new route mounts (Next.js renders the new
// page, which causes pathname to change and our effect to fire the hide).
//
// Implementation notes:
// - Uses Next.js `usePathname` to detect when navigation completes.
// - Uses a global click listener on `<a>` elements to detect navigation
//   start. This avoids needing per-link wiring.
// - Same-pathname clicks (anchor links, query-only changes) are ignored.

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const trickleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPathnameRef = useRef(pathname);

  const startLoading = useCallback(() => {
    if (trickleRef.current) clearInterval(trickleRef.current);
    if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    setLoading(true);
    setProgress(8);
    // Trickle progress up to ~85% over time (never reaches 100 until complete)
    trickleRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 85) return p;
        // Faster early, slower later — feels like real loading
        const inc = p < 30 ? 8 : p < 60 ? 4 : 1.5;
        return Math.min(85, p + inc);
      });
    }, 180);
  }, []);

  const completeLoading = useCallback(() => {
    if (trickleRef.current) {
      clearInterval(trickleRef.current);
      trickleRef.current = null;
    }
    setProgress(100);
    completeTimerRef.current = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 300);
  }, []);

  // Detect navigation start by intercepting <a> clicks anywhere in the page.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Ignore clicks with modifier keys (open in new tab, etc.)
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) return;

      const target = (e.target as HTMLElement | null)?.closest('a');
      if (!target) return;
      const anchor = target as HTMLAnchorElement;
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      if (anchor.getAttribute('rel')?.includes('external')) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Only intercept internal navigations
      if (href.startsWith('http://') || href.startsWith('https://')) {
        try {
          const url = new URL(href);
          if (url.origin !== window.location.origin) return;
        } catch {
          return;
        }
      }
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      // Same path? Ignore (anchor jumps within page)
      const targetPath = href.startsWith('/') ? href.split('?')[0].split('#')[0] : href;
      if (targetPath === window.location.pathname) return;

      startLoading();
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [startLoading]);

  // When the pathname actually changes, complete the loader.
  // queueMicrotask defers completeLoading() out of the effect body so the
  // setState calls inside it don't trigger the cascading-renders warning.
  useEffect(() => {
    if (lastPathnameRef.current !== pathname) {
      lastPathnameRef.current = pathname;
      queueMicrotask(completeLoading);
    }
  }, [pathname, completeLoading]);

  // Browser back/forward
  useEffect(() => {
    const onPopState = () => startLoading();
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [startLoading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (trickleRef.current) clearInterval(trickleRef.current);
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    };
  }, []);

  if (!loading && progress === 0) return null;

  return (
    <>
      {/* Top progress bar */}
      <div
        aria-hidden
        className="fixed top-0 left-0 right-0 z-[100] h-[3px] pointer-events-none"
      >
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] transition-[width] ease-out"
          style={{
            width: `${progress}%`,
            transitionDuration: progress === 100 ? '200ms' : '180ms',
            opacity: loading ? 1 : 0,
          }}
        />
      </div>

      {/* Floating mini-card — only shows after a brief delay so quick navs
          don't flash it. Uses the same skeletal-fill aesthetic as the
          homepage Fill7_Ultimate hero. */}
      {loading && progress > 25 && (
        <div
          aria-hidden
          className="fixed bottom-6 right-6 z-[99] w-48 bg-white rounded-xl shadow-2xl shadow-blue-500/30 border border-gray-200 p-4 animate-fade-in pointer-events-none"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Loading page
            </p>
          </div>
          <div className="space-y-1.5 mb-2">
            <div className="h-2 bg-gray-900 rounded animate-pulse" style={{ width: '60%' }} />
            <div className="h-1.5 bg-gray-300 rounded animate-pulse" style={{ width: '90%', animationDelay: '100ms' }} />
            <div className="h-1.5 bg-gray-300 rounded animate-pulse" style={{ width: '75%', animationDelay: '200ms' }} />
          </div>
          <div className="h-2 bg-blue-500 rounded mb-1.5 animate-pulse" style={{ width: '40%' }} />
          <div className="space-y-1">
            <div className="h-1.5 bg-gray-300 rounded animate-pulse" style={{ width: '100%', animationDelay: '300ms' }} />
            <div className="h-1.5 bg-gray-300 rounded animate-pulse" style={{ width: '85%', animationDelay: '400ms' }} />
          </div>
          <div className="flex gap-1 mt-2">
            <div className="h-3 w-8 bg-blue-100 rounded-full animate-pulse" style={{ animationDelay: '500ms' }} />
            <div className="h-3 w-10 bg-blue-100 rounded-full animate-pulse" style={{ animationDelay: '600ms' }} />
            <div className="h-3 w-6 bg-blue-100 rounded-full animate-pulse" style={{ animationDelay: '700ms' }} />
          </div>
        </div>
      )}
    </>
  );
}
