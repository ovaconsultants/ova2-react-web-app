import axios from 'axios';
import environment from '../config/environment';

const apiClient = axios.create({
  baseURL: environment.nodeApiUrl, 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});


export const dotNetApiClient = axios.create({
  baseURL: environment.dotNetApiUrl, // http://localhost:3002
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default apiClient;