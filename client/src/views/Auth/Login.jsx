/** @format */

import React, { useContext, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaEye as ViewPasswordIcon } from 'react-icons/fa';
import loginMen from '/src/assets/images/auth/image.png';
import { Link, useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../../api/auth';
import Swal from 'sweetalert2';
import { setUser as saveUserToStorage } from '../../utills/user';
import GoogleIcon from '../../assets/Google_icon';
import { AuthContext } from '../../context/AuthContext';

function Login() {
  // Access the auth context
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [viewPassword, setViewPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loginAttempted, setLoginAttempted] = useState(false);

  // Check if context is available
  useEffect(() => {
    console.log('Auth context in Login:', auth ? 'Available' : 'Not available');

    // Add an error handler specifically for this component
    const originalError = console.error;
    console.error = (...args) => {
      // Filter out "Host validation" related errors or irrelevant third-party errors
      if (
        args[0] &&
        typeof args[0] === 'string' &&
        (args[0].includes('Host validation') ||
          args[0].includes('Receiving end does not exist'))
      ) {
        return;
      }
      originalError.apply(console, args);
    };

    return () => {
      // Restore original console.error when component unmounts
      console.error = originalError;
    };
  }, [auth]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoginError(null);
        setLoginAttempted(true);
        console.log('Login attempt with:', { email: values.email });

        const response = await apiLogin(values);
        console.log('Login API response received:', response);

        // Extract user role from response for proper redirection
        let roleId = 3; // Default to regular user
        if (response.user && response.user.roleId) {
          roleId = response.user.roleId;
        } else if (response.roleId) {
          roleId = response.roleId;
        }
        console.log('Detected user role:', roleId);

        // Success Alert
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response?.message || 'Login successful!',
          showConfirmButton: false,
          timer: 1500,
        });

        // Handle auth with proper error checking
        if (auth && typeof auth.login === 'function') {
          console.log('Using AuthContext login with response data');
          const success = auth.login(response);

          if (!success) {
            console.error('Auth context login returned false');
            throw new Error('Failed to update authentication state');
          }

          console.log('Login successful, redirecting based on role');

          // Handle redirection based on role
          const roleRedirects = {
            1: '/admin',
            2: '/provider',
            3: '/',
          };

          // Navigate after a short delay to ensure the context is updated
          setTimeout(() => {
            const redirectPath = roleRedirects[roleId];
            if (redirectPath) {
              console.log(`Redirecting to ${redirectPath}`);
              navigate(redirectPath, { replace: true });
            } else {
              // Default to home page if role doesn't match
              console.log('Unknown role, redirecting to home');
              navigate('/', { replace: true });
            }
          }, 1500);
        } else {
          // Fallback if context is not available
          console.warn(
            'AuthContext login not available, using fallback storage'
          );
          saveUserToStorage(response);

          // Force reload as fallback
          setTimeout(() => {
            console.log('Using fallback reload method');
            window.location.reload();
          }, 1500);
        }
      } catch (error) {
        console.error('Detailed login error:', error);
        setLoginError(error.message || 'Login failed');

        // Enhanced Error Handling
        const errorMessage =
          error.response?.data?.message || 'An unexpected error occurred.';

        Swal.fire({
          position: 'center',
          icon: 'error',
          title: errorMessage,
          showConfirmButton: false,
          timer: 1500,
        });
      } finally {
        // Reset login attempted after a delay
        setTimeout(() => {
          setLoginAttempted(false);
        }, 2000);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col lg:flex-row h-screen"
    >
      {/* Left side image section */}
      <div className="hidden lg:flex h-full w-full lg:w-8/12">
        <img
          src="../../public/login_pic.jpg"
          alt="login visual"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right side login form section */}
      <div className="w-full lg:w-6/12 p-8 lg:p-12 flex flex-col justify-center">
        <div className="text-left mb-6">
          <h1 className="text-4xl font-bold">HELPIFY</h1>
          <p className="text-xs font-light tracking-widest mt-1">
            TRUSTED SERVICES AT YOUR FINGERTIPS.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="font-inter font-medium text-xl mb-7">
            Nice to see you
          </h2>

          {loginError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {loginError}
            </div>
          )}

          {/* Email input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2 ml-3">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Email or phone number"
              className={`w-full bg-gray-200 text-gray-700 placeholder-gray-500 rounded-lg py-3 px-4 border-none focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                formik.touched.email && formik.errors.email
                  ? 'ring-2 ring-red-500'
                  : ''
              }`}
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1 ml-3">
                {formik.errors.email}
              </div>
            )}
          </div>

          {/* Password input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2 ml-3">
              Password
            </label>
            <div className="relative">
              <input
                type={viewPassword ? 'text' : 'password'}
                placeholder="Enter password"
                className={`w-full bg-gray-200 text-gray-700 placeholder-gray-500 rounded-lg py-3 px-4 border-none focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                  formik.touched.password && formik.errors.password
                    ? 'ring-2 ring-red-500'
                    : ''
                }`}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1 ml-3">
                  {formik.errors.password}
                </div>
              )}
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setViewPassword((prev) => !prev)}
              >
                {formik.values.password && <ViewPasswordIcon />}
              </div>
            </div>
          </div>

          {/* Remember me and Forgot password */}
          <Link to="/auth/forget">
            <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
              <p className="text-[#007bff] cursor-pointer">Forgot password?</p>
            </div>
          </Link>

          {/* Sign in button */}
          <button
            type="submit"
            disabled={loginAttempted}
            className={`w-full h-10 ${
              loginAttempted ? 'bg-gray-400' : 'bg-[#007bff] hover:bg-[#0056b3]'
            } text-white font-medium rounded-lg text-sm mt-4 transition-colors`}
          >
            {loginAttempted ? 'Signing in...' : 'Sign in'}
          </button>

          {/* Divider */}
          <hr className="border-t border-gray-200 w-full my-4" />

          {/* Sign up link */}
          <div className="text-center mt-4 text-sm">
            <p>
              Don't have an account?
              <Link
                to="/auth/register"
                className="text-[#007bff] cursor-pointer ml-1"
              >
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
