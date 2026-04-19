'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const WORKS = [
  { phrase: 'Career break, parental leave (2023 to 2025)', why: 'Honest, plain, and normalises the gap. Listed as an entry on the experience timeline so the timeline is continuous.' },
  { phrase: 'Parental leave and caregiving, full time (Jan 2024 to Mar 2026)', why: 'Treats caregiving as actual work, which it is. Dates the gap cleanly so recruiters do not have to infer.' },
  { phrase: 'Family sabbatical', why: 'Neutral, short, works in formal industries (finance, consulting) where the word leave can feel clinical.' },
  { phrase: 'Maternity leave (12 months) followed by selected freelance engagements', why: 'Useful when you did any paid work during the break. Signals continuity and initiative without over-claiming.' },
];

const AVOID = [
  { phrase: 'Personal reasons', why: 'Reads as evasive. Recruiters assume the worst (illness, termination, visa issue). Name the reason.' },
  { phrase: 'Gap (2023 to 2025)', why: 'The word gap is loaded. Use career break, sabbatical, or parental leave instead.' },
  { phrase: 'Unemployed', why: 'Technically accurate, tonally wrong. Nobody describes a chosen parenting break as unemployment.' },
  { phrase: 'Taking care of baby', why: 'Too casual for a resume. Caregiving or parental leave reads as considered, not improvised.' },
  { phrase: 'Leaving the gap unexplained', why: 'Worst of all. Recruiters fill the silence with worse stories than the truth. Always name the break.' },
];

const STAYED_SHARP = [
  { item: 'Online courses completed', detail: 'Coursera, Udemy, or DeepLearning.AI certificates with dates and grades. Even 2 courses during a 2 year break reset the recency clock.' },
  { item: 'Open source contributions or side projects', detail: 'GitHub commits, a portfolio site, an npm package. Real code that a hiring manager can read.' },
  { item: 'Freelance or consulting engagements', detail: 'Short named projects (client anonymised if needed) with outcome and tech stack. 2 to 3 is plenty.' },
  { item: 'Industry reading and community', detail: 'Regular blog posts, conference attendance (online is fine), a newsletter you write, communities you run.' },
  { item: 'Certifications refreshed', detail: 'AWS, Azure, PMP, CFA, whatever is current in your field. Renewed certs during the break show intent to return.' },
  { item: 'Soft skills built during caregiving', detail: 'Project management of a tiny unpredictable human is real. Budget planning, logistics, negotiation. Frame carefully, but do not ignore.' },
];

const SUMMARIES = [
  {
    role: 'Senior product manager returning after 2 years',
    text: 'Senior product manager with 9 years leading B2B SaaS roadmaps (prior: Zoho, Freshworks). Returning after a 24 month parental leave during which I completed the Reforge Product Strategy sprint and consulted part time for 2 early stage startups on pricing experiments. Looking for IC senior PM roles in Bengaluru or remote.',
  },
  {
    role: 'Software engineer returning after 18 months',
    text: 'Backend engineer (Go, Postgres, AWS) with 6 years at Flipkart and Swiggy. On parental leave since Oct 2024; rejoined open source in early 2026 with 3 merged PRs to the Go ecosystem (urfave/cli, gorilla/mux). Open to senior IC roles and tech lead tracks, hybrid preferred.',
  },
  {
    role: 'Marketing manager returning after a longer break',
    text: 'Performance marketing manager, 7 years in e-commerce (Myntra, Nykaa). Took a 3 year parental leave; during that time completed Google Ads and HubSpot certifications and ran marketing for a family run D2C brand that scaled from 20 to 140 lakh annual revenue. Returning to a full time growth role, Mumbai or remote.',
  },
  {
    role: 'Paternity leave return, data analyst',
    text: 'Data analyst (SQL, Python, Tableau) with 5 years across Zomato and PayU. Took a 6 month paternity leave in 2025; during the break contributed to a Kaggle competition (top 12 percent) and built a personal analytics dashboard project. Targeting senior analyst or analytics engineer roles.',
  },
];

const RETURNSHIPS = [
  { program: 'Tata SCIP (Second Career Internship Programme)', note: 'India. 6 month flexible programme for returning women professionals. Multiple Tata group companies.' },
  { program: 'Accenture Career Reboot', note: 'India and global. 4 to 6 month returnship with conversion to full time. Strong in tech and consulting tracks.' },
  { program: 'Amazon Returnship', note: 'India, US, UK. 16 week programme with high conversion rate into L5 and L6 roles.' },
  { program: 'Goldman Sachs Returnship', note: 'Global. 10 week paid programme, originally the founder of the returnship category. Finance and engineering roles.' },
  { program: 'IBM Tech Re-Entry', note: 'India, US. 12 week programme focused on cloud, AI, and data. Strong for long 3 year plus breaks.' },
  { program: 'Path Forward (non-profit aggregator)', note: 'US primarily, some global. Partners with 80+ companies including Cloudflare, GoDaddy, Audible. Great directory to start.' },
  { program: 'JobsForHer (India)', note: 'Job board and community focused on women returning to work. Not a returnship itself but lists most India programmes in one place.' },
];

const TOC = [
  { id: 'intro', label: 'Talking about the gap, honestly' },
  { id: 'frame', label: 'Language that works (and what does not)' },
  { id: 'sharp', label: 'The stayed-sharp list during the break' },
  { id: 'summaries', label: '4 example summary statements' },
  { id: 'returnships', label: 'Returnship programmes in India and globally' },
  { id: 'flex', label: 'The conversation about flexibility' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Resume Summary Examples', slug: 'resume-summary-examples', excerpt: '20 summary templates for every stage.', read: 9 },
  { title: 'Resume Format Guide', slug: 'resume-format-guide', excerpt: 'Chronological vs functional vs hybrid.', read: 10 },
  { title: 'Tailor Your Resume in 12 Minutes', slug: 'tailor-resume', excerpt: 'Make one resume fit any job description.', read: 10 },
  { title: 'Resume Action Verbs (200+)', slug: 'resume-action-verbs', excerpt: 'Power verbs grouped by role.', read: 7 },
  { title: 'LinkedIn URL on Resume', slug: 'linkedin-url-on-resume', excerpt: 'Formatting your LinkedIn URL correctly.', read: 6 },
];

export default function ResumeAfterParentalLeavePage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="Career Transitions"
      breadcrumbCurrent="Resume after parental leave"
      title="Resume After Maternity or Paternity Leave (2026)"
      subtitle="How to address a parental career break on your resume honestly, what framing works and what does not, the stayed-sharp list during the break, 4 real summary examples, returnship programmes, and the flexibility conversation."
      dateModified="2026-05-31"
      readingTime={11}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Your gap is not a liability. Your silence about it is.</p>
          <p className="text-gray-700">
            Hiring managers are used to parental breaks. Most have taken one themselves, managed one for a partner, or hired 5 people who returned from one. What makes a resume land or stall is not whether you took the break, it is whether you name it, frame it cleanly, and show what kept your skills alive. This guide covers exactly how.
          </p>
        </div>
        <p>
          In India and globally, roughly a third of women who leave full time work for a child return within 3 years; another quarter return between years 4 and 6. Paternity leave take-up is rising fast too, especially at multinationals. The career break is mainstream. The only resumes that still get passed over are the ones that try to hide the break or explain it with a defensive paragraph. Straight, short, and factual wins every time.
        </p>
        <p className="mt-3">
          One ground rule: you do not owe anyone medical or personal detail. Name the break, give the dates, note what you did during it that kept you current, move on. The rest is for the interview, at your discretion.
        </p>
      </section>

      <section id="frame" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Language that works (and what does not)</h2>
        <h3 className="text-lg font-bold text-gray-900 mb-3">What works on the resume</h3>
        <div className="space-y-3 mb-8">
          {WORKS.map((w, i) => (
            <div key={i} className="border border-green-200 bg-green-50 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{w.phrase}</p>
              <p className="text-sm text-gray-700">{w.why}</p>
            </div>
          ))}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">What to avoid</h3>
        <div className="space-y-3">
          {AVOID.map((a, i) => (
            <div key={i} className="border border-red-200 bg-red-50 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{a.phrase}</p>
              <p className="text-sm text-gray-700">{a.why}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="sharp" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">The stayed-sharp list during the break</h2>
        <p className="mb-4">You do not need to have coded daily through the break. You do need 2 or 3 concrete signals that your skills are current as of the last 6 months before you apply. Pick from this list; 2 of these is enough, 3 is comfortable, all of them looks performative.</p>
        <div className="space-y-3">
          {STAYED_SHARP.map((s, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{s.item}</p>
              <p className="text-sm text-gray-700">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="summaries" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">4 example summary statements</h2>
        <p className="mb-4">Each of these is 3 sentences, names the break, names what kept skills current, and closes with the next role target. Adapt the structure; do not copy verbatim.</p>
        <div className="space-y-4">
          {SUMMARIES.map((s, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-2">{s.role}</p>
              <p className="text-sm text-gray-700 italic leading-relaxed">&ldquo;{s.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      <section id="returnships" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Returnship programmes in India and globally</h2>
        <p className="mb-4">Returnships are paid, structured 10 to 26 week programmes designed for professionals returning after a career break. Conversion rates into full time roles run about 60 to 80 percent at the programmes below. Apply to 3 to 5; treat them like any other hiring loop.</p>
        <div className="space-y-3">
          {RETURNSHIPS.map((r, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{r.program}</p>
              <p className="text-sm text-gray-700">{r.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="flex" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The conversation about flexibility</h2>
        <p className="mb-3">Flexibility is negotiable, but negotiate at the right stage. Do not put flex requirements on the resume itself (remote only, 4 day week, school pickup window). That screens you out before a conversation. Raise flexibility needs at the second recruiter call, after interest is mutual and before the final round.</p>
        <p className="mb-3">Script that works: &ldquo;I am excited about this role. To make sure we are aligned, I wanted to share that I need Tuesdays work from home for a standing commitment and a hard stop at 6 pm most days. I can be on for emergencies. Does that fit how the team operates?&rdquo;</p>
        <p>Most managers say yes. The ones who say no have told you something important for free. Either way, do not hide it until week 3 of onboarding.</p>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://hbr.org/2021/01/how-to-explain-a-career-gap-on-your-resume" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Harvard Business Review: How to explain a career gap on your resume</a></li>
          <li><a href="https://www.pathforward.org/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">Path Forward: returnship programme directory</a></li>
          <li><a href="https://www.jobsforher.com/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">JobsForHer: India focused return to work community</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How do I explain a 2 year maternity break on my resume?', a: 'List it as a timeline entry: Parental leave and caregiving, Jan 2024 to Mar 2026. Follow with 1 or 2 stayed-sharp bullets (courses completed, freelance work, open source). That is enough.' },
            { q: 'Should I leave the gap blank on my resume?', a: 'No. Blank gaps create worse assumptions than named ones. Recruiters scan for continuous timelines; an unexplained 2 year silence prompts questions a single labelled line would answer.' },
            { q: 'Do recruiters discriminate against parental leave?', a: 'Legally they cannot; in practice, bias exists. The counter is concrete stayed-sharp evidence and a clear return target. Returnship programmes also route around the filter entirely.' },
            { q: 'How much time to prep before returning to work?', a: 'Give yourself 6 to 10 weeks. Weeks 1 to 4: refresh core skills, complete 1 or 2 certifications, update portfolio. Weeks 5 to 8: draft resume, apply to 5 returnships and 20 direct roles. Weeks 9 to 10: interview prep.' },
            { q: 'Is a functional resume better when I have a gap?', a: 'No. Hybrid or chronological wins. Functional resumes scream hide something to every recruiter. Keep the timeline chronological, name the break, and let the stayed-sharp bullets do the work.' },
            { q: 'Should I list the baby or child in a cover letter?', a: 'Only if it is directly relevant (childcare hours, flexibility discussion). Even then, save it for the second call, not the first document. The resume is about the professional you; the personal piece is optional.' },
            { q: 'How do I answer why there is a gap in interviews?', a: 'Two sentences, factual and forward. Example: I took 18 months for parental leave. During that time I completed my AWS Solutions Architect cert and did 2 freelance engagements. I am fully re-engaged now and excited about this role.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Build a resume that names the break, cleanly</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz has a career break section type built in: label the dates, add your stayed-sharp bullets, and keep the timeline continuous. Clean, ATS safe, done in 20 minutes.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
