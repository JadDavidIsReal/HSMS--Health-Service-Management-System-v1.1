import React, { useState } from 'react';
import { Plus, Search, FileText, User, Calendar } from 'lucide-react';
import { mockPrescriptions, mockPatients, Prescription } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';

const Prescriptions: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(mockPrescriptions);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.medicine.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPrescription = (formData: any) => {
    const selectedPatient = mockPatients.find(p => p.id === formData.patientId);
    const newPrescription: Prescription = {
      id: (prescriptions.length + 1).toString(),
      patientId: formData.patientId,
      patientName: selectedPatient?.name || '',
      doctorId: '2', // Current doctor
      doctorName: 'Dr. Michael Chen',
      medicine: formData.medicine,
      dosage: formData.dosage,
      instructions: formData.instructions,
      date: new Date().toISOString().split('T')[0],
      duration: formData.duration
    };

    setPrescriptions([...prescriptions, newPrescription]);
    setIsDialogOpen(false);
    toast({
      title: "Prescription created",
      description: "New prescription has been successfully written.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Prescriptions</h1>
          <p className="text-muted-foreground">Write and manage patient prescriptions</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Write Prescription</span>
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search prescriptions by patient, medicine, or doctor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{prescriptions.length}</div>
            <p className="text-sm text-muted-foreground">Total Prescriptions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">
              {prescriptions.filter(p => {
                const prescDate = new Date(p.date);
                const today = new Date();
                const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                return prescDate >= weekAgo;
              }).length}
            </div>
            <p className="text-sm text-muted-foreground">This Week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">
              {new Set(prescriptions.map(p => p.patientId)).size}
            </div>
            <p className="text-sm text-muted-foreground">Unique Patients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{filteredPrescriptions.length}</div>
            <p className="text-sm text-muted-foreground">Search Results</p>
          </CardContent>
        </Card>
      </div>

      {/* Prescriptions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrescriptions.map((prescription) => (
          <Card key={prescription.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{prescription.medicine}</CardTitle>
                  <CardDescription>{prescription.dosage}</CardDescription>
                </div>
                <Badge variant="outline">{prescription.duration}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{prescription.patientName}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{new Date(prescription.date).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>{prescription.doctorName}</span>
              </div>

              <div className="border-t pt-3">
                <p className="text-sm font-medium mb-1">Instructions:</p>
                <p className="text-sm text-muted-foreground">{prescription.instructions}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPrescriptions.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No prescriptions found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm 
                ? 'No prescriptions match your search criteria.'
                : 'No prescriptions have been written yet.'
              }
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              Write Prescription
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add Prescription Dialog */}
      <PrescriptionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleAddPrescription}
      />
    </div>
  );
};

// Prescription Dialog Component
interface PrescriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const PrescriptionDialog: React.FC<PrescriptionDialogProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    medicine: '',
    dosage: '',
    instructions: '',
    duration: ''
  });

  const commonMedicines = [
    'Ibuprofen',
    'Acetaminophen',
    'Amoxicillin',
    'Albuterol Inhaler',
    'Vitamin D3',
    'Multivitamin',
    'Hydrocortisone Cream',
    'Diphenhydramine',
    'Cetirizine',
    'Omeprazole'
  ];

  const durationOptions = [
    '3 days',
    '7 days',
    '10 days',
    '14 days',
    '30 days',
    '60 days',
    '90 days',
    'As needed'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      patientId: '',
      medicine: '',
      dosage: '',
      instructions: '',
      duration: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Write Prescription</DialogTitle>
          <DialogDescription>
            Create a new prescription for a patient
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="space-y-2">
            <Label htmlFor="medicine">Medicine</Label>
            <Select value={formData.medicine} onValueChange={(value) => setFormData({...formData, medicine: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select or type medicine" />
              </SelectTrigger>
              <SelectContent>
                {commonMedicines.map((medicine) => (
                  <SelectItem key={medicine} value={medicine}>
                    {medicine}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Or type custom medicine name"
              value={formData.medicine}
              onChange={(e) => setFormData({...formData, medicine: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dosage">Dosage</Label>
            <Input
              id="dosage"
              placeholder="e.g., 200mg, 2 tablets, 2 puffs"
              value={formData.dosage}
              onChange={(e) => setFormData({...formData, dosage: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Select value={formData.duration} onValueChange={(value) => setFormData({...formData, duration: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {durationOptions.map((duration) => (
                  <SelectItem key={duration} value={duration}>
                    {duration}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              placeholder="e.g., Take twice daily with food, Use as needed for symptoms"
              value={formData.instructions}
              onChange={(e) => setFormData({...formData, instructions: e.target.value})}
              rows={4}
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">
              Write Prescription
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

export default Prescriptions;