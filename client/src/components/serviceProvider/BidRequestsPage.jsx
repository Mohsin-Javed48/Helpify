import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useSocket } from '../../context/SocketContext';
import { toast } from 'react-toastify';

const BidRequestsPage = () => {
  const [bidRequests, setBidRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [currentBidRequest, setCurrentBidRequest] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidMessage, setBidMessage] = useState('');
  const { socket, connected } = useSocket();
  const { user } = useSelector((state) => state.auth);

  // Fetch bid requests when component mounts
  useEffect(() => {
    const fetchBidRequests = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/bids/provider', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setBidRequests(response.data.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching bid requests:', err);
        setError(err.response?.data?.message || 'Failed to load bid requests');
      } finally {
        setLoading(false);
      }
    };

    fetchBidRequests();
  }, []);

  // Listen for socket events
  useEffect(() => {
    if (!socket || !connected) return;

    // Listen for counter offers on our bids
    socket.on('counter-offer-received', (data) => {
      console.log('Counter offer received:', data);

      // Update the local state
      setBidRequests((prevRequests) =>
        prevRequests.map((request) => {
          if (request.id === data.bidId) {
            return {
              ...request,
              status: 'counter_offered',
              counterOfferPrice: data.counterOfferPrice,
              counterOfferMessage: data.message,
            };
          }
          return request;
        })
      );

      toast.info(`You received a counter offer for bid #${data.bidId}`);
    });

    // Listen for bid acceptances
    socket.on('bid-accepted', (data) => {
      console.log('Bid accepted:', data);

      // Update the local state
      setBidRequests((prevRequests) =>
        prevRequests.map((request) => {
          if (request.id === data.bidId) {
            return {
              ...request,
              status: 'accepted',
            };
          }
          return request;
        })
      );

      toast.success(`Your bid #${data.bidId} has been accepted!`);
    });

    return () => {
      socket.off('counter-offer-received');
      socket.off('bid-accepted');
    };
  }, [socket, connected]);

  const handleOpenBidModal = (request) => {
    setCurrentBidRequest(request);
    // Set initial counter offer as the existing counter offer price or original bid price
    setBidAmount(request.counterOfferPrice || request.bidPrice);
    setBidMessage('');
    setShowBidModal(true);
  };

  const handleSubmitBid = async () => {
    if (!currentBidRequest) return;

    // Validate bid amount
    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      toast.error('Please enter a valid bid amount');
      return;
    }

    try {
      // For counter offers, we submit a new bid with the updated price
      const response = await axios.post(
        '/api/bids',
        {
          requestId: currentBidRequest.serviceRequestId,
          bidPrice: parseFloat(bidAmount),
          message: bidMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      toast.success('Response to counter offer submitted successfully!');

      // Update the bid in the list
      setBidRequests((prevRequests) =>
        prevRequests.map((request) => {
          if (request.id === currentBidRequest.id) {
            return {
              ...request,
              bidPrice: parseFloat(bidAmount),
              message: bidMessage,
              status: 'pending',
            };
          }
          return request;
        })
      );

      // Close modal
      setShowBidModal(false);
      setCurrentBidRequest(null);
    } catch (err) {
      console.error('Error submitting counter offer response:', err);
      toast.error(err.response?.data?.message || 'Failed to submit response');
    }
  };

  const calculateTotalPrice = (services) => {
    if (!services || !Array.isArray(services)) return 0;
    return services.reduce(
      (sum, service) => sum + service.price * service.quantity,
      0
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      counter_offered: 'bg-blue-100 text-blue-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      expired: 'bg-gray-100 text-gray-800',
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}
      >
        {status === 'counter_offered'
          ? 'Counter Offered'
          : status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Bids</h1>
        </div>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading your bids...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Bids</h1>
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
        <h1 className="text-2xl font-bold">Your Bids</h1>
      </div>

      {bidRequests.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-500">You haven't placed any bids yet.</p>
          <p className="text-gray-500 mt-2">
            Browse available service requests to start bidding.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bidRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-800 font-medium">
                    Bid #{request.id}
                  </span>
                  {getStatusBadge(request.status)}
                </div>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-1">Pricing</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Original Price</p>
                      <p className="font-medium">${request.originalPrice}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Your Bid</p>
                      <p className="font-medium text-green-600">
                        ${request.bidPrice}
                      </p>
                    </div>

                    {request.counterOfferPrice && (
                      <div className="col-span-2 mt-2 bg-blue-50 p-2 rounded">
                        <p className="text-gray-500">Counter Offer</p>
                        <p className="font-medium text-blue-600">
                          ${request.counterOfferPrice}
                        </p>
                        {request.counterOfferMessage && (
                          <p className="text-xs mt-1 italic">
                            "{request.counterOfferMessage}"
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-1">Details</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Created:</span>{' '}
                      {formatDate(request.createdAt)}
                    </p>
                    {request.expiresAt && (
                      <p>
                        <span className="font-medium">Expires:</span>{' '}
                        {formatDate(request.expiresAt)}
                      </p>
                    )}
                    {request.message && (
                      <div className="mt-2">
                        <p className="font-medium">Your Message:</p>
                        <p className="italic">"{request.message}"</p>
                      </div>
                    )}
                  </div>
                </div>

                {request.status === 'counter_offered' && (
                  <button
                    onClick={() => handleOpenBidModal(request)}
                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center font-medium"
                  >
                    Respond to Counter Offer
                  </button>
                )}

                {request.status === 'accepted' && (
                  <div className="bg-green-50 p-3 rounded-md text-center text-green-700">
                    <p className="font-medium">Your bid was accepted!</p>
                    <p className="text-sm">Contact the customer to proceed.</p>
                  </div>
                )}

                {request.status === 'rejected' && (
                  <div className="bg-red-50 p-3 rounded-md text-center text-red-700">
                    <p className="font-medium">Your bid was rejected.</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Counter Offer Response Modal */}
      {showBidModal && currentBidRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold mb-4">Respond to Counter Offer</h2>

            <div className="mb-4">
              <h3 className="font-medium text-gray-700">
                Counter Offer Details
              </h3>
              <div className="mt-2 bg-blue-50 p-3 rounded-md text-sm">
                <div className="mb-2">
                  <span className="font-medium">Counter Offer Amount:</span> $
                  {currentBidRequest.counterOfferPrice}
                </div>
                {currentBidRequest.counterOfferMessage && (
                  <div className="mb-2">
                    <span className="font-medium">Message:</span> "
                    {currentBidRequest.counterOfferMessage}"
                  </div>
                )}
                <div className="mb-2">
                  <span className="font-medium">Your Original Bid:</span> $
                  {currentBidRequest.bidPrice}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Response Amount ($)
              </label>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your new bid amount"
              />
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
                placeholder="Explain your response"
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
                Submit Response
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidRequestsPage;
