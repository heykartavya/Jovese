import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Mic, 
  AlertTriangle, 
  Clock, 
  Building, 
  Headset, 
  Briefcase, 
  ArrowRight, 
  ChevronDown, 
  CheckCircle2, 
  ChevronRight,
  TrendingDown,
  Volume2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CountUp from '../components/CountUp';

export default function Home() {
  // Bleed Calculator state
  const [quarterlyHires, setQuarterlyHires] = useState<string>('');
  const [ctc, setCtc] = useState<string>('');
  const [attritionRate, setAttritionRate] = useState<number>(35);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [calculatedOutputs, setCalculatedOutputs] = useState<{
    monthlyLoss: number;
    annualTrainingWasted: number;
    agencyFeesWasted: number;
    annualSaving: number;
  }>({ monthlyLoss: 0, annualTrainingWasted: 0, agencyFeesWasted: 0, annualSaving: 0 });

  // Custom Audio State
  const [audioObjects, setAudioObjects] = useState<{ [id: number]: HTMLAudioElement | null }>({});
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [progress, setProgress] = useState<{ [id: number]: number }>({ 1: 0, 2: 0, 3: 0 });
  const [currentTime, setCurrentTime] = useState<{ [id: number]: number }>({ 1: 0, 2: 0, 3: 0 });
  
  const sampleAudios = {
    1: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    2: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  };

  const playAudio = (id: number) => {
    if (playingId === id) {
      audioObjects[id]?.pause();
      setPlayingId(null);
      return;
    }

    if (playingId && audioObjects[playingId]) {
      audioObjects[playingId]?.pause();
    }

    let audio = audioObjects[id];
    if (!audio) {
      audio = new Audio(sampleAudios[id as 1 | 2 | 3]);
      
      audio.addEventListener('timeupdate', () => {
        if (audio) {
          setProgress(prev => ({
            ...prev,
            [id]: (audio.currentTime / audio.duration) * 100 || 0
          }));
          setCurrentTime(prev => ({
            ...prev,
            [id]: audio.currentTime || 0
          }));
        }
      });

      audio.addEventListener('ended', () => {
        setPlayingId(null);
        setProgress(prev => ({ ...prev, [id]: 0 }));
        setCurrentTime(prev => ({ ...prev, [id]: 0 }));
      });

      setAudioObjects(prev => ({ ...prev, [id]: audio }));
    }

    audio.play().catch(err => console.log('Audio playback error:', err));
    setPlayingId(id);
  };

  // Clean up audios on unmount
  useEffect(() => {
    return () => {
      Object.values(audioObjects).forEach((audio: any) => {
        if (audio) audio.pause();
      });
    };
  }, [audioObjects]);

  // Clean url hashes and smooth scroll
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, []);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quarterlyHires || !ctc) return;

    const hiresVal = parseFloat(quarterlyHires);
    const ctcVal = parseFloat(ctc);
    const attritionFraction = attritionRate / 100;

    // Formulas as requested
    // Monthly Loss: (quarterly hires divided by 3) * attrition rate * (CTC * 1.5) * (average days vacant / 30) -- vacant is 18 days
    const monthlyLoss = (hiresVal / 3) * attritionFraction * (ctcVal * 1.5) * (18 / 30);
    
    // Annual attrition exits: (quarterly hires * 4) * attrition fraction
    const annualExits = (hiresVal * 4) * attritionFraction;

    // Annual Training Spend Wasted: Annual exits * (CTC * 0.8)
    const annualTrainingWasted = annualExits * (ctcVal * 0.8);

    // Agency Fees Paid: Annual exits * (CTC * 1.5 * 8.33%)
    const agencyFeesWasted = annualExits * (ctcVal * 1.5 * 0.0833);

    // Estimated Savings: Sum of (monthlyLoss * 12) + Training wasted + Agency fees wasted * 0.65
    const annualSaving = (monthlyLoss * 12 + annualTrainingWasted + agencyFeesWasted) * 0.65;

    setCalculatedOutputs({
      monthlyLoss,
      annualTrainingWasted,
      agencyFeesWasted,
      annualSaving
    });
    setIsCalculated(true);
  };

  // FAQ Accordion State
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
      q: "Do you work with startups or only large companies?",
      a: "We work with any company that meets our requirements: market-rate compensation, a documented onboarding process, and recurring volume needs. Team size matters less than your commitment to the model."
    },
    {
      q: "Are you only in Hyderabad and Gurgaon?",
      a: "Our operations teams are based there, but we source and deploy candidates across Hyderabad, Gurgaon, Delhi NCR, Bangalore, Mumbai, and Chennai. Confirm your city in the audit form."
    },
    {
      q: "Can I speak to a current client before signing up?",
      a: "Yes. Once your audit form is reviewed and we confirm a fit, we can connect you with a relevant partner who has agreed to take reference calls. This happens after the review, not before."
    }
  ];

  // Helper for Indian formatting
  const formatINRValue = (val: number) => {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="pb-24">
      
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pb-32 bg-gradient-to-b from-slate-50/50 to-white">
        {/* Subtle decorative gloss */}
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-indigo-50/40 to-transparent pointer-events-none" />
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-50/40 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid md:grid-cols-12 gap-12 items-center mt-4 md:mt-12">
          
          {/* Left Hero Content */}
          <div className="md:col-span-7 text-left">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Stop replacing your sales team every 90 days.
            </h1>
            <p className="text-sm sm:text-base text-slate-500 mb-10 leading-relaxed font-medium max-w-xl">
              Jovese screens and deploys frontline talent for telecalling, inside sales, BPO, front office, and hospitality operations. You see profiles in 48 hours. You pay nothing until the hire survives Day 30.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <Link
                to="/clients"
                className="relative overflow-hidden px-8 py-4 rounded-full bg-slate-900 text-white font-semibold text-center transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-0.5 group text-sm md:text-base border border-slate-800"
              >
                <span className="relative z-10">Apply for Client Partnership</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </Link>
              <a
                href="#method"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('method')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-4 rounded-full border border-slate-200/80 bg-white/60 backdrop-blur-md hover:bg-slate-50 text-slate-700 font-semibold text-center transition-all text-sm md:text-base hover:-translate-y-0.5 shadow-sm"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* Right Hero - Animated Stats Block */}
          <div className="md:col-span-5 grid gap-5">
            
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex items-center gap-6 group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all"
            >
              <div className="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Mic className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-slate-900 font-display">
                  <CountUp end={847} />
                </div>
                <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
                  CANDIDATES SCREENED THIS MONTH
                </div>
                <div className="text-[10px] text-slate-400">Updated weekly</div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex items-center gap-6 group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all"
            >
              <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-slate-900 font-display">
                  <CountUp end={94} suffix="%" />
                </div>
                <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
                  30-DAY RETENTION RATE
                </div>
                <div className="text-[10px] text-slate-400">Across all placed candidates in the last 6 months</div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex items-center gap-6 group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all"
            >
              <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-slate-900 font-display">
                  <CountUp end={48} suffix="h" />
                </div>
                <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
                  AVERAGE PROFILE DELIVERY TIME
                </div>
                <div className="text-[10px] text-slate-400">From brief received to shortlist delivered</div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* TRUST STRIP BELOW THE HERO */}
        <div className="w-full mt-16 md:mt-24 border-y border-slate-100 py-6 bg-slate-50/50 overflow-hidden relative">
          {/* Fading Edges */}
          <div className="absolute inset-y-0 left-0 w-8 sm:w-32 bg-gradient-to-r from-slate-50 z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-8 sm:w-32 bg-gradient-to-l from-slate-50 z-10 pointer-events-none"></div>
          
          <motion.div 
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 sm:gap-16 px-6 sm:px-8 text-[11px] sm:text-sm text-slate-400 font-medium tracking-wide whitespace-nowrap">
                <span className="flex items-center">Hyderabad-based NBFC <span className="text-slate-300 mx-3">|</span> 40-seat floor</span>
                <span className="flex items-center">Delhi NCR hospitality <span className="text-slate-300 mx-3">|</span> 3 properties</span>
                <span className="flex items-center">Bangalore SaaS <span className="text-slate-300 mx-3">|</span> 25 inside sales reps</span>
                <span className="flex items-center">Mumbai BPO <span className="text-slate-300 mx-3">|</span> 100-seat night shift</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: WAITLIST MECHANIC */}
      <section className="py-20 bg-white">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            
            <div className="md:col-span-7">
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                Partnership spots are deliberately limited.
              </h2>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium mb-6">
                We do not onboard clients faster than we can staff them well. When we accept a new partner, we commit screening capacity to their specific roles. If we stretched that across 80 clients, we would become the thing we set out to replace.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed font-medium mb-6">
                Right now we manage a controlled number of active partnerships. When capacity opens, we reach into the waitlist in order of submission.
              </p>
              <p className="text-sm font-semibold text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 inline-block mb-6">
                New applications are reviewed every Monday. If your requirements match current capacity, you will hear from us within 48 hours of the review.
              </p>
              <div>
                <Link 
                  to="/clients" 
                  className="inline-flex items-center gap-2 font-bold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
                >
                  Submit your audit to join the queue <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="md:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
              
              {/* Stat card left */}
              <div className="bg-gradient-to-b from-white to-slate-50 rounded-[2rem] p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                <div>
                  <div className="text-5xl sm:text-6xl font-display font-black text-slate-900 mb-3 tracking-tight">
                    <CountUp end={23} />
                  </div>
                  <div className="font-bold text-slate-800 text-base mb-1">Active Corporate Partners</div>
                  <div className="text-xs text-slate-400 font-medium">Across Hyderabad and Gurgaon</div>
                </div>
              </div>

              {/* Stat card right */}
              <div className="bg-gradient-to-b from-white to-slate-50 rounded-[2rem] p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                <div>
                  <div className="text-5xl sm:text-6xl font-display font-black text-[#2563eb] mb-3 tracking-tight">
                    <CountUp end={8} />
                  </div>
                  <div className="font-bold text-slate-800 text-base mb-1">Applications Under Review</div>
                  <div className="text-xs text-slate-400 font-medium">Next review window: Monday</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: THE FLEED (id="bleed") */}
      <section id="bleed" className="py-24 bg-white text-slate-900 rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 mb-12 overflow-hidden relative border border-slate-100 shadow-[0_8px_40px_rgb(0,0,0,0.04)]">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563eb]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900 leading-[1.1]">
              Your empty seats are not a hiring problem.<br />They are a revenue leak.
            </h2>
            <div className="text-slate-600 max-w-3xl mx-auto space-y-6 text-sm md:text-base leading-relaxed font-medium">
              <p>
                Most HR teams track cost-per-hire. Almost nobody tracks the cost of the 18 days it takes to replace someone who quit on Day 12. The lost output. The manager hours spent re-interviewing. The training investment that walked out the door. The agency that invoiced you anyway.
              </p>
              <p>
                Traditional staffing agencies have no incentive to solve this. They invoice the moment someone joins. Whether that person is still there in 30 days is not their problem. It is yours.
              </p>
              <p className="text-slate-900 font-bold bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm mt-8 relative overflow-hidden">
                <span className="absolute -left-4 -top-4 w-16 h-16 rounded-full bg-[#2563eb] blur-xl opacity-10 pointer-events-none"></span>
                We designed Jovese around the opposite model. Our fee triggers on Day 30. Our incentive is your retention, not your headcount churn.
              </p>
            </div>
          </div>

          {/* THE BLEED CALCULATOR */}
          <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-12 max-w-4xl mx-auto mb-16 relative shadow-[0_20px_60px_rgb(0,0,0,0.06)] overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] pointer-events-none" />
            
            <h3 className="font-display text-center font-bold text-sm tracking-widest text-slate-400 mb-8 uppercase relative z-10">
              Calculate Your Monthly Bleed
            </h3>

            <form onSubmit={handleCalculate} className="grid md:grid-cols-3 gap-6 items-end relative z-10">
              
              {/* Field 1 */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500">Frontline roles you hire per quarter</label>
                <input 
                  type="number"
                  inputMode="numeric"
                  required
                  value={quarterlyHires}
                  onChange={(e) => {
                    setQuarterlyHires(e.target.value);
                    setIsCalculated(false);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-900 transition-all font-semibold"
                  placeholder="e.g. 12"
                />
              </div>

              {/* Field 2 */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 block">
                  Average monthly CTC per role (₹)
                </label>
                <input 
                  type="number"
                  inputMode="numeric"
                  required
                  value={ctc}
                  onChange={(e) => {
                    setCtc(e.target.value);
                    setIsCalculated(false);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-900 transition-all font-semibold"
                  placeholder="e.g. 25000"
                />
                <span className="text-[10px] text-slate-400 block mt-1 font-medium">Salary only, not total package</span>
              </div>

              {/* Field 3 */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                  <span>30-day attrition rate (%)</span>
                  <span className="text-[#2563eb] text-sm">{attritionRate}%</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="80"
                  value={attritionRate}
                  onChange={(e) => {
                    setAttritionRate(parseInt(e.target.value));
                    setIsCalculated(false);
                  }}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2563eb]"
                />
                <span className="text-[10px] text-slate-400 block text-right font-medium">Industry average: 30 to 45%</span>
              </div>

            </form>

            <div className="mt-8 text-center relative z-10">
              <button
                type="button"
                onClick={handleCalculate}
                disabled={!quarterlyHires || !ctc}
                className="w-full sm:w-auto relative overflow-hidden px-10 py-4 bg-slate-900 text-white font-bold rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-sm sm:text-base group"
              >
                <span className="relative z-10">Calculate My Bleed</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
            </div>

            {/* Calculated Output Block */}
            <AnimatePresence>
              {isCalculated && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-12 pt-8 border-t border-slate-100 overflow-hidden relative z-10"
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    
                    {/* Card 1 */}
                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl relative overflow-hidden group hover:shadow-md transition-shadow">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200/50 rounded-full blur-[40px] pointer-events-none group-hover:bg-[#2563eb]/10 transition-colors" />
                      <div className="text-xs text-slate-500 uppercase font-bold tracking-wide mb-1 relative z-10">
                        Monthly Revenue Loss From Empty Seats
                      </div>
                      <div className="text-2xl font-black text-slate-900 font-display relative z-10">
                        {formatINRValue(calculatedOutputs.monthlyLoss)}
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl relative overflow-hidden group hover:shadow-md transition-shadow">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200/50 rounded-full blur-[40px] pointer-events-none group-hover:bg-[#2563eb]/10 transition-colors" />
                      <div className="text-xs text-slate-500 uppercase font-bold tracking-wide mb-1 relative z-10">
                        Annual Training Spend Wasted on Early Exits
                      </div>
                      <div className="text-2xl font-black text-slate-900 font-display relative z-10">
                        {formatINRValue(calculatedOutputs.annualTrainingWasted)}
                      </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl relative overflow-hidden group hover:shadow-md transition-shadow">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200/50 rounded-full blur-[40px] pointer-events-none group-hover:bg-[#2563eb]/10 transition-colors" />
                      <div className="text-xs text-slate-500 uppercase font-bold tracking-wide mb-1 relative z-10">
                        Agency Fees Paid for Hires Who Left
                      </div>
                      <div className="text-2xl font-black text-slate-900 font-display relative z-10">
                        {formatINRValue(calculatedOutputs.agencyFeesWasted)}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 font-medium relative z-10">Assumes standard 8.33% placement fee</div>
                    </div>

                    {/* Card 4 - highlighted savings */}
                    <div className="bg-[#2563eb]/5 border border-[#2563eb]/20 p-6 rounded-2xl relative overflow-hidden group hover:shadow-md transition-shadow">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/5 to-transparent pointer-events-none" />
                      <div className="text-xs text-[#2563eb] uppercase font-extrabold tracking-wide mb-1 relative z-10">
                        Estimated Annual Saving with Jovese Model
                      </div>
                      <div className="text-3xl font-black text-[#2563eb] font-display relative z-10">
                        {formatINRValue(calculatedOutputs.annualSaving)}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1 font-medium relative z-10">Based on historical 30-day retention outcomes</div>
                    </div>

                  </div>

                  <div className="mt-8 text-center text-xs text-slate-500">
                    <p className="mb-4 font-medium">These are estimates based on industry averages. Your audit form gives us your actual numbers so we can give you a precise analysis.</p>
                    <Link 
                      to="/clients"
                      className="inline-flex items-center gap-2 text-indigo-500 hover:text-indigo-600 font-bold justify-center transition-colors"
                    >
                      Submit Your Audit for a Real Analysis <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Three-column comparison below the calculator */}
          <div className="grid md:grid-cols-11 gap-4 items-stretch max-w-5xl mx-auto">
            
            {/* Trad model */}
            <div className="md:col-span-5 bg-slate-50 border border-slate-100 p-8 rounded-[2rem] shadow-sm">
              <h4 className="text-lg font-bold text-slate-900 font-display mb-6">Traditional Agency Model</h4>
              <ul className="space-y-4 text-sm text-slate-600 font-medium">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 text-lg leading-none select-none mt-0.5">•</span>
                  <span>Invoiced on joining day</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 text-lg leading-none select-none mt-0.5">•</span>
                  <span>No accountability after Day 1</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 text-lg leading-none select-none mt-0.5">•</span>
                  <span>Same candidate sent to 10 clients</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 text-lg leading-none select-none mt-0.5">•</span>
                  <span>Profit increases when you keep rehiring</span>
                </li>
              </ul>
            </div>

            {/* VS divider */}
            <div className="md:col-span-1 flex items-center justify-center font-display font-black text-2xl text-slate-300 py-4 md:py-0 select-none">
              VS
            </div>

            {/* Jovese model */}
            <div className="md:col-span-5 bg-indigo-50/50 border border-indigo-100 p-8 rounded-[2rem] shadow-sm">
              <h4 className="text-lg font-bold text-indigo-600 font-display mb-6">Jovese Model</h4>
              <ul className="space-y-4 text-sm text-slate-700 font-medium">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-500 text-lg leading-none select-none mt-0.5">•</span>
                  <span>Invoiced on Day 30 only</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-500 text-lg leading-none select-none mt-0.5">•</span>
                  <span>Free replacement if hire exits before Day 30</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-500 text-lg leading-none select-none mt-0.5">•</span>
                  <span>Profiles curated per your specific brief</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-500 text-lg leading-none select-none mt-0.5">•</span>
                  <span className="font-bold text-slate-900">We profit only when attrition stops</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: THE AUDIO ADVANTAGE */}
      <section className="py-24 bg-white mt-8 rounded-[3rem]">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-6">
                A resume tells you where they worked.<br />
                <span className="text-slate-400">A voice tells you if they can sell.</span>
              </h2>
            </div>
            
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-indigo-500/5 rounded-full blur-[40px] pointer-events-none" />
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed relative z-10">
                For customer-facing roles, the CV is just a formality. The candidates who close deals are the ones who listen before speaking and handle rejection without collapsing. You can't screen for that in a document. <strong className="text-slate-900">We screen for it in a 45-second audio drop.</strong>
              </p>
            </div>
          </div>

          {/* Innovative Audio Cards Grid */}
          <div className="grid md:grid-cols-12 gap-6 mb-12">
            
            {/* Card 1 */}
            <div className="md:col-span-4 bg-slate-50 border border-slate-100 rounded-[2rem] p-6 shadow-sm flex flex-col justify-between group hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="mb-6 flex justify-between items-start">
                <div>
                  <span className="inline-block px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full font-bold text-[10px] uppercase tracking-wider mb-2">Telecalling</span>
                  <p className="text-xs text-slate-500 font-semibold">1.2 Yrs • Hyderabad</p>
                </div>
                <button onClick={() => playAudio(1)} className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform shadow-md">
                  {playingId === 1 ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                </button>
              </div>
              <div>
                <div className="h-6 flex items-center gap-1 mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1 bg-indigo-200 rounded-full animate-pulse" style={{ height: `${Math.max(20, Math.random() * 100)}%`, animationDelay: `${i * 0.1}s` }} />
                  ))}
                  <div className="flex-1 ml-2">
                    <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full transition-all duration-300" style={{ width: `${progress[1]}%` }} />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  "Clear diction. Handled the objection without filler words. No rehearsed feel."
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="md:col-span-4 bg-slate-50 border border-slate-100 rounded-[2rem] p-6 shadow-sm flex flex-col justify-between group hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="mb-6 flex justify-between items-start">
                <div>
                  <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full font-bold text-[10px] uppercase tracking-wider mb-2">Inside Sales</span>
                  <p className="text-xs text-slate-500 font-semibold">2.0 Yrs • Gurgaon</p>
                </div>
                <button onClick={() => playAudio(2)} className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform shadow-md">
                  {playingId === 2 ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                </button>
              </div>
              <div>
                <div className="h-6 flex items-center gap-1 mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1 bg-blue-200 rounded-full animate-pulse" style={{ height: `${Math.max(20, Math.random() * 100)}%`, animationDelay: `${i * 0.1}s` }} />
                  ))}
                  <div className="flex-1 ml-2">
                    <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full transition-all duration-300" style={{ width: `${progress[2]}%` }} />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  "Natural warmth. Closed the intro with a question, not a statement."
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="md:col-span-4 bg-slate-50 border border-slate-100 rounded-[2rem] p-6 shadow-sm flex flex-col justify-between group hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="mb-6 flex justify-between items-start">
                <div>
                  <span className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full font-bold text-[10px] uppercase tracking-wider mb-2">Front Office</span>
                  <p className="text-xs text-slate-500 font-semibold">Fresher • Hyderabad</p>
                </div>
                <button onClick={() => playAudio(3)} className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform shadow-md">
                  {playingId === 3 ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                </button>
              </div>
              <div>
                <div className="h-6 flex items-center gap-1 mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1 bg-emerald-200 rounded-full animate-pulse" style={{ height: `${Math.max(20, Math.random() * 100)}%`, animationDelay: `${i * 0.1}s` }} />
                  ))}
                  <div className="flex-1 ml-2">
                    <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: `${progress[3]}%` }} />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  "Composed under difficult scenario prompt. Strong first impression."
                </p>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between bg-white border border-slate-200/60 p-4 sm:p-6 rounded-[2rem] max-w-3xl mx-auto shadow-sm">
            <p className="text-sm text-slate-600 font-semibold mb-4 sm:mb-0">Every forwarded candidate meets this standard.</p>
            <Link
              to="/clients"
              className="relative overflow-hidden px-6 py-2.5 rounded-full bg-slate-900 text-white font-semibold transition-all shadow-md hover:-translate-y-0.5 group text-sm"
            >
              <span className="relative z-10">Select Your Candidates</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: THE DEPLOYMENT PIPELINE (id="method") */}
      <section id="method" className="py-24 bg-slate-50 rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 mb-12 border border-slate-100/60 shadow-inner">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Vetted talent in 48 hours. Here is exactly how.
            </h2>
          </div>

          {/* Classy Vertical Stacked List */}
          <div className="max-w-4xl mx-auto space-y-4 relative mb-16">
            
            {/* Phase 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative flex flex-col sm:flex-row gap-6 sm:gap-8 items-start group hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center relative z-10 group-hover:bg-[#2563eb]/5 group-hover:border-[#2563eb]/20 transition-colors">
                <span className="font-display font-black text-slate-300 text-3xl group-hover:text-[#2563eb] transition-colors">01</span>
              </div>
              <div className="flex-1 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <h3 className="font-bold text-slate-900 text-xl tracking-tight">WhatsApp Ingestion</h3>
                </div>
                <p className="text-slate-800 font-semibold text-sm mb-3">
                  Candidates bypass broken career pages entirely.
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Our automated WhatsApp workflow collects role preference, availability, city, and a 45-second voice note. The intake takes under 4 minutes. We receive structured data from every applicant, not an unreadable PDF.
                </p>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative flex flex-col sm:flex-row gap-6 sm:gap-8 items-start group hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center relative z-10 group-hover:bg-[#2563eb]/5 group-hover:border-[#2563eb]/20 transition-colors">
                <span className="font-display font-black text-slate-300 text-3xl group-hover:text-[#2563eb] transition-colors">02</span>
              </div>
              <div className="flex-1 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <h3 className="font-bold text-slate-900 text-xl tracking-tight">Tone and Logic Audit</h3>
                </div>
                <p className="text-slate-800 font-semibold text-sm mb-3">
                  70 to 80% of applicants are filtered here before a human reviews anything.
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Our screening workflow evaluates every voice note across four parameters: clarity, grammar, professional tone, and scenario handling. Applications that do not meet our threshold are discarded at this stage. We tell the candidate why and invite them to retry after 7 days.
                </p>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative flex flex-col sm:flex-row gap-6 sm:gap-8 items-start group hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center relative z-10 group-hover:bg-[#2563eb]/5 group-hover:border-[#2563eb]/20 transition-colors">
                <span className="font-display font-black text-slate-300 text-3xl group-hover:text-[#2563eb] transition-colors">03</span>
              </div>
              <div className="flex-1 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <h3 className="font-bold text-slate-900 text-xl tracking-tight">The Match</h3>
                </div>
                <p className="text-slate-800 font-semibold text-sm mb-3">
                  You receive curated profiles. Not a volume dump.
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Our team matches cleared candidates against your active brief, availability window, and compensation range. You receive 3 to 8 profiles per role, each with the original voice note attached, a written assessment, and expected joining date.
                </p>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative flex flex-col sm:flex-row gap-6 sm:gap-8 items-start group hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex items-center justify-center relative z-10">
                <span className="font-display font-black text-emerald-500 text-3xl">04</span>
              </div>
              <div className="flex-1 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <h3 className="font-bold text-slate-950 text-xl tracking-tight">Deployment</h3>
                </div>
                <p className="text-slate-800 font-semibold text-sm mb-3">
                  The candidate joins. The 30-day clock starts. Nothing else happens until then.
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Once the candidate confirms joining, you get a confirmation from us. That is Day 1. We follow up on Day 7, Day 14, and Day 28. If anything is wrong in that window, we fix it before Day 30 ever arrives.
                </p>
              </div>
            </div>

          </div>

          {/* Three Summary Stats */}
          <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-slate-200 text-center">
            
            <div>
              <div className="text-4xl font-black text-slate-900 font-display">18h</div>
              <div className="text-sm font-semibold text-slate-500 mt-1">Average time from brief to profiles delivered</div>
            </div>

            <div>
              <div className="text-4xl font-black text-slate-900 font-display">78%</div>
              <div className="text-sm font-semibold text-slate-500 mt-1">Clients select from the first shortlist sent</div>
            </div>

            <div>
              <div className="text-4xl font-black text-[#2563eb] font-display">Zero</div>
              <div className="text-sm font-semibold text-slate-500 mt-1">Upfront cost to start</div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: THE 30-DAY GUARANTEE */}
      <section className="py-24 bg-white">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              You are not paying for introductions.<br />You are paying for outcomes.
            </h2>
          </div>

          {/* Timeline Node map */}
          <div className="relative mb-20 bg-slate-50 border border-slate-100 p-8 sm:p-10 rounded-[2rem] shadow-sm overflow-hidden group">
            {/* Animated subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-200/50 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#2563eb]/5 transition-colors duration-1000" />
            
            <div className="relative max-w-5xl mx-auto mt-4">
              {/* Connecting Line - Desktop */}
              <div className="hidden sm:block absolute top-[22px] left-[7%] right-[7%] h-0.5 bg-slate-200">
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-slate-300 via-[#2563eb] to-emerald-500 w-0 group-hover:w-full transition-all duration-[1500ms] ease-out rounded-full" />
              </div>
              
              {/* Connecting Line - Mobile */}
              <div className="sm:hidden absolute left-[22px] top-6 bottom-6 w-0.5 bg-slate-200">
                <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-slate-300 via-[#2563eb] to-emerald-500 h-0 group-hover:h-full transition-all duration-[1500ms] ease-out rounded-full" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-7 gap-y-6 sm:gap-y-0 sm:gap-x-2 relative z-10">
                
                {/* Node 1 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-0 group/node">
                  <div className="w-12 h-12 sm:w-11 sm:h-11 bg-white border-2 border-slate-200 text-slate-500 font-bold text-[10px] sm:text-xs rounded-full flex items-center justify-center sm:mb-4 shadow-sm z-10 transition-all group-hover/node:border-slate-400 group-hover/node:text-slate-800">
                    Day 0
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-xs mb-0.5">Brief Received</h4>
                    <p className="text-xs sm:text-[10px] text-slate-500 leading-tight font-medium">Audit approved</p>
                  </div>
                </div>

                {/* Node 2 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-0 group/node">
                  <div className="w-12 h-12 sm:w-11 sm:h-11 bg-white border-2 border-slate-200 text-slate-500 font-bold text-[10px] sm:text-xs rounded-full flex items-center justify-center sm:mb-4 shadow-sm z-10 transition-all group-hover/node:border-slate-400 group-hover/node:text-slate-800">
                    D1-3
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-xs mb-0.5">Profiles Sent</h4>
                    <p className="text-xs sm:text-[10px] text-slate-500 leading-tight font-medium">With voice notes</p>
                  </div>
                </div>

                {/* Node 3 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-0 group/node">
                  <div className="w-12 h-12 sm:w-11 sm:h-11 bg-white border-2 border-slate-200 text-slate-500 font-bold text-[10px] sm:text-xs rounded-full flex items-center justify-center sm:mb-4 shadow-sm z-10 transition-all group-hover/node:border-slate-400 group-hover/node:text-slate-800">
                    D3-5
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-xs mb-0.5">Selection</h4>
                    <p className="text-xs sm:text-[10px] text-slate-500 leading-tight font-medium">You confirm hire</p>
                  </div>
                </div>

                {/* Node 4 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-0 group/node">
                  <div className="w-12 h-12 sm:w-11 sm:h-11 bg-white border-2 border-slate-200 text-slate-500 font-bold text-[10px] sm:text-xs rounded-full flex items-center justify-center sm:mb-4 shadow-sm z-10 transition-all group-hover/node:border-slate-400 group-hover/node:text-slate-800">
                    D6-7
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-xs mb-0.5">Onboarding</h4>
                    <p className="text-xs sm:text-[10px] text-slate-500 leading-tight font-medium">Joining ready</p>
                  </div>
                </div>

                {/* Node 5 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-0 group/node">
                  <div className="w-12 h-12 sm:w-11 sm:h-11 bg-white border-2 border-[#2563eb] text-[#2563eb] font-bold text-[10px] sm:text-xs rounded-full flex items-center justify-center sm:mb-4 shadow-sm z-10 transition-all group-hover/node:bg-[#2563eb] group-hover/node:text-white">
                    Day 8
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <h4 className="font-bold text-[#2563eb] text-sm sm:text-xs mb-0.5">Day One</h4>
                    <p className="text-xs sm:text-[10px] text-slate-500 leading-tight font-medium">30-day clock starts</p>
                  </div>
                </div>

                {/* Node 6 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-0 group/node">
                  <div className="w-12 h-12 sm:w-11 sm:h-11 bg-white border-2 border-[#2563eb]/50 text-[#2563eb]/80 font-bold text-[10px] sm:text-xs rounded-full flex items-center justify-center sm:mb-4 shadow-sm z-10 transition-all group-hover/node:border-[#2563eb] group-hover/node:text-[#2563eb]">
                    Day 15
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <h4 className="font-bold text-[#2563eb]/80 text-sm sm:text-xs mb-0.5">Midpoint</h4>
                    <p className="text-xs sm:text-[10px] text-slate-500 leading-tight font-medium">Quality check-in</p>
                  </div>
                </div>

                {/* Node 7 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-0 group/node">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500 text-white font-bold text-sm sm:text-base rounded-full flex items-center justify-center sm:mb-2.5 shadow-md shadow-emerald-500/20 z-10 transition-transform group-hover/node:scale-110">
                    D30
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <h4 className="font-bold text-emerald-600 text-sm sm:text-xs mb-0.5">Invoice Day</h4>
                    <p className="text-xs sm:text-[10px] text-emerald-600/80 leading-tight font-semibold">We finally invoice</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Guarantee box - highlighted */}
          <div className="bg-[#2563eb]/5 border-2 border-[#2563eb]/30 p-8 sm:p-12 rounded-[2.5rem] mb-12 shadow-sm text-center max-w-4xl mx-auto">
            <h3 className="font-display font-black text-2xl md:text-3xl text-slate-950 mb-4 text-center">
              The Replacement Guarantee
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
              If a placed candidate exits for any reason before completing 30 days, excluding documented misconduct by the employer, we replace them at no additional charge. The clock resets to Day 1 with the replacement candidate.
            </p>
          </div>

          {/* Three-point explainer */}
          <div className="grid md:grid-cols-3 gap-6 pt-8 text-left max-w-4xl mx-auto border-t border-slate-100">
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Day 30 Rationale</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Most early exits occur within three weeks. Billing is synced to true retention.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Employer Misconduct</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Guarantees are voided by non-payment or abuse, ensuring candidate safety.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Clock Activation</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">The 30-day observation window strictly begins on the exact date of joining.</p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7: TESTIMONIALS */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 mb-12">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-extrabold text-slate-900">
              What our partners say.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed mb-6 italic">
                "We had been through three agencies in one year. The first shortlist from Jovese had better candidates than anything we had seen in 12 months of searching. The audio screening is not a gimmick. It actually works."
              </p>
              <div>
                <div className="h-px bg-slate-100 my-4" />
                <div className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                  Head of Operations
                </div>
                <div className="text-[11px] text-slate-400">
                  NBFC Telecalling Division, Hyderabad
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed mb-6 italic">
                "Our 90-day attrition in the BPO team was running at 52%. Four months after moving our volume hiring to Jovese it is at 28%. The audit form process also forced us to examine what was broken on our own side."
              </p>
              <div>
                <div className="h-px bg-slate-100 my-4" />
                <div className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                  HR Manager
                </div>
                <div className="text-[11px] text-slate-400">
                  Customer Support Operations, Bangalore
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed mb-6 italic">
                "I was skeptical of the Day 30 payment model. I thought there would be a catch. There was not. They replaced one candidate at no charge when she left in Week 2. The replacement has been with us for 7 months."
              </p>
              <div>
                <div className="h-px bg-slate-100 my-4" />
                <div className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                  Founder
                </div>
                <div className="text-[11px] text-slate-400">
                  Hospitality Group, Hyderabad
                </div>
              </div>
            </div>

          </div>

          <div className="text-center font-semibold text-xs text-slate-400">
            Current partners include teams across NBFC telecalling, inside sales, hospitality operations, and BPO customer support.
          </div>

        </div>
      </section>

      {/* SECTION 8: FINAL CTA */}
      <section className="py-12 mb-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between border border-slate-800">
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#2563eb]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 text-center md:text-left mb-8 md:mb-0">
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
                Ready to partner?
              </h2>
              <p className="text-slate-400 font-medium text-sm sm:text-base">
                Zero upfront cost. One clear invoice on Day 30.
              </p>
            </div>
            
            <div className="relative z-10 w-full md:w-auto flex-shrink-0">
              <Link
                to="/clients"
                className="relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-slate-900 font-bold transition-all shadow-[0_8px_30px_rgb(255,255,255,0.15)] hover:shadow-[0_8px_40px_rgb(255,255,255,0.2)] hover:-translate-y-0.5 group text-sm"
              >
                <span className="relative z-10">Apply for Partnership</span>
                <div className="absolute inset-0 bg-slate-50 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: FAQ ACCORDION */}
      <section className="py-24 bg-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            We know what you're thinking.
          </h2>
        </div>

        <div className="space-y-4">
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
                      <div className="px-6 py-5 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
