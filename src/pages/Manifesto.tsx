import { motion } from 'motion/react';
import { Target, Banknote, ShieldAlert, FileWarning, Workflow } from 'lucide-react';

export default function Manifesto() {
  return (
    <div className="pb-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="pt-8 md:pt-12 pb-16 md:pb-24 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6"
        >
          The Manifesto
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto"
        >
          The volume recruitment industry is fundamentally broken. Here is our stance on how to fix it.
        </motion.p>
      </section>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          {
            icon: <FileWarning className="w-6 h-6 text-indigo-500" />,
            title: "Tenet One",
            desc: "Resumes are fiction for sales and frontline roles. Tone and communication are reality.",
            bg: "bg-indigo-50"
          },
          {
            icon: <Banknote className="w-6 h-6 text-[#ff5a36]" />,
            title: "Tenet Two",
            desc: "Agencies that charge just for scheduling interviews are draining your budget.",
            bg: "bg-orange-50"
          },
          {
            icon: <Workflow className="w-6 h-6 text-emerald-500" />,
            title: "Tenet Three",
            desc: "High attrition is a sourcing problem, not an operational problem.",
            bg: "bg-emerald-50"
          }
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
          >
            <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-6`}>
              {item.icon}
            </div>
            <h3 className="font-bold text-slate-900 text-xl mb-3 leading-tight">{item.title}</h3>
            <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-slate-900 text-white rounded-[3rem] p-10 md:p-16 max-w-5xl mx-auto shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff5a36] rounded-full blur-[100px] opacity-10 pointer-events-none" />
        
        <h2 className="text-3xl md:text-4xl font-bold mb-8 font-display text-center">The Operation</h2>
        <div className="space-y-6 text-slate-300 text-lg leading-relaxed max-w-3xl mx-auto font-medium">
          <p>
            Building intelligent automations and focusing entirely on 30-day survival creates a talent pipeline that actually stays. We don't rely on guesswork.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mt-8 text-left">
            <h3 className="text-xl font-bold text-white mb-4">The Audio Filter</h3>
            <p className="text-slate-400 mb-6 text-base">To instantly weed out candidates lacking basic qualifications for sales and telecalling roles, our WhatsApp bot mandates audio responses to specific stress-test scenarios, such as:</p>
            <ul className="space-y-4 text-base">
              <li className="flex gap-3 items-start">
                 <ShieldAlert className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
                 <span>"A customer is screaming at you because their delivery is 3 days late. Record a 30-second response on how you de-escalate this."</span>
              </li>
               <li className="flex gap-3 items-start">
                 <ShieldAlert className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
                 <span>"Pitch me a credit card upgrade in 45 seconds to a customer who just stated they never use credit cards."</span>
              </li>
              <li className="flex gap-3 items-start">
                 <ShieldAlert className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
                 <span>"Explain your biggest failure in a previous role and how you communicated it to your manager."</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Expanded Vision / Origin Section */}
      <section className="mt-24 grid md:grid-cols-2 gap-12 max-w-5xl mx-auto px-4">
         <div>
            <h3 className="font-display text-3xl font-bold text-slate-900 mb-6">The Origin Story</h3>
            <div className="w-16 h-1 bg-[#ff5a36] mb-6 rounded-full"></div>
            <p className="text-slate-500 leading-relaxed font-medium mb-4">
              We didn't start in recruitment. We started in operational strategy. After running massive BPO floors and leading sales operations, we calculated the millions of dollars bleeding out annually due to empty seats and bad hires.
            </p>
            <p className="text-slate-500 leading-relaxed font-medium">
              We realized the existing vendor ecosystem was too lazy to solve the structural issue—they charged for the joiner, not the survivor. So we built an agency that forces accountability. Jovese wasn't built to be an agency. It was built to solve our own problem.
            </p>
         </div>
         <div>
            <h3 className="font-display text-3xl font-bold text-slate-900 mb-6">The Epicenter</h3>
            <div className="w-16 h-1 bg-indigo-500 mb-6 rounded-full"></div>
            <p className="text-slate-500 leading-relaxed font-medium mb-4">
              We do not source for the entire country. We are hyper-focused on the two largest volume hiring hubs in India: <strong>Gurgaon</strong> and <strong>Hyderabad</strong>.
            </p>
            <p className="text-slate-500 leading-relaxed font-medium">
              By maintaining deep talent networks, linguistic diversity targeting, and localized operational understanding in these two specific spheres, we generate unparalleled velocity for client fulfillment compared to generalized national agencies.
            </p>
         </div>
      </section>
    </div>
  );
}
