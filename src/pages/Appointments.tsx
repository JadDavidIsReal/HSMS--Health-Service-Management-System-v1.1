import React, { useState } from 'react';
import { Plus, Calendar as CalendarIcon, Clock, User, CheckCircle, XCircle } from 'lucide-react';
import { mockAppointments, mockPatients, Appointment } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';

const Appointments: React.FC = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'today' | 'pending' | 'confirmed' | 'completed'>('all');
  const { toast } = useToast();

  const getFilteredAppointments = () => {
    let filtered = appointments;

    // Role-based filtering
    if (user?.role === 'doctor') {
      filtered = appointments.filter(apt => apt.doctorId === user.id);
    } else if (user?.role === 'patient') {
      filtered = appointments.filter(apt => apt.patientId === user.id);
    }

    // Status filtering
    switch (selectedFilter) {
      case 'today':
        const today = new Date().toISOString().split('T')[0];
        return filtered.filter(apt => apt.date === today);
      case 'pending':
        return filtered.filter(apt => apt.status === 'Pending');
      case 'confirmed':
        return filtered.filter(apt => apt.status === 'Confirmed');
      case 'completed':
        return filtered.filter(apt => apt.status === 'Completed');
      default:
        return filtered;
    }
  };

  const filteredAppointments = getFilteredAppointments();

  const handleStatusChange = (appointmentId: string, newStatus: Appointment['status']) => {
    setAppointments(appointments.map(apt =>
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ));
    toast({
      title: "Status updated",
      description: `Appointment status changed to ${newStatus.toLowerCase()}.`,
    });
  };

  const handleAddAppointment = (formData: any) => {
    const newAppointment: Appointment = {
      id: (appointments.length + 1).toString(),
      patientId: user?.role === 'patient' ? user.id : formData.patientId,
      patientName: user?.role === 'patient' ? user.name : mockPatients.find(p => p.id === formData.patientId)?.name || '',
      doctorId: formData.doctorId,
      doctorName: formData.doctorId === '2' ? 'Dr. Michael Chen' : undefined,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      status: user?.role === 'patient' ? 'Pending' : 'Confirmed',
      notes: formData.notes
    };

    setAppointments([...appointments, newAppointment]);
    setIsDialogOpen(false);
    toast({
      title: "Appointment scheduled",
      description: "New appointment has been successfully created.",
    });
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'Confirmed': return 'bg-success';
      case 'Pending': return 'bg-warning';
      case 'Completed': return 'bg-info';
      case 'Cancelled': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const canManageAppointments = user?.role === 'nurse' || user?.role === 'doctor';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Appointments</h1>
          <p className="text-muted-foreground">
            {user?.role === 'patient' 
              ? 'View your appointments and request new ones'
              : 'Manage patient appointments and scheduling'
            }
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>{user?.role === 'patient' ? 'Request Appointment' : 'Add Appointment'}</span>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'today', 'pending', 'confirmed', 'completed'].map((filter) => (
          <Button
            key={filter}
            variant={selectedFilter === filter ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter(filter as any)}
            className="capitalize"
          >
            {filter === 'all' ? 'All Appointments' : filter}
          </Button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{filteredAppointments.length}</div>
            <p className="text-sm text-muted-foreground">Total Appointments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">
              {filteredAppointments.filter(apt => apt.status === 'Pending').length}
            </div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">
              {filteredAppointments.filter(apt => apt.status === 'Confirmed').length}
            </div>
            <p className="text-sm text-muted-foreground">Confirmed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-info">
              {filteredAppointments.filter(apt => apt.status === 'Completed').length}
            </div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Appointments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{appointment.type}</CardTitle>
                  <CardDescription>
                    {user?.role === 'doctor' ? appointment.patientName : 
                     user?.role === 'patient' ? (appointment.doctorName || 'Unassigned') :
                     `${appointment.patientName} ${appointment.doctorName ? `- ${appointment.doctorName}` : ''}`
                    }
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(appointment.status)}>
                  {appointment.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span>{new Date(appointment.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{appointment.time}</span>
              </div>
              
              {appointment.notes && (
                <div className="text-sm">
                  <p className="font-medium mb-1">Notes:</p>
                  <p className="text-muted-foreground">{appointment.notes}</p>
                </div>
              )}

              {canManageAppointments && appointment.status === 'Pending' && (
                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => handleStatusChange(appointment.id, 'Confirmed')}
                    className="flex-1"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Confirm
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusChange(appointment.id, 'Cancelled')}
                    className="flex-1"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              )}

              {canManageAppointments && appointment.status === 'Confirmed' && (
                <Button
                  size="sm"
                  onClick={() => handleStatusChange(appointment.id, 'Completed')}
                  className="w-full"
                >
                  Mark as Completed
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No appointments found</h3>
            <p className="text-muted-foreground mb-4">
              {selectedFilter === 'all' 
                ? 'There are no appointments scheduled yet.'
                : `No appointments found for the selected filter: ${selectedFilter}.`
              }
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              {user?.role === 'patient' ? 'Request Appointment' : 'Schedule Appointment'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add Appointment Dialog */}
      <AppointmentDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleAddAppointment}
        userRole={user?.role || 'patient'}
      />
    </div>
  );
};

// Appointment Dialog Component
interface AppointmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  userRole: string;
}

const AppointmentDialog: React.FC<AppointmentDialogProps> = ({ isOpen, onClose, onSave, userRole }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    type: '',
    notes: ''
  });

  const appointmentTypes = [
    'General Checkup',
    'Follow-up',
    'Consultation',
    'Sports Physical',
    'Immunization',
    'Mental Health',
    'Dental Care',
    'Emergency'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      patientId: '',
      doctorId: '',
      date: '',
      time: '',
      type: '',
      notes: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {userRole === 'patient' ? 'Request Appointment' : 'Schedule Appointment'}
          </DialogTitle>
          <DialogDescription>
            {userRole === 'patient' 
              ? 'Fill out the form to request a new appointment'
              : 'Enter appointment details to schedule for a patient'
            }
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {userRole !== 'patient' && (
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient</Label>
              <Select value={formData.patientId} onValueChange={(value) => setFormData({...formData, patientId: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  {mockPatients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name} - {patient.studentId || patient.employeeId}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="type">Appointment Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Select value={formData.time} onValueChange={(value) => setFormData({...formData, time: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 16 }, (_, i) => {
                    const hour = Math.floor(i / 2) + 8;
                    const minute = (i % 2) * 30;
                    const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                    return (
                      <SelectItem key={timeString} value={timeString}>
                        {timeString}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          {userRole !== 'patient' && (
            <div className="space-y-2">
              <Label htmlFor="doctorId">Assign Doctor (Optional)</Label>
              <Select value={formData.doctorId} onValueChange={(value) => setFormData({...formData, doctorId: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select doctor (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">Dr. Michael Chen</SelectItem>
                  <SelectItem value="4">Dr. Amanda Foster</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Any additional information or symptoms"
              rows={3}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">
              {userRole === 'patient' ? 'Request Appointment' : 'Schedule Appointment'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Appointments;