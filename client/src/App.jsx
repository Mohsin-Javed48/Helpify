import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import Components
import Auth from './views/Auth/Auth';
import AppLayout from './components/Layout/AppLayout';
import Home from './components/shared/Home';
import About from './components/shared/About';
import Blog from './components/shared/Blog';
import Contact from './components/shared/Contact';
import OrderPage from './components/orders/OrderPage';

// Services
import PlumberServices from './components/services/PlumberServices';
import HandymanServices from './components/services/HandymanServices';
import AcRepairServices from './components/services/AcRepairServices';
import PainterServices from './components/services/PainterServices';
import CarpenterServices from './components/services/CarpenterServices';
import ElectricianServices from './components/services/ElectricianServices';
import HomeAppliancesServices from './components/services/HomeAppliancesServices';
import GeyserServices from './components/services/GeyserServices';
import GardnerServices from './components/services/GardnerServices';

// Service Provider
import ServiceProviderDashboardLayout from './ui/ServiceProviderDashboardLayout';
import ServiceProviderDashboard from './components/serviceProvider/ServiceProviderDashboard';
import OrderList from './components/orders/OrderList';
import Customer from './components/customers/Customer';
import CustomerHistory from './components/customers/CustomerHistory';
import Chat from './components/shared/Chat';
import Notification from './components/shared/Notification';
import Wallet from './components/customers/Wallet';

// Admin Dashboard
import AdminDashboardLayout from './ui/AdminDashboardLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import CustomersPage from './components/customers/CustomersPage';
import ServiceProvidersPage from './components/serviceProvider/ServiceProvidersPage';
import AdminOrdersPage from './components/admin/AdminOrdersPage';
import ComplaintsPage from './components/admin/ComplaintsPage';
import Register from './views/Auth/Register';
import Login from './views/Auth/Login';
import Forget from './views/Auth/Forget';

function App() {
<<<<<<< HEAD
=======
  // const navigate = useNavigate();
  const queryClient = new QueryClient();
  const routing = useRoutes(app_routes);
  const { setUser, setIsLoading } = useContext(AuthContext);
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const user = getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }
      const token = user.token;
      setAuthToken(token);
      const response = await me(token);
      setUser(response.user);


      console.log(response.user)
    
      setIsLoading(false);
    } catch (error) {
      // clear user here
      clearUser();
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    (async () => {
      fetchUserData();
    })();
  }, []);

>>>>>>> 68b87cd7a2b9e90fdd84117f5c21c22591e7be05
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/auth" element={<Auth />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forget" element={<Forget />} />
        </Route>

        {/* Main Layout */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="order" element={<OrderPage />} />

          {/* Services Routes */}
          <Route path="services">
            <Route path="handyman" element={<HandymanServices />} />
            <Route path="acRepair" element={<AcRepairServices />} />
            <Route path="painter" element={<PainterServices />} />
            <Route path="carpenter" element={<CarpenterServices />} />
            <Route path="electrician" element={<ElectricianServices />} />
            <Route path="homeAppliances" element={<HomeAppliancesServices />} />
            <Route path="geyser" element={<GeyserServices />} />
            <Route path="gardner" element={<GardnerServices />} />
            <Route path="plumber" element={<PlumberServices />} />
          </Route>

          {/* Service Provider Dashboard */}
          <Route element={<ServiceProviderDashboardLayout />}>
            <Route path="dashboard" element={<ServiceProviderDashboard />} />
            <Route path="orderlist" element={<OrderList />} />
            <Route path="customer" element={<Customer />} />
            <Route path="customerhistory" element={<CustomerHistory />} />
            <Route path="chat" element={<Chat />} />
            <Route path="notification" element={<Notification />} />
            <Route path="wallet" element={<Wallet />} />
          </Route>

          {/* Admin Dashboard */}
          <Route element={<AdminDashboardLayout />}>
            <Route path="admin-dashboard" element={<AdminDashboard />} />
            <Route path="customers-page" element={<CustomersPage />} />
            <Route
              path="service-providers"
              element={<ServiceProvidersPage />}
            />
            <Route path="admin-orders" element={<AdminOrdersPage />} />
            <Route path="complaints-page" element={<ComplaintsPage />} />
          </Route>

          {/* Redirect all unknown paths to Home */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
