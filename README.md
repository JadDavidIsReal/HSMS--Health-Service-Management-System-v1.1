# Health Services Management System (HSMS)

A comprehensive web-based Health Services Management System designed for school clinics, built with React, TypeScript, and Tailwind CSS.

## 🏥 Overview

This system provides role-based access for three types of users:

- **Nurse** - Primary user with access to all pages except prescriptions
- **Doctor** - Can log in and write official prescriptions for assigned patients
- **Patient** - Students and employees who can view their own records and request appointments

## ✨ Features

### Dashboard
- Role-specific summary cards with health services statistics
- Recent activity feed
- Quick action shortcuts
- Responsive design with modern healthcare UI

### Patient Records (Nurse Only)
- Complete patient database with CRUD operations
- Search functionality by name, email, or ID
- Medical history tracking
- Student/Employee classification
- Emergency contact information

### Appointments (All Roles)
- **Nurse**: Full schedule management and appointment oversight
- **Patient**: Request new appointments and view personal schedule
- **Doctor**: View assigned appointments and patient schedules
- Status management (Pending, Confirmed, Completed, Cancelled)

### Prescriptions (Doctor Only)
- Digital prescription writing with patient selection
- Medicine database with common medications
- Dosage and instruction management
- Prescription history and tracking

### Medical Services (Nurse Only)
- Service catalog management
- Cost and duration tracking
- Availability toggles
- Service statistics and reporting

### Staff Directory (Nurse Only)
- Complete staff information management
- Role and department organization
- Contact information tracking
- Staff statistics overview

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hsms
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 🔐 Demo Credentials

The system includes demo credentials for testing:

### Nurse Access
- **Email**: nurse@clinic.edu
- **Password**: nurse123
- **Access**: All pages except prescriptions

### Doctor Access
- **Email**: doctor@clinic.edu  
- **Password**: doctor123
- **Access**: Dashboard, Appointments, Prescriptions

### Patient Access
- **Email**: student@clinic.edu
- **Password**: student123
- **Access**: Dashboard (patient view), Appointments (personal)

## 🛠 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom healthcare design system
- **UI Components**: Radix UI components (shadcn/ui)
- **Icons**: Lucide React
- **Routing**: React Router v6
- **State Management**: React Context API
- **Build Tool**: Vite
- **Form Handling**: React Hook Form with Zod validation

## 🎨 Design System

The application features a custom healthcare-themed design system with:
- Medical-inspired color palette (blues, greens, healthcare tones)
- Semantic color tokens for consistent theming
- Responsive typography scale
- Accessible contrast ratios
- Mobile-first responsive design

## 📱 Mobile Responsive

The system is fully responsive and optimized for:
- Desktop computers (primary use case)
- Tablets (iPad, Android tablets)
- Mobile phones (iOS, Android)
- Various screen sizes and orientations

## 🔧 Key Features

### Authentication & Security
- Role-based access control
- Protected routes
- Persistent login sessions
- Automatic redirects based on user role

### User Experience
- Intuitive sidebar navigation with active state highlighting
- Real-time form validation
- Toast notifications for user feedback
- Loading states and error handling
- Search and filter functionality across all data tables

### Data Management
- Local state management with realistic mock data
- CRUD operations for all major entities
- Form validation and error handling
- Optimistic UI updates

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, Sidebar, etc.)
│   └── ui/             # Base UI components (shadcn/ui)
├── contexts/           # React Context providers
├── data/              # Mock data and type definitions
├── hooks/             # Custom React hooks
├── pages/             # Main application pages
└── lib/               # Utility functions
```

## 🔮 Future Enhancements

- Integration with real backend API
- Advanced reporting and analytics
- Appointment calendar view
- Email notifications
- Document upload and management
- Telemedicine integration
- Insurance management
- Billing system integration

## 📄 License

This project is created for educational purposes as part of a school project showcase.

## 🤝 Contributing

This is a student project, but feedback and suggestions are welcome for learning purposes.

---

**Note**: This is a frontend prototype using mock data. No real patient information is stored or processed.