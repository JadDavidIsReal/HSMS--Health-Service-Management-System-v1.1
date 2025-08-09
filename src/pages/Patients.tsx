import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '../components/ui/dialog';
import { useToast } from '../hooks/use-toast';

const Patients: React.FC = () => {
  const { user, patients, createPatientByNurse } = useAuth();
  const { toast } = useToast();
  const [patientType, setPatientType] = useState<'student' | 'employee' | 'community'>('student');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // This logic is a placeholder. The user schema needs to be updated to differentiate these roles.
  const students = patients.filter(p => p.studentId || (!p.employeeId && p.role === 'patient'));
  const employees = patients.filter(p => p.employeeId);
  const community = patients.filter(p => !p.studentId && !p.employeeId && p.role !== 'patient');

  const handleAddPatient = async (formData: { name: string, email: string }) => {
    const newPatient = await createPatientByNurse(formData.name, formData.email);
    if (newPatient) {
      toast({
        title: "Patient Created",
        description: `Successfully created patient ${formData.name}.`,
      });
      setIsDialogOpen(false);
    } else {
      toast({
        title: "Error",
        description: "A user with this email may already exist.",
        variant: "destructive",
      });
    }
  };

  const renderPatientList = () => {
    let patientsToRender;
    switch (patientType) {
      case 'student':
        patientsToRender = students;
        break;
      case 'employee':
        patientsToRender = employees;
        break;
      case 'community':
        patientsToRender = community;
        break;
      default:
        return <p>No patients found.</p>;
    }

    return patientsToRender.length > 0 ? (
      patientsToRender.map(patient => (
        <Link to={`/patient/${patient.id}`} key={patient.id} className="block border-b py-2 hover:bg-muted">
          {patient.name}
        </Link>
      ))
    ) : <p className="mt-4 text-muted-foreground">No {patientType}s found.</p>;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Search Patients</h1>
        {user?.role === 'nurse' && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Patient</Button>
            </DialogTrigger>
            <AddPatientDialog onSave={handleAddPatient} />
          </Dialog>
        )}
      </div>

      <div className="flex space-x-2 border-b">
        <button
          className={`px-4 py-2 ${patientType === 'student' ? 'border-b-2 border-primary' : ''}`}
          onClick={() => setPatientType('student')}
        >
          Students
        </button>
        <button
          className={`px-4 py-2 ${patientType === 'employee' ? 'border-b-2 border-primary' : ''}`}
          onClick={() => setPatientType('employee')}
        >
          Employees
        </button>
        <button
          className={`px-4 py-2 ${patientType === 'community' ? 'border-b-2 border-primary' : ''}`}
          onClick={() => setPatientType('community')}
        >
          Community
        </button>
      </div>
       <div className="mt-4">
        {renderPatientList()}
      </div>
    </div>
  );
};


interface AddPatientDialogProps {
  onSave: (data: { name: string, email: string }) => void;
}

const AddPatientDialog: React.FC<AddPatientDialogProps> = ({ onSave }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    onSave(formData);
    setIsSubmitting(false);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Patient</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="add-name">Full Name</Label>
          <Input id="add-name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="add-email">Email</Label>
          <Input id="add-email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Adding..." : "Add Patient"}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default Patients;
