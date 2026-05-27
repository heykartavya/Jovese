import { motion } from 'motion/react';
import { Play, Mic, AlertTriangle, TrendingDown, Clock, Building, Headset, Briefcase, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
  const [activeAudio, setActiveAudio] = useState<number | null>(null);

  const pitches = [
    { id: 1, role: "Outbound Sales Executive", duration: "0:32", highlight: "120% Target Achiever", image: "https://i.pravatar.cc/150?img=11" },
    { id: 2, role: "Insurance Unit Manager", duration: "0:28", highlight: "Managed Team of 15", image: "https://i.pravatar.cc/150?img=32" },
    { id: 3, role: "BPO Team Leader", duration: "0:41", highlight: "Reduced Shrink by 18%", image: "https://i.pravatar.cc/150?img=12" },
  ];

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-24 md:pb-32">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center mt-4 md:mt-12">
          
          {/* Floating elements resembling the video */}
          <motion.div 
             animate={{ y: [0, -10, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="hidden lg:flex absolute top-10 left-20 w-16 h-16 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] items-center justify-center border border-slate-50">
             <Mic className="w-8 h-8 text-indigo-500" />
          </motion.div>
          <motion.div 
             animate={{ y: [0, 10, 0] }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="hidden lg:flex absolute top-40 right-24 w-14 h-14 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-1 border border-slate-50">
             <img src="https://i.pravatar.cc/150?img=47" alt="Talent" className="w-full h-full rounded-full object-cover" />
          </motion.div>
          <motion.div 
             animate={{ y: [0, -15, 0] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
             className="hidden lg:flex absolute bottom-2 left-32 w-16 h-16 bg-orange-50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] items-center justify-center text-[#ff5a36] border border-white">
             <div className="font-bold text-lg">30d</div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl text-slate-900"
          >
            Stop replacing your frontline and sales staff every 90 days.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-500 max-w-3xl mb-10 leading-relaxed font-medium"
          >
            Precision volume hiring for telecalling, sales, BPO, front office, and hospitality operations. We screen for reliability and communication. You only pay when they survive their first 30 days.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 items-center mb-8"
          >
            <Link
              to="/clients"
              className="px-8 py-4 rounded-full bg-[#ff5a36] hover:bg-[#ff451d] text-white text-lg font-medium transition-all shadow-[0_4px_14px_0_rgba(255,90,54,0.39)]"
            >
              Apply for Client Partnership
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Waitlist Mechanic */}
      <section className="py-16">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-12 border border-slate-100">
            <div className="max-w-md text-center md:text-left">
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-slate-900 mb-4">Partnership Status</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                Due to our rigorous vetting process, we strictly limit active clientele. 
                Our capacity is capped to maintain an uncompromised 30-day survival guarantee.
              </p>
            </div>
            
            <div className="flex gap-8 sm:gap-14 w-full md:w-auto items-center justify-center">
              <div className="flex flex-col text-center md:text-left">
                <div className="text-5xl sm:text-6xl font-display font-extrabold text-slate-900 mb-2 tracking-tight">14</div>
                <div className="text-sm font-bold text-slate-400 tracking-widest uppercase">Active Partners</div>
              </div>
              
              <div className="w-px h-16 bg-slate-200 hidden sm:block"></div>
              
              <div className="flex flex-col text-center md:text-left">
                <div className="text-5xl sm:text-6xl font-display font-extrabold text-slate-900 mb-2 tracking-tight">42</div>
                <div className="text-sm font-bold text-[#ff5a36] tracking-widest uppercase">Waitlist</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Cost of Attrition */}
      <section className="py-24 bg-slate-900 text-white rounded-[3rem] shadow-2xl mx-4 sm:mx-6 lg:mx-8 mb-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff5a36] rounded-full blur-[150px] opacity-10" />
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-4">
              The True Cost of a Bad Hire
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
              Every time a telecaller or front desk executive quits in week two, you lose more than just a headcount. You lose training hours, operational momentum, and revenue.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-2xl flex items-center justify-center mb-6">
                   <TrendingDown className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-extrabold mb-2 font-display">₹45,000+</h3>
                <p className="text-slate-400 font-medium">Average sunk cost per failed entry-level hire in lost training and lost productivity.</p>
             </div>
             
             <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mb-6">
                   <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-extrabold mb-2 font-display">14 Days</h3>
                <p className="text-slate-400 font-medium">Wasted time from the HR team sourcing, interviewing, and replacing churned candidates.</p>
             </div>

             <div className="bg-[#ff5a36]/10 border border-[#ff5a36]/20 rounded-[2rem] p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#ff5a36] text-white rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,90,54,0.4)]">
                   <AlertTriangle className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-extrabold mb-2 font-display text-[#ff5a36]">The Jovese Fix</h3>
                <p className="text-slate-300 font-medium">We filter for survival. If our candidate drops out before 30 days, we absorb 100% of the cost.</p>
             </div>
          </div>
        </div>
      </section>

      {/* The Audio Advantage - Bento / Card Style */}
      <section className="py-24 bg-white mt-8 rounded-[3rem] shadow-[0_-10px_40px_rgb(0,0,0,0.02)]">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              The Audio Advantage
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Explain exactly why resumes fail for volume roles. Let the HR director hear the clarity and pitch delivery of a telecaller or front desk executive before they scroll further.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {pitches.map((pitch, idx) => (
              <motion.div
                key={pitch.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#f8f9fa] rounded-[2rem] p-6 border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all cursor-pointer group flex flex-col"
                onClick={() => setActiveAudio(activeAudio === pitch.id ? null : pitch.id)}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm border border-white">
                    <img src={pitch.image} alt="Avatar" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                    activeAudio === pitch.id ? 'bg-[#ff5a36] text-white' : 'bg-white text-slate-900 border border-slate-200'
                  }`}>
                    {activeAudio === pitch.id ? (
                      <div className="flex gap-1 items-end h-4">
                        <span className="w-1 bg-white rounded-full animate-[bounce_0.5s_infinite_alternate]" style={{ height: '40%' }} />
                        <span className="w-1 bg-white rounded-full animate-[bounce_0.5s_infinite_alternate]" style={{ height: '100%', animationDelay: '0.1s' }} />
                        <span className="w-1 bg-white rounded-full animate-[bounce_0.5s_infinite_alternate]" style={{ height: '60%', animationDelay: '0.2s' }} />
                      </div>
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" />
                    )}
                  </div>
                </div>

                <div className="space-y-1 flex-grow">
                  <h4 className="font-display font-bold text-slate-900 text-lg leading-tight">{pitch.role}</h4>
                  <div className="text-orange-500 font-medium text-sm">
                    {pitch.highlight}
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-200/60 flex justify-between items-center text-sm font-medium text-slate-400">
                  <span className="flex items-center gap-1.5"><Mic className="w-4 h-4"/> Voice Pitch</span>
                  <span>{pitch.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-16 border-t border-slate-100 text-center">
             <h3 className="font-display text-3xl font-bold text-slate-900 mb-10">Domains We Dominate</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center">
                   <Headset className="w-8 h-8 text-indigo-500 mb-4" />
                   <h4 className="font-bold text-slate-900 mb-1">Telecalling</h4>
                   <p className="text-xs text-slate-500">Outbound & Inbound</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center">
                   <Building className="w-8 h-8 text-emerald-500 mb-4" />
                   <h4 className="font-bold text-slate-900 mb-1">BPO Ops</h4>
                   <p className="text-xs text-slate-500">Customer Success</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center">
                   <Briefcase className="w-8 h-8 text-[#ff5a36] mb-4" />
                   <h4 className="font-bold text-slate-900 mb-1">Sales</h4>
                   <p className="text-xs text-slate-500">Field & Inside Sales</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center">
                   <GraduationCap className="w-8 h-8 text-amber-500 mb-4" />
                   <h4 className="font-bold text-slate-900 mb-1">Front Office</h4>
                   <p className="text-xs text-slate-500">Hospitality & Reception</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* The 30 Day Guarantee */}
      <section className="py-24 bg-slate-50 mt-8 rounded-[3rem] shadow-inner mb-8">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              The 30 Day Guarantee
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Our model is built on shared risk. You do not pay a single rupee upfront. We only invoice if the candidate survives their first 30 days of operations.
            </p>
          </div>

          <div className="relative">
             {/* Line connector */}
             <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 hidden md:block rounded-full"></div>
             
             <div className="grid md:grid-cols-4 gap-8 relative z-10">
                
                {/* Day 0 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center relative group">
                   <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 mb-4 group-hover:bg-[#ff5a36] group-hover:text-white transition-colors">D0</div>
                   <h4 className="font-bold text-slate-900 mb-2">Requirement</h4>
                   <p className="text-sm text-slate-500">You submit the scope and hiring audit.</p>
                </div>

                {/* Day 1 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center relative group">
                   <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 mb-4 group-hover:bg-[#ff5a36] group-hover:text-white transition-colors">D1</div>
                   <h4 className="font-bold text-slate-900 mb-2">Joining</h4>
                   <p className="text-sm text-slate-500">Verified talent deploys to your floor.</p>
                </div>

                {/* Day 15 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center relative group">
                   <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 mb-4 group-hover:bg-[#ff5a36] group-hover:text-white transition-colors">D15</div>
                   <h4 className="font-bold text-slate-900 mb-2">Midpoint Check</h4>
                   <p className="text-sm text-slate-500">We monitor performance and attendance.</p>
                </div>

                {/* Day 30 */}
                <div className="bg-[#ff5a36] p-6 rounded-2xl shadow-md border border-[#ff451d] flex flex-col items-center text-center relative transform md:scale-110">
                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-[#ff5a36] mb-4">D30</div>
                   <h4 className="font-bold text-white mb-2">Invoicing</h4>
                   <p className="text-sm text-[#ffebdd]">Candidate survives. We bill our fee.</p>
                </div>

             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
