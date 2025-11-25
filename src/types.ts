export interface Customer {
  id: number;
  name: string;
  address: string;
  type: string;
  contact: string;
  brandIds: number[];
}

export interface Brand {
  id: number;
  name: string;
  segment: string;
  origin: string;
}

export interface Contact {
  id: number;
  customerId: number;
  name: string;
  designation: string;
  phone: string;
  email: string;
}

export interface ProductionInfo {
  line: string;
  qty: string;
  brands: number[];
}

export interface Visit {
  id: number;
  customerId: number;
  contactId: number | null;
  date: string;
  time?: string;
  status: 'Planned' | 'In Progress' | 'Checked Out' | 'Completed';
  notes: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  location: string | null;
  minutes?: string;
  nextFollowUp?: string;
  feedback: string[];
  productionInfo: ProductionInfo | null;
}

export interface Product {
  id: string;
  name: string;
  target: number;
  achieved: number;
  history: number[];
}

export interface SalesData {
  monthlyTarget: number;
  achieved: number;
  products: Product[];
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  planned: number;
  visited: number;
  color: string;
}

export type ViewType = 'dashboard' | 'customers' | 'visits' | 'more' | 'sales_detail' | 'team_report';
export type ClientTabType = 'customers' | 'brands';
export type ActionType = 'checkin' | 'checkout' | 'feedback' | 'complete';
