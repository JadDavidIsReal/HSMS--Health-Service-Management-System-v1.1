import React, { useState } from 'react';
import { mockPrescriptions, mockPatients, Prescription } from '../data/mockData';

const Prescriptions: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(mockPrescriptions);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Prescriptions</h1>
          <p className="text-gray-500">Write and manage patient prescriptions</p>
        </div>
        <button onClick={() => setIsDialogOpen(true)} className="bg-pink-500 text-white px-4 py-2 rounded-md">
          Write Prescription
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search prescriptions by patient, medicine, or doctor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrescriptions.map((prescription) => (
          <div key={prescription.id} className="border rounded-md p-4 hover:shadow-md transition-shadow printable-area">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold">{prescription.medicine}</h2>
                <p className="text-sm text-gray-500">{prescription.dosage}</p>
              </div>
              <span className="text-xs font-semibold bg-gray-200 text-gray-800 px-2 py-1 rounded-full">{prescription.duration}</span>
            </div>
            <div className="space-y-3 mt-4">
              <div className="flex items-center space-x-2 text-sm">
                <span>{prescription.patientName}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span>{new Date(prescription.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span>{prescription.doctorName}</span>
              </div>
              <div className="border-t pt-3">
                <p className="text-sm font-medium mb-1">Instructions:</p>
                <p className="text-sm text-gray-500">{prescription.instructions}</p>
              </div>
              <div className="border-t pt-3 mt-3">
                <button
                  onClick={() => window.print()}
                  className="w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPrescriptions.length === 0 && (
        <div className="text-center py-8">
          <h3 className="text-lg font-medium mb-2">No prescriptions found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm
              ? 'No prescriptions match your search criteria.'
              : 'No prescriptions have been written yet.'
            }
          </p>
          <button onClick={() => setIsDialogOpen(true)} className="bg-pink-500 text-white px-4 py-2 rounded-md">
            Write Prescription
          </button>
        </div>
      )}

      {isDialogOpen && (
        <PrescriptionDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleAddPrescription}
        />
      )}
    </div>
  );
};

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

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold">Write Prescription</h2>
        <p className="text-gray-500">Create a new prescription for a patient</p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="patientId">Patient</label>
            <select
              id="patientId"
              value={formData.patientId}
              onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select patient</option>
              {mockPatients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} - {patient.studentId || patient.employeeId}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="medicine">Medicine</label>
            <input
              id="medicine"
              type="text"
              list="common-medicines"
              placeholder="Select or type medicine"
              value={formData.medicine}
              onChange={(e) => setFormData({ ...formData, medicine: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <datalist id="common-medicines">
              {commonMedicines.map((medicine) => (
                <option key={medicine} value={medicine} />
              ))}
            </datalist>
          </div>

          <div>
            <label htmlFor="dosage">Dosage</label>
            <input
              id="dosage"
              type="text"
              placeholder="e.g., 200mg, 2 tablets, 2 puffs"
              value={formData.dosage}
              onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="duration">Duration</label>
            <select
              id="duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select duration</option>
              {durationOptions.map((duration) => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              placeholder="e.g., Take twice daily with food, Use as needed for symptoms"
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
              rows={4}
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" className="flex-1 bg-pink-500 text-white px-4 py-2 rounded-md">
              Write Prescription
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

export default Prescriptions;