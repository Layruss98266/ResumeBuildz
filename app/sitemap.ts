import type { MetadataRoute } from 'next';
import { COMPANIES } from '@/lib/resumeCompanyData';
import { ROLES } from '@/lib/resumeRoleData';
import { BLOG_POSTS, isPublished } from '@/lib/blogPosts';
import { SITE_URL } from '@/lib/siteConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const marketingLastModified = new Date('2026-05-05T00:00:00Z');
  const companyGuideLastModified = new Date('2026-04-15T00:00:00Z');
  const roleGuideLastModified = new Date('2026-04-19T00:00:00Z');

  const staticEntries: MetadataRoute.Sitemap = [
    { url: base, lastModified: marketingLastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/builder`, lastModified: marketingLastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/templates`, lastModified: marketingLastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/pricing`, lastModified: marketingLastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/about`, lastModified: marketingLastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/faq`, lastModified: marketingLastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/terms`, lastModified: marketingLastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/contact`, lastModified: marketingLastModified, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/changelog`, lastModified: marketingLastModified, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/roadmap`, lastModified: marketingLastModified, changeFrequency: 'weekly', priority: 0.4 },
    { url: `${base}/status`, lastModified: marketingLastModified, changeFrequency: 'daily', priority: 0.3 },
    { url: `${base}/privacy`, lastModified: marketingLastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/refund`, lastModified: marketingLastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/shipping`, lastModified: marketingLastModified, changeFrequency: 'yearly', priority: 0.2 },

    // Resources hub + situation pages
    { url: `${base}/blog/company-guides`, lastModified: companyGuideLastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/resume`, lastModified: roleGuideLastModified, changeFrequency: 'weekly', priority: 0.8 },

    // Blog hub
    { url: `${base}/blog`, lastModified: marketingLastModified, changeFrequency: 'weekly', priority: 0.9 },

    // Author page
    { url: `${base}/author/surya-l`, lastModified: marketingLastModified, changeFrequency: 'monthly', priority: 0.4 },
  ];

  // Dynamic company pages (22 entries), now living under /blog/company-guides/.
  const companyEntries: MetadataRoute.Sitemap = COMPANIES.map((c) => ({
    url: `${base}/blog/company-guides/${c.slug}`,
    lastModified: companyGuideLastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Role-based resume guides.
  const roleEntries: MetadataRoute.Sitemap = ROLES.map((r) => ({
    url: `${base}/resume/${r.slug}`,
    lastModified: roleGuideLastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog posts — auto-discovered from registry so new posts hit the sitemap
  // without manual edits. Slugs point to top-level routes (e.g. /fresher-resume).
  const staticSlugs = new Set(staticEntries.map((e) => e.url));
  // Scheduled-future posts are excluded from sitemap. Google should never
  // try to crawl them before their publishAt — the per-post page.tsx
  // returns 404 on direct hit, and we don't want 404 entries in the map.
  const blogPostEntries: MetadataRoute.Sitemap = BLOG_POSTS
    .filter((p) => isPublished(p))
    .map((p) => ({
      url: `${base}/${p.slug}`,
      lastModified: new Date(p.dateModified),
      changeFrequency: 'monthly' as const,
      priority: p.featured ? 0.8 : 0.7,
    }))
    .filter((e) => !staticSlugs.has(e.url));

  return [...staticEntries, ...companyEntries, ...roleEntries, ...blogPostEntries];
}
