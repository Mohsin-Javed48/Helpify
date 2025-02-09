import axios from "axios"
import { BASE_URL } from "../constants";

export const getAllServices = async () => {
    return axios.get(
        `${BASE_URL}/service/`,
        {
            headers: {
               
            }
        }
    ).then(res => res.data);
}