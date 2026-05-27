import { motion } from 'motion/react';
import { Target, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Clients() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="py-16 md:py-24 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6"
        >
          For Clients
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto"
        >
          We only partner with companies that offer market rate salaries and have transparent onboarding processes.
        </motion.p>
      </section>

      {/* Rules & Criteria - Bento style */}
      <section className="grid md:grid-cols-2 gap-6 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-lg text-white"
        >
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/5">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4">The Scope</h3>
          <p className="text-slate-400 mb-8 max-w-sm font-medium">Clearly defined operational domains for precision matching.</p>
          
          <ul className="grid grid-cols-2 gap-4">
            {["Telecalling", "Sales", "BPO", "Front Office", "Hotel Operations", "Entry Level IT"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-100 font-medium">
                <CheckCircle2 className="w-5 h-5 text-orange-400" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
        >
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">The Criteria</h3>
          <p className="text-slate-500 mb-6">We maintain strict standards for our corporate partners.</p>
          <ul className="space-y-4">
            {["Offer Market Rate Salaries", "Transparent Onboarding Process", "Humane Interview Scheduling"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* Audit Form Section */}
      <section className="bg-white rounded-[3rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 max-w-4xl mx-auto text-slate-900">
        <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">Hiring Audit</h2>
        <p className="text-slate-500 text-center mb-12">Submit your challenge and join the waitlist.</p>

        {submitted ? (
          <div className="flex flex-col items-center justify-center text-center py-12">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Audit Submitted</h3>
            <p className="text-slate-500">You are on the waitlist. We will review your requisition soon.</p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Company Name</label>
              <input type="text" required placeholder="Ex: Acme Corp" className="w-full bg-[#f8f9fa] border border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#ff5a36] outline-none text-slate-900 transition-shadow" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Current 90 Day Attrition Rate</label>
                <select required className="w-full bg-[#f8f9fa] border border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#ff5a36] outline-none text-slate-900 appearance-none">
                  <option value="" disabled selected>Select an estimate</option>
                  <option value="low">Under 15%</option>
                  <option value="medium">15% - 30%</option>
                  <option value="high">Over 30%</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Hardest Role to Fill</label>
                <input type="text" required placeholder="Ex: Telesales Agent" className="w-full bg-[#f8f9fa] border border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#ff5a36] outline-none text-slate-900 transition-shadow" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Why are your current vendors failing?</label>
              <textarea required rows={4} className="w-full bg-[#f8f9fa] border border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#ff5a36] outline-none text-slate-900 transition-shadow resize-none" placeholder="Explain the pain point..." />
            </div>
            <button className="w-full bg-[#ff5a36] hover:bg-[#ff451d] text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 mt-4 shadow-[0_4px_14px_0_rgba(255,90,54,0.39)] group">
              Submit Audit and Join Waitlist
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
