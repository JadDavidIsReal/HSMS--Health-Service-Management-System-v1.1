import React, { useState } from 'react';
import { mockStaff, Staff } from '../data/mockData';

const StaffDirectory: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>(mockStaff);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterRole, setFilterRole] = useState<string>('all');

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleEditStaff = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    setIsDialogOpen(true);
  };

  const handleSaveStaff = (formData: any) => {
    if (selectedStaff) {
      setStaff(staff.map(s =>
        s.id === selectedStaff.id
          ? { ...selectedStaff, ...formData }
          : s
      ));
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Staff Directory</h1>
        <p className="text-gray-500">View and manage health services staff information</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search staff by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 pl-10"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="w-full sm:w-48 border border-gray-300 rounded-md p-2"
        >
          <option value="all">All Roles</option>
          <option value="Doctor">Doctors</option>
          <option value="Nurse">Nurses</option>
          <option value="Admin">Administrators</option>
          <option value="Receptionist">Receptionists</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((staffMember) => (
          <div key={staffMember.id} className="border rounded-md p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-lg font-bold">{staffMember.name}</h2>
                <p className="text-sm text-gray-500">{staffMember.department}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold bg-pink-500 text-white px-2 py-1 rounded-full">
                  {staffMember.role}
                </span>
                <button onClick={() => handleEditStaff(staffMember)}>
                  Edit
                </button>
              </div>
            </div>
            <div className="space-y-3 mt-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <span>{staffMember.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span>{staffMember.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span>Joined {new Date(staffMember.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <div className="text-center py-8">
          <h3 className="text-lg font-medium mb-2">No staff found</h3>
          <p className="text-gray-500">
            {searchTerm || filterRole !== 'all'
              ? 'No staff members match your search criteria.'
              : 'No staff members have been added yet.'
            }
          </p>
        </div>
      )}

      {isDialogOpen && (
        <StaffDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleSaveStaff}
          staff={selectedStaff}
        />
      )}
    </div>
  );
};

interface StaffDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  staff: Staff | null;
}

const StaffDialog: React.FC<StaffDialogProps> = ({ isOpen, onClose, onSave, staff }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    department: ''
  });

  React.useEffect(() => {
    if (staff) {
      setFormData({
        name: staff.name,
        role: staff.role,
        email: staff.email,
        phone: staff.phone,
        department: staff.department
      });
    }
  }, [staff]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const roles = ['Doctor', 'Nurse', 'Admin', 'Receptionist'];
  const departments = [
    'General Medicine',
    'Family Medicine',
    'Mental Health',
    'Administration',
    'IT Support',
    'Emergency Care',
    'Preventive Care'
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md max-w-md w-full">
        <h2 className="text-xl font-bold">Edit Staff Member</h2>
        <p className="text-gray-500">Update staff member information</p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="department">Department</label>
            <select
              id="department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" className="flex-1 bg-pink-500 text-white px-4 py-2 rounded-md">
              Update Staff
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

export default StaffDirectory;