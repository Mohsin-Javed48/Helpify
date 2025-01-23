/** @format */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./ui/LoginPage";
import SignupPage from "./ui/SignupPage";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/PlumberServices";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import OrderPage from "./components/OrderPage";
import AppLayout from "./components/AppLayout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PlumberServices from "./components/PlumberServices";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/services" element={<Services />}></Route>
            <Route path="/blog" element={<Blog />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
          </Route>
          <Route path="/order" element={<OrderPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/services/plumber" element={<PlumberServices />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
