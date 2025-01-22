import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* This renders the child routes */}
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
