const fs = require('fs');

const appCode = `import React, { useState } from 'react';

import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  TrendingUp, 
  Plus, 
  MapPin, 
  Phone, 
  Briefcase, 
  CheckCircle, 
  Clock, 
  ChevronRight,
  Menu,
  X,
  FileText,
  Search,
  User,
  Tags,
  BarChart2,
  ArrowLeft,
  MoreHorizontal,
  Factory,
  Swords,
  StickyNote,
  Package,
  Globe,
  Truck,
  ClipboardCheck,
  ScrollText,
  Lightbulb,
  Building2,
  CheckSquare,
  Square,
  PieChart,
  UserCheck,
  Filter,
  SlidersHorizontal,
  Info,
  CalendarDays,
  MessageSquare,
  Mail,
  UserPlus,
  Target,
  Percent,
  PlayCircle,
  StopCircle,
  Navigation,
  PenTool,
  LogOut,
  Edit,
  Monitor,
  Smartphone,
  Trophy,
  ChevronDown,
  Send,
  Bell,
  AlertCircle,
  Check
} from 'lucide-react';

// --- Helpers ---
const getDateString = (offset = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().split('T')[0];
};

const getTimeString = () => {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);

// --- Constants ---
const VISIT_PURPOSES = [
  "Relationship Buildup",
  "Requirement Collection",
  "Sample Collection",
  "Counter Sample Providing",
  "Quality Checking by Customer",
  "Sample Making by Customer",
  "Waiting for Quality Approval",
  "Price Negotiation",
  "Waiting for Booking",
  "Booking Received"
];

const SUGGESTION_OPTIONS = [
  "Increase Client Visit Frequency",
  "Focus on Payment Collection",
  "Improve Product Knowledge",
  "Target High-Value Clients",
  "Better Time Management",
  "Follow-up on Pending Samples"
];

// Mock Data would go here - truncated for brevity
// ... continuing with all components
export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">CRM Application</h1>
        <p className="text-gray-600">Setting up your application...</p>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/App.jsx', appCode, 'utf8');
console.log('App.jsx created successfully!');
