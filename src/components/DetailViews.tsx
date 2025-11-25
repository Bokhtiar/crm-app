import React from 'react';
import {
  ArrowLeft, Calendar, Clock, CheckCircle, MapPin, User, FileText, Phone,
  PlayCircle, StopCircle, Navigation, PenTool, Factory, MessageSquare,
  CalendarDays, Lightbulb, Tags, Plus, ChevronRight, TrendingUp
} from 'lucide-react';
import type { Visit, Customer, Brand, Product } from '../types';
import { MOCK_CUSTOMERS, MOCK_CONTACTS, MOCK_BRANDS } from '../mockData';
import { formatCurrency } from '../utils';

interface VisitDetailViewProps {
  visit: Visit;
  onClose: () => void;
  onCheckIn: (visit: Visit) => void;
  onCheckOut: (visit: Visit) => void;
  onFeedback: (visit: Visit) => void;
}

export const VisitDetailView: React.FC<VisitDetailViewProps> = ({ visit, onClose, onCheckIn, onCheckOut, onFeedback }) => {
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
           <button onClick={() => onCheckIn(visit)} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-200 flex items-center justify-center gap-2 mt-4 text-base active:scale-95 transition-transform">
              <PlayCircle size={20}/> Check In Now
           </button>
        )}

        {visit.status === 'In Progress' && (
           <button onClick={() => onCheckOut(visit)} className="w-full bg-orange-500 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-orange-200 flex items-center justify-center gap-2 mt-4 text-base active:scale-95 transition-transform animate-pulse">
              <StopCircle size={20}/> Check Out
           </button>
        )}

        {visit.status === 'Checked Out' && (
           <button onClick={() => onFeedback(visit)} className="w-full bg-yellow-500 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-yellow-200 flex items-center justify-center gap-2 mt-4 text-base active:scale-95 transition-transform">
              <FileText size={20}/> Submit Report
           </button>
        )}

        {visit.status === 'Completed' && (
          <>
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-sm uppercase text-purple-600"><MessageSquare size={16}/> Meeting Minutes</h3>
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
             <button onClick={() => onFeedback(visit)} className="w-full bg-blue-100 text-blue-700 py-3.5 rounded-xl font-bold shadow-sm border border-blue-200 flex items-center justify-center gap-2 mt-4 text-base active:scale-95 transition-transform">
                <PenTool size={20}/> Update Report
             </button>
          </>
        )}
      </div>
    </div>
  );
};

interface CustomerDetailViewProps {
  customer: Customer;
  onBack: () => void;
  onPlanVisit: () => void;
  visits: Visit[];
  onSelectVisit: (visit: Visit) => void;
}

export const CustomerDetailView: React.FC<CustomerDetailViewProps> = ({ customer, onBack, onPlanVisit, visits, onSelectVisit }) => {
  const customerVisits = visits.filter(v => v.customerId === customer.id);
  const contacts = MOCK_CONTACTS.filter(c => c.customerId === customer.id);
  const brands = MOCK_BRANDS.filter(b => customer.brandIds.includes(b.id));

  return (
    <div className="pb-24 bg-white min-h-screen">
      <div className="bg-blue-600 text-white p-6 pb-10 rounded-b-3xl relative">
        <button onClick={onBack} className="absolute top-5 left-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="mt-8">
          <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-2">{customer.type}</span>
          <h2 className="text-2xl font-bold">{customer.name}</h2>
          <p className="opacity-90 text-sm flex items-center gap-1.5 mt-1"><MapPin size={14}/> {customer.address}</p>
          <p className="opacity-90 text-sm flex items-center gap-1.5 mt-1"><Phone size={14}/> {customer.contact}</p>
        </div>
      </div>

      <div className="px-5 -mt-8 space-y-4">
        <button onClick={onPlanVisit} className="w-full bg-white rounded-2xl shadow-lg p-4 border border-gray-100 flex items-center justify-center gap-2 font-bold text-blue-600 hover:bg-blue-50 transition-colors">
          <Plus size={20}/> Plan New Visit
        </button>

        {contacts.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><User size={18}/> Contact Persons</h3>
            <div className="space-y-2">
              {contacts.map(contact => (
                <div key={contact.id} className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <p className="font-bold text-gray-800">{contact.name}</p>
                  <p className="text-xs text-gray-600">{contact.designation}</p>
                  <div className="flex gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Phone size={12}/> {contact.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {brands.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Tags size={18}/> Working Brands</h3>
            <div className="flex flex-wrap gap-2">
              {brands.map(brand => (
                <span key={brand.id} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-bold border border-purple-200">
                  {brand.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Calendar size={18}/> Visit History ({customerVisits.length})</h3>
          {customerVisits.length === 0 ? (
            <p className="text-gray-400 text-sm italic">No visits recorded yet.</p>
          ) : (
            <div className="space-y-2">
              {customerVisits.slice(0, 5).map(visit => (
                <div key={visit.id} onClick={() => onSelectVisit(visit)} className="bg-gray-50 p-3 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-bold text-gray-700">{visit.date}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{visit.notes}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      visit.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                      visit.status === 'In Progress' ? 'bg-orange-100 text-orange-700' : 
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {visit.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface BrandDetailViewProps {
  brand: Brand;
  onBack: () => void;
  onSelectCustomer: (customer: Customer) => void;
}

export const BrandDetailView: React.FC<BrandDetailViewProps> = ({ brand, onBack, onSelectCustomer }) => {
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

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product, onBack }) => {
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

