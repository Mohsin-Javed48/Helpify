import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../../context/SocketContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ServiceProviderBidding = () => {
  const [bidRequests, setBidRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [activeBidRequest, setActiveBidRequest] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidMessage, setBidMessage] = useState('');
  const [responseStatus, setResponseStatus] = useState({});
  const { socket, connected } = useSocket();
  const user = useSelector((state) => state.auth.user);
  const serviceProviderId = user?.id;

  // Fetch available service requests when component mounts
  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          '/api/service-requests/provider/available',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setBidRequests(response.data.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching service requests:', err);
        setError(
          err.response?.data?.message || 'Failed to load service requests'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServiceRequests();
  }, []);

  // Listen for bid requests when component mounts
  useEffect(() => {
    if (!socket || !connected || !serviceProviderId) return;

    // Set up event listeners for incoming bid requests
    socket.on('new-bid-request', (data) => {
      console.log('New bid request received:', data);
      // Add the new bid request to the list
      setBidRequests((prevRequests) => {
        // Check if we already have this request
        if (
          prevRequests.some((req) => req.bidRequestId === data.bidRequestId)
        ) {
          return prevRequests;
        }

        // Add new request with formatted date and time
        return [
          ...prevRequests,
          {
            ...data,
            receivedAt: new Date(),
            status: 'new',
          },
        ];
      });
      setLoading(false);
    });

    socket.on('counter-offer', (data) => {
      console.log('Counter offer received:', data);
      setBidRequests((prevRequests) => {
        return prevRequests.map((request) => {
          if (request.bidRequestId === data.bidRequestId) {
            return {
              ...request,
              counterOfferAmount: data.counterOfferAmount,
              counterOfferMessage: data.message,
              status: 'counter_offered',
            };
          }
          return request;
        });
      });
    });

    // Clean up event listeners
    return () => {
      socket.off('new-bid-request');
      socket.off('counter-offer');
    };
  }, [socket, connected, serviceProviderId]);

  const handleOpenBidModal = (request) => {
    setActiveBidRequest(request);
    // Pre-fill with a competitive price if there's a counter offer
    if (request.counterOfferAmount) {
      setBidAmount(request.counterOfferAmount);
    } else {
      // Otherwise calculate a reasonable bid amount (5% less than the market price)
      const totalPrice = calculateTotalPrice(request.services);
      setBidAmount(Math.round(totalPrice * 0.95));
    }
    setBidMessage(
      request.counterOfferMessage
        ? 'I accept your counter offer and look forward to providing quality service.'
        : 'I can complete this job professionally and efficiently within the specified time frame.'
    );
    setShowBidModal(true);
  };

  const calculateTotalPrice = (services) => {
    return services.reduce(
      (total, service) => total + service.price * service.quantity,
      0
    );
  };

  const handleSubmitBid = async () => {
    if (!activeBidRequest) return;

    // Validate bid amount
    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      toast.error('Please enter a valid bid amount');
      return;
    }

    try {
      const response = await axios.post(
        '/api/bids',
        {
          requestId: activeBidRequest.id,
          bidPrice: parseFloat(bidAmount),
          message: bidMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Emit bid via socket for real-time updates
      if (socket && connected) {
        socket.emit('submit-bid', {
          requestId: activeBidRequest.id,
          serviceProviderId,
          bidAmount: parseFloat(bidAmount),
          message: bidMessage,
          services: activeBidRequest.services,
          scheduledDate: activeBidRequest.scheduledDate,
          scheduledTime: activeBidRequest.scheduledTime,
        });
      }

      toast.success('Bid submitted successfully!');

      // Remove the request from the list since we've bid on it
      setBidRequests((prev) =>
        prev.filter((req) => req.id !== activeBidRequest.id)
      );

      // Close modal and reset state
      setShowBidModal(false);
      setActiveBidRequest(null);
      setBidAmount('');
      setBidMessage('');
    } catch (error) {
      console.error('Error submitting bid:', error);
      toast.error(error.response?.data?.message || 'Failed to submit bid');
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const getStatusBadge = (status, bidRequestId) => {
    const isResponded = responseStatus[bidRequestId] === 'responded';
    const currentStatus = isResponded ? 'responded' : status;

    const statusStyles = {
      new: 'bg-blue-100 text-blue-800',
      counter_offered: 'bg-purple-100 text-purple-800',
      responded: 'bg-green-100 text-green-800',
      accepted: 'bg-teal-100 text-teal-800',
      rejected: 'bg-red-100 text-red-800',
    };

    const statusLabels = {
      new: 'New Request',
      counter_offered: 'Counter Offer',
      responded: 'Bid Sent',
      accepted: 'Accepted',
      rejected: 'Rejected',
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[currentStatus] || 'bg-gray-100 text-gray-800'}`}
      >
        {statusLabels[currentStatus] || 'Unknown'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Waiting for bid requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center bg-white rounded-lg shadow">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Available Service Requests</h1>
        <div className="text-sm text-gray-500">
          {bidRequests.length}{' '}
          {bidRequests.length === 1 ? 'request' : 'requests'} available
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading service requests...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-gray-700">{error}</p>
        </div>
      ) : bidRequests.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            No Service Requests
          </h3>
          <p className="text-gray-500 mb-4">
            There are currently no service requests available for bidding.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bidRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">
                    {request.customer?.firstName} {request.customer?.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Scheduled:{' '}
                    {new Date(request.scheduledDate).toLocaleDateString()}{' '}
                    {request.scheduledTime}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    Rs. {calculateTotalPrice(request.services)}
                  </div>
                  <div className="text-sm text-gray-500">Estimated Value</div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2">Requested Services:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {request.services.map((service, index) => (
                    <li key={index} className="text-gray-700">
                      {service.name} x {service.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2">Location:</h4>
                <p className="text-gray-700">{request.address}</p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleOpenBidModal(request)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Submit Bid
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bid Submission Modal */}
      {showBidModal && activeBidRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Submit Your Bid</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bid Amount
                </label>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your bid amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message to Customer
                </label>
                <textarea
                  value={bidMessage}
                  onChange={(e) => setBidMessage(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="3"
                  placeholder="Describe why you're the best fit for this job"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowBidModal(false)}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitBid}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit Bid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceProviderBidding;
