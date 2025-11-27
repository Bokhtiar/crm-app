import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Calendar, TrendingUp, Plus, MapPin, Phone, Briefcase, 
  CheckCircle, Clock, ChevronRight, Menu, X, FileText, Search, User, Tags, 
  BarChart2, ArrowLeft, MoreHorizontal, Factory, Swords, StickyNote, Package, 
  Globe, Truck, ClipboardCheck, ScrollText, Lightbulb, Building2, CheckSquare, 
  Square, PieChart, UserCheck, Filter, SlidersHorizontal, Info, CalendarDays, 
  MessageSquare, Mail, UserPlus, Target, Percent, PlayCircle, StopCircle, 
  Navigation, PenTool, LogOut, Edit, Monitor, Smartphone, Trophy, ChevronDown
} from 'lucide-react';

// Helpers
const getDateString = (offset = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().split('T')[0];
};

const getTimeString = () => {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);

// Constants
const VISIT_PURPOSES = [
  "Relationship Buildup", "Requirement Collection", "Sample Collection", "Counter Sample Providing",
  "Quality Checking by Customer", "Sample Making by Customer", "Waiting for Quality Approval",
  "Price Negotiation", "Waiting for Booking", "Booking Received"
];

// Mock Data
const MOCK_CUSTOMERS = [
  { id: 1, name: 'Ha-Meem Group', address: 'Tejgaon, Dhaka', type: 'Woven', contact: '01711-000000', brandIds: [1, 3] },
  { id: 2, name: 'Beximco Textiles', address: 'Gazipur', type: 'Denim', contact: '01811-000000', brandIds: [2, 4] },
  { id: 3, name: 'Palmal Group', address: 'Ashulia', type: 'Knit', contact: '01911-000000', brandIds: [3, 5] },
  { id: 4, name: 'Envoy Textiles', address: 'Mymensingh', type: 'Denim', contact: '01611-000000', brandIds: [1, 2] },
  { id: 5, name: 'Square Fashions', address: 'Valuka', type: 'Knit', contact: '01511-000000', brandIds: [3, 4] },
];

const MOCK_BRANDS = [
  { id: 1, name: 'H&M', segment: 'Retail', origin: 'Sweden' },
  { id: 2, name: 'Zara', segment: 'Fast Fashion', origin: 'Spain' },
  { id: 3, name: 'Gap', segment: 'Casual', origin: 'USA' },
  { id: 4, name: 'Uniqlo', segment: 'Lifestyle', origin: 'Japan' },
  { id: 5, name: 'Next', segment: 'Retail', origin: 'UK' },
];

const MOCK_CONTACTS = [
  { id: 1, customerId: 1, name: 'Mr. Rahim', designation: 'GM (Production)', phone: '01711-111111', email: 'rahim@hameem.com' },
  { id: 2, customerId: 1, name: 'Ms. Fatema', designation: 'Sr. Merchandiser', phone: '01711-222222', email: 'fatema@hameem.com' },
  { id: 3, customerId: 2, name: 'Mr. Karim', designation: 'Director', phone: '01811-333333', email: 'karim@beximco.com' },
  { id: 4, customerId: 3, name: 'Mr. Sazzad', designation: 'Procurement Mgr', phone: '01911-444444', email: 'sazzad@palmal.com' },
  { id: 5, customerId: 4, name: 'Mr. Tanvir', designation: 'DGM (Fabric)', phone: '01611-555555', email: 'tanvir@envoy.com' },
  { id: 6, customerId: 5, name: 'Ms. Sadia', designation: 'Head of Design', phone: '01511-666666', email: 'sadia@square.com' },
];

const MOCK_SALES_DATA = {
  monthlyTarget: 500000,
  achieved: 325000,
  products: [
    { id: 'p1', name: 'Woven Interlining 3040', target: 200000, achieved: 150000, history: [120000, 140000, 130000, 160000, 180000, 150000] },
    { id: 'p2', name: 'Non-Woven 1025', target: 150000, achieved: 80000, history: [60000, 70000, 60000, 80000, 90000, 80000] },
    { id: 'p3', name: 'Micro Dot Fusible', target: 150000, achieved: 95000, history: [80000, 80000, 90000, 90000, 100000, 95000] },
  ]
};

const FEEDBACK_OPTIONS = [
  "Sample Submitted", "Price Negotiation", "Order Received", "Complaint Received", "Competitor Info", "Payment Follow-up"
];

const MOCK_TEAM_MEMBERS = [
  { id: 1, name: 'Arif (You)', role: 'Sr. Exec', planned: 5, visited: 4, color: 'bg-green-500' },
  { id: 2, name: 'Hassan', role: 'Executive', planned: 8, visited: 3, color: 'bg-red-500' },
  { id: 3, name: 'Rubel', role: 'Asst. Mgr', planned: 4, visited: 4, color: 'bg-green-500' },
  { id: 4, name: 'Sohel', role: 'Executive', planned: 6, visited: 4, color: 'bg-yellow-500' },
];

const MOCK_PERSON_SALES = [
  { 
    id: 1, name: 'Arif (You)', role: 'Sr. Exec', target: 150000, achieved: 120000, 
    history: [100000, 110000, 95000, 130000, 140000, 120000],
    topClients: [
      { name: 'Ha-Meem Group', value: 50000 },
      { name: 'Envoy Textiles', value: 35000 },
      { name: 'Square Fashions', value: 20000 },
      { name: 'Palmal Group', value: 10000 },
      { name: 'Beximco', value: 5000 }
    ]
  },
  { 
    id: 2, name: 'Hassan', role: 'Executive', target: 100000, achieved: 45000,
    history: [40000, 42000, 38000, 50000, 48000, 45000],
    topClients: [
      { name: 'Beximco', value: 25000 },
      { name: 'Palmal Group', value: 15000 },
      { name: 'Square Fashions', value: 5000 }
    ]
  },
  { 
    id: 3, name: 'Rubel', role: 'Asst. Mgr', target: 200000, achieved: 180000,
    history: [160000, 170000, 165000, 190000, 195000, 180000],
    topClients: [
      { name: 'Ha-Meem Group', value: 80000 },
      { name: 'Envoy Textiles', value: 60000 },
      { name: 'Beximco', value: 40000 }
    ]
  },
  { 
    id: 4, name: 'Sohel', role: 'Executive', target: 120000, achieved: 70000,
    history: [60000, 65000, 62000, 75000, 72000, 70000],
    topClients: [
      { name: 'Square Fashions', value: 40000 },
      { name: 'Palmal Group', value: 30000 }
    ]
  },
];

// Reusable Components
const FilterChip = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all whitespace-nowrap border shadow-sm ${
      active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
    }`}
  >
    {label}
  </button>
);

// Modals
const AddVisitModal = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;
  const [date, setDate] = useState(getDateString(0));
  const [custId, setCustId] = useState('');
  const [contactId, setContactId] = useState('');
  const [note, setNote] = useState('');

  const availableContacts = MOCK_CONTACTS.filter(c => c.customerId === parseInt(custId));
  const selectedContactInfo = MOCK_CONTACTS.find(c => c.id === parseInt(contactId));

  const handleSubmit = () => {
    if (!custId || !date) return; 
    onSave({
      customerId: parseInt(custId),
      contactId: parseInt(contactId) || null,
      userId: 1, 
      date,
      status: 'Planned',
      notes: note,
      feedback: [],
      productionInfo: null,
      checkInTime: null,
      checkOutTime: null,
      location: null
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm z-[100]">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Plan New Visit</h3>
          <button onClick={onClose}><X size={24} className="text-gray-400"/></button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Customer</label>
            <div className="relative">
              <select className="w-full border p-3 rounded-xl bg-gray-50 text-sm appearance-none" onChange={(e) => { setCustId(e.target.value); setContactId(''); }}>
                <option value="">Select...</option>
                {MOCK_CUSTOMERS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <ChevronRight className="absolute right-3 top-3.5 text-gray-400 rotate-90 pointer-events-none" size={16}/>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
            <div className="relative">
              <select 
                className="w-full border p-3 rounded-xl bg-gray-50 text-sm disabled:opacity-50 appearance-none" 
                onChange={(e) => setContactId(e.target.value)}
                disabled={!custId}
                value={contactId}
              >
                <option value="">{availableContacts.length > 0 ? "Select Contact..." : "No contacts found"}</option>
                {availableContacts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <ChevronRight className="absolute right-3 top-3.5 text-gray-400 rotate-90 pointer-events-none" size={16}/>
            </div>
          </div>

          {selectedContactInfo && (
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-sm space-y-1 animate-in fade-in">
               <p><span className="font-bold text-blue-800">Designation:</span> {selectedContactInfo.designation}</p>
               <p><span className="font-bold text-blue-800">Phone:</span> {selectedContactInfo.phone}</p>
               <p><span className="font-bold text-blue-800">Email:</span> {selectedContactInfo.email}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date" value={date} className="w-full border p-3 rounded-xl bg-gray-50 text-sm" onChange={(e) => setDate(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Purpose/Agenda</label>
            <div className="relative">
              <select 
                className="w-full border p-3 rounded-xl bg-gray-50 text-sm appearance-none" 
                value={note} 
                onChange={(e) => setNote(e.target.value)}
              >
                <option value="">Select Purpose...</option>
                {VISIT_PURPOSES.map((purpose, idx) => (
                  <option key={idx} value={purpose}>{purpose}</option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-3.5 text-gray-400 rotate-90 pointer-events-none" size={16}/>
            </div>
          </div>

          <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold mt-2 text-base shadow-lg shadow-blue-200">Save Plan</button>
        </div>
      </div>
    </div>
  );
};

const FeedbackModal = ({ visit, onClose, onSave }) => {
  if (!visit) return null;
  const customer = MOCK_CUSTOMERS.find(c => c.id === visit.customerId);

  const [selectedFeedback, setSelectedFeedback] = useState(visit.feedback || []);
  const [meetingMinutes, setMeetingMinutes] = useState(visit.minutes || '');
  const [nextFollowUp, setNextFollowUp] = useState(visit.nextFollowUp || '');
  const [prodLine, setProdLine] = useState(visit.productionInfo?.line || '');
  const [prodQty, setProdQty] = useState(visit.productionInfo?.qty || '');
  const [selectedBrands, setSelectedBrands] = useState(visit.productionInfo?.brands || []);

  const toggleFeedback = (item) => {
    if(selectedFeedback.includes(item)) {
      setSelectedFeedback(selectedFeedback.filter(i => i !== item));
    } else {
      setSelectedFeedback([...selectedFeedback, item]);
    }
  };

  const toggleBrand = (brandId) => {
     if(selectedBrands.includes(brandId)) {
      setSelectedBrands(selectedBrands.filter(id => id !== brandId));
    } else {
      setSelectedBrands([...selectedBrands, brandId]);
    }
  };

  const handleSubmit = () => {
    onSave(visit.id, {
      status: 'Completed', 
      minutes: meetingMinutes,
      nextFollowUp: nextFollowUp,
      feedback: selectedFeedback,
      productionInfo: (prodLine || prodQty) ? { 
         line: prodLine, 
         qty: prodQty, 
         brands: selectedBrands 
      } : null
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center sm:p-4 backdrop-blur-sm overflow-y-auto z-[100]">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10 pb-3 border-b">
          <h3 className="text-xl font-bold">{visit.status === 'Completed' ? 'Update Report' : 'Submit Report'}</h3>
          <button onClick={onClose}><X size={24} className="text-gray-400"/></button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
               <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold bg-blue-200 text-blue-700 px-2 py-0.5 rounded uppercase">{visit.status === 'Completed' ? 'COMPLETED' : 'REPORT PENDING'}</span>
                  <span className="text-[10px] text-gray-500">Date: {visit.date}</span>
               </div>
               <div className="font-bold text-blue-900 text-lg">{customer?.name}</div>
               <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-600">
                 <div>In: <span className="font-mono font-bold">{visit.checkInTime || '--:--'}</span></div>
                 <div>Out: <span className="font-mono font-bold">{visit.checkOutTime || '--:--'}</span></div>
               </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">Meeting Minutes</label>
            <textarea 
              className="w-full border p-3 rounded-xl bg-white text-sm" 
              rows="3" 
              placeholder="What was discussed?"
              value={meetingMinutes}
              onChange={(e) => setMeetingMinutes(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Outcomes</label>
            <div className="grid grid-cols-2 gap-2">
              {FEEDBACK_OPTIONS.map((opt, idx) => (
                <div key={idx} onClick={() => toggleFeedback(opt)} className={`p-2 rounded-lg border text-xs font-medium cursor-pointer flex items-center gap-2 ${selectedFeedback.includes(opt) ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-200 text-gray-600'}`}>
                  {selectedFeedback.includes(opt) ? <CheckSquare size={16} /> : <Square size={16} />}
                  {opt}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">Next Follow-up</label>
            <input 
              type="date" 
              className="w-full border p-3 rounded-xl bg-white text-sm"
              value={nextFollowUp}
              onChange={(e) => setNextFollowUp(e.target.value)}
            />
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Factory size={18} className="text-gray-500"/>
              <label className="text-sm font-bold text-gray-800">Production (Optional)</label>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input type="text" placeholder="Line No." value={prodLine} onChange={(e) => setProdLine(e.target.value)} className="w-full border p-3 rounded-xl text-sm" />
              <input type="number" placeholder="Qty" value={prodQty} onChange={(e) => setProdQty(e.target.value)} className="w-full border p-3 rounded-xl text-sm" />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Running Brands</label>
              <div className="flex flex-wrap gap-2">
                 {MOCK_BRANDS.map(brand => (
                   <button 
                     key={brand.id}
                     onClick={() => toggleBrand(brand.id)}
                     className={`px-3 py-1 rounded-lg text-xs border font-medium ${selectedBrands.includes(brand.id) ? 'bg-purple-100 border-purple-300 text-purple-700' : 'bg-gray-50 border-gray-200 text-gray-500'}`}
                   >
                     {brand.name}
                   </button>
                 ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2 sticky bottom-0 bg-white pb-1">
              <button onClick={onClose} className="flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-xl font-bold text-sm">Cancel</button>
              <button onClick={handleSubmit} className="flex-1 bg-green-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-green-200 text-sm">
                {visit.status === 'Completed' ? 'Update Report' : 'Save Report'}
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Views
const DashboardView = ({ visits, onNavigate, onPlanVisit, onSelectVisit, onAction }) => {
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
                <button 
                  onClick={(e) => { e.stopPropagation(); onAction(visit, 'checkin'); }}
                  className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-xl shadow-md active:scale-95 shrink-0 ml-2 whitespace-nowrap font-bold flex items-center gap-1"
                >
                  <PlayCircle size={14}/> Check In
                </button>
              );
            } else if (visit.status === 'In Progress') {
              actionButton = (
                <button 
                  onClick={(e) => { e.stopPropagation(); onAction(visit, 'checkout'); }}
                  className="bg-orange-500 text-white text-xs px-3 py-1.5 rounded-xl shadow-md active:scale-95 shrink-0 ml-2 whitespace-nowrap font-bold flex items-center gap-1 animate-pulse"
                >
                  <StopCircle size={14}/> Check Out
                </button>
              );
            } else if (visit.status === 'Checked Out') {
              actionButton = (
                <button 
                  onClick={(e) => { e.stopPropagation(); onAction(visit, 'feedback'); }}
                  className="bg-yellow-500 text-white text-xs px-3 py-1.5 rounded-xl shadow-md active:scale-95 shrink-0 ml-2 whitespace-nowrap font-bold flex items-center gap-1"
                >
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

const ClientsView = ({ clientTab, setClientTab, onSelectCustomer, onSelectBrand }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = clientTab === 'customers' 
    ? ['All', 'Woven', 'Denim', 'Knit'] 
    : ['All', 'Retail', 'Fast Fashion', 'Casual'];

  const filteredData = (clientTab === 'customers' ? MOCK_CUSTOMERS : MOCK_BRANDS).filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'All' 
          ? true 
          : (clientTab === 'customers' ? item.type === activeFilter : item.segment === activeFilter);
      return matchesSearch && matchesFilter;
  });

  return (
    <div className="pb-24 pt-4 px-4 h-full overflow-y-auto">
      <div className="flex p-1.5 bg-gray-100 rounded-xl mb-4 shadow-inner">
        <button 
          onClick={() => { setClientTab('customers'); setActiveFilter('All'); }} 
          className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${clientTab === 'customers' ? 'bg-white shadow text-blue-900' : 'text-gray-500'}`}
        >
          Factories
        </button>
        <button 
          onClick={() => { setClientTab('brands'); setActiveFilter('All'); }} 
          className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${clientTab === 'brands' ? 'bg-white shadow text-blue-900' : 'text-gray-500'}`}
        >
          Brands
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder={`Search ${clientTab}...`} 
          className="w-full bg-white border border-gray-200 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar items-center">
          {filters.map(filter => (
              <FilterChip 
                  key={filter} 
                  label={filter} 
                  active={activeFilter === filter} 
                  onClick={() => setActiveFilter(filter)} 
              />
          ))}
      </div>

      <div className="space-y-3">
        {filteredData.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No results found</div>
        ) : (
          filteredData.map(item => {
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

const VisitsView = ({ visits, onSelectVisit, onAction }) => {
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredVisits = visits.filter(v => {
      const isToday = v.date === getDateString(0);
      if (statusFilter === 'Today') return isToday;
      if (statusFilter === 'Planned') return v.status === 'Planned';
      if (statusFilter === 'In Progress') return v.status === 'In Progress';
      if (statusFilter === 'Checked Out') return v.status === 'Checked Out';
      if (statusFilter === 'Completed') return v.status === 'Completed';
      return true;
  }).sort((a,b) => new Date(a.date) - new Date(b.date));

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
                <button 
                    onClick={(e) => { e.stopPropagation(); onAction(visit, 'checkin'); }}
                    className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg shadow-md active:scale-95 shrink-0 ml-1 whitespace-nowrap font-bold"
                >
                    Check In
                </button>
                );
            } else if (visit.status === 'In Progress') {
                actionButton = (
                <button 
                    onClick={(e) => { e.stopPropagation(); onAction(visit, 'checkout'); }}
                    className="bg-orange-500 text-white text-xs px-3 py-1.5 rounded-lg shadow-md active:scale-95 shrink-0 ml-1 whitespace-nowrap font-bold animate-pulse"
                >
                    Check Out
                </button>
                );
            } else if (visit.status === 'Checked Out') {
                actionButton = (
                <button 
                    onClick={(e) => { e.stopPropagation(); onAction(visit, 'feedback'); }}
                    className="bg-yellow-500 text-white text-xs px-3 py-1.5 rounded-lg shadow-md active:scale-95 shrink-0 ml-1 whitespace-nowrap font-bold"
                >
                    Report
                </button>
                );
            } else {
                actionButton = (
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded flex items-center gap-1"><CheckCircle size={10}/> Done</span>
                );
            }

            return (
                <div key={visit.id} onClick={() => onSelectVisit(visit)} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 active:scale-95 transition-transform cursor-pointer relative overflow-hidden">
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${visit.status === 'In Progress' ? 'bg-orange-500' : visit.status === 'Completed' ? 'bg-green-500' : visit.status === 'Checked Out' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                
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

const VisitDetailView = ({ visit, onClose, onCheckIn, onCheckOut, onFeedback }) => {
  const customer = MOCK_CUSTOMERS.find(c => c.id === visit.customerId);
  const contact = MOCK_CONTACTS.find(c => c.id === visit.contactId);

  return (
    <div className="pb-24 bg-white min-h-screen">
      <div className="bg-blue-600 text-white p-6 pb-10 rounded-b-3xl relative">
        <button onClick={onClose} className="absolute top-5 left-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="mt-8">
          <div className="flex gap-2 mb-3">
            <span className="inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
              <Calendar size={12}/> {visit.date}
            </span>
            {visit.time && (
              <span className="inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
                <Clock size={12}/> {visit.time}
              </span>
            )}
          </div>
          <h2 className="text-2xl font-bold">{customer?.name}</h2>
          <p className="opacity-90 text-sm flex items-center gap-1.5 mt-1"><MapPin size={14}/> {customer?.address}</p>
        </div>
      </div>

      <div className="px-5 -mt-8 space-y-4">
        <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
          <div className="flex justify-between items-center mb-3">
              <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Current Status</p>
              <p className={`text-lg font-bold ${visit.status === 'Completed' ? 'text-green-600' : visit.status === 'In Progress' ? 'text-orange-600' : 'text-blue-600'}`}>
                  {visit.status}
              </p>
              </div>
              <div className={`p-3 rounded-full ${visit.status === 'Completed' ? 'bg-green-100 text-green-600' : visit.status === 'In Progress' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
              {visit.status === 'Completed' ? <CheckCircle size={24}/> : <Clock size={24}/>}
              </div>
          </div>
          
          {(visit.checkInTime || visit.location) && (
              <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-4">
                  {visit.checkInTime && (
                      <div>
                          <p className="text-[10px] text-gray-400 uppercase font-bold flex items-center gap-1"><PlayCircle size={10}/> Checked In</p>
                          <p className="text-sm font-bold text-gray-800">{visit.checkInTime}</p>
                      </div>
                  )}
                  {visit.checkOutTime && (
                      <div className="text-right">
                          <p className="text-[10px] text-gray-400 uppercase font-bold flex items-center justify-end gap-1"><StopCircle size={10}/> Checked Out</p>
                          <p className="text-sm font-bold text-gray-800">{visit.checkOutTime}</p>
                      </div>
                  )}
                  {visit.location && (
                      <div className="col-span-2 mt-1 bg-gray-50 p-2 rounded-lg flex items-start gap-2">
                          <Navigation size={14} className="text-blue-500 mt-0.5 shrink-0"/>
                          <div>
                              <p className="text-[10px] text-gray-400 uppercase font-bold">Location Captured</p>
                              <p className="text-xs text-gray-700">{visit.location}</p>
                          </div>
                      </div>
                  )}
              </div>
          )}
        </div>

        {contact && (
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm uppercase text-indigo-600"><User size={16}/> Meeting With</h3>
            <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100">
               <p className="font-bold text-indigo-900">{contact.name}</p>
               <p className="text-xs text-indigo-600 mb-1">{contact.designation}</p>
               <p className="text-xs text-gray-600 font-mono">{contact.phone} • {contact.email}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-sm uppercase text-blue-600"><FileText size={16}/> Agenda</h3>
          <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
            {visit.notes || 'No specific agenda.'}
          </p>
        </div>

        {visit.status === 'Planned' && (
           <button 
              onClick={() => onCheckIn(visit)}
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-200 flex items-center justify-center gap-2 mt-4 text-base active:scale-95 transition-transform"
           >
              <PlayCircle size={20}/> Check In Now
           </button>
        )}

        {visit.status === 'In Progress' && (
           <button 
              onClick={() => onCheckOut(visit)}
              className="w-full bg-orange-500 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-orange-200 flex items-center justify-center gap-2 mt-4 text-base active:scale-95 transition-transform animate-pulse"
           >
              <StopCircle size={20}/> Check Out
           </button>
        )}

        {visit.status === 'Checked Out' && (
           <button 
              onClick={() => onFeedback(visit)}
              className="w-full bg-yellow-500 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-yellow-200 flex items-center justify-center gap-2 mt-4 text-base active:scale-95 transition-transform"
           >
              <FileText size={20}/> Submit Report
           </button>
        )}

        {visit.status === 'Completed' && (
          <>
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-sm uppercase text-purple-600">
                <MessageSquare size={16}/> Meeting Minutes
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed bg-purple-50 p-3 rounded-xl border border-purple-100">
                {visit.minutes || 'No detailed minutes recorded.'}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm uppercase text-amber-600"><Lightbulb size={16}/> Outcomes</h3>
              <div className="flex flex-wrap gap-2">
                {visit.feedback && visit.feedback.length > 0 ? (
                  visit.feedback.map((fb, i) => (
                    <span key={i} className="px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold border border-amber-100 flex items-center gap-1">
                      <CheckCircle size={12}/> {fb}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm italic">No action points recorded.</p>
                )}
              </div>
            </div>

             <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-800 mb-0.5 flex items-center gap-2 text-sm uppercase text-red-600">
                  <CalendarDays size={16}/> Next Follow-up
                </h3>
              </div>
              <div className="bg-red-50 text-red-600 font-bold px-3 py-1.5 rounded-lg text-sm border border-red-100">
                {visit.nextFollowUp || 'Not Set'}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm uppercase text-indigo-600"><Factory size={16}/> Production Info</h3>
              
              {visit.productionInfo ? (
                <div className="space-y-3">
                   <div className="grid grid-cols-2 gap-3">
                      <div className="bg-indigo-50 p-3 rounded-xl">
                         <p className="text-xs text-indigo-400 font-bold uppercase">Running Line</p>
                         <p className="font-bold text-indigo-900 text-sm">{visit.productionInfo.line}</p>
                      </div>
                      <div className="bg-indigo-50 p-3 rounded-xl">
                         <p className="text-xs text-indigo-400 font-bold uppercase">Quantity</p>
                         <p className="font-bold text-indigo-900 text-sm">{visit.productionInfo.qty} pcs</p>
                      </div>
                   </div>
                   
                   <div>
                      <p className="text-xs text-gray-500 font-bold mb-2 uppercase">Running Brands</p>
                      <div className="flex flex-wrap gap-2">
                         {visit.productionInfo.brands.map(brandId => {
                            const brandName = MOCK_BRANDS.find(b => b.id === brandId)?.name;
                            return (
                              <span key={brandId} className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium border">
                                {brandName}
                              </span>
                            );
                         })}
                      </div>
                   </div>
                </div>
              ) : (
                <p className="text-gray-400 text-sm italic">No production info.</p>
              )}
            </div>

             <button 
                onClick={() => onFeedback(visit)}
                className="w-full bg-blue-100 text-blue-700 py-3.5 rounded-xl font-bold shadow-sm border border-blue-200 flex items-center justify-center gap-2 mt-4 text-base active:scale-95 transition-transform"
             >
                <PenTool size={20}/> Update Report
             </button>
          </>
        )}

      </div>
    </div>
  );
};

const CustomerDetailView = ({ customer, onBack, onPlanVisit, visits, onSelectVisit }) => {
  const customerContacts = MOCK_CONTACTS.filter(c => c.customerId === customer.id);
  const linkedBrands = MOCK_BRANDS.filter(b => customer.brandIds.includes(b.id));

  return (
    <div className="pb-24 bg-white min-h-screen">
      <div className="bg-blue-900 text-white p-6 pb-12 rounded-b-3xl relative">
        <button onClick={onBack} className="absolute top-5 left-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="mt-6 text-center">
          <div className="w-20 h-20 bg-white text-blue-900 mx-auto rounded-full flex items-center justify-center text-2xl font-bold mb-3 shadow-xl ring-4 ring-blue-800">
            {customer.name.substring(0,2).toUpperCase()}
          </div>
          <h2 className="text-2xl font-bold">{customer.name}</h2>
          <p className="opacity-80 flex items-center justify-center gap-1.5 mt-1"><MapPin size={16}/> {customer.address}</p>
        </div>
      </div>

      <div className="px-5 -mt-8 space-y-4">
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-3 border-b pb-2 flex items-center gap-2">
            <User size={18} className="text-blue-600"/> Key Contacts
          </h3>
          {customerContacts.length > 0 ? (
            <div className="space-y-3">
              {customerContacts.map(contact => (
                <div key={contact.id} className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-800">{contact.name}</p>
                      <p className="text-xs text-gray-500">{contact.designation}</p>
                      <div className="mt-1 space-y-0.5">
                        <p className="text-xs text-blue-600 font-mono flex items-center gap-1"><Phone size={10}/> {contact.phone}</p>
                        <p className="text-xs text-gray-600 font-mono flex items-center gap-1"><Mail size={10}/> {contact.email}</p>
                      </div>
                    </div>
                    <button className="bg-green-100 p-2 rounded-full text-green-600 hover:bg-green-200 active:scale-95 transition-transform">
                      <Phone size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic">No contacts added.</p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
           <h3 className="font-bold text-gray-800 mb-3 border-b pb-2 flex items-center gap-2">
            <Tags size={18} className="text-purple-600"/> Associated Brands
          </h3>
          <div className="flex flex-wrap gap-2">
            {linkedBrands.map(brand => (
              <span key={brand.id} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-100">
                {brand.name}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-3 border-b pb-2 flex items-center gap-2">
            <Clock size={18} className="text-orange-600"/> Visit History
          </h3>
          {visits.filter(v => v.customerId === customer.id).map(visit => (
             <div key={visit.id} onClick={() => onSelectVisit(visit)} className="mb-3 last:mb-0 cursor-pointer active:opacity-70 border-b border-gray-50 pb-3 last:border-0 last:pb-0">
               <div className="flex justify-between items-center mb-1">
                 <span className="font-medium text-gray-800">{visit.date}</span>
                 <span className={`text-xs px-2 py-0.5 rounded-md font-bold ${visit.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{visit.status}</span>
               </div>
               <p className="text-sm text-gray-500">{visit.notes}</p>
             </div>
          ))}
        </div>
        
        <button onClick={onPlanVisit} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-200 text-base active:scale-95 transition-transform">
          Schedule New Visit
        </button>
      </div>
    </div>
  );
};

const BrandDetailView = ({ brand, onBack, onSelectCustomer }) => {
  const suppliers = MOCK_CUSTOMERS.filter(c => c.brandIds.includes(brand.id));

  return (
    <div className="pb-24 bg-white min-h-screen">
       <div className="bg-purple-900 text-white p-6 pb-12 rounded-b-3xl relative">
        <button onClick={onBack} className="absolute top-5 left-4 p-2 bg-white/20 rounded-full hover:bg-white/30">
          <ArrowLeft size={24} />
        </button>
        <div className="mt-6 text-center">
          <div className="w-20 h-20 bg-white text-purple-900 mx-auto rounded-full flex items-center justify-center text-3xl font-bold mb-3 shadow-xl">
            {brand.name.substring(0,1).toUpperCase()}
          </div>
          <h2 className="text-2xl font-bold">{brand.name}</h2>
          <p className="opacity-80">{brand.origin} • {brand.segment}</p>
        </div>
      </div>

      <div className="px-5 -mt-8">
         <div className="bg-white rounded-2xl shadow-lg p-5 mb-4 border border-gray-100">
           <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">Active Suppliers</h3>
           {suppliers.length > 0 ? (
             <div className="space-y-3">
               {suppliers.map(c => (
                 <div key={c.id} onClick={() => onSelectCustomer(c)} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl active:bg-gray-100 cursor-pointer border border-gray-100">
                   <div>
                     <p className="font-bold text-gray-800">{c.name}</p>
                     <p className="text-sm text-gray-500">{c.address}</p>
                   </div>
                   <ChevronRight size={18} className="text-gray-400" />
                 </div>
               ))}
             </div>
           ) : (
             <p className="text-gray-500 italic">No suppliers linked yet.</p>
           )}
         </div>
      </div>
    </div>
  );
};

const ProductDetailView = ({ product, onBack }) => {
  const maxVal = Math.max(...product.history);

  return (
    <div className="pb-24 bg-white min-h-screen">
      <div className="bg-orange-600 text-white p-6 pb-10 rounded-b-3xl relative">
        <button onClick={onBack} className="absolute top-5 left-4 p-2 bg-white/20 rounded-full hover:bg-white/30">
          <ArrowLeft size={24} />
        </button>
        <div className="mt-8">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <div className="flex items-center gap-3 opacity-90 mt-2">
            <span className="text-3xl font-bold">{formatCurrency(product.achieved)}</span>
            <span className="text-sm bg-white/20 px-2 py-0.5 rounded">Achieved</span>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
           <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
             <TrendingUp size={20} className="text-orange-600"/> 6-Month Sales Trend
           </h3>
           
           <div className="flex items-end justify-between h-32 gap-2">
              {product.history.map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col justify-end items-center group">
                  <div 
                    className="w-full bg-orange-200 rounded-t hover:bg-orange-500 transition-colors relative"
                    style={{ height: `${(val / maxVal) * 100}%` }}
                  ></div>
                  <span className="text-xs text-gray-400 mt-2 font-medium">M{idx+1}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="mt-4 bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-3">Performance Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 uppercase font-bold">Target</p>
              <p className="font-bold text-gray-800 text-lg mt-1">{formatCurrency(product.target)}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 uppercase font-bold">Achievement %</p>
              <p className={`font-bold text-lg mt-1 ${(product.achieved/product.target) >= 0.8 ? 'text-green-600' : 'text-red-600'}`}>
                {((product.achieved/product.target)*100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamVisitsView = ({ visits, onNavigate }) => {
  const [teamFilter, setTeamFilter] = useState('Today');
  const [selectedMember, setSelectedMember] = useState(null);

  const totalPlanned = MOCK_TEAM_MEMBERS.reduce((acc, curr) => acc + curr.planned, 0);
  const totalVisited = MOCK_TEAM_MEMBERS.reduce((acc, curr) => acc + curr.visited, 0);
  const overallSuccess = Math.round((totalVisited / totalPlanned) * 100);

  if (selectedMember) {
    const memberVisits = visits.filter(v => v.userId === selectedMember.id || (selectedMember.id === 1 && !v.userId));

    return (
      <div className="pb-24 bg-white min-h-screen">
        <div className="bg-blue-600 text-white p-6 pb-10 rounded-b-3xl relative">
          <button onClick={() => setSelectedMember(null)} className="absolute top-5 left-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div className="mt-6 text-center">
            <div className="w-20 h-20 bg-white text-blue-900 mx-auto rounded-full flex items-center justify-center text-2xl font-bold mb-3 shadow-xl ring-4 ring-blue-800">
              {selectedMember.name.charAt(0)}
            </div>
            <h2 className="text-2xl font-bold">{selectedMember.name}</h2>
            <p className="opacity-80 text-sm">{selectedMember.role}</p>
          </div>
        </div>

        <div className="px-5 -mt-8">
          <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 mb-4">
            <h3 className="font-bold text-gray-800 mb-3 border-b pb-2 text-sm uppercase text-gray-500">Performance ({teamFilter})</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-800">{selectedMember.planned}</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Planned</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{selectedMember.visited}</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Visited</p>
              </div>
              <div>
                 <p className="text-2xl font-bold text-blue-600">{Math.round((selectedMember.visited/selectedMember.planned)*100)}%</p>
                 <p className="text-[10px] text-gray-500 uppercase font-bold">Rate</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-3">
             <h3 className="font-bold text-gray-800">Visit Log</h3>
             <div className="flex gap-1">
               {['Today', 'Week', 'Month'].map(f => (
                 <FilterChip key={f} label={f} active={teamFilter === f} onClick={() => setTeamFilter(f)} />
               ))}
             </div>
          </div>

          <div className="space-y-3">
            {memberVisits.length > 0 ? memberVisits.map(visit => {
              const customer = MOCK_CUSTOMERS.find(c => c.id === visit.customerId);
              return (
                <div key={visit.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                   <div className="flex justify-between items-center mb-2">
                     <span className="font-bold text-sm text-gray-800">{customer?.name}</span>
                     <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${visit.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                       {visit.status}
                     </span>
                   </div>
                   <div className="flex justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar size={12}/> {visit.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12}/> {visit.time || '--:--'}</span>
                   </div>
                   {visit.notes && <p className="text-xs text-gray-600 mt-2 bg-gray-50 p-2 rounded">{visit.notes}</p>}
                </div>
              )
            }) : (
              <p className="text-sm text-gray-400 text-center py-6 bg-gray-50 rounded-xl border border-dashed">No visits found for this period.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-4 px-4 h-full overflow-y-auto">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => onNavigate('more')} className="bg-gray-100 p-2 rounded-full"><ArrowLeft size={22}/></button>
        <h2 className="text-2xl font-bold text-gray-800">Team Visits</h2>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
           {['Today', 'Week', 'Month'].map(f => (
               <FilterChip key={f} label={f} active={teamFilter === f} onClick={() => setTeamFilter(f)} />
           ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 border border-gray-100">
         <h3 className="text-gray-500 font-bold uppercase text-xs mb-4 tracking-wider">Overall Team Status</h3>
         <div className="flex items-center justify-between px-4">
            <div className="relative w-28 h-28 flex items-center justify-center">
               <svg className="w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="45" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                  <circle cx="56" cy="56" r="45" stroke="#3b82f6" strokeWidth="8" fill="none" strokeDasharray={`${overallSuccess * 2.8} 283`} strokeLinecap="round" />
               </svg>
               <div className="absolute text-center">
                 <span className="text-2xl font-bold text-blue-600 block">{overallSuccess}%</span>
                 <span className="text-[10px] text-gray-400 uppercase">Success</span>
               </div>
            </div>
            <div className="text-right space-y-4">
               <div>
                 <p className="text-3xl font-bold text-gray-800">{totalVisited}</p>
                 <p className="text-xs text-gray-400 font-bold uppercase">Completed</p>
               </div>
               <div>
                 <p className="text-xl font-bold text-gray-400">{totalPlanned}</p>
                 <p className="text-xs text-gray-400 font-bold uppercase">Planned</p>
               </div>
            </div>
         </div>
      </div>

      <h3 className="font-bold text-gray-800 mb-3 text-lg">Member Summary</h3>
      <div className="space-y-3">
        {MOCK_TEAM_MEMBERS.map(member => {
          const pct = Math.round((member.visited / member.planned) * 100);
          return (
            <div key={member.id} onClick={() => setSelectedMember(member)} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-transform cursor-pointer flex justify-between items-center">
              <div className="flex items-center gap-4">
                 <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${member.color.replace('bg-', 'bg-opacity-90 bg-')}`}>
                    {member.name.charAt(0)}
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-800 text-base">{member.name}</h4>
                    <p className="text-xs text-gray-500">{member.role}</p>
                 </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                   <span className="text-xs text-gray-400">{member.visited}/{member.planned}</span>
                   <span className={`text-sm font-bold ${pct >= 80 ? 'text-green-600' : pct >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>{pct}%</span>
                </div>
                <div className="w-20 bg-gray-100 h-1.5 rounded-full overflow-hidden mt-1 ml-auto">
                  <div className={`h-full rounded-full ${member.color}`} style={{ width: `${pct}%` }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TargetVsAchievementView = ({ onNavigate }) => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const totalTarget = MOCK_PERSON_SALES.reduce((acc, curr) => acc + curr.target, 0);
  const totalAchieved = MOCK_PERSON_SALES.reduce((acc, curr) => acc + curr.achieved, 0);
  const totalPct = (totalAchieved / totalTarget) * 100;

  if (selectedPerson) {
    const maxVal = Math.max(...selectedPerson.history);
    return (
      <div className="pb-24 bg-white min-h-screen">
        <div className="bg-orange-600 text-white p-6 pb-10 rounded-b-3xl relative">
          <button onClick={() => setSelectedPerson(null)} className="absolute top-5 left-4 p-2 bg-white/20 rounded-full hover:bg-white/30">
            <ArrowLeft size={24} />
          </button>
          <div className="mt-8">
            <h2 className="text-2xl font-bold">{selectedPerson.name}</h2>
            <div className="flex items-center gap-3 opacity-90 mt-2">
              <span className="text-3xl font-bold">{formatCurrency(selectedPerson.achieved)}</span>
              <span className="text-sm bg-white/20 px-2 py-0.5 rounded">Achieved</span>
            </div>
            <p className="text-xs text-orange-100 mt-1">Target: {formatCurrency(selectedPerson.target)}</p>
          </div>
        </div>

        <div className="px-5 -mt-6">
          <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 mb-4">
             <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
               <TrendingUp size={20} className="text-orange-600"/> Last 6 Months Trend
             </h3>
             <div className="flex items-end justify-between h-32 gap-2">
                {selectedPerson.history.map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col justify-end items-center group">
                    <div className="w-full bg-orange-200 rounded-t hover:bg-orange-500 transition-colors relative" style={{ height: `${(val / maxVal) * 100}%` }}></div>
                    <span className="text-xs text-gray-400 mt-2 font-medium">M{idx+1}</span>
                  </div>
                ))}
             </div>
          </div>

          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Trophy size={18} className="text-yellow-500"/> Top 5 Clients</h3>
          <div className="space-y-2">
             {selectedPerson.topClients.map((client, i) => (
               <div key={i} className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                 <div className="flex items-center gap-3">
                   <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs font-bold">{i+1}</span>
                   <span className="font-bold text-gray-700 text-sm">{client.name}</span>
                 </div>
                 <span className="text-sm font-bold text-green-600">{formatCurrency(client.value)}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-4 px-4 h-full overflow-y-auto">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => onNavigate('more')} className="bg-gray-100 p-2 rounded-full"><ArrowLeft size={22}/></button>
        <h2 className="text-2xl font-bold text-gray-800">Target vs Achievement</h2>
      </div>

      <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-2xl shadow-lg mb-6 relative overflow-hidden">
        <div className="relative z-10">
            <p className="text-orange-100 text-sm font-medium mb-1">Total Achievement</p>
            <h3 className="text-3xl font-bold">{formatCurrency(totalAchieved)}</h3>
            <p className="text-sm opacity-80 mt-1">Target: {formatCurrency(totalTarget)}</p>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1 font-medium">
                  <span>Progress</span>
                  <span>{totalPct.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
                  <div className="bg-white h-full rounded-full" style={{ width: `${totalPct}%` }}></div>
              </div>
            </div>
        </div>
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      <h3 className="font-bold text-gray-800 mb-3">Marketing Person Wise</h3>
      <div className="space-y-3">
        {MOCK_PERSON_SALES.map((person) => {
          const pct = (person.achieved / person.target) * 100;
          return (
            <div key={person.id} onClick={() => setSelectedPerson(person)} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-transform cursor-pointer">
              <div className="flex justify-between mb-2">
                <div>
                   <span className="font-bold text-gray-800">{person.name}</span>
                   <p className="text-xs text-gray-500">{person.role}</p>
                </div>
                <span className={`text-sm font-bold ${pct >= 80 ? 'text-green-600' : 'text-red-600'}`}>{pct.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-2">
                <div className={`h-full rounded-full ${pct > 80 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>{formatCurrency(person.achieved)}</span>
                <span>Target: {formatCurrency(person.target)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

const MoreView = ({ onNavigate, setClientTab }) => {
  const menuItems = [
    { id: 'team_rpt', label: 'Team Visits', icon: <UserCheck size={24}/>, color: 'text-blue-600', bg: 'bg-blue-100', action: () => onNavigate('team_visits') }, 
    { id: 'sales', label: 'Target vs Achv.', icon: <TrendingUp size={24}/>, color: 'text-orange-600', bg: 'bg-orange-100', action: () => onNavigate('target_vs_achv') },
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
      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Management & Strategy</h3>
      <div className="grid grid-cols-4 gap-2 mb-6">
        {menuItems.slice(0, 4).map(item => (
          <button key={item.id} onClick={item.action} className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform h-20">
            <div className={`${item.bg} p-2 rounded-full ${item.color}`}>{item.icon}</div>
            <span className="text-[10px] font-bold text-gray-700 text-center leading-tight">{item.label}</span>
          </button>
        ))}
      </div>
      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Logistics & Product</h3>
      <div className="grid grid-cols-4 gap-2 mb-6">
         {menuItems.slice(4, 10).map(item => (
          <button key={item.id} className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform h-20">
            <div className={`${item.bg} p-2 rounded-full ${item.color}`}>{item.icon}</div>
            <span className="text-[10px] font-bold text-gray-700 text-center leading-tight">{item.label}</span>
          </button>
        ))}
      </div>
      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Others</h3>
      <div className="grid grid-cols-4 gap-2 mb-6">
         {menuItems.slice(10).map(item => (
          <button key={item.id} className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform h-20">
            <div className={`${item.bg} p-2 rounded-full ${item.color}`}>{item.icon}</div>
            <span className="text-[10px] font-bold text-gray-700 text-center leading-tight">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [clientTab, setClientTab] = useState('customers');
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(null);
  const [isMobileView, setIsMobileView] = useState(true);

  const [visits, setVisits] = useState([
    { 
      id: 101, 
      customerId: 1, 
      contactId: 1, 
      date: getDateString(0), 
      time: '10:30 AM',
      status: 'Completed', 
      notes: 'Sample submitted for Approval',
      checkInTime: '10:15 AM', 
      checkOutTime: '11:00 AM', 
      location: 'Tejgaon, Dhaka (23.76, 90.39)', 
      minutes: 'Met with GM. He liked the 3040 sample.',
      nextFollowUp: '2023-10-30',
      feedback: ['Sample Submitted'],
      productionInfo: { line: 'Line-A', qty: '5000', brands: [1] }
    },
    { 
      id: 102, 
      customerId: 2, 
      contactId: 3,
      date: getDateString(0), 
      time: '',
      status: 'Planned', 
      notes: 'Price negotiation for Winter season',
      checkInTime: null,
      checkOutTime: null,
      location: null,
      minutes: '',
      nextFollowUp: '',
      feedback: [],
      productionInfo: null
    },
    { 
      id: 103, 
      customerId: 3, 
      contactId: 4,
      date: getDateString(1), 
      time: '',
      status: 'Planned', 
      notes: 'Monthly Payment Collection',
      checkInTime: null,
      checkOutTime: null,
      location: null,
      minutes: '',
      nextFollowUp: '',
      feedback: [],
      productionInfo: null
    },
  ]);

  const handleNav = (view) => {
    setCurrentView(view);
    setSelectedCustomer(null);
    setSelectedBrand(null);
    setSelectedProduct(null);
    setSelectedVisit(null);
    setShowQuickMenu(false);
  };

  const handleCheckIn = (visit) => {
    const simulatedLocation = "Lat: 23.8103, Long: 90.4125";
    const currentTime = getTimeString();

    const updatedVisits = visits.map(v => 
      v.id === visit.id ? {
        ...v,
        status: 'In Progress',
        checkInTime: currentTime,
        location: simulatedLocation
      } : v
    );
    setVisits(updatedVisits);
  };

  const handleCheckOut = (visit) => {
    const currentTime = getTimeString();

    const updatedVisits = visits.map(v => 
      v.id === visit.id ? {
        ...v,
        status: 'Checked Out',
        checkOutTime: currentTime
      } : v
    );
    setVisits(updatedVisits);
  };

  const handleSaveVisit = (newVisit) => {
    setVisits([...visits, { id: Date.now(), ...newVisit }]);
  };

  const handleFeedbackSubmit = (id, updatedData) => {
    const updatedVisits = visits.map(v => 
      v.id === id ? { ...v, ...updatedData } : v
    );
    setVisits(updatedVisits);
    setShowFeedbackModal(null);
  };

  const handleVisitAction = (visit, actionType) => {
    if (actionType === 'checkin') handleCheckIn(visit);
    else if (actionType === 'checkout') handleCheckOut(visit);
    else if (actionType === 'feedback') setShowFeedbackModal(visit);
    else if (actionType === 'complete') { handleCheckOut(visit); setShowFeedbackModal(visit); }
  };

  return (
    <div className={`bg-gray-100 h-screen font-sans flex flex-col shadow-2xl overflow-hidden relative border-x border-gray-200 mx-auto transition-all duration-300 ${isMobileView ? 'max-w-md' : 'max-w-full'}`}>
       <div className="absolute top-4 right-4 z-50">
        <button onClick={() => setIsMobileView(!isMobileView)} className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all">
          {isMobileView ? <Monitor size={20} className="text-gray-700"/> : <Smartphone size={20} className="text-gray-700"/>}
        </button>
      </div>
       <main className="flex-1 overflow-y-auto no-scrollbar bg-gray-50">
        {selectedVisit ? (
           <VisitDetailView visit={selectedVisit} onClose={() => setSelectedVisit(null)} onCheckIn={handleCheckIn} onCheckOut={handleCheckOut} onFeedback={(v) => setShowFeedbackModal(v)} />
        ) : selectedCustomer ? (
          <CustomerDetailView customer={selectedCustomer} onBack={() => setSelectedCustomer(null)} onPlanVisit={() => setShowPlanModal(true)} visits={visits} onSelectVisit={setSelectedVisit} />
        ) : selectedBrand ? (
          <BrandDetailView brand={selectedBrand} onBack={() => setSelectedBrand(null)} onSelectCustomer={setSelectedCustomer} />
        ) : selectedProduct ? (
          <ProductDetailView product={selectedProduct} onBack={() => setSelectedProduct(null)} />
        ) : (
          <>
            {currentView === 'dashboard' && <DashboardView visits={visits} onNavigate={handleNav} onPlanVisit={() => setShowPlanModal(true)} onSelectVisit={setSelectedVisit} onAction={handleVisitAction} />}
            {currentView === 'customers' && <ClientsView clientTab={clientTab} setClientTab={setClientTab} onSelectCustomer={setSelectedCustomer} onSelectBrand={setSelectedBrand} />}
            {currentView === 'visits' && <VisitsView visits={visits} onSelectVisit={setSelectedVisit} onAction={handleVisitAction} />}
            {currentView === 'more' && <MoreView onNavigate={handleNav} setClientTab={setClientTab} />}
            {currentView === 'team_visits' && <TeamVisitsView visits={visits} onNavigate={handleNav} />}
            {currentView === 'target_vs_achv' && <TargetVsAchievementView onNavigate={handleNav} />}
          </>
        )}
       </main>

       {!selectedVisit && !selectedCustomer && !selectedBrand && !selectedProduct && (
        <nav className="bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center fixed bottom-0 w-full z-40 pb-5 transition-all duration-300" style={{ maxWidth: isMobileView ? '28rem' : '100%' }}>
          {showQuickMenu && (
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-xs bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-5 animate-in slide-in-from-bottom-8 fade-in zoom-in-95 z-50 origin-bottom">
              <div className="text-center mb-4"><h3 className="text-gray-800 font-bold text-lg">Quick Actions</h3><p className="text-xs text-gray-400">What would you like to do?</p></div>
              <div className="space-y-3">
                <button onClick={() => { setShowQuickMenu(false); setShowPlanModal(true); }} className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-lg shadow-blue-200 active:scale-95 transition-transform">
                  <div className="bg-white/20 p-2 rounded-full"><Calendar size={24}/></div><div className="text-left"><span className="block font-bold text-base">Plan Visit</span><span className="block text-xs opacity-80">Schedule a new meeting</span></div><ChevronRight className="ml-auto opacity-50" size={20}/>
                </button>
                <div className="grid grid-cols-3 gap-3">
                  <button onClick={() => setShowQuickMenu(false)} className="flex flex-col items-center gap-2 p-3 bg-gray-50 hover:bg-indigo-50 rounded-2xl border border-gray-100 transition-colors active:scale-95"><div className="bg-white p-2 rounded-full shadow-sm text-indigo-600"><UserPlus size={20}/></div><span className="text-[10px] font-bold text-gray-600">Client</span></button>
                  <button onClick={() => setShowQuickMenu(false)} className="flex flex-col items-center gap-2 p-3 bg-gray-50 hover:bg-purple-50 rounded-2xl border border-gray-100 transition-colors active:scale-95"><div className="bg-white p-2 rounded-full shadow-sm text-purple-600"><Tags size={20}/></div><span className="text-[10px] font-bold text-gray-600">Brand</span></button>
                  <button onClick={() => setShowQuickMenu(false)} className="flex flex-col items-center gap-2 p-3 bg-gray-50 hover:bg-red-50 rounded-2xl border border-gray-100 transition-colors active:scale-95"><div className="bg-white p-2 rounded-full shadow-sm text-red-600"><Swords size={20}/></div><span className="text-[10px] font-bold text-gray-600">Rival</span></button>
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
            </div>
          )}
          {showQuickMenu && <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setShowQuickMenu(false)}></div>}
          <button onClick={() => handleNav('dashboard')} className={`flex flex-col items-center gap-1 ${currentView === 'dashboard' ? 'text-blue-600' : 'text-gray-400'}`}><LayoutDashboard size={24} strokeWidth={currentView === 'dashboard' ? 2.5 : 2} /><span className="text-[10px] font-bold">Home</span></button>
          <button onClick={() => handleNav('customers')} className={`flex flex-col items-center gap-1 ${currentView === 'customers' ? 'text-blue-600' : 'text-gray-400'}`}><Users size={24} strokeWidth={currentView === 'customers' ? 2.5 : 2} /><span className="text-[10px] font-bold">Clients</span></button>
          <div className="relative -top-6 z-50"><button onClick={() => setShowQuickMenu(!showQuickMenu)} className={`bg-blue-600 text-white p-4 rounded-full shadow-lg shadow-blue-200 border-4 border-gray-50 active:scale-95 transition-transform ${showQuickMenu ? 'rotate-45' : ''}`}><Plus size={24} strokeWidth={3} /></button></div>
          <button onClick={() => handleNav('visits')} className={`flex flex-col items-center gap-1 ${currentView === 'visits' ? 'text-blue-600' : 'text-gray-400'}`}><Calendar size={24} strokeWidth={currentView === 'visits' ? 2.5 : 2} /><span className="text-[10px] font-bold">Visits</span></button>
          <button onClick={() => handleNav('more')} className={`flex flex-col items-center gap-1 ${['more', 'sales_detail', 'team_report', 'team_visits', 'target_vs_achv'].includes(currentView) ? 'text-blue-600' : 'text-gray-400'}`}><MoreHorizontal size={24} strokeWidth={['more', 'sales_detail', 'team_report'].includes(currentView) ? 2.5 : 2} /><span className="text-[10px] font-bold">More</span></button>
        </nav>
       )}

       <AddVisitModal isOpen={showPlanModal} onClose={() => setShowPlanModal(false)} onSave={handleSaveVisit} />
       <FeedbackModal visit={showFeedbackModal} onClose={() => setShowFeedbackModal(null)} onSave={handleFeedbackSubmit} />
    </div>
  );
}
