import axios from "axios"
import axiosClient from "./axios";
import { BASE_URL } from "../constants";

export const me = (token) => {
    return axios.get(
        `${BASE_URL}/auth/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    ).then(res => res.data);
}
export const login = (body) => {
    return axios.post(
        `${BASE_URL}/auth/login`,
        body
    ).then(res => res.data);
}

export const register = (body) => {
    return axios.post(
        `${BASE_URL}/auth/register`,
        body
    ).then(res => res.data);
}


export const updateProfile = (body) => {
    return axiosClient.put(
        `${BASE_URL}/auth/me`,
        body
    ).then(res => res.data);
};


export const refreshTokenAPI = (body) => {
    return axios.post(
        `${BASE_URL}/auth/refresh-token`,
        body
    ).then(res => res.data);

}

export const getUserById = (id) => {
    return axiosClient.get(
        `${BASE_URL}/auth/get-user-by-id/${id}`
    ).then(res => res.data);
}

export const changePassword = (body) => {
    return axiosClient.put(
        `${BASE_URL}/auth/me/password`,
        body
    ).then(res => res.data);
}

export const getProfile = (username) => {
    return axiosClient.get(
        `${BASE_URL}/auth/profile/${username}`
    ).then(res => res.data);
}


export const forgetPassword = (body) => {
    return axios.post(`${BASE_URL}/auth/forget-password`,
        body
    ).then(res => res.data)
}

export const resetPassword = (body) => {
    return axios.post(`${BASE_URL}/auth/reset-password`,
        body
    ).then(res => res.data)
}