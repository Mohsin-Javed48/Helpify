/** @format */

import React from 'react';

import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from '../Navbar';
import { useSelector } from 'react-redux';

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
