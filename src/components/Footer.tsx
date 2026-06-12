import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800 mt-auto w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link 
            to="/" 
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="text-3xl font-display font-extrabold tracking-tighter text-white mb-6 block"
          >
            Jovese
          </Link>
          <p className="max-w-sm mb-8 text-slate-400 leading-relaxed font-semibold text-xs sm:text-sm">
            Precision volume hiring for telecalling, sales, BPO, front office, and hospitality operations. 
            We screen for reliability and communication.
          </p>
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <span className="font-bold text-white text-sm">in</span>
             </div>
             <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <span className="font-bold text-white text-sm">𝕏</span>
             </div>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 font-display text-sm tracking-wider uppercase">Navigation</h4>
          <ul className="space-y-4 text-xs sm:text-sm font-semibold">
            <li><Link to="/#method" className="hover:text-[#2563eb] transition-colors">The Method</Link></li>
            <li><Link to="/#bleed" className="hover:text-[#2563eb] transition-colors">The Bleed</Link></li>
            <li><Link to="/clients" className="hover:text-[#2563eb] transition-colors">Client Application</Link></li>
            <li><Link to="/talent" className="hover:text-[#2563eb] transition-colors">Talent Portal</Link></li>
            <li><Link to="/about" className="hover:text-[#2563eb] transition-colors">The Manifesto</Link></li>
            <li><Link to="/campus-drives" className="hover:text-[#2563eb] transition-colors">Campus Drives</Link></li>
            <li><Link to="/faq" className="hover:text-[#2563eb] transition-colors">FAQ</Link></li>
          </ul>
        </div>

        <div>
           <h4 className="text-white font-bold mb-6 font-display text-sm tracking-wider uppercase">Contact</h4>
           <ul className="space-y-4">
            <li className="flex flex-col text-xs sm:text-sm font-semibold">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Email</span>
              <a href="mailto:partnerships@jovese.com" className="hover:text-white transition-colors mb-1">partnerships@jovese.com</a>
              <a href="mailto:ceo@jovese.com" className="hover:text-white transition-colors">ceo@jovese.com</a>
            </li>
            <li className="flex flex-col text-xs sm:text-sm font-semibold">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Locations</span>
              <span className="text-slate-300">Building no.9, Raheja Mindspace IT Park,</span>
              <span className="text-slate-300">Mindspace - Madhapur road, HITEC city,</span>
              <span className="text-slate-300">Telangana, 500079</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/10 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Jovese. All rights reserved.</p>
        <div className="flex gap-6 font-semibold">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
