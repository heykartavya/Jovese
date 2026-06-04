import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Play, FileText, CalendarCheck, FileCheck, DollarSign, Copy, Check } from 'lucide-react';

export default function ClientsSubmitted() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('https://jovese.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      num: "Step 1",
      title: "Review Call",
      desc: "A 20-minute review call to confirm the brief, salary benchmarks, and your onboarding setup.",
      icon: <CalendarCheck className="w-5 h-5 text-indigo-500" />
    },
    {
      num: "Step 2",
      title: "Partnership Agreement",
      desc: "Signed partnership agreement. One page, plain English.",
      icon: <FileText className="w-5 h-5 text-indigo-500" />
    },
    {
      num: "Step 3",
      title: "Active Brief Opened",
      desc: "Active brief opened. First shortlist within 48 hours.",
      icon: <Play className="w-5 h-5 text-[#2563eb]" />
    },
    {
      num: "Step 4",
      title: "Candidate Selected",
      desc: "Candidate selected, joining confirmed, Day 1 begins.",
      icon: <FileCheck className="w-5 h-5 text-emerald-500" />
    },
    {
      num: "Step 5",
      title: "Day 30 Invoice",
      desc: "Day 30 invoice sent. Not a single rupee before that.",
      icon: <DollarSign className="w-5 h-5 text-emerald-500" />
    }
  ];

  return (
    <div className="pb-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
          Your audit has been submitted.
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          We review applications every Monday. If your requirements align with our current capacity, someone from our team will reach out on the work email you provided within 2 business days of the review.
        </p>
      </motion.div>

      {/* Steps Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-white mb-12"
      >
        <h2 className="text-xl font-bold text-slate-900 mb-8 text-center uppercase tracking-wider">
          The Partnership Process
        </h2>
        
        <div className="grid gap-6 md:grid-cols-5">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center md:items-start text-center md:text-left bg-slate-50 p-5 rounded-2xl border border-slate-100/80">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">
                {step.num}
              </span>
              <h3 className="font-bold text-slate-900 mb-2 text-sm">
                {step.title}
              </h3>
              <p className="text-xs text-slate-400 leading-normal">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Share Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-indigo-50 border border-indigo-100 rounded-[2rem] p-8 md:p-10 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 blur-[80px] pointer-events-none rounded-full" />
        <div className="relative z-10 text-center md:text-left">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Know someone else bleeding revenue?</h3>
          <p className="text-slate-600 text-sm">
            If a peer at another firm is struggling with volume hiring attrition, share Jovese with them.
          </p>
        </div>
        <div className="relative z-10 flex w-full md:w-auto">
          <button 
            onClick={handleCopy}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold px-6 py-3.5 rounded-xl shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Website Link
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Manifesto Redirect */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <Link 
          to="/about" 
          className="inline-flex items-center gap-2 text-slate-700 hover:text-[#2563eb] font-medium transition-all group"
        >
          While you wait, read why we built Jovese
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}
