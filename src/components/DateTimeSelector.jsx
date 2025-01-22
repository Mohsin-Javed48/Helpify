function DateTimeSelector() {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="font-bold text-lg mb-2">Select Date and Time</h2>
      <div className="grid grid-cols-7 gap-2">
        {[4, 5, 6, 7, 8, 9, 10].map((date) => (
          <button
            key={date}
            className="p-2 border rounded hover:bg-blue-500 hover:text-white"
          >
            {date}
          </button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {["12:00 PM", "12:30 PM", "1:00 PM"].map((time) => (
          <button
            key={time}
            className="p-2 border rounded hover:bg-blue-500 hover:text-white"
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DateTimeSelector;
