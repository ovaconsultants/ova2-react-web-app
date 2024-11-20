import axios from 'axios';
import environment from '../config/environment';


const apiClient = axios.create({
    baseURL: environment.nodeApiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

// fetching Employee Names 
export const fecthingEmployeeNames = async ()=>{
    try {
        const response = await apiClient.get('employee/retrieve_employees');
        return response.data ;
      } catch (error) {
        console.log("error from fetching company types from the server ");
        throw error ;
      }
}

// Posting Employee SalaryData
export const postingEmployeeSalaryData = async (salaryData)=>{
  try {
    const response  = await apiClient.post('employee/postingEmployeeSalaryData' , {salaryData});
    return response.data ;
  } catch (error) {
    console.log("error from posting company data ");
    throw error ;
  }
}

// fetching salary for particular user on basis of registrgation id 
export const fetchSalaryData = async (registrationId) => {
  try {
    console.log("registration ID from client : " , registrationId);
    // Correct template string usage
    const response = await apiClient.get(`/employee/fetchSalaryData/${registrationId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("error from fetching salary data");
    throw error;
  }
};
