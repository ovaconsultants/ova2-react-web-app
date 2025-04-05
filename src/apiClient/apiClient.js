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
  baseURL: environment.etokenApiUrl, 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


dotNetApiClient.interceptors.request.use(config => {
  console.log('Request URL:', config.baseURL + config.url);
  return config;
});

export default apiClient;