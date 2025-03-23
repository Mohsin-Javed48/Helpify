/** @format */

import crossIcon from '/crossIcon.png';
import moneyBagIcon from '/moneyBagIcon.png';
import SubServiceCard from '../../ui/SubServiceCard';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useOrders } from '../../context/OrdersContext';
import geyserMaintenance from '../../../public/geyserMaintenance.jpg';

function ServicesCard({ services, name }) {
  const navigate = useNavigate();
  const { ordersList } = useOrders();
  const totalQuantity = ordersList.reduce(
    (total, order) => total + order.quantity,
    0
  );
  const totalPrice = ordersList.reduce(
    (total, order) => total + order.price * order.quantity,
    0
  );

  return (
    <>
      <div className="w-full min-h-screen bg-white mx-auto flex flex-col">
        {/* Header */}
        <div className="w-full max-w-[1665px] h-[85px] bg-white flex items-center justify-between flex-shrink-0 border-b border-gray-200">
          {/* Close Button */}
          <button
            className="flex flex-shrink-0 items-center justify-center w-[80px] h-[70px] sm:w-[90px] sm:h-[75px] lg:w-[106px] lg:h-[85px] border border-black bg-[rgba(217,217,217,0.05)]"
            onClick={() => navigate('/')}
          >
            <img
              src={crossIcon}
              alt="Close Page"
              className="w-[25px] h-[20px] sm:w-[35px] sm:h-[25px] lg:w-[39.31px] lg:h-[28.74px]"
            />
          </button>
          {/* Text */}
          <h1
            className="absolute left-1/2 transform -translate-x-1/2 text-[#000] text-center font-[Wix Madefor Display] text-[24px] sm:text-[30px] lg:text-[35px] font-extrabold leading-[26px] tracking-[-0.35px]"
            style={{ width: '293px' }}
          >
            <span className="flex items-center justify-center space-x-1">
              <span>Service:</span>
              <span>{name}</span>
            </span>
          </h1>
        </div>

        {/* Upper Section */}
        <div className="w-full h-auto bg-[#6472F4] flex-shrink-0 flex flex-col items-start justify-center px-8 sm:px-12 md:px-20 lg:px-36 space-y-6 md:space-y-8 py-8">
          <div>
            <div className="text-[#FFF] font-[Wix Madefor Display] sm:text-[30px] md:text-[35px] font-extrabold leading-[26px] tracking-[-0.35px]">
              {name} Services
            </div>
            <div className="text-[#FFF] font-[Wix Madefor Display] sm:text-[18px] md:text-[22px] font-extrabold leading-[26px] tracking-[-0.22px] mt-2">
              From {name} Installs, Repairs, and Upgrades – We Fix it All
            </div>
          </div>

          {/* Orders completed section */}
          <div className="w-[200px] sm:w-[220px] md:w-[246px] h-[60px] sm:h-[70px] md:h-[74px] relative flex items-center justify-center bg-[#FFFCFC]">
            <img
              src={moneyBagIcon}
              alt="Money Bag"
              className="mr-4 w-[20px] sm:w-[24px] md:w-[26px] h-[16px] sm:h-[18px] md:h-[20px]"
            />
            <div>
              <div className="text-[#0051C2] font-[Wix Madefor Display] text-[16px] sm:text-[18px] md:text-[19px] font-extrabold leading-[26px] tracking-[-0.19px]">
                2000
              </div>
              <div className="text-[#9B9696] font-[Wix Madefor Display] text-[12px] sm:text-[13px] font-medium leading-[20px] sm:leading-[22px] md:leading-[26px] tracking-[-0.13px]">
                Orders Completed
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="w-full flex flex-col items-center justify-center mt-10 mb-20 px-4 sm:px-8">
          <div className="max-w-screen-xl h-auto bg-[#EDEDED] rounded-[20px] shadow-lg p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-[#000] font-[Wix Madefor Display] text-[21px] font-semibold leading-[26px] tracking-[-0.21px]">
                {name} Services
              </div>
              <div className="w-full sm:w-[334px] h-[50px] sm:h-[71px] bg-[#FFF] rounded-[32px]">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full h-full bg-transparent text-[#968D8D] pl-[17px] pr-[17px] font-[Wix Madefor Display] text-[16px] sm:text-[17px] font-normal leading-[26px] tracking-[-0.17px] outline-none rounded-[32px]"
                />
              </div>
            </div>

            {/* Plumber Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 h-full w-full">
              {services.map((service, index) => (
                <SubServiceCard
                  key={index}
                  id={service.id}
                  title={service.name}
                  subtitle={service.description}
                  price={service.price}
                  image={geyserMaintenance}
                  quantity={service.quantity}
                />
              ))}
            </div>
          </div>

          {/* Continue Button */}
          {totalQuantity !== 0 ? (
            <div
              className="w-full max-w-screen-xl flex justify-end mt-6 pr-4 sm:pr-8 cursor-pointer  popupAnimate"
              onClick={() => navigate('/order')}
            >
              <div className="flex items-center justify-between w-[250px] sm:w-[334px] h-[65px] bg-[#4184F1] rounded-[4px] p-4">
                <div className="flex items-center justify-center w-[38px] h-[39px] border border-[#FFF] text-[#FFF] font-[Wix Madefor Display] text-[19px] font-semibold leading-[34px]">
                  {totalQuantity}
                </div>
                <div className="text-[#FFF] font-[Wix Madefor Display] text-[19px] font-semibold leading-[34px] mx-2">
                  Rs {totalPrice}
                </div>
                <div
                  className="flex items-center"
                  onClick={() => navigate('/order')}
                >
                  <button
                    className="text-[#FFF] font-[Wix Madefor Display] text-[19px] font-semibold leading-[34px]"
                    onClick={() => navigate('/order')}
                  >
                    continue
                  </button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="11"
                    viewBox="0 0 26 11"
                    fill="#FFF"
                    className="ml-2"
                  >
                    <path d="M14.5469 0.292786L14.897 0.105469C15.1336 -0.0129271 15.4183 0.0112318 15.6283 0.138601L25.7527 5.66708C25.9386 5.78011 26.0413 5.98982 26.0413 6.2082C26.0413 6.42657 25.9386 6.63628 25.7527 6.74931L15.6283 12.2778C15.4183 12.4052 15.1336 12.4294 14.897 12.3109L14.5469 12.1236C14.2175 11.9601 14.0625 11.5535 14.1875 11.2115L16.4827 4.54831L14.1875 7.61149C14.0625 7.26949 14.2175 6.86288 14.5469 6.69939L25.7527 5.66708L14.5469 4.63478Z" />
                  </svg>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

ServicesCard.propTypes = {
  services: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

export default ServicesCard;
