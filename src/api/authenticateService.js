import axios from 'axios';
import environment from '../config/environment';

const apiClient = axios.create({
    baseURL: environment.apiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const authenticateUser = async (payload) => {
    try {
        const response = await apiClient.post('/employee/authenticate', payload);
        return response.data;
    } catch (error) {
        console.error('Failed to authenticate user:', error);
        throw error;
    }
};

