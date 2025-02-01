// /** @format */

// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import LoginPage from './ui/LoginPage';
// import SignupPage from './ui/SignupPage';
// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import About from './components/About';
// import Services from './components/services/PlumberServices';
// import Blog from './components/Blog';
// import Contact from './components/Contact';
// import Footer from './components/Footer';
// import OrderPage from './components/OrderPage';
// import AppLayout from './components/AppLayout';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import PlumberServices from './components/services/PlumberServices';
// import HandymanServices from './components/services/HandymanServices';
// import AcRepairServices from './components/services/AcRepairServices';
// import PainterServices from './components/services/PainterServices';
// import CarpenterServices from './components/services/CarpenterServices';
// import ElectricianServices from './components/services/ElectricianServices';
// import HomeAppliencesServices from './components/services/HomeAppliencesServices';
// import GeyserServices from './components/services/GeyserServices';
// import GardnerServices from './components/services/GardnerServices';

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route element={<AppLayout />}>
//             <Route index path="/" element={<Home />}></Route>
//             <Route path="/about" element={<About />}></Route>
//             <Route path="/services" element={<Services />}></Route>
//             <Route path="/blog" element={<Blog />}></Route>
//             <Route path="/contact" element={<Contact />}></Route>
//           </Route>
//           <Route path="/order" element={<OrderPage />}></Route>
//           <Route path="/signup" element={<SignupPage />}></Route>
//           <Route path="/login" element={<LoginPage />}></Route>
//           <Route
//             path="/services/handyman"
//             element={<HandymanServices />}
//           ></Route>
//           <Route
//             path="/services/acRepair"
//             element={<AcRepairServices />}
//           ></Route>
//           <Route path="/services/painter" element={<PainterServices />}></Route>
//           <Route
//             path="/services/carpenter"
//             element={<CarpenterServices />}
//           ></Route>
//           <Route
//             path="/services/electrician"
//             element={<ElectricianServices />}
//           ></Route>
//           <Route
//             path="/services/homeAppliences"
//             element={<HomeAppliencesServices />}
//           ></Route>
//           <Route path="/services/geyser" element={<GeyserServices />}></Route>
//           <Route path="/services/gardner" element={<GardnerServices />}></Route>
//           <Route path="/services/plumber" element={<PlumberServices />}></Route>
//         </Routes>
//       </BrowserRouter>
//     </>
//   );

// export default App;

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import CustomersPage from './components/CustomersPage';
import ServiceProvidersPage from './components/ServiceProvidersPage';
import AdminOrdersPage from './components/AdminOrdersPage';
import ComplaintsPage from './components/ComplaintsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="flex bg-[#171B2D]">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 p-4 bg-[#161928]">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/customers-page" element={<CustomersPage />} />
            <Route
              path="/service-providers"
              element={<ServiceProvidersPage />}
            />
            <Route path="/admin-orders" element={<AdminOrdersPage />} />
            <Route path="/notifications" element={<div>Notifications</div>} />
            <Route path="/complaints-page" element={<ComplaintsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
