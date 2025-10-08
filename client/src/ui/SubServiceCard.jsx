/** @format */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useOrders } from '../context/OrdersContext';
import geyserMaintenance from '../../public/geyserMaintenance.jpg';

function SubServiceCard({
  id,
  title = 'Default Title',
  subtitle = 'Default Subtitle',
  price = '0',
  image = 'https://via.placeholder.com/100',
  quantity = '1',
}) {
  const { addOrder } = useOrders();
  const [imgError, setImgError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addedFlash, setAddedFlash] = useState(false);

  function addOrderItem() {
    if (isAdding) return;
    setIsAdding(true);
    const newOrder = {
      id,
      title,
      subtitle,
      price: Number(price),
      image: imgError ? geyserMaintenance : image,
      quantity: Number(quantity),
    };
    addOrder(newOrder);
    setAddedFlash(true);
    setTimeout(() => {
      setAddedFlash(false);
      setIsAdding(false);
    }, 700);
  }
  console.log('image', image);

  return (
    <div className="w-full sm:max-w-[360px] h-auto bg-[#FFF] rounded-[30px] flex-shrink-0 flex flex-wrap sm:flex-nowrap items-center p-4 sm:p-6 gap-4">
      <div
        className="w-[100px] sm:w-[117px] h-[100px] sm:h-[117px] flex-shrink-0 bg-lightgray bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <img src={image} alt={title} className="hidden" />
      </div>

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

        <button
          type="button"
          onClick={addOrderItem}
          disabled={isAdding}
          className={`group relative overflow-hidden flex items-center justify-center sm:justify-start w-[120px] h-[41px] border border-black rounded-sm mx-auto sm:mx-0 cursor-pointer transition-transform duration-150 active:scale-95 ${isAdding ? 'opacity-80' : ''}`}
          aria-label="Add service"
        >
          <div
            className={`flex-1 flex items-center justify-center font-[Wix Madefor Display] text-[18px] sm:text-[20px] font-semibold transition-colors ${addedFlash ? 'text-green-700' : 'text-[#000]'}`}
          >
            {addedFlash ? 'ADDED' : 'ADD'}
          </div>
          <div
            className={`flex items-center justify-center w-[37px] h-[41px] transition-colors ${addedFlash ? 'bg-green-500' : 'bg-[#1400AD]'} group-hover:brightness-110`}
          >
            {addedFlash ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 20 20"
                fill="#FFF"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3-3A1 1 0 016.207 9.793L8.5 12.086l6.793-6.793a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="#FFF"
              >
                <path d="M18.583 10.333H10.833V18.583H7.25V10.333H0V7.75H7.25V0H10.833V7.75H18.583V10.333Z" />
              </svg>
            )}
          </div>
          {/* Ripple effect */}
          <span className="pointer-events-none absolute inset-0 scale-0 group-active:scale-100 rounded-full bg-black/10 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}

// Prop validation using PropTypes
SubServiceCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default SubServiceCard;
