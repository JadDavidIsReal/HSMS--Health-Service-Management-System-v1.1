import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Appointment } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';

const BookAppointment: React.FC = () => {
  const { user, appointments, setAppointments } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    type: 'Consultation', // Default type
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);

    // Booking limit logic
    const bookingHistoryKey = `booking_history_${user.id}`;
    const history = JSON.parse(localStorage.getItem(bookingHistoryKey) || '[]');
    const now = new Date().getTime();
    const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000;

    const recentBookings = history.filter((ts: number) => ts > twentyFourHoursAgo);

    if (recentBookings.length >= 2) {
      toast({
        title: "Booking Limit Reached",
        description: "You can only book a maximum of two appointments every 24 hours.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const newAppointment: Appointment = {
      id: (appointments.length + 1).toString(),
      patientId: user.id,
      patientName: user.name,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      status: 'Pending',
      notes: formData.notes,
    };

    setAppointments(prev => [...prev, newAppointment]);

    // Update booking history
    localStorage.setItem(bookingHistoryKey, JSON.stringify([...recentBookings, now]));

    toast({
      title: "Appointment Booked",
      description: `Your appointment for ${formData.date} at ${formData.time} has been requested.`,
    });

    // Reset form
    setFormData({ date: '', time: '', type: 'Consultation', notes: '' });
    setIsSubmitting(false);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Consultation</CardTitle>
        <CardDescription>Fill out the form below to book a new consultation.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                type="time"
                id="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Consultation Type</Label>
            <Input
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Reason for Appointment (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Describe your symptoms or reason for visit..."
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Booking...' : 'Book Appointment'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookAppointment;
