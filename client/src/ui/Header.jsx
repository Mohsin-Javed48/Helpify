import React, { useContext } from 'react';
import { Navbar, Nav, Dropdown, Image } from 'react-bootstrap';
import proImg from '../assets/images/user-1.jpg';
import { useNavigate } from 'react-router';

const Header = () => {
  const navigate = useNavigate();
  const handdleLogout = () => {
    navigate('/auth/login');
  };
  return (
<<<<<<< HEAD
    <Navbar
      bg="light"
      className="px-4 shadow-sm d-flex justify-content-between"
    >
      <div className="d-flex align-items-center">
        <i className="bi bi-list fs-4"></i>
      </div>

      <Nav className="d-flex align-items-center">
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="light"
            className="d-flex align-items-center border-0"
          >
            <Image
              src={proImg}
              alt="Profile"
              roundedCircle
              width={32}
              height={32}
              className="me-2"
            />
            Invoika Admin
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
            <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <button
                onClick={handdleLogout}
                className="btn btn-outline-warning"
              >
                {' '}
                Logout
              </button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
=======
    <></>
>>>>>>> 68b87cd7a2b9e90fdd84117f5c21c22591e7be05
  );
};

export default Header;
