import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile nav when location changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  const isMethodActive = location.pathname === '/' && location.hash === '#method';
  const isBleedActive = location.pathname === '/' && location.hash === '#bleed';

  return (
    <>
      <nav className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4">
        <div 
          className={`flex items-center justify-between gap-4 p-2 w-full max-w-5xl rounded-full transition-all duration-500 border border-white/60 ${
            scrolled || mobileOpen
              ? 'bg-white/90 backdrop-blur-xl shadow-[0_10px_30px_rgb(0,0,0,0.1)]' 
              : 'bg-white/40 md:bg-transparent md:border-transparent'
          }`}
        >
          {/* Logo */}
          <Link 
            to="/" 
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex-shrink-0 flex items-center pl-3 md:pl-4 cursor-pointer group"
          >
            <div className="font-display font-extrabold text-lg md:text-xl tracking-tighter text-slate-900 group-hover:opacity-80 transition-opacity whitespace-nowrap">
              Jovese
            </div>
          </Link>

          {/* Desktop Center Links */}
          <div className="hidden md:flex items-center gap-1 md:gap-2">
            <a 
              href="#method" 
              onClick={(e) => handleAnchorClick(e, 'method')}
              className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                isMethodActive ? 'text-slate-900 bg-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              The Method
            </a>
            <a 
              href="#bleed" 
              onClick={(e) => handleAnchorClick(e, 'bleed')}
              className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                isBleedActive ? 'text-slate-900 bg-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              The Bleed
            </a>
            <Link 
              to="/talent" 
              className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                location.pathname === '/talent' ? 'text-slate-900 bg-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              Talent Portal
            </Link>
            <Link 
              to="/about" 
              className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                location.pathname === '/about' || location.pathname === '/manifesto' ? 'text-slate-900 bg-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              The Manifesto
            </Link>
          </div>

          {/* Right CTA / Mobile Toggle */}
          <div className="flex items-center gap-2 pr-2">
            {/* Desktop Login Link */}
            <Link 
              to="/login"
              className="hidden md:inline-flex items-center px-4 py-2 rounded-full text-xs md:text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              Log in
            </Link>

            {/* Desktop Apply CTA */}
            <Link 
              to="/clients" 
              className="hidden sm:inline-flex whitespace-nowrap items-center justify-center px-5 py-2 md:py-2.5 rounded-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white text-xs md:text-sm font-semibold transition-all group shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] relative overflow-hidden z-10"
            >
              <span className="relative z-10">Apply for Partnership</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </Link>

            {/* Mobile Apply CTA (appears as "Apply" to save space) */}
            <Link 
              to="/clients" 
              className="sm:hidden whitespace-nowrap inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-white text-[11px] font-semibold transition-all shadow-sm"
            >
              Apply
            </Link>

            {/* Mobile Burger Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-800"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Folder Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col pt-24 px-6 pb-8 md:hidden">
          <div className="flex flex-col gap-5 text-left flex-grow justify-center">
            <a 
              href="#method" 
              onClick={(e) => handleAnchorClick(e, 'method')}
              className="text-2xl font-display font-bold text-slate-800 hover:text-[#2563eb] transition-colors py-2 border-b border-slate-100"
            >
              The Method
            </a>
            <a 
              href="#bleed" 
              onClick={(e) => handleAnchorClick(e, 'bleed')}
              className="text-2xl font-display font-bold text-slate-800 hover:text-[#2563eb] transition-colors py-2 border-b border-slate-100"
            >
              The Bleed
            </a>
            <Link 
              to="/talent" 
              className="text-2xl font-display font-bold text-slate-800 hover:text-[#2563eb] transition-colors py-2 border-b border-slate-100"
            >
              Talent Portal
            </Link>
            <Link 
              to="/about" 
              className="text-2xl font-display font-bold text-slate-800 hover:text-[#2563eb] transition-colors py-2 border-b border-slate-100"
            >
              The Manifesto
            </Link>
            <Link 
              to="/clients" 
              className="text-2xl font-display font-bold text-slate-800 hover:text-[#2563eb] transition-colors py-2 border-b border-slate-100"
            >
              Apply for Partnership
            </Link>
            <Link 
              to="/login" 
              className="text-2xl font-display font-bold text-slate-800 hover:text-[#2563eb] transition-colors py-2 border-b border-slate-100"
            >
              Log in
            </Link>
          </div>

          {/* WhatsApp Talent CTA at the bottom */}
          <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col items-center">
            <p className="text-xs text-slate-400 font-medium mb-3 tracking-wider uppercase">Are you a Candidate?</p>
            <a 
              href="https://wa.me/919999999999?text=Hi%20Jovese,%20I'm%20interested%20in%20applying!" 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="w-full text-center py-4 bg-[#25D366] hover:bg-[#20BE5C] text-white font-bold rounded-2xl transition-all shadow-[0_4px_14px_rgba(37,211,102,0.3)] flex items-center justify-center gap-2"
            >
              Apply via WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
