import React, { useState } from 'react';

const ServiceProviderServices = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Plumbing Repair',
      description: 'Fix leaking pipes, faucets, and other plumbing issues.',
      price: 1200,
      category: 'Plumbing',
      isActive: true,
      image:
        'https://images.unsplash.com/photo-1573689705343-7762c2c3d207?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 2,
      name: 'Sink Installation',
      description:
        'Install new sinks in kitchens or bathrooms with proper plumbing connection.',
      price: 1500,
      category: 'Plumbing',
      isActive: true,
      image:
        'https://images.unsplash.com/photo-1563040222-41b15082b5be?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 3,
      name: 'Toilet Repair',
      description:
        'Fix toilet issues including leaks, clogs, and installation.',
      price: 950,
      category: 'Plumbing',
      isActive: false,
      image:
        'https://images.unsplash.com/photo-1544782748-f9c873849e5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Plumbing',
    isActive: true,
    image: '',
  });

  const handleToggleService = (id) => {
    setServices(
      services.map((service) =>
        service.id === id
          ? { ...service, isActive: !service.isActive }
          : service
      )
    );
  };

  const handleAddService = () => {
    // Validate form
    if (!newService.name || !newService.description || !newService.price) {
      alert('Please fill in all required fields');
      return;
    }

    // Add new service
    const serviceToAdd = {
      ...newService,
      id: Date.now(),
      price: parseFloat(newService.price),
      image:
        newService.image ||
        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    };

    setServices([...services, serviceToAdd]);

    // Reset form
    setNewService({
      name: '',
      description: '',
      price: '',
      category: 'Plumbing',
      isActive: true,
      image: '',
    });

    // Close modal
    setShowAddModal(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Services</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Service
        </button>
      </div>

      {services.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 mb-4 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            No services found
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Add your services to start receiving orders.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="border rounded-lg overflow-hidden">
              <div className="h-32 bg-gray-200 relative">
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      service.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {service.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {service.description}
                </p>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-500 text-sm">Price</span>
                    <p className="font-bold">Rs. {service.price}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Category</span>
                    <p>{service.category}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex justify-between">
                  <button
                    onClick={() => handleToggleService(service.id)}
                    className={`px-3 py-1 rounded text-sm ${
                      service.isActive
                        ? 'bg-red-100 text-red-800 hover:bg-red-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {service.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <div>
                    <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-200 mr-2">
                      Edit
                    </button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Add New Service</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Name *
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Plumbing Repair"
                value={newService.name}
                onChange={(e) =>
                  setNewService({ ...newService, name: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your service"
                rows="3"
                value={newService.description}
                onChange={(e) =>
                  setNewService({ ...newService, description: e.target.value })
                }
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (Rs.) *
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 1200"
                  value={newService.price}
                  onChange={(e) =>
                    setNewService({ ...newService, price: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  value={newService.category}
                  onChange={(e) =>
                    setNewService({ ...newService, category: e.target.value })
                  }
                >
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Painting">Painting</option>
                  <option value="Carpentry">Carpentry</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/image.jpg"
                value={newService.image}
                onChange={(e) =>
                  setNewService({ ...newService, image: e.target.value })
                }
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave blank to use a default image
              </p>
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={newService.isActive}
                  onChange={(e) =>
                    setNewService({ ...newService, isActive: e.target.checked })
                  }
                />
                <span className="ml-2 text-sm text-gray-700">
                  Service is active and available for booking
                </span>
              </label>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddService}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceProviderServices;
