import * as fs from 'fs';

let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Domains We Dominate
code = code.replace(
  /<div className="grid md:grid-cols-4 gap-6">/g,
  `<div className="hide-scrollbar flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-4 gap-4 md:gap-6 pb-2 md:pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>`
);

code = code.replace(
  /className="bg-white border border-slate-200 rounded-\[2rem\] p-6 shadow-sm hover:shadow-md transition-shadow group"/g,
  `className="flex-none w-[85%] sm:w-[60%] md:w-auto snap-center bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow group"`
);

// We also have Junior IT roles below that
code = code.replace(
  /<div className="grid md:grid-cols-3 gap-6">/g,
  `<div className="hide-scrollbar flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-4 md:gap-6 pb-2 md:pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>`
);

fs.writeFileSync('src/pages/Home.tsx', code);
