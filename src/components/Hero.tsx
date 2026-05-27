import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white pt-24 pb-32">
      {/* Subtle background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] rounded-full bg-emerald-600/10 blur-[100px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-blue-200 mb-8 backdrop-blur-sm"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Gurgaon & Hyderabad's Elite Contingency Firm</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 max-w-4xl leading-[1.1]"
        >
          Stop paying for attrition. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Hire talent that stays.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-light"
        >
          Zero risk volume hiring for the BPO, Telecalling, and Insurance Sales sectors. 
          We only invoice after your new hire survives <strong className="text-white font-medium">30 days</strong> on the job.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all hover:shadow-[0_0_40px_-10px_rgba(37,99,235,0.7)] group"
          >
            Challenge Us With a Dead Requisition
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 pointer-events-none"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-slate-500 to-transparent" />
      </motion.div>
    </section>
  );
}
