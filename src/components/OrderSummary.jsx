function OrderSummary() {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="font-bold text-lg mb-2">Order Summary</h2>
      <p>Delivering To: XYZ Address</p>
      <p>Billing: Mixer Tap Installation Rs. 300 x 3</p>
      <p>Total Amount: Rs. 900</p>
      <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">
        Confirm Booking
      </button>
    </div>
  );
}

export default OrderSummary;
