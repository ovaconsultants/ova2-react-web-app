import apiClient from '../apiClient/apiClient';

export const createApplicant = async (applicant) => {
  try {
    const response = await apiClient.post(`/applicant/job-applicant/create`, applicant);
    return response.data;
  } catch (error) {
    console.error('There was an error inserting the applicant!', error);
    throw error;
  }
};

export const fetchApplicants = async () => {
  try {
    const response = await apiClient.get('/applicant/job-applicant/get');
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
