/**
 * eslint-disable react-refresh/only-export-components
 *
 * @format
 */
import About from "./components/shared/About";
import Blog from "./components/shared/Blog";
import Carousel from "./components/shared/Carousell";
import ChartCards from "./components/shared/ChartCards";
import Chat from "./components/shared/Chat";
import Contact from "./components/shared/Contact";
import DateTimeSelector from "./components/shared/DateTimeSelector";
import FAQItem from "./components/shared/FAQItem";
import Home from "./components/shared/Home";
import InformationForm from "./components/shared/InformationForm";
import Notification from "./components/shared/Notification";

// Service Components
import AcRepairServices from "./components/services/AcRepairServices";
import CarpenterServices from "./components/services/CarpenterServices";
import ElectricianServices from "./components/services/ElectricianServices";
import GardnerServices from "./components/services/GardnerServices";
import GeyserServices from "./components/services/GeyserServices";
import HandymanServices from "./components/services/HandymanServices";
import HomeAppliencesServices from "./components/services/HomeAppliencesServices";
import PainterServices from "./components/services/PainterServices";
import PlumberServices from "./components/services/PlumberServices";
import ServiceItems from "./components/services/ServiceItems";
import ServicesCard from "./components/services/ServicesCard";

// Order Components
import OrderList from "./components/orders/OrderList";
import OrderPage from "./components/orders/OrderPage";
import OrdersForConfirm from "./components/orders/OrdersForConfirm";
import OrdersForConfirmCard from "./components/orders/OrdersForConfirmCard";
import OrderSummary from "./components/orders/OrderSummary";

// Customer Components
import Customer from "./components/customers/Customer";
import CustomerHistory from "./components/customers/CustomerHistory";
import CustomersPage from "./components/customers/CustomersPage";
import Wallet from "./components/customers/Wallet";

// Service Provider Components
import ServiceProvidersPage from "./components/serviceProvider/ServiceProvidersPage";
import ServiveProviderDashboard from "./components/serviceProvider/ServiveProviderDashboard";

// Admin Components
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminHeader from "./components/admin/AdminHeader";
import AdminOrdersPage from "./components/admin/AdminOrdersPage";
import AdminSidebar from "./components/admin/AdminSidebar";
import ComplaintsPage from "./components/admin/ComplaintsPage";

// Layout Components
import AnimateRoute from "./components/Layout/AnimateRoute";
import AppLayout from "./components/Layout/AppLayout";

// UI Components
import AdminDashboardLayout from "./ui/AdminDashboardLayout";
import BlogCard from "./ui/BlogCard";
import BookButton from "./ui/BookButton";
import Button from "./ui/Button";
import CheckListItem from "./ui/CheckListItem";
import ComplaintCard from "./ui/ComplaintCard";
import CustomerCard from "./ui/CustomerCard";
import DashboardCards from "./ui/DashboardCards";
import Footer from "./ui/Footer";
import Header from "./ui/Header";
import Loadable from "./ui/Loadable";
import LoadingView from "./ui/LoadingView";
import LoginPage from "./ui/LoginPage";
import Navbar from "./ui/Navbar";
import NewsCard from "./ui/NewsCard";
import RouteGuard from "./ui/RouteGuard";
import ServiveProviderDashboardLayout from "./ui/ServiveProviderDashboardLayout";
import Sidebar from "./ui/Sidebar";
import SignInButton from "./ui/SignInButton";
import SignupPage from "./ui/SignupPage";
import SubServiceCard from "./ui/SubServiceCard";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";

/* ***Layouts**** */
const Auth = Loadable(lazy(() => import("./views/Auth/Auth")));
const Login = Loadable(lazy(() => import("./views/Auth/Login")));
const Register = Loadable(lazy(() => import("./views/Auth/Register")));
const Forget = Loadable(lazy(() => import("./views/Auth/Forget")));

const app_routes = [
  // Authentication Routes
  {
    path: "/auth",
    element: (
      <RouteGuard>
        <Auth />
      </RouteGuard>
    ),
    children: [
      { path: "/auth/login", exact: true, element: <Login /> },
      { path: "/auth/register", exact: true, element: <Register /> },
      { path: "/auth/forget/:token?", exact: true, element: <Forget /> },
    ],
  },

  // User Routes (Role 3)
  {
    path: "/",
    element: (
      <RouteGuard>
        <ProtectedRoute allowedRoles={[3]}>
          <AppLayout />
        </ProtectedRoute>
      </RouteGuard>
    ),
    children: [
      { path: "", exact: true, element: <Navigate to="/home" /> },
      { path: "/home", exact: true, element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/services", element: <PlumberServices /> },
      { path: "/blog", element: <Blog /> },
      { path: "/contact", element: <Contact /> },
      { path: "/order", element: <OrderPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/services/handyman", element: <HandymanServices /> },
      { path: "/services/acRepair", element: <AcRepairServices /> },
      { path: "/services/painter", element: <PainterServices /> },
      { path: "/services/carpenter", element: <CarpenterServices /> },
      { path: "/services/electrician", element: <ElectricianServices /> },
      { path: "/services/homeAppliances", element: <HomeAppliencesServices /> },
      { path: "/services/geyser", element: <GeyserServices /> },
      { path: "/services/gardener", element: <GardnerServices /> },
      { path: "/services/plumber", element: <PlumberServices /> },
      { path: "*", element: <Navigate to="/home" /> },
    ],
  },

  // Service Provider Routes (Role 2)
  {
    path: "/provider",
    element: (
      <RouteGuard>
        <ProtectedRoute allowedRoles={[2]}>
          <ServiveProviderDashboardLayout />
        </ProtectedRoute>
      </RouteGuard>
    ),
    children: [
      { path: "/provider/", element: <ServiveProviderDashboard /> },
      { path: "/provider/orderlist", element: <OrderList /> },
      { path: "/provider/customer", element: <Customer /> },
      { path: "/provider/customerhistory", element: <CustomerHistory /> },
      { path: "/provider/chat", element: <Chat /> },
      { path: "/provider/notification", element: <Notification /> },
      { path: "/provider/wallet", element: <Wallet /> },
      { path: "*", element: <Navigate to="/provider/dashboard" /> },
    ],
  },

  // Admin Routes (Role 1)
  {
    path: "/admin",
    element: (
      <RouteGuard>
        <ProtectedRoute allowedRoles={[1]}>
          <AdminDashboardLayout />
        </ProtectedRoute>
      </RouteGuard>
    ),
    children: [
      { path: "/admin/", element: <AdminDashboard /> },
      { path: "/admin/customers", element: <CustomersPage /> },
      { path: "/admin/service-providers", element: <ServiceProvidersPage /> },
      { path: "/admin/orders", element: <AdminOrdersPage /> },
      { path: "/admin/complaints", element: <ComplaintsPage /> },
      { path: "*", element: <Navigate to="/admin/dashboard" /> },
    ],
  },
];

export default app_routes;

