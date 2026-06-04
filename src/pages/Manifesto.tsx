import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles, Building2, Quote, ArrowUpRight } from 'lucide-react';

export default function Manifesto() {
  return (
    <div className="pb-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* SECTION 1: HERO */}
      <section className="pt-8 md:pt-12 pb-16 md:pb-24 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-[#2563eb] tracking-[0.25em] uppercase block mb-3">
          THE MANIFESTO
        </span>
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6"
        >
          Sourcing is easy.<br />Conviction is hard.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-base sm:text-lg text-slate-500 leading-relaxed font-normal mb-12"
        >
          Why traditional hiring processes produce bad outcomes for volume roles, and why we decided to build Jovese.
        </motion.p>
        <motion.div
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="w-full h-48 md:h-80 rounded-[2.5rem] overflow-hidden relative shadow-lg mx-auto"
        >
          <img 
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80" 
            alt="Office strategy and planning" 
            className="w-full h-full object-cover grayscale-[20%]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </section>

      {/* SECTION 2: CORE DOCUMENT */}
      <section className="space-y-16 md:space-y-24 bg-white rounded-[2.5rem] p-8 sm:p-16 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        
        {/* Chapter 1 */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="text-xs font-bold text-[#2563eb] uppercase tracking-widest block mb-1">
              CHAPTER 01
            </span>
            <h2 className="font-display text-xl md:text-2xl font-black text-slate-900">
              The CV and the Voice.
            </h2>
          </div>
          <div className="md:col-span-8 text-slate-500 text-xs sm:text-sm font-normal leading-relaxed space-y-4">
            <p>
              A document is a search-index of keywords compiled to tell you what a candidate wanted you to see. It is silent on whether they speak clearly, how they compose themselves under friction, or if they sound like someone your client would feel reassured listening to.
            </p>
            <p className="text-slate-900 font-bold">
              In volume voice channels, the document is an obsolete abstraction. Yet millions of recruiters prioritize it above tone.
            </p>
          </div>
        </div>

        <div className="h-px bg-slate-100" />

        {/* Chapter 2 */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="text-xs font-bold text-[#2563eb] uppercase tracking-widest block mb-1">
              CHAPTER 02
            </span>
            <h2 className="font-display text-xl md:text-2xl font-black text-slate-900">
              Sourcing vs Sifting.
            </h2>
          </div>
          <div className="md:col-span-8 text-slate-500 text-xs sm:text-sm font-normal leading-relaxed space-y-4">
            <p>
              Most agencies flood your inbox with raw volumes. They believe curation is your job, and that sending 100 profiles for 3 vacancies increases their mathematical chance of a fee.
            </p>
            <p className="text-slate-900 font-bold">
              In contrast, Jovese screens and filters out 75 to 80% of applicants before they reach you. We do not do your sifting; we deliver your shortlist.
            </p>
          </div>
        </div>

        <div className="h-px bg-slate-100" />

        {/* Chapter 3 */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="text-xs font-bold text-[#2563eb] uppercase tracking-widest block mb-1">
              CHAPTER 03
            </span>
            <h2 className="font-display text-xl md:text-2xl font-black text-slate-900">
              Alignment, not transactional speed.
            </h2>
          </div>
          <div className="md:col-span-8 text-slate-500 text-xs sm:text-sm font-normal leading-relaxed space-y-4">
            <p>
              We reject upfront onboarding retainers and search fees. Our model operates solely on Day 30 survival. This focuses our efforts on placements that endure, rather than transactional headcount changes.
            </p>
            <p className="text-slate-900 font-bold">
              True alignment is when our outcome mirrors yours.
            </p>
            <p className="border-t border-slate-100 pt-4 mt-2">
              This is not a problem exclusive to BPO floors and call centres. Mid-tier IT companies face the same failure: agencies send CVs, candidates join, candidates leave, agencies invoice again. The incentive structure is identical and equally broken. Jovese works the same way regardless of the sector. We only get paid when the hire stays.
            </p>
          </div>
        </div>

      </section>

      {/* SECTION 3: ABOUT US */}
      <section className="mt-20 bg-slate-900 rounded-[3rem] text-white p-8 sm:p-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-3xl">
          <span className="text-xs font-bold text-blue-400 tracking-widest uppercase block mb-3">
            ABOUT JOVESE
          </span>
          <h2 className="font-display text-3xl font-black mb-6">
            About Jovese.
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
            Founded in Hyderabad, Jovese was built to solve the frontline attrition crisis in India's volume hiring sector. Our team combines experiences across scale operations, HR technology, and telecalling management. We believe that by screening candidates for actual, measurable job delivery parameters instead of obsolete academic qualifications or generic resumes, we create high-retention teams for our corporate partners while respecting the dignity and time of candidate voices.
          </p>
        </div>
      </section>

    </div>
  );
}
