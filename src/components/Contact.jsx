/** @format */

import FormImg from "/Image (1).png";
import ProfileImg from "/Profile.png";
import EmailImg from "/Message.png";
import CallImg from "/FormCall.png";
import MessageImg from "/FormMessage.png";

import BookButton from "../ui/BookButton";
const MsgButton = BookButton;

function Contact() {
  return (
    <div className="bg-[#F4F4F4]">
      {/* Lower Contact Form Section */}

      <div className="pt-[120px] pb-[29.5px] px-[70px] sm:px-[100px] md:px-[110px] lg:px-[240px]">
        <h2 className="not-italic text-[20px] sm:text-[30px] md:text-[40px] lg:text-[48px] font-bold text-[#141414] leading-normal tracking-[-0.48px] capitalize text-center mb-8">
          Your Complains
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-[20px] not-italic font-normal leading-[26px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Full name"
              className="placeholder:text-[10px]  sm:placeholder:text-[12px] md:placeholder:text-[14px]  lg:placeholder:text-[16px] w-full py-[18px] px-[24px] border border-[rgba(20,20,20,0.40)] rounded-[8px] text-[#141414] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <img
              src={ProfileImg}
              alt="Profile Icon"
              className="absolute right-[20px] top-1/2 transform -translate-y-1/2 w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px] lg:w-[20px] lg:h-[20px]"
            />
          </div>
          <div className="relative">
            <input
              type="email"
              placeholder="Email address"
              className="placeholder:text-[10px]  sm:placeholder:text-[12px] md:placeholder:text-[14px]  lg:placeholder:text-[16px] w-full py-[18px] px-[24px] border border-[rgba(20,20,20,0.40)] rounded-[8px] text-[#141414] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <img
              src={EmailImg}
              alt="Email Icon"
              className="absolute right-[20px] top-1/2 transform -translate-y-1/2 w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px] lg:w-[20px] lg:h-[20px]"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Phone number"
              className="placeholder:text-[10px]  sm:placeholder:text-[12px] md:placeholder:text-[14px]  lg:placeholder:text-[16px] w-full py-[18px] px-[24px] border border-[rgba(20,20,20,0.40)] rounded-[8px] text-[#141414] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <img
              src={CallImg}
              alt="Call Icon"
              className="absolute right-[20px] top-1/2 transform -translate-y-1/2 w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px] lg:w-[20px] lg:h-[20px]"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Subject"
              className="placeholder:text-[10px]  sm:placeholder:text-[12px] md:placeholder:text-[14px]  lg:placeholder:text-[16px] w-full py-[18px] px-[24px] border border-[rgba(20,20,20,0.40)] rounded-[8px] text-[#141414] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <img
              src={MessageImg}
              alt="Message Icon"
              className="absolute right-[20px] top-1/2 transform -translate-y-1/2 w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px] lg:w-[20px] lg:h-[20px]"
            />
          </div>
          <textarea
            placeholder="Write your message"
            className="placeholder:text-[10px]  sm:placeholder:text-[12px] md:placeholder:text-[14px]  lg:placeholder:text-[16px] w-full col-span-1 md:col-span-2 p-4 border border-[rgba(20,20,20,0.40)] rounded-[8px] text-[#141414] focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="6"
          ></textarea>
        </form>

        <div className="text-center mt-[44px]">
          <MsgButton
            text="Sent Message"
            onClick={() => console.log("Primary button clicked!")}
            variant="primary"
          />
        </div>
      </div>

      {/* Lower Contact Form Section */}

      <div className="mx-auto flex flex-col lg:flex-row items-center">
        <div className="">
          <img
            src={FormImg}
            alt="Worker Image"
            className="h-[834px] rounded-lg shadow-md"
          />
        </div>

        <div className="pl-[30px] pr-[135px] py-[100px] sm:py-[120px] md:py-[140px] lg:py-[160px]">
          <h3 className="mb-[60px] text-[#141414] text-[20px] sm:text-[30px] md:text-[40px] lg:text-[48px] not-italic font-bold leading-normal capitalize tracking-[-0.48]">
            Contact Form
          </h3>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
            <input
              type="text"
              placeholder="Name"
              className="bg-[#F4F4F4] placeholder:text-[10px] w-[160%] md:w-full  sm:placeholder:text-[12px] md:placeholder:text-[14px]  lg:placeholder:text-[16px] py-[14px] px-[16px] border border-[rgba(20,20,20,0.40)] rounded-[8px] text-[#141414] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email address"
              className="bg-[#F4F4F4] placeholder:text-[10px] w-[160%] md:w-full sm:placeholder:text-[12px] md:placeholder:text-[14px]  lg:placeholder:text-[16px] py-[14px] px-[16px] border border-[rgba(20,20,20,0.40)] rounded-[8px] text-[#141414] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Phone"
              className="bg-[#F4F4F4] placeholder:text-[10px] w-[160%] md:w-full sm:placeholder:text-[12px] md:placeholder:text-[14px]  lg:placeholder:text-[16px] py-[14px] px-[16px] border border-[rgba(20,20,20,0.40)] rounded-[8px] text-[#141414] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Subject"
              className="bg-[#F4F4F4] placeholder:text-[10px] w-[160%] md:w-full sm:placeholder:text-[12px] md:placeholder:text-[14px]  lg:placeholder:text-[16px] py-[14px] px-[16px] border border-[rgba(20,20,20,0.40)] rounded-[8px] text-[#141414] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Message"
              className="bg-[#F4F4F4] placeholder:text-[10px] w-[160%] md:w-full sm:placeholder:text-[12px] md:placeholder:text-[14px]  lg:placeholder:text-[16px] col-span-1 md:col-span-2 p-4 border border-[rgba(20,20,20,0.40)] rounded-[8px] text-[#141414] focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
            <button className="bg-[#091054] text-[#ffff] col-span-1 md:col-span-2 text-center font-medium not-italic mt-6 text-[12px] sm:text-[15px] md:text-[18px] lg:text-[24px] px-[25px] py-[10px] sm:px-[40px] sm:py-[15px] md:px-[50px] md:py-[18px] lg:px-[60px] lg:py-[22px]  leading-[26px] tracking-[-0.15px] rounded-md shadow-md transition duration-200">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
