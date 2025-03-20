/** @format */

import { useState, useContext } from 'react';
import Button from './Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Assuming you have an AuthContext
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons';

// Updated styles for an even cooler Navbar
const navStyles = {
  container:
    'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl',
  logo: 'text-white font-extrabold text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide',
  navLinks: 'hidden md:flex items-center gap-8 text-white font-semibold',
  navLink: 'hover:text-yellow-400 transition-colors duration-300 ease-in-out',
  dropdown:
    'absolute top-8 left-0 bg-blue-500 bg-opacity-75 shadow-md rounded-md w-40 z-10 transition-transform duration-300 ease-in-out transform scale-95 origin-top-left',
  dropdownItem: 'px-4 py-2 hover:bg-blue-600 transition-colors duration-200',
  button:
    'text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 transition-all duration-300 ease-in-out shadow-md',
  sidebar:
    'fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-indigo-500 to-purple-600 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden z-50',
  closeButton: 'absolute top-2 right-2 text-white hover:text-red-500',
};

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, logout } = useContext(AuthContext); // Get user and logout from AuthContext
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown when clicking outside
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
  if (location.pathname.includes('/services')) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };
  return (
    <>
      <nav className={navStyles.container}>
        <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 py-4 max-w-screen-xl mx-auto">
          {/* Logo */}
          <h2 className={navStyles.logo}>HELPIFY</h2>

          {/* Mobile Menu Button */}
          <button
            className="block md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {/* Font Awesome Hamburger Icon */}
            <FontAwesomeIcon icon={faBars} className="w-6 h-6 text-white" />
          </button>

          {/* Desktop Navbar */}
          <ul className={navStyles.navLinks}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'border-b-2 border-yellow-400' : navStyles.navLink
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? 'border-b-2 border-yellow-400' : navStyles.navLink
                }
              >
                About
              </NavLink>
            </li>
            <li className="relative">
              <span
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="cursor-pointer flex items-center gap-1"
              >
                Services
                {/* Font Awesome Dropdown Arrow Icon */}
                <FontAwesomeIcon icon={faChevronDown} className="text-white" />
              </span>
              {isDropdownOpen && (
                <ul className={navStyles.dropdown} ref={dropdownRef}>
                  {[
                    { name: 'Plumber', path: '/services/plumber' },
                    { name: 'Electrician', path: '/services/electrician' },
                    { name: 'Carpenter', path: '/services/carpenter' },
                    { name: 'Painter', path: '/services/painter' },
                    {
                      name: 'Home Appliances',
                      path: '/services/homeAppliences',
                    },
                    { name: 'Geyser', path: '/services/geyser' },
                    { name: 'Gardener', path: '/services/gardner' },
                    { name: 'AC Repair', path: '/services/acRepair' },
                  ].map((service) => (
                    <li key={service.name} className={navStyles.dropdownItem}>
                      <NavLink to={service.path} className="block">
                        {service.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive ? 'border-b-2 border-yellow-400' : navStyles.navLink
                }
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? 'border-b-2 border-yellow-400' : navStyles.navLink
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-white">{user.name || user.email}</span>
                <Button
                  text="Logout"
                  variant="primary"
                  onClick={handleLogout}
                  className={navStyles.button}
                />
              </div>
            ) : (
              <>
                <Button
                  text="Lahore"
                  variant="secondary"
                  onClick={() => console.log('Lahore button clicked')}
                  className={navStyles.button}
                />
                <NavLink to="/auth/login">
                  <Button
                    text="Signup"
                    variant="primary"
                    className={navStyles.button}
                  />
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`${navStyles.sidebar} ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <button
            className={navStyles.closeButton}
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ✕
          </button>
          <ul className="flex flex-col items-start gap-4 p-4 text-white font-medium">
            {user && (
              <li className="w-full text-center">
                <span className="text-white">{user.name || user.email}</span>
              </li>
            )}
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
                    isActive
                      ? 'border-b-2 border-yellow-400'
                      : navStyles.navLink
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
