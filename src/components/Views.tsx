import React, { useState } from 'react';
import {
  Calendar, CheckCircle, Clock, ChevronRight, MapPin,
  Search, Briefcase, Tags, Building2, Swords, StickyNote,
  Package, Globe, Truck, ClipboardCheck, ScrollText, Lightbulb, UserCheck,
  TrendingUp
} from 'lucide-react';
import type { Visit, Customer, Brand, ViewType, ClientTabType, ActionType } from '../types';
import { MOCK_CUSTOMERS, MOCK_BRANDS } from '../mockData';
import { getDateString } from '../utils';

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export const FilterChip: React.FC<FilterChipProps> = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all whitespace-nowrap border shadow-sm ${
      active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
    }`}
  >
    {label}
  </button>
);

interface ClientsViewProps {
  clientTab: ClientTabType;
  setClientTab: (tab: ClientTabType) => void;
  onSelectCustomer: (customer: Customer) => void;
  onSelectBrand: (brand: Brand) => void;
}

export const ClientsView: React.FC<ClientsViewProps> = ({ clientTab, setClientTab, onSelectCustomer, onSelectBrand }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = clientTab === 'customers' ? ['All', 'Woven', 'Denim', 'Knit'] : ['All', 'Retail', 'Fast Fashion', 'Casual'];

  const filteredData = (clientTab === 'customers' ? MOCK_CUSTOMERS : MOCK_BRANDS).filter((item: any) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'All' ? true : (clientTab === 'customers' ? item.type === activeFilter : item.segment === activeFilter);
      return matchesSearch && matchesFilter;
  });

  return (
    <div className="pb-24 pt-4 px-4 h-full overflow-y-auto">
      <div className="flex p-1.5 bg-gray-100 rounded-xl mb-4 shadow-inner">
        <button onClick={() => { setClientTab('customers'); setActiveFilter('All'); }} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${clientTab === 'customers' ? 'bg-white shadow text-blue-900' : 'text-gray-500'}`}>Factories</button>
        <button onClick={() => { setClientTab('brands'); setActiveFilter('All'); }} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${clientTab === 'brands' ? 'bg-white shadow text-blue-900' : 'text-gray-500'}`}>Brands</button>
      </div>
      <div className="relative mb-4">
        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
        <input type="text" placeholder={`Search ${clientTab}...`} className="w-full bg-white border border-gray-200 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar items-center">
          {filters.map(filter => (
              <FilterChip key={filter} label={filter} active={activeFilter === filter} onClick={() => setActiveFilter(filter)} />
          ))}
      </div>
      <div className="space-y-3">
        {filteredData.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No results found</div>
        ) : (
          filteredData.map((item: any) => {
           if (clientTab === 'customers') {
             return (
              <div key={item.id} onClick={() => onSelectCustomer(item)} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform cursor-pointer">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
                    <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-md mt-1 inline-block">{item.type}</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-full text-gray-400">
                    <ChevronRight size={20} />
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-50 grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5"><MapPin size={14} className="text-blue-500"/> {item.address}</div>
                  <div className="flex items-center gap-1.5"><Briefcase size={14} className="text-blue-500"/> {item.brandIds.length} Brands</div>
                </div>
              </div>
             );
           } else {
             return (
              <div key={item.id} onClick={() => onSelectBrand(item)} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform cursor-pointer flex justify-between items-center">
                <div>
                   <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
                   <p className="text-sm text-gray-500 mt-0.5">{item.origin} • {item.segment}</p>
                </div>
                 <div className="bg-gray-50 p-2 rounded-full text-gray-400">
                    <ChevronRight size={20} />
                  </div>
              </div>
             );
           }
          })
        )}
      </div>
    </div>
  );
};

interface VisitsViewProps {
  visits: Visit[];
  onSelectVisit: (visit: Visit) => void;
  onAction: (visit: Visit, action: ActionType) => void;
}

export const VisitsView: React.FC<VisitsViewProps> = ({ visits, onSelectVisit, onAction }) => {
  const [statusFilter, setStatusFilter] = useState('All');
  const filteredVisits = visits.filter(v => {
      const isToday = v.date === getDateString(0);
      if (statusFilter === 'Today') return isToday;
      if (statusFilter === 'Planned') return v.status === 'Planned';
      if (statusFilter === 'In Progress') return v.status === 'In Progress';
      if (statusFilter === 'Checked Out') return v.status === 'Checked Out';
      if (statusFilter === 'Completed') return v.status === 'Completed';
      return true;
  }).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="pb-24 pt-4 px-4">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Visit Plan</h2>
    <div className="flex gap-2 overflow-x-auto pb-3 mb-2 no-scrollbar items-center">
        {['All', 'Today', 'Planned', 'In Progress', 'Checked Out', 'Completed'].map(f => (
            <FilterChip key={f} label={f} active={statusFilter === f} onClick={() => setStatusFilter(f)} />
        ))}
    </div>
    <div className="space-y-3">
        {filteredVisits.length === 0 ? (
             <div className="text-center py-12 text-gray-400">No visits found</div>
        ) : (
            filteredVisits.map(visit => {
            const customer = MOCK_CUSTOMERS.find(c => c.id === visit.customerId);
            let actionButton = null;
            if (visit.status === 'Planned') {
                actionButton = (
                <button onClick={(e) => { e.stopPropagation(); onAction(visit, 'checkin'); }} className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg shadow-md active:scale-95 shrink-0 ml-1 whitespace-nowrap font-bold">Check In</button>
                );
            } else if (visit.status === 'In Progress') {
                actionButton = (
                <button onClick={(e) => { e.stopPropagation(); onAction(visit, 'checkout'); }} className="bg-orange-500 text-white text-xs px-3 py-1.5 rounded-lg shadow-md active:scale-95 shrink-0 ml-1 whitespace-nowrap font-bold animate-pulse">Check Out</button>
                );
            } else if (visit.status === 'Checked Out') {
                actionButton = (
                <button onClick={(e) => { e.stopPropagation(); onAction(visit, 'feedback'); }} className="bg-yellow-500 text-white text-xs px-3 py-1.5 rounded-lg shadow-md active:scale-95 shrink-0 ml-1 whitespace-nowrap font-bold">Report</button>
                );
            } else {
                actionButton = (
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded flex items-center gap-1"><CheckCircle size={10}/> Done</span>
                );
            }

            return (
                <div key={visit.id} onClick={() => onSelectVisit(visit)} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 active:scale-95 transition-transform cursor-pointer relative overflow-hidden">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${visit.status === 'In Progress' ? 'bg-orange-500' : visit.status === 'Completed' ? 'bg-green-500' : visit.status === 'Checked Out' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                <div className="flex flex-col items-center justify-center bg-blue-50 px-3 rounded-xl text-blue-800 h-14 w-14 shrink-0 ml-2">
                    <span className="text-[10px] font-bold uppercase">{new Date(visit.date).toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-lg font-bold">{new Date(visit.date).getDate()}</span>
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-bold text-gray-800">{customer?.name}</h4>
                        <p className="text-sm text-gray-500 truncate max-w-[150px]">{visit.notes}</p>
                    </div>
                    {actionButton}
                    </div>
                    <div className="flex gap-2 mt-2">
                       <span className={`text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 font-medium ${visit.status === 'In Progress' ? 'bg-orange-100 text-orange-700' : visit.status === 'Checked Out' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
                         {visit.status === 'In Progress' ? <Clock size={10}/> : <Calendar size={10}/>} {visit.status}
                       </span>
                    </div>
                </div>
                </div>
            )
            })
        )}
    </div>
    </div>
  );
};

// Add other view components here...
interface MoreViewProps {
  onNavigate: (view: ViewType) => void;
  setClientTab: (tab: ClientTabType) => void;
}

export const MoreView: React.FC<MoreViewProps> = ({ onNavigate, setClientTab }) => {
  const menuItems = [
    { id: 'team_rpt', label: 'Team Report', icon: <UserCheck size={24}/>, color: 'text-blue-600', bg: 'bg-blue-100', action: () => onNavigate('team_report') }, 
    { id: 'sales', label: 'Sales Target', icon: <TrendingUp size={24}/>, color: 'text-orange-600', bg: 'bg-orange-100', action: () => onNavigate('sales_detail') },
    { id: 'brand', label: 'Brand Profile', icon: <Tags size={24}/>, color: 'text-purple-600', bg: 'bg-purple-100', action: () => { onNavigate('customers'); setClientTab('brands'); } },
    { id: 'supplier', label: 'Supplier Profile', icon: <Building2 size={24}/>, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { id: 'comp', label: 'Competitors', icon: <Swords size={24}/>, color: 'text-red-600', bg: 'bg-red-100' },
    { id: 'sticker', label: 'Product Sticker', icon: <StickyNote size={24}/>, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { id: 'stock', label: 'Stock', icon: <Package size={24}/>, color: 'text-blue-600', bg: 'bg-blue-100' },
    { id: 'export', label: 'Export', icon: <Globe size={24}/>, color: 'text-cyan-600', bg: 'bg-cyan-100' },
    { id: 'del_req', label: 'Delivery Request', icon: <Truck size={24}/>, color: 'text-teal-600', bg: 'bg-teal-100' },
    { id: 'del_app', label: 'Delivery Approval', icon: <ClipboardCheck size={24}/>, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { id: 'challan', label: 'Challan', icon: <ScrollText size={24}/>, color: 'text-gray-600', bg: 'bg-gray-200' },
    { id: 'decision', label: 'Decision Points', icon: <Lightbulb size={24}/>, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  return (
    <div className="pb-24 pt-6 px-5 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">More Features</h2>
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Management & Strategy</h3>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {menuItems.slice(0, 4).map(item => (
          <button key={item.id} onClick={item.action} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform h-28">
            <div className={`${item.bg} p-3 rounded-full ${item.color}`}>
              {item.icon}
            </div>
            <span className="text-xs font-bold text-gray-700 text-center leading-tight">{item.label}</span>
          </button>
        ))}
      </div>
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Logistics & Product</h3>
      <div className="grid grid-cols-3 gap-3 mb-6">
         {menuItems.slice(4, 10).map(item => (
          <button key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform h-28">
            <div className={`${item.bg} p-3 rounded-full ${item.color}`}>
              {item.icon}
            </div>
            <span className="text-xs font-bold text-gray-700 text-center leading-tight">{item.label}</span>
          </button>
        ))}
      </div>
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Others</h3>
      <div className="grid grid-cols-3 gap-3 mb-6">
         {menuItems.slice(10).map(item => (
          <button key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform h-28">
            <div className={`${item.bg} p-3 rounded-full ${item.color}`}>
              {item.icon}
            </div>
            <span className="text-xs font-bold text-gray-700 text-center leading-tight">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

