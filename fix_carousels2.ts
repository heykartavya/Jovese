import * as fs from 'fs';

let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

code = code.replace(/style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}\n/g, "style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>\n");

fs.writeFileSync('src/pages/Home.tsx', code);
