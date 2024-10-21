import axios from 'axios';
import environment from '../config/environment';
import { companyName } from '../constants/commonConstant';


const apiClient = axios.create({
    baseURL: environment.nodeApiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Authenticating users 
export const authenticate_user = async (payload) => {
    try {
        const response = await apiClient.post('/users/authenticateAdminUser' , payload);
        return response.data ;
       
    } catch (error) {
        console.error('failed to authenticate user');
        throw error ;
    }
}

// API function to fetch users
export const fetchUsers = async () => {
    try {
      const { data } = await apiClient.get('users/fetchUsers');
      return data.users; 
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error; 
    }
  };
  
  // update user function  
  export const updateUser = async (id , userNewData) => {
   try {
      const response = await apiClient.put('users/updateUser', {id , userNewData}) ;
      return response ;
       }
 catch (error){
    console.error("failed to update the user : ",  error);
    throw error ;
    };
  }

  // fetching all the roles from the databse 
  export const fetchRoles = async()=>{
    try {
      const response = await apiClient.get('users/fetchRoles');
       return response.data ;
      
    } catch (error) {
       console.error("failed to fetch users : " , error);
       throw error ;
    }
  }

  // fetching all the company Types from databse 
  export const fetchCompanyTypes  = async ()=>{
    try {
      const response = await apiClient.get('users/fetchCompayTypes');
      return response.data ;
    } catch (error) {
      console.log("error from fetching company types from the server ");
      throw error ;
    }
  }

  // fetching all the companies from the databse 
  export  const getCompanies = async ()=>{
    try {
          const response = await apiClient.get('users/fetchCompanies');
          return response.data ;
    }catch(error){
      console.log("error from fetching companies from the server ");
      throw error ;
    }
  }

  // fecthing compnay with the companyID 
  export const getCompanyDetails = async (companyId) => {
    try {
      const response = await apiClient.get(`/users/getCompanyDetails/${companyId}`);
      return response.data; // Return the company details
    } catch (error) {
      console.log("Error from fetching companies from the server:", error);
      throw error;
    }
  };
  
  
  // posting the compnay details to server 
 export const postCompanyDetails = async (companyData) => {
try {
   const response = await apiClient.post('users/postCompanyData' , companyData);
   return response ;
} catch (error) {
  console.log("error occured during the posting the company data");
  throw error ;
}
  }


// updating company data to server 
export const updateCompanyDetails = async(companyId , companyData) => {
 try {
  const response = await apiClient.put('/users/updateCompanyData' , {companyId , companyData});
  return response.data ;
 } catch (error) {
  console.log("error ocuured during updating a company ");
    throw error ;
  
 }
}