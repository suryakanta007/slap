import axios from 'axios'

const BASE_URL = import.meta.env.MODE = "development" ? "http://localhost:7000/api":'https://slap-backend-rho.vercel.app/api';

export const axiosInstance   = axios.create({
    baseURL: BASE_URL,
    withCredentials:true,
})
