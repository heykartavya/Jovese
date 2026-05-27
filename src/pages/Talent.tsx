import { motion } from 'motion/react';
import { Mic, MessageSquare, Zap, QrCode } from 'lucide-react';

export default function Talent() {
  return (
    <div className="pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="py-16 md:py-24 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6"
        >
          For Talent
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium"
        >
          Stop uploading your resume into black holes. Let your voice do the talking.
        </motion.p>
      </section>

      <section className="grid lg:grid-cols-2 gap-12 items-center">
        {/* The Process */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {[
            {
              icon: <MessageSquare className="w-6 h-6 text-blue-500" />,
              title: "Step 1: Text our WhatsApp bot",
              desc: "No apps to download. No long forms to fill out. Just start a conversation.",
              bg: "bg-[#e0e7ff]"
            },
            {
              icon: <Mic className="w-6 h-6 text-[#ff5a36]" />,
              title: "Step 2: Record a voice note",
              desc: "Record a brief voice note introducing yourself, your previous sales or customer service experience, and how you handle client interactions.",
              bg: "bg-[#ffedd5]"
            },
             {
              icon: <Zap className="w-6 h-6 text-emerald-500" />,
              title: "Step 3: Get matched",
              desc: "If your communication is clear, we match you with our partner companies within 48 hours.",
              bg: "bg-[#dcfce7]"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex gap-6 items-center border border-slate-100">
               <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                 {item.icon}
               </div>
               <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
               </div>
            </div>
          ))}
        </motion.div>

        {/* Action QR */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden flex flex-col items-center shadow-2xl"
        >
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#ff5a36] rounded-full blur-[100px] opacity-20" />
          
          <h3 className="text-3xl font-extrabold mb-4 font-display">Launch Intake</h3>
          <p className="text-gray-400 mb-10">Scan the code or click the button below to start your automated interview.</p>
          
          <div className="bg-white p-4 rounded-3xl mb-8 border-4 border-slate-800">
            <QrCode className="w-48 h-48 text-slate-900" />
          </div>

          <button className="w-full bg-[#25D366] hover:bg-[#20BE5C] text-white font-bold py-4 rounded-2xl transition-all shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] flex items-center justify-center gap-2">
             Open WhatsApp Bot
          </button>
        </motion.div>
      </section>
    </div>
  );
}
