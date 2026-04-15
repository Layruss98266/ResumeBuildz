import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string; // omit on the last (current) item
}

interface Props {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Visual breadcrumb trail. Pair with breadcrumbSchema() in lib/articleSchema
 * to emit JSON-LD BreadcrumbList.
 */
export default function Breadcrumbs({ items, className = '' }: Props) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-xs text-gray-400">
        <li className="flex items-center gap-1">
          <Link href="/" className="hover:text-white transition inline-flex items-center gap-1">
            <Home className="h-3 w-3" />
            <span className="sr-only sm:not-sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3 text-gray-600" aria-hidden />
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-white transition">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-gray-300' : ''} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
