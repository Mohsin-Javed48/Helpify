import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faListAlt, 
  faUser, 
  faUserFriends, 
  faComments, 
  faWallet, 
  faBell, 
  faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons';
import { clearUser } from '../../utills/user';

function Sidebar() {
  const handleLogout = () => {
    clearUser();
    window.location.href = '/auth/login';
  };
  
  return (
    <div className="hidden md:block bg-[#fff] shadow-lg py-4 px-6 lg:py-6 lg:px-8">
      <div className="flex flex-col gap-[930px]">
        <div>
          <h1 className="font-poppins text-[20px] sm:text-[35px] md:text-[40px] lg:text-[45px]  font-bold leading-normal">
            HELPIFY
          </h1>
          <h2
            className="mb-[15px] lg:mb-[25px] text-[#B9BBBD] text-[18px] font-medium leading-normal"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            Customer Dashboard
          </h2>
          <ul
            className="text-[#464255] space-y-[25px] text-[18px] font-medium leading-[40px]"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            <li className="gap-3 text-gray-600 hover:text-blue-500 cursor-pointer">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded ${
                    isActive ? 'bg-[#2ED6A326] text-[black]' : 'bg-[white]'
                  }`
                }
              >
                <FontAwesomeIcon icon={faHome} className="text-[#00B074]" />
                Dashboard
              </NavLink>
            </li>
            <li className="gap-3 text-gray-600 hover:text-blue-500 cursor-pointer">
              <NavLink
                to="/provider/orderlist"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded ${
                    isActive ? 'bg-[#2ED6A326] text-[black]' : ''
                  }`
                }
              >
                <FontAwesomeIcon icon={faListAlt} className="text-[#464255]" />
                Order List
              </NavLink>
            </li>

            <li className="gap-3 text-gray-600 hover:text-blue-500 cursor-pointer">
              <NavLink
                to="/provider/customer"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded ${
                    isActive ? 'bg-[#2ED6A326] text-[black]' : ''
                  }`
                }
              >
                <FontAwesomeIcon icon={faUser} className="text-[#464255]" />
                Customer
              </NavLink>
            </li>
            <li className="gap-3 text-gray-600 hover:text-blue-500 cursor-pointer">
              <NavLink
                to="/provider/customerhistory"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded ${
                    isActive ? 'bg-[#2ED6A326] text-[black]' : ''
                  }`
                }
              >
                <FontAwesomeIcon icon={faUserFriends} className="text-[#464255]" />
                Customer History
              </NavLink>
            </li>
            <li className="gap-3 text-gray-600 hover:text-blue-500 cursor-pointer">
              <NavLink
                to="/provider/chat"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded ${
                    isActive ? 'bg-[#2ED6A326] text-[black]' : ''
                  }`
                }
              >
                <FontAwesomeIcon icon={faComments} className="text-[#464255]" />
                Chat
              </NavLink>
            </li>
            <li className="gap-3 text-gray-600 hover:text-blue-500 cursor-pointer">
              <NavLink
                to="/provider/wallet"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded ${
                    isActive ? 'bg-[#2ED6A326] text-[black]' : ''
                  }`
                }
              >
                <FontAwesomeIcon icon={faWallet} className="text-[#464255]" />
                Wallet
              </NavLink>
            </li>
            <li className="gap-3 text-gray-600 hover:text-blue-500 cursor-pointer">
              <NavLink
                to="/provider/notification"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded ${
                    isActive ? 'bg-[#2ED6A326] text-[black]' : ''
                  }`
                }
              >
                <FontAwesomeIcon icon={faBell} className="text-[#464255]" />
                Notification
              </NavLink>
            </li>

            <li className="text-gray-600 hover:text-blue-500 cursor-pointer">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 p-2 hover:text-blue-500"
                aria-label="Logout"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="text-[#464255]" />
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h1
            className="mb-[5px] text-[#969BA0] text-[13px] font-bold leading-[18px]"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            HELPIFY Customer Dashboard
          </h1>
          <h2
            className="mb-[15px] text-[#969BA0] text-[13px] font-bold leading-[18px]"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            © 2024 All Rights Reserved
          </h2>
          <h1
            className="text-[#969BA0] text-[14px] font-normal leading-[26px]"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            Made with ❤ by Helpify
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;