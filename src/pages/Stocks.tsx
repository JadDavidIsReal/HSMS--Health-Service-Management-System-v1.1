import React, { useState } from 'react';

interface Medicine {
  id: number;
  name: string;
  type: string;
  dateReceived: string;
  expiry: string;
  quantity: number;
}

const mockMedicines: Medicine[] = [
  { id: 1, name: 'Paracetamol', type: 'Tablet', dateReceived: '2024-07-01', expiry: '2026-07-01', quantity: 1000 },
  { id: 2, name: 'Ibuprofen', type: 'Tablet', dateReceived: '2024-07-01', expiry: '2026-07-01', quantity: 500 },
  { id: 3, name: 'Amoxicillin', type: 'Capsule', dateReceived: '2024-06-15', expiry: '2025-06-15', quantity: 200 },
  { id: 4, name: 'Salbutamol', type: 'Inhaler', dateReceived: '2024-05-20', expiry: '2025-05-20', quantity: 50 },
];

const Stocks: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>(mockMedicines);
  const [showModal, setShowModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

  const handleEdit = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setMedicines(medicines.filter(m => m.id !== id));
  };

  const handleSaveChanges = () => {
    if (selectedMedicine) {
      setMedicines(medicines.map(m => m.id === selectedMedicine.id ? selectedMedicine : m));
    }
    setShowModal(false);
    setSelectedMedicine(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Stocks</h1>
      <div className="hidden md:block">
        <table className="w-full mt-4">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Medicine Name</th>
              <th className="text-left py-2">Type</th>
              <th className="text-left py-2">Date Received</th>
              <th className="text-left py-2">Expiry</th>
              <th className="text-left py-2">Quantity</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map(medicine => (
              <tr key={medicine.id} className="border-b">
                <td className="py-2">{medicine.name}</td>
                <td className="py-2">{medicine.type}</td>
                <td className="py-2">{medicine.dateReceived}</td>
                <td className="py-2">{medicine.expiry}</td>
                <td className="py-2">{medicine.quantity}</td>
                <td className="py-2">
                  <button className="text-blue-500" onClick={() => handleEdit(medicine)}>Edit</button>
                  <button className="text-red-500 ml-4" onClick={() => handleDelete(medicine.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden">
        {medicines.map(medicine => (
          <div key={medicine.id} className="border rounded-md p-4 mt-4">
            <p><strong>Medicine Name:</strong> {medicine.name}</p>
            <p><strong>Type:</strong> {medicine.type}</p>
            <p><strong>Date Received:</strong> {medicine.dateReceived}</p>
            <p><strong>Expiry:</strong> {medicine.expiry}</p>
            <p><strong>Quantity:</strong> {medicine.quantity}</p>
            <div className="mt-2">
              <button className="text-blue-500" onClick={() => handleEdit(medicine)}>Edit</button>
              <button className="text-red-500 ml-4" onClick={() => handleDelete(medicine.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl font-bold">Edit Medicine</h2>
            <div className="mt-4">
              <label>Name</label>
              <input
                type="text"
                value={selectedMedicine.name}
                onChange={(e) => setSelectedMedicine({ ...selectedMedicine, name: e.target.value })}
                className="w-full border border-border rounded-md p-2"
              />
            </div>
            <div className="mt-4">
              <label>Quantity</label>
              <input
                type="number"
                value={selectedMedicine.quantity}
                onChange={(e) => setSelectedMedicine({ ...selectedMedicine, quantity: parseInt(e.target.value) })}
                className="w-full border border-border rounded-md p-2"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button className="bg-muted px-4 py-2 rounded-md" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md ml-4" onClick={handleSaveChanges}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stocks;
