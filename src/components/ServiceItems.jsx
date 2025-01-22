function ServiceItems() {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="font-bold text-lg mb-2">Items: Plumber</h2>
      <div className="flex justify-between items-center">
        <img
          src="https://via.placeholder.com/100"
          alt="Service"
          className="w-16 h-16 rounded"
        />
        <div>
          <h3 className="font-bold">Mixer Tap Installation</h3>
          <p>Price: Rs. 300</p>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Emergency
        </button>
      </div>
    </div>
  );
}

export default ServiceItems;
