/** @format */

import Slider from "react-slick";
import { useRef, useState } from "react";
import FounderIcon from "/Ellipse 15.png";

const testimonials = [
  {
    name: "Zohaib",
    role: "Founder and co-CEO",
    review:
      "A great little app that some of the big guns have clearly been taking their cue from. Looks like Income might actually be cleaner and simpler to use than competitors.",
    rating: 5,
  },
  {
    name: "Fakhra Rabbani",
    role: "Founder and co-CEO",
    review:
      "A great little app that some of the big guns have clearly been taking their cue from. Looks like Income might actually be cleaner and simpler to use than competitors.",
    rating: 5,
  },
  {
    name: "Zaina",
    role: "Founder and co-CEO",
    review:
      "A great little app that some of the big guns have clearly been taking their cue from. Looks like Income might actually be cleaner and simpler to use than competitors.",
    rating: 5,
  },
  {
    name: "Mohsin",
    role: "Founder and co-CEO",
    review:
      "A great little app that some of the big guns have clearly been taking their cue from. Looks like Income might actually be cleaner and simpler to use than competitors.",
    rating: 5,
  },
];

const Carousell = () => {
  const sliderRef = useRef(null);
  const [activeButton, setActiveButton] = useState(""); // State to track active button

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col gap-[28px] sm:gap-[48px] md:gap-[58px] lg:gap-[68px] bg-[#F4F4F4] py-[60px] sm:py-[80px] md:py-[100px] lg:py-[120px] px-[60px] sm:px-[80px] md:px-[100px] lg:px-[110px] xl:px-[110px]">
      {/* Header Section with Title and Arrows */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="not-italic text-[#141414] font-bold text-[18px] sm:text-[28px] md:text-[38px] lg:text-[42px] xl:text-[48px] leading-normal tracking-[-0.48] capitalize">
          Valuable Words From Customers
        </h2>
        <div className="flex gap-4">
          {/* Prev Button */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="59"
            height="60"
            viewBox="0 0 59 60"
            fill="none"
            onClick={() => {
              sliderRef.current.slickPrev();
              setActiveButton("prev");
            }}
            className={`w-[29px] sm:w-[39px] md:w-[49px] lg:w-[59px] h-[29px] sm:h-[39px] md:h-[49px] lg:h-[59px] cursor-pointer ${
              activeButton === "prev" ? "opacity-100" : "opacity-40"
            }`}
          >
            <g>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 30C0 13.7076 13.2076 0.5 29.5 0.5C45.7924 0.5 59 13.7076 59 30C59 46.2924 45.7924 59.5 29.5 59.5C13.2076 59.5 0 46.2924 0 30Z"
                fill="#2937B1"
              />
              <path
                d="M16.5 30H42.5M16.5 30L27.5 19M16.5 30L27.5 41"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          {/* Next Button */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="59"
            height="60"
            viewBox="0 0 59 60"
            fill="none"
            onClick={() => {
              sliderRef.current.slickNext();
              setActiveButton("next");
            }}
            className={`w-[29px] sm:w-[39px] md:w-[49px] lg:w-[59px] h-[29px] sm:h-[39px] md:h-[49px] lg:h-[59px] cursor-pointer ${
              activeButton === "next" ? "opacity-100" : "opacity-40"
            }`}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M59 30C59 13.7076 45.7924 0.5 29.5 0.5C13.2076 0.5 0 13.7076 0 30C0 46.2924 13.2076 59.5 29.5 59.5C45.7924 59.5 59 46.2924 59 30Z"
              fill="#2937B1"
            />
            <path
              d="M42.5 30H16.5M42.5 30L31.5 19M42.5 30L31.5 41"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Slider Section */}
      <Slider ref={sliderRef} {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex p-4">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start gap-[15px] sm:gap-[20px] md:gap-[25px] lg:gap-[30px]">
              <div className="flex gap-[2.5px]">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="28"
                    viewBox="0 0 30 28"
                    fill="none"
                    className="w-[10px] sm:w-[15px] md:w-[20px] lg:w-[25px] xl:w-[30px] h-[10px] sm:h-[15px] md:h-[20px] lg:h-[25px] xl:h-[30px]"
                  >
                    <path
                      d="M15 0L19.2497 9.15081L29.2658 10.3647L21.8761 17.2342L23.8168 27.1353L15 22.23L6.18322 27.1353L8.12386 17.2342L0.734152 10.3647L10.7503 9.15081L15 0Z"
                      fill="#FFC703"
                    />
                  </svg>
                ))}
              </div>
              <p className="not-italic text-[#141414] font-normal text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] leading-[20px] sm:leading-[25px] md:leading-[27px] lg:leading-[30px]">
                {testimonial.review}
              </p>
              <div className="flex gap-[18px]">
                <img
                  src={FounderIcon}
                  alt=""
                  className="w-[40px] md:w-[50px] lg:w-[60px] h-[40px] md:h-[50px] lg:h-[60px]"
                />
                <div className="flex flex-col">
                  <h3 className="not-italic text-[#141414] font-semibold text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] leading-[20px] sm:leading-[30px]">
                    {testimonial.name}
                  </h3>
                  <p className="not-italic text-custom-gray font-normal text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] leading-[16px]  sm:leading-[26px]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousell;
