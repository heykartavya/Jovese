import * as fs from 'fs';

let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

code = code.replace(/<div className="pb-24">/g, '<div className="pb-12 md:pb-24">');

fs.writeFileSync('src/pages/Home.tsx', code);
