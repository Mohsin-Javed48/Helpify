import { Navigate, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  console.log('ProtectedRoute User:', user);

  // Add effect to revalidate authentication when component mounts
  useEffect(() => {
    if (!user && !loading) {
      console.log('No user detected, redirecting to login');
    }
  }, [user, loading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Handle the case when user is null
  if (!user) {
    console.log('User authentication failed, redirecting to login');
    return <Navigate to="/auth/login" replace />;
  }

  // Check if user has allowed role
  if (allowedRoles && !allowedRoles.includes(user.roleId)) {
    console.log('Access denied - incorrect role');

    if (user.roleId === 1) {
      return <Navigate to="/admin" replace />;
    } else if (user.roleId === 2) {
      return <Navigate to="/provider" replace />;
    } else if (user.roleId === 3) {
      return <Navigate to="/" replace />;
    } else {
      return <Navigate to="/auth/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
