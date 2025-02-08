/** @format */

import "./index.css";
import { useRoutes } from "react-router";
import app_routes from "./app_routes";
import { AuthContext } from "./context/AuthContext";
import { useContext, useEffect } from "react";
import { clearUser, getUser } from "./utills/user";
import { AnimatePresence } from "framer-motion";
import AnimatedRoute from "./components/Layout/AnimateRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setAuthToken } from "./api/axios";
import { me } from "./api/auth";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
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

  return (
    <>
      <AnimatePresence>
        <AnimatedRoute>
          <QueryClientProvider client={queryClient}>
            {routing}
          </QueryClientProvider>
        </AnimatedRoute>
      </AnimatePresence>
    </>
  );
}

export default App;
