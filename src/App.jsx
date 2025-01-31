/** @format */

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './ui/LoginPage';
import SignupPage from './ui/SignupPage';
<<<<<<< HEAD
=======
import Navbar from './components/Navbar';
>>>>>>> c2b37dccabeb9aefb30d3f461245fe5187d38c57
import Home from './components/Home';
import About from './components/About';
import Services from './components/services/PlumberServices';
import Blog from './components/Blog';
import Contact from './components/Contact';
<<<<<<< HEAD
=======
import Footer from './components/Footer';
>>>>>>> c2b37dccabeb9aefb30d3f461245fe5187d38c57
import OrderPage from './components/OrderPage';
import AppLayout from './components/AppLayout';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PlumberServices from './components/services/PlumberServices';
import HandymanServices from './components/services/HandymanServices';
import AcRepairServices from './components/services/AcRepairServices';
import PainterServices from './components/services/PainterServices';
import CarpenterServices from './components/services/CarpenterServices';
import ElectricianServices from './components/services/ElectricianServices';
import HomeAppliencesServices from './components/services/HomeAppliencesServices';
import GeyserServices from './components/services/GeyserServices';
import GardnerServices from './components/services/GardnerServices';
<<<<<<< HEAD
import ServiveProviderDashboard from './components/ServiveProviderDashboard';
import OrderList from './components/OrderList';
import ServiveProviderDashboardLayout from './ui/ServiveProviderDashboardLayout';
import Customer from './components/Customer';
import CustomerHistory from './components/CustomerHistory';
import Notification from './components/Notification';
import Wallet from './components/Wallet';
import Chat from './components/Chat';
=======
>>>>>>> c2b37dccabeb9aefb30d3f461245fe5187d38c57

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
          <Route
            path="/services/handyman"
            element={<HandymanServices />}
          ></Route>
          <Route
            path="/services/acRepair"
            element={<AcRepairServices />}
          ></Route>
          <Route path="/services/painter" element={<PainterServices />}></Route>
          <Route
            path="/services/carpenter"
            element={<CarpenterServices />}
          ></Route>
          <Route
            path="/services/electrician"
            element={<ElectricianServices />}
          ></Route>
          <Route
            path="/services/homeAppliences"
            element={<HomeAppliencesServices />}
          ></Route>
          <Route path="/services/geyser" element={<GeyserServices />}></Route>
          <Route path="/services/gardner" element={<GardnerServices />}></Route>
          <Route path="/services/plumber" element={<PlumberServices />}></Route>

          {/* service provider dashboard */}

          <Route element={<ServiveProviderDashboardLayout />}>
            <Route
              path="/dashboard"
              element={<ServiveProviderDashboard />}
            ></Route>
            <Route path="/orderlist" element={<OrderList />}></Route>
            <Route path="/customer" element={<Customer />}></Route>

            <Route
              path="/customerhistory"
              element={<CustomerHistory />}
            ></Route>
            <Route path="/chat" element={<Chat />}></Route>
            <Route path="/notification" element={<Notification />}></Route>
            <Route path="/wallet" element={<Wallet />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
//hello kia kro?
export default App;
