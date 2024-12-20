import axios from 'axios';
import environment from '../config/environment'; 

const apiClient = axios.create({
    baseURL: environment.nodeApiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true // This ensures cookies (including the JWT in authToken) are included with each request
}); 

export default apiClient;

