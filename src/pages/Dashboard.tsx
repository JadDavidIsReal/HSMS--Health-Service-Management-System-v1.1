import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockAppointments } from '../data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const recentConsultations = mockAppointments
    .filter(a => a.status === 'Completed')
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
        </div>
        {user?.role === 'nurse' && (
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search for patients..."
              className="border border-border rounded-md px-4 py-2"
            />
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
              Chat
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user?.role === 'nurse' && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Walk-in/Scheduled Consultations</CardTitle>
                <CardDescription>Today's appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Today's appointments will be displayed here.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Referred Consultations</CardTitle>
                <CardDescription>Appointments referred by doctors</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Referred consultations will be displayed here.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Consultations</CardTitle>
                <CardDescription>Last 3 completed consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul>
                  {recentConsultations.map(consultation => (
                    <li key={consultation.id}>
                      {consultation.patientName} - {consultation.date}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </>
        )}

        {user?.role === 'doctor' && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Consultations</CardTitle>
                <CardDescription>Today's appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Today's appointments will be displayed here.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Referred Consultations</CardTitle>
                <CardDescription>Appointments referred by doctors</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Referred consultations will be displayed here.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Consultations</CardTitle>
                <CardDescription>Last 3 completed consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul>
                  {recentConsultations.map(consultation => (
                    <li key={consultation.id}>
                      {consultation.patientName} - {consultation.date}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </>
        )}

        {user?.role === 'patient' && (
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>View your profile information here.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Your profile information will be displayed here.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;