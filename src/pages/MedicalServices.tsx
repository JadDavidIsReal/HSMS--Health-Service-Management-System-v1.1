import React, { useState } from 'react';
import { mockServices, MedicalService } from '../data/mockData';

const MedicalServices: React.FC = () => {
  const [services, setServices] = useState<MedicalService[]>(mockServices);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<MedicalService | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
  };

  const handleToggleAvailability = (serviceId: string) => {
    setServices(services.map(s =>
      s.id === serviceId ? { ...s, available: !s.available } : s
    ));
  };

  const handleSaveService = (formData: any) => {
    if (isEditing && selectedService) {
      setServices(services.map(s =>
        s.id === selectedService.id
          ? { ...selectedService, ...formData }
          : s
      ));
    } else {
      const newService: MedicalService = {
        id: (services.length + 1).toString(),
        ...formData
      };
      setServices([...services, newService]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Medical Services</h1>
          <p className="text-gray-500">Manage available medical services and procedures</p>
        </div>
        <button onClick={handleAddService} className="bg-pink-500 text-white px-4 py-2 rounded-md">
          Add Service
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search services by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className={`border rounded-md p-4 hover:shadow-md transition-shadow ${!service.available ? 'opacity-60' : ''}`}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  {service.name}
                  {service.available ? (
                    <span className="text-xs font-semibold bg-green-500 text-white px-2 py-1 rounded-full">Available</span>
                  ) : (
                    <span className="text-xs font-semibold bg-gray-500 text-white px-2 py-1 rounded-full">Unavailable</span>
                  )}
                </h2>
                <p className="text-sm text-gray-500 mt-2">{service.description}</p>
              </div>
              <div className="flex space-x-1 ml-2">
                <button onClick={() => handleEditService(service)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteService(service.id)}>
                  Delete
                </button>
              </div>
            </div>
            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm">
                  <span>{service.duration} minutes</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span>${service.cost}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <span className="text-sm font-medium">Available</span>
                <input
                  type="checkbox"
                  checked={service.available}
                  onChange={() => handleToggleAvailability(service.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-8">
          <h3 className="text-lg font-medium mb-2">No services found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm
              ? 'No services match your search criteria.'
              : 'No medical services have been added yet.'
            }
          </p>
          <button onClick={handleAddService} className="bg-pink-500 text-white px-4 py-2 rounded-md">
            Add Medical Service
          </button>
        </div>
      )}

      {isDialogOpen && (
        <ServiceDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleSaveService}
          service={selectedService}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

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

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md max-w-md w-full">
        <h2 className="text-xl font-bold">{isEditing ? 'Edit Service' : 'Add New Service'}</h2>
        <p className="text-gray-500">{isEditing ? 'Update service information' : 'Enter details for the new medical service'}</p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="name">Service Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="e.g., General Checkup"
              required
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Describe what this service includes..."
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="duration">Duration (minutes)</label>
              <input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="30"
                min="1"
                required
              />
            </div>
            <div>
              <label htmlFor="cost">Cost ($)</label>
              <input
                id="cost"
                type="number"
                step="0.01"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="0.00"
                min="0"
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="available"
              type="checkbox"
              checked={formData.available}
              onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
            />
            <label htmlFor="available">Service is available</label>
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" className="flex-1 bg-pink-500 text-white px-4 py-2 rounded-md">
              {isEditing ? 'Update Service' : 'Add Service'}
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

export default MedicalServices;