import axios from 'axios';
import environment from '../config/environment';

const apiClient = axios.create({
    baseURL: environment.nodeApiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const createJobPosting = async (jobData) => {
    try {
        const response = await apiClient.post('/jobs/job-posting', jobData);
        return response.data;
    } catch (error) {
        console.error('Failed to create job posting:', error);
        throw error;
    }
};

export const updateJobPosting = async (jobId, jobData) => {
    try {
        const response = await apiClient.put(`/jobposting/update/${jobId}`, jobData);
        return response.data;
    } catch (error) {
        console.error('Failed to update job posting:', error);
        throw error;
    }
};

export const deleteJobPosting = async (jobId, updatedBy) => {
    try {
        const response = await apiClient.delete(`/jobposting/delete/${jobId}`, {
            params: { updatedBy }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to delete job posting:', error);
        throw error;
    }
};

export const getJobPostings = async (country) => {
    try {
        const response = await apiClient.get(`jobs/retrieve-job-postings/?country=${country}`);
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch job postings:', error);
        throw error;
    }
};
export const getJobPostingById = async (jobId) => {
    try {
        const response = await apiClient.get(`/jobposting/getById?jobId=${jobId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch job posting:', error);
        throw error;
    }
};

