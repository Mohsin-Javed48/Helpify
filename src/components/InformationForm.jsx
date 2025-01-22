function InformationForm() {
  return (
    <>
      <div className="p-4 border rounded-lg">
        <h2 className="font-bold text-lg mb-2">Information</h2>
        <div className="space-y-4">
          <select className="w-full p-2 border rounded">
            <option>Please Select City</option>
            <option>Lahore</option>
            <option>Karachi</option>
          </select>
          <select className="w-full p-2 border rounded">
            <option>Please Select Area</option>
            <option>Area 1</option>
            <option>Area 2</option>
          </select>
          <input
            type="text"
            placeholder="Please Type Your Address"
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </>
  );
}

export default InformationForm;
