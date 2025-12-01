# CRM Marketing Application

A modern, mobile-first CRM (Customer Relationship Management) application for marketing executives to manage client visits, track sales targets, and collaborate with teams.

## 🚀 Features

### Core Functionality
- **Dashboard**: Real-time overview of visits, targets, and achievements
- **Visit Management**: Plan, check-in, check-out, and submit detailed reports
- **Client Management**: Manage factories, brands, and contacts
- **Sales Tracking**: Monitor individual and team sales performance
- **Team Collaboration**: View team member activities and provide feedback
- **Notifications**: Stay updated with important alerts and reminders

### Key Highlights
- 📱 Mobile-responsive design with desktop view toggle
- 🎨 Beautiful UI with Tailwind CSS
- 🔄 Real-time status updates for visits
- 📊 Visual sales analytics and trends
- 📍 Location tracking for visit check-ins
- 📝 Detailed feedback and reporting system
- 👥 Team performance monitoring
- 🎯 Target vs Achievement tracking

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Language**: JavaScript (JSX)

## 📦 Installation

The project has already been installed and is running. But if you need to reinstall:

```bash
# Navigate to project directory
cd "/home/bokhtiar/Desktop/taukir bhai/crm/decembar 1"

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚦 Running the Application

The application is currently running at:
**http://localhost:3002/**

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Application Structure

### Main Views
1. **Dashboard** - Home screen with visit overview and quick actions
2. **Clients** - Manage factories and brands
3. **Visits** - View and manage all visit plans
4. **More** - Access additional features and settings

### Sub-Views
- Visit Details
- Customer Details
- Brand Details
- Team Visits
- Target vs Achievement
- Notifications

### Mock Data
The application includes comprehensive mock data for:
- Customers (Factories)
- Brands
- Contacts
- Sales Data
- Team Members
- Notifications

## 🎯 User Flow

1. **Plan a Visit**: Click the + button → Plan Visit → Select customer, contact, and date
2. **Start Visit**: Check-in when arriving at the location
3. **Complete Visit**: Check-out and submit a detailed report
4. **Track Progress**: View analytics on the dashboard and reports section

## 🎨 Design Features

- Modern, clean UI with rounded corners and shadows
- Smooth animations and transitions
- Color-coded status indicators
- Interactive filters and search functionality
- Responsive mobile-first design
- Desktop/Mobile view toggle

## 📊 Key Metrics Tracked

- Monthly sales targets
- Visit completion rates
- Individual team member performance
- Client-wise sales
- Brand-wise sales
- Weekly/Monthly visit statistics

## 🔐 Mock Users

The application includes mock data for:
- **Arif (You)**: Sr. Marketing Executive
- **Hassan**: Executive
- **Rubel**: Assistant Manager
- **Sohel**: Executive

## 🏢 Sample Clients

- Ha-Meem Group (Woven)
- Beximco Textiles (Denim)
- Palmal Group (Knit)
- Envoy Textiles (Denim)
- Square Fashions (Knit)

## 🏷️ Sample Brands

- H&M (Sweden - Retail)
- Zara (Spain - Fast Fashion)
- Gap (USA - Casual)
- Uniqlo (Japan - Lifestyle)
- Next (UK - Retail)

## 📝 Notes

- This is a frontend-only application with mock data
- All data is stored in component state (resets on refresh)
- Location tracking is simulated with mock coordinates
- No backend API or database is required

## 🔧 Customization

To customize the application:

1. **Add Real Data**: Replace mock data in `src/App.jsx`
2. **Connect Backend**: Add API calls to fetch/update data
3. **Modify Styles**: Update Tailwind classes or `src/index.css`
4. **Add Features**: Create new components and views

## 🐛 Troubleshooting

If you encounter any issues:

1. **Port Already in Use**: The app will automatically try another port
2. **Dependencies Error**: Run `npm install` again
3. **Build Error**: Delete `node_modules` and run `npm install`
4. **Style Issues**: Clear browser cache and restart dev server

## 📄 License

This is a proprietary application developed for internal use.

## 👨‍💻 Developer

Developed for Taukir Bhai's CRM project.

---

**Happy Tracking! 🎉**
