import axios from 'axios';
import { BASE_URL } from '../constants';

const getServicesByCategory = async (category) => {
  return axios
    .get(`${BASE_URL}/services?category=${category}`, {
      headers: {},
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error fetching services:', error);
      return { message: 'Error fetching services' };
    });
};

export default getServicesByCategory;
