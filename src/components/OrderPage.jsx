// import DateTimeSelector from "./DateTimeSelector";
// import InformationForm from "./InformationForm";
// import ServiceItems from "./ServiceItems";
// import OrderSummary from "./OrderSummary";
import ItemImg from "../images/ItemImg.png";
import ServiceProviderIcon from "../images/ServiceProviderIcon.png";

import { useEffect, useState } from "react";

function OrderPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  console.log(selectedDate);

  useEffect(() => {
    const generateTimeSlots = () => {
      const slots = [];
      const today = new Date();
      console.log(today.getDate());

      // Adjust the timezone (if needed, as per your example)
      for (let i = 0; i < 10; i++) {
        const newTime = new Date(today.getTime() + i * 30 * 60 * 1000); // Add 30 minutes
        const timeInPST = newTime.toLocaleString("en-US", {
          timeZone: "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        slots.push(timeInPST);
      }

      setTimeSlots(slots);
    };

    generateTimeSlots();
  }, []);

  // Generate the next 10 days (including today)
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    // console.log(today);
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        day: date.toLocaleString("en-US", { weekday: "short" }), // e.g., 'Sat'
        date: date.getDate(), // e.g., 4
      });
    }
    return dates;
  };

  const dates = generateDates();

  return (
    <>
      <div className="flex flex-col">
        <div className="cursor-pointer absolute top-0 right-0 text-gray-500 hover:text-red-500 w-[62px] h-[54px] sm:w-[68px] sm:h-[58px] md:w-[72px] md:h-[62px] lg:w-[76px] lg:h-[68px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="76"
            height="68"
            viewBox="0 0 76 68"
            fill="none"
          >
            <path d="M0 0H76V68H0V0Z" fill="black" />
            <path
              d="M48.5667 42.2142L37.9667 34.2485L27.3667 42.2142L25 40.4385L35.6167 32.4853L25 24.5321L27.3667 22.7563L37.9667 30.7221L48.5667 22.7689L50.9167 24.5321L40.3167 32.4853L50.9167 40.4385L48.5667 42.2142Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="relative mt-[55px] container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="col-span-2">
            {/* <DateTimeSelector /> */}
            <div className="rounded-lg">
              <h2 className="mb-[24px] text-black font-poppins text-[18px] sm:text-[20px] md:text-[22px]  lg:text-[25px] font-bold leading-normal tracking-[-0.25px]">
                Select Date and Time
              </h2>
              <div className="mb-[25px] grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-[4px] sm:gap-[5px] md:gap-[6px] lg:gap-[8px]  border p-4">
                {dates.map((item, index) => (
                  <button
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)} // Set hovered index on mouse enter
                    onMouseLeave={() => setHoveredIndex(null)} // Reset on mouse leave
                    className={`flex flex-col items-center justify-center p-2 ${
                      hoveredIndex === index
                        ? "bg-[#5900FF] text-[white]" // Background blue and text white when hovered
                        : "bg-white text-black hover:bg-gray-200" // Default and hover fallback styles
                    }`}
                  >
                    <span className="font-bold text-lg">{item.date}</span>
                    <span className="text-sm">{item.day}</span>
                  </button>
                ))}
              </div>
              <div className="mb-[38px]">
                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-[4px] sm:gap-[5px] md:gap-[6px] lg:gap-[8px] border p-4">
                  {timeSlots.map((slot, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center p-2 bg-gray-100 rounded hover:bg-[#5900FF] hover:text-[white] cursor-pointer" // Default and hover fallback styles
                    >
                      {/* Display the formatted time */}
                      <span className="font-bold text-lg">
                        {slot.split(" ")[0]}
                      </span>
                      <span className="text-sm">{slot.split(" ")[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* <ServiceItems /> */}
            <div className="rounded-lg">
              <h2 className="text-black font-wixmadefor text-[26px] font-semibold leading-normal tracking-[-0.26px]">
                Items:
              </h2>
              <div className="border px-[16px] pb-[82px]">
                <h1 className="mb-[40px] text-black font-wixmadefor text-[26px] font-semibold leading-normal tracking-[-0.26px]">
                  Plumber:
                </h1>
                <div className="flex flex-col gap-[22px]">
                  <div className="flex gap-[28px] w-[423px] pt-[23px] pb-[44px] pl-[20px]  border border-[#8B8B8B] rounded-[30px]">
                    <img src={ItemImg} alt="" />
                    <div>
                      <h2 className="text-black font-wixmadefor text-[21px] font-semibold leading-[26px] tracking-[-0.21px]">
                        Mixer Tap Installation
                      </h2>
                      <h2 className="text-[#AAA0A0] font-wixmadefor text-[21px] font-semibold leading-[26px] tracking-[-0.21px]">
                        --Per piece
                      </h2>
                      <p className="text-black text-[15px] font-normal leading-normal">
                        Rs: 300
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-[30px]">
                    <div className="flex flex-col">
                      <div
                        style={{ fontFamily: "Segoe UI" }}
                        className="cursor-pointer bg-[#FA0C57] py-3 pl-[24px] pr-[10px] rounded-[100px] flex items-center gap-[20px]"
                      >
                        <button className="text-[#fff] text-[24px] font-normal leading-normal">
                          Emergency
                        </button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="42"
                          height="42"
                          viewBox="0 0 42 42"
                          fill="none"
                        >
                          <circle cx="21" cy="21" r="21" fill="white" />
                        </svg>
                      </div>
                      <h1 className="text-center text-[#AAA0A0] font-wixmadefor text-[17px] font-semibold leading-[26px] tracking-[-0.17px]">
                        20% increase in total cost <br />
                        within 1hr service
                      </h1>
                    </div>

                    <div style={{ fontFamily: "Segoe UI" }}>
                      <button className="bg-[#1EE100] py-[13px] px-[30px] rounded-[7px] text-[#fff] text-[24px] font-normal leading-normal">
                        Search Provider
                      </button>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[19px] items-center justify-center bg-[#D8D8D8] px-[12px] py-[45px]">
                    <div
                      className="flex gap-[18px] px-[18px] py-[23px] rounded-[15px]"
                      style={{
                        background:
                          "linear-gradient(180deg, #F9F9F9 0%, #808580 77.5%)",
                      }}
                    >
                      <img
                        src={ServiceProviderIcon}
                        alt=""
                        className="w-[25px] h-[30px] sm:w-[40px] sm:h-[40px] md:w-[46px] md:h-[45px] lg:w-[54px] lg:h-[51px]"
                      />
                      <div className="flex flex-col gap-[15px]">
                        <div className="text-[#000] font-wixmadefor text-[5px] sm:text-[7px] md:text-[9px] lg:text-[11px] xl:text-[13px]  font-semibold leading-normal">
                          <h2>Mohsin Javed</h2>
                          <h2>Designation: Electrician</h2>
                          <h2>Orders: 350 Completed</h2>
                          <h2>Contact: 03091948615</h2>
                          <h2>Experience: 2 years</h2>
                        </div>

                        <button
                          style={{
                            background:
                              "linear-gradient(90deg, #A7A7A7 0%, #FFEFEF 100%)",
                          }}
                          className="py-[5px] pl-[37px] sm:pl-[47px] md:pl-[57px] lg:pl-[67px] pr-[16px] rounded-[11px]"
                        >
                          800...
                        </button>
                      </div>
                    </div>
                    <div
                      className="flex gap-[18px] px-[18px] py-[23px] rounded-[15px]"
                      style={{
                        background:
                          "linear-gradient(180deg, #F9F9F9 0%, #808580 77.5%)",
                      }}
                    >
                      <img
                        src={ServiceProviderIcon}
                        alt=""
                        className="w-[25px] h-[30px] sm:w-[40px] sm:h-[40px] md:w-[46px] md:h-[45px] lg:w-[54px] lg:h-[51px]"
                      />
                      <div className="flex flex-col gap-[15px]">
                        <div className="text-[#000] font-wixmadefor text-[5px] sm:text-[7px] md:text-[9px] lg:text-[11px] xl:text-[13px] font-semibold leading-normal">
                          <h2>Mohsin Javed</h2>
                          <h2>Designation: Electrician</h2>
                          <h2>Orders: 350 Completed</h2>
                          <h2>Contact: 03091948615</h2>
                          <h2>Experience: 2 years</h2>
                        </div>

                        <button
                          style={{
                            background:
                              "linear-gradient(90deg, #A7A7A7 0%, #FFEFEF 100%)",
                          }}
                          className="py-[5px] pl-[37px] sm:pl-[47px] md:pl-[57px] lg:pl-[67px] pr-[16px] rounded-[11px]"
                        >
                          800...
                        </button>
                      </div>
                    </div>
                    <div
                      className="flex gap-[18px] px-[18px] py-[23px] rounded-[15px]"
                      style={{
                        background:
                          "linear-gradient(180deg, #F9F9F9 0%, #808580 77.5%)",
                      }}
                    >
                      <img
                        src={ServiceProviderIcon}
                        alt=""
                        className="w-[25px] h-[30px] sm:w-[40px] sm:h-[40px] md:w-[46px] md:h-[45px] lg:w-[54px] lg:h-[51px]"
                      />
                      <div className="flex flex-col gap-[15px]">
                        <div className="text-[#000] font-wixmadefor text-[5px] sm:text-[7px] md:text-[9px] lg:text-[11px] xl:text-[13px] font-semibold leading-normal">
                          <h2>Mohsin Javed</h2>
                          <h2>Designation: Electrician</h2>
                          <h2>Orders: 350 Completed</h2>
                          <h2>Contact: 03091948615</h2>
                          <h2>Experience: 2 years</h2>
                        </div>

                        <button
                          style={{
                            background:
                              "linear-gradient(90deg, #A7A7A7 0%, #FFEFEF 100%)",
                          }}
                          className="py-[5px] pl-[37px] sm:pl-[47px] md:pl-[57px] lg:pl-[67px] pr-[16px] rounded-[11px]"
                        >
                          800...
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="font-wixmadefor text-[8px] sm:text-[10px] md:text-[13px] lg:text-[16px] font-semibold leading-normal bg-[#250101] rounded-[5px] text-[white] py-[10px] px-[40px]">
                      Select
                    </button>
                  </div>
                </div>
              </div>
              {/* <InformationForm /> */}
            </div>
            <div className="mt-[35px]">
              <h2 className="text-[#000] font-wixmadefor text-[25px] font-semibold leading-normal">
                Information
              </h2>
              <div className="flex flex-col space-y-4">
                {/* City Selection */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[#000] font-wixmadefor text-[18px] font-semibold leading-normal">
                    Please Select City:
                  </label>
                  <select className="w-[480px] p-2 border rounded">
                    <option value="">Select City</option>
                    <option value="lahore">Lahore</option>
                    <option value="karachi">Karachi</option>
                  </select>
                </div>

                {/* Area Selection */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[#000] font-wixmadefor text-[18px] font-semibold leading-normal">
                    Please Select Area:
                  </label>
                  <select className="w-[480px] p-2 border rounded">
                    <option value="">Select Area</option>
                    <option value="area1">Area 1</option>
                    <option value="area2">Area 2</option>
                  </select>
                </div>

                {/* Address Input */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[#000] font-wixmadefor text-[18px] font-semibold leading-normal">
                    Please Type Your Address:
                  </label>
                  <input
                    type="text"
                    placeholder="House Number XXX C"
                    className="w-[480px] p-2 border rounded"
                  />
                </div>
              </div>
            </div>

            <div
              style={{ fontFamily: "Segoe UI" }}
              className="grid justify-items-end   mt-[50px]"
            >
              <button className="bg-[#2FA700] py-[25px] px-[35px] rounded-[7px] text-[#fff] text-[21px] font-semibold leading-normal">
                Comfirm Booking
              </button>
            </div>

            {/* <OrderSummary /> */}
          </div>
          <div className="flex flex-col gap-[28px]">
            <div className="bg-[#ECECEC] mt-[55px] px-[30px] pt-[30px] pb-[63px] rounded-[13px]">
              <h2 className="text-[#000] font-poppins text-[20px] font-semibold leading-normal tracking-[-0.2px]">
                Delivering To
              </h2>
              <p className="text-[#000] font-poppins text-[20px] font-normal leading-normal tracking-[-0.2px]">
                Punjab University Employees Housing Society Town 2, House Number
                XXX
              </p>
            </div>
            <div className="bg-[#ECECEC] px-[30px] pt-[30px] pb-[63px] rounded-[13px]">
              <h2 className="text-[#000] font-poppins text-[20px] font-semibold leading-normal tracking-[-0.2px]">
                Delivering To
              </h2>
              <p className="text-[#000] font-poppins text-[20px] font-normal leading-normal tracking-[-0.2px]">
                Punjab University Employees Housing Society Town 2, House Number
                XXX
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderPage;
