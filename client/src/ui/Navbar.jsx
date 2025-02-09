/** @format */

import { useState, useContext } from 'react';
import Button from './Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Assuming you have an AuthContext
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useRef } from 'react';

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext); // Get user and logout from AuthContext
  const dropdownRef = useRef(null);

  // Toggle dropdown on button click
  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown if clicking outside

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Check if Navbar is hidden on certain routes
  if (
    location.pathname.includes('/services') ||
    location.pathname.includes('/order')
  ) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };
  return (
    <>
      <nav className="bg-[#ffff]">
        <div className="flex items-center justify-between px-4 md:px-8 lg:px-[65px] py-[25px] max-w-screen-xl mx-auto">
          {/* Logo */}
          <h2 className="text-black text-center font-extrabold text-[18px] sm:text-[20px] md:text-[22px] lg:text-[25px] leading-[26px] tracking-[-0.35px] font-wixmadefor">
            HELPIFY
          </h2>

          {/*Menu Layout for Mobile */}
          <button
            className="block md:hidden text-black"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {/* Hamburger Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          {/* Desktop Navbar */}
          <ul className="hidden md:flex items-center md:gap-[28px] lg:gap-[32px] text-[#2937B1] font-medium text-[16px] leading-[26px] tracking-[-0.16px] font-wixmadefor">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'border-b-2 border-blue-700' : ''
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? 'border-b-2 border-blue-700' : ''
                }
              >
                About
              </NavLink>
            </li>
            <li
              className="flex items-center gap-[5px] relative"
              onClick={() => setIsDropdownOpen((d) => !d)}
            >
              <div
                className="relative inline-block text-left"
                ref={dropdownRef}
              >
                {/* Button to toggle dropdown */}
                <span className="flex items-center ">
                  <NavLink
                    to="#"
                    onClick={handleToggleDropdown}
                    className={`px-2 py-0.4 font-semibold text-[#2937B1] rounded-md ${
                      isDropdownOpen ? 'border-b-2 ' : ''
                    }`}
                  >
                    Services
                  </NavLink>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M9 3.5L5 7.25L1 3.5"
                      stroke="#141414"
                      strokeOpacity="0.7"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate('/services/plumber')}
                    >
                      Plumber
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate('/services/electrician')}
                    >
                      Electrician
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate('/services/carpenter')}
                    >
                      Carpenter
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate('/services/painter')}
                    >
                      Painter
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate('/services/homeAppliences')}
                    >
                      Home Appliances
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate('/services/geyser')}
                    >
                      Geyser
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate('/services/gardner')}
                    >
                      Gardener
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate('/services/acRepair')}
                    >
                      AC Repair
                    </li>
                  </ul>
                )}
              </div>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive ? 'border-b-2 border-blue-700' : ''
                }
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? 'border-b-2 border-blue-700' : ''
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Buttons */}
          <div className="hidden md:flex items-center gap-[10px]">
            {user ? (
              // If user is logged in
              <div className="flex items-center gap-[10px]">
                <span className="text-[#2937B1]">
                  {user.name || user.email}
                </span>
                <Button
                  text="Logout"
                  variant="primary"
                  onClick={handleLogout}
                />
              </div>
            ) : (
              // If user is not logged in
              <>
                <Button
                  text="Lahore"
                  variant="secondary"
                  onClick={() => console.log('Lahore button clicked')}
                />
                <NavLink to="/auth/login">
                  <Button text="Signup" variant="primary" />
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Sidebar for Mobile */}
        <div
          className={`fixed top-0 left-0 h-[80vh] w-[250px] bg-white shadow-lg transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out md:hidden z-50 bg-[#ffff]`}
        >
          {/* Close Button */}
          <button
            className="absolute top-[10px] right-[10px] text-black"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
          <ul className="flex flex-col items-start gap-[20px] p-[20px] text-[#2937B1] font-medium text-[16px] leading-[26px] tracking-[-0.16px] font-wixmadefor">
            {/* Mobile menu items */}
            {user && (
              <li className="w-full text-center">
                <span className="text-[#2937B1]">
                  {user.name || user.email}
                </span>
              </li>
            )}
            {/* Existing menu items... */}

            {user ? (
              <li className="w-full">
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-500"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <NavLink
                  to="/auth/login"
                  className={({ isActive }) =>
                    isActive ? 'border-b-2 border-blue-700' : ''
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
