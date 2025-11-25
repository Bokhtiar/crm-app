import type { Customer, Brand, Contact, SalesData, TeamMember } from './types';

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 1, name: 'Ha-Meem Group', address: 'Tejgaon, Dhaka', type: 'Woven', contact: '01711-000000', brandIds: [1, 3] },
  { id: 2, name: 'Beximco Textiles', address: 'Gazipur', type: 'Denim', contact: '01811-000000', brandIds: [2, 4] },
  { id: 3, name: 'Palmal Group', address: 'Ashulia', type: 'Knit', contact: '01911-000000', brandIds: [3, 5] },
  { id: 4, name: 'Envoy Textiles', address: 'Mymensingh', type: 'Denim', contact: '01611-000000', brandIds: [1, 2] },
  { id: 5, name: 'Square Fashions', address: 'Valuka', type: 'Knit', contact: '01511-000000', brandIds: [3, 4] },
];

export const MOCK_BRANDS: Brand[] = [
  { id: 1, name: 'H&M', segment: 'Retail', origin: 'Sweden' },
  { id: 2, name: 'Zara', segment: 'Fast Fashion', origin: 'Spain' },
  { id: 3, name: 'Gap', segment: 'Casual', origin: 'USA' },
  { id: 4, name: 'Uniqlo', segment: 'Lifestyle', origin: 'Japan' },
  { id: 5, name: 'Next', segment: 'Retail', origin: 'UK' },
];

export const MOCK_CONTACTS: Contact[] = [
  { id: 1, customerId: 1, name: 'Mr. Rahim', designation: 'GM (Production)', phone: '01711-111111', email: 'rahim@hameem.com' },
  { id: 2, customerId: 1, name: 'Ms. Fatema', designation: 'Sr. Merchandiser', phone: '01711-222222', email: 'fatema@hameem.com' },
  { id: 3, customerId: 2, name: 'Mr. Karim', designation: 'Director', phone: '01811-333333', email: 'karim@beximco.com' },
  { id: 4, customerId: 3, name: 'Mr. Sazzad', designation: 'Procurement Mgr', phone: '01911-444444', email: 'sazzad@palmal.com' },
  { id: 5, customerId: 4, name: 'Mr. Tanvir', designation: 'DGM (Fabric)', phone: '01611-555555', email: 'tanvir@envoy.com' },
  { id: 6, customerId: 5, name: 'Ms. Sadia', designation: 'Head of Design', phone: '01511-666666', email: 'sadia@square.com' },
];

export const MOCK_SALES_DATA: SalesData = {
  monthlyTarget: 500000,
  achieved: 325000,
  products: [
    { id: 'p1', name: 'Woven Interlining 3040', target: 200000, achieved: 150000, history: [120000, 140000, 130000, 160000, 180000, 150000] },
    { id: 'p2', name: 'Non-Woven 1025', target: 150000, achieved: 80000, history: [60000, 70000, 60000, 80000, 90000, 80000] },
    { id: 'p3', name: 'Micro Dot Fusible', target: 150000, achieved: 95000, history: [80000, 80000, 90000, 90000, 100000, 95000] },
  ]
};

export const FEEDBACK_OPTIONS = [
  "Sample Submitted", "Price Negotiation", "Order Received", "Complaint Received", "Competitor Info", "Payment Follow-up"
];

export const MOCK_TEAM_PERFORMANCE: TeamMember[] = [
  { id: 1, name: 'Arif (You)', role: 'Sr. Exec', planned: 25, visited: 22, color: 'bg-green-500' },
  { id: 2, name: 'Hassan', role: 'Executive', planned: 30, visited: 15, color: 'bg-red-500' },
  { id: 3, name: 'Rubel', role: 'Asst. Mgr', planned: 20, visited: 18, color: 'bg-green-500' },
  { id: 4, name: 'Sohel', role: 'Executive', planned: 28, visited: 20, color: 'bg-yellow-500' },
];

