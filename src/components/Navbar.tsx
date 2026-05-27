import { ArrowRight } from 'lucide-react';
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
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className={`flex items-center gap-6 p-2 rounded-full transition-all duration-300 ${scrolled ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)]' : 'bg-white/80 backdrop-blur-md shadow-sm border border-slate-100'}`}>
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 pl-4 cursor-pointer group">
          <div className="font-display font-extrabold text-xl tracking-tighter text-slate-900 group-hover:opacity-80 transition-opacity">
            Jovese
          </div>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-1">
          <Link to="/" className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${location.pathname === '/' ? 'text-slate-900 bg-slate-100' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>The Method</Link>
          <Link to="/clients" className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${location.pathname === '/clients' ? 'text-slate-900 bg-slate-100' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>Client Application</Link>
          <Link to="/talent" className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${location.pathname === '/talent' ? 'text-slate-900 bg-slate-100' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>Talent Portal</Link>
          <Link to="/manifesto" className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${location.pathname === '/manifesto' ? 'text-slate-900 bg-slate-100' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>The Manifesto</Link>
        </div>

        {/* Right CTA */}
        <div className="hidden md:block pl-2">
          <Link to="/clients" className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition-all group shadow-sm">
            Apply for Partnership
          </Link>
        </div>

      </div>
    </nav>
  );
}
