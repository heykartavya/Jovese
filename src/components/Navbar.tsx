import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className={`flex items-center gap-2 md:gap-6 p-2 w-full max-w-4xl rounded-full transition-all duration-500 backdrop-blur-xl border border-white/60 overflow-x-auto no-scrollbar ${scrolled ? 'bg-white/80 shadow-[0_10px_30px_rgb(0,0,0,0.1)]' : 'bg-white/60 shadow-sm'}`}>
        
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 flex items-center gap-2 pl-2 md:pl-4 cursor-pointer group">
          <div className="font-display font-extrabold text-lg md:text-xl tracking-tighter text-slate-900 group-hover:opacity-80 transition-opacity">
            Jovese
          </div>
        </Link>

        {/* Center Links */}
        <div className="flex items-center gap-1">
          <Link to="/" className={`flex-shrink-0 px-3 md:px-4 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all ${location.pathname === '/' ? 'text-slate-900 bg-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}>The Method</Link>
          <Link to="/clients" className={`flex-shrink-0 px-3 md:px-4 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all ${location.pathname === '/clients' ? 'text-slate-900 bg-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}>Client Application</Link>
          <Link to="/talent" className={`flex-shrink-0 px-3 md:px-4 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all ${location.pathname === '/talent' ? 'text-slate-900 bg-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}>Talent Portal</Link>
          <Link to="/manifesto" className={`flex-shrink-0 px-3 md:px-4 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all ${location.pathname === '/manifesto' ? 'text-slate-900 bg-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}>The Manifesto</Link>
        </div>

        {/* Right CTA */}
        <div className="flex-shrink-0 pl-1 pr-1 mr-2 md:mr-0">
          <Link to="/clients" className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs md:text-sm font-medium transition-all group shadow-sm">
            Apply
          </Link>
        </div>
      </div>
    </nav>
  );
}
