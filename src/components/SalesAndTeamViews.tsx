import React, { useState } from 'react';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import type { Product, ViewType } from '../types';
import { MOCK_SALES_DATA, MOCK_TEAM_PERFORMANCE } from '../mockData';
import { formatCurrency } from '../utils';
import { FilterChip } from './Views';

interface SalesViewProps {
  onSelectProduct: (product: Product) => void;
  onNavigate: (view: ViewType) => void;
}

export const SalesView: React.FC<SalesViewProps> = ({ onSelectProduct, onNavigate }) => (
  <div className="pb-24 pt-4 px-4 h-full overflow-y-auto">
    <div className="flex items-center gap-3 mb-5">
      <button onClick={() => onNavigate('more')} className="bg-gray-100 p-2 rounded-full"><ArrowLeft size={22}/></button>
      <h2 className="text-2xl font-bold text-gray-800">Sales Targets</h2>
    </div>
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-2xl shadow-lg mb-6 relative overflow-hidden">
      <div className="relative z-10">
          <p className="text-blue-100 text-sm font-medium mb-1">Total Achievement</p>
          <h3 className="text-3xl font-bold">{formatCurrency(MOCK_SALES_DATA.achieved)}</h3>
          <p className="text-sm opacity-80 mt-1">Target: {formatCurrency(MOCK_SALES_DATA.monthlyTarget)}</p>
          <div className="mt-4">
          <div className="flex justify-between text-xs mb-1 font-medium">
              <span>Progress</span>
              <span>{((MOCK_SALES_DATA.achieved / MOCK_SALES_DATA.monthlyTarget) * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
              <div className="bg-green-400 h-full rounded-full" style={{ width: `${(MOCK_SALES_DATA.achieved / MOCK_SALES_DATA.monthlyTarget) * 100}%` }}></div>
          </div>
          </div>
      </div>
      <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
    </div>
    <h3 className="font-bold text-gray-800 mb-3 text-lg">Product Breakdown</h3>
    <div className="space-y-3">
      {MOCK_SALES_DATA.products.map((prod, idx) => {
        const pct = (prod.achieved / prod.target) * 100;
        return (
          <div key={idx} onClick={() => onSelectProduct(prod)} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-transform cursor-pointer">
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-700">{prod.name}</span>
              <span className="text-sm font-bold text-gray-900">{pct.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-2">
              <div className={`h-full rounded-full ${pct > 80 ? 'bg-green-500' : pct > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 font-medium">
              <span>{formatCurrency(prod.achieved)}</span>
              <span>Target: {formatCurrency(prod.target)}</span>
            </div>
          </div>
        )
      })}
    </div>
  </div>
);

interface TeamReportViewProps {
  onNavigate: (view: ViewType) => void;
}

export const TeamReportView: React.FC<TeamReportViewProps> = ({ onNavigate }) => {
  const [teamFilter, setTeamFilter] = useState('All');
  const totalPlanned = MOCK_TEAM_PERFORMANCE.reduce((acc, curr) => acc + curr.planned, 0);
  const totalVisited = MOCK_TEAM_PERFORMANCE.reduce((acc, curr) => acc + curr.visited, 0);
  const overallSuccess = (totalVisited / totalPlanned) * 100;
  const filteredTeam = MOCK_TEAM_PERFORMANCE.filter(member => {
      const pct = (member.visited / member.planned) * 100;
      if (teamFilter === 'Top Performers') return pct >= 80;
      if (teamFilter === 'Needs Improvement') return pct < 50;
      return true;
  }).sort((a,b) => (b.visited/b.planned) - (a.visited/a.planned));

  return (
    <div className="pb-24 pt-4 px-4 h-full overflow-y-auto">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => onNavigate('more')} className="bg-gray-100 p-2 rounded-full"><ArrowLeft size={22}/></button>
        <h2 className="text-2xl font-bold text-gray-800">Team Report</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 border border-gray-100">
         <h3 className="text-gray-500 font-bold uppercase text-xs mb-4 tracking-wider">Team Overview (This Month)</h3>
         <div className="flex items-center justify-between">
            <div className="relative w-24 h-24 flex items-center justify-center">
               <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                  <circle cx="48" cy="48" r="40" stroke="#3b82f6" strokeWidth="8" fill="none" strokeDasharray={`${overallSuccess * 2.5} 251`} strokeLinecap="round" />
               </svg>
               <span className="absolute text-xl font-bold text-blue-600">{overallSuccess.toFixed(0)}%</span>
            </div>
            <div className="text-right space-y-2">
               <div>
                  <p className="text-2xl font-bold text-gray-800">{totalVisited}</p>
                  <p className="text-xs text-gray-400 font-medium">Visits Completed</p>
               </div>
               <div>
                  <p className="text-xl font-bold text-gray-400">{totalPlanned}</p>
                  <p className="text-xs text-gray-400 font-medium">Total Planned</p>
               </div>
            </div>
         </div>
      </div>
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
           {['All', 'Top Performers', 'Needs Improvement'].map(f => (
               <FilterChip key={f} label={f} active={teamFilter === f} onClick={() => setTeamFilter(f)} />
           ))}
      </div>
      <div className="space-y-3">
        {filteredTeam.map(member => {
          const pct = (member.visited / member.planned) * 100;
          return (
            <div key={member.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{member.name}</h4>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                 </div>
                 <div className="text-right">
                   <span className={`text-sm font-bold ${pct >= 80 ? 'text-green-600' : pct >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                     {pct.toFixed(0)}%
                   </span>
                   <p className="text-[10px] text-gray-400">Completion</p>
                 </div>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                 <div className={`h-full rounded-full ${member.color}`} style={{ width: `${pct}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

