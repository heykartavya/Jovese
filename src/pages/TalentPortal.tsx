import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Settings, 
  Bell, 
  Video,
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  Briefcase
} from 'lucide-react';

export default function TalentPortal() {
  const navigate = useNavigate();
  const [resumeLink, setResumeLink] = useState('https://jovese.com/docs/resume_karan_s.pdf');
  const [videoLink, setVideoLink] = useState('https://youtube.com/watch?v=unlisted_video_xyz');
  const [isEditingDocs, setIsEditingDocs] = useState(false);

  const interviews = [
    {
      id: "INT-883",
      company: "TechCorp India",
      role: "Inside Sales Executive",
      date: "Tomorrow, 2:30 PM",
      status: "Scheduled",
      link: "https://meet.google.com/abc-defg-hij",
      type: "Client Interview"
    },
    {
      id: "INT-842",
      company: "Global Support Services",
      role: "BPO Voice Process",
      date: "12 Oct 2023",
      status: "Offer Extended",
      link: null,
      type: "Final Round"
    }
  ];

  const handleSaveDocs = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingDocs(false);
    // show a toast or something in a real app
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-20">
      
      {/* Portal Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <span className="font-display font-extrabold text-xl text-slate-900 tracking-tighter cursor-pointer" onClick={() => navigate('/')}>
                Jovese
              </span>
              <span className="bg-blue-100 text-[#2563eb] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md hidden sm:block">
                Talent Portal
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative hidden sm:block">
                <Bell className="w-5 h-5" />
              </button>
              
              <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm">
                  KS
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-bold text-slate-900 leading-none">Karan Sharma</div>
                  <div className="text-[10px] text-emerald-500 font-bold mt-1 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    Actively Interviewing
                  </div>
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
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Left Column: Interviews */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#2563eb]" /> Ongoing Processes
            </h2>

            <div className="space-y-4">
              {interviews.map(interview => (
                <div key={interview.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{interview.company}</span>
                        {interview.status === 'Offer Extended' ? (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                            <CheckCircle2 className="w-3 h-3" /> Offer
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                            <Clock className="w-3 h-3" /> {interview.status}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-lg text-slate-900">{interview.role}</h3>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-4 text-sm font-normal text-slate-600">
                      <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400" /> {interview.date}</span>
                      <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-slate-400" /> {interview.type}</span>
                    </div>
                    {interview.link && (
                      <a 
                        href={interview.link} 
                        target="_blank" 
                        referrerPolicy="no-referrer"
                        className="px-4 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold rounded-lg transition-colors text-center shadow-sm"
                      >
                        Join Meeting
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Profile & Documents */}
          <div className="space-y-6">
            <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
               Your Portfolio
            </h2>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-slate-900">Application Assets</h3>
                <button 
                  onClick={() => setIsEditingDocs(!isEditingDocs)}
                  className="text-xs font-bold text-[#2563eb] hover:text-blue-700"
                >
                  {isEditingDocs ? 'Cancel' : 'Update'}
                </button>
              </div>

              {isEditingDocs ? (
                <form onSubmit={handleSaveDocs} className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Resume Link (Drive/Dropbox)</label>
                    <input 
                      type="url" 
                      value={resumeLink}
                      onChange={(e) => setResumeLink(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Video Pitch Link</label>
                    <input 
                      type="url" 
                      value={videoLink}
                      onChange={(e) => setVideoLink(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
                      placeholder="https://..."
                    />
                  </div>
                  <button type="submit" className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors">
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <FileText className="w-5 h-5 text-[#2563eb] mt-0.5" />
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-slate-900 mb-0.5">Latest Resume</div>
                      <a href={resumeLink} className="text-[10px] text-slate-500 hover:text-[#2563eb] truncate block" target="_blank" referrerPolicy="no-referrer">
                        {resumeLink}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <Video className="w-5 h-5 text-indigo-500 mt-0.5" />
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-slate-900 mb-0.5">Video Pitch</div>
                      <a href={videoLink} className="text-[10px] text-slate-500 hover:text-indigo-500 truncate block" target="_blank" referrerPolicy="no-referrer">
                        {videoLink}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5">
              <h3 className="font-bold text-sm text-slate-900 mb-2">Need help?</h3>
              <p className="text-xs text-slate-600 font-normal leading-relaxed mb-4">
                If you have questions about your scheduled interviews or need to reschedule, please contact your Jovese talent guide.
              </p>
              <a href="https://wa.me/919999999999" className="inline-flex items-center justify-center w-full px-4 py-2 bg-white border border-[#2563eb]/20 text-[#2563eb] font-bold text-xs rounded-lg hover:bg-blue-50 transition-colors">
                Message Support
              </a>
            </div>

          </div>
        </div>

      </main>

    </div>
  );
}
