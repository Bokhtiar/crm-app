import React, { useState } from 'react';
import {
  CheckCircle, Clock, MapPin, User, FileText, PlayCircle, StopCircle,
  Target, Percent, CalendarDays
} from 'lucide-react';
import type { Visit, ViewType, ActionType } from '../types';
import { MOCK_CUSTOMERS, MOCK_CONTACTS, MOCK_SALES_DATA } from '../mockData';
import { getDateString, formatCurrency } from '../utils';
import { FilterChip } from './Views';

interface DashboardViewProps {
  visits: Visit[];
  onNavigate: (view: ViewType) => void;
  onPlanVisit: () => void;
  onSelectVisit: (visit: Visit) => void;
  onAction: (visit: Visit, action: ActionType) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ visits, onSelectVisit, onAction }) => {
  const [dashboardFilter, setDashboardFilter] = useState('Today');
  const [customDate, setCustomDate] = useState(getDateString(0));
  const todayStr = getDateString(0);
  const progress = (MOCK_SALES_DATA.achieved / MOCK_SALES_DATA.monthlyTarget) * 100;

  const getFilteredVisits = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const curr = new Date();
    const first = curr.getDate() - curr.getDay(); 
    const firstDayOfWeek = new Date(curr.setDate(first));
    const lastDayOfWeek = new Date(curr.setDate(curr.getDate()+6));
    firstDayOfWeek.setHours(0,0,0,0);
    lastDayOfWeek.setHours(23,59,59,999);

    return visits.filter(v => {
      const vDate = new Date(v.date);
      vDate.setHours(0,0,0,0);
      if (dashboardFilter === 'Today') return v.date === todayStr;
      if (dashboardFilter === 'Custom') return v.date === customDate;
      if (dashboardFilter === 'Week') return vDate >= firstDayOfWeek && vDate <= lastDayOfWeek;
      if (dashboardFilter === 'Month') return vDate.getMonth() === currentMonth && vDate.getFullYear() === currentYear;
      return false;
    });
  };

  const filteredVisits = getFilteredVisits();
  const plannedCount = filteredVisits.length;
  const completedCount = filteredVisits.filter(v => v.status === 'Completed').length;
  const pendingCount = filteredVisits.filter(v => v.status === 'Planned' || v.status === 'In Progress' || v.status === 'Checked Out').length;
  const completionRate = plannedCount > 0 ? (completedCount / plannedCount) * 100 : 0;

  const getScheduleTitle = () => {
      if (dashboardFilter === 'Today') return "Today's Schedule";
      if (dashboardFilter === 'Week') return "Weekly Schedule";
      if (dashboardFilter === 'Month') return "Monthly Schedule";
      return "Selected Date Schedule";
  };

  return (
    <div className="space-y-6 pb-24">
      <header className="bg-blue-900 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl font-bold">Hello, Arif</h1>
            <p className="text-blue-200 text-sm">Sr. Marketing Executive</p>
          </div>
          <div className="h-10 w-10 bg-blue-700 rounded-full flex items-center justify-center border-2 border-blue-500 font-bold text-sm">A</div>
        </div>
        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20 shadow-inner">
          <div className="flex justify-between items-end">
            <div>
               <p className="text-blue-100 text-xs uppercase font-bold tracking-wider">Monthly Target</p>
               <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{progress.toFixed(0)}%</span>
                  <span className="text-sm text-blue-200">Achieved</span>
               </div>
            </div>
            <span className="text-sm text-white font-medium mb-1">{formatCurrency(MOCK_SALES_DATA.achieved)}</span>
          </div>
          <div className="w-full bg-blue-950/50 h-2 mt-3 rounded-full overflow-hidden">
            <div className="bg-green-400 h-full rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </header>

      <div className="px-5">
        <div className="flex justify-between items-center mb-3">
           <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Visit Overview</h2>
           <div className="flex gap-1 bg-gray-100 p-0.5 rounded-full overflow-x-auto max-w-[60%] no-scrollbar">
             {['Today', 'Week', 'Month'].map(f => (
               <FilterChip key={f} label={f} active={dashboardFilter === f} onClick={() => setDashboardFilter(f)} />
             ))}
             <FilterChip label="Custom" active={dashboardFilter === 'Custom'} onClick={() => setDashboardFilter('Custom')} />
           </div>
        </div>

        {dashboardFilter === 'Custom' && (
          <div className="mb-4 animate-in fade-in slide-in-from-top-2">
              <div className="relative">
                  <CalendarDays className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <input 
                      type="date" 
                      value={customDate}
                      onChange={(e) => setCustomDate(e.target.value)}
                      className="w-full border border-blue-200 bg-blue-50 rounded-xl py-2 pl-10 pr-4 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
              </div>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="bg-blue-50 p-3 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden group">
             <div className="absolute right-[-10px] top-[-10px] w-16 h-16 bg-blue-100 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
             <div className="relative z-10">
                <div className="flex items-center gap-2 text-blue-700 mb-1">
                    <Target size={16}/>
                    <p className="text-xs font-bold uppercase tracking-wide">Plan</p>
                </div>
                <span className="text-2xl font-extrabold text-gray-800">{plannedCount}</span>
             </div>
          </div>
          <div className="bg-green-50 p-3 rounded-2xl border border-green-100 shadow-sm relative overflow-hidden group">
             <div className="absolute right-[-10px] top-[-10px] w-16 h-16 bg-green-100 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
             <div className="relative z-10">
                <div className="flex items-center gap-2 text-green-700 mb-1">
                    <CheckCircle size={16}/>
                    <p className="text-xs font-bold uppercase tracking-wide">Done</p>
                </div>
                <span className="text-2xl font-extrabold text-gray-800">{completedCount}</span>
             </div>
          </div>
          <div className="bg-orange-50 p-3 rounded-2xl border border-orange-100 shadow-sm relative overflow-hidden group">
             <div className="absolute right-[-10px] top-[-10px] w-16 h-16 bg-orange-100 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
             <div className="relative z-10">
                <div className="flex items-center gap-2 text-orange-700 mb-1">
                    <Clock size={16}/>
                    <p className="text-xs font-bold uppercase tracking-wide">Pending</p>
                </div>
                <span className="text-2xl font-extrabold text-gray-800">{pendingCount}</span>
             </div>
          </div>
          <div className="bg-purple-50 p-3 rounded-2xl border border-purple-100 shadow-sm relative overflow-hidden group">
             <div className="absolute right-[-10px] top-[-10px] w-16 h-16 bg-purple-100 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
             <div className="relative z-10">
                <div className="flex items-center gap-2 text-purple-700 mb-1">
                    <Percent size={16}/>
                    <p className="text-xs font-bold uppercase tracking-wide">Rate</p>
                </div>
                <span className="text-2xl font-extrabold text-gray-800">{completionRate.toFixed(0)}%</span>
             </div>
          </div>
        </div>
      </div>

      <div className="px-5">
        <h2 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">{getScheduleTitle()}</h2>
        {filteredVisits.length === 0 ? (
           <div className="text-center p-8 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">No visits found</div>
        ) : (
          filteredVisits.map(visit => {
            const customer = MOCK_CUSTOMERS.find(c => c.id === visit.customerId);
            const contact = MOCK_CONTACTS.find(c => c.id === visit.contactId);
            
            let actionButton = null;
            if (visit.status === 'Planned') {
              actionButton = (
                <button onClick={(e) => { e.stopPropagation(); onAction(visit, 'checkin'); }} className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-xl shadow-md active:scale-95 shrink-0 ml-2 whitespace-nowrap font-bold flex items-center gap-1">
                  <PlayCircle size={14}/> Check In
                </button>
              );
            } else if (visit.status === 'In Progress') {
              actionButton = (
                <button onClick={(e) => { e.stopPropagation(); onAction(visit, 'checkout'); }} className="bg-orange-500 text-white text-xs px-3 py-1.5 rounded-xl shadow-md active:scale-95 shrink-0 ml-2 whitespace-nowrap font-bold flex items-center gap-1 animate-pulse">
                  <StopCircle size={14}/> Check Out
                </button>
              );
            } else if (visit.status === 'Checked Out') {
              actionButton = (
                <button onClick={(e) => { e.stopPropagation(); onAction(visit, 'feedback'); }} className="bg-yellow-500 text-white text-xs px-3 py-1.5 rounded-xl shadow-md active:scale-95 shrink-0 ml-2 whitespace-nowrap font-bold flex items-center gap-1">
                  <FileText size={14}/> Report
                </button>
              );
            } else {
              actionButton = (
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 shrink-0 ml-2">
                  <CheckCircle size={14}/> Done
                </span>
              );
            }

            return (
              <div key={visit.id} onClick={() => onSelectVisit(visit)} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-3 flex justify-between items-center active:scale-95 transition-transform cursor-pointer relative overflow-hidden">
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${visit.status === 'In Progress' ? 'bg-orange-500' : visit.status === 'Completed' ? 'bg-green-500' : visit.status === 'Checked Out' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                <div className="flex-1 ml-2 mr-2">
                  <div className="flex justify-between items-start">
                     <h3 className="font-bold text-gray-800 text-base">{customer?.name}</h3>
                     <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{visit.time || 'TBD'}</span>
                  </div>
                  {contact && (
                    <p className="text-xs text-indigo-600 font-medium flex items-center gap-1 mt-0.5">
                      <User size={12}/> {contact.name}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><MapPin size={12}/> {customer?.address}</p>
                  {visit.status === 'In Progress' && (
                     <p className="text-[10px] text-orange-600 font-bold mt-1 flex items-center gap-1">
                       <Clock size={10}/> Started at {visit.checkInTime}
                     </p>
                  )}
                  {visit.status === 'Checked Out' && (
                     <p className="text-[10px] text-yellow-600 font-bold mt-1 flex items-center gap-1">
                       <FileText size={10}/> Feedback Pending
                     </p>
                  )}
                </div>
                {actionButton}
              </div>
            )
          })
        )}
      </div>
    </div>
  );
};

export default DashboardView;

