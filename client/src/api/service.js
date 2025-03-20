import axios from 'axios';
import { BASE_URL } from '../constants';

const getAllServices = async () => {
  return axios
    .get(`${BASE_URL}/service/`, {
      headers: {},
    })
    .then((res) => res.data);
};

export default getAllServices;
