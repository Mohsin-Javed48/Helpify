/** @format */

import React from "react";

import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
