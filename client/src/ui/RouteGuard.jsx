import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router';

function RouteGuard({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const [debugInfo, setDebugInfo] = useState('');

  // Safely access context properties with defaults
  const isLoggedIn = authContext?.isLoggedIn || false;
  const loading = authContext?.loading || false;
  const user = authContext?.user || null;

  // Log route guard activity but suppress external errors
  useEffect(() => {
    try {
      // Add an error handler to prevent console pollution from third-party extensions
      const originalError = console.error;
      console.error = (...args) => {
        // Filter out "Host validation" related errors
        if (
          args[0] &&
          typeof args[0] === 'string' &&
          args[0].includes('Host validation')
        ) {
          return;
        }
        originalError.apply(console, args);
      };

      return () => {
        // Restore original console.error when component unmounts
        console.error = originalError;
      };
    } catch (e) {
      // Silently fail if we can't modify console
    }
  }, []);

  // Debug user object
  useEffect(() => {
    if (user) {
      console.log('RouteGuard user object:', user);

      // Check if user has the necessary role information
      let roleId;
      if (user.roleId) {
        roleId = user.roleId;
      } else if (user.user && user.user.roleId) {
        roleId = user.user.roleId;
      }

      setDebugInfo(`User is logged in. Role ID: ${roleId || 'unknown'}`);
    }
  }, [user]);

  // Show a loading indicator while checking auth state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  // If user is NOT logged in and trying to access a protected route, redirect to login
  if (!isLoggedIn && !location.pathname.startsWith('/auth/')) {
    console.log('Not logged in, redirecting to login page');
    navigate('/auth/login', { replace: true });
    return null;
  }

  // Allow unauthenticated users to access auth routes (e.g., login, register)
  if (!isLoggedIn && location.pathname.startsWith('/auth/')) {
    return children;
  }

  // If logged in and trying to access an auth route, redirect to appropriate dashboard
  if (isLoggedIn && location.pathname.startsWith('/auth/')) {
    if (!user) {
      console.log('User data not available yet, waiting');
      return (
        <div className="flex items-center justify-center h-screen">
          Loading user data...
        </div>
      );
    }

    // Look for roleId in different possible locations in the user object
    let roleId;
    if (user.roleId) {
      roleId = user.roleId;
    } else if (user.user && user.user.roleId) {
      roleId = user.user.roleId;
    } else {
      console.error('Could not find roleId in user object:', user);
      // If we can't find a role, default to user role (3)
      roleId = 3;
    }

    console.log(`Detected user role ID: ${roleId}`);

    const roleRedirects = {
      1: '/admin',
      2: '/provider',
      3: '/',
    };

    const redirectPath = roleRedirects[roleId];
    if (redirectPath) {
      console.log(`Redirecting user with role ${roleId} to ${redirectPath}`);
      navigate(redirectPath, { replace: true });
      return null;
    }
  }

  // For debugging purposes, add a small indicator in the corner
  return (
    <>
      {debugInfo && (
        <div className="fixed bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs p-2 rounded z-50">
          {debugInfo}
        </div>
      )}
      {children}
    </>
  );
}

export default RouteGuard;
