'use client';
/* eslint-disable react/no-unescaped-entities */

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const SECTIONS = [
  { order: 1, section: 'Header', content: 'Name, roll number, branch, CGPA, phone, IIT email, GitHub, LinkedIn. Single line or two. No photo.' },
  { order: 2, section: 'Education', content: 'IIT first with branch, current CGPA (2 decimals), expected graduation. Class 12 percentage and board. Class 10 only if percentage is 90+.' },
  { order: 3, section: 'Scholastic Achievements', content: 'JEE Advanced AIR, JEE Main percentile, KVPY, Olympiads, department rank. 2 to 4 lines. Most IIT resumes keep this above Experience.' },
  { order: 4, section: 'Internships / Work Experience', content: 'Reverse chronological. Role, company, dates, 3 to 4 bullets each. Quantify every bullet.' },
  { order: 5, section: 'Projects', content: 'Course projects, self-initiated, research. Title, stack, role, 2 to 3 bullets, link to GitHub or demo.' },
  { order: 6, section: 'Skills', content: 'Languages, frameworks, tools, databases. Grouped, comma-separated. No proficiency bars.' },
  { order: 7, section: 'Positions of Responsibility', content: 'Secretary of X Club, Coordinator for Y Event, TA for CS 101. Include scale numbers (500 students, 20 volunteers).' },
  { order: 8, section: 'Extra-curricular', content: 'Sports at inter-IIT, cultural wins, community work. 2 to 3 lines total. This is the differentiator section.' },
];

const PILLARS = [
  { pillar: 'JEE rank + CGPA first', detail: 'On Day 1 companies, recruiters filter by these two numbers before reading bullets. Put them where they cannot be missed: AIR in Scholastic Achievements, CGPA in Education header.' },
  { pillar: 'Quantify every bullet', detail: 'Not "worked on backend API" but "built backend API handling 50K req/s on a 2-node setup, cut p99 latency 40 percent". IIT recruiters expect numbers from IITs. Bullets without numbers get skipped.' },
  { pillar: 'Project depth over breadth', detail: '4 deep projects beat 9 shallow ones. Depth means: problem statement, your contribution, tech choice rationale, outcome with a number. Shallow means: "used React and Node to build a clone of X".' },
  { pillar: 'One page only, even for dual degree', detail: 'The SPO one-page rule is near-universal across IITs. Font 10 to 11 pt, margins 0.5 inch, line-height 1.15. Every word earns its space.' },
  { pillar: 'Branch-specific tailoring', detail: 'CSE resume emphasises system design, scale, algorithms. Mechanical emphasises CAD, simulation, fabrication. Electrical splits between core (VLSI, Power) and software. Never send a generic resume to a branch-core company.' },
];

const CSE_EXAMPLE = [
  'Designed and implemented a distributed task queue in Go handling 100K messages/second across a 5-node cluster, reducing backend processing latency by 62 percent compared to the Redis-based predecessor.',
  'Led a team of 3 in building the search auto-complete for CampusConnect (12K MAU), using a Trie + Bloom filter index that served queries in under 8 ms p95 on a single t3.small instance.',
  'Contributed a patch to PyTorch (merged, PR #87412) fixing a CUDA memory leak in the data loader that affected batch training jobs above 64 workers.',
  'Won 2nd place out of 184 teams at Inter-IIT Tech Meet 2025 for a real-time drone obstacle avoidance system built on ROS 2 with a 12 ms end-to-end reaction loop.',
];

const MECH_EXAMPLE = [
  'Designed a 3-stage compressor blade geometry in ANSYS Fluent, improving isentropic efficiency from 81.2 to 84.7 percent over the baseline NACA profile for a 3 kg/s mass flow.',
  'Fabricated a 1:4 scale model of the designed compressor using 5-axis CNC (Al 6061), validated simulation results to within 3 percent error on a lab wind-tunnel setup.',
  'Co-authored a paper (accepted, AIAA 2026) on slotted-blade tip leakage reduction, contributing the CFD setup and mesh independence study.',
  'Internship at General Motors Tech Bangalore: built a Python tool that reduced BOM reconciliation time from 4 hours to 12 minutes across 2,400 SKUs.',
];

const MISTAKES = [
  { m: 'Listing "Microsoft Word" and "Gmail" under Skills.', fix: 'Cut. Every IIT student has these. Use the space for languages, frameworks, CAD tools, simulation packages you actually know deeply.' },
  { m: 'Course project called "E-commerce Website using MERN Stack".', fix: 'Either rename to the actual product you built and quantify usage, or drop the project. Generic clones flag as filler.' },
  { m: 'CGPA hidden in the middle of the page.', fix: 'Put CGPA in the Education line next to the branch. Add department rank if in top 10.' },
  { m: 'POR that reads "Member of XYZ Club".', fix: 'Mere membership is not a POR. Replace with a role you actually held with scale: "Coordinator, TechFest 2025 (event attended by 8,000 students)".' },
  { m: 'Research project with no professor name or outcome.', fix: 'Always cite the professor and lab. Add publication status, poster, report link, or metric.' },
  { m: 'Resume longer than 1 page.', fix: 'Cut. Every SPO in every IIT has a 1-page limit. Companies receive 400 resumes per role; 2-pagers get skipped at the first filter.' },
  { m: 'Same resume for every company on Day 1.', fix: 'Two versions minimum: software (Goldman, Microsoft, Samsung R&D) and core (Schlumberger, Reliance, ISRO). Tailor the projects order.' },
];

const TOC = [
  { id: 'intro', label: 'The IIT resume bar' },
  { id: 'sections', label: 'Section order (SPO-compliant)' },
  { id: 'pillars', label: '5 pillars of an IIT resume' },
  { id: 'cse-example', label: 'CSE branch example bullets' },
  { id: 'mech-example', label: 'Mechanical branch example bullets' },
  { id: 'mistakes', label: '7 mistakes that drop you in the stack' },
  { id: 'day-zero', label: 'Day 1 vs Day 2 vs open season' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'Campus Placement Resume', slug: 'campus-placement-resume', excerpt: 'Formats and bullets for final-year placements.', read: 11 },
  { title: 'Fresher Resume Guide', slug: 'fresher-resume', excerpt: 'What to include when you have no experience.', read: 10 },
  { title: 'TCS NQT Resume Guide', slug: 'tcs-nqt-resume-guide', excerpt: 'Format and tactics for TCS campus drives.', read: 9 },
  { title: 'Quantify Resume Achievements', slug: 'quantify-resume-achievements', excerpt: 'Turn every bullet into a number.', read: 10 },
  { title: 'How to Pass ATS Scanning 2026', slug: 'pass-ats-resume-scanning', excerpt: '7 killers and 10 tactics.', read: 11 },
];

export default function IITPlacementResumePage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="India Hiring"
      breadcrumbCurrent="IIT / NIT placement resume"
      title="IIT / NIT Placement Resume Template (2026)"
      subtitle="The section order, bullet depth, and branch-specific tailoring that clears Day 1 shortlists at IIT and NIT. SPO-compliant one page, CSE and Mechanical example bullets, and the 7 mistakes that drop you in the stack."
      dateModified="2026-07-30"
      readingTime={13}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why the IIT resume is different</p>
          <p className="text-gray-700">
            Campus placement at IIT and NIT is not a normal job search. 300 to 500 students apply for 8 to 15 Day 1 slots. Recruiters get 400 resumes per role, read each for under 10 seconds, and shortlist 20 for interviews. The resume is the only filter. A good one does not get you the job; it gets you into the room where you can get the job.
          </p>
        </div>
        <p>
          IIT placement resumes follow a strict template set by the Student Placement Office at each IIT (SPO at IIT Bombay, CDC at IIT Kharagpur, Placement Cell at IIT Delhi). One page. Specific section order. No photo. No colours beyond subtle accents. The template is rigid because consistency lets recruiters scan 400 files quickly. Breaking the template makes your resume feel amateur, not creative.
        </p>
        <p>
          This guide gives the SPO-compliant structure, the five pillars recruiters actually score on, and branch-specific bullet examples for CSE and Mechanical. It applies equally to NIT placements (Trichy, Warangal, Surathkal), where the format is near-identical.
        </p>
      </section>

      <section id="sections" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Section order (SPO-compliant)</h2>
        <p className="mb-4">Order matters. Recruiters scan top-down; the first five inches of the page decide the shortlist. Here is the order used by most IIT SPOs and mirrored by NIT placement cells.</p>
        <div className="space-y-3">
          {SECTIONS.map((s, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{s.order}. {s.section}</p>
              <p className="text-sm text-gray-700">{s.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pillars" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">5 pillars of an IIT resume</h2>
        <div className="space-y-3">
          {PILLARS.map((p, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{p.pillar}</p>
              <p className="text-sm text-gray-700">{p.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="cse-example" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">CSE branch example bullets</h2>
        <p className="mb-3">Use these as a template for how depth and numbers combine. Each bullet names the tech, the scale, and the outcome.</p>
        <ul className="list-disc pl-5 space-y-3 text-sm text-gray-700">
          {CSE_EXAMPLE.map((b, i) => (<li key={i}>{b}</li>))}
        </ul>
      </section>

      <section id="mech-example" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Mechanical branch example bullets</h2>
        <p className="mb-3">Core branches need domain-specific numbers: efficiency percentages, mass flow, dimensional tolerance. Software-y bullets (Python tool, dashboard) are fine as secondary proof.</p>
        <ul className="list-disc pl-5 space-y-3 text-sm text-gray-700">
          {MECH_EXAMPLE.map((b, i) => (<li key={i}>{b}</li>))}
        </ul>
      </section>

      <section id="mistakes" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">7 mistakes that drop you in the stack</h2>
        <div className="space-y-3">
          {MISTAKES.map((m, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{m.m}</p>
              <p className="text-sm text-gray-700">{m.fix}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="day-zero" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Day 1 vs Day 2 vs open season</h2>
        <p className="mb-3">
          Day 1 companies (Microsoft, Goldman Sachs, Uber, Rubrik, McKinsey, BCG) filter on CGPA first (often 8.0 or 8.5 cutoff) and expect at least one strong internship or a competitive programming rank. Resume must lead with numbers. Scholastic achievements visible.
        </p>
        <p className="mb-3">
          Day 2 onwards (Indian IT services, analytics firms, core engineering) usually drop the CGPA cutoff to 7.0 and widen the net. Here the POR and extra-curricular sections carry more weight; recruiters want cultural fit signals alongside technical depth.
        </p>
        <p>
          Open season and off-campus use the same resume but tailor the summary line (if you include one) to the specific role. Reorder projects so the most relevant one is first. Swap in a different 1-line role statement at the top.
        </p>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://www.iitb.ac.in/placements/placement-policy" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">IIT Bombay Placement Policy</a></li>
          <li><a href="https://placements.iitd.ac.in/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">IIT Delhi Placement Office</a></li>
          <li><a href="https://www.cdc.iitkgp.ac.in/" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">IIT Kharagpur Career Development Centre</a></li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Can my IIT placement resume be 2 pages?', a: 'No. SPO rules at every IIT mandate 1 page. Companies enforce it at upload. 2-page resumes are rejected at the filter step.' },
            { q: 'Should I include CGPA if it is below 7.5?', a: 'Yes. You cannot hide it; SPO verifies against the transcript. If below 7.5, balance with strong projects, a research publication, or competitive programming ranks at the top.' },
            { q: 'Do I need a photo on the IIT resume?', a: 'No. SPO templates explicitly do not include a photo. Adding one gets your file flagged as non-standard.' },
            { q: 'How many projects should I list?', a: '3 to 5 with real depth. Better to drop a weak project than pad the page. Recruiters always prefer 3 deep over 6 shallow.' },
            { q: 'Should I list online courses like Coursera?', a: 'Only if it is a credit-bearing or named specialisation (Deep Learning Specialisation, CS50x). Random 4-hour courses add noise.' },
            { q: 'My JEE rank is above 10,000, should I still include it?', a: 'Yes, if it got you into the IIT. Any JEE Advanced qualification is a signal. AIRs below 5000 carry more weight; above 5000 are still fine to list.' },
            { q: 'What if I had no internship in second year summer?', a: 'Replace with a self-initiated project of internship depth: 3 months of work, a named deliverable, a link to GitHub or a live demo. Frame it honestly, not as a fake internship.' },
            { q: 'Should NIT students follow this same format?', a: 'Yes. NIT placement cells use near-identical templates. Only the header field (roll number format, branch code) changes.' },
            { q: 'Does ResumeBuildz have an IIT template?', a: 'The minimal single-column template in the builder matches SPO requirements out of the box. Use the single-column format, set margins to 0.5 inch, body font 10.5 pt.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Build your IIT / NIT placement resume</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">ResumeBuildz ships a single-column, SPO-compliant template. Edit online, export to PDF with exact one-page margins.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
