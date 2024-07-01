import axios from 'axios';

import { API_ENDPOINTS, API_BASE_URL } from '../utils/constants';

const API = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const signin = (inputs) => API.post(`${API_ENDPOINTS.signup}`, inputs);
export const login = (inputs) => API.post(`${API_ENDPOINTS.login}`, inputs);
export const getuser = () => API.get(`${API_ENDPOINTS.getuser}`)