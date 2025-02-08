/** @format */

import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../ui/Navbar";
import Footer from "../../ui/Footer";
function AppLayout() {
  return (
    // <div className="d-flex vh-100 overflow-hidden">
    //   <div style={{ width: '250px' }}>
    //     {/* <SideBar /> */}
    //   </div>

    //   <div className="d-flex flex-column flex-grow-1 vh-100 overflow-hidden">
    //     <div>
    //       {/* <Header /> */}
    //     </div>

    //     <div className="overflow-auto p-4 scrollbar--custom">
    //       <Outlet />
    //     </div>
    //   </div>
    // </div>

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
