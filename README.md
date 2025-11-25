# 🚀 CRM Application - Customer Relationship Management

A modern, responsive CRM application built with React, TypeScript, and Tailwind CSS v4.

## ✨ Features

- 📊 **Dashboard** - Overview of visits, sales targets, and performance metrics
- 👥 **Customer Management** - Manage factories and their contacts
- 🏷️ **Brand Management** - Track brands and their suppliers
- 📅 **Visit Planning** - Schedule and track customer visits
- ✅ **Check-in/Check-out** - Real-time visit tracking with location capture
- 📝 **Visit Reports** - Detailed feedback and meeting minutes
- 💰 **Sales Tracking** - Monitor sales targets and achievements
- 👨‍💼 **Team Performance** - Track team visit completion rates
- 📱 **Responsive Design** - Mobile-first with desktop view toggle

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd crm-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## 🌐 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

### Manual Deployment:

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

## 📁 Project Structure

```
crm-app/
├── src/
│   ├── components/          # React components
│   │   ├── DashboardView.tsx
│   │   ├── DetailViews.tsx
│   │   ├── Modals.tsx
│   │   ├── SalesAndTeamViews.tsx
│   │   └── Views.tsx
│   ├── types.ts            # TypeScript type definitions
│   ├── mockData.ts         # Mock data for demo
│   ├── utils.ts            # Utility functions
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json
└── vite.config.ts
```

## 🎨 Features Overview

### Dashboard
- Monthly sales target progress
- Visit overview (Today/Week/Month/Custom date)
- Quick stats: Planned, Completed, Pending, Completion Rate
- Today's schedule with action buttons

### Customer Management
- List of factories/customers
- Filter by type (Woven/Denim/Knit)
- Search functionality
- Detailed customer profiles with contacts and visit history

### Visit Management
- Plan new visits with date and agenda
- Check-in with location capture
- Check-out functionality
- Submit detailed visit reports with:
  - Meeting minutes
  - Outcomes/Feedback
  - Next follow-up date
  - Production information

### Sales & Team Reports
- Product-wise sales breakdown
- 6-month sales trend visualization
- Team performance tracking
- Member-wise completion rates

## 📱 Screenshots

[Add screenshots of your application here]

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is [MIT](LICENSE) licensed.

## 👨‍💻 Author

Built with ❤️ by [Your Name]

---

⭐ If you found this project helpful, please give it a star!
