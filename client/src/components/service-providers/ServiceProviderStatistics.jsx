import React from 'react';

const ServiceProviderStatistics = () => {
  // Mock data
  const stats = [
    {
      id: 1,
      label: 'Total Orders',
      value: 125,
      icon: 'clipboard-list',
      color: 'bg-blue-100 text-blue-800',
    },
    {
      id: 2,
      label: 'Active Bids',
      value: 8,
      icon: 'cash',
      color: 'bg-green-100 text-green-800',
    },
    {
      id: 3,
      label: 'Completion Rate',
      value: '95%',
      icon: 'check-circle',
      color: 'bg-purple-100 text-purple-800',
    },
    {
      id: 4,
      label: 'Earnings',
      value: 'Rs. 45,200',
      icon: 'currency-dollar',
      color: 'bg-yellow-100 text-yellow-800',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white p-4 rounded-lg border">
            <div className="flex items-center">
              <div className={`p-3 rounded-full mr-4 ${stat.color}`}>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {getIcon(stat.icon)}
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="flex items-start">
          <div className="p-2 bg-blue-100 rounded-full mr-3">
            <svg
              className="h-5 w-5 text-blue-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-blue-800">
              Real-time Bidding Now Available!
            </h3>
            <p className="text-blue-700 text-sm mt-1">
              You can now respond to customer bid requests in real-time and
              negotiate prices directly through our platform.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-bold text-lg mb-3">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <p className="text-sm text-gray-600">New bid request received</p>
              <span className="ml-auto text-xs text-gray-500">2m ago</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              <p className="text-sm text-gray-600">
                Order #123 marked complete
              </p>
              <span className="ml-auto text-xs text-gray-500">1h ago</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
              <p className="text-sm text-gray-600">
                New review received (4.8★)
              </p>
              <span className="ml-auto text-xs text-gray-500">3h ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-bold text-lg mb-3">Upcoming Appointments</h3>
          <div className="space-y-3">
            <div className="p-2 bg-gray-50 rounded">
              <div className="flex justify-between mb-1">
                <p className="font-medium">Plumbing Service</p>
                <span className="text-sm text-blue-600">Today</span>
              </div>
              <p className="text-sm text-gray-600">2:00 PM - 4:00 PM</p>
              <p className="text-xs text-gray-500">123 Main St, Apt 4B</p>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <div className="flex justify-between mb-1">
                <p className="font-medium">Electrical Repair</p>
                <span className="text-sm text-blue-600">Tomorrow</span>
              </div>
              <p className="text-sm text-gray-600">10:00 AM - 12:00 PM</p>
              <p className="text-xs text-gray-500">456 Oak Ave, Suite 7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get the appropriate icon based on the name
const getIcon = (iconName) => {
  switch (iconName) {
    case 'clipboard-list':
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      );
    case 'cash':
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      );
    case 'check-circle':
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      );
    case 'currency-dollar':
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      );
    default:
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      );
  }
};

export default ServiceProviderStatistics;
