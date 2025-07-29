import React, { useState } from 'react';

const BookAppointment: React.FC = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle appointment booking logic
    alert(`Appointment booked for ${date} at ${time} for: ${reason}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Book an Appointment</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-border rounded-md p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-border rounded-md p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="reason">Reason for Appointment</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border border-border rounded-md p-2"
            required
          />
        </div>
        <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
