import { motion } from 'motion/react';
import { AlertCircle, TrendingDown, Users } from 'lucide-react';

export default function Problem() {
  return (
    <section id="problem" className="py-24 bg-slate-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-display text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6"
          >
            Your current vendors are failing you.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            Standard recruitment agencies are optimized for <em>interview volume</em> and day-one joining metrics. 
            They pass the burden of the true systemic issue entirely onto you: <strong>90-day retention.</strong>
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
             {
               icon: <TrendingDown className="w-6 h-6 text-red-500" />,
               title: "The Cost of Empty Seats",
               description: "In BPO and Insurance sales, an empty seat isn't just an HR problem. It's direct, calculable lost revenue every single hour.",
               delay: 0.2
             },
             {
               icon: <AlertCircle className="w-6 h-6 text-amber-500" />,
               title: "Volume Over Quality",
               description: "Legacy empanelled vendors flood your pipeline with candidates who look good on paper but lack the resilience for high-pressure sales floors.",
               delay: 0.3
             },
             {
               icon: <Users className="w-6 h-6 text-blue-500" />,
               title: "The 30-Day Churn Trap",
               description: "Paying agency fees for a candidate who quits in week 3 destroys your acquisition budget and demoralizes your operational leaders.",
               delay: 0.4
             }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: item.delay }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center mb-6 border border-slate-100">
                {item.icon}
              </div>
              <h3 className="font-display text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
