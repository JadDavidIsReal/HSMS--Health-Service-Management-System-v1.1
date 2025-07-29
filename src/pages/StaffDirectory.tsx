import React, { useState } from 'react';
import { Search, Edit, Phone, Mail, Calendar, UserCheck } from 'lucide-react';
import { mockStaff, Staff } from '../data/mockData';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';

const StaffDirectory: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>(mockStaff);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterRole, setFilterRole] = useState<string>('all');
  const { toast } = useToast();

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
      toast({
        title: "Staff updated",
        description: "Staff member information has been successfully updated.",
      });
    }
    setIsDialogOpen(false);
  };

  const getRoleColor = (role: Staff['role']) => {
    switch (role) {
      case 'Doctor': return 'bg-primary';
      case 'Nurse': return 'bg-secondary';
      case 'Admin': return 'bg-warning';
      case 'Receptionist': return 'bg-info';
      default: return 'bg-muted';
    }
  };

  const getDepartmentStats = () => {
    const departments = staff.reduce((acc, member) => {
      acc[member.department] = (acc[member.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return departments;
  };

  const getRoleStats = () => {
    const roles = staff.reduce((acc, member) => {
      acc[member.role] = (acc[member.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return roles;
  };

  const departmentStats = getDepartmentStats();
  const roleStats = getRoleStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Staff Directory</h1>
          <p className="text-muted-foreground">View and manage health services staff information</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search staff by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Doctor">Doctors</SelectItem>
            <SelectItem value="Nurse">Nurses</SelectItem>
            <SelectItem value="Admin">Administrators</SelectItem>
            <SelectItem value="Receptionist">Receptionists</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{staff.length}</div>
            <p className="text-sm text-muted-foreground">Total Staff</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">{roleStats.Doctor || 0}</div>
            <p className="text-sm text-muted-foreground">Doctors</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{roleStats.Nurse || 0}</div>
            <p className="text-sm text-muted-foreground">Nurses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{filteredStaff.length}</div>
            <p className="text-sm text-muted-foreground">Search Results</p>
          </CardContent>
        </Card>
      </div>

      {/* Department Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Overview</CardTitle>
            <CardDescription>Staff distribution by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(departmentStats).map(([department, count]) => (
                <div key={department} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{department}</span>
                  <Badge variant="outline">{count} staff</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role Distribution</CardTitle>
            <CardDescription>Staff count by role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(roleStats).map(([role, count]) => (
                <div key={role} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{role}</span>
                  <Badge className={getRoleColor(role as Staff['role'])}>{count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((staffMember) => (
          <Card key={staffMember.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{staffMember.name}</CardTitle>
                  <CardDescription>{staffMember.department}</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getRoleColor(staffMember.role)}>
                    {staffMember.role}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={() => handleEditStaff(staffMember)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{staffMember.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{staffMember.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {new Date(staffMember.joinDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="pt-3 border-t">
                <p className="text-xs text-muted-foreground">
                  {staffMember.role} in {staffMember.department}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No staff found</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterRole !== 'all'
                ? 'No staff members match your search criteria.'
                : 'No staff members have been added yet.'
              }
            </p>
          </CardContent>
        </Card>
      )}

      {/* Edit Staff Dialog */}
      <StaffDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveStaff}
        staff={selectedStaff}
      />
    </div>
  );
};

// Staff Dialog Component
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Staff Member</DialogTitle>
          <DialogDescription>
            Update staff member information
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

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">
              Update Staff
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

export default StaffDirectory;