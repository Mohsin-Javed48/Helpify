import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router";

function RouteGuard({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  

  if (isLoading) {
    return <></>;
  }
if(!isLoggedIn && location.pathname.startsWith("/auth/")){
  return children;
}
  else if (!isLoggedIn) {
    
    navigate('/auth/login', { replace: true });
    return null;
  }

  if (isLoggedIn && location.pathname.startsWith("/auth/")) {
   
    navigate('/', { replace: true });
    return null; 
  }
  return children; 
}

export default RouteGuard;