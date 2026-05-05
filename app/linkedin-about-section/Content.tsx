'use client';
 

import BlogPostLayout from '@/components/BlogPostLayout';
import { useLoginGateway } from '@/components/LoginGateway';

const FORMULA = [
  { beat: 'Hook (line 1 to 2)', detail: 'The first 300 characters are visible before Read more. Lead with the single sharpest thing about you. Avoid I am a results-driven professional. Prefer a concrete proof: I have shipped 12 payments features for 8M users at Razorpay.' },
  { beat: 'Proof (3 to 5 lines)', detail: 'Two or three specific wins with numbers. Not a resume rehash; the compressed highlights version. One line per win. Numbers do the work.' },
  { beat: 'Angle / specialisation (2 to 3 lines)', detail: 'The niche you sit in. What you are known for. The intersection of skills that makes you rare. One sentence each on expertise, domain, and tools.' },
  { beat: 'What you are looking for (2 lines)', detail: 'Specific. Senior backend roles in fintech, ideally payments or lending, India or Singapore. Vague closers lose recruiter time.' },
  { beat: 'Call to action (1 line)', detail: 'How to reach you. Email, a Calendly, or DM me on LinkedIn. Always include one channel even if you are passively looking.' },
];

const EXAMPLES = [
  { role: 'Software Engineer (3 yrs)', text: `I build payments infrastructure. At Razorpay I have shipped 12 features used by 8M merchants, including the UPI 2.0 migration that cut checkout failures by 34 percent.

What I work on:
- Backend systems at scale: Go, Postgres, Kafka, Kubernetes
- Payments domain: UPI, cards, wallets, recurring, checkout
- Latency work: p99 cuts on the order of 3x through query and cache design

I am especially good at the intersection of payments regulation (RBI guidelines, PA/PG compliance) and high-throughput systems. That combination is rare and exactly what fintech teams struggle to hire.

Looking for: Senior Engineer roles at fintech or horizontal-infra companies, Bengaluru or remote-India.

Reach me at firstname.lastname@gmail.com or DM here.` },
  { role: 'Fresher / New Grad (CS)', text: `Final-year CS student at NIT Trichy (CGPA 8.7). I have shipped 3 side projects with real users and interned at Zomato last summer.

Projects:
- Studybuddy.ai: GPT-powered study planner, 1,400 monthly users, Product Hunt launch top 5.
- Commute-India: Open-source delay tracker for 6 Indian cities, 600 stars on GitHub.
- Intern at Zomato: rebuilt 2 search endpoints, cut p95 by 120ms, promoted to tech lead of the intern pod.

Strong areas: Go, Python, distributed systems, product sense from shipping to real users.

Looking for: SDE-1 and Product Engineer roles at product companies, India or APAC.

DM me or email firstname.lastname@college.edu.` },
  { role: 'Product Manager (mid-career)', text: `I run product at the intersection of growth and monetisation. Over 6 years I have scaled products from seed to 20M MAU and from 0 to 80 Cr ARR.

What I have shipped:
- Led retention pod at Swiggy Dineout: day-7 retention 23 to 41 percent via 4 A/B-tested iterations.
- Owned pricing at a Series B SaaS: experiment framework that lifted ARPU 2.3x in 9 months.
- Hired and mentored 3 APMs; 2 have since become PMs at Flipkart and PhonePe.

I am at my best when the product has a real business problem (activation, conversion, retention) and enough data that experimentation beats debate.

Looking for: Senior PM or Principal PM roles at growth-stage or public companies, consumer or vertical SaaS, India.

Reach me at dm on LinkedIn or firstname@gmail.com.` },
  { role: 'Designer / UX', text: `I design systems, not screens. Over 5 years I have shipped design systems adopted by 40+ product teams and cut design-to-ship time by 60 percent.

Highlights:
- At Zerodha: rebuilt the component library; now powers Kite, Console, and Varsity.
- Led accessibility rollout: WCAG 2.1 AA across 12 products, first pass QA failure rate dropped 80 percent.
- Mentored 6 designers through promotions; 2 now lead their own design systems.

I care about the boring-but-important stuff: tokens, documentation, adoption, audit tooling.

Looking for: Staff Designer or Design Systems Lead roles at companies with multiple product surfaces.

Portfolio at myname.design; reach me at hello@myname.design.` },
  { role: 'Career changer (finance to ML)', text: `Recovering investment banker turned ML engineer. 5 years on the M&A desk at Morgan Stanley, now 14 months shipping ML in production at 3 fintech startups.

What I bring that most MLEs do not:
- Deep finance domain: fraud scoring, underwriting, risk modeling
- Real M&A diligence experience (valuations, financial modelling) that translates to building feature stores and labeling strategies for financial data
- Stakeholder communication with CFOs and boards that non-MBA MLEs find hard

Stack: Python, PyTorch, SQL, Airflow, MLflow, GCP.

Looking for: Senior MLE or Applied Scientist roles at fintech or lending startups, India or remote.

Email firstname.lastname@gmail.com.` },
  { role: 'Executive / Director level', text: `I scale engineering orgs through hypergrowth. At Neobank-X I grew the team from 180 to 1,100 across 4 countries while holding shipping velocity and attrition under 10 percent.

Track record:
- 3 hypergrowth scaleups (fintech, commerce, SaaS), all cross-border.
- Ran engineering during 2 IPO readiness cycles and 1 successful exit (USD 1.8B).
- Hired and promoted 40+ senior engineers; 4 of my directs are now CTOs.

What I am known for: turning a 40-person hero-culture into a 400-person platform-team-culture without losing speed.

Looking for: CTO or VP Engineering roles at Series C and beyond, India, SEA, or ME.

Reach me through my EA, priya@company.com.` },
];

const MISTAKES = [
  { m: 'Leading with adjectives', fix: 'Results-driven, passionate, hardworking are invisible. Lead with a number or a named company.' },
  { m: 'Writing in third person', fix: 'First person. LinkedIn is a personal profile, not a brochure. Third person reads corporate and distant.' },
  { m: 'Copying your resume word for word', fix: 'The About section is the highlights reel. 4 wins max, written as sentences not bullets in the opening, bullets only for the middle block.' },
  { m: 'No call to action', fix: 'Always one clear way to contact you. Email or DM. Without a CTA, recruiters move on.' },
  { m: 'Keyword stuffing', fix: 'LinkedIn search does use keywords but stuffing reads robotic to humans. Place 5 to 7 keywords naturally across the section.' },
  { m: 'Leaving it empty or default', fix: 'An empty About section is the single biggest reason recruiters skip a profile. Even 2 tight paragraphs beat none.' },
  { m: 'Writing one long paragraph', fix: 'Line-breaks and short paragraphs. The mobile reader scans; a wall of text is skipped.' },
];

const TOC = [
  { id: 'intro', label: 'Why the About section matters' },
  { id: 'formula', label: 'The 5-beat formula' },
  { id: 'length', label: 'How long it should be' },
  { id: 'examples', label: '6 worked examples by stage / role' },
  { id: 'keywords', label: 'Keywords: what LinkedIn search actually indexes' },
  { id: 'mistakes', label: '7 mistakes that kill the About section' },
  { id: 'refresh', label: 'How often to refresh it' },
  { id: 'refs', label: 'External references' },
  { id: 'faq', label: 'FAQ' },
];

const RELATED = [
  { title: 'LinkedIn URL on Resume', slug: 'linkedin-url-on-resume', excerpt: 'Custom URL format + what to include.', read: 6 },
  { title: 'Resume Summary Examples', slug: 'resume-summary-examples', excerpt: 'Weak and strong pairs by career stage + industry.', read: 14 },
  { title: 'Tell Me About Yourself: 10 Examples', slug: 'tell-me-about-yourself', excerpt: '3-part present-past-future formula.', read: 13 },
  { title: 'Cover Letter vs Resume', slug: 'cover-letter-vs-resume', excerpt: 'When each applies and how they pair.', read: 7 },
  { title: 'Action Verbs for Resumes', slug: 'resume-action-verbs', excerpt: '120 strong verbs + 40 to avoid.', read: 9 },
];

export default function LinkedinAboutSectionPage() {
  const { openGateway } = useLoginGateway();

  return (
    <BlogPostLayout
      category="LinkedIn & Personal Brand"
      breadcrumbCurrent="LinkedIn About section"
      title="LinkedIn About Section: The Full Template (2026)"
      subtitle="A 5-beat formula (Hook, Proof, Angle, Looking for, CTA), 6 worked examples from fresher to executive, and the 7 mistakes that make your About section invisible to recruiter search."
      dateModified="2026-08-16"
      readingTime={12}
      toc={TOC}
      related={RELATED}
    >
      <section id="intro" className="scroll-mt-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-5 mb-8">
          <p className="font-semibold text-indigo-900 mb-2">Why this section is the most read on your profile</p>
          <p className="text-gray-700">
            The About section is the 2,600-character pitch that sits above your experience. Recruiters read it more carefully than any single job bullet because it tells them what you think is worth highlighting. Done right, it pulls the right recruiters into your inbox and gently closes the door on mismatched ones. Done wrong, it reads like a corporate paragraph from 2015 and recruiters bounce in under 4 seconds.
          </p>
        </div>
        <p>
          Most candidates either leave About blank, paste a warped version of their resume summary, or fill it with adjectives (passionate, results-driven, dynamic) that every other candidate also uses. LinkedIn search does index this field, so empty is a mistake. But adjectives are invisible; they do not move you up in recruiter search and they do not make a human reader pause.
        </p>
        <p className="mt-3">
          The template below follows a 5-beat structure that every strong About section shares. Hook, Proof, Angle, Looking for, CTA. It works for freshers and CXOs. It is built for the mobile reader who is going to see the first 300 characters and decide whether to tap Read more.
        </p>
      </section>

      <section id="formula" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">The 5-beat formula</h2>
        <div className="space-y-4">
          {FORMULA.map((f, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <p className="font-semibold text-gray-900 mb-2"><span className="text-indigo-600 mr-2">{i + 1}.</span>{f.beat}</p>
              <p className="text-sm text-gray-700">{f.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="length" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How long it should be</h2>
        <p className="mb-3"><strong>Target: 1,200 to 1,800 characters.</strong> LinkedIn allows 2,600 but filling the whole field with text is almost always a mistake. Short-and-specific beats long-and-vague.</p>
        <p className="mb-3"><strong>The fold is at 300 characters.</strong> On mobile, only the first 300 characters show before Read more. Make those 300 characters the single most interesting thing about you. If the reader does not tap, nothing else matters.</p>
        <p>Use line-breaks generously. The About section renders whitespace, so use paragraph breaks and even bullet-like dashes to make the section scannable. Walls of text lose the mobile reader.</p>
      </section>

      <section id="examples" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">6 worked examples by stage / role</h2>
        <p className="mb-5 text-sm text-gray-700">Each is a complete About section. Copy the structure, replace the specifics.</p>
        <div className="space-y-5">
          {EXAMPLES.map((ex, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-3">{ex.role}</p>
              <pre className="bg-gray-50 rounded p-4 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed font-sans">{ex.text}</pre>
            </div>
          ))}
        </div>
      </section>

      <section id="keywords" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Keywords: what LinkedIn search actually indexes</h2>
        <p className="mb-3">LinkedIn recruiter search matches on the headline, About, current role title, current role description, skills, and last 2 previous roles. About is weighted lower than headline and current role, but it is still indexed. That means the right keywords placed naturally in About do move you up in search results.</p>
        <p className="mb-3"><strong>Find your keywords:</strong> open 10 JDs for your target role. Note the words that appear in at least 6 of them. Those are the words recruiters type into search filters. Weave 5 to 7 of them into your About section in full sentences.</p>
        <p><strong>Do not keyword-stuff.</strong> A section that reads passionate Python developer skilled in Python and Python Django Python scores well in search and loses every human reader. Keywords belong inside sentences, not in a pile.</p>
      </section>

      <section id="mistakes" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">7 mistakes that kill the About section</h2>
        <ul className="space-y-3">
          {MISTAKES.map((m, i) => (
            <li key={i} className="border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-1">{m.m}</p>
              <p className="text-sm text-gray-700">{m.fix}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="refresh" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How often to refresh it</h2>
        <p className="mb-3"><strong>Every 6 months at minimum.</strong> Even if nothing major changed, update one number, one phrase, and the Looking for line. LinkedIn treats any edit as an activity signal and freshens your appearance in search feeds.</p>
        <p className="mb-3"><strong>Always after a job change.</strong> Obvious, but surprisingly skipped. Update the About section on day 1, not 6 weeks in.</p>
        <p><strong>Always after a major win or talk or publication.</strong> Add it to Proof. Recency wins attention.</p>
      </section>

      <section id="refs" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">External references</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
          <li><a href="https://business.linkedin.com/talent-solutions/resources/talent-acquisition/recruiter" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">LinkedIn Talent Solutions: Recruiter search guide</a> for how recruiters actually filter profiles.</li>
          <li><a href="https://www.linkedin.com/help/linkedin/answer/a507353" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">LinkedIn Help: About section fundamentals</a>, the official field constraints and character limits.</li>
          <li><a href="https://www.themuse.com/advice/the-best-linkedin-summary-examples-weve-ever-seen" rel="nofollow noopener noreferrer" target="_blank" className="text-indigo-600 underline">The Muse on strong LinkedIn summaries</a> with additional worked examples.</li>
        </ul>
      </section>

      <section id="faq" className="mt-12 scroll-mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Should I write the About section in first or third person?', a: 'First person. LinkedIn is a personal profile. Third person reads like a corporate brochure and is less trusted by hiring managers.' },
            { q: 'How long should the About section be?', a: '1,200 to 1,800 characters. You have 2,600 to work with, but short-and-specific almost always beats long-and-vague. First 300 characters matter most because of the mobile fold.' },
            { q: 'Is the About section important for job search?', a: 'Very. It is indexed by LinkedIn recruiter search and is the field hiring managers read most carefully after the headline. Empty About sections are one of the fastest reasons a profile gets skipped.' },
            { q: 'What do I write if I am a fresher with no work experience?', a: 'Lead with projects that have real users or real stars, then coursework signals (top 5 percent, scholarship, TA). Close with the specific role you are looking for and a way to contact you.' },
            { q: 'Should I include salary or compensation expectations?', a: 'No. The About section is for value, not price. Compensation comes up once the recruiter reaches out.' },
            { q: 'Can I include emojis or special characters?', a: 'Sparingly. One well-placed arrow or bullet-dash to break up lines is fine. A field full of decorative emojis undermines seniority signals.' },
            { q: 'Should I mention that I am open to work?', a: 'Yes, directly in the last paragraph. Specific roles, locations, and stage. Also flip the Open to Work toggle on, which is a separate signal recruiters filter on.' },
            { q: 'How often should I update the About section?', a: 'Every 6 months minimum. Always after a job change, a major win, or a publication. Edits are activity signals on LinkedIn.' },
          ].map((item, i) => (
            <details key={i} className="border border-gray-200 rounded-lg group">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 list-none flex items-center justify-between">{item.q}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
              <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Your resume should match the About section promise</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">Once your About section says what you do, your resume has to deliver the proof. Build an ATS-ready resume in 10 minutes that mirrors your LinkedIn pitch.</p>
        <button onClick={() => openGateway('/builder')} className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-6 py-3 text-sm font-bold transition-colors">Start building free</button>
      </section>
    </BlogPostLayout>
  );
}
