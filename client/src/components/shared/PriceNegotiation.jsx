import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const PriceNegotiation = ({ bidId, serviceRequestId, onPriceUpdate }) => {
  const user = useSelector((state) => state.auth.user);
  const [negotiations, setNegotiations] = useState([]);
  const [newAmount, setNewAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchNegotiations();
    scrollToBottom();
  }, [bidId]);

  const fetchNegotiations = async () => {
    try {
      const response = await axios.get(`/api/price-negotiations/bid/${bidId}`);
      setNegotiations(response.data.data);
    } catch (error) {
      console.error('Error fetching negotiations:', error);
      toast.error('Failed to load negotiation history');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAmount || !message) {
      toast.error('Please enter both amount and message');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/price-negotiations', {
        bidId,
        proposedAmount: parseFloat(newAmount),
        message,
      });

      setNegotiations([...negotiations, response.data.data]);
      setNewAmount('');
      setMessage('');
      toast.success('Price proposal sent successfully');
    } catch (error) {
      console.error('Error submitting negotiation:', error);
      toast.error('Failed to submit price proposal');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (negotiationId, status) => {
    try {
      const response = await axios.patch(
        `/api/price-negotiations/${negotiationId}/status`,
        {
          status,
        }
      );

      setNegotiations(
        negotiations.map((n) =>
          n.id === negotiationId ? response.data.data : n
        )
      );

      if (status === 'accepted') {
        onPriceUpdate(response.data.data.proposedAmount);
        toast.success('Price proposal accepted');
      } else {
        toast.info('Price proposal rejected');
      }
    } catch (error) {
      console.error('Error updating negotiation status:', error);
      toast.error('Failed to update negotiation status');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Price Negotiation</h3>

      {/* Negotiation History */}
      <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
        {negotiations.map((negotiation) => (
          <div
            key={negotiation.id}
            className={`p-3 rounded-lg ${
              negotiation.isFromCustomer ? 'bg-blue-50 ml-4' : 'bg-gray-50 mr-4'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">
                  {negotiation.isFromCustomer ? 'You' : 'Service Provider'}{' '}
                  proposed:
                </p>
                <p className="text-lg font-bold text-green-600">
                  ${negotiation.proposedAmount}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {negotiation.message}
                </p>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(negotiation.createdAt).toLocaleTimeString()}
              </span>
            </div>

            {/* Status and Actions */}
            {negotiation.status === 'pending' && (
              <div className="mt-2 flex space-x-2">
                {!negotiation.isFromCustomer && (
                  <>
                    <button
                      onClick={() =>
                        handleStatusUpdate(negotiation.id, 'accepted')
                      }
                      className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleStatusUpdate(negotiation.id, 'rejected')
                      }
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* New Negotiation Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Proposed Amount
          </label>
          <input
            type="number"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter amount"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows="3"
            placeholder="Explain your price proposal"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Proposal'}
        </button>
      </form>
    </div>
  );
};

export default PriceNegotiation;
