import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ServiceProviderBidsView from './ServiceProviderBidsView';
import PriceNegotiation from '../shared/PriceNegotiation';

const ServiceRequestDetail = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [serviceRequest, setServiceRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceRequest = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/service-requests/${requestId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setServiceRequest(response.data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching service request:', err);
        setError(
          err.response?.data?.message ||
            'Failed to load service request details'
        );
      } finally {
        setLoading(false);
      }
    };

    if (requestId) {
      fetchServiceRequest();
    }
  }, [requestId]);

  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await axios.patch(
        `/api/service-requests/${requestId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setServiceRequest(response.data.data);
    } catch (err) {
      console.error('Error updating status:', err);
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handlePriceUpdate = (newPrice) => {
    // Update the service request with the new negotiated price
    setServiceRequest((prev) => ({
      ...prev,
      finalAmount: newPrice,
    }));
  };

  if (loading) {
    return (
      <div className="text-center py-5">Loading service request details...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-red-500">
        <h2 className="text-xl font-bold">Error</h2>
        <p>{error}</p>
        <button
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!serviceRequest) {
    return (
      <div className="text-center py-5">
        <h2 className="text-xl font-bold">Service Request Not Found</h2>
        <button
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  // Calculate total price
  const totalPrice = serviceRequest.services.reduce(
    (sum, service) => sum + service.price * service.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Service Request Details</h1>
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Request Information</h2>
            <p className="mb-2">
              <span className="font-semibold">Status:</span>{' '}
              <span
                className={`uppercase ${
                  serviceRequest.status === 'pending'
                    ? 'text-yellow-600'
                    : serviceRequest.status === 'accepted'
                      ? 'text-green-600'
                      : serviceRequest.status === 'completed'
                        ? 'text-blue-600'
                        : 'text-red-600'
                }`}
              >
                {serviceRequest.status}
              </span>
            </p>
            <p className="mb-2">
              <span className="font-semibold">Scheduled Date:</span>{' '}
              {new Date(serviceRequest.scheduledDate).toLocaleDateString()}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Scheduled Time:</span>{' '}
              {serviceRequest.scheduledTime}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Address:</span>{' '}
              {`${serviceRequest.address.street}, ${serviceRequest.address.city}, ${serviceRequest.address.state} ${serviceRequest.address.zip}`}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Notes:</span>{' '}
              {serviceRequest.notes || 'No notes provided'}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Services Requested</h2>
            <ul className="divide-y divide-gray-200">
              {serviceRequest.services.map((service, index) => (
                <li key={index} className="py-2">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-medium">{service.name}</span>{' '}
                      <span className="text-sm text-gray-500">
                        (x{service.quantity})
                      </span>
                    </div>
                    <span>
                      ${(service.price * service.quantity).toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between font-semibold">
                <span>Total Estimated Price:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status update buttons for service providers */}
        {user &&
          user.roleId === 2 &&
          serviceRequest.serviceProviderId === user.id && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold mb-3">Update Request Status</h3>
              <div className="flex space-x-3">
                {serviceRequest.status === 'accepted' && (
                  <button
                    onClick={() => handleStatusUpdate('completed')}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Mark as Completed
                  </button>
                )}
                {(serviceRequest.status === 'pending' ||
                  serviceRequest.status === 'accepted') && (
                  <button
                    onClick={() => handleStatusUpdate('cancelled')}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Cancel Request
                  </button>
                )}
              </div>
            </div>
          )}

        {/* Status update buttons for customers */}
        {user && user.roleId === 1 && serviceRequest.customerId === user.id && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-semibold mb-3">Update Request Status</h3>
            <div className="flex space-x-3">
              {serviceRequest.status === 'pending' && (
                <button
                  onClick={() => handleStatusUpdate('cancelled')}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Cancel Request
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Price Negotiation section */}
      {serviceRequest.status === 'pending' && serviceRequest.bid && (
        <div className="mt-8">
          <PriceNegotiation
            bidId={serviceRequest.bid.id}
            serviceRequestId={serviceRequest.id}
            onPriceUpdate={handlePriceUpdate}
          />
        </div>
      )}

      {/* Display bids section for customers only */}
      {user && user.roleId === 1 && serviceRequest.customerId === user.id && (
        <ServiceProviderBidsView requestId={requestId} />
      )}
    </div>
  );
};

export default ServiceRequestDetail;
