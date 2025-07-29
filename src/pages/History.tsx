import React from 'react';

interface RemovedMedicine {
  id: number;
  dateRemoved: string;
  medicineName: string;
  quantity: number;
}

const mockRemovedMedicines: RemovedMedicine[] = [
  { id: 1, dateRemoved: '2024-07-28', medicineName: 'Paracetamol', quantity: 100 },
  { id: 2, dateRemoved: '2024-07-27', medicineName: 'Ibuprofen', quantity: 50 },
  { id: 3, dateRemoved: '2024-07-26', medicineName: 'Amoxicillin', quantity: 20 },
];

const History: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">History</h1>
      <div className="hidden md:block">
        <table className="w-full mt-4">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Date Removed</th>
              <th className="text-left py-2">Medicine Name</th>
              <th className="text-left py-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {mockRemovedMedicines.map(medicine => (
              <tr key={medicine.id} className="border-b">
                <td className="py-2">{medicine.dateRemoved}</td>
                <td className="py-2">{medicine.medicineName}</td>
                <td className="py-2">{medicine.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden">
        {mockRemovedMedicines.map(medicine => (
          <div key={medicine.id} className="border rounded-md p-4 mt-4">
            <p><strong>Date Removed:</strong> {medicine.dateRemoved}</p>
            <p><strong>Medicine Name:</strong> {medicine.medicineName}</p>
            <p><strong>Quantity:</strong> {medicine.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
