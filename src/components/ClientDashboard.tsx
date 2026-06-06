import React from 'react';
import { motion } from 'motion/react';
import { Users, UserPlus, PhoneIncoming, FileCheck, CheckCircle2, Building, ShieldCheck, Activity, BarChart4 } from 'lucide-react';

export default function ClientDashboard() {
  const mandates = [
    {
      id: "M-BPO-842",
      role: "BPO Voice Process Associate",
      department: "Customer Success",
      location: "Hyderabad",
      openSeats: 40,
      filledSeats: 12,
      timeline: "Days 14 of 30",
      status: "Active",
      pipeline: {
        sourced: 185,
        videoScreened: 82,
        clientInterviews: 24,
        offers: 15
      },
      icon: <PhoneIncoming className="w-5 h-5 text-indigo-500" />,
      color: "indigo"
    },
    {
      id: "M-INS-921",
      role: "Insurance Inside Sales Executive",
      department: "Sales",
      location: "Gurgaon",
      openSeats: 15,
      filledSeats: 8,
      timeline: "Days 21 of 30",
      status: "Active",
      pipeline: {
        sourced: 110,
        videoScreened: 45,
        clientInterviews: 18,
        offers: 10
      },
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      color: "emerald"
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Open Mandates</span>
          </div>
          <div className="text-3xl font-display font-bold text-slate-900">2</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Target</span>
          </div>
          <div className="text-3xl font-display font-bold text-slate-900">55</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Filled Seats</span>
          </div>
          <div className="text-3xl font-display font-bold text-slate-900">20</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Offers Pending</span>
          </div>
          <div className="text-3xl font-display font-bold text-slate-900">5</div>
        </div>
      </div>

      {/* Recruiter Mandate Progress */}
      <div className="grid lg:grid-cols-2 gap-6">
        {mandates.map((mandate, idx) => {
          const progressPercentage = Math.round((mandate.filledSeats / mandate.openSeats) * 100);
          
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-slate-50 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase bg-slate-50 px-2 py-0.5 rounded-md">
                      {mandate.id}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      {mandate.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg sm:text-xl font-display flex items-center gap-2 mb-1">
                    {mandate.icon}
                    {mandate.role}
                  </h3>
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1.5"><Building className="w-3.5 h-3.5" /> {mandate.department}</span>
                    <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> {mandate.timeline}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-5">
                <div className="flex justify-between items-end mb-2">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Fulfillment Progress</div>
                  <div className="text-sm font-bold text-slate-900">
                    {mandate.filledSeats} <span className="text-slate-400">/ {mandate.openSeats} Hired</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-6">
                  <div 
                    className={`h-full bg-${mandate.color}-500 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>

                <div className="grid grid-cols-4 gap-2 mb-2">
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Sourced</div>
                    <div className="text-sm font-bold text-slate-900">{mandate.pipeline.sourced}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center border-b-2 border-indigo-200">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 whitespace-nowrap overflow-hidden text-ellipsis">Video Eval</div>
                    <div className="text-sm font-bold text-slate-900">{mandate.pipeline.videoScreened}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center border-b-2 border-orange-200">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Interviews</div>
                    <div className="text-sm font-bold text-slate-900">{mandate.pipeline.clientInterviews}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center border-b-2 border-emerald-200">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Offers</div>
                    <div className="text-sm font-bold text-slate-900">{mandate.pipeline.offers}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recommended Actions / Activity */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">
        <h3 className="font-display font-bold text-slate-900 text-lg mb-6 flex items-center gap-2">
          <BarChart4 className="w-5 h-5 text-[#2563eb]" /> Recent Pipeline Activity
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Offer Accepted: Priya S.</div>
              <div className="text-xs text-slate-500 font-medium">BPO Voice Process Associate • Joining in 2 days</div>
            </div>
            <div className="ml-auto text-[10px] font-bold text-slate-400 uppercase tracking-wider">2 hrs ago</div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center flex-shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">12 Video Assessments Ready for Review</div>
              <div className="text-xs text-slate-500 font-medium">Insurance Inside Sales Executive • Review pending</div>
            </div>
            <div className="ml-auto text-[10px] font-bold text-slate-400 uppercase tracking-wider">5 hrs ago</div>
          </div>
        </div>
      </div>
    </div>
  );
}
