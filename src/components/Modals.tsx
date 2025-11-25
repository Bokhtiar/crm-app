import React, { useState } from 'react';
import { X, Factory, CheckSquare, Square } from 'lucide-react';
import type { Visit } from '../types';
import { MOCK_CUSTOMERS, MOCK_CONTACTS, MOCK_BRANDS, FEEDBACK_OPTIONS } from '../mockData';
import { getDateString } from '../utils';

interface AddVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (visit: Partial<Visit>) => void;
}

export const AddVisitModal: React.FC<AddVisitModalProps> = ({ isOpen, onClose, onSave }) => {
  const [date, setDate] = useState(getDateString(0));
  const [custId, setCustId] = useState('');
  const [contactId, setContactId] = useState('');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const availableContacts = MOCK_CONTACTS.filter(c => c.customerId === parseInt(custId));
  const selectedContactInfo = MOCK_CONTACTS.find(c => c.id === parseInt(contactId));

  const handleSubmit = () => {
    if (!custId || !date) return; 
    onSave({
      customerId: parseInt(custId),
      contactId: parseInt(contactId) || null,
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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Plan New Visit</h3>
          <button onClick={onClose}><X size={24} className="text-gray-400"/></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Customer</label>
            <select className="w-full border p-3 rounded-xl bg-gray-50 text-sm" onChange={(e) => { setCustId(e.target.value); setContactId(''); }} value={custId}>
              <option value="">Select...</option>
              {MOCK_CUSTOMERS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
            <select 
              className="w-full border p-3 rounded-xl bg-gray-50 text-sm disabled:opacity-50" 
              onChange={(e) => setContactId(e.target.value)}
              disabled={!custId}
              value={contactId}
            >
              <option value="">{availableContacts.length > 0 ? "Select Contact..." : "No contacts found"}</option>
              {availableContacts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
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
            <textarea className="w-full border p-3 rounded-xl bg-gray-50 text-sm" rows={3} placeholder="e.g. Price Negotiation" onChange={(e) => setNote(e.target.value)}></textarea>
          </div>
          <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold mt-2 text-base shadow-lg shadow-blue-200">Save Plan</button>
        </div>
      </div>
    </div>
  );
};

interface FeedbackModalProps {
  visit: Visit | null;
  onClose: () => void;
  onSave: (id: number, data: Partial<Visit>) => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ visit, onClose, onSave }) => {
  if (!visit) return null;
  
  const customer = MOCK_CUSTOMERS.find(c => c.id === visit.customerId);
  const [selectedFeedback, setSelectedFeedback] = useState<string[]>(visit.feedback || []);
  const [meetingMinutes, setMeetingMinutes] = useState(visit.minutes || '');
  const [nextFollowUp, setNextFollowUp] = useState(visit.nextFollowUp || '');
  const [prodLine, setProdLine] = useState(visit.productionInfo?.line || '');
  const [prodQty, setProdQty] = useState(visit.productionInfo?.qty || '');
  const [selectedBrands, setSelectedBrands] = useState<number[]>(visit.productionInfo?.brands || []);

  const toggleFeedback = (item: string) => {
    if(selectedFeedback.includes(item)) {
      setSelectedFeedback(selectedFeedback.filter(i => i !== item));
    } else {
      setSelectedFeedback([...selectedFeedback, item]);
    }
  };

  const toggleBrand = (brandId: number) => {
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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center sm:p-4 backdrop-blur-sm overflow-y-auto">
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
            <textarea className="w-full border p-3 rounded-xl bg-white text-sm" rows={3} placeholder="What was discussed?" value={meetingMinutes} onChange={(e) => setMeetingMinutes(e.target.value)}></textarea>
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
            <input type="date" className="w-full border p-3 rounded-xl bg-white text-sm" value={nextFollowUp} onChange={(e) => setNextFollowUp(e.target.value)} />
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
                   <button key={brand.id} onClick={() => toggleBrand(brand.id)} className={`px-3 py-1 rounded-lg text-xs border font-medium ${selectedBrands.includes(brand.id) ? 'bg-purple-100 border-purple-300 text-purple-700' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
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

