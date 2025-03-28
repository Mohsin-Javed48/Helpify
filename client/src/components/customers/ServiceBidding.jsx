import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSocket } from '../../context/SocketContext';

const ServiceBidding = ({
  serviceDetails,
  scheduledDate,
  scheduledTime,
  address,
  onSelectProvider,
  onBack,
}) => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBid, setSelectedBid] = useState(null);
  const [counterOffer, setCounterOffer] = useState({});
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [activeCounterBid, setActiveCounterBid] = useState(null);
  const [requestSent, setRequestSent] = useState(false);
  const [bidRequestId, setBidRequestId] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { socket, connected } = useSocket();

  useEffect(() => {
    if (!socket || !connected) return;

    // Set up event listeners for socket events
    socket.on('bid-request-sent', (data) => {
      console.log('Bid request sent:', data);
      setRequestSent(true);
    });

    socket.on('bid-request-error', (data) => {
      console.error('Bid request error:', data);
      setError(data.message || 'Failed to send bid request');
      setLoading(false);
    });

    socket.on('bid-response', (data) => {
      console.log('Received bid response:', data);

      if (data.accepted) {
        // Add the new bid to the list
        const newBid = {
          id: data.bidRequestId + '-' + data.serviceProviderId,
          serviceProviderId: data.serviceProviderId,
          bidRequestId: data.bidRequestId,
          // These would come from the service provider profile in a real implementation
          name: `Provider ${data.serviceProviderId}`,
          designation: 'Service Professional',
          rating: 4.5,
          completedOrders: 50,
          successRate: '95%',
          responseTime: '10 min',
          originalPrice: calculateTotalPrice(),
          bidPrice: data.bidAmount,
          bidMessage: data.message || 'I can complete this job efficiently.',
          image: 'https://randomuser.me/api/portraits/men/32.jpg',
          availabilityStatus: 'available',
          bidStatus: 'pending',
        };

        setBids((prevBids) => [...prevBids, newBid]);
        setLoading(false);
      }
    });

    // Send the bid request when component mounts
    if (serviceDetails && serviceDetails.length > 0 && !requestSent) {
      const bidReqId = `bid-req-${Date.now()}`;
      setBidRequestId(bidReqId);

      socket.emit('request-bid', {
        bidRequestId: bidReqId,
        services: serviceDetails,
        scheduledDate,
        scheduledTime,
        address,
      });
    }

    // Clean up event listeners
    return () => {
      socket.off('bid-request-sent');
      socket.off('bid-request-error');
      socket.off('bid-response');
    };
  }, [
    socket,
    connected,
    serviceDetails,
    scheduledDate,
    scheduledTime,
    address,
    requestSent,
  ]);

  // For counter offers
  useEffect(() => {
    if (!socket || !connected) return;

    socket.on('counter-offer-sent', (data) => {
      console.log('Counter offer sent:', data);
    });

    socket.on('counter-offer-error', (data) => {
      console.error('Counter offer error:', data);
      alert(data.message || 'Failed to send counter offer');
    });

    return () => {
      socket.off('counter-offer-sent');
      socket.off('counter-offer-error');
    };
  }, [socket, connected]);

  // Use mock bids if no real bids received after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading && bids.length === 0) {
        generateMockBids();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [loading, bids]);

  const generateMockBids = () => {
    // Similar to previous mock data generation
    const mockBids = [
      {
        id: 1,
        serviceProviderId: 1,
        name: 'John Doe',
        designation: 'Senior Plumber',
        rating: 4.8,
        completedOrders: 132,
        successRate: '98%',
        responseTime: '15 min',
        originalPrice: calculateTotalPrice(),
        bidPrice: Math.round(
          calculateTotalPrice() * (0.9 + Math.random() * 0.2)
        ),
        bidMessage:
          'I can complete this job efficiently with high-quality work.',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        availabilityStatus: 'available',
        bidStatus: 'pending',
      },
      {
        id: 2,
        serviceProviderId: 2,
        name: 'Sarah Johnson',
        designation: 'Expert Electrician',
        rating: 4.7,
        completedOrders: 98,
        successRate: '96%',
        responseTime: '10 min',
        originalPrice: calculateTotalPrice(),
        bidPrice: Math.round(
          calculateTotalPrice() * (0.85 + Math.random() * 0.15)
        ),
        bidMessage:
          'I specialize in these services and can offer a competitive rate.',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        availabilityStatus: 'available',
        bidStatus: 'pending',
      },
      {
        id: 3,
        serviceProviderId: 3,
        name: 'Michael Smith',
        designation: 'Master Plumber',
        rating: 4.9,
        completedOrders: 215,
        successRate: '99%',
        responseTime: '5 min',
        originalPrice: calculateTotalPrice(),
        bidPrice: Math.round(
          calculateTotalPrice() * (0.95 + Math.random() * 0.25)
        ),
        bidMessage:
          "Premium service with guaranteed satisfaction. I'll ensure the job is done right the first time.",
        image: 'https://randomuser.me/api/portraits/men/46.jpg',
        availabilityStatus: 'available',
        bidStatus: 'pending',
      },
    ];

    setBids(mockBids);
    setLoading(false);
  };

  const calculateTotalPrice = () => {
    return serviceDetails.reduce(
      (total, service) => total + service.price * service.quantity,
      0
    );
  };

  const handleAcceptBid = (bid) => {
    setSelectedBid(bid);
    onSelectProvider(bid.serviceProviderId, bid.bidPrice);
  };

  const handleCounterOffer = (bid) => {
    setActiveCounterBid(bid);
    setCounterOffer({
      bidId: bid.id,
      providerId: bid.serviceProviderId,
      originalBid: bid.bidPrice,
      counterAmount: '',
    });
    setShowCounterModal(true);
  };

  const submitCounterOffer = async () => {
    // Validate counter offer
    if (
      !counterOffer.counterAmount ||
      isNaN(counterOffer.counterAmount) ||
      parseFloat(counterOffer.counterAmount) <= 0
    ) {
      alert('Please enter a valid counter offer amount');
      return;
    }

    if (socket && connected) {
      socket.emit('counter-offer', {
        bidRequestId: bidRequestId || 'mock-request',
        serviceProviderId: counterOffer.providerId,
        counterOfferAmount: parseFloat(counterOffer.counterAmount),
        message: `Counter offer of ${counterOffer.counterAmount} for your services`,
      });

      // Update UI immediately for better experience
      const updatedBids = bids.map((bid) => {
        if (bid.id === counterOffer.bidId) {
          return {
            ...bid,
            bidStatus: 'counter_offered',
            counterOfferAmount: parseFloat(counterOffer.counterAmount),
            originalBidPrice: bid.bidPrice,
            bidPrice: parseFloat(counterOffer.counterAmount),
          };
        }
        return bid;
      });

      setBids(updatedBids);
      setShowCounterModal(false);
    } else {
      // Fallback to the previous non-socket approach
      try {
        // For demo purposes, update the UI directly
        const updatedBids = bids.map((bid) => {
          if (bid.id === counterOffer.bidId) {
            return {
              ...bid,
              bidStatus: 'counter_offered',
              counterOfferAmount: parseFloat(counterOffer.counterAmount),
              originalBidPrice: bid.bidPrice,
              bidPrice: parseFloat(counterOffer.counterAmount),
            };
          }
          return bid;
        });

        setBids(updatedBids);
        setShowCounterModal(false);

        // Show success message
        alert('Counter offer sent successfully!');
      } catch (err) {
        console.error('Error sending counter offer:', err);
        alert('Failed to send counter offer. Please try again.');
      }
    }
  };

  const getBidStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      counter_offered: 'bg-blue-100 text-blue-800',
      rejected: 'bg-red-100 text-red-800',
    };

    const statusLabels = {
      pending: 'Pending',
      accepted: 'Accepted',
      counter_offered: 'Counter Offered',
      rejected: 'Rejected',
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}
      >
        {statusLabels[status] || 'Unknown'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">
          Getting bids from service providers in real-time...
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Please wait while service providers respond to your request
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center bg-white rounded-lg shadow">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (bids.length === 0) {
    return (
      <div className="p-6 text-center bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">No Bids Available</h2>
        <p className="text-gray-600 mb-4">
          We couldn't find any service providers available for your request at
          this time.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onBack}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/services')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Choose Different Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Service Provider Bids</h2>
        <p className="text-gray-600">
          <span className="font-semibold">{bids.length}</span> providers
          available
        </p>
      </div>

      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-800 text-sm mb-1 font-medium">
          <span className="mr-2">💡</span>
          You can accept a bid directly or make a counter offer to negotiate the
          price.
        </p>
        <p className="text-blue-800 text-sm">
          Select the provider based on rating, price, and expertise that best
          fits your needs.
        </p>
      </div>

      <div className="space-y-4 mb-6">
        {bids.map((bid) => (
          <div
            key={bid.id}
            className={`border rounded-lg p-4 transition-all ${
              selectedBid?.id === bid.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200'
            }`}
          >
            <div className="flex flex-col md:flex-row">
              <div className="flex items-start mb-4 md:mb-0">
                <img
                  src={bid.image}
                  alt={bid.name}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-gray-200"
                />
                <div>
                  <div className="flex items-center">
                    <h3 className="font-bold text-lg">{bid.name}</h3>
                    <span className="ml-2">
                      {getBidStatusBadge(bid.bidStatus)}
                    </span>
                  </div>
                  <p className="text-gray-600">{bid.designation}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center mr-3">
                      <svg
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="ml-1">{bid.rating}/5</span>
                    </div>
                    <div className="text-gray-600 text-sm">
                      {bid.completedOrders} jobs completed
                    </div>
                  </div>
                </div>
              </div>

              <div className="ml-0 md:ml-auto">
                <div className="flex flex-col items-end">
                  <p className="font-medium">Bid Price</p>
                  {bid.originalBidPrice &&
                  bid.bidStatus === 'counter_offered' ? (
                    <>
                      <p className="text-gray-500 line-through text-sm">
                        Rs. {bid.originalBidPrice}
                      </p>
                      <p className="text-lg font-bold text-green-600">
                        Rs. {bid.bidPrice}
                      </p>
                    </>
                  ) : (
                    <p className="text-lg font-bold">Rs. {bid.bidPrice}</p>
                  )}

                  {bid.bidStatus === 'counter_offered' && (
                    <p className="text-xs text-blue-600 italic">
                      Counter offer sent
                    </p>
                  )}
                </div>

                <div className="mt-3 space-x-2 flex">
                  <button
                    onClick={() => handleAcceptBid(bid)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                  >
                    Accept Bid
                  </button>
                  {bid.bidStatus !== 'counter_offered' && (
                    <button
                      onClick={() => handleCounterOffer(bid)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                    >
                      Counter Offer
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <p className="text-sm text-gray-500">Success Rate</p>
                  <p className="font-medium">{bid.successRate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Response Time</p>
                  <p className="font-medium">{bid.responseTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Original Price</p>
                  <p className="font-medium">Rs. {bid.originalPrice}</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Message</p>
                <p className="text-sm italic">"{bid.bidMessage}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4 border-t">
        <button
          onClick={onBack}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Back
        </button>
        <button
          onClick={() =>
            onSelectProvider(
              selectedBid?.serviceProviderId,
              selectedBid?.bidPrice
            )
          }
          disabled={!selectedBid}
          className={`px-6 py-2 rounded-md ${
            selectedBid
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue with Selected Provider
        </button>
      </div>

      {/* Counter Offer Modal */}
      {showCounterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Make a Counter Offer</h3>
            <div className="mb-4">
              <p className="text-gray-600 mb-2">
                You're negotiating with{' '}
                <span className="font-medium">{activeCounterBid?.name}</span>
              </p>
              <div className="flex justify-between mb-4">
                <span className="text-gray-500">Original Bid:</span>
                <span className="font-medium">
                  Rs. {activeCounterBid?.bidPrice}
                </span>
              </div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Counter Offer (Rs.)
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your counter offer"
                value={counterOffer.counterAmount}
                onChange={(e) =>
                  setCounterOffer({
                    ...counterOffer,
                    counterAmount: e.target.value,
                  })
                }
              />
              {parseFloat(counterOffer.counterAmount) >
                activeCounterBid?.bidPrice && (
                <p className="text-red-500 text-sm mt-1">
                  Your counter offer is higher than the original bid.
                </p>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowCounterModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={submitCounterOffer}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={
                  !counterOffer.counterAmount ||
                  parseFloat(counterOffer.counterAmount) >
                    activeCounterBid?.bidPrice
                }
              >
                Send Counter Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceBidding;
