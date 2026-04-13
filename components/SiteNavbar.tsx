'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, Menu, X, ArrowRight, LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const NAV_LINKS = [
  { href: '/builder', label: 'Resume Builder' },
  { href: '/templates', label: 'Templates' },
  { href: '/ats-guide', label: 'ATS Guide' },
  { href: '/resume-tips', label: 'Tips' },
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, profile, signOut, loading } = useAuth();

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="h-8 w-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="text-white font-bold text-lg">
              Resume<span className="text-blue-400">Forge</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white text-sm px-3 py-1.5 rounded-md hover:bg-gray-800 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth + CTA + Mobile toggle */}
          <div className="flex items-center gap-2">
            {!loading && (
              user ? (
                <>
                  <span className="hidden lg:inline text-sm text-gray-400 truncate max-w-[140px]">
                    {profile?.full_name || user.email}
                  </span>
                  <Link
                    href="/builder"
                    className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Build Resume <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-gray-400 hover:text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
                    title="Sign out"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-gray-300 hover:text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <User className="h-3.5 w-3.5" /> Sign in
                  </Link>
                  <Link
                    href="/builder"
                    className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Build Resume <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </>
              )
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-800 py-3 space-y-1 animate-fade-in-up">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-gray-300 hover:text-white text-sm px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/builder"
              onClick={() => setMobileOpen(false)}
              className="block text-center mt-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600"
            >
              Build Resume
            </Link>
            {!loading && (
              user ? (
                <button
                  onClick={() => { signOut(); setMobileOpen(false); }}
                  className="block w-full text-center mt-2 px-4 py-2 text-gray-300 text-sm rounded-lg border border-gray-700 hover:bg-gray-800"
                >
                  Sign out
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center mt-2 px-4 py-2 text-gray-300 text-sm rounded-lg border border-gray-700 hover:bg-gray-800"
                >
                  Sign in
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
