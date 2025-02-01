import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function AdminSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
  const [isLightMode, setIsLightMode] = useState(false);

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50  bg-[#171B2D] text-white lg:hidden rounded-lg shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M3 12H21M3 6H21M3 18H21"
            stroke="#FFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/*Side Bar*/}

      <div
        className={`fixed lg:relative w-[240px] flex flex-col h-auto flex-shrink-0 border-r border-[rgba(225, 228, 242, 0.08)] p-8 bg-[#171B2D] transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <h1 className="text-[35px] font-wixmadefor font-extrabold text-[#FFF] leading-normal tracking-[-0.7px] mb-8">
          Helpify
        </h1>

        <p className="text-[10px]  font-normal leading-normal uppercase text-[#55597D] mt-8 mb-4">
          Main Menu
        </p>

        <ul className="space-y-4 flex-grow overflow-y-auto">
          {/*DashBoard*/}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 font-medium text-[14px] leading-normal text-[#FFF] tracking-[-0.14px] font-poppins
         transition duration-200 ${
           isActive ? 'text-[#42BBFF]' : 'text-[#ADB3CC] hover:text-[#42BBFF]'
         }`
              }
            >
              {/* SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16.667"
                height="16.667"
                viewBox="0 0 18 17"
                fill="none"
              >
                <path
                  opacity="0.4"
                  d="M12.3962 0.166992H15.2178C16.3864 0.166992 17.3333 1.12187 17.3333 2.30029V5.14576C17.3333 6.32419 16.3864 7.27907 15.2178 7.27907H12.3962C11.2276 7.27907 10.2808 6.32419 10.2808 5.14576V2.30029C10.2808 1.12187 11.2276 0.166992 12.3962 0.166992Z"
                  className="group-hover:fill-[#42BBFF] transition duration-200"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.78206 0.166992H5.6037C6.77226 0.166992 7.71914 1.12187 7.71914 2.30029V5.14576C7.71914 6.32419 6.77226 7.27907 5.6037 7.27907H2.78206C1.61351 7.27907 0.666626 6.32419 0.666626 5.14576V2.30029C0.666626 1.12187 1.61351 0.166992 2.78206 0.166992ZM2.78206 9.72159H5.6037C6.77226 9.72159 7.71914 10.6765 7.71914 11.8549V14.7004C7.71914 15.878 6.77226 16.8337 5.6037 16.8337H2.78206C1.61351 16.8337 0.666626 15.878 0.666626 14.7004V11.8549C0.666626 10.6765 1.61351 9.72159 2.78206 9.72159ZM15.2179 9.72159H12.3962C11.2277 9.72159 10.2808 10.6765 10.2808 11.8549V14.7004C10.2808 15.878 11.2277 16.8337 12.3962 16.8337H15.2179C16.3864 16.8337 17.3333 15.878 17.3333 14.7004V11.8549C17.3333 10.6765 16.3864 9.72159 15.2179 9.72159Z"
                  className="group-hover:fill-[#42BBFF] transition duration-200"
                  fill="currentColor"
                />
              </svg>

              {/* Text */}
              <span>Dashboard</span>
            </NavLink>
          </li>
          {/*Customers*/}
          <li>
            <NavLink
              to="/customers-page"
              className={({ isActive }) =>
                `flex items-center gap-2 font-medium text-[14px] leading-normal text-[#FFF] tracking-[-0.14px] font-poppins
         transition duration-200 ${
           isActive ? 'text-[#42BBFF]' : 'text-[#ADB3CC] hover:text-[#42BBFF]'
         }`
              }
            >
              {/* SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <path
                  opacity="0.4"
                  d="M13.674 6.01783C13.2977 6.01783 12.7993 6.00949 12.1788 6.00949C10.6655 6.00949 9.42125 4.75699 9.42125 3.22949V0.549492C9.42125 0.338659 9.25292 0.166992 9.04416 0.166992H4.63631C2.57926 0.166992 0.916626 1.85533 0.916626 3.92449V12.9037C0.916626 15.0745 2.65848 16.8337 4.80794 16.8337H11.3719C13.4215 16.8337 15.0833 15.1562 15.0833 13.0853V6.39283C15.0833 6.18116 14.9158 6.01033 14.7062 6.01116C14.3539 6.01366 13.9314 6.01783 13.674 6.01783Z"
                  className="group-hover:fill-[#42BBFF] transition duration-200"
                  fill="currentColor"
                />
                <path
                  opacity="0.4"
                  d="M11.4033 0.639475C11.1541 0.380308 10.7191 0.558641 10.7191 0.917808V3.11531C10.7191 4.03697 11.4783 4.79531 12.3999 4.79531C12.9808 4.80197 13.7874 4.80364 14.4724 4.80197C14.8233 4.80114 15.0016 4.38197 14.7583 4.12864C13.8791 3.21447 12.3049 1.57614 11.4033 0.639475Z"
                  className="group-hover:fill-[#42BBFF] transition duration-200"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.47815 7.98986H8.29899C8.64149 7.98986 8.91982 7.71236 8.91982 7.36986C8.91982 7.02736 8.64149 6.74902 8.29899 6.74902H5.47815C5.13565 6.74902 4.85815 7.02736 4.85815 7.36986C4.85815 7.71236 5.13565 7.98986 5.47815 7.98986ZM5.47824 12.1517H10.0149C10.3574 12.1517 10.6357 11.8742 10.6357 11.5317C10.6357 11.1892 10.3574 10.9109 10.0149 10.9109H5.47824C5.13574 10.9109 4.85824 11.1892 4.85824 11.5317C4.85824 11.8742 5.13574 12.1517 5.47824 12.1517Z"
                  className="group-hover:fill-[#42BBFF] transition duration-200"
                  fill="currentColor"
                />
              </svg>
              {/* Text */}
              <span>Customers</span>
            </NavLink>
          </li>
          {/*Service Provider*/}
          <li>
            <NavLink
              to="/service-providers"
              className={({ isActive }) =>
                `flex items-center gap-2 font-medium text-[14px] leading-normal text-[#FFF] tracking-[-0.14px] font-poppins
         transition duration-200 ${
           isActive ? 'text-[#42BBFF]' : 'text-[#ADB3CC] hover:text-[#42BBFF]'
         }`
              }
            >
              {/* SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="15"
                viewBox="0 0 18 15"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.3303 4.47927H13.8014C12.1592 4.48216 10.8288 5.77929 10.8259 7.38047C10.8237 8.98527 12.1555 10.2882 13.8014 10.2903H17.3333V10.5453C17.3333 13.3446 15.6363 15 12.7644 15H5.23626C2.36366 15 0.666626 13.3446 0.666626 10.5453V4.44822C0.666626 1.64885 2.36366 0 5.23626 0H12.7614C15.6333 0 17.3303 1.64885 17.3303 4.44822V4.47927ZM4.61626 4.47277H9.31626H9.31922H9.32514C9.677 4.47133 9.96144 4.19182 9.95996 3.84804C9.95848 3.50498 9.67107 3.22765 9.31922 3.22909H4.61626C4.26663 3.23054 3.98292 3.50715 3.98144 3.84876C3.97996 4.19182 4.2644 4.47133 4.61626 4.47277Z"
                  className="group-hover:fill-[#42BBFF] transition duration-200"
                  fill="currentColor"
                />
                <path
                  opacity="0.4"
                  d="M12.3644 7.74722C12.5387 8.53988 13.2337 9.09756 14.0271 9.08306H16.7353C17.0655 9.08306 17.3333 8.80965 17.3333 8.47171V6.36208C17.3325 6.02485 17.0655 5.75073 16.7353 5.75H13.9633C13.0608 5.7529 12.3318 6.50204 12.3333 7.42523C12.3333 7.53329 12.3439 7.64134 12.3644 7.74722Z"
                  className="group-hover:fill-[#42BBFF] transition duration-200"
                  fill="currentColor"
                />
                <circle cx="14" cy="7.41634" r="0.833333" fill="#ADB3CC" />
              </svg>
              {/* Text */}
              <span>Service Provider</span>
            </NavLink>
          </li>
          {/*Orders*/}
          <li>
            <NavLink
              to="/admin-orders"
              className={({ isActive }) =>
                `flex items-center gap-2 font-medium text-[14px] leading-normal text-[#FFF] tracking-[-0.14px] font-poppins
         transition duration-200 ${
           isActive ? 'text-[#42BBFF]' : 'text-[#ADB3CC] hover:text-[#42BBFF]'
         }`
              }
            >
              {/* SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="17"
                viewBox="0 0 14 17"
                fill="none"
              >
                <path
                  opacity="0.4"
                  d="M6.99269 14.0187L1.58291 16.7209C1.17438 16.9427 0.664776 16.7946 0.436277 16.3877C0.369544 16.2598 0.334255 16.1177 0.333374 15.9732V9.9248C0.333374 10.5245 0.671485 10.8946 1.56086 11.3092L6.99269 14.0187Z"
                  className="group-hover:fill-[#42BBFF] transition duration-200"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.41276 0.166992H9.55792C11.8144 0.166992 13.6447 1.05537 13.6667 3.32813V15.9727C13.6658 16.1148 13.6305 16.2546 13.5638 16.3799C13.4567 16.5842 13.2717 16.7359 13.0513 16.8001C12.8309 16.8643 12.594 16.8356 12.3951 16.7204L6.99269 14.0183L1.56086 11.3087C0.671485 10.8941 0.333374 10.524 0.333374 9.92433V3.32813C0.333374 1.05537 2.16358 0.166992 4.41276 0.166992ZM3.85414 6.51888H10.1239C10.4852 6.51888 10.7781 6.22389 10.7781 5.86001C10.7781 5.49612 10.4852 5.20113 10.1239 5.20113H3.85414C3.49285 5.20113 3.19997 5.49612 3.19997 5.86001C3.19997 6.22389 3.49285 6.51888 3.85414 6.51888Z"
                  className="group-hover:fill-[#42BBFF] transition duration-200"
                  fill="currentColor"
                />
              </svg>
              {/* Text */}
              <span>Orders</span>
            </NavLink>
          </li>
          {/*Notifications*/}
          <li>
            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                `flex items-center gap-2 font-medium text-[14px] leading-normal text-[#FFF] tracking-[-0.14px] font-poppins
         transition duration-200 ${
           isActive ? 'text-[#42BBFF]' : 'text-[#ADB3CC] hover:text-[#42BBFF]'
         }`
              }
            >
              {/* SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <path
                  d="M14.4746 8.20477C13.8658 7.4939 13.5892 6.87787 13.5892 5.83129V5.47543C13.5892 4.11161 13.2753 3.23288 12.5928 2.35415C11.541 0.989486 9.77028 0.166992 8.03682 0.166992H7.9631C6.26609 0.166992 4.55085 0.951718 3.48079 2.26099C2.76107 3.15735 2.41073 4.07384 2.41073 5.47543V5.83129C2.41073 6.87787 2.15233 7.4939 1.52537 8.20477C1.06405 8.72848 0.916626 9.40158 0.916626 10.1301C0.916626 10.8594 1.15598 11.5501 1.63635 12.1116C2.26331 12.7847 3.14867 13.2144 4.05309 13.2891C5.3625 13.4385 6.67191 13.4948 8.00037 13.4948C9.32801 13.4948 10.6374 13.4008 11.9477 13.2891C12.8512 13.2144 13.7366 12.7847 14.3636 12.1116C14.8431 11.5501 15.0833 10.8594 15.0833 10.1301C15.0833 9.40158 14.9359 8.72848 14.4746 8.20477Z"
                  className="group-hover:fill-[#42BBFF] transition duration-200"
                  fill="currentColor"
                />
                <path
                  opacity="0.4"
                  d="M9.67384 14.5238C9.25725 14.4348 6.71876 14.4348 6.30217 14.5238C5.94603 14.606 5.56091 14.7974 5.56091 15.217C5.58162 15.6173 5.816 15.9707 6.14067 16.1948L6.13984 16.1956C6.55974 16.5229 7.05253 16.7311 7.56851 16.8058C7.84348 16.8435 8.12342 16.8418 8.40833 16.8058C8.92348 16.7311 9.41627 16.5229 9.83617 16.1956L9.83535 16.1948C10.16 15.9707 10.3944 15.6173 10.4151 15.217C10.4151 14.7974 10.03 14.606 9.67384 14.5238Z"
                  className="group-hover:fill-[#42BBFF] transition duration-200"
                  fill="currentColor"
                />
              </svg>
              {/* Text */}
              <span>Notifications</span>
            </NavLink>
          </li>
          {/*Complaints*/}
          <li>
            <NavLink
              to="/complaints-page"
              className={({ isActive }) =>
                `flex items-center gap-2 font-medium text-[14px] leading-normal text-[#FFF] tracking-[-0.14px] font-poppins
         transition duration-200 ${
           isActive ? 'text-[#42BBFF]' : 'text-[#ADB3CC] hover:text-[#42BBFF]'
         }`
              }
            >
              {/* SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  opacity="0.4"
                  d="M18.3333 13.2837C18.3333 15.6087 16.4666 17.492 14.1416 17.5003H14.1333H5.87496C3.55829 17.5003 1.66663 15.6253 1.66663 13.3003V13.292C1.66663 13.292 1.67163 9.60366 1.67829 7.74866C1.67913 7.40033 2.07913 7.20533 2.35163 7.42199C4.33163 8.99283 7.87246 11.857 7.91663 11.8945C8.50829 12.3687 9.25829 12.6362 10.025 12.6362C10.7916 12.6362 11.5416 12.3687 12.1333 11.8853C12.1775 11.8562 15.6391 9.07783 17.6491 7.48116C17.9225 7.26366 18.3241 7.45866 18.325 7.80616C18.3333 9.64699 18.3333 13.2837 18.3333 13.2837Z"
                  className="group-hover:fill-[#42BBFF] transition duration-200"
                  fill="currentColor"
                />
                <path
                  d="M17.8966 4.72833C17.1749 3.36833 15.7549 2.5 14.1916 2.5H5.87494C4.31161 2.5 2.89161 3.36833 2.16994 4.72833C2.00828 5.0325 2.08494 5.41167 2.35411 5.62667L8.54161 10.5758C8.97494 10.9258 9.49994 11.1 10.0249 11.1C10.0283 11.1 10.0308 11.1 10.0333 11.1C10.0358 11.1 10.0391 11.1 10.0416 11.1C10.5666 11.1 11.0916 10.9258 11.5249 10.5758L17.7124 5.62667C17.9816 5.41167 18.0583 5.0325 17.8966 4.72833Z"
                  className="group-hover:fill-[#42BBFF] transition duration-200"
                  fill="currentColor"
                />
              </svg>
              {/* Text */}
              <span>Complaints</span>

              {/* Notification Badge */}
              <span className="bg-[#042E4F] text-[#42BBFF] text-[13px] font-inter font-medium px-2 py-[2px] rounded-full ml-5">
                3 new
              </span>
            </NavLink>
          </li>
        </ul>

        {/*Light Mode*/}
        <button
          onClick={() => setIsLightMode(!isLightMode)}
          className="flex mt-8 items-center gap-3 text-[10px] font-medium leading-normal tracking-[-0.14px] 
         transition duration-200 outline-none 
         text-[#ADB3CC] "
        >
          {/* SVG Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g clipPath="url(#clip0_699_559)">
              <path
                d="M9.99996 13.3337C10.884 13.3337 11.7319 12.9825 12.357 12.3573C12.9821 11.7322 13.3333 10.8844 13.3333 10.0003C13.3333 9.11627 12.9821 8.26842 12.357 7.6433C11.7319 7.01818 10.884 6.66699 9.99996 6.66699C9.1159 6.66699 8.26806 7.01818 7.64294 7.6433C7.01782 8.26842 6.66663 9.11627 6.66663 10.0003C6.66663 10.8844 7.01782 11.7322 7.64294 12.3573C8.26806 12.9825 9.1159 13.3337 9.99996 13.3337V13.3337Z"
                stroke={isLightMode ? '#ADB3CC' : '#E6A500'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.5833 5.41699L15.8333 4.16699M13.3333 10.322C12.8299 10.6941 12.2097 10.8733 11.5855 10.8267C10.9612 10.7802 10.3744 10.5112 9.93175 10.0685C9.48911 9.6259 9.22006 9.03907 9.17354 8.41482C9.12703 7.79056 9.30614 7.17034 9.67829 6.66699L13.3333 10.322ZM9.99996 1.66699V3.33366V1.66699ZM9.99996 16.667V18.3337V16.667ZM4.16663 4.16699L5.41663 5.41699L4.16663 4.16699ZM14.5833 14.5837L15.8333 15.8337L14.5833 14.5837ZM1.66663 10.0003H3.33329H1.66663ZM16.6666 10.0003H18.3333H16.6666ZM4.16663 15.8337L5.41663 14.5837L4.16663 15.8337Z"
                stroke={isLightMode ? '#ADB3CC' : '#E6A500'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_699_559">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>

          {/* Text */}
          <span>LIGHT MODE</span>
        </button>
      </div>
    </>
  );
}

export default AdminSidebar;
