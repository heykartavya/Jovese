import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      q: "What happens if the candidate leaves before Day 30?",
      a: "We replace them at no additional charge. The clock resets to Day 1 with the replacement candidate. The only exception is documented misconduct by the employer: non-payment of agreed salary, physical altercation, or verbal abuse with supporting documentation."
    },
    {
      q: "Do you charge for shortlisting or sending profiles?",
      a: "No. There is no charge for sourcing, screening, or shortlisting. Our entire fee is triggered by one event: the candidate completing 30 days in the role."
    },
    {
      q: "What is your fee structure?",
      a: "We charge a percentage of the candidate's first-month CTC, invoiced on Day 30. The exact percentage depends on role category and volume. This is discussed during your partnership review call after the audit form is submitted."
    },
    {
      q: "How quickly can you fill a role?",
      a: "Most shortlists go out within 18 to 48 hours of receiving a confirmed brief. Actual deployment depends on the candidate's notice period and availability, which we communicate in every profile we send."
    },
    {
      q: "What roles do you not cover?",
      a: "We do not place senior management, engineering, product, or finance roles. We focus exclusively on high-volume frontline and voice roles where communication screening has the highest impact."
    },
    {
      q: "Do you help candidates negotiate salary?",
      a: "No. We collect their expectation during the automated intake. If it mismatches your budget, we do not send the profile. We do not negotiate on behalf of either party."
    },
    {
      q: "Why do you use voice notes instead of resumes?",
      a: "Because a resume cannot talk. For customer-facing roles, a 90-second audio clip tells us more about a candidate's suitability than a perfectly formatted CV. We screen for communication baseline, tone, and logic."
    }
  ];

  return (
    <div className="pt-24 pb-16 bg-white min-h-screen">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-8 md:mb-16">
          <span className="font-display text-xs font-bold tracking-[0.2em] text-[#2563eb] uppercase mb-4 block">
            FAQ
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Everything you need to know about our sourcing, screening, and placement model.
          </p>
        </div>

        <div className="space-y-4 mb-16">
          {faqData.map((faq, idx) => {
            const index = idx + 1;
            const isOpen = openFaq === index;
            return (
              <div 
                key={idx} 
                className="bg-slate-50 rounded-2xl border border-slate-100/80 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center bg-white font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-slate-400 flex-shrink-0 ml-4">
                    {isOpen ? <ChevronDown className="w-5 h-5 transform rotate-180 transition-transform" /> : <ChevronDown className="w-5 h-5 transition-transform" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-5 text-xs sm:text-sm text-slate-500 font-normal leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        
        {/* CTA */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#2563eb]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 text-center md:text-left mb-8 md:mb-0">
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
              Still have questions?
            </h2>
            <p className="text-slate-400 font-normal text-sm sm:text-base">
              Get in touch to align on your hiring needs.
            </p>
          </div>
          
          <div className="relative z-10 w-full md:w-auto flex-shrink-0">
            <Link
              to="/clients"
              className="relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-slate-900 font-bold transition-all shadow-[0_8px_30px_rgb(255,255,255,0.15)] hover:shadow-[0_8px_40px_rgb(255,255,255,0.2)] hover:-translate-y-0.5 group text-sm"
            >
              <span className="relative z-10">Start Hiring</span>
              <div className="absolute inset-0 bg-slate-50 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
