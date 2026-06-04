import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Settings, 
  Bell, 
  Search,
  CheckCircle2,
  XCircle,
  Play,
  Receipt,
  DownloadCloud,
  Clock
} from 'lucide-react';
import ClientDashboard from '../components/ClientDashboard';

export default function RecruiterPortal() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'candidates' | 'invoicing'>('dashboard');

  const candidatesReview = [
    {
      id: "C-9428",
      name: "Arjun Mehta",
      role: "BPO Voice Process",
      experience: "2.4 Yrs",
      status: "Awaiting Client Review",
      audioReady: true,
      matchScore: 92
    },
    {
      id: "C-9431",
      name: "Sneha Reddy",
      role: "BPO Voice Process",
      experience: "1.2 Yrs",
      status: "Awaiting Client Review",
      audioReady: true,
      matchScore: 88
    },
    {
      id: "C-8812",
      name: "Rohan K.",
      role: "Inside Sales Exec",
      experience: "3.0 Yrs",
      status: "Interview Scheduled",
      audioReady: true,
      matchScore: 95
    }
  ];

  const invoices = [
    {
      id: "INV-2023-08",
      candidate: "Manoj Kumar",
      role: "BPO Voice Process",
      joinedDate: "12 Sep 2023",
      amount: "₹18,000",
      status: "Pending (Day 18/30)",
      dueDate: "12 Oct 2023"
    },
    {
      id: "INV-2023-07",
      candidate: "Priya S.",
      role: "Inside Sales Exec",
      joinedDate: "05 Sep 2023",
      amount: "₹24,000",
      status: "Invoice Generated",
      dueDate: "05 Oct 2023"
    },
    {
      id: "INV-2023-04",
      candidate: "Rahul V.",
      role: "BPO Voice Process",
      joinedDate: "10 Aug 2023",
      amount: "₹18,000",
      status: "Paid",
      dueDate: "10 Sep 2023"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-20">
      
      {/* Portal Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <span className="font-display font-extrabold text-xl text-slate-900 tracking-tighter cursor-pointer" onClick={() => navigate('/')}>
                Jovese <span className="text-slate-400 font-medium text-sm ml-2 hidden sm:inline-block">Recruiter Portal</span>
              </span>
              
              <nav className="hidden md:flex items-center gap-1">
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'dashboard' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab('candidates')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'candidates' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                >
                  Action Required
                  <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">2</span>
                </button>
                <button 
                  onClick={() => setActiveTab('invoicing')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'invoicing' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                >
                  Invoicing & Payments
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 border-l border-slate-100 pl-4 sm:pl-6">
              <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors hidden sm:block">
                <Settings className="w-5 h-5" />
              </button>
              
              <div className="h-8 w-px bg-slate-200 hidden sm:block mx-1"></div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                  SJ
                </div>
                <div className="hidden md:block text-left cursor-pointer">
                  <div className="text-sm font-bold text-slate-900 leading-none">Sarah Jenkins</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-1">TechCorp India</div>
                </div>
              </div>

              <button 
                onClick={() => navigate('/login')}
                className="ml-2 p-2 text-slate-400 hover:text-red-500 transition-colors tooltip"
                title="Log out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Mobile Navigation */}
        <div className="flex md:hidden bg-white p-1 rounded-xl shadow-sm border border-slate-200 mb-6">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'dashboard' ? 'bg-slate-100 text-slate-900' : 'text-slate-500'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('candidates')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'candidates' ? 'bg-slate-100 text-slate-900' : 'text-slate-500'}`}
          >
            Action Required
            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">2</span>
          </button>
          <button 
            onClick={() => setActiveTab('invoicing')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'invoicing' ? 'bg-slate-100 text-slate-900' : 'text-slate-500'}`}
          >
            Invoicing
          </button>
        </div>

        {activeTab === 'dashboard' ? (
          <ClientDashboard />
        ) : activeTab === 'candidates' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-display font-bold text-slate-900">Profiles Awaiting Review</h2>
                <p className="text-sm text-slate-500 font-medium">Please review these candidates within 24 hours to maintain SLA.</p>
              </div>
              <div className="relative relative w-full sm:w-auto">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search candidates..." 
                  className="w-full sm:w-64 pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider font-bold text-slate-500">
                      <th className="px-6 py-4">Candidate</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Match Score</th>
                      <th className="px-6 py-4">Audio Eval</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {candidatesReview.map((candidate, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-bold text-sm text-slate-900">{candidate.name}</div>
                          <div className="text-xs text-slate-500 font-medium mt-0.5">{candidate.id} • {candidate.experience}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-slate-700">{candidate.role}</div>
                          <div className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded mt-1 inline-block uppercase tracking-wider">{candidate.status}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs flex items-center justify-center border border-emerald-100">
                              {candidate.matchScore}
                            </div>
                            <span className="text-xs text-slate-500 font-medium">Fit</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="flex items-center gap-2 text-xs font-bold text-[#2563eb] hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors">
                            <Play className="w-3 h-3 fill-current" /> Play Audio
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:text-red-500 hover:border-red-200 transition-colors tooltip" title="Reject">
                              <XCircle className="w-4 h-4" />
                            </button>
                            <button className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:text-emerald-500 hover:border-emerald-200 transition-colors tooltip" title="Shortlist">
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button className="text-xs font-bold text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors ml-2">
                              View Profile
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-display font-bold text-slate-900">Invoicing & Payments</h2>
                <p className="text-sm text-slate-500 font-medium">Track your placed candidates and 30-day billing cycles.</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-lg transition-colors">
                <Receipt className="w-4 h-4" /> Download Statement
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Outstanding</div>
                <div className="text-2xl font-display font-bold text-slate-900">₹42,000</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Pending Cycles</div>
                <div className="text-2xl font-display font-bold text-slate-900">1</div>
                <div className="text-xs text-slate-500 mt-1">Completing within 15 days</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Paid (YTD)</div>
                <div className="text-2xl font-display font-bold text-slate-900">₹1,24,000</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider font-bold text-slate-500">
                      <th className="px-6 py-4">Invoice / ID</th>
                      <th className="px-6 py-4">Candidate & Role</th>
                      <th className="px-6 py-4">Joined Date</th>
                      <th className="px-6 py-4">Status & Due</th>
                      <th className="px-6 py-4 text-right">Amount</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {invoices.map((inv, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-bold text-sm text-slate-900">{inv.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-bold text-sm text-slate-900">{inv.candidate}</div>
                          <div className="text-xs text-slate-500 font-medium mt-0.5">{inv.role}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-600">{inv.joinedDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-[10px] font-bold px-2 py-0.5 rounded inline-flex items-center gap-1 uppercase tracking-wider mb-1 ${
                            inv.status.includes('Pending') ? 'bg-amber-50 text-amber-600' :
                            inv.status.includes('Generated') ? 'bg-blue-50 text-blue-600' :
                            'bg-emerald-50 text-emerald-600'
                          }`}>
                            {inv.status.includes('Pending') ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                            {inv.status}
                          </div>
                          <div className="text-xs text-slate-500 font-medium">Due: {inv.dueDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="font-bold text-sm text-slate-900">{inv.amount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button className="p-2 text-slate-400 hover:text-[#2563eb] transition-colors tooltip" title="Download Invoice">
                            <DownloadCloud className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
