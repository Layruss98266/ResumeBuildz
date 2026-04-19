/* eslint-disable react/no-unescaped-entities */
'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const PHRASES = [
  { phrase: 'Led a cross-functional effort to ...', signals: 'You aligned people who did not report to you. Strongest non-title leadership cue.' },
  { phrase: 'Partnered with (team / function) to ship ...', signals: 'Horizontal collaboration. Shows you drive outcomes through influence, not authority.' },
  { phrase: 'Mentored (N) engineers / analysts / designers ...', signals: 'Direct impact on other people is a standard manager criterion; mentorship proves you already do it.' },
  { phrase: 'Set direction for ...', signals: 'Strategy and prioritisation language. Subtle, but every hiring manager reads it.' },
  { phrase: 'Unblocked (team / project) by ...', signals: 'Manager work: removing obstacles so others can ship.' },
  { phrase: 'Drove alignment across (N) teams on ...', signals: 'Stakeholder management at scale. A phrase directors read carefully.' },
  { phrase: 'Owned (domain / surface) end to end ...', signals: 'Accountability for an area, not just a task. Ownership is manager-adjacent language.' },
  { phrase: 'Built the playbook for ...', signals: 'You created the process others now follow. That is leadership without title.' },
  { phrase: 'Ran the hiring loop for (N) roles ...', signals: 'Hiring is a core manager muscle; running loops shows you have practice.' },
  { phrase: 'Represented (team / product) in (forum) ...', signals: 'External-facing trust signal. You are the face of the work to leadership or customers.' },
];

const BULLETS = [
  { role: 'Senior Software Engineer', bullet: 'Led cross-team migration of 14 services to the new platform SDK; mentored 5 engineers through the 4-month effort and cut shared on-call pages by 38 percent.' },
  { role: 'Data Analyst (IC)', bullet: 'Owned analytics domain for Growth org (3 PMs, 2 squads); built self-serve dashboard that killed 62 percent of ad-hoc requests and freed 12 analyst hours per week.' },
  { role: 'Senior Product Designer', bullet: 'Set direction for the mobile design system across 4 product teams; drove adoption from 0 to 86 percent of surfaces in 7 months; ran weekly critique with 9 designers.' },
  { role: 'Marketing Specialist', bullet: 'Ran the content playbook adopted by 3 regional teams; onboarded 4 new writers and trained 2 junior marketers on SEO, lifting team output from 8 to 21 posts per month.' },
  { role: 'Account Executive', bullet: 'Built the deal-review ritual for the 11-person AE team; peer reviews lifted stage-3 to close rate from 18 to 31 percent across 2 quarters.' },
  { role: 'Operations Analyst', bullet: 'Partnered with Finance and Procurement to redesign vendor approval flow; 7 stakeholders, 18 meetings, 0 authority, final rollout cut cycle time from 14 to 3 days.' },
  { role: 'Backend Engineer', bullet: 'Unblocked the Payments team during a 6-week incident spike; led RCA reviews, wrote the new rollback runbook, and trained 8 engineers on the production checklist.' },
  { role: 'Customer Success Manager', bullet: 'Mentored 4 junior CSMs through their first renewal cycles; mentees hit 103 percent of their GRR target in FY25, above team average of 96 percent.' },
];

const MENTORSHIP = [
  'Name the number. "Mentored 5 engineers" beats "Mentored junior engineers" because it implies sustained effort.',
  'Name the outcome for the mentee. Promotions, first production ship, first talk given, completion of onboarding. The mentee becoming effective is the proof.',
  'Distinguish mentorship from pairing. Mentorship is a relationship over months; pairing is an hour. Say which you did.',
  'Avoid the word "help". "Helped new hires" is invisible to recruiters. "Owned onboarding track for 11 new hires" is a program you ran.',
];

const CROSS_FUNCTIONAL = [
  'Name the teams, not just the count. "Partnered with Data Science, Infra, and Support" is richer than "Partnered with 3 teams".',
  'Name the deliverable that only exists because of the collaboration. "Shipped unified event schema" versus "Worked with teams on schema".',
  'Name the tension you resolved. Cross-functional work is alignment work; the story arc is disagreement to decision.',
  'Keep scope honest. If it was one feature on one surface, say so. Scope inflation is the number one way senior interviewers catch resume puffery.',
];

const TOC = [
  { id: 'intro', label: 'Why leadership language matters' },
  { id: 'phrases', label: '10 phrases that signal leadership without title' },
  { id: 'bullets', label: '8 worked bullets across roles' },
  { id: 'mentorship', label: 'Mentorship framing that lands' },
  { id: 'cross-functional', label: 'Cross-functional project framing' },
  { id: 'avoid', label: '5 phrases to avoid' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Why Should We Hire You (8 Examples)', slug: 'why-should-we-hire-you', excerpt: 'The 3-pillar answer plus worked examples.', read: 12 },
  { title: 'STAR Method Examples', slug: 'star-method-examples', excerpt: 'Situation, Task, Action, Result with 12 examples.', read: 10 },
  { title: 'Resume Action Verbs (180)', slug: 'resume-action-verbs', excerpt: 'Strong openers organized by result type.', read: 8 },
  { title: 'Quantify Resume Achievements', slug: 'quantify-resume-achievements', excerpt: 'Put numbers on work you think cannot be measured.', read: 9 },
  { title: 'Tell Me About Yourself', slug: 'tell-me-about-yourself', excerpt: 'The 3-part structure that opens every interview.', read: 9 },
];

export default function LeadershipOnResumePage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Resume Writing"
      breadcrumbCurrent="Leadership on resume without a title"
      title="How to Describe Leadership on a Resume Without a Title (2026)"
      subtitle="10 phrases, 8 worked bullets, and the mentorship plus cross-functional framing that convince a hiring manager you are ready for the step up, even without Manager on your name tag."
      dateModified="2026-07-02"
      readingTime={11}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why this matters</p>
          <p className="text-gray-700">
            The biggest jump in any career is IC to manager. The resume reviewer on the other side needs evidence of leadership, and title is the cheap proxy they scan for first. If you have been leading without the title, the burden is on your resume to carry it. The good news: a dozen phrases, used precisely, close that gap.
          </p>
        </div>
        <p>
          Hiring managers interview for one thing when they read a Senior IC resume against a manager job: can this person get work done through other people. Everything else on the page (projects, technologies, years) is secondary. The page needs specific, non-inflated signals of the behaviours a manager role actually requires: mentorship, cross-functional alignment, setting direction, hiring, unblocking. Weak words like "helped" and "supported" drown these signals; strong verbs and named stakeholders surface them.
        </p>
      </section>

      <section id="phrases" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">10 phrases that signal leadership without title</h2>
        <div className="space-y-3">
          {PHRASES.map((p, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{p.phrase}</p>
              <p className="text-sm text-gray-700">{p.signals}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="bullets" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">8 worked bullets across roles</h2>
        <p className="mb-5 text-sm text-gray-700">Each of these uses a phrase from the list above, grounds it in a specific number, and avoids claiming a title the person did not hold.</p>
        <div className="space-y-3">
          {BULLETS.map((b, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-indigo-600 mb-2">{b.role}</p>
              <p className="text-sm text-gray-800">{b.bullet}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="mentorship" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Mentorship framing that lands</h2>
        <p className="mb-4 text-sm text-gray-700">Every Senior IC claims mentorship. Very few phrase it well. Four rules that separate real mentorship from filler.</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          {MENTORSHIP.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
        <p className="mt-4 text-sm text-gray-700">
          Sample that passes all four: "Mentored 4 junior engineers over 12 months; 2 reached Senior in their next review cycle and 1 shipped their first service end to end." The number, the outcome, the timeline, and the word "mentored" doing precise work.
        </p>
      </section>

      <section id="cross-functional" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Cross-functional project framing</h2>
        <p className="mb-4 text-sm text-gray-700">Leading without authority is the defining manager skill. Four rules for describing it.</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          {CROSS_FUNCTIONAL.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
        <p className="mt-4 text-sm text-gray-700">
          Sample: "Led cross-functional kill decision on the legacy billing flow; aligned Finance, Legal, and Product across 3 weeks of workshops; decision saved 840 engineering hours and unblocked the platform migration." No title, and yet clearly leadership.
        </p>
      </section>

      <section id="avoid" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">5 phrases to avoid</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><strong>&quot;Helped the team&quot;</strong>: invisible. Replace with the specific action you took.</li>
          <li><strong>&quot;Team player&quot;</strong>: self-rating, unprovable. Remove entirely.</li>
          <li><strong>&quot;Strong leadership skills&quot;</strong>: tell, not show. Delete the adjective; describe the action.</li>
          <li><strong>&quot;Informal team lead&quot;</strong>: signals the title was withheld. Just describe what you did.</li>
          <li><strong>&quot;Acted as a mentor&quot;</strong>: &quot;acted as&quot; is weasel-phrasing. You mentored or you did not.</li>
        </ul>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://hbr.org/2014/07/how-to-become-the-boss" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Harvard Business Review on making the IC to manager jump</a></li>
          <li><a href="https://review.firstround.com/the-indispensable-document-for-the-modern-manager/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">First Round Review on modern manager expectations</a></li>
          <li><a href="https://www.themuse.com/advice/how-to-show-leadership-skills-on-a-resume" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">The Muse on showing leadership on a resume</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Can I use the title "Team Lead" if my manager called me that informally?', a: 'No. Use your official title; describe lead responsibilities in the bullets. Inflating the title is the number one reason reference checks fail.' },
            { q: 'Should I add a Leadership section?', a: 'Only if you cannot weave leadership into existing bullets. A dedicated 2-line sub-section under your role, titled "Leadership", works cleanly; a whole separate page section usually does not.' },
            { q: 'How much leadership framing is too much?', a: 'If more than 40 percent of your bullets are leadership-flavoured, the technical content suffers. Aim for 2 to 4 leadership bullets per role.' },
            { q: 'Do volunteer leadership roles count?', a: 'Yes, if the scope and accountability are real. Organising a 3-day 400-person conference shows more leadership than "informal mentor to 1 intern".' },
            { q: 'Does "Tech Lead" count as leadership if I had no direct reports?', a: 'Yes. Tech Lead is a recognised role on the leadership spectrum. Name the team size and project scope so reviewers can calibrate.' },
            { q: 'What if my manager takes credit for team wins?', a: 'Describe your contribution using "I led", "I drove", "I owned". Do not wait for manager approval on the resume; the resume is yours.' },
            { q: 'Should I list leadership training or courses?', a: 'Only if the course is well-known (LEAD, Manager Bootcamp by a known firm). A generic LinkedIn Learning course takes up space without adding signal.' },
            { q: 'How do I frame leadership if I was an individual contributor for years?', a: 'Focus on influence, mentorship, and cross-functional alignment. Those are the 3 manager signals that do not require direct reports.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Build a resume that reads like a manager</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz surfaces weak leadership phrases as you type and suggests stronger alternatives backed by the 10-phrase framework above.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
