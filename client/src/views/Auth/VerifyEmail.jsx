import React, { useRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { verifyEmailOtp, resendRegistrationOtp } from '../../api/auth';
import Swal from 'sweetalert2';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const { login } = React.useContext(AuthContext);
  const params = new URLSearchParams(useLocation().search);
  const prefillEmail = params.get('email') || '';
  const registrationToken = params.get('token') || '';
  const [token, setToken] = useState(registrationToken);
  const [cooldown, setCooldown] = useState(0);

  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef([]);

  // Focus first empty box on load
  useEffect(() => {
    const firstEmpty = otpDigits.findIndex((d) => !d);
    if (firstEmpty >= 0 && inputsRef.current[firstEmpty]) {
      inputsRef.current[firstEmpty].focus();
    }
  }, []);

  const handleDigitChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return; // allow single digit only
    const next = [...otpDigits];
    next[index] = value;
    setOtpDigits(next);
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const text = (e.clipboardData.getData('text') || '')
      .replace(/\D/g, '')
      .slice(0, 6);
    if (!text) return;
    const next = text.split('');
    while (next.length < 6) next.push('');
    setOtpDigits(next);
    const firstEmpty = next.findIndex((d) => !d);
    const focusIndex = firstEmpty === -1 ? 5 : firstEmpty;
    inputsRef.current[focusIndex]?.focus();
    e.preventDefault();
  };

  const formik = useFormik({
    initialValues: { email: prefillEmail, otp: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      otp: Yup.string().length(6, '6-digit code').required('OTP is required'),
    }),
    onSubmit: async (values) => {
      try {
        const otp = otpDigits.join('');
        if (otp.length !== 6) {
          formik.setFieldError('otp', 'Enter all 6 digits');
          return;
        }
        const res = await verifyEmailOtp({
          email: values.email,
          otp,
          registrationToken: token,
        });
        if (res?.token?.token) {
          await login(res.token.token);
        }
        Swal.fire({
          icon: 'success',
          title: 'Email verified! Redirecting to Home...',
          timer: 1200,
          showConfirmButton: false,
        });
        navigate('/');
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: err.response?.data?.message || 'Verification failed',
        });
      }
    },
    enableReinitialize: true,
  });

  // Keep form value in sync with the inputs so validation passes
  useEffect(() => {
    const joined = otpDigits.join('');
    if (joined !== formik.values.otp) {
      formik.setFieldValue('otp', joined, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpDigits]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Verify your email
          </h2>
          <p className="text-gray-500 mt-1">
            Enter the 6‑digit code we sent to your email.
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 rounded-lg bg-gray-100 text-gray-800 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
              readOnly
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <div
              className="flex items-center justify-between gap-2"
              onPaste={handlePaste}
            >
              {otpDigits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleDigitChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-12 h-14 md:w-14 md:h-16 rounded-lg border border-gray-300 text-center text-xl md:text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#242D7D] focus:border-transparent"
                />
              ))}
            </div>
            <div className="flex items-center justify-between mt-3">
              <button
                type="button"
                disabled={cooldown > 0}
                onClick={async () => {
                  try {
                    const res = await resendRegistrationOtp({
                      registrationToken: token,
                    });
                    setToken(res.registrationToken);
                    setCooldown(30);
                    const interval = setInterval(() => {
                      setCooldown((c) => {
                        if (c <= 1) {
                          clearInterval(interval);
                          return 0;
                        }
                        return c - 1;
                      });
                    }, 1000);
                    Swal.fire({
                      icon: 'success',
                      title: 'Code resent',
                      timer: 1000,
                      showConfirmButton: false,
                    });
                  } catch (e) {
                    Swal.fire({
                      icon: 'error',
                      title:
                        e.response?.data?.message || 'Failed to resend code',
                    });
                  }
                }}
                className={`text-sm ${cooldown > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#242D7D]'}`}
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend code'}
              </button>
              <span className="text-xs text-gray-400">
                Code expires in 10 minutes
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#242D7D] hover:brightness-110 text-white font-semibold shadow"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}
