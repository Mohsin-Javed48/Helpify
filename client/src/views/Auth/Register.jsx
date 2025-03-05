import React from 'react';
import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers';
// import * as Yup from 'yup';

import registerMen from '/src/assets/images/auth/image.png';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

// ✅ Validation Schema
// const validationSchema = Yup.object().shape({
//   firstName: Yup.string().required('First Name is required'),
//   lastName: Yup.string().required('Last Name is required'),
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   password: Yup.string()
//     .min(6, 'Password must be at least 6 characters')
//     .required('Password is required'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password')], 'Passwords must match')
//     .required('Confirm Password is required'),
// });

export default function Register() {
  const navigate = useNavigate();

  // ✅ Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ Handle Form Submission
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/auth/register',
        data
      );
      console.log(response.data);
      Swal.fire('Success', 'Registration successful!', 'success');
      navigate('/home');
    } catch (error) {
      Swal.fire(
        'Error',
        error.response?.data?.error || 'Registration failed!',
        'error'
      );
    }
  };

  return (
    <div className="flex justify-around items-center w-full bg-gray-100 p-4">
      {/* Right Section */}
      <div className="flex items-center border-4 border-black rounded-3xl shadow-lg bg-white">
        {/* Form Section */}
        <div className="p-6 rounded-l-3xl w-96">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* First Name and Last Name */}
            <div className="flex gap-3 mb-4">
              <div className="w-1/2">
                <label className="block font-semibold text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  {...register('firstName')}
                  placeholder="Enter your first name"
                  className="w-full p-3 mt-2 border rounded-md bg-gray-100 text-gray-800"
                />
                <p className="text-red-500 text-sm">
                  {errors.firstName?.message}
                </p>
              </div>

              <div className="w-1/2">
                <label className="block font-semibold text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  {...register('lastName')}
                  placeholder="Enter your last name"
                  className="w-full p-3 mt-2 border rounded-md bg-gray-100 text-gray-800"
                />
                <p className="text-red-500 text-sm">
                  {errors.lastName?.message}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="Enter your email"
                className="w-full p-3 border mt-2 rounded-md bg-gray-100 text-gray-800"
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register('password')}
                placeholder="Enter your password"
                className="w-full p-3 mt-2 border rounded-md bg-gray-100 text-gray-800"
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block font-semibold text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                {...register('confirmPassword')}
                placeholder="Re-enter your password"
                className="w-full p-3 border mt-2 rounded-md bg-gray-100 text-gray-800"
              />
              <p className="text-red-500 text-sm">
                {errors.confirmPassword?.message}
              </p>
            </div>

            {/* Submit and Links */}
            <div className="flex flex-col">
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Register
              </button>
              <div className="flex items-center">
                <hr className="flex-1 border-gray-300" />
                <span className="mx-2 text-gray-500">OR</span>
                <hr className="flex-1 border-gray-300" />
              </div>
              <Link
                to="/auth/login"
                className="py-2 px-4 bg-yellow-500 text-white text-center rounded-lg hover:bg-yellow-600 transition"
              >
                Login
              </Link>
            </div>
          </form>
        </div>

        {/* Illustration Section */}
        <div className="hidden md:block">
          <img
            src={registerMen}
            className="h-[41rem] object-contain rounded-r-3xl"
            alt="Register illustration"
          />
        </div>
      </div>
    </div>
  );
}
