import { useState } from 'react';
import { 
  LayoutDashboard, Users, Calendar, Plus, MoreHorizontal, Monitor, Smartphone,
  ChevronRight, UserPlus, Tags, Swords
} from 'lucide-react';
import type { Customer, Brand, Visit, Product, ViewType, ClientTabType, ActionType } from './types';
import { getDateString, getTimeString } from './utils';

// Import all view components
import { ClientsView, VisitsView, MoreView } from './components/Views';
import { VisitDetailView, CustomerDetailView, BrandDetailView, ProductDetailView } from './components/DetailViews';
import { SalesView, TeamReportView } from './components/SalesAndTeamViews';
import { AddVisitModal, FeedbackModal } from './components/Modals';
import DashboardView from './components/DashboardView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [clientTab, setClientTab] = useState<ClientTabType>('customers');
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState<Visit | null>(null);
  const [isMobileView, setIsMobileView] = useState(true);

  const [visits, setVisits] = useState<Visit[]>([
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

  const handleNav = (view: ViewType) => {
    setCurrentView(view);
    setSelectedCustomer(null);
    setSelectedBrand(null);
    setSelectedProduct(null);
    setSelectedVisit(null);
    setShowQuickMenu(false);
  };

  const handleCheckIn = (visit: Visit) => {
    const simulatedLocation = "Lat: 23.8103, Long: 90.4125";
    const currentTime = getTimeString();

    const updatedVisits = visits.map(v => 
      v.id === visit.id ? {
        ...v,
        status: 'In Progress' as const,
        checkInTime: currentTime,
        location: simulatedLocation
      } : v
    );
    setVisits(updatedVisits);
  };

  const handleCheckOut = (visit: Visit) => {
    const currentTime = getTimeString();

    const updatedVisits = visits.map(v => 
      v.id === visit.id ? {
        ...v,
        status: 'Checked Out' as const,
        checkOutTime: currentTime
      } : v
    );
    setVisits(updatedVisits);
  };

  const handleSaveVisit = (newVisit: Partial<Visit>) => {
    setVisits([...visits, { id: Date.now(), ...newVisit } as Visit]);
  };

  const handleFeedbackSubmit = (id: number, updatedData: Partial<Visit>) => {
    const updatedVisits = visits.map(v => 
      v.id === id ? { ...v, ...updatedData } : v
    );
    setVisits(updatedVisits);
    setShowFeedbackModal(null);
  };

  const handleVisitAction = (visit: Visit, actionType: ActionType) => {
    if (actionType === 'checkin') {
      handleCheckIn(visit);
    } else if (actionType === 'checkout') {
      handleCheckOut(visit);
    } else if (actionType === 'feedback') {
      setShowFeedbackModal(visit);
    } else if (actionType === 'complete') {
      handleCheckOut(visit);
      setShowFeedbackModal(visit);
    }
  };

  return (
    <div className={`bg-gray-100 h-screen font-sans flex flex-col shadow-2xl overflow-hidden relative border-x border-gray-200 mx-auto transition-all duration-300 ${isMobileView ? 'max-w-md' : 'max-w-full'}`}>
      
      {/* Header with Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={() => setIsMobileView(!isMobileView)}
          className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all"
          title={isMobileView ? "Switch to Desktop View" : "Switch to Mobile View"}
        >
          {isMobileView ? <Monitor size={20} className="text-gray-700"/> : <Smartphone size={20} className="text-gray-700"/>}
        </button>
      </div>

      <main className="flex-1 overflow-y-auto no-scrollbar bg-gray-50">
        {selectedVisit ? (
           <VisitDetailView 
             visit={selectedVisit} 
             onClose={() => setSelectedVisit(null)}
             onCheckIn={handleCheckIn}
             onCheckOut={handleCheckOut}
             onFeedback={(v) => setShowFeedbackModal(v)}
           />
        ) : selectedCustomer ? (
          <CustomerDetailView 
            customer={selectedCustomer} 
            onBack={() => setSelectedCustomer(null)}
            onPlanVisit={() => setShowPlanModal(true)}
            visits={visits}
            onSelectVisit={setSelectedVisit}
          />
        ) : selectedBrand ? (
          <BrandDetailView 
            brand={selectedBrand} 
            onBack={() => setSelectedBrand(null)}
            onSelectCustomer={setSelectedCustomer}
          />
        ) : selectedProduct ? (
          <ProductDetailView 
            product={selectedProduct} 
            onBack={() => setSelectedProduct(null)}
          />
        ) : (
          <>
            {currentView === 'dashboard' && 
              <DashboardView 
                visits={visits} 
                onNavigate={handleNav} 
                onPlanVisit={() => setShowPlanModal(true)}
                onSelectVisit={setSelectedVisit}
                onAction={handleVisitAction}
              />
            }
            {currentView === 'customers' && 
              <ClientsView 
                clientTab={clientTab} 
                setClientTab={setClientTab}
                onSelectCustomer={setSelectedCustomer}
                onSelectBrand={setSelectedBrand}
              />
            }
            {currentView === 'visits' && 
              <VisitsView 
                visits={visits}
                onSelectVisit={setSelectedVisit}
                onAction={handleVisitAction}
              />
            }
            {currentView === 'more' && <MoreView onNavigate={handleNav} setClientTab={setClientTab}/>}
            {currentView === 'sales_detail' && <SalesView onSelectProduct={setSelectedProduct} onNavigate={handleNav}/>}
            {currentView === 'team_report' && <TeamReportView onNavigate={handleNav}/>}
          </>
        )}
      </main>

      {!selectedVisit && !selectedCustomer && !selectedBrand && !selectedProduct && (
        <nav className="bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center fixed bottom-0 w-full z-40 pb-5 transition-all duration-300" style={{ maxWidth: isMobileView ? '28rem' : '100%' }}>
          {/* Quick Menu Popup */}
          {showQuickMenu && (
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-xs bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-5 animate-in slide-in-from-bottom-8 fade-in zoom-in-95 z-50 origin-bottom">
              
              <div className="text-center mb-4">
                <h3 className="text-gray-800 font-bold text-lg">Quick Actions</h3>
                <p className="text-xs text-gray-400">What would you like to do?</p>
              </div>

              <div className="space-y-3">
                <button onClick={() => { setShowQuickMenu(false); setShowPlanModal(true); }} className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-lg shadow-blue-200 active:scale-95 transition-transform">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Calendar size={24}/>
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-base">Plan Visit</span>
                    <span className="block text-xs opacity-80">Schedule a new meeting</span>
                  </div>
                  <ChevronRight className="ml-auto opacity-50" size={20}/>
                </button>

                <div className="grid grid-cols-3 gap-3">
                  <button onClick={() => setShowQuickMenu(false)} className="flex flex-col items-center gap-2 p-3 bg-gray-50 hover:bg-indigo-50 rounded-2xl border border-gray-100 transition-colors active:scale-95">
                    <div className="bg-white p-2 rounded-full shadow-sm text-indigo-600">
                      <UserPlus size={20}/>
                    </div>
                    <span className="text-[10px] font-bold text-gray-600">Client</span>
                  </button>

                  <button onClick={() => setShowQuickMenu(false)} className="flex flex-col items-center gap-2 p-3 bg-gray-50 hover:bg-purple-50 rounded-2xl border border-gray-100 transition-colors active:scale-95">
                    <div className="bg-white p-2 rounded-full shadow-sm text-purple-600">
                      <Tags size={20}/>
                    </div>
                    <span className="text-[10px] font-bold text-gray-600">Brand</span>
                  </button>

                  <button onClick={() => setShowQuickMenu(false)} className="flex flex-col items-center gap-2 p-3 bg-gray-50 hover:bg-red-50 rounded-2xl border border-gray-100 transition-colors active:scale-95">
                    <div className="bg-white p-2 rounded-full shadow-sm text-red-600">
                      <Swords size={20}/>
                    </div>
                    <span className="text-[10px] font-bold text-gray-600">Rival</span>
                  </button>
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
            </div>
          )}

          {showQuickMenu && (
            <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setShowQuickMenu(false)}></div>
          )}

          <button onClick={() => handleNav('dashboard')} className="flex flex-col items-center gap-1">
            <div className={`p-2 rounded-xl transition-all ${currentView === 'dashboard' ? 'bg-blue-100' : 'bg-transparent'}`}>
              <LayoutDashboard size={24} strokeWidth={currentView === 'dashboard' ? 2.5 : 2} className={currentView === 'dashboard' ? 'text-blue-600' : 'text-gray-400'} />
            </div>
            <span className={`text-[10px] font-bold ${currentView === 'dashboard' ? 'text-blue-600' : 'text-gray-400'}`}>Home</span>
          </button>

          <button onClick={() => handleNav('customers')} className="flex flex-col items-center gap-1">
            <div className={`p-2 rounded-xl transition-all ${currentView === 'customers' ? 'bg-blue-100' : 'bg-transparent'}`}>
              <Users size={24} strokeWidth={currentView === 'customers' ? 2.5 : 2} className={currentView === 'customers' ? 'text-blue-600' : 'text-gray-400'} />
            </div>
            <span className={`text-[10px] font-bold ${currentView === 'customers' ? 'text-blue-600' : 'text-gray-400'}`}>Clients</span>
          </button>

          <div className="relative -top-6 z-50">
             <button 
               onClick={() => setShowQuickMenu(!showQuickMenu)} 
               className={`bg-gradient-to-br from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-xl shadow-blue-300 border-4 border-white active:scale-95 transition-all hover:shadow-2xl hover:shadow-blue-400 ${showQuickMenu ? 'rotate-45' : ''}`}
             >
               <Plus size={28} strokeWidth={3} />
             </button>
          </div>

          <button onClick={() => handleNav('visits')} className="flex flex-col items-center gap-1">
            <div className={`p-2 rounded-xl transition-all ${currentView === 'visits' ? 'bg-blue-100' : 'bg-transparent'}`}>
              <Calendar size={24} strokeWidth={currentView === 'visits' ? 2.5 : 2} className={currentView === 'visits' ? 'text-blue-600' : 'text-gray-400'} />
            </div>
            <span className={`text-[10px] font-bold ${currentView === 'visits' ? 'text-blue-600' : 'text-gray-400'}`}>Visits</span>
          </button>

          <button onClick={() => handleNav('more')} className="flex flex-col items-center gap-1">
            <div className={`p-2 rounded-xl transition-all ${['more', 'sales_detail', 'team_report'].includes(currentView) ? 'bg-blue-100' : 'bg-transparent'}`}>
              <MoreHorizontal size={24} strokeWidth={['more', 'sales_detail', 'team_report'].includes(currentView) ? 2.5 : 2} className={['more', 'sales_detail', 'team_report'].includes(currentView) ? 'text-blue-600' : 'text-gray-400'} />
            </div>
            <span className={`text-[10px] font-bold ${['more', 'sales_detail', 'team_report'].includes(currentView) ? 'text-blue-600' : 'text-gray-400'}`}>More</span>
          </button>
        </nav>
      )}

      <AddVisitModal 
        isOpen={showPlanModal} 
        onClose={() => setShowPlanModal(false)} 
        onSave={handleSaveVisit}
      />
      
      <FeedbackModal 
        visit={showFeedbackModal} 
        onClose={() => setShowFeedbackModal(null)}
        onSave={handleFeedbackSubmit}
      />
    </div>
  );
}
