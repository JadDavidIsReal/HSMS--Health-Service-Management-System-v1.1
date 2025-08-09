import React from 'react';

const NursesByCampus: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold">Nurses by Campus</h2>
      <p className="mt-4">A list of nurses, filterable by campus, will be displayed here.</p>
      {/* Placeholder for future implementation */}
      <div className="mt-4 border rounded-md p-4">
        <h3 className="font-bold">Main Campus</h3>
        <ul>
          <li>Nurse A</li>
          <li>Nurse B</li>
        </ul>
      </div>
      <div className="mt-4 border rounded-md p-4">
        <h3 className="font-bold">North Campus</h3>
        <ul>
          <li>Nurse C</li>
        </ul>
      </div>
    </div>
  );
};

export default NursesByCampus;
