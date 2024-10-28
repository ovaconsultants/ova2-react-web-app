import axios from 'axios';
import environment from '../config/environment';
import { companyName } from '../constants/commonConstant';

const apiClient = axios.create({
    baseURL: environment.nodeApiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});
  
  
  // fetching all the company Types from databse 
  export const fetchCompanyTypes  = async ()=>{
    try {
      const response = await apiClient.get('company/fetchCompayTypes');
      return response.data ;
    } catch (error) {
      console.log("error from fetching company types from the server ");
      throw error ;
    }
  }

  // fetching all the companies from the databse 
  export  const getCompanies = async ()=>{
    try {
          const response = await apiClient.get('company/fetchCompanies');
          return response.data ;
    }catch(error){
      console.log("error from fetching companies from the server ");
      throw error ;
    }
  }

  // fecthing compnay with the companyID 
  export const getCompanyDetails = async (companyId) => {
    try {
      const response = await apiClient.get(`/company/getCompanyDetails/${companyId}`);
      return response.data; // Return the company details
    } catch (error) {
      console.log("Error from fetching companies from the server:", error);
      throw error;
    }
  };
  
  
  // posting the compnay details to server 
 export const postCompanyDetails = async (companyData) => {
try {
   const response = await apiClient.post('company/postCompanyData' , companyData);
   return response ;
} catch (error) {
  console.log("error occured during the posting the company data");
  throw error ;
}
  }


// updating company data to server 
export const updateCompanyDetails = async(companyId , companyData) => {
 try {
  const response = await apiClient.put('/company/updateCompanyData' , {companyId , companyData});
  return response.data ;
 } catch (error) {
  console.log("error ocuured during updating a company ");
    throw error ;
  
 }
}
