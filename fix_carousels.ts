import * as fs from 'fs';

let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// The Video Advantage section
code = code.replace(
  /{[/|*]* Innovative Video Cards Grid \*\/}\n\s*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 md:mb-12">/g,
  `{/* Innovative Video Cards Grid */}
          <div className="hide-scrollbar flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12 pb-2 md:pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}`
);

// The Deployment Pipeline section
code = code.replace(
  /{[/|*]* Concise 4-Column Grid \*\/}\n\s*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative mb-8 md:mb-12">/g,
  `{/* Concise 4-Column Grid */}
          <div className="hide-scrollbar flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative mb-8 md:mb-12 pb-2 md:pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}`
);

function addFlexNone(classNameValue) {
  if(classNameValue.includes('flex-none w-[85%]')) return classNameValue;
  return classNameValue.replace('className="', 'className="flex-none w-[85%] sm:w-[60%] md:w-auto snap-center ');
}

let index1 = code.indexOf('{/* Innovative Video Cards Grid */}');
let index2 = code.indexOf('{/* Three Summary Stats */}');
if(index1 !== -1 && index2 !== -1) {
  let section = code.substring(index1, index2);
  section = section.replace(/className="bg-(white|slate-50) (.*?)"/g, (match) => {
    if(match.includes('rounded-[2rem]')) {
      return addFlexNone(match);
    }
    return match;
  });
  code = code.substring(0, index1) + section + code.substring(index2);
}

fs.writeFileSync('src/pages/Home.tsx', code);
