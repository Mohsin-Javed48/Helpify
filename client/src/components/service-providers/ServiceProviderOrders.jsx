import React, { useState } from 'react';

const ServiceProviderOrders = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [orders, setOrders] = useState([
    {
      id: 'ORD-1234',
      customerName: 'Alex Johnson',
      services: ['Plumbing Repair', 'Sink Installation'],
      scheduledDate: '2023-07-10',
      scheduledTime: '10:00 AM - 12:00 PM',
      address: '123 Main St, Apartment 4B, City',
      status: 'completed',
      amount: 2700,
      createdAt: '2023-07-05',
    },
    {
      id: 'ORD-5678',
      customerName: 'Sarah Miller',
      services: ['Electrical Wiring', 'Light Fixture Installation'],
      scheduledDate: '2023-07-11',
      scheduledTime: '3:00 PM - 5:00 PM',
      address: '456 Oak Avenue, Building C, City',
      status: 'in_progress',
      amount: 3600,
      createdAt: '2023-07-07',
    },
    {
      id: 'ORD-9012',
      customerName: 'Michael Davis',
      services: ['Painting Service'],
      scheduledDate: '2023-07-12',
      scheduledTime: '9:00 AM - 3:00 PM',
      address: '789 Pine Street, House 12, City',
      status: 'pending',
      amount: 4500,
      createdAt: '2023-07-08',
    },
  ]);

  const filteredOrders =
    activeTab === 'all'
      ? orders
      : orders.filter((order) => order.status === activeTab);

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    const statusLabels = {
      pending: 'Pending',
      in_progress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled',
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}
      >
        {statusLabels[status] || 'Unknown'}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-3 px-4 text-sm font-medium ${
            activeTab === 'all'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          All Orders
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={`pb-3 px-4 text-sm font-medium ${
            activeTab === 'pending'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setActiveTab('in_progress')}
          className={`pb-3 px-4 text-sm font-medium ${
            activeTab === 'in_progress'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`pb-3 px-4 text-sm font-medium ${
            activeTab === 'completed'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          Completed
        </button>
      </div>

      {filteredOrders.length === 0 ? (
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
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
          <p className="mt-2 text-sm text-gray-500">
            There are no orders matching your current filter.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className="border rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between p-4 border-b bg-gray-50">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-bold">Order {order.id}</h3>
                    <span className="ml-2">{getStatusBadge(order.status)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="font-medium">Rs. {order.amount}</span>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500">
                    Services
                  </h4>
                  <ul className="mt-1 text-sm text-gray-700">
                    {order.services.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Customer
                    </h4>
                    <p className="mt-1 text-sm">{order.customerName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Schedule
                    </h4>
                    <p className="mt-1 text-sm">{order.scheduledDate}</p>
                    <p className="text-sm text-gray-600">
                      {order.scheduledTime}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Address
                    </h4>
                    <p className="mt-1 text-sm">{order.address}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex justify-end">
                  {order.status === 'pending' && (
                    <>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
                        Accept
                      </button>
                      <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                        Decline
                      </button>
                    </>
                  )}
                  {order.status === 'in_progress' && (
                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                      Mark as Completed
                    </button>
                  )}
                  <button className="ml-2 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceProviderOrders;
