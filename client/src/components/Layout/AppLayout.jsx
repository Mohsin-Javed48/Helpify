/** @format */

import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../ui/Navbar';
import Footer from '../../ui/Footer';
function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Main Content */}
      <main
        className="flex-grow pb-24 sm:pb-0"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
