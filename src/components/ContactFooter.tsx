import { motion } from 'motion/react';
import { Send, MapPin, Mail } from 'lucide-react';
import { useState } from 'react';

export default function ContactFooter() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <footer id="contact" className="bg-slate-950 text-white relative overflow-hidden border-t border-slate-900">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/20 to-transparent pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left Column - Copy & Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to stop bleeding headcount?
            </h2>
            <p className="text-lg text-slate-400 mb-12 max-w-lg">
              Send us your most difficult, aging requisition. Give us 7 days to present profiles standard agencies can't find. 
              Remember: <strong className="text-white font-medium">You pay nothing</strong> until they survive 30 days.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 text-slate-300">
                <MapPin className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-white mb-1">Corporate Offices</h4>
                  <p>Cyber City, Gurugram, Haryana</p>
                  <p>HITEC City, Hyderabad, Telangana</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-slate-300">
                <Mail className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-white mb-1">Direct Inquiries</h4>
                  <p>partnerships@jovese.com</p>
                </div>
              </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-slate-800 text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Jovese Consultancy. All rights reserved.
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="bg-slate-900 p-8 md:p-10 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
              {submitted ? (
                <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center text-center p-8 z-10">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                    <Send className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">Challenge Accepted.</h3>
                  <p className="text-slate-400">Our senior partners will review your requisition and contact you within 2 business hours.</p>
                </div>
              ) : null}

              <h3 className="font-display text-2xl font-bold text-white mb-6">Start The Challenge</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-slate-400">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-600"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium text-slate-400">Company Name</label>
                    <input 
                      type="text" 
                      id="company" 
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-600"
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-400">Work Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-600"
                    placeholder="john@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium text-slate-400">Hardest Role to Fill Right Now</label>
                  <select 
                    id="role"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="" disabled selected>Select a category...</option>
                    <option value="outbound">Outbound Telecalling Executive</option>
                    <option value="inbound">Inbound Customer Service</option>
                    <option value="insurance">Insurance Sales Representative</option>
                    <option value="teamlead">Team Leader / Supervisor</option>
                    <option value="other">Other Specizalized Role</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-4 rounded-lg mt-4 transition-all hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)] flex justify-center items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      Send the Dead Requisition Challenge
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </footer>
  );
}
