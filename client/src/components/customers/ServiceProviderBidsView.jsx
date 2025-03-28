import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useSocket } from '../../context/SocketContext';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const ServiceProviderBidsView = ({ requestId, onAcceptBid, onClose }) => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCounterOfferModal, setShowCounterOfferModal] = useState(false);
  const [counterOfferAmount, setCounterOfferAmount] = useState('');
  const [counterOfferMessage, setCounterOfferMessage] = useState('');
  const [activeBid, setActiveBid] = useState(null);
  const { socket, connected } = useSocket();
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState(null);

  // Fetch bids for this request when component mounts
  useEffect(() => {
    const fetchBids = async () => {
      if (!requestId) return;

      try {
        setLoading(true);
        const response = await axios.get(`/api/bids/request/${requestId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setBids(response.data.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching bids:', err);
        setError(err.response?.data?.message || 'Failed to load bids');
      } finally {
        setLoading(false);
      }
    };

    if (requestId) {
      fetchBids();
    }
  }, [requestId]);

  // Listen for real-time bid updates
  useEffect(() => {
    if (!socket || !connected || !requestId) return;

    // Listen for new bids
    socket.on('new-bid-received', (data) => {
      if (data.requestId === requestId) {
        console.log('New bid received:', data);
        setBids((prev) => [...prev, data]);
        toast.info('New bid received from a service provider!');
      }
    });

    // Listen for bid updates
    socket.on('bid-updated', (data) => {
      if (data.requestId === requestId) {
        console.log('Bid updated:', data);
        setBids((prev) =>
          prev.map((bid) => (bid.id === data.bidId ? { ...bid, ...data } : bid))
        );
      }
    });

    return () => {
      socket.off('new-bid-received');
      socket.off('bid-updated');
    };
  }, [socket, connected, requestId]);

  const handleOpenCounterOfferModal = (bid) => {
    setActiveBid(bid);
    setCounterOfferAmount(bid.bidPrice);
    setCounterOfferMessage('');
    setShowCounterOfferModal(true);
  };

  const handleSubmitCounterOffer = async () => {
    if (!activeBid) return;

    // Validate counter offer price
    if (!counterOfferAmount || parseFloat(counterOfferAmount) <= 0) {
      toast.error('Please enter a valid counter offer price');
      return;
    }

    try {
      const response = await axios.post(
        `/api/bids/${activeBid.id}/counter-offer`,
        {
          counterOfferPrice: parseFloat(counterOfferAmount),
          message: counterOfferMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Update the bid in the list
      setBids((prev) =>
        prev.map((bid) => (bid.id === activeBid.id ? response.data.data : bid))
      );

      // Close modal
      setShowCounterOfferModal(false);
      setActiveBid(null);
      toast.success('Counter offer submitted successfully!');

      // Notify service provider via socket
      if (socket && connected) {
        socket.emit('counter-offer', {
          bidId: activeBid.id,
          requestId: requestId,
          counterOfferAmount: parseFloat(counterOfferAmount),
          message: counterOfferMessage,
        });
      }
    } catch (error) {
      console.error('Error submitting counter offer:', error);
      toast.error(
        error.response?.data?.message || 'Failed to submit counter offer'
      );
    }
  };

  const getProviderAvatar = (provider) => {
    return (
      provider?.profileImage ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(provider?.name || 'SP')}&background=0D8ABC&color=fff`
    );
  };

  const getBidStatus = (status) => {
    const statusStyles = {
      pending: 'bg-blue-100 text-blue-800',
      'counter-offered': 'bg-purple-100 text-purple-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };

    const statusLabels = {
      pending: 'Pending',
      'counter-offered': 'Counter Offered',
      accepted: 'Accepted',
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
    return <div className="text-center py-5">Loading bids...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-5 text-red-500">
        <h2 className="text-xl font-bold">Error Loading Bids</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Service Provider Bids</h1>
        <div className="text-sm text-gray-500">
          {bids.length} {bids.length === 1 ? 'bid' : 'bids'} received
        </div>
      </div>

      {bids.length === 0 ? (
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No bids yet</h3>
          <p className="mt-2 text-sm text-gray-500">
            Service providers will submit their bids soon. You'll be notified
            when new bids arrive.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bids.map((bid) => (
            <div
              key={bid.id}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <img
                    src={
                      bid.serviceProvider?.profilePicture ||
                      'https://via.placeholder.com/40'
                    }
                    alt={bid.serviceProvider?.firstName}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {bid.serviceProvider?.firstName}{' '}
                      {bid.serviceProvider?.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Rating: {bid.serviceProvider?.rating || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    Rs. {bid.bidPrice}
                  </div>
                  <div className="text-sm text-gray-500">
                    Original: Rs. {bid.originalPrice}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-gray-700">{bid.message}</p>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => handleOpenCounterOfferModal(bid)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Counter Offer
                </button>
                <button
                  onClick={() => onAcceptBid(bid)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Accept Bid
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Counter Offer Modal */}
      {showCounterOfferModal && activeBid && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Make a Counter Offer</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Counter Offer Amount
                </label>
                <input
                  type="number"
                  value={counterOfferAmount}
                  onChange={(e) => setCounterOfferAmount(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message (Optional)
                </label>
                <textarea
                  value={counterOfferMessage}
                  onChange={(e) => setCounterOfferMessage(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="3"
                  placeholder="Add a message to the service provider"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowCounterOfferModal(false)}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitCounterOffer}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit Counter Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ServiceProviderBidsView.propTypes = {
  requestId: PropTypes.string.isRequired,
  onAcceptBid: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ServiceProviderBidsView;
