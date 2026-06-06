import * as fs from 'fs';

let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Campus drives grid
code = code.replace(
  /<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 text-left">/g,
  `<div className="hide-scrollbar flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 pb-2 md:pb-0 text-left" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>`
);

function addFlexNoneCampus(classNameValue) {
  if(classNameValue.includes('flex-none w-[85%]')) return classNameValue;
  return classNameValue.replace('className="', 'className="flex-none w-[85%] sm:w-[60%] md:w-auto snap-center ');
}

let index1 = code.indexOf('{/* CAMPUS PLACEMENT DRIVES */}');
let index2 = code.indexOf('{/* SECTION 3: THE FLEED (id="bleed") */}');
if(index1 !== -1 && index2 !== -1) {
  let section = code.substring(index1, index2);
  section = section.replace(/className="bg-(slate-800\/50|white) (.*?)"/g, (match) => {
    if(match.includes('rounded-[1.5rem] md:rounded-[2rem]')) {
      return addFlexNoneCampus(match);
    }
    return match;
  });
  code = code.substring(0, index1) + section + code.substring(index2);
}

fs.writeFileSync('src/pages/Home.tsx', code);
