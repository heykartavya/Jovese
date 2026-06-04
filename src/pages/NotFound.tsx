import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <span className="text-xs font-bold text-slate-400 tracking-widest uppercase block mb-6">
        PAGE NOT FOUND
      </span>
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 mb-6 tracking-tight leading-tight">
        This page does not exist.<br />
        Your hiring problem does.
      </h1>
      <p className="text-slate-500 font-medium text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed">
        The URL you followed is broken. The cost of an empty seat on your telecalling floor is not.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link 
          to="/clients" 
          className="bg-[#2563eb] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md hover:bg-blue-600 transition-colors w-full sm:w-auto text-center"
        >
          Apply for Client Partnership &rarr;
        </Link>
        <Link 
          to="/" 
          className="bg-white border border-slate-200 text-slate-700 px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors w-full sm:w-auto text-center"
        >
          Go to Homepage &rarr;
        </Link>
      </div>
    </div>
  );
}