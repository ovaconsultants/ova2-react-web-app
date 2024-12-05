import apiClient from '../apiClient/apiClient';

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
export const fetchSalaryData = async (registrationId, year) => {
  try {
    console.log("registration ID from client:", registrationId, "year:", year);
    const response = await apiClient.get(`/employee/fetchSalaryData/${registrationId}/${year}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching salary data");
    throw error;
  }
};


export const fetchPaySlipYears = async (employeeId) => {
  try {
    console.log("registration ID from client : " , employeeId);
    const response = await apiClient.get(`/employee/fetchEmployeeSalaryYears/${employeeId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("error from fetching salary data");
    throw error;
  }
}