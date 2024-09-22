import axios from 'axios';
import environment from '../config/environment';

const apiClient = axios.create({
    baseURL: environment.apiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});


export const createApplicant = async (applicant) => {
  try {
    const response = await apiClient.post(`applicant/create`, applicant);
    return response.data;
  } catch (error) {
    console.error('There was an error inserting the applicant!', error);
    throw error;
  }
};

export const fetchApplicants = async () => {
  try {
    const response = await apiClient.get('applicant/get');
    return response.data;
  } catch (error) {
    console.error('There was an error fetching the applicants!', error);
    throw error;
  }
};

export const deleteApplicant = async (id) => {
    try {
      const response = await apiClient.delete(`applicant/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error('There was an error deleting the applicant!', error);
      throw error;
    }
  };
