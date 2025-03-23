import React, { useContext } from 'react';
import { Navbar, Nav, Dropdown, Image } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';

const Header = () => {
  const {logout}= useContext(AuthContext);
  const navigate = useNavigate()
  const handdleLogout = ()=>{
    logout();
    navigate('/auth/login');
  }
  return (
    <></>
  );
};

export default Header;
