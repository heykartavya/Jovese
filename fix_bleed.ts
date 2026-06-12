import * as fs from 'fs';

let content = fs.readFileSync('src/pages/Home.tsx', 'utf-8');

// 1. Fix formatINRValue
const oldFormat = `  const formatINRValue = (val: number) => {
    if (val >= 10000000) {
      return '₹' + (val / 10000000).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + ' Crores';
    }
    if (val >= 100000) {
      return '₹' + (val / 100000).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + ' Lakhs';
    }
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };`;

const newFormat = `  const formatINRValue = (val: number) => {
    const removeSpaces = (numStr: string) => numStr.replace(/\\s/g, '').replace(/\\u202F/g, '').replace(/\\u00A0/g, '');
    if (val >= 10000000) {
      return '₹' + removeSpaces((val / 10000000).toLocaleString('en-IN', { maximumFractionDigits: 2 })) + ' Crores';
    }
    if (val >= 100000) {
      return '₹' + removeSpaces((val / 100000).toLocaleString('en-IN', { maximumFractionDigits: 2 })) + ' Lakhs';
    }
    return '₹' + removeSpaces(Math.round(val).toLocaleString('en-IN'));
  };`;

content = content.replace(oldFormat, newFormat);

// 2. Change font-mono to font-display in all 4 cards
content = content.replace(/className="text-3xl font-black text-slate-900 font-mono tracking-tight"/g, 'className="text-3xl font-black text-slate-900 font-display tracking-tight"');
content = content.replace(/className="text-3xl lg:text-4xl font-black text-white font-mono tracking-tight drop-shadow-md"/g, 'className="text-3xl lg:text-4xl font-black text-white font-display tracking-tight"');

// 3. Fix Card 4 styles
const oldCard4 = `{/* Card 4 - highlighted savings */}
                    <div className="bg-gradient-to-br from-[#2563eb] to-indigo-600 border border-transparent p-6 rounded-2xl flex flex-col justify-between text-white shadow-xl group hover:shadow-2xl hover:-translate-y-0.5 transition-all">
                      <div className="text-[11px] text-blue-200 uppercase font-bold tracking-wider mb-4 leading-relaxed">
                        Est. Annual Saving With Jovese
                      </div>
                      <div>
                        <div className="text-3xl lg:text-4xl font-black text-white font-display tracking-tight">
                          {formatINRValue(calculatedOutputs.annualSaving)}
                        </div>
                        <div className="text-[10px] text-blue-200 mt-2 font-medium">Based on 30-day retention</div>
                      </div>
                    </div>`;

const newCard4 = `{/* Card 4 - highlighted savings */}
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-[1.25rem] flex flex-col justify-between text-white">
                      <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-4 leading-relaxed">
                        Est. Annual Saving With Jovese
                      </div>
                      <div>
                        <div className="text-3xl lg:text-4xl font-black text-white font-display tracking-tight">
                          {formatINRValue(calculatedOutputs.annualSaving)}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-2 font-medium">Based on 30-day retention</div>
                      </div>
                    </div>`;

content = content.replace(oldCard4, newCard4);

fs.writeFileSync('src/pages/Home.tsx', content);
