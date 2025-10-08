/** @format */

import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Assuming you have an AuthContext
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import BookingDropdownMenu from '../components/services/BookingDropdownMenu';

// Updated styles for a modern, on-brand Navbar
const navStyles = {
  container:
    'sticky top-0 z-40 backdrop-blur-md bg-gradient-to-r from-[#242D7D]/90 via-[#2F3EBB]/90 to-[#4B5DFF]/90 border-b border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]',
  inner:
    'flex items-center justify-between px-4 md:px-8 lg:px-16 py-4 max-w-screen-xl mx-auto',
  logo: 'text-white font-extrabold text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tight',
  navLinks:
    'hidden md:flex items-center gap-6 lg:gap-8 text-white/90 font-medium text-sm lg:text-base',
  navLink:
    'relative transition-colors duration-200 ease-in-out hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#FFD166] after:transition-all after:duration-300 hover:after:w-full',
  dropdown:
    'absolute top-8 left-0 bg-[#1f2870]/80 backdrop-blur-md text-white shadow-md rounded-md w-44 z-10 ring-1 ring-white/10 overflow-hidden',
  dropdownItem: 'px-4 py-2 hover:bg-white/10 transition-colors duration-200',
  ctaPrimary:
    'px-4 py-2 rounded-full bg-[#242D7D] text-white font-semibold shadow hover:brightness-110 transition',
  ctaSecondary:
    'px-4 py-2 rounded-full border border-[#FFD166]/80 text-white hover:bg-white/10 transition',
  sidebar:
    'fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-[#242D7D]/95 to-[#2F3EBB]/95 backdrop-blur-md shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden z-50',
  closeButton: 'absolute top-3 right-3 text-white/90 hover:text-white',
};

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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
  if (location.pathname.includes('/auth')) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };
  return (
    <>
      <nav className={navStyles.container}>
        <div className={navStyles.inner}>
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
                  isActive
                    ? navStyles.navLink + ' text-white after:w-full'
                    : navStyles.navLink
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? navStyles.navLink + ' text-white after:w-full'
                    : navStyles.navLink
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
                      path: '/services/homeAppliances',
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
            {user && <BookingDropdownMenu navStyles={navStyles} />}
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive
                    ? navStyles.navLink + ' text-white after:w-full'
                    : navStyles.navLink
                }
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? navStyles.navLink + ' text-white after:w-full'
                    : navStyles.navLink
                }
              >
                Contact
              </NavLink>
            </li>
            {/* Add Become a Service Provider link for regular users (roleId 3) */}
            {user && user.roleId === 3 && (
              <li>
                <NavLink
                  to="/become-provider"
                  className={({ isActive }) =>
                    isActive
                      ? navStyles.navLink + ' text-yellow-300 after:w-full'
                      : 'text-yellow-300 ' + navStyles.navLink
                  }
                >
                  Become a Provider
                </NavLink>
              </li>
            )}
          </ul>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 text-white hover:text-yellow-300"
                >
                  <img
                    src={user.avatarUrl || '/Profile.png'}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white/60"
                  />
                  <span className="hidden lg:inline-block max-w-[160px] truncate">
                    {user.name || user.firstName || user.email}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white/95 backdrop-blur rounded-xl shadow-2xl ring-1 ring-black/5 z-20 overflow-hidden">
                    <div className="flex items-center gap-3 px-4 py-4 bg-gradient-to-r from-[#242D7D]/5 to-transparent">
                      <img
                        src={user.avatarUrl || '/Profile.png'}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-200"
                      />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-gray-900 truncate">
                          {user.name || user.firstName || 'Account'}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      {user.roleId === 3 && (
                        <a
                          href="/my-bookings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          My Bookings
                        </a>
                      )}
                      {user.roleId === 2 && (
                        <a
                          href="/provider/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Provider Dashboard
                        </a>
                      )}
                      {user.roleId === 1 && (
                        <a
                          href="/admin/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Admin Dashboard
                        </a>
                      )}
                    </div>
                    <div className="px-4 pb-3 pt-2 border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink to="/auth/login">
                  <span className={navStyles.ctaSecondary}>Login</span>
                </NavLink>
                <NavLink to="/auth/register">
                  <span className={navStyles.ctaPrimary}>Signup</span>
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
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'border-b-2 border-yellow-400' : navStyles.navLink
                }
                onClick={() => setIsSidebarOpen(false)}
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
                onClick={() => setIsSidebarOpen(false)}
              >
                About
              </NavLink>
            </li>
            {/* Add the mobile menu link for Become a Service Provider */}
            {user && user.roleId === 3 && (
              <li>
                <NavLink
                  to="/become-provider"
                  className={({ isActive }) =>
                    isActive
                      ? 'border-b-2 border-yellow-400'
                      : navStyles.navLink
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Become a Provider
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to="/services/plumber"
                className={({ isActive }) =>
                  isActive ? 'border-b-2 border-yellow-400' : navStyles.navLink
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                Services
              </NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink
                    to="/booking"
                    className={({ isActive }) =>
                      isActive
                        ? 'border-b-2 border-yellow-400'
                        : navStyles.navLink
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    New Booking
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/my-bookings"
                    className={({ isActive }) =>
                      isActive
                        ? 'border-b-2 border-yellow-400'
                        : navStyles.navLink
                    }
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    My Bookings
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive ? 'border-b-2 border-yellow-400' : navStyles.navLink
                }
                onClick={() => setIsSidebarOpen(false)}
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
                onClick={() => setIsSidebarOpen(false)}
              >
                Contact
              </NavLink>
            </li>
            {user ? (
              <li className="w-full">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsSidebarOpen(false);
                  }}
                  className="text-red-300 hover:text-red-400"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/auth/login"
                    className={navStyles.navLink}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/auth/register"
                    className={navStyles.navLink}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
