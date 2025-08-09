import React, { useState } from 'react';
import { Appointment } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Appointments: React.FC = () => {
  const { user, appointments, setAppointments, patients } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'today' | 'pending' | 'confirmed' | 'completed'>(() => {
    if (user?.role === 'doctor') return 'pending';
    if (user?.role === 'nurse') return 'pending';
    return 'all';
  });

  const getFilteredAppointments = () => {
    let filtered = appointments;

    if (user?.role === 'doctor') {
      filtered = appointments.filter(apt => apt.doctorId === user.id);
    } else if (user?.role === 'patient') {
      filtered = appointments.filter(apt => apt.patientId === user.id);
    }

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
  };

  const handleAddAppointment = (formData: any) => {
    const newAppointment: Appointment = {
      id: (appointments.length + 1).toString(),
      patientId: user?.role === 'patient' ? user.id : formData.patientId,
      patientName: user?.role === 'patient' ? user.name : patients.find(p => p.id === formData.patientId)?.name || '',
      doctorId: formData.doctorId,
      doctorName: formData.doctorId === '2' ? 'Dr. Michael Chen' : undefined,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      status: user?.role === 'patient' ? 'Pending' : 'Confirmed',
      notes: formData.notes,
      temperature: formData.temperature ? parseFloat(formData.temperature) : undefined
    };

    setAppointments([...appointments, newAppointment]);
    setIsDialogOpen(false);
  };

  const canManageAppointments = user?.role === 'nurse' || user?.role === 'doctor';

  const filterOptions = user?.role === 'doctor'
    ? ['pending', 'completed']
    : user?.role === 'nurse'
    ? ['pending', 'confirmed', 'completed']
    : ['all', 'today', 'pending', 'confirmed', 'completed'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Appointments</h1>
          <p className="text-gray-500">
            {user?.role === 'patient'
              ? 'View your appointments and request new ones'
              : 'Manage patient appointments and scheduling'
            }
          </p>
        </div>
        <button onClick={() => setIsDialogOpen(true)} className="bg-pink-500 text-white px-4 py-2 rounded-md">
          {user?.role === 'patient' ? 'Request Appointment' : 'Add Appointment'}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter as any)}
            className={`px-3 py-1 rounded-md text-sm ${selectedFilter === filter ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAppointments.map((appointment) => (
          <div key={appointment.id} className="border rounded-md p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold">{appointment.type}</h2>
                <p className="text-sm text-gray-500">
                  {user?.role === 'doctor' ? appointment.patientName :
                   user?.role === 'patient' ? (appointment.doctorName || 'Unassigned') :
                   `${appointment.patientName} ${appointment.doctorName ? `- ${appointment.doctorName}` : ''}`
                  }
                </p>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                appointment.status === 'Confirmed' ? 'bg-green-500 text-white' :
                appointment.status === 'Pending' ? 'bg-yellow-500 text-white' :
                appointment.status === 'Completed' ? 'bg-blue-500 text-white' :
                appointment.status === 'Referred' ? 'bg-purple-500 text-white' :
                'bg-red-500 text-white'
              }`}>
                {appointment.status}
              </span>
            </div>
            <div className="space-y-3 mt-4">
              <div className="flex items-center space-x-2 text-sm">
                <span>{new Date(appointment.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span>{appointment.time}</span>
              </div>
              {appointment.notes && (
                <div className="text-sm">
                  <p className="font-medium mb-1">Notes:</p>
                  <p className="text-gray-500">{appointment.notes}</p>
                </div>
              )}
              {canManageAppointments && appointment.status === 'Pending' && (
                <div className="flex flex-col space-y-2 pt-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusChange(appointment.id, 'Confirmed')}
                      className="flex-1 bg-green-500 text-white px-3 py-1 rounded-md"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleStatusChange(appointment.id, 'Cancelled')}
                      className="flex-1 border border-gray-300 px-3 py-1 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                  {user?.role === 'nurse' && (
                    <button
                      onClick={() => handleStatusChange(appointment.id, 'Referred')}
                      className="w-full bg-blue-500 text-white px-3 py-1 rounded-md"
                    >
                      Refer to Doctor
                    </button>
                  )}
                </div>
              )}
              {canManageAppointments && appointment.status === 'Confirmed' && (
                 <div className="flex flex-col space-y-2 pt-2">
                    <button
                      onClick={() => handleStatusChange(appointment.id, 'Completed')}
                      className="w-full bg-green-500 text-white px-3 py-1 rounded-md"
                    >
                      Mark as Completed
                    </button>
                    {user?.role === 'nurse' && (
                      <button
                        onClick={() => handleStatusChange(appointment.id, 'Referred')}
                        className="w-full bg-blue-500 text-white px-3 py-1 rounded-md"
                      >
                        Refer to Doctor
                      </button>
                    )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <div className="text-center py-8">
          <h3 className="text-lg font-medium mb-2">No appointments found</h3>
          <p className="text-gray-500 mb-4">
            {selectedFilter === 'all'
              ? 'There are no appointments scheduled yet.'
              : `No appointments found for the selected filter: ${selectedFilter}.`
            }
          </p>
          <button onClick={() => setIsDialogOpen(true)} className="bg-pink-500 text-white px-4 py-2 rounded-md">
            {user?.role === 'patient' ? 'Request Appointment' : 'Schedule Appointment'}
          </button>
        </div>
      )}

      {isDialogOpen && (
        <AppointmentDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleAddAppointment}
          userRole={user?.role || 'patient'}
          patients={patients}
        />
      )}
    </div>
  );
};

interface AppointmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  userRole: string;
  patients: any[];
}

const AppointmentDialog: React.FC<AppointmentDialogProps> = ({ isOpen, onClose, onSave, userRole, patients }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    type: '',
    notes: '',
    temperature: ''
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
      notes: '',
      temperature: ''
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md max-w-md w-full">
        <h2 className="text-xl font-bold">
          {userRole === 'patient' ? 'Request Appointment' : 'Schedule Appointment'}
        </h2>
        <p className="text-gray-500">
          {userRole === 'patient'
            ? 'Fill out the form to request a new appointment'
            : 'Enter appointment details to schedule for a patient'
          }
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {userRole !== 'patient' && (
            <div>
              <label htmlFor="patientId">Patient</label>
              <select
                id="patientId"
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select patient</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} - {patient.studentId || patient.employeeId}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="type">Appointment Type</label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select appointment type</option>
              {appointmentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {userRole === 'nurse' && (
            <div>
              <label htmlFor="temperature">Temperature (°C)</label>
              <input
                id="temperature"
                type="number"
                step="0.1"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="e.g., 37.5"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label htmlFor="time">Time</label>
              <input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>

          {userRole !== 'patient' && (
            <div>
              <label htmlFor="doctorId">Assign Doctor (Optional)</label>
              <select
                id="doctorId"
                value={formData.doctorId}
                onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select doctor (optional)</option>
                <option value="2">Dr. Michael Chen</option>
                <option value="4">Dr. Amanda Foster</option>
              </select>
            </div>
          )}

          <div>
            <label htmlFor="notes">Notes (Optional)</label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Any additional information or symptoms"
              rows={3}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" className="flex-1 bg-pink-500 text-white px-4 py-2 rounded-md">
              {userRole === 'patient' ? 'Request Appointment' : 'Schedule Appointment'}
            </button>
            <button type="button" onClick={onClose} className="flex-1 border border-gray-300 px-4 py-2 rounded-md">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Appointments;