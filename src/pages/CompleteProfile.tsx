import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';

const CompleteProfile: React.FC = () => {
  const { user, patients, setPatients } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    height: '',
    bloodType: '',
    gender: '',
    address: '',
    campus: '',
    department: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Find the patient and update their details
    const patientIndex = patients.findIndex(p => p.id === user?.id);
    if (patientIndex !== -1) {
      const updatedPatients = [...patients];
      updatedPatients[patientIndex] = {
        ...updatedPatients[patientIndex],
        ...formData,
        height: parseInt(formData.height, 10),
        profileComplete: true,
      };
      setPatients(updatedPatients);

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      setIsSubmitted(true);
    } else {
       toast({
        title: "Error",
        description: "Could not find your profile to update.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return <Navigate to="/patient-landing" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>Please fill in the details below to complete your registration.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input id="height" type="number" value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type</Label>
                 <Input id="bloodType" value={formData.bloodType} onChange={e => setFormData({...formData, bloodType: e.target.value})} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={value => setFormData({...formData, gender: value})} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} required />
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="campus">Campus</Label>
                    <Input id="campus" value={formData.campus} onChange={e => setFormData({...formData, campus: e.target.value})} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} required />
                </div>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save and Continue'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompleteProfile;
