'use client';

import { useState, useMemo } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Label } from '@/components/ui/label';
import { INDUSTRIES, INDUSTRY_KEYWORDS } from '../data/industryKeywords';
import { getResumeText } from '../utils/textAnalysis';
import { Search } from 'lucide-react';

export default function IndustryKeywords() {
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0]?.name || '');
  const [selectedRole, setSelectedRole] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { resumeData } = useResumeStore();

  // Get roles for selected industry
  const currentIndustry = useMemo(
    () => INDUSTRIES.find(i => i.name === selectedIndustry),
    [selectedIndustry]
  );

  const roles = useMemo(() => currentIndustry?.roles || [], [currentIndustry]);

  // Auto-select first role when industry changes
  const activeRole = selectedRole && roles.some(r => r.role === selectedRole)
    ? selectedRole
    : roles[0]?.role || '';

  // Get keywords - either from hierarchical data or flat fallback
  const keywords = useMemo(() => {
    if (currentIndustry) {
      const role = currentIndustry.roles.find(r => r.role === activeRole);
      return role?.keywords || [];
    }
    return INDUSTRY_KEYWORDS[activeRole] || [];
  }, [currentIndustry, activeRole]);

  // Filter roles by search query
  const filteredRoles = useMemo(() => {
    if (!searchQuery.trim()) return roles;
    const q = searchQuery.toLowerCase();
    return roles.filter(r => r.role.toLowerCase().includes(q));
  }, [roles, searchQuery]);

  // Search across all industries and roles
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return null;
    const q = searchQuery.toLowerCase();
    const results: { industry: string; role: string }[] = [];
    for (const ind of INDUSTRIES) {
      for (const r of ind.roles) {
        if (r.role.toLowerCase().includes(q) || r.keywords.some(k => k.includes(q))) {
          results.push({ industry: ind.name, role: r.role });
          if (results.length >= 10) break;
        }
      }
      if (results.length >= 10) break;
    }
    return results;
  }, [searchQuery]);

  // Match keywords against resume
  const { found, missing, total } = useMemo(() => {
    const resumeText = getResumeText(resumeData);
    const foundList: string[] = [];
    const missingList: string[] = [];

    for (const keyword of keywords) {
      if (resumeText.includes(keyword.toLowerCase())) {
        foundList.push(keyword);
      } else {
        missingList.push(keyword);
      }
    }

    return { found: foundList, missing: missingList, total: keywords.length };
  }, [keywords, resumeData]);

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search roles or skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-8 rounded-md border border-input bg-background pl-7 pr-2 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder:text-muted-foreground"
        />
      </div>

      {/* Search results dropdown */}
      {searchResults && searchResults.length > 0 && (
        <div className="border rounded-lg bg-background shadow-sm max-h-[150px] overflow-y-auto">
          {searchResults.map((r, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedIndustry(r.industry);
                setSelectedRole(r.role);
                setSearchQuery('');
              }}
              className="w-full text-left px-3 py-1.5 text-xs hover:bg-muted transition-colors flex items-center justify-between"
            >
              <span className="font-medium truncate">{r.role}</span>
              <span className="text-[10px] text-muted-foreground shrink-0 ml-2">{r.industry}</span>
            </button>
          ))}
        </div>
      )}

      {/* Industry selector */}
      <div className="space-y-1.5">
        <Label className="text-xs">Industry</Label>
        <select
          value={selectedIndustry}
          onChange={(e) => { setSelectedIndustry(e.target.value); setSelectedRole(''); }}
          className="w-full h-8 rounded-md border border-input bg-background px-2 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {INDUSTRIES.map((ind) => (
            <option key={ind.name} value={ind.name}>{ind.name}</option>
          ))}
        </select>
      </div>

      {/* Role selector */}
      <div className="space-y-1.5">
        <Label className="text-xs">Role</Label>
        <select
          value={activeRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="w-full h-8 rounded-md border border-input bg-background px-2 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {(filteredRoles.length > 0 ? filteredRoles : roles).map((r) => (
            <option key={r.role} value={r.role}>{r.role}</option>
          ))}
        </select>
      </div>

      {/* Match count */}
      {total > 0 && (
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{found.length}</span> of{' '}
          <span className="font-medium text-foreground">{total}</span> keywords found
        </p>
      )}

      {/* Keyword tags */}
      {total > 0 && (
        <div className="flex flex-wrap gap-1">
          {found.map((kw) => (
            <span
              key={kw}
              className="text-xs px-1.5 py-0.5 rounded bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400 border border-green-200 dark:border-green-900"
            >
              {kw}
            </span>
          ))}
          {missing.map((kw) => (
            <span
              key={kw}
              className="text-xs px-1.5 py-0.5 rounded border border-dashed border-muted-foreground/40 text-muted-foreground"
            >
              {kw}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
