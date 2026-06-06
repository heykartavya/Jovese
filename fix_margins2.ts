import * as fs from 'fs';

let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

code = code.replace(/mb-16 space-y-6/g, 'mb-8 md:mb-16 space-y-6');
code = code.replace(/mb-16 relative/g, 'mb-8 md:mb-16 relative');

fs.writeFileSync('src/pages/Home.tsx', code);
