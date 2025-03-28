import { createContext, useState, useEffect, useCallback } from 'react';
import { clearUser, getUser, setUser as saveUser } from '../utills/user';

// Create context with default values to avoid null checking
const AuthContext = createContext({
  isLoggedIn: false,
  loading: true,
  login: () => {},
  logout: () => {},
  jwt: null,
  user: null,
  setUser: () => {},
});

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwt, setJwt] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // Helper to extract user data and token from various response formats
  const processUserData = (data) => {
    console.log('Processing user data:', data);
    
    let tokenValue = null;
    let userData = null;
    
    if (typeof data === 'string') {
      // Just a token string
      tokenValue = data;
    } else if (data.token) {
      // Token directly on the object
      tokenValue = data.token;
      
      // If there's a nested user object
      if (data.user) {
        userData = data.user;
      } else {
        // Otherwise use the data itself as the user
        userData = data;
      }
    } else if (data.user && data.user.token) {
      // User object with token inside
      tokenValue = data.user.token;
      userData = data.user;
    }
    
    // Ensure we have role information
    if (userData && !userData.roleId && data.user && data.user.roleId) {
      userData.roleId = data.user.roleId;
    }
    
    // If we still don't have roleId, check common locations
    if (userData && !userData.roleId) {
      if (data.roleId) {
        userData.roleId = data.roleId;
      } else if (data.user && data.user.roleId) {
        userData.roleId = data.user.roleId;
      } else if (data.user && data.user.role) {
        userData.roleId = data.user.role;
      }
    }
    
    console.log('Processed user data:', { 
      hasToken: !!tokenValue, 
      hasUserData: !!userData,
      roleId: userData?.roleId
    });
    
    return { token: tokenValue, userData };
  };

  // Initialize auth state from localStorage
  useEffect(() => {
    try {
      console.log('Initializing AuthContext...');
      const storedUser = getUser();
      
      if (storedUser) {
        console.log('User loaded from storage:', storedUser);
        
        const { token, userData } = processUserData(storedUser);
        
        if (token) {
          setIsLoggedIn(true);
          setJwt(token);
          setUser(userData || storedUser);
        } else {
          console.warn('No valid token found in stored user data');
        }
      } else {
        console.log('No valid user found in storage');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      // Clear potentially corrupted data
      clearUser();
    } finally {
      setIsLoading(false);
      setInitialized(true);
      console.log('AuthContext initialization complete');
    }
  }, []);

  // Login function with better error handling
  const login = useCallback((userData) => {
    try {
      if (!userData) {
        console.error('Attempted to login with invalid user data');
        return false;
      }

      console.log('Login called with:', userData);
      
      const { token, userData: processedUser } = processUserData(userData);
      
      if (!token) {
        console.error('No token found in login data');
        return false;
      }
      
      setIsLoggedIn(true);
      setJwt(token);
      
      if (processedUser) {
        setUser(processedUser);
      } else {
        setUser(userData);
      }
      
      // Store the full response for maximum compatibility
      saveUser(userData);
      console.log('User logged in successfully');
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setJwt(null);
    setUser(null);
    clearUser();
    console.log('User logged out');
  }, []);

  // Create value object with memoized functions
  const authValue = {
    isLoggedIn,
    loading,
    setIsLoading,
    login,
    logout,
    jwt,
    user,
    setUser,
    initialized,
  };

  console.log('Rendering AuthProvider with state:', { 
    isLoggedIn, 
    loading, 
    user: !!user,
    roleId: user?.roleId || (user?.user?.roleId) || 'unknown'
  });

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
