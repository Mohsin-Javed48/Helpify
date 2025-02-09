import { createContext, useState, useEffect } from "react";
import { clearUser, getUser } from "../utills/user";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwt, setJwt] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedJwt = getUser();
    if (storedJwt) {
      setIsLoggedIn(true);
      setJwt(storedJwt);
    }
    setIsLoading(false);
  }, []);

  function login(token) {
    setIsLoggedIn(true);
    setJwt(token);
    localStorage.setItem("jwt", token);
  }

  function logout() {
    setIsLoggedIn(false);
    setJwt(null);
    setUser(null);
    clearUser();
  }

  const authValue = {
    isLoggedIn,
    isLoading,
    setIsLoading,
    login,
    logout,
    jwt,
    user,
    setUser,
  };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext };