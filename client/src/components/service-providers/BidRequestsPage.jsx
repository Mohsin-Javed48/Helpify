import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useSocket } from '../../context/SocketContext';
import { toast } from 'react-toastify';

const BidRequestsPage = () => {
  const [bidRequests, setBidRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBidRequest, setCurrentBidRequest] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidMessage, setBidMessage] = useState('');
  const [showBidModal, setShowBidModal] = useState(false);
  const { socket, connected } = useSocket();
  const user = useSelector((state) => state.auth.user);

  // Fetch existing bid requests on component mount
  useEffect(() => {
    const fetchBidRequests = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/bids/service-provider/${user.id}`
        );
        setBidRequests(response.data.bidRequests || []);
      } catch (error) {
        console.error('Error fetching bid requests:', error);
        toast.error('Failed to load bid requests');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchBidRequests();
    }
  }, [user]);

  // Listen for real-time bid requests
  useEffect(() => {
    if (!socket || !connected) return;

    // Listen for new bid requests
    socket.on('new-service-request', (data) => {
      console.log('New service request received:', data);
      setBidRequests((prev) => [data, ...prev]);
      toast.info('New service request received!');
    });

    // Listen for counter offers
    socket.on('counter-offer-received', (data) => {
      console.log('Counter offer received:', data);
      setBidRequests((prev) =>
        prev.map((req) =>
          req.id === data.requestId
            ? {
                ...req,
                status: 'counter-offered',
                counterOfferAmount: data.amount,
                counterOfferMessage: data.message,
              }
            : req
        )
      );
      toast.info('Customer has made a counter offer!');
    });

    // Listen for bid acceptance
    socket.on('bid-accepted', (data) => {
      console.log('Bid accepted:', data);
      setBidRequests((prev) =>
        prev.map((req) =>
          req.id === data.requestId ? { ...req, status: 'accepted' } : req
        )
      );
      toast.success('Your bid has been accepted!');
    });

    return () => {
      socket.off('new-service-request');
      socket.off('counter-offer-received');
      socket.off('bid-accepted');
    };
  }, [socket, connected]);

  const handleOpenBidModal = (request) => {
    setCurrentBidRequest(request);

    // Set initial bid amount based on request
    if (request.counterOfferAmount) {
      setBidAmount(request.counterOfferAmount);
    } else {
      // Calculate a competitive bid (slightly lower than market price)
      const serviceCost = calculateTotalServiceCost(request.services);
      setBidAmount(Math.round(serviceCost * 0.95)); // 5% lower than market price
    }

    setBidMessage(
      request.counterOfferMessage
        ? `I accept your counter offer of Rs. ${request.counterOfferAmount} and will provide excellent service.`
        : 'I can complete this service professionally and efficiently.'
    );

    setShowBidModal(true);
  };

  const calculateTotalServiceCost = (services) => {
    if (!services || !services.length) return 0;
    return services.reduce(
      (total, service) => total + service.price * (service.quantity || 1),
      0
    );
  };

  const handleSubmitBid = async () => {
    if (!currentBidRequest) return;

    try {
      // Validate inputs
      if (!bidAmount || isNaN(bidAmount) || Number(bidAmount) <= 0) {
        toast.error('Please enter a valid bid amount');
        return;
      }

      if (!bidMessage.trim()) {
        toast.error('Please enter a message for the customer');
        return;
      }

      const bidData = {
        serviceProviderId: user.id,
        customerId: currentBidRequest.customerId,
        requestId: currentBidRequest.id,
        originalPrice: calculateTotalServiceCost(currentBidRequest.services),
        bidPrice: Number(bidAmount),
        message: bidMessage,
        services: currentBidRequest.services,
        scheduledDate: currentBidRequest.scheduledDate,
        scheduledTime: currentBidRequest.scheduledTime,
      };

      // Submit bid via API
      const response = await axios.post('/api/bids', bidData);

      // Also emit via socket for real-time notification
      if (socket && connected) {
        socket.emit('service-provider-bid', bidData);
      }

      // Update local state
      setBidRequests((prev) =>
        prev.map((req) =>
          req.id === currentBidRequest.id
            ? {
                ...req,
                status: 'bid-sent',
                bidAmount: Number(bidAmount),
                bidMessage,
              }
            : req
        )
      );

      toast.success('Bid submitted successfully!');
      setShowBidModal(false);
    } catch (error) {
      console.error('Error submitting bid:', error);
      toast.error('Failed to submit bid. Please try again.');
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      new: 'bg-blue-100 text-blue-800',
      'counter-offered': 'bg-purple-100 text-purple-800',
      'bid-sent': 'bg-green-100 text-green-800',
      accepted: 'bg-teal-100 text-teal-800',
      rejected: 'bg-red-100 text-red-800',
      completed: 'bg-gray-100 text-gray-800',
    };

    const statusLabels = {
      new: 'New Request',
      'counter-offered': 'Counter Offered',
      'bid-sent': 'Bid Sent',
      accepted: 'Accepted',
      rejected: 'Rejected',
      completed: 'Completed',
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}
      >
        {statusLabels[status] || 'Unknown Status'}
      </span>
    );
  };

  const formatDateTime = (date, time) => {
    if (!date) return 'Not specified';
    return `${date} ${time || ''}`;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Service Requests</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : bidRequests.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium text-gray-700">
            No service requests available
          </h3>
          <p className="text-gray-500 mt-2">
            New requests will appear here when customers request your services.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bidRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    {request.customer?.name || 'Customer'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatDateTime(
                      request.scheduledDate,
                      request.scheduledTime
                    )}
                  </p>
                </div>
                <div>{getStatusBadge(request.status || 'new')}</div>
              </div>

              <div className="p-6">
                <h4 className="font-medium mb-2">Services Requested:</h4>
                <ul className="mb-4 text-sm">
                  {request.services?.map((service, index) => (
                    <li key={index} className="flex justify-between mb-1">
                      <span>
                        {service.name}{' '}
                        {service.quantity > 1 ? `(x${service.quantity})` : ''}
                      </span>
                      <span>Rs. {service.price * (service.quantity || 1)}</span>
                    </li>
                  ))}
                  <li className="flex justify-between font-bold mt-2 pt-2 border-t">
                    <span>Total</span>
                    <span>
                      Rs. {calculateTotalServiceCost(request.services)}
                    </span>
                  </li>
                </ul>

                <div className="mb-4">
                  <h4 className="font-medium mb-1">Location:</h4>
                  <p className="text-sm text-gray-700">
                    {request.address || 'Not specified'}
                  </p>
                </div>

                {request.counterOfferAmount && (
                  <div className="mb-4 p-3 bg-purple-50 rounded-md">
                    <h4 className="font-medium text-purple-700">
                      Counter Offer: Rs. {request.counterOfferAmount}
                    </h4>
                    {request.counterOfferMessage && (
                      <p className="text-sm text-purple-600 mt-1">
                        {request.counterOfferMessage}
                      </p>
                    )}
                  </div>
                )}

                {request.status === 'bid-sent' && (
                  <div className="mb-4 p-3 bg-green-50 rounded-md">
                    <h4 className="font-medium text-green-700">
                      Your Bid: Rs. {request.bidAmount}
                    </h4>
                    <p className="text-sm text-green-600 mt-1">
                      {request.bidMessage}
                    </p>
                  </div>
                )}

                {(request.status === 'new' ||
                  request.status === 'counter-offered') && (
                  <button
                    onClick={() => handleOpenBidModal(request)}
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                  >
                    {request.status === 'counter-offered'
                      ? 'Respond to Counter Offer'
                      : 'Submit Bid'}
                  </button>
                )}

                {request.status === 'accepted' && (
                  <div className="text-center py-2 text-teal-600 font-medium">
                    Bid accepted! The customer will contact you soon.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bid Modal */}
      {showBidModal && currentBidRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Submit Your Bid</h2>

            <div className="mb-4">
              <h3 className="font-medium text-gray-700">Services Requested:</h3>
              <ul className="mt-2 text-sm">
                {currentBidRequest.services?.map((service, index) => (
                  <li key={index} className="flex justify-between py-1">
                    <span>
                      {service.name}{' '}
                      {service.quantity > 1 ? `(x${service.quantity})` : ''}
                    </span>
                    <span>Rs. {service.price * (service.quantity || 1)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                <span>Market Price:</span>
                <span>
                  Rs. {calculateTotalServiceCost(currentBidRequest.services)}
                </span>
              </div>
            </div>

            {currentBidRequest.counterOfferAmount && (
              <div className="mb-4 p-3 bg-purple-50 rounded-md">
                <h4 className="font-medium text-purple-700">
                  Counter Offer: Rs. {currentBidRequest.counterOfferAmount}
                </h4>
                {currentBidRequest.counterOfferMessage && (
                  <p className="text-sm text-purple-600 mt-1">
                    {currentBidRequest.counterOfferMessage}
                  </p>
                )}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Bid Amount (Rs.)
              </label>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your bid amount"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message to Customer
              </label>
              <textarea
                value={bidMessage}
                onChange={(e) => setBidMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Explain why you're the right person for this job"
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

export default BidRequestsPage;
