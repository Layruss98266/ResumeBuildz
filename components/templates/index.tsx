'use client';

// Template registry. Every template is lazy-loaded via next/dynamic so the
// initial builder bundle only ships the selected template's JS/CSS, not all
// 20 at once. With ssr: false the preview renders client-side anyway, so
// we skip the SSR codepath to keep the server bundle tiny too.

import dynamic from 'next/dynamic';
import type { TemplateName } from '@/types/resume';
import type { TemplateProps } from './TemplateWrapper';

function lazyTemplate(loader: () => Promise<{ default: React.ComponentType<TemplateProps> }>) {
  return dynamic(loader, { ssr: false });
}

const templateComponents: Record<TemplateName, React.ComponentType<TemplateProps>> = {
  classic: lazyTemplate(() => import('./ClassicTemplate')),
  modern: lazyTemplate(() => import('./ModernTemplate')),
  minimalist: lazyTemplate(() => import('./MinimalistTemplate')),
  professional: lazyTemplate(() => import('./ProfessionalTemplate')),
  executive: lazyTemplate(() => import('./ExecutiveTemplate')),
  creative: lazyTemplate(() => import('./CreativeTemplate')),
  compact: lazyTemplate(() => import('./CompactTemplate')),
  tech: lazyTemplate(() => import('./TechTemplate')),
  elegant: lazyTemplate(() => import('./ElegantTemplate')),
  bold: lazyTemplate(() => import('./BoldTemplate')),
  academic: lazyTemplate(() => import('./AcademicTemplate')),
  corporate: lazyTemplate(() => import('./CorporateTemplate')),
  nordic: lazyTemplate(() => import('./NordicTemplate')),
  gradient: lazyTemplate(() => import('./GradientTemplate')),
  timeline: lazyTemplate(() => import('./TimelineTemplate')),
  sidebar: lazyTemplate(() => import('./SidebarTemplate')),
  infographic: lazyTemplate(() => import('./InfographicTemplate')),
  federal: lazyTemplate(() => import('./FederalTemplate')),
  startup: lazyTemplate(() => import('./StartupTemplate')),
  monochrome: lazyTemplate(() => import('./MonochromeTemplate')),
};

export function getTemplateComponent(name: TemplateName) {
  return templateComponents[name];
}
