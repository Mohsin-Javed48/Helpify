import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThLarge,
  faUsers,
  faUserTie,
  faShoppingCart,
  faBell,
  faEnvelope,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { clearUser } from '../../utills/user';

function Sidebar() {
  const handleLogout = () => {
    clearUser();
    window.location.href = '/auth/login';
  };

  return (
    <div className="hidden md:block bg-[#121829] text-white h-screen py-6 px-4">
      <h1 className="text-white text-3xl font-bold mb-6">Helpify</h1>

      <h2 className="text-gray-400 text-sm uppercase mb-4">Main Menu</h2>
      <ul className="space-y-4">
        <li>
          <NavLink
            to="/admin/"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-300 hover:bg-blue-500 hover:text-white'
              }`
            }
          >
            <FontAwesomeIcon icon={faThLarge} />
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/customers"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-300 hover:bg-blue-500 hover:text-white'
              }`
            }
          >
            <FontAwesomeIcon icon={faUsers} />
            Customers
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/service-providers"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-300 hover:bg-blue-500 hover:text-white'
              }`
            }
          >
            <FontAwesomeIcon icon={faUserTie} />
            Service Providers
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-300 hover:bg-blue-500 hover:text-white'
              }`
            }
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            Orders
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/complaints"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-300 hover:bg-blue-500 hover:text-white'
              }`
            }
          >
            <FontAwesomeIcon icon={faEnvelope} />
            Complaints
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded ml-2">
              3 new
            </span>
          </NavLink>
        </li>

        <li>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-2 rounded text-gray-300 hover:bg-red-500 hover:text-white w-full text-left"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
