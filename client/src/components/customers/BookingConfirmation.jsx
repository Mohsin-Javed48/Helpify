import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function BookingConfirmation() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // In a real application, you would fetch the order details from your API
        // const response = await axios.get(`/api/orders/${orderId}`);
        // setOrderDetails(response.data);

        // For now, we'll use mock data
        setTimeout(() => {
          setOrderDetails({
            id: orderId || '123456',
            title: 'Plumbing Service',
            status: 'pending',
            scheduledDate: '2025-03-24',
            scheduledTime: '14:00 - 15:00',
            address: '123 Main St, DHA, Lahore, Pakistan',
            amount: 2500,
            originalAmount: 3000, // Original price before negotiation
            isNegotiated: true, // Flag to indicate if price was negotiated
            paymentMethod: 'cash',
            serviceProvider: {
              id: 2,
              name: 'John Doe',
              designation: 'Senior Plumber',
              phone: '+92 300 1234567',
              image: 'https://randomuser.me/api/portraits/men/32.jpg',
            },
            services: [
              {
                id: 1,
                title: 'Basic Plumbing',
                subtitle: 'Fixing leaks and basic repairs',
                price: 1000,
                quantity: 1,
                subtotal: 1000,
              },
              {
                id: 2,
                title: 'Pipe Replacement',
                subtitle: 'Replace damaged pipes',
                price: 1500,
                quantity: 1,
                subtotal: 1500,
              },
            ],
          });
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('Failed to load booking details. Please try again.');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto my-8 px-4">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-8 px-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-green-50 p-6 border-b border-green-100">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-100 rounded-full p-3">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Booking Confirmed!
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Your order has been successfully placed
          </p>
          <p className="text-center text-gray-500 mt-1">
            Order ID: {orderDetails.id}
          </p>
        </div>

        {/* Order Summary */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Service</p>
                <p className="font-medium">{orderDetails.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium capitalize">
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                    {orderDetails.status}
                  </span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{orderDetails.scheduledDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">{orderDetails.scheduledTime}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{orderDetails.address}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                {orderDetails.isNegotiated && orderDetails.originalAmount ? (
                  <div>
                    <p className="font-bold text-lg text-green-600">
                      Rs. {orderDetails.amount}
                    </p>
                    <p className="text-sm text-gray-500 line-through">
                      Original: Rs. {orderDetails.originalAmount}
                    </p>
                    <p className="text-xs text-green-600">
                      You saved Rs.{' '}
                      {orderDetails.originalAmount - orderDetails.amount}!
                    </p>
                  </div>
                ) : (
                  <p className="font-bold text-lg">Rs. {orderDetails.amount}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium capitalize">
                  {orderDetails.paymentMethod.replace('_', ' ')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-3">Service Provider</h3>
            <div className="flex items-center">
              <img
                src={orderDetails.serviceProvider.image}
                alt={orderDetails.serviceProvider.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 mr-4"
              />
              <div>
                <p className="font-medium">
                  {orderDetails.serviceProvider.name}
                </p>
                <p className="text-sm text-gray-600">
                  {orderDetails.serviceProvider.designation}
                </p>
                <p className="text-sm text-gray-600">
                  {orderDetails.serviceProvider.phone}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-3">Services Booked</h3>
            <div className="space-y-3">
              {orderDetails.services.map((service) => (
                <div
                  key={service.id}
                  className="flex justify-between items-center pb-2 border-b border-gray-100"
                >
                  <div>
                    <p className="font-medium">
                      {service.title} × {service.quantity}
                    </p>
                    <p className="text-sm text-gray-600">{service.subtitle}</p>
                  </div>
                  <p className="font-medium">Rs. {service.subtotal}</p>
                </div>
              ))}

              <div className="flex justify-between items-center pt-2">
                {orderDetails.isNegotiated && orderDetails.originalAmount ? (
                  <div>
                    <p className="text-sm text-gray-500 line-through">
                      Original Total: Rs. {orderDetails.originalAmount}
                    </p>
                    <p className="font-bold">Negotiated Price</p>
                  </div>
                ) : (
                  <p className="font-bold">Total</p>
                )}
                <p className="font-bold text-lg">Rs. {orderDetails.amount}</p>
              </div>

              {orderDetails.isNegotiated && orderDetails.originalAmount && (
                <div className="bg-green-50 p-3 rounded-md mt-3">
                  <p className="text-green-700 text-sm">
                    <span className="font-medium">Great job negotiating!</span>{' '}
                    You saved Rs.{' '}
                    {orderDetails.originalAmount - orderDetails.amount} (
                    {Math.round(
                      ((orderDetails.originalAmount - orderDetails.amount) /
                        orderDetails.originalAmount) *
                        100
                    )}
                    % off)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-gray-50 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => navigate('/dashboard/orders')}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto"
          >
            View All Orders
          </button>
          <button
            onClick={() => navigate('/services')}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 w-full sm:w-auto"
          >
            Book Another Service
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;
