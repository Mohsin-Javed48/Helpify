/** @format */

import { useState } from 'react';
import Google_icon from '../../assets/Google_icon';
import { FaEye as ViewPasswordIcon } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import alert for better UI

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [viewPassword, setViewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      console.log('📤 Sending Login Request:', data);

      const response = await axios.post(
        'http://127.0.0.1:8000/auth/login',
        data
      );

      console.log('✅ Login Success:', response.data);

      // Save token in localStorage
      localStorage.setItem('token', response.data.token);

      // Show success message
      Swal.fire('Success!', 'Login successful!', 'success');

      // Redirect to Home page
      navigate('/home');
    } catch (error) {
      console.error('❌ Login Failed:', error.response?.data || error.message);

      // Handle errors and show alerts
      if (error.response?.status === 404) {
        Swal.fire('Error', 'User not found! Please register.', 'error');
      } else if (error.response?.status === 400) {
        Swal.fire('Error', 'Incorrect password! Please try again.', 'error');
      } else {
        Swal.fire(
          'Error',
          'An error occurred. Please try again later.',
          'error'
        );
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col lg:flex-row h-screen"
    >
      {/* Left side image section */}
      <div className="hidden lg:flex h-full w-full lg:w-8/12">
        <img
          src="../../public/login_pic.jpg"
          alt="image not found"
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

          {/* Email input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2 ml-3">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Email or phone number"
              className="w-full bg-gray-200 text-gray-700 placeholder-gray-500 rounded-lg py-3 px-4 border-none focus:outline-none focus:ring-2 focus:ring-gray-300"
              {...register('email', {
                required: 'Email is required',
                maxLength: 50,
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
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
                className="w-full bg-gray-200 text-gray-700 placeholder-gray-500 rounded-lg py-3 px-4 border-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                {...register('password', {
                  required: 'Password is required',
                  minLength: 6,
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setViewPassword((prev) => !prev)}
              >
                {password && <ViewPasswordIcon />}
              </div>
            </div>
          </div>

          {/* Forgot password */}
          <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
            <button
              className="text-[#007bff] cursor-pointer"
              onClick={() => navigate('/auth/forget')}
            >
              Forgot password?
            </button>
          </div>

          {/* Sign in button */}
          <button
            type="submit"
            className="w-full h-10 bg-[#007bff] text-white font-medium rounded-lg text-sm mt-4"
          >
            Sign in
          </button>

          {/* Divider */}
          <hr className="border-t border-gray-200 w-full my-4" />

          {/* Google sign-in button */}
          <button className="w-full h-10 bg-[#303030] text-white font-normal rounded-lg flex justify-center items-center text-sm">
            <Google_icon className="mr-2" /> Or sign in with Google
          </button>

          {/* Sign up link */}
          <div className="text-center mt-4 text-sm ">
            <p>
              Don’t have an account?{' '}
              <Link
                to="/auth/register"
                className="text-[#007bff] cursor-pointer"
              >
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginPage;
