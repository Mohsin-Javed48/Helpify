import React from 'react';

import forgetIllustration from '/src/assets/images/auth/image.png';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Forget() {
  const { token } = useParams();
  const navigate = useNavigate();

  

  return (
    <div className="flex justify-around items-center h-full w-full min-h-screen bg-gray-100 p-4">
      {/* Left Section */}
      <div className="flex flex-col items-center gap-5 text-center">
        <div></div>
        <p className="text-lg font-bold text-gray-800">
          {token ? (
            'Reset Your Password'
          ) : (
            <>
              Did you forget <br /> your Password
            </>
          )}
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center border-4 border-gray-800  rounded-3xl shadow-lg bg-white ">
        {/* Form Section */}
        <div className="p-6 flex flex-col justify-center bg-white sm:rounded-r-3xl  rounded-l-3xl w-80 md:h-96">
          <h3 className="text-center text-xl font-semibold mb-4">
            {token ? 'Reset Password' : 'Forget Password'}
          </h3>

          {token ? (
            <form className="space-y-4">
              {/* New Password Field */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block font-semibold mb-1"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter new password"
                  className="w-full p-2 border rounded "
                />

                <p className="text-red-500 text-sm mt-1"></p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block font-semibold mb-1"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  className="w-full p-2 border rounded "
                />

                <p className="text-red-500 text-sm mt-1"></p>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Reset Password
              </button>
            </form>
          ) : (
            <form className="space-y-4">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block font-semibold mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border rounded"
                />

                <p className="text-red-500 text-sm mt-1"></p>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Forget Password
              </button>

              <div className="flex items-center ">
                <hr className="flex-1" />
                <span className="px-2 text-gray-500">OR</span>
                <hr className="flex-1" />
              </div>

              <Link to="/auth/login">
                <button
                  type="submit"
                  className="w-full py-2 bg-yellow-500 text-white text-center rounded-lg hover:bg-yellow-600 transition"
                >
                  Login
                </button>
              </Link>
            </form>
          )}
        </div>

        {/* Illustration Section */}
        <div className="hidden md:block">
          <img
            src={forgetIllustration}
            className="h-96 object-contain rounded-r-3xl"
            alt="Forget illustration"
          />
        </div>
      </div>
    </div>
  );
}
