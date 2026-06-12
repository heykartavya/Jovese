import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Video, 
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
  Volume2,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CountUp from '../components/CountUp';

const BleedClock = () => {
  const [leakedAmount, setLeakedAmount] = useState<number>(0);

  useEffect(() => {
    const updateAmount = () => {
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const secondsSinceMidnight = (now.getTime() - startOfDay.getTime()) / 1000;
      
      const leaksPerSecond = 23000000 / 3600; // ₹2.3 crore per hour
      setLeakedAmount(Math.floor(secondsSinceMidnight * leaksPerSecond));
    };

    updateAmount();
    const interval = setInterval(updateAmount, 1000); // Ticks every second
    return () => clearInterval(interval);
  }, []);

  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(leakedAmount).replace(/\s/g, '').replace(/\u202F/g, '').replace(/\u00A0/g, '');

  return (
    <div className="bg-slate-50 border border-slate-100 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-12 mb-6 max-w-4xl mx-auto relative shadow-sm overflow-hidden text-center aspect-[4/3] sm:aspect-[2/1] flex flex-col justify-center items-center">
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <h3 className="font-display font-medium text-slate-400 mb-3 sm:mb-6 text-[10px] sm:text-sm uppercase tracking-[0.2em] whitespace-nowrap">
          Live Industry Attrition Bleed
        </h3>
        
        <div className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl font-black text-slate-900 font-display tracking-tight mb-4 sm:mb-6 tabular-nums whitespace-nowrap">
          {formattedAmount}
        </div>
        
        <p className="text-slate-500 font-medium text-[11px] sm:text-base max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
          Right now, Indian BPO and sales companies are losing <span className="text-slate-900 font-bold whitespace-nowrap">₹2.3 crore per hour</span> from early attrition. The number above is the estimated industry revenue leaked today alone.
        </p>
        
        <div className="mt-6 sm:mt-10 flex items-center justify-center gap-2 text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest animate-pulse">
          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-slate-300" />
          <span className="whitespace-nowrap">Calculate Yours Below</span>
          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-slate-300" />
        </div>
      </div>
    </div>
  );
};


const LiveRejectionCounter = () => {
  return (
    <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pt-4 md:pt-6 pb-0 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div 
        className="rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-10 lg:p-12 max-w-5xl mx-auto border border-slate-100 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)]"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 w-full">
          
          <div className="flex-1 text-center lg:text-left w-full">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight">
              We reject 80% of applicants<br className="hidden xl:block"/> so you don't have to.
            </h2>
            
            {/* The Ratio Bar */}
            <div className="mb-8 w-full max-w-md mx-auto lg:mx-0">
               <div className="flex justify-between items-end mb-2 px-1">
                  <div className="text-left">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Rejected</div>
                    <div className="text-3xl font-black text-slate-900 font-mono tabular-nums leading-none"><CountUp end={1033} formatIndian duration={1.5} /></div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-[#2563eb] uppercase tracking-[0.2em] mb-1">Cleared</div>
                    <div className="text-2xl font-black text-[#2563eb] font-mono tabular-nums leading-none"><CountUp end={214} formatIndian duration={4} /></div>
                  </div>
               </div>
               <div className="h-3 sm:h-4 w-full flex rounded-full overflow-hidden bg-slate-100">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '83%' }} transition={{ duration: 1.5, ease: 'easeOut' }} className="bg-slate-800"></motion.div>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '17%' }} transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }} className="bg-[#2563eb]"></motion.div>
               </div>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed max-w-md mx-auto lg:mx-0 font-normal">
              Most sites show success metrics. We show our rejection volume. Getting a Jovese shortlist means your candidate safely survived our rigorous communication threshold.
            </p>
          </div>
          
          <div className="flex-1 w-full lg:max-w-md lg:ml-auto mt-10 lg:mt-0 p-6 sm:p-8 bg-slate-50 rounded-[1.5rem]">
            <svg className="w-6 h-6 text-slate-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-[15px] text-slate-700 leading-relaxed mb-6 font-medium">
              Every candidate Jovese sent us had already cleared the baseline and could actually communicate. This pre-filtering saved my engineering manager a minimum of 20 hours of completely useless interviews this quarter.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 shrink-0">
                <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=200&h=200" alt="Tech Founder" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-display font-bold text-slate-900 text-sm">Rahul K.</div>
                <div className="text-slate-500 text-[10px] uppercase tracking-wider">Technical Founder</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </motion.section>
  );
};

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

  // Custom Video State
  const [videoObjects, setVideoObjects] = useState<{ [id: number]: HTMLVideoElement | null }>({});
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [progress, setProgress] = useState<{ [id: number]: number }>({ 1: 0, 2: 0, 3: 0, 4: 0 });
  const [currentTime, setCurrentTime] = useState<{ [id: number]: number }>({ 1: 0, 2: 0, 3: 0, 4: 0 });
  
  const sampleVideos = {
    1: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    2: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    3: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    4: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  };

  const playVideo = (id: number) => {
    if (playingId === id) {
      videoObjects[id]?.pause();
      setPlayingId(null);
      return;
    }

    if (playingId && videoObjects[playingId]) {
      videoObjects[playingId]?.pause();
    }

    let video = videoObjects[id];
    if (!video) {
      video = document.createElement('video');
      video.src = sampleVideos[id as 1 | 2 | 3 | 4];
      
      video.addEventListener('timeupdate', () => {
        if (video) {
          setProgress(prev => ({
            ...prev,
            [id]: (video.currentTime / video.duration) * 100 || 0
          }));
          setCurrentTime(prev => ({
            ...prev,
            [id]: video.currentTime || 0
          }));
        }
      });

      video.addEventListener('ended', () => {
        setPlayingId(null);
        setProgress(prev => ({ ...prev, [id]: 0 }));
        setCurrentTime(prev => ({ ...prev, [id]: 0 }));
      });

      setVideoObjects(prev => ({ ...prev, [id]: video }));
    }

    video.play().catch(err => console.log('Video playback error:', err));
    setPlayingId(id);

    if (typeof window !== 'undefined' && (window as any).gtag) {
      const roles: any = {
        1: 'TELECALLING CANDIDATE',
        2: 'INSIDE SALES CANDIDATE',
        3: 'FRONT OFFICE CANDIDATE',
        4: 'IT HELPDESK CANDIDATE'
      };
      (window as any).gtag('event', 'video_played', { 
        candidate_type: roles[id] 
      });
    }
  };

  // Clean up videos on unmount
  useEffect(() => {
    return () => {
      Object.values(videoObjects).forEach((video: any) => {
        if (video) video.pause();
      });
    };
  }, [videoObjects]);

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

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'calculator_used', {
        attrition_rate: attritionRate,
        roles_per_quarter: hiresVal
      });
    }
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
    },
    {
      q: "Do you place IT and technical roles, not just sales and BPO?",
      a: "Yes. We place IT Helpdesk, Technical Support, Pre-Sales, QA Associates, Customer Success, and Junior IT roles for mid-tier software and services companies. Our video screening model applies directly to any role where communication is central to performance. We do not place senior developers or engineering leads — that requires technical evaluation beyond our current scope."
    },
    {
      q: "How do campus placement drives work with Jovese?",
      a: "We identify suitable tier 2 and tier 3 colleges across India, including major hubs like Bangalore, Hyderabad, Pune, Mumbai, Delhi NCR, and Gurugram based on your role requirements. We run video screening on interested candidates before your team visits. You only meet candidates who have already cleared our communication threshold. The fee structure is a flat coordination fee per drive plus our standard per-placement Day 30 fee for each confirmed hire. Contact us via the Client Application form and mention campus drives in the requirements field."
    }
  ];

  // Helper for Indian formatting
  const formatINRValue = (val: number) => {
    const removeSpaces = (numStr: string) => numStr.replace(/\s/g, '').replace(/\u202F/g, '').replace(/\u00A0/g, '');
    if (val >= 10000000) {
      return '₹' + removeSpaces((val / 10000000).toLocaleString('en-IN', { maximumFractionDigits: 2 })) + ' Crores';
    }
    if (val >= 100000) {
      return '₹' + removeSpaces((val / 100000).toLocaleString('en-IN', { maximumFractionDigits: 2 })) + ' Lakhs';
    }
    return '₹' + removeSpaces(Math.round(val).toLocaleString('en-IN'));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="pb-12 md:pb-24">
      {/* JSON-LD for AI Search & SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EmploymentAgency",
            "name": "Jovese",
            "url": "https://jovese.com/",
            "description": "Jovese is a modern recruitment agency specializing in volume hiring for BPO, Customer Support, Insurance, and Inside Sales roles in India. Vetted frontline talent delivered in 48 hours with a 30-day retention guarantee.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Gurugram",
              "addressRegion": "Haryana",
              "addressCountry": "IN"
            },
            "areaServed": [
              "India",
              "Delhi NCR",
              "Gurugram",
              "Noida",
              "Mumbai",
              "Bangalore",
              "Pune",
              "Hyderabad"
            ],
            "industry": "Recruitment, BPO Hiring, Insurance Sales Staffing",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://jovese.com/"
            },
            "makesOffer": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "BPO & Customer Support Staffing",
                  "description": "Rapid placement of pre-screened telecalling and customer support executives."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Insurance & Inside Sales Hiring",
                  "description": "Deployment of sales professionals vetted for communication and conversion skills."
                }
              }
            ]
          })
        }}
      />
      
      {/* SECTION 1: HERO */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden pt-8 pb-6 md:pt-12 md:pb-10 bg-gradient-to-b from-slate-50/50 to-white">
        {/* Subtle decorative gloss */}
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-indigo-50/40 to-transparent pointer-events-none" />
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-50/40 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid md:grid-cols-12 gap-8 md:gap-12 items-center mt-4 md:mt-12">
          
          {/* Left Hero Content */}
          <div className="md:col-span-7 text-left">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Stop paying for hires that don't make it past Week 3.
            </h1>
            <p className="text-sm sm:text-base text-slate-500 mb-10 leading-relaxed font-normal max-w-xl">
              Jovese screens and deploys frontline and junior IT talent for telecalling, inside sales, BPO, technical support, and hospitality operations. Pre-screened profiles in 48 hours. You pay nothing until the hire survives Day 30.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <Link
                to="/clients"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'hero_cta_clicked');
                  }
                }}
                className="relative overflow-hidden px-8 py-4 rounded-full bg-slate-900 text-white font-semibold text-center transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-0.5 group text-sm md:text-base border border-slate-800"
              >
                <span className="relative z-10">Start Hiring</span>
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
          <div className="md:col-span-5 relative w-full flex flex-col justify-center mt-8 md:mt-0">
            {/* Decorative background glow behind the bento grid */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-gradient-to-br from-[#2563eb]/10 via-emerald-500/5 to-amber-500/10 blur-[80px] pointer-events-none rounded-[4rem]" />

            <div className="grid grid-cols-2 gap-4 relative z-10 w-full perspective-1000">
              
              {/* Card 1: Main Stat (Full width) */}
              <motion.div 
                initial={{ opacity: 0, y: 20, rotateX: 5 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-2 bg-white/80 backdrop-blur-2xl rounded-[2rem] p-8 shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-white relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] transition-all duration-500"
              >
                {/* Video Waveform decoration */}
                <div className="absolute right-0 bottom-0 pointer-events-none flex items-end gap-1.5 p-8 h-24 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  {[...Array(6)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: ['30%', '100%', '50%', '80%', '30%'] }}
                      transition={{ duration: 1.5 + i * 0.2, repeat: Infinity, ease: 'linear' }}
                      className="w-2.5 bg-indigo-600 rounded-full"
                    />
                  ))}
                </div>

                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="text-slate-900 group-hover:text-[#2563eb] transition-colors duration-500 flex-shrink-0 mt-1">
                    <Video className="w-8 h-8" strokeWidth={2.5} />
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Updated Today</span>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-baseline gap-2">
                    <div className="text-5xl font-black text-slate-900 font-display tracking-tight">
                      <CountUp end={847} />
                    </div>
                  </div>
                  <div className="text-sm font-extrabold text-slate-800 tracking-wider uppercase mt-2 mb-1.5">
                    Candidates Audited
                  </div>
                  <div className="text-xs text-slate-500 font-medium leading-relaxed">Over the last 30 days via video drops.</div>
                </div>
              </motion.div>

              {/* Card 2: Retention (Half width) */}
              <motion.div 
                initial={{ opacity: 0, y: 20, rotateX: 5 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-1 bg-white/80 backdrop-blur-2xl rounded-[2rem] p-6 shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-white relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] transition-all duration-500"
              >
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl group-hover:bg-emerald-400/20 transition-colors duration-500"></div>
                
                <div className="mb-6 text-slate-900 group-hover:text-emerald-500 transition-colors duration-500">
                  <CheckCircle2 className="w-8 h-8" strokeWidth={2.5} />
                </div>
                <div className="relative z-10">
                  <div className="text-3xl font-black text-slate-900 font-display tracking-tight flex items-center gap-1">
                    <CountUp end={94} suffix="%" />
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-2">
                    Retention Rate
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Speed (Half width) */}
              <motion.div 
                initial={{ opacity: 0, y: 20, rotateX: 5 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-1 bg-white/80 backdrop-blur-2xl rounded-[2rem] p-6 shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-white relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] transition-all duration-500"
              >
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition-colors duration-500"></div>

                <div className="mb-6 text-slate-900 group-hover:text-amber-500 transition-colors duration-500">
                  <Clock className="w-8 h-8" strokeWidth={2.5} />
                </div>
                <div className="relative z-10">
                  <div className="text-3xl font-black text-slate-900 font-display tracking-tight">
                    <CountUp end={48} suffix="h" />
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-2">
                    Delivery ETA
                  </div>
                </div>
              </motion.div>

            </div>
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
              <div key={i} className="flex items-center gap-12 sm:gap-16 px-6 sm:px-8 text-[11px] sm:text-sm text-slate-400 font-normal tracking-wide whitespace-nowrap">
                <span className="flex items-center">Hyderabad NBFC <span className="text-slate-300 mx-3">|</span> 40-seat telecalling floor</span>
                <span className="flex items-center">Gurugram IT services firm <span className="text-slate-300 mx-3">|</span> 18 junior QA hires</span>
                <span className="flex items-center">Delhi NCR hospitality group <span className="text-slate-300 mx-3">|</span> 3 properties</span>
                <span className="flex items-center">Hyderabad SaaS company <span className="text-slate-300 mx-3">|</span> customer success team</span>
                <span className="flex items-center">Gurgaon BPO <span className="text-slate-300 mx-3">|</span> 60-seat voice operations</span>
                <span className="flex items-center">Hyderabad GCC <span className="text-slate-300 mx-3">|</span> fresher IT support batch</span>
                <span className="flex items-center">Delhi NCR inside sales team <span className="text-slate-300 mx-3">|</span> 22 reps</span>
                <span className="flex items-center">Gurugram IT helpdesk <span className="text-slate-300 mx-3">|</span> 12-seat L1 support floor</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* LIVE REJECTION COUNTER */}
      <LiveRejectionCounter />

      {/* DOMAINS WE DOMINATE */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 md:py-24 bg-slate-50 border-t border-slate-100">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Domains We Cover
            </h2>
          </div>

          <div className="mb-8 md:mb-12">
            <h3 className="font-display text-xs font-bold text-slate-400 tracking-[0.2em] uppercase mb-8 text-center">
              FRONTLINE AND VOICE ROLES
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { title: "Telecalling", subtitle: "Outbound & Inbound", icon: Headset },
                { title: "BPO & Customer Support", subtitle: "Voice & Non-Voice Operations", icon: Volume2 },
                { title: "Inside Sales", subtitle: "Field & Inside Sales", icon: Briefcase },
                { title: "Front Office", subtitle: "Hospitality & Reception", icon: Building },
              ].map((domain, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="mb-6 text-slate-900 group-hover:text-[#2563eb] transition-colors duration-500">
                    <domain.icon className="w-8 h-8" strokeWidth={2.5} />
                  </div>
                  <h4 className="font-bold text-slate-900 text-lg mb-1">{domain.title}</h4>
                  <p className="text-slate-500 text-xs font-normal">{domain.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xs font-bold text-slate-400 tracking-[0.2em] uppercase mb-8 text-center">
              IT AND TECHNICAL ROLES
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { title: "IT Helpdesk & Support", subtitle: "L1, L2 & Technical Support", icon: Headset },
                { title: "Pre-Sales & Sales Engineering", subtitle: "Software & SaaS Companies", icon: Briefcase },
                { title: "QA & Testing", subtitle: "Junior & Entry-Level Associates", icon: CheckCircle2 },
                { title: "Customer Success", subtitle: "SaaS & Product Companies", icon: Volume2 },
                { title: "Junior IT & L1", subtitle: "Fresher & Campus Hires", icon: Building },
              ].map((domain, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="mb-6 text-slate-900 group-hover:text-emerald-500 transition-colors duration-500">
                    <domain.icon className="w-8 h-8" strokeWidth={2.5} />
                  </div>
                  <h4 className="font-bold text-slate-900 text-[15px] mb-1 leading-tight">{domain.title}</h4>
                  <p className="text-slate-500 text-[11px] font-normal leading-tight">{domain.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* CAMPUS PLACEMENT DRIVES */}
      {/* SECTION 3: THE FLEED (id="bleed") */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        id="bleed" className="py-16 md:py-24 bg-white text-slate-900 rounded-[2rem] md:rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 mb-6 md:mb-12 overflow-hidden relative border border-slate-100 shadow-[0_8px_40px_rgb(0,0,0,0.04)]">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563eb]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900 leading-[1.1]">
              Your empty seats are not a hiring problem.<br />They are a revenue leak.
            </h2>
            <div className="text-slate-600 max-w-3xl mx-auto space-y-6 text-sm md:text-base leading-relaxed font-normal">
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

          <BleedClock />

          {/* THE BLEED CALCULATOR */}
          <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-12 max-w-4xl mx-auto mb-8 md:mb-16 relative shadow-[0_20px_60px_rgb(0,0,0,0.06)] overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] pointer-events-none" />
            
            <h3 className="font-display text-center font-bold text-sm tracking-widest text-slate-400 mb-8 uppercase relative z-10">
              Calculate Your Monthly Bleed
            </h3>

            <form onSubmit={handleCalculate} className="grid md:grid-cols-3 gap-6 items-start relative z-10">
              
              {/* Field 1 */}
              <div className="flex flex-col h-full">
                <label className="text-xs font-bold text-slate-500 mb-2">Frontline roles you hire per quarter</label>
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
                <span className="text-[10px] text-transparent block mt-2 font-normal select-none" aria-hidden="true">Spacer</span>
              </div>

              {/* Field 2 */}
              <div className="flex flex-col h-full">
                <label className="text-xs font-bold text-slate-500 mb-2">
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
                <span className="text-[10px] text-slate-400 block mt-2 font-normal">Salary only, not total package</span>
              </div>

              {/* Field 3 */}
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-2 text-xs font-bold text-slate-500">
                  <span>30-day attrition rate (%)</span>
                  <span className="text-[#2563eb] text-sm">{attritionRate}%</span>
                </div>
                <div className="px-1 py-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center">
                  <input 
                    type="range"
                    min="0"
                    max="80"
                    value={attritionRate}
                    onChange={(e) => {
                      setAttritionRate(parseInt(e.target.value));
                      setIsCalculated(false);
                    }}
                    className="w-[90%] h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2563eb]"
                  />
                </div>
                <span className="text-[10px] text-slate-400 block mt-2 font-normal">Industry average: 30 to 45%</span>
              </div>

            </form>

            <div className="mt-8 text-center relative z-10 w-full flex justify-center">
              <button
                type="button"
                onClick={handleCalculate}
                disabled={!quarterlyHires || !ctc}
                className="w-full md:w-auto relative overflow-hidden px-12 py-4 bg-slate-900 text-white font-bold rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-sm group"
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
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    {/* Card 1 */}
                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex flex-col justify-between group hover:shadow-sm transition-shadow">
                      <div className="text-[11px] text-slate-500 uppercase font-bold tracking-wider mb-4 leading-relaxed">
                        Monthly Revenue Loss From Empty Seats
                      </div>
                      <div className="text-3xl font-black text-slate-900 font-display tracking-tight">
                        {formatINRValue(calculatedOutputs.monthlyLoss)}
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex flex-col justify-between group hover:shadow-sm transition-shadow">
                      <div className="text-[11px] text-slate-500 uppercase font-bold tracking-wider mb-4 leading-relaxed">
                        Annual Training Spend Wasted
                      </div>
                      <div className="text-3xl font-black text-slate-900 font-display tracking-tight">
                        {formatINRValue(calculatedOutputs.annualTrainingWasted)}
                      </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex flex-col justify-between group hover:shadow-sm transition-shadow relative">
                      <div className="text-[11px] text-slate-500 uppercase font-bold tracking-wider mb-4 leading-relaxed">
                        Agency Fees Paid For Early Exits
                      </div>
                      <div>
                        <div className="text-3xl font-black text-slate-900 font-display tracking-tight">
                          {formatINRValue(calculatedOutputs.agencyFeesWasted)}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-2 font-medium">Assumes 8.33% fee</div>
                      </div>
                    </div>

                    {/* Card 4 - highlighted savings */}
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-[1.25rem] flex flex-col justify-between text-white">
                      <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-4 leading-relaxed">
                        Est. Annual Saving With Jovese
                      </div>
                      <div>
                        <div className="text-3xl lg:text-4xl font-black text-white font-display tracking-tight">
                          {formatINRValue(calculatedOutputs.annualSaving)}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-2 font-medium">Based on 30-day retention</div>
                      </div>
                    </div>

                  </div>

                  <div className="mt-8 text-center bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
                    <p className="text-sm font-medium text-slate-600 mb-4 max-w-2xl mx-auto">
                      These are estimates based on industry averages. Your specific attrition and revenue metrics might be higher.
                    </p>
                    <Link 
                      to="/clients"
                      className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-900 hover:text-[#2563eb] hover:border-[#2563eb]/30 hover:shadow-md font-bold px-6 py-3 rounded-full transition-all text-sm group"
                    >
                      Submit Your Audit for a Real Analysis 
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Three-column comparison below the calculator */}
          <div className="grid md:grid-cols-11 gap-6 md:gap-4 items-center max-w-5xl mx-auto">
            
            {/* Trad model */}
            <div className="md:col-span-5 bg-white sm:bg-slate-50/30 border border-slate-100 p-8 sm:p-10 rounded-[2.5rem] shadow-sm">
              <h4 className="text-[13px] font-bold tracking-[0.15em] text-slate-400 uppercase font-sans mb-8">Traditional Agency</h4>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-slate-500 font-medium text-[15px]">
                  <X className="w-4 h-4 text-slate-400 shrink-0 stroke-[3]" />
                  <span>Invoiced on joining day</span>
                </li>
                <li className="flex items-center gap-4 text-slate-500 font-medium text-[15px]">
                  <X className="w-4 h-4 text-slate-400 shrink-0 stroke-[3]" />
                  <span>No accountability after Day 1</span>
                </li>
                <li className="flex items-center gap-4 text-slate-500 font-medium text-[15px]">
                  <X className="w-4 h-4 text-slate-400 shrink-0 stroke-[3]" />
                  <span>Same candidate sent to 10 clients</span>
                </li>
                <li className="flex items-center gap-4 text-slate-500 font-medium text-[15px]">
                  <X className="w-4 h-4 text-slate-400 shrink-0 stroke-[3]" />
                  <span>Profit increases when you keep rehiring</span>
                </li>
              </ul>
            </div>

            {/* VS divider */}
            <div className="md:col-span-1 flex items-center justify-center font-display font-black text-3xl text-slate-200 py-2 md:py-0 select-none">
              VS
            </div>

            {/* Jovese model */}
            <div className="md:col-span-5 bg-white border-2 border-[#00b67a] p-8 sm:p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,182,122,0.12)] relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#00b67a] opacity-5 blur-[50px] pointer-events-none rounded-full" />
              <h4 className="text-2xl sm:text-[22px] font-bold text-slate-900 mb-8 font-sans">Jovese Model</h4>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-slate-700 font-medium text-[15px]">
                  <CheckCircle2 className="w-[20px] h-[20px] text-[#00b67a] shrink-0 stroke-2" />
                  <span>Invoiced on Day 30 only</span>
                </li>
                <li className="flex items-center gap-4 text-slate-700 font-medium text-[15px]">
                  <CheckCircle2 className="w-[20px] h-[20px] text-[#00b67a] shrink-0 stroke-2" />
                  <span>Free replacement if hire exits before Day 30</span>
                </li>
                <li className="flex items-center gap-4 text-slate-700 font-medium text-[15px]">
                  <CheckCircle2 className="w-[20px] h-[20px] text-[#00b67a] shrink-0 stroke-2" />
                  <span>Profiles curated per your specific brief</span>
                </li>
                <li className="flex items-center gap-4 text-slate-900 font-bold text-[15px]">
                  <CheckCircle2 className="w-[20px] h-[20px] text-[#00b67a] shrink-0 stroke-[2.5]" />
                  <span>We profit only when attrition stops</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </motion.section>

      {/* SECTION 4: THE VIDEO ADVANTAGE */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 md:py-24 bg-white mt-4 md:mt-8 rounded-[2rem] md:rounded-[3rem]">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-8 md:mb-16">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-6">
                A resume tells you where they worked.<br />
                <span className="text-slate-400">A voice tells you if they can sell.</span>
              </h2>
            </div>
            
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-indigo-500/5 rounded-full blur-[40px] pointer-events-none" />
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed relative z-10">
                For any role where the first touchpoint is a conversation — a sales call, a support ticket, a campus interview — the CV is a formality. We evaluate the only thing that predicts performance in these roles: how someone speaks when the pressure is on.
              </p>
            </div>
          </div>

          {/* Innovative Video Cards Grid */}
          <div className="hide-scrollbar flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12 pb-2 md:pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            
            {/* Card 1 */}
            <div className="flex-none w-[85%] sm:w-[60%] md:w-auto snap-center bg-slate-50 border border-slate-100 rounded-[2rem] p-6 shadow-sm flex flex-col justify-between group hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="mb-6 flex justify-between items-start">
                <div>
                  <span className="inline-block px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full font-bold text-[10px] uppercase tracking-wider mb-2">TELECALLING CANDIDATE</span>
                  <p className="text-xs text-slate-500 font-semibold">Hyderabad | 1 year 2 months experience</p>
                </div>
                <button onClick={() => playVideo(1)} className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform shadow-md">
                  {playingId === 1 ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                </button>
              </div>
              <div>
                <div className="h-6 flex items-center gap-1 mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1 bg-indigo-200 rounded-full animate-pulse" style={{ height: `${Math.max(20, Math.random() * 100)}%`, animationDelay: `${i * 0.1}s` }} />
                  ))}
                  <div className="flex-1 ml-2 flex items-center gap-2">
                    <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full transition-all duration-300" style={{ width: `${progress[1]}%` }} />
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold">0:32</span>
                  </div>
                </div>
                <p className="text-sm text-slate-700 font-normal leading-relaxed">
                  "Clear diction. Handled the objection scenario without filler words. No rehearsed feel."
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex-none w-[85%] sm:w-[60%] md:w-auto snap-center bg-slate-50 border border-slate-100 rounded-[2rem] p-6 shadow-sm flex flex-col justify-between group hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="mb-6 flex justify-between items-start">
                <div>
                  <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full font-bold text-[10px] uppercase tracking-wider mb-2">INSIDE SALES CANDIDATE</span>
                  <p className="text-xs text-slate-500 font-semibold">Gurgaon | 2 years experience</p>
                </div>
                <button onClick={() => playVideo(2)} className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform shadow-md">
                  {playingId === 2 ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                </button>
              </div>
              <div>
                <div className="h-6 flex items-center gap-1 mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1 bg-blue-200 rounded-full animate-pulse" style={{ height: `${Math.max(20, Math.random() * 100)}%`, animationDelay: `${i * 0.1}s` }} />
                  ))}
                  <div className="flex-1 ml-2 flex items-center gap-2">
                    <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full transition-all duration-300" style={{ width: `${progress[2]}%` }} />
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold">0:28</span>
                  </div>
                </div>
                <p className="text-sm text-slate-700 font-normal leading-relaxed">
                  "Natural warmth. Professional tone without sounding scripted. Closed the intro with a question, not a statement."
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex-none w-[85%] sm:w-[60%] md:w-auto snap-center bg-slate-50 border border-slate-100 rounded-[2rem] p-6 shadow-sm flex flex-col justify-between group hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="mb-6 flex justify-between items-start">
                <div>
                  <span className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full font-bold text-[10px] uppercase tracking-wider mb-2">FRONT OFFICE CANDIDATE</span>
                  <p className="text-xs text-slate-500 font-semibold">Hyderabad | Fresher</p>
                </div>
                <button onClick={() => playVideo(3)} className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform shadow-md">
                  {playingId === 3 ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                </button>
              </div>
              <div>
                <div className="h-6 flex items-center gap-1 mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1 bg-emerald-200 rounded-full animate-pulse" style={{ height: `${Math.max(20, Math.random() * 100)}%`, animationDelay: `${i * 0.1}s` }} />
                  ))}
                  <div className="flex-1 ml-2 flex items-center gap-2">
                    <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: `${progress[3]}%` }} />
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold">0:35</span>
                  </div>
                </div>
                <p className="text-sm text-slate-700 font-normal leading-relaxed">
                  "Composed under a difficult scenario prompt. Structured response. Strong first impression."
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="flex-none w-[85%] sm:w-[60%] md:w-auto snap-center bg-slate-50 border border-slate-100 rounded-[2rem] p-6 shadow-sm flex flex-col justify-between group hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="mb-6 flex justify-between items-start">
                <div>
                  <span className="inline-block px-2.5 py-1 bg-amber-50 text-amber-600 rounded-full font-bold text-[10px] uppercase tracking-wider mb-2">IT HELPDESK CANDIDATE</span>
                  <p className="text-xs text-slate-500 font-semibold">Hyderabad | Fresher, B.Tech CSE</p>
                </div>
                <button onClick={() => playVideo(4)} className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform shadow-md">
                  {playingId === 4 ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                </button>
              </div>
              <div>
                <div className="h-6 flex items-center gap-1 mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1 bg-amber-200 rounded-full animate-pulse" style={{ height: `${Math.max(20, Math.random() * 100)}%`, animationDelay: `${i * 0.1}s` }} />
                  ))}
                  <div className="flex-1 ml-2 flex items-center gap-2">
                    <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full transition-all duration-300" style={{ width: `${progress[4]}%` }} />
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold">0:29</span>
                  </div>
                </div>
                <p className="text-sm text-slate-700 font-normal leading-relaxed">
                  "Methodical approach to the support scenario. Clear articulation. Did not guess — asked a clarifying question before answering."
                </p>
              </div>
            </div>

          </div>

          <p className="text-center text-slate-700 font-normal">Every candidate you receive is evaluated to the same standard. No exceptions.</p>
        </div>
      </motion.section>

      {/* SECTION 5: THE DEPLOYMENT PIPELINE (id="method") */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        id="method" className="py-16 md:py-24 bg-slate-50 rounded-[2rem] md:rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 mb-6 md:mb-12 border border-slate-100/60 shadow-inner">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8 md:mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Vetted talent in 48 hours. Here is exactly how.
            </h2>
          </div>

          {/* Concise 4-Column Grid */}
          <div className="hide-scrollbar flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative mb-8 md:mb-12 pb-2 md:pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            
            {/* Phase 1 */}
            <div className="flex-none w-[85%] sm:w-[60%] md:w-auto snap-center bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col group hover:-translate-y-1 transition-all duration-300">
              <div className="font-display font-black text-slate-200 text-4xl mb-4 group-hover:text-[#2563eb] transition-colors">01</div>
              <h3 className="font-bold text-slate-900 tracking-tight mb-2">WhatsApp Ingestion</h3>
              <p className="text-slate-500 text-sm leading-relaxed flex-1">
                Automated intake collects role preference and a voice note in under 4 minutes.
              </p>
            </div>

            {/* Phase 2 */}
            <div className="flex-none w-[85%] sm:w-[60%] md:w-auto snap-center bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col group hover:-translate-y-1 transition-all duration-300">
              <div className="font-display font-black text-slate-200 text-4xl mb-4 group-hover:text-[#2563eb] transition-colors">02</div>
              <h3 className="font-bold text-slate-900 tracking-tight mb-2">Tone & Logic Audit</h3>
              <p className="text-slate-500 text-sm leading-relaxed flex-1">
                Voice notes are evaluated. 70-80% of applicants are filtered before human review.
              </p>
            </div>

            {/* Phase 3 */}
            <div className="flex-none w-[85%] sm:w-[60%] md:w-auto snap-center bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col group hover:-translate-y-1 transition-all duration-300">
              <div className="font-display font-black text-slate-200 text-4xl mb-4 group-hover:text-[#2563eb] transition-colors">03</div>
              <h3 className="font-bold text-slate-900 tracking-tight mb-2">The Match</h3>
              <p className="text-slate-500 text-sm leading-relaxed flex-1">
                You receive 3-8 curated profiles matched to your brief, with voice notes attached.
              </p>
            </div>

            {/* Phase 4 */}
            <div className="flex-none w-[85%] sm:w-[60%] md:w-auto snap-center bg-white p-6 rounded-[2rem] border border-emerald-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] bg-gradient-to-br from-emerald-50/50 to-white flex flex-col group hover:-translate-y-1 transition-all duration-300">
              <div className="font-display font-black text-emerald-200 text-4xl mb-4 group-hover:text-emerald-500 transition-colors">04</div>
              <h3 className="font-bold text-slate-900 tracking-tight mb-2">Deployment</h3>
              <p className="text-slate-500 text-sm leading-relaxed flex-1">
                Candidate joins, 30-day clock starts. We ensure success on Days 7, 14, and 28.
              </p>
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
              <div className="text-4xl font-black text-[#2563eb] font-display">₹0</div>
              <div className="text-sm font-semibold text-slate-500 mt-1">Upfront cost to start</div>
            </div>

          </div>

        </div>
      </motion.section>

      {/* SECTION 6: THE 30-DAY GUARANTEE */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 md:py-24 bg-white">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8 md:mb-16">
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

              <div className="grid grid-cols-1 sm:grid-cols-6 gap-y-6 sm:gap-y-0 sm:gap-x-2 relative z-10">
                
                {/* Node 1 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-0 group/node">
                  <div className="w-12 h-12 sm:w-11 sm:h-11 bg-white border-2 border-slate-200 text-slate-500 font-bold text-[10px] sm:text-xs rounded-full flex items-center justify-center sm:mb-4 shadow-sm z-10 transition-all group-hover/node:border-slate-400 group-hover/node:text-slate-800">
                    D0
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-xs mb-0.5">Requirement</h4>
                    <p className="text-xs sm:text-[10px] text-slate-500 leading-tight font-normal">Audit approved</p>
                  </div>
                </div>

                {/* Node 2 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-0 group/node">
                  <div className="w-12 h-12 sm:w-11 sm:h-11 bg-white border-2 border-slate-200 text-slate-500 font-bold text-[10px] sm:text-xs rounded-full flex items-center justify-center sm:mb-4 shadow-sm z-10 transition-all group-hover/node:bg-[#2563eb] group-hover/node:text-white group-hover/node:border-[#2563eb]">
                    D1
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-xs mb-0.5">Joining</h4>
                    <p className="text-xs sm:text-[10px] text-slate-500 leading-tight font-normal">Agreement signed</p>
                  </div>
                </div>

                {/* Node 3 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-0 group/node">
                  <div className="w-12 h-12 sm:w-11 sm:h-11 bg-white border-2 border-slate-200 text-slate-500 font-bold text-[10px] sm:text-xs rounded-full flex items-center justify-center sm:mb-4 shadow-sm z-10 transition-all group-hover/node:border-slate-400 group-hover/node:text-slate-800">
                    D3
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-xs mb-0.5">Profiles Delivered</h4>
                    <p className="text-xs sm:text-[10px] text-slate-500 leading-tight font-normal">You receive curated shortlists with voice notes and written assessments for each candidate.</p>
                  </div>
                </div>

                {/* Node 4 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-0 group/node">
                  <div className="w-12 h-12 sm:w-11 sm:h-11 bg-white border-2 border-slate-200 text-slate-500 font-bold text-[10px] sm:text-xs rounded-full flex items-center justify-center sm:mb-4 shadow-sm z-10 transition-all group-hover/node:border-slate-400 group-hover/node:text-slate-800">
                    D7
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-xs mb-0.5">Candidate Confirmed</h4>
                    <p className="text-xs sm:text-[10px] text-slate-500 leading-tight font-normal">You select your candidate. Joining is scheduled and confirmed with Jovese.</p>
                  </div>
                </div>

                {/* Node 5 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-0 group/node">
                  <div className="w-12 h-12 sm:w-11 sm:h-11 bg-white border-2 border-[#2563eb]/50 text-[#2563eb]/80 font-bold text-[10px] sm:text-xs rounded-full flex items-center justify-center sm:mb-4 shadow-sm z-10 transition-all group-hover/node:border-[#2563eb] group-hover/node:text-[#2563eb]">
                    D15
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <h4 className="font-bold text-[#2563eb]/80 text-sm sm:text-xs mb-0.5">Midpoint Check</h4>
                    <p className="text-xs sm:text-[10px] text-slate-500 leading-tight font-normal">Quality check-in</p>
                  </div>
                </div>

                {/* Node 6 */}
                <div className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-0 group/node relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 -ml-[8px] sm:ml-0 sm:-mt-[18px] bg-emerald-500 text-white font-extrabold text-xl sm:text-2xl rounded-full flex shrink-0 items-center justify-center sm:mb-2 z-10 transition-transform group-hover/node:scale-110 shadow-[0_8px_30px_rgba(16,185,129,0.3)]">
                    D30
                  </div>
                  <div className="flex-1 sm:flex-none">
                    <h4 className="font-bold text-emerald-700 text-sm sm:text-base mb-0.5">Invoicing</h4>
                    <p className="text-xs sm:text-xs text-emerald-700/80 leading-tight font-semibold">We finally invoice</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Guarantee box - highlighted */}
          <div className="bg-[#2563eb]/5 border-2 border-[#2563eb]/30 p-8 sm:p-12 rounded-[2.5rem] mb-8 md:mb-12 shadow-sm text-center max-w-4xl mx-auto">
            <h3 className="font-display font-black text-2xl md:text-3xl text-slate-950 mb-4 text-center">
              The Replacement Guarantee
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
              If a placed candidate exits for any reason before completing 30 days, excluding documented misconduct by the employer, we replace them at no additional charge. The clock resets to Day 1 with the replacement candidate.
            </p>
          </div>

          {/* Three-point explainer */}
          <div className="grid md:grid-cols-3 gap-6 pt-8 text-left max-w-4xl mx-auto border-t border-slate-100">
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Day 30 Rationale</h4>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">Most early exits occur within three weeks. Billing is synced to true retention.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Employer Misconduct</h4>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">Guarantees are voided by non-payment or abuse, ensuring candidate safety.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Clock Activation</h4>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">The 30-day observation window strictly begins on the exact date of joining.</p>
            </div>
          </div>

        </div>
      </motion.section>

      {/* SECTION 7: TESTIMONIALS */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 md:py-24 bg-slate-50 border-y border-slate-100 rounded-[2rem] md:rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 mb-6 md:mb-12">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8 md:mb-16">
            <h2 className="font-display text-4xl font-extrabold text-slate-900">
              What our partners say.
            </h2>
          </div>

          <div className="hide-scrollbar flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12 pb-2 md:pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            {/* Testimonial 1 */}
            <div className="flex-none w-[85%] sm:w-[60%] md:w-auto snap-center bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed mb-6 italic">
                "We had been through three placement agencies in one year. The first shortlist from Jovese had better candidates than anything we had seen in 12 months of searching. The video screening is not a gimmick. It actually works."
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
            <div className="flex-none w-[85%] sm:w-[60%] md:w-auto snap-center bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed mb-6 italic">
                "Our 30-day attrition in the BPO team was running at 52%. Four months after moving our volume hiring to Jovese it is at 23%. The audit form process also forced us to examine what was broken on our own side."
              </p>
              <div>
                <div className="h-px bg-slate-100 my-4" />
                <div className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                  HR Manager
                </div>
                <div className="text-[11px] text-slate-400">
                  Customer Support Operations, Delhi NCR
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="flex-none w-[85%] sm:w-[60%] md:w-auto snap-center bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed mb-6 italic">
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

            {/* Testimonial 4 */}
            <div className="flex-none w-[85%] sm:w-[60%] md:w-auto snap-center bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed mb-6 italic">
                "We needed twelve junior QA associates in under three weeks. Three agencies sent us the same recycled profiles. Jovese sent us eight pre-screened candidates with voice notes. We hired six. Five are still with us at Month 4."
              </p>
              <div>
                <div className="h-px bg-slate-100 my-4" />
                <div className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                  Engineering Head
                </div>
                <div className="text-[11px] text-slate-400">
                  Mid-Tier IT Services Company, Hyderabad
                </div>
              </div>
            </div>

          </div>

          <div className="text-center font-semibold text-xs text-slate-400">
            Current partners include teams across NBFC telecalling, inside sales, hospitality operations, BPO customer support, and IT technical support.
          </div>

        </div>
      </motion.section>

      {/* SECTION 2: WAITLIST MECHANIC */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="py-12 md:py-20 bg-white">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
            Partnership spots are deliberately limited.
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal mb-8 max-w-2xl mx-auto">
            We cap active client partnerships to maintain strict candidate quality. Onboarding too many clients at once means diluted screening and broken promises. We do not do that.
          </p>
          <div className="bg-slate-50 text-slate-700 text-sm font-semibold py-3 px-6 rounded-xl border border-slate-200 inline-block mb-8">
            Applications are reviewed every Monday. New spots open when existing partner capacity stabilises.
          </div>
          <div>
            <Link 
              to="/clients" 
              className="inline-flex items-center gap-2 font-bold text-[#2563eb] hover:text-[#1d4ed8] transition-colors text-lg"
            >
              Submit your audit to get in the queue <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* SECTION 9: FAQ ACCORDION */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 md:py-24 bg-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            We know what you're thinking.
          </h2>
        </div>

        <div className="space-y-4">
          {faqData.slice(0, 3).map((faq, idx) => {
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
        
        <div className="mt-8 text-center">
          <Link
            to="/faq"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-slate-200 text-slate-600 font-bold text-sm tracking-wide hover:border-[#2563eb] hover:text-[#2563eb] transition-colors"
          >
            View all FAQs
          </Link>
        </div>
      </motion.section>

      {/* SECTION 8: FINAL CTA */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="py-8 md:py-12 mb-4 md:mb-8 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between border border-slate-800">
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#2563eb]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 text-center md:text-left mb-8 md:mb-0">
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
                Ready to partner?
              </h2>
              <p className="text-slate-400 font-normal text-sm sm:text-base">
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
      </motion.section>

    </div>
  );
}
