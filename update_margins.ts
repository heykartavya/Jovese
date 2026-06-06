import * as fs from 'fs';

let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

code = code.replace(/text-center mb-16/g, 'text-center mb-8 md:mb-16');
code = code.replace(/gap-12 items-center mt-4 md:mt-12/g, 'gap-8 md:gap-12 items-center mt-4 md:mt-12');
code = code.replace(/gap-12 items-center mb-16/g, 'gap-8 md:gap-12 items-center mb-8 md:mb-16');
code = code.replace(/grid md:grid-cols-3 gap-6 mb-12/g, 'grid md:grid-cols-3 gap-6 mb-8 md:mb-12');
code = code.replace(/grid grid-cols-2 gap-8/g, 'grid grid-cols-2 gap-6 md:gap-8');
code = code.replace(/div className="grid sm:grid-cols-2 gap-12"/g, 'div className="grid sm:grid-cols-2 gap-8 md:gap-12"');
code = code.replace(/mb-12/g, 'mb-8 md:mb-12');

fs.writeFileSync('src/pages/Home.tsx', code);
