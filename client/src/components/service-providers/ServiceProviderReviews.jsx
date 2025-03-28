import React, { useState } from 'react';

const ServiceProviderReviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      customerName: 'Sarah Miller',
      rating: 5,
      comment:
        'Very professional and punctual. Did an excellent job fixing our plumbing issues. Would definitely recommend!',
      date: '2023-07-01',
      serviceType: 'Plumbing Repair',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 2,
      customerName: 'James Wilson',
      rating: 4,
      comment:
        'Good service overall. Fixed the issue efficiently but left some mess that I had to clean up afterwards.',
      date: '2023-06-28',
      serviceType: 'Sink Installation',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
    {
      id: 3,
      customerName: 'Emily Chen',
      rating: 5,
      comment:
        'Outstanding service! The technician was knowledgeable, friendly, and completed the work faster than expected.',
      date: '2023-06-15',
      serviceType: 'Plumbing Repair',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    },
    {
      id: 4,
      customerName: 'Michael Brown',
      rating: 3,
      comment:
        'Decent work but arrived an hour late. Communication could have been better.',
      date: '2023-06-10',
      serviceType: 'Toilet Repair',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
  ]);

  const [filters, setFilters] = useState({
    rating: 'all',
    serviceType: 'all',
  });

  const [showRespondModal, setShowRespondModal] = useState(false);
  const [activeReview, setActiveReview] = useState(null);
  const [response, setResponse] = useState('');

  // Get average rating
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  // Get rating distribution
  const ratingDistribution = {
    5: reviews.filter((review) => review.rating === 5).length,
    4: reviews.filter((review) => review.rating === 4).length,
    3: reviews.filter((review) => review.rating === 3).length,
    2: reviews.filter((review) => review.rating === 2).length,
    1: reviews.filter((review) => review.rating === 1).length,
  };

  // Filter reviews
  const filteredReviews = reviews.filter((review) => {
    return (
      (filters.rating === 'all' ||
        review.rating === parseInt(filters.rating)) &&
      (filters.serviceType === 'all' ||
        review.serviceType === filters.serviceType)
    );
  });

  // Get unique service types for filter
  const serviceTypes = [
    'all',
    ...new Set(reviews.map((review) => review.serviceType)),
  ];

  const handleRespondClick = (review) => {
    setActiveReview(review);
    setShowRespondModal(true);
  };

  const handleSubmitResponse = () => {
    // In a real app, send to API
    console.log(`Responding to review #${activeReview.id}: ${response}`);
    setShowRespondModal(false);
    setResponse('');
  };

  // Helper to render rating stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Reviews & Ratings</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="col-span-1 bg-blue-50 p-6 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold text-blue-700">{avgRating}</div>
            <div className="flex my-2">
              {renderStars(Math.round(avgRating))}
            </div>
            <p className="text-blue-700 font-medium">Overall Rating</p>
            <p className="text-sm text-blue-600 mt-1">
              Based on {reviews.length} reviews
            </p>
          </div>

          <div className="mt-4 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center">
                <div className="w-10 text-sm text-gray-600">{star} stars</div>
                <div className="flex-1 ml-2 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${reviews.length ? (ratingDistribution[star] / reviews.length) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
                <div className="w-8 text-xs text-gray-500 text-right ml-2">
                  {ratingDistribution[star]}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2">
          <div className="flex flex-col sm:flex-row justify-between mb-4">
            <h3 className="text-lg font-medium mb-2 sm:mb-0">
              Customer Reviews
            </h3>
            <div className="flex space-x-2">
              <select
                className="p-2 text-sm border border-gray-300 rounded"
                value={filters.rating}
                onChange={(e) =>
                  setFilters({ ...filters, rating: e.target.value })
                }
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>

              <select
                className="p-2 text-sm border border-gray-300 rounded"
                value={filters.serviceType}
                onChange={(e) =>
                  setFilters({ ...filters, serviceType: e.target.value })
                }
              >
                {serviceTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type === 'all' ? 'All Services' : type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filteredReviews.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No reviews match your filters.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex items-start">
                    <img
                      src={review.avatar}
                      alt={review.customerName}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{review.customerName}</h4>
                          <div className="flex items-center mt-1">
                            <div className="flex mr-2">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(review.date).toLocaleDateString(
                                'en-US',
                                {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                }
                              )}
                            </span>
                          </div>
                        </div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {review.serviceType}
                        </span>
                      </div>

                      <p className="text-gray-700 mt-2">{review.comment}</p>

                      {review.response && (
                        <div className="mt-3 pl-3 border-l-2 border-gray-300">
                          <p className="text-xs font-medium text-gray-600 mb-1">
                            Your Response:
                          </p>
                          <p className="text-sm text-gray-700">
                            {review.response}
                          </p>
                        </div>
                      )}

                      {!review.response && (
                        <div className="mt-3 text-right">
                          <button
                            onClick={() => handleRespondClick(review)}
                            className="text-blue-600 text-sm font-medium hover:text-blue-800"
                          >
                            Respond
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Response Modal */}
      {showRespondModal && activeReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Respond to Review</h3>

            <div className="mb-4">
              <div className="flex items-center mb-2">
                <img
                  src={activeReview.avatar}
                  alt={activeReview.customerName}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <p className="font-medium">{activeReview.customerName}</p>
                  <div className="flex">{renderStars(activeReview.rating)}</div>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                {activeReview.comment}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Response
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder="Thank the customer for their feedback..."
                rows="4"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              ></textarea>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowRespondModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitResponse}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={!response.trim()}
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

export default ServiceProviderReviews;
