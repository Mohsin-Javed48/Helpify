import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useSocket } from '../../context/SocketContext';
import { toast } from 'react-toastify';

const ServiceProviderBidding = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [activeRequest, setActiveRequest] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidMessage, setBidMessage] = useState('');
  const { socket, connected } = useSocket();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchAvailableRequests = async () => {
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
        setRequests(response.data.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching available requests:', err);
        setError(
          err.response?.data?.message || 'Failed to load service requests'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableRequests();
  }, []);

  // Listen for real-time events
  useEffect(() => {
    if (!socket || !connected) return;

    // Listen for new service requests
    socket.on('new-service-request', (data) => {
      console.log('New service request received:', data);
      // Fetch the new request details
      axios
        .get(`/api/service-requests/${data.requestId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((response) => {
          setRequests((prev) => [...prev, response.data.data]);
          toast.info('New service request available for bidding!');
        })
        .catch((err) => {
          console.error('Error fetching new request:', err);
        });
    });

    // Listen for counter offers
    socket.on('counter-offer-received', (data) => {
      toast.info(`You received a counter offer for request #${data.requestId}`);
    });

    // Listen for bid acceptance
    socket.on('bid-accepted', (data) => {
      toast.success(
        `Your bid for request #${data.requestId} has been accepted!`
      );
    });

    return () => {
      socket.off('new-service-request');
      socket.off('counter-offer-received');
      socket.off('bid-accepted');
    };
  }, [socket, connected]);

  const handleOpenBidModal = (request) => {
    setActiveRequest(request);
    // Set initial bid amount to 5% less than total estimated price
    const totalPrice = calculateTotalPrice(request.services);
    setBidAmount(Math.round(totalPrice * 0.95));
    setBidMessage('');
    setShowBidModal(true);
  };

  const handleSubmitBid = async () => {
    if (!activeRequest) return;

    // Validate bid amount
    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      toast.error('Please enter a valid bid amount');
      return;
    }

    try {
      const response = await axios.post(
        '/api/bids',
        {
          requestId: activeRequest.id,
          bidPrice: parseFloat(bidAmount),
          message: bidMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      toast.success('Bid submitted successfully!');

      // Remove the request from the list
      setRequests(
        requests.filter((request) => request.id !== activeRequest.id)
      );

      // Close modal and reset state
      setShowBidModal(false);
      setActiveRequest(null);
      setBidAmount('');
      setBidMessage('');
    } catch (err) {
      console.error('Error submitting bid:', err);
      toast.error(err.response?.data?.message || 'Failed to submit bid');
    }
  };

  const calculateTotalPrice = (services) => {
    return services.reduce(
      (sum, service) => sum + service.price * service.quantity,
      0
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Available Service Requests</h1>
        </div>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">
            Loading available service requests...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Available Service Requests</h1>
        </div>
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Available Service Requests</h1>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-500">
            No service requests available for bidding at the moment.
          </p>
          <p className="text-gray-500 mt-2">
            Check back later or wait for new requests to come in.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => {
            const totalPrice = calculateTotalPrice(request.services);

            return (
              <div
                key={request.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-800 font-medium">
                      Request #{request.id}
                    </span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Pending
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-1">Services</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {request.services.map((service, index) => (
                        <li key={index} className="flex justify-between">
                          <span>
                            {service.name} x{service.quantity}
                          </span>
                          <span>${service.price * service.quantity}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between font-medium">
                      <span>Total Value:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-1">Details</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <span className="font-medium">Date:</span>{' '}
                        {formatDate(request.scheduledDate)}
                      </p>
                      <p>
                        <span className="font-medium">Time:</span>{' '}
                        {request.scheduledTime}
                      </p>
                      <p>
                        <span className="font-medium">Location:</span>{' '}
                        {request.address.city}, {request.address.state}
                      </p>
                      {request.notes && (
                        <p>
                          <span className="font-medium">Notes:</span>{' '}
                          {request.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenBidModal(request)}
                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center font-medium"
                  >
                    Place Your Bid
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bid Modal */}
      {showBidModal && activeRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold mb-4">Place a Bid</h2>

            <div className="mb-4">
              <h3 className="font-medium text-gray-700">Request Details</h3>
              <div className="mt-2 bg-gray-50 p-3 rounded-md text-sm">
                <div className="mb-2">
                  <span className="font-medium">Services:</span>{' '}
                  {activeRequest.services.map((s) => s.name).join(', ')}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Date:</span>{' '}
                  {formatDate(activeRequest.scheduledDate)}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Time:</span>{' '}
                  {activeRequest.scheduledTime}
                </div>
                <div>
                  <span className="font-medium">Location:</span>{' '}
                  {activeRequest.address.city}, {activeRequest.address.state}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Bid Amount ($)
              </label>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your bid amount"
              />
              <p className="text-xs text-gray-500 mt-1">
                Customer's estimated price: $
                {calculateTotalPrice(activeRequest.services).toFixed(2)}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message (Optional)
              </label>
              <textarea
                value={bidMessage}
                onChange={(e) => setBidMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Explain why you're the best choice for this job"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowBidModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitBid}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
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
