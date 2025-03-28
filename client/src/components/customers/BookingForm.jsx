import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ServiceBidding from './ServiceBidding';

function BookingForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const ordersList = useSelector((state) => state.orders.ordersList);

  const [bookingState, setBookingState] = useState({
    step: 1,
    selectedDate: null,
    selectedTime: null,
    address: '',
    city: '',
    area: '',
    serviceProviderId: null,
    selectedBidPrice: null,
    paymentMethod: 'cash',
    loading: false,
    error: null,
    success: false,
  });

  // Calculate total amount
  const totalAmount =
    bookingState.selectedBidPrice ||
    ordersList.reduce(
      (total, order) => total + order.price * order.quantity,
      0
    );

  // Calculate total services count
  const totalServices = ordersList.reduce(
    (total, order) => total + order.quantity,
    0
  );

  const handleDateSelect = (date) => {
    setBookingState({
      ...bookingState,
      selectedDate: date,
    });
  };

  const handleTimeSelect = (time) => {
    setBookingState({
      ...bookingState,
      selectedTime: time,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingState({
      ...bookingState,
      [name]: value,
    });
  };

  const handleProviderSelect = (providerId, bidPrice) => {
    setBookingState({
      ...bookingState,
      serviceProviderId: providerId,
      selectedBidPrice: bidPrice || null,
      step: 5, // Skip directly to payment step after selecting a provider
    });
  };

  const handlePaymentMethodSelect = (method) => {
    setBookingState({
      ...bookingState,
      paymentMethod: method,
    });
  };

  const handleNextStep = () => {
    setBookingState({
      ...bookingState,
      step: bookingState.step + 1,
    });
  };

  const handlePreviousStep = () => {
    setBookingState({
      ...bookingState,
      step: bookingState.step - 1,
    });
  };

  const validateCurrentStep = () => {
    switch (bookingState.step) {
      case 1: // Services selection
        return ordersList.length > 0;
      case 2: // Date and time selection
        return bookingState.selectedDate && bookingState.selectedTime;
      case 3: // Address information
        return bookingState.address && bookingState.city && bookingState.area;
      case 4: // Bidding and service provider selection
        return bookingState.serviceProviderId !== null;
      default:
        return true;
    }
  };

  const handleSubmitBooking = async () => {
    // Prevent submission if validation fails
    if (!validateCurrentStep()) return;

    setBookingState({
      ...bookingState,
      loading: true,
      error: null,
    });

    try {
      // Format the order services data
      const orderServices = ordersList.map((service) => ({
        serviceId: service.id,
        quantity: service.quantity,
        price: service.price,
        subtotal: service.price * service.quantity,
        notes: `Service notes for ${service.title}`,
      }));

      // Check if user is defined before accessing user.id
      if (!user) {
        console.warn(
          'User not authenticated, using mock data for demo purposes'
        );
        // For demo purposes, simulate a successful booking with mock data
        setTimeout(() => {
          setBookingState({
            ...bookingState,
            loading: false,
            success: true,
            orderId: 'DEMO-' + Math.floor(Math.random() * 1000000),
          });

          // Navigate to confirmation page with a mock order ID
          navigate(
            `/booking/confirmation/DEMO-${Math.floor(Math.random() * 1000000)}`
          );
        }, 1500);
        return;
      }

      // Create the order object
      const orderData = {
        userId: user.id,
        serviceProviderId: bookingState.serviceProviderId,
        title: ordersList[0].title, // Use the first service title or create a combined title
        description: `Booking for ${ordersList[0].title.toLowerCase()}`,
        address: `${bookingState.address}, ${bookingState.area}, ${bookingState.city}, Pakistan`,
        scheduledDate: bookingState.selectedDate,
        scheduledTime: bookingState.selectedTime,
        paymentMethod: bookingState.paymentMethod,
        amount: bookingState.selectedBidPrice || totalAmount, // Use negotiated price if available
        services: orderServices,
        isNegotiated: bookingState.selectedBidPrice !== null, // Flag indicating if price was negotiated
      };

      // For demo purposes, simulate an API call instead of actually calling the backend
      // Comment this block and uncomment the axios call for production
      setTimeout(() => {
        const mockResponse = {
          id: 'ORDER-' + Math.floor(Math.random() * 1000000),
        };
        setBookingState({
          ...bookingState,
          loading: false,
          success: true,
          orderId: mockResponse.id,
        });

        // Navigate to confirmation page
        navigate(`/booking/confirmation/${mockResponse.id}`);
      }, 1500);

      // Uncomment for production
      /*
      // Send the order to the API
      const response = await axios.post('/api/orders', orderData);
      
      // Handle successful booking
      setBookingState({
        ...bookingState,
        loading: false,
        success: true,
        orderId: response.data.id
      });
      
      // Navigate to confirmation page
      navigate(`/booking/confirmation/${response.data.id}`);
      */
    } catch (error) {
      console.error('Booking error:', error);
      setBookingState({
        ...bookingState,
        loading: false,
        error:
          error.response?.data?.message ||
          error.message ||
          'Failed to create your booking. Please try again.',
      });
    }
  };

  // Render different steps based on the current step
  const renderStep = () => {
    switch (bookingState.step) {
      case 1:
        return renderServicesStep();
      case 2:
        return renderDateTimeStep();
      case 3:
        return renderAddressStep();
      case 4:
        return renderBiddingStep();
      case 5:
        return renderPaymentStep();
      default:
        return renderServicesStep();
    }
  };

  // Step 1: Service Selection
  const renderServicesStep = () => (
    <div className="rounded-lg p-6 bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-6">Selected Services</h2>

      {ordersList.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No services selected yet.</p>
          <button
            onClick={() => navigate('/services')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Browse Services
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {ordersList.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{service.title}</h3>
                    <p className="text-gray-500 text-sm">{service.subtitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    Rs. {service.price} × {service.quantity}
                  </p>
                  <p className="text-gray-600">
                    Rs. {service.price * service.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center border-t pt-4">
            <div>
              <p className="text-gray-600">Total Services: {totalServices}</p>
              <p className="text-xl font-bold">Total: Rs. {totalAmount}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/services')}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Add More
              </button>
              <button
                onClick={handleNextStep}
                disabled={!validateCurrentStep()}
                className={`px-6 py-2 rounded-md ${
                  validateCurrentStep()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  // Step 2: Date and Time Selection
  const renderDateTimeStep = () => {
    // Generate the next 7 days
    const generateDates = () => {
      const dates = [];
      const today = new Date();
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push({
          day: date.toLocaleString('en-US', { weekday: 'short' }),
          date: date.getDate(),
          month: date.toLocaleString('en-US', { month: 'short' }),
          fullDate: date.toISOString().split('T')[0],
        });
      }
      return dates;
    };

    // Generate time slots
    const generateTimeSlots = () => {
      const slots = [];
      const startHour = 9; // 9 AM
      const endHour = 19; // 7 PM

      for (let hour = startHour; hour < endHour; hour++) {
        slots.push(`${hour}:00 - ${hour + 1}:00`);
      }

      return slots;
    };

    const dates = generateDates();
    const timeSlots = generateTimeSlots();

    return (
      <div className="rounded-lg p-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-6">Select Date and Time</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Available Dates</h3>
          <div className="grid grid-cols-7 gap-2">
            {dates.map((item) => (
              <button
                key={item.fullDate}
                onClick={() => handleDateSelect(item.fullDate)}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                  bookingState.selectedDate === item.fullDate
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <span className="text-xs font-medium">{item.day}</span>
                <span className="text-xl font-bold">{item.date}</span>
                <span className="text-xs">{item.month}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Available Time Slots</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => handleTimeSelect(slot)}
                className={`p-3 rounded-lg border text-center ${
                  bookingState.selectedTime === slot
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t">
          <button
            onClick={handlePreviousStep}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Back
          </button>
          <button
            onClick={handleNextStep}
            disabled={!validateCurrentStep()}
            className={`px-6 py-2 rounded-md ${
              validateCurrentStep()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    );
  };

  // Step 3: Address Information
  const renderAddressStep = () => (
    <div className="rounded-lg p-6 bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-6">Your Address</h2>

      <div className="space-y-4 mb-6">
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            City
          </label>
          <select
            id="city"
            name="city"
            value={bookingState.city}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a city</option>
            <option value="Lahore">Lahore</option>
            <option value="Karachi">Karachi</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
            <option value="Faisalabad">Faisalabad</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="area"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Area
          </label>
          <select
            id="area"
            name="area"
            value={bookingState.area}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select an area</option>
            <option value="DHA">DHA</option>
            <option value="Gulberg">Gulberg</option>
            <option value="Johar Town">Johar Town</option>
            <option value="Model Town">Model Town</option>
            <option value="Bahria Town">Bahria Town</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Complete Address
          </label>
          <textarea
            id="address"
            name="address"
            value={bookingState.address}
            onChange={handleInputChange}
            placeholder="House number, street name, landmarks, etc."
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t">
        <button
          onClick={handlePreviousStep}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Back
        </button>
        <button
          onClick={handleNextStep}
          disabled={!validateCurrentStep()}
          className={`px-6 py-2 rounded-md ${
            validateCurrentStep()
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );

  // Step 4: Bidding and Service Provider Selection
  const renderBiddingStep = () => (
    <ServiceBidding
      serviceDetails={ordersList}
      scheduledDate={bookingState.selectedDate}
      scheduledTime={bookingState.selectedTime}
      address={`${bookingState.address}, ${bookingState.area}, ${bookingState.city}`}
      onSelectProvider={handleProviderSelect}
      onBack={handlePreviousStep}
    />
  );

  // Step 5: Payment Method & Final Review
  const renderPaymentStep = () => {
    // Calculate order details for display
    const serviceSummary = ordersList.map((service) => ({
      ...service,
      total: service.price * service.quantity,
    }));

    const paymentMethods = [
      { id: 'cash', name: 'Cash on Delivery', icon: '💵' },
      { id: 'bank_transfer', name: 'Bank Transfer', icon: '🏦' },
      { id: 'credit_card', name: 'Credit/Debit Card', icon: '💳' },
    ];

    return (
      <div className="rounded-lg p-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-6">Review & Confirm</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="space-y-3 mb-4">
                {serviceSummary.map((service) => (
                  <div key={service.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">
                        {service.title} × {service.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        {service.subtitle}
                      </p>
                    </div>
                    <p className="font-semibold">Rs. {service.total}</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 font-bold flex justify-between">
                <span>Total Amount</span>
                <span>Rs. {totalAmount}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Booking Details</h3>
            <div className="border rounded-lg p-4 bg-gray-50 space-y-3">
              <div>
                <p className="text-gray-600 text-sm">Date and Time</p>
                <p className="font-medium">
                  {bookingState.selectedDate} | {bookingState.selectedTime}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Address</p>
                <p className="font-medium">
                  {bookingState.address}, {bookingState.area},{' '}
                  {bookingState.city}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Service Provider</p>
                <p className="font-medium">
                  ID: {bookingState.serviceProviderId}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Payment Method</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => handlePaymentMethodSelect(method.id)}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  bookingState.paymentMethod === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{method.icon}</span>
                  <span>{method.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {bookingState.error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
            {bookingState.error}
          </div>
        )}

        <div className="flex justify-between pt-4 border-t">
          <button
            onClick={handlePreviousStep}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Back
          </button>
          <button
            onClick={handleSubmitBooking}
            disabled={bookingState.loading}
            className={`px-6 py-2 rounded-md ${
              bookingState.loading
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {bookingState.loading ? 'Processing...' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">Book a Service</h1>
          <p className="text-gray-600">
            Follow the steps to complete your booking
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="w-full">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4, 5].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`flex items-center ${
                    stepNumber !== 5 ? 'flex-1' : ''
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                      bookingState.step === stepNumber
                        ? 'bg-blue-600 text-white'
                        : bookingState.step > stepNumber
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {bookingState.step > stepNumber ? (
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      stepNumber
                    )}
                  </div>
                  {stepNumber !== 5 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        bookingState.step > stepNumber
                          ? 'bg-green-500'
                          : 'bg-gray-200'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs">
              <div className="text-center w-1/5">Services</div>
              <div className="text-center w-1/5">Schedule</div>
              <div className="text-center w-1/5">Address</div>
              <div className="text-center w-1/5">Bidding</div>
              <div className="text-center w-1/5">Payment</div>
            </div>
          </div>
        </div>
      </div>

      {renderStep()}

      {bookingState.loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-center mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
            <p className="text-center text-gray-600">
              Processing your booking...
            </p>
          </div>
        </div>
      )}

      {bookingState.error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-center mb-4 text-red-500">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-center mb-2">Error</h2>
            <p className="text-center text-gray-600 mb-4">
              {bookingState.error}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() =>
                  setBookingState({ ...bookingState, error: null })
                }
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingForm;
