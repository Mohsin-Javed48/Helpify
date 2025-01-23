/** @format */

import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../store/ordersSlice";

function SubServiceCard({ id, title, subtitle, price, image, quantity }) {
  const orders = useSelector((state) => state.orders?.ordersList || []);
  const dispatch = useDispatch();

  function addOrderItem() {
    const newOrder = {
      id: id, // Consider using a more reliable ID generation method
      title: title,
      price: price,
      image: image,
      quantity: quantity,
    };
    console.log(newOrder);
    console.log(orders);
    dispatch(addOrder(newOrder));
  }

  return (
    <>
      {/* Service Card */}
      <div className="w-full sm:max-w-[360px] h-auto bg-[#FFF] rounded-[30px] flex-shrink-0 flex flex-wrap sm:flex-nowrap items-center p-4 sm:p-6 gap-4">
        {/* Image Section */}
        <div
          className="w-[100px] sm:w-[117px] h-[100px] sm:h-[117px] flex-shrink-0 bg-lightgray bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>

        {/* Text Section */}
        <div className="flex flex-col flex-grow text-center sm:text-left space-y-2 sm:space-y-1">
          <h3 className="text-[#000] font-[Wix Madefor Display] text-[18px] sm:text-[21px] font-semibold leading-[24px] sm:leading-[26px] tracking-[-0.21px]">
            {title}
          </h3>
          <p className="text-[#AAA0A0] font-[Wix Madefor Display] text-[16px] sm:text-[18px] font-medium leading-[20px] sm:leading-[22px] tracking-[-0.2px]">
            {subtitle}
          </p>
          <p className="text-[#000] font-[Wix Madefor Display] text-[14px] sm:text-[15px] font-normal">
            Rs {price}
          </p>

          {/* Add Button Section */}
          <div className="flex items-center justify-center sm:justify-start w-[120px] h-[41px] border border-black rounded-sm mx-auto sm:mx-0">
            {/* Text Section */}
            <div
              className="flex-1 flex items-center justify-center text-[#000] font-[Wix Madefor Display] text-[18px] sm:text-[20px] font-semibold"
              onClick={addOrderItem}
            >
              ADD
            </div>
            {/* Plus Button */}
            <div className="flex items-center justify-center w-[37px] h-[41px] bg-[#1400AD]">
              {/* Plus Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="#FFF"
              >
                <path d="M18.583 10.333H10.833V18.583H7.25V10.333H0V7.75H7.25V0H10.833V7.75H18.583V10.333Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Prop validation using PropTypes
SubServiceCard.propTypes = {
  title: PropTypes.string.isRequired, // title must be a string and required
  subtitle: PropTypes.string.isRequired, // subtitle must be a string and required
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // price must be a number or string and required
  image: PropTypes.string.isRequired, // image must be a string (URL) and required
};

// Default props in case any prop is not provided
SubServiceCard.defaultProps = {
  title: "Default Title",
  subtitle: "Default Subtitle",
  price: "0",
  image: "https://via.placeholder.com/100", // Placeholder image
};

export default SubServiceCard;
