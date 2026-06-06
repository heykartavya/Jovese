import * as fs from 'fs';

let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

code = code.replace(/mb-6 md:mb-8 md:mb-12/g, 'mb-6 md:mb-12');
code = code.replace(/mb-8 md:mb-8 md:mb-12/g, 'mb-8 md:mb-12');

fs.writeFileSync('src/pages/Home.tsx', code);
