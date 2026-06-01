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
            <span className="inline-block px-3 py-1 bg-white border border-[#ff5a36]/20 text-xs font-bold text-[#ff5a36] tracking-[0.2em] rounded-full shadow-sm uppercase mb-6">
              Precision Volume Hiring
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Stop replacing your sales team every 90 days.
            </h1>
            <p className="text-base sm:text-lg text-slate-500 mb-10 leading-relaxed font-medium max-w-xl">
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
        <div className="w-full mt-16 md:mt-24 border-y border-slate-100 py-6 bg-slate-50/50">
          <div className="max-w-6xl mx-auto px-4 text-center text-xs sm:text-sm text-slate-400 font-medium tracking-wide flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
            <span>Hyderabad-based NBFC | 40-seat telecalling floor</span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span>Delhi NCR hospitality group | 3 properties</span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span>Bangalore inside sales team | 25 reps</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: WAITLIST MECHANIC */}
      <section className="py-20 bg-white">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            
            <div className="md:col-span-7">
              <span className="inline-block px-3 py-1 bg-slate-50 border border-indigo-100 text-xs font-bold text-indigo-500 tracking-widest uppercase rounded-full mb-6">
                Why We Limit Clients
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                Partnership spots are deliberately limited.
              </h2>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium mb-6">
                We do not onboard clients faster than we can staff them well. When we accept a new partner, we commit screening capacity to their specific roles. If we stretched that across 80 clients, we would become the thing we set out to replace.
              </p>
              <p className="text-slate-500 text-base leading-relaxed font-medium mb-6">
                Right now we manage a controlled number of active partnerships. When capacity opens, we reach into the waitlist in order of submission.
              </p>
              <p className="text-sm font-semibold text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 inline-block mb-6">
                New applications are reviewed every Monday. If your requirements match current capacity, you will hear from us within 48 hours of the review.
              </p>
              <div>
                <Link 
                  to="/clients" 
                  className="inline-flex items-center gap-2 font-bold text-[#ff5a36] hover:text-[#ff451d] transition-colors"
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
                  <div className="text-5xl sm:text-6xl font-display font-black text-[#ff5a36] mb-3 tracking-tight">
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
      <section id="bleed" className="py-24 bg-slate-900 text-white rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 mb-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff5a36] rounded-full blur-[180px] opacity-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500 rounded-full blur-[180px] opacity-10" />
        
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-orange-400 tracking-widest uppercase block mb-3">
              THE REVENUE LEAK
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Your empty seats are not a hiring problem.<br />They are a revenue leak.
            </h2>
            <div className="text-slate-400 max-w-3xl mx-auto space-y-4 text-base md:text-lg leading-relaxed font-medium">
              <p>
                Most HR teams track cost-per-hire. Almost nobody tracks the cost of the 18 days it takes to replace someone who quit on Day 12. The lost output. The manager hours spent re-interviewing. The training investment that walked out the door. The agency that invoiced you anyway.
              </p>
              <p>
                Traditional staffing agencies have no incentive to solve this. They invoice the moment someone joins. Whether that person is still there in 30 days is not their problem. It is yours.
              </p>
              <p className="text-white font-bold">
                We designed Jovese around the opposite model. Our fee triggers on Day 30. Our incentive is your retention, not your headcount churn.
              </p>
            </div>
          </div>

          {/* THE BLEED CALCULATOR */}
          <div className="bg-slate-800 border border-slate-700/60 rounded-[2.5rem] p-6 sm:p-12 max-w-4xl mx-auto mb-16 shadow-xl">
            <h3 className="font-display text-center font-extrabold text-sm tracking-widest text-[#ff5a36] mb-8 uppercase">
              CALCULATE YOUR MONTHLY BLEED
            </h3>

            <form onSubmit={handleCalculate} className="grid md:grid-cols-3 gap-6 items-end">
              
              {/* Field 1 */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300">Frontline roles you hire per quarter</label>
                <input 
                  type="number"
                  inputMode="numeric"
                  required
                  value={quarterlyHires}
                  onChange={(e) => {
                    setQuarterlyHires(e.target.value);
                    setIsCalculated(false);
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#ff5a36] text-white transition-colors"
                  placeholder="e.g. 12"
                />
              </div>

              {/* Field 2 */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
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
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-[#ff5a36] text-white transition-colors"
                  placeholder="e.g. 25000"
                />
                <span className="text-[10px] text-slate-400 block mt-1">Salary only, not total package</span>
              </div>

              {/* Field 3 */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                  <span>30-day attrition rate (%)</span>
                  <span className="text-[#ff5a36] text-sm">{attritionRate}%</span>
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
                  className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-[#ff5a36]"
                />
                <span className="text-[10px] text-slate-400 block text-right">Industry average: 30 to 45%</span>
              </div>

            </form>

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={handleCalculate}
                disabled={!quarterlyHires || !ctc}
                className="w-full sm:w-auto px-10 py-4 bg-[#ff5a36] hover:bg-[#ff451d] text-white font-bold rounded-full transition-colors disabled:opacity-50 shadow-lg text-base"
              >
                Calculate My Bleed
              </button>
            </div>

            {/* Calculated Output Block */}
            <AnimatePresence>
              {isCalculated && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-12 pt-8 border-t border-slate-700/60 overflow-hidden"
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    
                    {/* Card 1 */}
                    <div className="bg-slate-900/40 border border-slate-700 p-6 rounded-2xl">
                      <div className="text-xs text-slate-400 uppercase font-bold tracking-wide mb-1">
                        Monthly Revenue Loss From Empty Seats
                      </div>
                      <div className="text-2xl font-extrabold text-orange-400 font-display">
                        {formatINRValue(calculatedOutputs.monthlyLoss)}
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-slate-900/40 border border-slate-700 p-6 rounded-2xl">
                      <div className="text-xs text-slate-400 uppercase font-bold tracking-wide mb-1">
                        Annual Training Spend Wasted on Early Exits
                      </div>
                      <div className="text-2xl font-extrabold text-orange-400 font-display">
                        {formatINRValue(calculatedOutputs.annualTrainingWasted)}
                      </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-slate-900/40 border border-slate-700 p-6 rounded-2xl">
                      <div className="text-xs text-slate-400 uppercase font-bold tracking-wide mb-1">
                        Agency Fees Paid for Hires Who Left
                      </div>
                      <div className="text-2xl font-extrabold text-orange-400 font-display">
                        {formatINRValue(calculatedOutputs.agencyFeesWasted)}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">Assumes standard 8.33% placement fee</div>
                    </div>

                    {/* Card 4 - highlighted savings */}
                    <div className="bg-[#ff5a36]/10 border border-[#ff5a36]/30 p-6 rounded-2xl">
                      <div className="text-xs text-[#ff5a36] uppercase font-extrabold tracking-wide mb-1">
                        Estimated Annual Saving with Jovese Model
                      </div>
                      <div className="text-3xl font-black text-[#ff5a36] font-display">
                        {formatINRValue(calculatedOutputs.annualSaving)}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">Based on historical 30-day retention outcomes</div>
                    </div>

                  </div>

                  <div className="mt-8 text-center text-xs text-slate-500">
                    <p className="mb-4">These are estimates based on industry averages. Your audit form gives us your actual numbers so we can give you a precise analysis.</p>
                    <Link 
                      to="/clients"
                      className="inline-flex items-center gap-2 text-white hover:text-orange-400 font-bold justify-center"
                    >
                      Submit Your Audit for a Real Analysis <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Three-column comparison below the calculator */}
          <div className="grid md:grid-cols-11 gap-4 items-center">
            
            {/* Trad model */}
            <div className="md:col-span-5 bg-slate-800/40 border border-slate-700/60 p-8 rounded-[2rem]">
              <h4 className="text-lg font-bold text-slate-300 font-display mb-6">Traditional Agency Model</h4>
              <ul className="space-y-3 text-sm text-slate-400 font-medium">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 text-lg leading-none select-none">•</span>
                  <span>Invoiced on joining day</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 text-lg leading-none select-none">•</span>
                  <span>No accountability after Day 1</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 text-lg leading-none select-none">•</span>
                  <span>Same candidate sent to 10 clients</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 text-lg leading-none select-none">•</span>
                  <span>Profit increases when you keep rehiring</span>
                </li>
              </ul>
            </div>

            {/* VS divider */}
            <div className="md:col-span-1 text-center font-display font-black text-2xl text-slate-600 block my-4 md:my-0 select-none">
              VS
            </div>

            {/* Jovese model */}
            <div className="md:col-span-11 lg:col-span-5 bg-[#ff5a36]/5 border border-[#ff5a36]/20 p-8 rounded-[2rem]">
              <h4 className="text-lg font-bold text-[#ff5a36] font-display mb-6">Jovese Model</h4>
              <ul className="space-y-3 text-sm text-slate-200 font-medium">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#ff5a36] text-lg leading-none select-none">•</span>
                  <span>Invoiced on Day 30 only</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#ff5a36] text-lg leading-none select-none">•</span>
                  <span>Free replacement if hire exits before Day 30</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#ff5a36] text-lg leading-none select-none">•</span>
                  <span>Profiles curated per your specific brief</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#ff5a36] text-lg leading-none select-none">•</span>
                  <span>We profit only when attrition stops</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: THE AUDIO ADVANTAGE */}
      <section className="py-24 bg-white mt-8 rounded-[3rem]">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-indigo-500 tracking-widest uppercase block mb-3">
              WHY AUDIO SCREENING
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              A resume tells you where they worked.<br />A voice tells you if they can sell.
            </h2>
            <p className="text-base sm:text-lg text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
              For any role where the first touchpoint is a phone call, the CV is a formality. The candidates who perform in telecalling and inside sales are not always the ones with the longest experience. They are the ones who listen before they speak, handle rejection without collapsing, and sound like someone you would actually want to pick up the phone for. You cannot screen for that in a document. We screen for it in 45 seconds.
            </p>
          </div>

          {/* Audio Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            
            {/* Card 1 */}
            <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div>
                <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-500 rounded-full font-bold text-[10px] uppercase tracking-wider mb-4">
                  TELECALLING CANDIDATE
                </span>
                <p className="text-xs text-slate-400 font-semibold mb-6">Hyderabad | 1 year 2 months experience</p>
                
                {/* Visual Audio Player block */}
                <div className="bg-white border border-slate-100 p-4 rounded-2xl mb-4 flex items-center gap-4">
                  <button
                    onClick={() => playAudio(1)}
                    className="w-10 h-10 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center flex-shrink-0"
                  >
                    {playingId === 1 ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <div className="flex-grow">
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#ff5a36] h-full rounded-full transition-all duration-300" 
                        style={{ width: `${progress[1]}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
                      <span>{formatTime(currentTime[1])}</span>
                      <span>0:32</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic pb-2">
                "Clear diction. Handled the objection scenario without filler words. No rehearsed feel."
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div>
                <span className="inline-block px-3 py-1 bg-orange-50 text-[#ff5a36] rounded-full font-bold text-[10px] uppercase tracking-wider mb-4">
                  INSIDE SALES CANDIDATE
                </span>
                <p className="text-xs text-slate-400 font-semibold mb-6">Gurgaon | 2 years experience</p>
                
                {/* Visual Audio Player block */}
                <div className="bg-white border border-slate-100 p-4 rounded-2xl mb-4 flex items-center gap-4">
                  <button
                    onClick={() => playAudio(2)}
                    className="w-10 h-10 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center flex-shrink-0"
                  >
                    {playingId === 2 ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <div className="flex-grow">
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#ff5a36] h-full rounded-full transition-all duration-300" 
                        style={{ width: `${progress[2]}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
                      <span>{formatTime(currentTime[2])}</span>
                      <span>0:28</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic pb-2">
                "Natural warmth. Professional tone without sounding scripted. Closed the intro with a question, not a statement."
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div>
                <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-500 rounded-full font-bold text-[10px] uppercase tracking-wider mb-4">
                  FRONT OFFICE CANDIDATE
                </span>
                <p className="text-xs text-slate-400 font-semibold mb-6">Hyderabad | Fresher</p>
                
                {/* Visual Audio Player block */}
                <div className="bg-white border border-slate-100 p-4 rounded-2xl mb-4 flex items-center gap-4">
                  <button
                    onClick={() => playAudio(3)}
                    className="w-10 h-10 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center flex-shrink-0"
                  >
                    {playingId === 3 ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <div className="flex-grow">
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#ff5a36] h-full rounded-full transition-all duration-300" 
                        style={{ width: `${progress[3]}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
                      <span>{formatTime(currentTime[3])}</span>
                      <span>0:35</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic pb-2">
                "Composed under a difficult scenario prompt. Structured response. Strong first impression."
              </p>
            </div>

          </div>

          <div className="text-center pt-6">
            <p className="text-slate-500 mb-6 font-medium">Every candidate you receive goes through the same standard.</p>
            <Link
              to="/clients"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#ff5a36] hover:bg-[#ff451d] text-white font-bold rounded-full transition-colors shadow-lg"
            >
              Apply for Client Partnership
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: THE DEPLOYMENT PIPELINE (id="method") */}
      <section id="method" className="py-24 bg-slate-50 rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 mb-12 border border-slate-100/60 shadow-inner">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-indigo-500 tracking-widest uppercase block mb-3">
              THE 48-HOUR DEPLOYMENT FLOW
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Vetted talent in 48 hours. Here is exactly how.
            </h2>
          </div>

          {/* Horizontal stepped flow on desktop, vertical stacked list on mobile */}
          <div className="grid md:grid-cols-4 gap-8 relative mb-16">
            
            {/* Phase 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative flex flex-col justify-between">
              <div>
                <span className="font-display font-black text-[#ff5a36]/20 text-5xl absolute top-6 right-6 opacity-50">01</span>
                <span className="inline-block px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-bold tracking-wider uppercase mb-6 shadow-sm border border-slate-100/50">
                  Avg. 340 applications per week
                </span>
                <h3 className="font-bold text-slate-900 text-lg mb-2">WHATSAPP INGESTION</h3>
                <p className="text-xs text-slate-400 font-semibold mb-4 sentence-case">
                  Candidates bypass broken career pages entirely.
                </p>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Our automated WhatsApp workflow collects role preference, availability, city, and a 45-second voice note. The intake takes under 4 minutes. We receive structured data from every applicant, not an unreadable PDF.
                </p>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative flex flex-col justify-between">
              <div>
                <span className="font-display font-black text-[#ff5a36]/20 text-5xl absolute top-6 right-6 opacity-50">02</span>
                <span className="inline-block px-2.5 py-1 bg-[#ff5a36]/5 border border-[#ff5a36]/10 text-[#ff5a36] rounded-lg text-[10px] font-bold tracking-wider uppercase mb-6 shadow-sm">
                  Approx. 22% clear this stage
                </span>
                <h3 className="font-bold text-slate-900 text-lg mb-2">TONE AND LOGIC AUDIT</h3>
                <p className="text-xs text-slate-400 font-semibold mb-4 sentence-case">
                  70 to 80% of applicants are filtered here before a human reviews anything.
                </p>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Our screening workflow evaluates every voice note across four parameters: clarity, grammar, professional tone, and scenario handling. Applications that do not meet our threshold are discarded at this stage. We tell the candidate why and invite them to retry after 7 days.
                </p>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative flex flex-col justify-between">
              <div>
                <span className="font-display font-black text-[#ff5a36]/20 text-5xl absolute top-6 right-6 opacity-50">03</span>
                <span className="inline-block px-2.5 py-1 bg-slate-50 border border-slate-100/50 text-slate-600 rounded-lg text-[10px] font-bold tracking-wider uppercase mb-6 shadow-sm">
                  Avg. 6 profiles per role
                </span>
                <h3 className="font-bold text-slate-900 text-lg mb-2">THE MATCH</h3>
                <p className="text-xs text-slate-400 font-semibold mb-4 sentence-case">
                  You receive curated profiles. Not a volume dump.
                </p>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Our team matches cleared candidates against your active brief, availability window, and compensation range. You receive 3 to 8 profiles per role, each with the original voice note attached, a written assessment, and expected joining date.
                </p>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative flex flex-col justify-between">
              <div>
                <span className="font-display font-black text-[#ff5a36]/20 text-5xl absolute top-6 right-6 opacity-50">04</span>
                <span className="inline-block px-2.5 py-1 bg-emerald-50/50 border border-emerald-100 text-emerald-600 rounded-lg text-[10px] font-bold tracking-wider uppercase mb-6 shadow-sm">
                  94% make it to Day 30
                </span>
                <h3 className="font-bold text-slate-950 text-lg mb-2">DEPLOYMENT</h3>
                <p className="text-xs text-slate-400 font-semibold mb-4 sentence-case">
                  The candidate joins. The 30-day clock starts. Nothing else happens until then.
                </p>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
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
              <div className="text-4xl font-black text-[#ff5a36] font-display">Zero</div>
              <div className="text-sm font-semibold text-slate-500 mt-1">Upfront cost to start</div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: THE 30-DAY GUARANTEE */}
      <section className="py-24 bg-white">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-orange-500 tracking-widest uppercase block mb-3">
              THE FEE MODEL
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              You are not paying for introductions.<br />You are paying for outcomes.
            </h2>
          </div>

          {/* Timeline Node map */}
          <div className="relative mb-20 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-8 text-center sm:text-left">
              FARTNERSHIP TIMELINE
            </h3>
            
            <div className="grid gap-6 sm:grid-cols-7 text-center">
              
              {/* Day 0 */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-slate-200 text-slate-700 font-bold text-xs rounded-full flex items-center justify-center mb-3">
                  Day 0
                </div>
                <h4 className="font-bold text-slate-900 text-xs mb-1">Brief Received</h4>
                <p className="text-[10px] text-slate-400">Audit approved & brief received</p>
              </div>

              {/* Day 1 to 3 */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-slate-200 text-slate-700 font-bold text-xs rounded-full flex items-center justify-center mb-3">
                  D1-3
                </div>
                <h4 className="font-bold text-slate-900 text-xs mb-1">Profiles Send</h4>
                <p className="text-[10px] text-slate-400">Delivered with voice notes</p>
              </div>

              {/* Day 3 to 5 */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-slate-200 text-slate-700 font-bold text-xs rounded-full flex items-center justify-center mb-3">
                  D3-5
                </div>
                <h4 className="font-bold text-slate-900 text-xs mb-1">Selection</h4>
                <p className="text-[10px] text-slate-400">You select and confirm candidate</p>
              </div>

              {/* Day 6 to 7 */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-slate-200 text-slate-700 font-bold text-xs rounded-full flex items-center justify-center mb-3">
                  D6-7
                </div>
                <h4 className="font-bold text-slate-900 text-xs mb-1">Onboarding</h4>
                <p className="text-[10px] text-slate-400">Joining confirmed with Jovese</p>
              </div>

              {/* Day 8 */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-[#ff5a36]/20 text-[#ff5a36] font-bold text-xs rounded-full flex items-center justify-center mb-3">
                  Day 8
                </div>
                <h4 className="font-bold text-slate-900 text-xs mb-1">Day One</h4>
                <p className="text-[10px] text-slate-400">First day. 30-day clock opens.</p>
              </div>

              {/* Day 15 */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-[#ff5a36]/20 text-[#ff5a36] font-bold text-xs rounded-full flex items-center justify-center mb-3">
                  Day 15
                </div>
                <h4 className="font-bold text-slate-900 text-xs mb-1">Midpoint</h4>
                <p className="text-[10px] text-slate-400">Check-in from our team</p>
              </div>

              {/* Day 30 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-emerald-500 text-white font-bold text-sm rounded-full flex items-center justify-center mb-2 shadow-md border-2 border-white ring-2 ring-emerald-500/30 transform scale-110">
                  D30
                </div>
                <h4 className="font-bold text-emerald-600 text-xs mb-0.5">Invoice Day</h4>
                <p className="text-[10px] text-emerald-500 font-semibold">We invoice. First time. Not before.</p>
              </div>

            </div>
          </div>

          {/* Guarantee box - highlighted */}
          <div className="bg-[#ff5a36]/5 border-2 border-[#ff5a36]/30 p-8 sm:p-12 rounded-[2.5rem] mb-12 shadow-sm text-center max-w-4xl mx-auto">
            <span className="inline-block px-3 py-1 bg-[#ff5a36] text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
              GUARANTEE
            </span>
            <h3 className="font-display font-black text-2xl md:text-3xl text-slate-950 mb-4 text-center">
              The Replacement Guarantee
            </h3>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
              If a placed candidate exits for any reason before completing 30 days, excluding documented misconduct by the employer, we replace them at no additional charge. The clock resets to Day 1 with the replacement candidate.
            </p>
          </div>

          {/* Three-point explainer */}
          <div className="grid md:grid-cols-3 gap-8 pt-8 text-left">
            
            <div className="space-y-2">
              <h4 className="font-bold text-slate-950 font-display text-base">Point 1 — Why Day 30?</h4>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
                Because most frontline attrition happens in the first 3 weeks. If someone is going to leave, they leave fast. Tying our invoice to Day 30 means we only get paid when the placement actually worked.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-950 font-display text-base">Point 2 — What counts as employer misconduct?</h4>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
                Documented incidents: non-payment of agreed salary, verbal abuse, physical altercation. This protects the candidate. It also means you cannot simply let someone go on Day 29 to avoid payment.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-950 font-display text-base">Point 3 — What about notice periods?</h4>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
                Your 30-day window starts from joining day, not from when you selected the candidate. Notice period and joining timelines are communicated upfront in every profile we send.
              </p>
            </div>

          </div>

          <div className="text-center pt-16">
            <p className="text-slate-500 font-bold mb-4">Zero upfront cost. One clear invoice on Day 30.</p>
            <Link
              to="/clients"
              className="px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium transition-all"
            >
              Apply for Client Partnership
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION 7: TESTIMONIALS */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 mb-12">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-indigo-500 tracking-widest uppercase block mb-3">
              CLIENT EXPERIENCE
            </span>
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

      {/* SECTION 8: FAQ ACCORDION */}
      <section className="py-24 bg-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900">
            Common questions.
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
