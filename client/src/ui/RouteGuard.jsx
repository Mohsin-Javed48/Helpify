import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router";

function RouteGuard({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, isLoading, user } = useContext(AuthContext); // Get user details

  if (isLoading) {
    return <></>; // Show nothing while loading
  }

  // If user is NOT logged in and trying to access a protected route, redirect to login
  if (!isLoggedIn && !location.pathname.startsWith("/auth/")) {
    navigate("/auth/login", { replace: true });
    return null;
  }

  // Allow unauthenticated users to access auth routes (e.g., login, register)
  if (!isLoggedIn && location.pathname.startsWith("/auth/")) {
    return children;
  }

  // If logged in and trying to access an auth route (e.g., login, register), redirect to dashboard
  if (isLoggedIn && location.pathname.startsWith("/auth/")) {

    console.log("dgdghdg",user?.roleId)

    
   if (user === null) {
    return <p>Loading...</p>;
  }
    if (user?.roleId === 1) {
      navigate("/admin", { replace: true });
    } else if (user?.roleId === 2) {
      navigate("/provider", { replace: true });
    } else if (user?.roleId === 3) {
      navigate("/", { replace: true });
    } 
    return null;
  }

  return children;
}

export default RouteGuard;
