'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, CheckCircle2, Sparkles, Target } from 'lucide-react';
import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';
import { useLoginGateway } from '@/components/LoginGateway';

const STEPS = [
  {
    title: '1. Identify your transferable skills',
    body: 'Career changers underestimate how much carries over. Project management, stakeholder communication, data analysis, budgeting, mentorship — almost all of these transfer. Make a list of 10 skills from your old role and rate which ones the new role needs.',
  },
  {
    title: '2. Pick a functional or hybrid format',
    body: 'For traditional career changes, a chronological resume highlights the wrong things. Use a hybrid format: skills section at the top, then experience. This puts your transferable skills in front of the recruiter before they see your unrelated job titles.',
  },
  {
    title: '3. Rewrite the summary as a bridge',
    body: 'Your summary is the bridge from "what I did" to "what I want to do next." Example: "Marketing manager with 7 years driving B2B demand gen, transitioning into product management. Strong customer empathy, data-driven decision making, and 2 years of side-project shipping experience."',
  },
  {
    title: '4. Translate every bullet into the new domain',
    body: 'Strip out industry jargon from the old field. "Closed $2M ARR pipeline" becomes "Identified customer needs and shipped solutions worth $2M in measurable value." The work was the same; the language meets the new audience.',
  },
  {
    title: '5. Show evidence of the new direction',
    body: 'Recruiters need proof you are serious. Side projects, certifications, courses, freelance work, volunteer roles, blog posts — anything that demonstrates you have already started moving toward the new field. List these in a "Relevant Projects" section above experience.',
  },
];

const PIVOTS = [
  { from: 'Marketing', to: 'Product Management', overlap: 'Customer research, A/B testing, GTM strategy, copywriting' },
  { from: 'Sales', to: 'Customer Success', overlap: 'Stakeholder management, retention, expansion, account planning' },
  { from: 'Finance', to: 'Operations', overlap: 'Process improvement, financial modeling, vendor management, reporting' },
  { from: 'Software Engineer', to: 'Product Manager', overlap: 'Technical architecture, sprint planning, user stories, requirements writing' },
  { from: 'Teacher', to: 'L&D / Corporate Training', overlap: 'Curriculum design, public speaking, learner engagement, content development' },
  { from: 'Customer Support', to: 'UX Research', overlap: 'User empathy, qualitative interviewing, pain-point synthesis, journey mapping' },
];

export default function ResumeForCareerChangePage() {
  const { openGateway } = useLoginGateway();

  useEffect(() => {
    document.title = 'Resume for Career Change 2026 - 5-Step Pivot Guide | ResumeForge';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'How to write a resume for a career change. 5-step pivot framework, transferable-skills rewriting, and 6 common pivot examples. ATS-friendly templates. Updated 2026.'
      );
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute(
        'content',
        'How to write a resume for a career change. 5-step pivot framework, transferable-skills rewriting, real examples.'
      );
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Resume for Career Change 2026 - 5-Step Pivot Guide | ResumeForge');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNavbar />

      <section className="bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-blue-500/10 text-blue-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6 animate-fade-in">
            <Compass className="inline-block h-3.5 w-3.5 mr-1 -mt-0.5" /> Career Pivot
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in-up">
            Resume for Career Change: The 5-Step Pivot Guide
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto animate-fade-in-up delay-100">
            According to Pew Research, the average professional changes careers 5 to 7 times in their working life. Here is exactly how to translate your past experience into a resume that lands interviews in a new field.
          </p>
        </div>
      </section>

      <main className="flex-1 bg-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <section>
            <p className="text-gray-700 leading-relaxed text-lg">
              The hardest part of a career change is not the new skills. It is rewriting your past so the new field sees you as a credible candidate, not as someone who is just starting over. The framework below has been used by thousands of pivoters from marketing to PM, sales to CS, finance to ops, and engineering to product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">The 5-Step Pivot Framework</h2>
            <div className="space-y-5">
              {STEPS.map((step, i) => (
                <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 border border-blue-100">
            <div className="flex items-center gap-2 mb-5">
              <Target className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">6 common pivots and what transfers</h2>
            </div>
            <div className="space-y-3">
              {PIVOTS.map((p, i) => (
                <div key={i} className="bg-white rounded-lg p-4 border border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-gray-900">{p.from}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-blue-500" />
                    <span className="text-sm font-semibold text-blue-700">{p.to}</span>
                  </div>
                  <p className="text-xs text-gray-600">Transferable: {p.overlap}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Sample career-change summary</h2>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-700 italic">
                &quot;Customer success manager with 6 years scaling onboarding for B2B SaaS clients ($45M ARR portfolio). Now transitioning into product management, with 18 months of side experience shipping internal tools and running customer discovery interviews. Strong skills in stakeholder communication, prioritization, and data-driven decision making. Looking for an Associate PM role at a customer-obsessed product team.&quot;
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-3">Notice how it owns both halves: real credibility from the old role, real evidence of effort toward the new one.</p>
          </section>

          <section className="text-center py-8">
            <Sparkles className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Build your pivot resume in 30 minutes</h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Free to start. 20 templates. Hybrid layouts that put transferable skills first.
            </p>
            <button
              onClick={() => openGateway('/builder')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition"
            >
              Start My Resume <ArrowRight className="h-4 w-4" />
            </button>
          </section>

          <section className="border-t border-gray-100 pt-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Related guides</h3>
            <div className="grid sm:grid-cols-2 gap-2 text-sm">
              <Link href="/resume-after-career-gap" className="text-blue-600 hover:underline">→ Resume after a career gap</Link>
              <Link href="/resume-after-layoff" className="text-blue-600 hover:underline">→ Resume after a layoff</Link>
              <Link href="/resume-tips" className="text-blue-600 hover:underline">→ Resume tips that work</Link>
              <Link href="/ats-guide" className="text-blue-600 hover:underline">→ Complete ATS guide</Link>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
