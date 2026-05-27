import { motion } from 'motion/react';
import { User, Briefcase, MapPin, FastForward } from 'lucide-react';

const candidates = [
  {
    role: "Outbound Sales Executive",
    experience: "3.5 Years",
    location: "Gurgaon",
    availability: "Immediate Joiner",
    highlights: ["Avg 120% Target Achievement", "B2B SaaS Experience"],
  },
  {
    role: "Insurance Unit Manager",
    experience: "6 Years",
    location: "Hyderabad",
    availability: "15 Days Notice",
    highlights: ["Managing Team of 15", "Life Insurance Certified"],
  },
  {
    role: "Telecalling Supervisor",
    experience: "4 Years",
    location: "Gurgaon",
    availability: "Immediate Joiner",
    highlights: ["Handled US Shifts", "Reduced team shrink by 18%"],
  },
  {
    role: "BPO Team Leader",
    experience: "5.5 Years",
    location: "Hyderabad",
    availability: "Immediate Joiner",
    highlights: ["Inbound CS Expert", "Six Sigma Yellow Belt"],
  },
  {
    role: "Senior Telesales Rep",
    experience: "2 Years",
    location: "Gurgaon",
    availability: "Serving Notice (7 Days)",
    highlights: ["Top 5% Performer 2023", "Fluent English & Hindi"],
  },
  {
    role: "Inside Sales Specialist",
    experience: "4.5 Years",
    location: "Hyderabad",
    availability: "Immediate Joiner",
    highlights: ["EdTech Sector", "CRM Power User (Salesforce)"],
  }
];

export default function TalentShowcase() {
  return (
    <section id="talent" className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
          >
            Live Talent Showcase
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            A sample of active, highly-placeable candidates ready to deploy. 
            Identities remain confidential until explicit mutual interest is confirmed.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl flex flex-col hover:border-blue-500/50 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
                  <User className="w-6 h-6 text-slate-400" />
                </div>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-medium">
                  Verified Profile
                </span>
              </div>
              
              <h3 className="font-display text-xl font-bold text-white mb-4">
                {candidate.role}
              </h3>
              
              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex items-center text-slate-300 text-sm">
                  <Briefcase className="w-4 h-4 mr-3 text-slate-500" />
                  {candidate.experience} Experience
                </div>
                <div className="flex items-center text-slate-300 text-sm">
                  <MapPin className="w-4 h-4 mr-3 text-slate-500" />
                  {candidate.location}
                </div>
                <div className="flex items-center text-slate-300 text-sm">
                  <FastForward className="w-4 h-4 mr-3 text-slate-500" />
                  {candidate.availability}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {candidate.highlights.map((highlight, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded text-xs">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full py-3 px-4 bg-white/5 hover:bg-blue-600 text-white border border-white/10 hover:border-blue-500 rounded-lg text-sm font-medium transition-all group-hover:shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)]">
                Request Full Profile
              </button>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-sm mb-4">Don't see the exact fit?</p>
          <a href="#contact" className="inline-flex text-blue-400 hover:text-blue-300 font-medium items-center gap-2 transition-colors">
            Tap into our private reserves <FastForward className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
