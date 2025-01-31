import axios from 'axios';
import environment from '../config/environment';

const apiClient = axios.create({
  baseURL: environment.nodeApiUrl, // Base URL of your backend API
  headers: {
    'Content-Type': 'application/json',
  },
 // withCredentials: true, // Ensures cookies are sent with the request
});

export default apiClient;
