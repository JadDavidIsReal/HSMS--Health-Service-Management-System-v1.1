import React from 'react';
import { Users, Calendar, ClipboardList, UserCheck, Heart, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { dashboardStats } from '../data/mockData';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const getStatsCards = () => {
    switch (user?.role) {
      case 'nurse':
        return [
          {
            title: 'Total Patients',
            value: dashboardStats.nurse.totalPatients,
            description: 'Registered in system',
            icon: Users,
            color: 'text-primary'
          },
          {
            title: "Today's Appointments",
            value: dashboardStats.nurse.todayAppointments,
            description: 'Scheduled for today',
            icon: Calendar,
            color: 'text-secondary'
          },
          {
            title: 'Pending Appointments',
            value: dashboardStats.nurse.pendingAppointments,
            description: 'Awaiting confirmation',
            icon: ClipboardList,
            color: 'text-warning'
          },
          {
            title: 'Active Staff',
            value: dashboardStats.nurse.activeStaff,
            description: 'Current team members',
            icon: UserCheck,
            color: 'text-info'
          },
          {
            title: 'Available Services',
            value: dashboardStats.nurse.availableServices,
            description: 'Medical services offered',
            icon: Heart,
            color: 'text-success'
          },
          {
            title: 'Monthly Visits',
            value: dashboardStats.nurse.monthlyVisits,
            description: 'This month',
            icon: TrendingUp,
            color: 'text-accent'
          }
        ];

      case 'doctor':
        return [
          {
            title: 'My Appointments',
            value: dashboardStats.doctor.myAppointments,
            description: 'Total assigned to me',
            icon: Calendar,
            color: 'text-primary'
          },
          {
            title: "Today's Schedule",
            value: dashboardStats.doctor.todayAppointments,
            description: 'Appointments today',
            icon: ClipboardList,
            color: 'text-secondary'
          },
          {
            title: 'Prescriptions Written',
            value: dashboardStats.doctor.prescriptionsWritten,
            description: 'Total prescriptions',
            icon: Heart,
            color: 'text-success'
          },
          {
            title: 'Patients This Month',
            value: dashboardStats.doctor.patientsThisMonth,
            description: 'Unique patients seen',
            icon: Users,
            color: 'text-info'
          }
        ];

      case 'patient':
        return [
          {
            title: 'Upcoming Appointments',
            value: dashboardStats.patient.upcomingAppointments,
            description: 'Scheduled appointments',
            icon: Calendar,
            color: 'text-primary'
          },
          {
            title: 'Active Prescriptions',
            value: dashboardStats.patient.activePrescriptions,
            description: 'Current medications',
            icon: Heart,
            color: 'text-success'
          },
          {
            title: 'Last Visit',
            value: dashboardStats.patient.lastVisit,
            description: 'Most recent appointment',
            icon: ClipboardList,
            color: 'text-secondary'
          },
          {
            title: 'Health Records',
            value: dashboardStats.patient.healthRecords,
            description: 'Available documents',
            icon: Users,
            color: 'text-info'
          }
        ];

      default:
        return [];
    }
  };

  const statsCards = getStatsCards();

  const getWelcomeMessage = () => {
    switch (user?.role) {
      case 'nurse':
        return {
          title: `Welcome back, ${user.name}`,
          description: 'Here\'s an overview of today\'s health services activities and patient statistics.'
        };
      case 'doctor':
        return {
          title: `Good day, ${user.name}`,
          description: 'Review your appointments and patient care activities for today.'
        };
      case 'patient':
        return {
          title: `Hello, ${user.name}`,
          description: 'Welcome to your health services portal. View your appointments and health information.'
        };
      default:
        return {
          title: 'Welcome to HSMS',
          description: 'Health Services Management System'
        };
    }
  };

  const welcomeMessage = getWelcomeMessage();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-primary-foreground">
        <h1 className="text-2xl font-bold mb-2">{welcomeMessage.title}</h1>
        <p className="text-primary-foreground/90">{welcomeMessage.description}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New appointment scheduled</p>
                <p className="text-xs text-muted-foreground">Emma Wilson - General Checkup</p>
              </div>
              <span className="text-xs text-muted-foreground">2 min ago</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Prescription updated</p>
                <p className="text-xs text-muted-foreground">James Rodriguez - Albuterol Inhaler</p>
              </div>
              <span className="text-xs text-muted-foreground">15 min ago</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-info rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Staff member added</p>
                <p className="text-xs text-muted-foreground">New nurse joined the team</p>
              </div>
              <span className="text-xs text-muted-foreground">1 hour ago</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {user?.role === 'nurse' && (
              <>
                <button className="w-full p-3 text-left border border-border rounded-md hover:bg-muted transition-colors">
                  <p className="font-medium">Add New Patient</p>
                  <p className="text-sm text-muted-foreground">Register a new patient in the system</p>
                </button>
                <button className="w-full p-3 text-left border border-border rounded-md hover:bg-muted transition-colors">
                  <p className="font-medium">Schedule Appointment</p>
                  <p className="text-sm text-muted-foreground">Book a new appointment</p>
                </button>
              </>
            )}
            
            {user?.role === 'doctor' && (
              <>
                <button className="w-full p-3 text-left border border-border rounded-md hover:bg-muted transition-colors">
                  <p className="font-medium">Write Prescription</p>
                  <p className="text-sm text-muted-foreground">Create a new prescription</p>
                </button>
                <button className="w-full p-3 text-left border border-border rounded-md hover:bg-muted transition-colors">
                  <p className="font-medium">View Today's Schedule</p>
                  <p className="text-sm text-muted-foreground">Check upcoming appointments</p>
                </button>
              </>
            )}
            
            {user?.role === 'patient' && (
              <>
                <button className="w-full p-3 text-left border border-border rounded-md hover:bg-muted transition-colors">
                  <p className="font-medium">Request Appointment</p>
                  <p className="text-sm text-muted-foreground">Schedule a new appointment</p>
                </button>
                <button className="w-full p-3 text-left border border-border rounded-md hover:bg-muted transition-colors">
                  <p className="font-medium">View Health Records</p>
                  <p className="text-sm text-muted-foreground">Access your medical history</p>
                </button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;