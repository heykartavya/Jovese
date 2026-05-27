import { motion } from 'motion/react';
import { ShieldCheck, Crosshair, BadgePercent, CheckCircle2 } from 'lucide-react';

export default function Solution() {
  const pillars = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
      title: "The 30-Day Survival Guarantee",
      description: "Our invoice is only generated on Day 31. If the candidate drops out, absconds, or is terminated in their first month, you owe us nothing. Zero excuses.",
      color: "emerald"
    },
    {
      icon: <Crosshair className="w-8 h-8 text-blue-600" />,
      title: "Most Placeable Candidate Network",
      description: "We don't rely on stale job board postings. We actively headhunt completely passive, high-performing candidates from your direct competitors.",
      color: "blue"
    },
    {
      icon: <BadgePercent className="w-8 h-8 text-indigo-600" />,
      title: "Zero Upfront Financial Risk",
      description: "No retainers. No setup fees. No hidden infrastructure costs. We operate on a pure, transparent contingency model aligned directly with your success.",
      color: "indigo"
    }
  ];

  return (
    <section id="solution" className="py-24 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              The Jovese Solution
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              We align our business model with your <em>business outcomes</em>, not just your interview schedules. Here is how we guarantee results for our partners in Gurgaon and Hyderabad.
            </p>
            
            <div className="space-y-4">
              {['Rigorous behavioral pre-screening', 'Direct access to decision-ready talent', 'Automated interview scheduling'].map((trait, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{trait}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-6">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15 }}
                className="group relative p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                      {pillar.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
