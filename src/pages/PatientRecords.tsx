import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Phone, Mail } from 'lucide-react';
import { mockPatients, Patient } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';

const PatientRecords: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.employeeId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeletePatient = (patientId: string) => {
    setPatients(patients.filter(p => p.id !== patientId));
    toast({
      title: "Patient deleted",
      description: "Patient record has been successfully deleted.",
    });
  };

  const handleSavePatient = (formData: any) => {
    if (isEditing && selectedPatient) {
      setPatients(patients.map(p => 
        p.id === selectedPatient.id 
          ? { ...selectedPatient, ...formData }
          : p
      ));
      toast({
        title: "Patient updated",
        description: "Patient record has been successfully updated.",
      });
    } else {
      const newPatient: Patient = {
        id: (patients.length + 1).toString(),
        medicalHistory: [],
        ...formData
      };
      setPatients([...patients, newPatient]);
      toast({
        title: "Patient added",
        description: "New patient record has been successfully created.",
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Patient Records</h1>
          <p className="text-muted-foreground">Manage patient information and medical records</p>
        </div>
        <Button onClick={handleAddPatient} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Patient</span>
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search patients by name, email, or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{patients.length}</div>
            <p className="text-sm text-muted-foreground">Total Patients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">{patients.filter(p => p.studentId).length}</div>
            <p className="text-sm text-muted-foreground">Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{patients.filter(p => p.employeeId).length}</div>
            <p className="text-sm text-muted-foreground">Employees</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{filteredPatients.length}</div>
            <p className="text-sm text-muted-foreground">Search Results</p>
          </CardContent>
        </Card>
      </div>

      {/* Patient Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{patient.name}</CardTitle>
                  <CardDescription>
                    {patient.studentId ? `Student ID: ${patient.studentId}` : `Employee ID: ${patient.employeeId}`}
                  </CardDescription>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEditPatient(patient)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeletePatient(patient.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{patient.gender}</Badge>
                <Badge variant="outline">{patient.age} years</Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{patient.contact}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{patient.email}</span>
                </div>
              </div>

              {patient.medicalHistory.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-1">Medical History:</p>
                  <div className="space-y-1">
                    {patient.medicalHistory.slice(0, 2).map((history, index) => (
                      <p key={index} className="text-xs text-muted-foreground">{history}</p>
                    ))}
                    {patient.medicalHistory.length > 2 && (
                      <p className="text-xs text-muted-foreground">+{patient.medicalHistory.length - 2} more</p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Patient Dialog */}
      <PatientDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSavePatient}
        patient={selectedPatient}
        isEditing={isEditing}
      />
    </div>
  );
};

// Patient Dialog Component
interface PatientDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  patient: Patient | null;
  isEditing: boolean;
}

const PatientDialog: React.FC<PatientDialogProps> = ({ isOpen, onClose, onSave, patient, isEditing }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    email: '',
    studentId: '',
    employeeId: '',
    emergencyContact: '',
    medicalHistory: ''
  });

  React.useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name,
        age: patient.age.toString(),
        gender: patient.gender,
        contact: patient.contact,
        email: patient.email,
        studentId: patient.studentId || '',
        employeeId: patient.employeeId || '',
        emergencyContact: patient.emergencyContact,
        medicalHistory: patient.medicalHistory.join(', ')
      });
    } else {
      setFormData({
        name: '',
        age: '',
        gender: '',
        contact: '',
        email: '',
        studentId: '',
        employeeId: '',
        emergencyContact: '',
        medicalHistory: ''
      });
    }
  }, [patient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      age: parseInt(formData.age),
      medicalHistory: formData.medicalHistory.split(',').map(item => item.trim()).filter(item => item)
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Patient' : 'Add New Patient'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update patient information' : 'Enter patient details to create a new record'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Phone Number</Label>
            <Input
              id="contact"
              value={formData.contact}
              onChange={(e) => setFormData({...formData, contact: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                value={formData.studentId}
                onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                placeholder="If student"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input
                id="employeeId"
                value={formData.employeeId}
                onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                placeholder="If employee"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Emergency Contact</Label>
            <Input
              id="emergencyContact"
              value={formData.emergencyContact}
              onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicalHistory">Medical History</Label>
            <Textarea
              id="medicalHistory"
              value={formData.medicalHistory}
              onChange={(e) => setFormData({...formData, medicalHistory: e.target.value})}
              placeholder="Separate multiple entries with commas"
              rows={3}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">
              {isEditing ? 'Update Patient' : 'Add Patient'}
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

export default PatientRecords;