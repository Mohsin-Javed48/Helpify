import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Only try to fetch using the user ID if user exists
        if (user && user.id) {
          const response = await axios.get(`/api/v1/orders?userId=${user.id}`);
          setOrders(response.data.orders);
        } else {
          // Handle the case when user is not defined or doesn't have an ID
          console.log('User not authenticated, using mock data');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load your order history. Please try again later.');
        setLoading(false);
      }
    };

    // For demo purposes, use mock data
    setTimeout(() => {
      const mockOrders = [
        {
          id: 1,
          title: 'Plumbing Services',
          scheduledDate: '2023-06-15',
          scheduledTime: '14:00 - 15:00',
          address: '123 Main St, DHA, Lahore',
          amount: 450,
          status: 'completed',
          createdAt: '2023-06-10T10:00:00Z',
          serviceProvider: {
            name: 'Michael Smith',
            designation: 'Master Plumber',
            rating: 4.9,
          },
        },
        {
          id: 2,
          title: 'Electrician Services',
          scheduledDate: '2023-06-18',
          scheduledTime: '10:00 - 12:00',
          address: '456 Oak Ave, Model Town, Lahore',
          amount: 380,
          status: 'pending',
          createdAt: '2023-06-12T14:30:00Z',
          serviceProvider: {
            name: 'Sarah Johnson',
            designation: 'Expert Electrician',
            rating: 4.7,
          },
        },
        {
          id: 3,
          title: 'Handyman Services',
          scheduledDate: '2023-06-20',
          scheduledTime: '16:00 - 18:00',
          address: '789 Pine Rd, Gulberg, Lahore',
          amount: 500,
          status: 'in_progress',
          createdAt: '2023-06-14T09:15:00Z',
          serviceProvider: {
            name: 'John Doe',
            designation: 'Senior Handyman',
            rating: 4.8,
          },
        },
      ];
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, [user?.id]);

  const getStatusColor = (status) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      rejected: 'bg-gray-100 text-gray-800',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Order History</h2>
        <p className="text-gray-500">You don't have any orders yet.</p>
        <button
          onClick={() => navigate('/services')}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Book a Service
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">Your Bookings</h2>
      </div>

      <div className="divide-y">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold">{order.title}</h3>
                  <span
                    className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}
                  >
                    {order.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="mt-2 text-sm text-gray-500">
                  <div className="flex items-center mb-1">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {formatDate(order.scheduledDate)} | {order.scheduledTime}
                  </div>

                  <div className="flex items-center mb-1">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {order.address}
                  </div>

                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                    </svg>
                    Order #{order.id} | Booked on {formatDate(order.createdAt)}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="text-lg font-bold">Rs. {order.amount}</div>

                <div className="mt-2 flex items-center text-sm">
                  <svg
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className="ml-1 text-gray-600">
                    {order.serviceProvider.rating}/5
                  </span>
                  <span className="ml-2 text-gray-800">
                    {order.serviceProvider.name}
                  </span>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() =>
                      navigate(`/booking/confirmation/${order.id}`)
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-4 bg-gray-50">
        <button
          onClick={() => navigate('/services')}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Book Another Service
        </button>
      </div>
    </div>
  );
};

export default OrderHistory;
