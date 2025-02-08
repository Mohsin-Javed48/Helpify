import axios from 'axios';
import { getUser, setUser } from '../utills/user';
import { refreshTokenAPI } from './auth';


const instance = axios.create();

// Function to set token in request headers
export const setAuthToken = (token) => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
};

// Function to refresh token
const refreshToken = async () => {
  try {
    const user = getUser(); // Assuming you store the user data in localStorage
    if (!user) {
      return;
    }
    const refreshToken = user.refreshToken; // Assuming you store the refresh token along with the access token
    const response = await refreshTokenAPI({ refreshToken }); // Implement your refresh token API call
    const newToken = response.data.token;
    setUser(response.data); // Update the token in localStorage or state
    setAuthToken(newToken); // Set the new token in request headers
    return newToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    // Handle token refresh failure
  }
};

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("🚀 ~ error:", error)
    const originalRequest = error.config;

    // If error response is 401 and request has not been retried yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Refresh the token
      const newToken = await refreshToken();

      // If token is refreshed successfully, retry the original request
      if (newToken) {
        originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
        return instance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
