import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Clock, DollarSign } from 'lucide-react';
import { mockServices, MedicalService } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { useToast } from '../hooks/use-toast';

const MedicalServices: React.FC = () => {
  const [services, setServices] = useState<MedicalService[]>(mockServices);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<MedicalService | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddService = () => {
    setSelectedService(null);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditService = (service: MedicalService) => {
    setSelectedService(service);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter(s => s.id !== serviceId));
    toast({
      title: "Service deleted",
      description: "Medical service has been successfully deleted.",
    });
  };

  const handleToggleAvailability = (serviceId: string) => {
    setServices(services.map(s => 
      s.id === serviceId ? { ...s, available: !s.available } : s
    ));
    const service = services.find(s => s.id === serviceId);
    toast({
      title: "Service updated",
      description: `${service?.name} is now ${service?.available ? 'unavailable' : 'available'}.`,
    });
  };

  const handleSaveService = (formData: any) => {
    if (isEditing && selectedService) {
      setServices(services.map(s => 
        s.id === selectedService.id 
          ? { ...selectedService, ...formData }
          : s
      ));
      toast({
        title: "Service updated",
        description: "Medical service has been successfully updated.",
      });
    } else {
      const newService: MedicalService = {
        id: (services.length + 1).toString(),
        ...formData
      };
      setServices([...services, newService]);
      toast({
        title: "Service added",
        description: "New medical service has been successfully created.",
      });
    }
    setIsDialogOpen(false);
  };

  const availableServices = services.filter(s => s.available);
  const unavailableServices = services.filter(s => !s.available);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Medical Services</h1>
          <p className="text-muted-foreground">Manage available medical services and procedures</p>
        </div>
        <Button onClick={handleAddService} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Service</span>
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search services by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{services.length}</div>
            <p className="text-sm text-muted-foreground">Total Services</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{availableServices.length}</div>
            <p className="text-sm text-muted-foreground">Available</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{unavailableServices.length}</div>
            <p className="text-sm text-muted-foreground">Unavailable</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-info">
              ${services.filter(s => s.available).reduce((sum, s) => sum + s.cost, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Total Value</p>
          </CardContent>
        </Card>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className={`hover:shadow-md transition-shadow ${!service.available ? 'opacity-60' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {service.name}
                    {service.available ? (
                      <Badge className="bg-success">Available</Badge>
                    ) : (
                      <Badge variant="secondary">Unavailable</Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="mt-2">{service.description}</CardDescription>
                </div>
                <div className="flex space-x-1 ml-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEditService(service)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteService(service.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{service.duration} minutes</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>${service.cost}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <span className="text-sm font-medium">Available</span>
                <Switch
                  checked={service.available}
                  onCheckedChange={() => handleToggleAvailability(service.id)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No services found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm 
                ? 'No services match your search criteria.'
                : 'No medical services have been added yet.'
              }
            </p>
            <Button onClick={handleAddService}>
              Add Medical Service
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Service Dialog */}
      <ServiceDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveService}
        service={selectedService}
        isEditing={isEditing}
      />
    </div>
  );
};

// Service Dialog Component
interface ServiceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  service: MedicalService | null;
  isEditing: boolean;
}

const ServiceDialog: React.FC<ServiceDialogProps> = ({ isOpen, onClose, onSave, service, isEditing }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    cost: '',
    available: true
  });

  React.useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description,
        duration: service.duration.toString(),
        cost: service.cost.toString(),
        available: service.available
      });
    } else {
      setFormData({
        name: '',
        description: '',
        duration: '',
        cost: '',
        available: true
      });
    }
  }, [service]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      duration: parseInt(formData.duration),
      cost: parseFloat(formData.cost)
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Service' : 'Add New Service'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update service information' : 'Enter details for the new medical service'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Service Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g., General Checkup"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe what this service includes..."
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                placeholder="30"
                min="1"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cost">Cost ($)</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                value={formData.cost}
                onChange={(e) => setFormData({...formData, cost: e.target.value})}
                placeholder="0.00"
                min="0"
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="available"
              checked={formData.available}
              onCheckedChange={(checked) => setFormData({...formData, available: checked})}
            />
            <Label htmlFor="available">Service is available</Label>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">
              {isEditing ? 'Update Service' : 'Add Service'}
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

export default MedicalServices;