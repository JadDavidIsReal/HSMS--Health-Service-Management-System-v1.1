import React from 'react';

const Reports: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Reports</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div className="border rounded-md p-4">
          <h2 className="text-xl font-bold">Top-Used Medicines</h2>
          <div className="w-full h-64 bg-muted mt-2"></div>
        </div>
        <div className="border rounded-md p-4">
          <h2 className="text-xl font-bold">Monthly Usage Trends</h2>
          <div className="w-full h-64 bg-muted mt-2"></div>
        </div>
        <div className="border rounded-md p-4 lg:col-span-2">
          <h2 className="text-xl font-bold">Low Stock Alerts</h2>
          <div className="w-full h-32 bg-muted mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
