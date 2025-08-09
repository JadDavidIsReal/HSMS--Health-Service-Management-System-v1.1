import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const PatientProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, patients, setPatients } = useAuth();

  const patient = patients.find(p => p.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    contact: patient?.contact || '',
    address: patient?.address || '',
    emergencyContact: patient?.emergencyContact || '',
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        contact: patient.contact || '',
        address: patient.address || '',
        emergencyContact: patient.emergencyContact || '',
      });
    }
  }, [patient]);

  const [nursesNotes, setNursesNotes] = useState('Initial nurse notes.');
  const [doctorsNotes, setDoctorsNotes] = useState('Initial doctor notes.');
  const [recommendations, setRecommendations] = useState('Initial recommendations for nurse.');

  if (!patient) {
    return <div>Patient not found</div>;
  }

  const handleSave = () => {
    const updatedPatients = patients.map(p =>
      p.id === patient.id ? { ...p, ...formData } : p
    );
    setPatients(updatedPatients);
    setIsEditing(false);
  };

  const canEdit = user?.id === patient.id;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{patient.name}'s Profile</CardTitle>
          {canEdit && !isEditing && (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input id="contact" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input id="emergencyContact" value={formData.emergencyContact} onChange={e => setFormData({...formData, emergencyContact: e.target.value})} />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSave}>Save</Button>
                <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            </>
          ) : (
            <>
              <p><strong>Email:</strong> {patient.email}</p>
              <p><strong>Contact Number:</strong> {patient.contact}</p>
              <p><strong>Address:</strong> {patient.address}</p>
              <p><strong>Emergency Contact:</strong> {patient.emergencyContact}</p>
              <p><strong>Gender:</strong> {patient.gender}</p>
              <p><strong>Height:</strong> {patient.height} cm</p>
              <p><strong>Blood Type:</strong> {patient.bloodType}</p>
              <p><strong>Campus:</strong> {patient.campus}</p>
              <p><strong>Department:</strong> {patient.department}</p>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nurse's Notes</CardTitle>
        </CardHeader>
        <CardContent>
          {user?.role === 'nurse' ? (
            <textarea
              className="w-full border border-border rounded-md p-2"
              value={nursesNotes}
              onChange={(e) => setNursesNotes(e.target.value)}
            />
          ) : (
            <p>{nursesNotes}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Doctor's Notes</CardTitle>
        </CardHeader>
        <CardContent>
          {user?.role === 'doctor' ? (
            <textarea
              className="w-full border border-border rounded-md p-2"
              value={doctorsNotes}
              onChange={(e) => setDoctorsNotes(e.target.value)}
            />
          ) : (
            <p>{doctorsNotes}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommendations for Nurse</CardTitle>
        </CardHeader>
        <CardContent>
          {user?.role === 'doctor' && (
            <textarea
              className="w-full border border-border rounded-md p-2"
              value={recommendations}
              onChange={(e) => setRecommendations(e.target.value)}
              placeholder="Write recommendations for the nurse here..."
            />
          )}
          {user?.role === 'nurse' && (
            <p className="p-2 bg-gray-100 rounded-md">{recommendations}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientProfile;
