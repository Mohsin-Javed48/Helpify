/** @format */

import Slider from 'react-slick';
import { useRef, useState } from 'react';
import FounderIcon from '/Ellipse 15.png';

const testimonials = [
<<<<<<< HEAD:client/src/components/shared/Carousel.jsx
  {
    name: 'Zohaib',
    role: 'Founder and co-CEO',
    review:
      'A great little app that some of the big guns have clearly been taking their cue from. Looks like Income might actually be cleaner and simpler to use than competitors.',
    rating: 5,
  },
  {
    name: 'Fakhra Rabbani',
    role: 'Founder and co-CEO',
    review:
      'A great little app that some of the big guns have clearly been taking their cue from. Looks like Income might actually be cleaner and simpler to use than competitors.',
    rating: 5,
  },
  {
    name: 'Zaina',
    role: 'Founder and co-CEO',
    review:
      'A great little app that some of the big guns have clearly been taking their cue from. Looks like Income might actually be cleaner and simpler to use than competitors.',
    rating: 5,
  },
  {
    name: 'Mohsin',
    role: 'Founder and co-CEO',
    review:
      'A great little app that some of the big guns have clearly been taking their cue from. Looks like Income might actually be cleaner and simpler to use than competitors.',
    rating: 5,
  },
=======
  { name: "Zohaib", role: "Founder and co-CEO", review: "Great app! Cleaner and simpler than competitors.", rating: 5 },
  { name: "Fakhra Rabbani", role: "Founder and co-CEO", review: "Great app! Cleaner and simpler than competitors.", rating: 5 },
  { name: "Zaina", role: "Founder and co-CEO", review: "Great app! Cleaner and simpler than competitors.", rating: 5 },
  { name: "Mohsin", role: "Founder and co-CEO", review: "Great app! Cleaner and simpler than competitors.", rating: 5 },
>>>>>>> 68b87cd7a2b9e90fdd84117f5c21c22591e7be05:client/src/components/shared/Carousell.jsx
];

const Carousel = () => {
  const sliderRef = useRef(null);
<<<<<<< HEAD:client/src/components/shared/Carousel.jsx
  const [activeButton, setActiveButton] = useState(''); // State to track active button

=======
  const [activeButton, setActiveButton] = useState("");
>>>>>>> 68b87cd7a2b9e90fdd84117f5c21c22591e7be05:client/src/components/shared/Carousell.jsx
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="flex flex-col gap-10 bg-[#F4F4F4] py-20 px-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-[#141414]">Valuable Words From Customers</h2>
        <div className="flex gap-4">
<<<<<<< HEAD:client/src/components/shared/Carousel.jsx
          {/* Prev Button */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="59"
            height="60"
            viewBox="0 0 59 60"
            fill="none"
            onClick={() => {
              sliderRef.current.slickPrev();
              setActiveButton('prev');
            }}
            className={`w-[29px] sm:w-[39px] md:w-[49px] lg:w-[59px] h-[29px] sm:h-[39px] md:h-[49px] lg:h-[59px] cursor-pointer ${
              activeButton === 'prev' ? 'opacity-100' : 'opacity-40'
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
              setActiveButton('next');
            }}
            className={`w-[29px] sm:w-[39px] md:w-[49px] lg:w-[59px] h-[29px] sm:h-[39px] md:h-[49px] lg:h-[59px] cursor-pointer ${
              activeButton === 'next' ? 'opacity-100' : 'opacity-40'
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
=======
          {["prev", "next"].map((dir) => (
            <svg
              key={dir}
              width="59"
              height="60"
              viewBox="0 0 59 60"
              fill="none"
              onClick={() => {
                dir === "prev" ? sliderRef.current.slickPrev() : sliderRef.current.slickNext();
                setActiveButton(dir);
              }}
              className={`w-12 h-12 cursor-pointer ${activeButton === dir ? "opacity-100" : "opacity-40"}`}
            >
              <circle cx="29.5" cy="30" r="29.5" fill="#2937B1" />
              <path d={`M${dir === "prev" ? "16.5 30H42.5M16.5 30L27.5 19M16.5 30L27.5 41" : "42.5 30H16.5M42.5 30L31.5 19M42.5 30L31.5 41"}`} stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ))}
>>>>>>> 68b87cd7a2b9e90fdd84117f5c21c22591e7be05:client/src/components/shared/Carousell.jsx
        </div>
      </div>
      <Slider ref={sliderRef} {...settings}>
        {testimonials.map(({ name, role, review, rating }, index) => (
          <div key={index} className="p-4">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4">
              <div className="flex gap-1">{Array(rating).fill(0).map((_, i) => <span key={i} className="text-yellow-400">★</span>)}</div>
              <p className="text-sm text-[#141414]">{review}</p>
              <div className="flex gap-4 items-center">
                <img src={FounderIcon} alt="Founder" className="w-10 h-10" />
                <div>
                  <h3 className="font-semibold text-sm text-[#141414]">{name}</h3>
                  <p className="text-xs text-gray-500">{role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
