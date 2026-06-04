import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  MessageSquare, 
  Mic, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  AlertCircle, 
  QrCode, 
  ShieldAlert,
  ArrowRight,
  Sparkle
} from 'lucide-react';

export default function Talent() {
  const [activeRoles, setActiveRoles] = useState(944);

  useEffect(() => {
    const interval = setInterval(() => {
      const isBusinessHours = new Date().getHours() >= 9 && new Date().getHours() <= 18;
      if (isBusinessHours && Math.random() > 0.5) {
        setActiveRoles(prev => prev + Math.floor(Math.random() * 3));
      }
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      num: "01",
      title: "Tap the WhatsApp link or scan the QR code",
      desc: "Our bot walks you through the application. You will be asked your current or most recent role, your target role, your city, and your joining availability. This takes about 3 minutes."
    },
    {
      num: "02",
      title: "Record your 45-second introduction",
      desc: "The bot gives you a scenario prompt based on the role you applied for. For example: \"A customer calls in upset about a billing error. Walk us through your first 30 seconds.\" There is no script. We want your actual approach, not a prepared answer. Speak naturally."
    },
    {
      num: "03",
      title: "Get matched or get feedback",
      desc: "If your communication clears our screening threshold, we match you to open roles at our client companies within 24 to 72 hours. If it does not, we send you a voice note explaining what to improve. You can reapply after 7 days."
    }
  ];

  const criteria = [
    {
      title: "Clarity",
      means: "The listener understands you without effort. You speak in complete sentences. You do not trail off.",
      notMeans: "Having a particular accent or speaking in English. We screen in Hindi and regional languages too.",
      color: "bg-indigo-55/60 border-indigo-100"
    },
    {
      title: "Composure",
      means: "You do not fill pauses with filler words every few seconds. You sound calm, not rushed.",
      notMeans: "Being robotic or over-formal. Natural composure is what we want.",
      color: "bg-blue-55/60 border-blue-100"
    },
    {
      title: "Relevance",
      means: "Your answer is about the scenario we gave you, not a prepared speech about your resume.",
      notMeans: "Memorizing a script. We can tell immediately when someone is reading.",
      color: "bg-emerald-55/60 border-emerald-100"
    },
    {
      title: "Professionalism",
      means: "You sound like someone a company would trust to speak to their customers.",
      notMeans: "Fancy vocabulary or formal language. Professional means reliable and grounded.",
      color: "bg-amber-55/60 border-amber-100"
    }
  ];

  return (
    <div className="pb-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pb-24 text-center max-w-4xl mx-auto">
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-indigo-50/40 to-transparent pointer-events-none" />
        <div className="flex items-center justify-center gap-3 mb-6 relative z-10">
          <span className="inline-block px-3 py-1 bg-white border border-indigo-100 text-xs font-bold text-indigo-500 tracking-[0.2em] rounded-full shadow-sm uppercase">
            For Job Seekers
          </span>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full font-bold text-xs text-emerald-600 shadow-sm animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {activeRoles} Active Roles
          </div>
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 relative z-10"
        >
          No resume upload. No black hole.<br />Just your voice.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-base sm:text-lg text-slate-500 mb-8 leading-relaxed font-normal"
        >
          Most job applications go into a system that a recruiter opens when they have time. Your voice note goes directly into an active screening queue. If you communicate clearly, you get matched to a company within 24 to 72 hours.
        </motion.p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
          <a
            href="#apply-block"
            className="w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white font-bold rounded-full transition-all shadow-[0_8px_30px_rgba(37,211,102,0.25)] flex items-center justify-center gap-2 text-base hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(37,211,102,0.4)]"
          >
            Apply via WhatsApp
          </a>
          <button
            onClick={() => {
              document.getElementById('criteria-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-4 bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-800 font-bold rounded-full shadow-sm transition-all flex items-center justify-center gap-2 text-base hover:-translate-y-0.5"
          >
            See what we look for
          </button>
        </div>
      </section>

      {/* SECTION 2: THE PROCESS */}
      <section className="py-16 border-t border-slate-100">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-indigo-500 tracking-widest uppercase block mb-3">
            HOW IT WORKS
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-extrabold text-slate-900">
            Three steps to deployment
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
              <div>
                <span className="font-display font-black text-indigo-500/10 text-6xl absolute top-6 right-6 opacity-30">{step.num}</span>
                <div className="w-12 h-12 bg-[#2563eb]/10 text-[#2563eb] font-black font-display rounded-2xl flex items-center justify-center mb-6 text-lg">
                  {step.num}
                </div>
                <h3 className="font-bold text-slate-950 font-display text-base mb-3 leading-tight">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: WHAT WE EVALUATE */}
      <section id="criteria-section" className="py-20 bg-slate-50 rounded-[3rem] p-6 sm:p-14 mb-20 border border-slate-100/60 scroll-mt-24">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-indigo-500 tracking-widest uppercase block mb-3">
            THE FOUR CRITERIA
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-extrabold text-slate-900 mb-6">
            We care about four things. Not five.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {criteria.map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <span className="text-[#2563eb] text-xs font-bold uppercase tracking-wider block mb-4">
                Criteria 0{i+1}: {item.title}
              </span>
              
              <div className="space-y-4">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    What it means:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 font-normal leading-relaxed">
                    {item.means}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-50">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    What it does NOT mean:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
                    {item.notMeans}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: ROLES AVAILABLE & SAFETY DISCLAIMER */}
      <section className="py-16 border-t border-slate-100 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-indigo-500 tracking-widest uppercase block mb-3">
            WHAT WE PLACE
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
            Six primary categories.
          </h2>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_8px_40px_rgb(0,0,0,0.06)] p-6 sm:p-10 mb-12 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none" />
          <div className="grid sm:grid-cols-2 gap-4 relative z-10">
            {[
              "Telecalling and Telesales",
              "Inside Sales and Business Development",
              "Customer Support (Voice)",
              "Front Office and Reception",
              "Hotel and Hospitality Operations",
              "IT Helpdesk (L1 and L2 Support)"
            ].map((role, idx) => (
              <div key={idx} className="flex items-center gap-3 py-2 bg-slate-50 px-4 rounded-xl border border-slate-100 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>{role}</span>
              </div>
            ))}
          </div>
          
          <p className="text-center text-xs text-slate-400 font-normal mt-6">
            Roles available across Hyderabad, Gurgaon, Delhi NCR, Bangalore, Mumbai, and Chennai. New cities added as client volume grows.
          </p>
        </div>

        {/* CANDIDATE SAFETY DISCLAIMER - EXTREMELY VISIBLE */}
        <div className="bg-red-50 border border-red-200/60 rounded-2xl p-6 flex gap-4 items-center">
          <ShieldAlert className="w-8 h-8 text-red-500 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-red-950 font-display text-sm uppercase tracking-wide mb-1">
              Safety Warning: Jovese is 100% Free
            </h4>
            <p className="text-red-800 text-xs sm:text-sm font-normal leading-relaxed">
              Jovese does not charge candidates any fee at any stage. Application is free. Placement is free. If anyone asks you for money claiming to be from Jovese, that is a scam.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHATSAPP CTA BLOCK */}
      <section id="apply-block" className="mt-12 bg-slate-900 rounded-[3rem] text-white p-8 sm:p-14 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#25D366]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* QR Code Graphic Mockup */}
          <div className="hidden md:flex md:col-span-4 justify-center">
            <div className="bg-white p-4 rounded-3xl shadow-lg border-4 border-slate-700/60 inline-block">
              <svg 
                className="w-48 h-48 sm:w-56 sm:h-56 text-slate-900" 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlLang="en"
              >
                {/* Visual SVG QR representation */}
                <rect x="5" y="5" width="25" height="25" fill="currentColor" />
                <rect x="10" y="10" width="15" height="15" fill="white" />
                <rect x="13" y="13" width="9" height="9" fill="currentColor" />
                
                <rect x="70" y="5" width="25" height="25" fill="currentColor" />
                <rect x="75" y="10" width="15" height="15" fill="white" />
                <rect x="78" y="13" width="9" height="9" fill="currentColor" />

                <rect x="5" y="70" width="25" height="25" fill="currentColor" />
                <rect x="10" y="75" width="15" height="15" fill="white" />
                <rect x="13" y="78" width="9" height="9" fill="currentColor" />

                {/* Random matrix points for QR styling details */}
                <rect x="40" y="15" width="5" height="5" fill="currentColor" />
                <rect x="50" y="5" width="10" height="5" fill="currentColor" />
                <rect x="45" y="25" width="5" height="10" fill="currentColor" />
                <rect x="60" y="20" width="5" height="5" fill="currentColor" />
                
                <rect x="35" y="40" width="15" height="5" fill="currentColor" />
                <rect x="40" y="50" width="5" height="10" fill="currentColor" />
                <rect x="55" y="45" width="10" height="5" fill="currentColor" />
                <rect x="65" y="35" width="5" height="15" fill="currentColor" />

                <rect x="75" y="55" width="10" height="5" fill="currentColor" />
                <rect x="85" y="45" width="5" height="10" fill="currentColor" />
                <rect x="70" y="65" width="15" height="5" fill="currentColor" />
                <rect x="80" y="75" width="5" height="15" fill="currentColor" />
                
                <rect x="45" y="70" width="5" height="10" fill="currentColor" />
                <rect x="35" y="80" width="15" height="5" fill="currentColor" />
                <rect x="55" y="85" width="10" height="5" fill="currentColor" />

                {/* Centered WhatsApp icon element inside QR code */}
                <rect x="42" y="42" width="16" height="16" rx="4" fill="#25D366" />
                <circle cx="50" cy="50" r="4" fill="white" />
              </svg>
            </div>
          </div>

          {/* Right Text / CTA Details */}
          <div className="md:col-span-8 space-y-6">
            <span className="text-xs font-bold text-[#25D366] tracking-widest uppercase block">
              LAUNCH INTAKE
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to apply?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Tap the link or scan the code. Works on Android and iPhone. No account creation needed. The bot opens instantly. 3 minutes to complete.
            </p>
            
            <div className="pt-2">
              <a 
                href="https://wa.me/919999999999?text=Hi%20Jovese,%20I'm%20interested%2520in%2520applying!" 
                target="_blank" 
                referrerPolicy="no-referrer"
                className="inline-flex relative overflow-hidden items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-bold rounded-2xl transition-all shadow-[0_8px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)] hover:-translate-y-0.5 text-base sm:text-lg group"
              >
                <span className="relative z-10">wa.me/partnerships-jovese</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </a>
            </div>

            <p className="text-[10px] text-slate-400 font-semibold italic border-t border-slate-800 pt-4">
              You will receive a response within 72 hours. If you do not hear back in that time, your voice note did not clear our screening threshold. You will receive a separate message with specific feedback.
            </p>
          </div>

        </div>
      </section>

      {/* FLOATING ACTION BUTTON (MOBILE ONLY) */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <a 
          href="https://wa.me/919999999999?text=Hi%20Jovese,%20I'm%20interested%2520in%2520applying!" 
          target="_blank" 
          referrerPolicy="no-referrer"
          className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95 transition-transform"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" />
          </svg>
        </a>
      </div>

    </div>
  );
}
