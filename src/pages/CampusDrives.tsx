import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CampusDrives() {
  return (
    <div className="pt-24 pb-16 bg-white min-h-screen">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        id="campus-drives" className="py-16 md:py-24 bg-white">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 md:mb-16">
            <span className="font-display text-xs font-bold tracking-[0.2em] text-[#2387a9] uppercase mb-4 block">
              CAMPUS PLACEMENT DRIVES
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900 leading-[1.1] max-w-3xl">
              Your next 20 hires are already in a classroom. They just haven't been screened yet.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24">
            <div className="space-y-6">
              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-normal">
                Standard campus drives waste everyone's time. A company sends a team to a college. Two hundred students sit in a hall. The company interviews all day and makes fifteen offers. Ten join. Three are gone by Month 2.
              </p>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-normal">
                Jovese runs it differently. Before your team visits a campus, we video-screen every interested candidate using the same evaluation method we use for all placements. You only meet candidates who have already cleared our communication threshold. We handle college identification, logistics, pre-screening, and post-joining follow-up. You show up and hire.
              </p>
              <div className="mt-0 pt-0">
                <Link
                  to="/clients"
                  className="inline-flex items-center gap-2 text-[#2387a9] pl-0 ml-0 font-bold hover:translate-x-1 transition-transform group text-sm md:text-base"
                >
                  Plan a Campus Drive
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-colors" />
                </Link>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="pb-[28px] border-b border-slate-100">
                <h4 className="font-bold text-slate-900 text-base md:text-lg mb-2">Pre-Screened Candidates Only</h4>
                <p className="text-slate-500 font-normal text-[14px] leading-[26px] -mr-[3px]">
                  Every student is video-screened before you arrive. No time wasted on candidates who cannot communicate for the role.
                </p>
              </div>
              
              <div className="py-[28px] border-b border-slate-100">
                <h4 className="font-bold text-slate-900 text-base md:text-lg mb-2">Tier 2 & Tier 3 Colleges</h4>
                <p className="text-slate-500 font-normal text-[14px] leading-[26px] pr-0 -mr-[3px]">
                  We have working relationships with engineering and management colleges across India with strong placement records.
                </p>
              </div>
              
              <div className="pt-[28px]">
                <h4 className="font-bold text-slate-900 text-base md:text-lg mb-2">Same Day 30 Fee Model</h4>
                <p className="text-slate-500 font-normal text-[14px] -mr-[3px]">
                  You pay a flat coordination fee per drive and a per-placement fee only when the candidate completes 30 days. No placement, no charge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
