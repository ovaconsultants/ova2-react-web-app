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
      console.log("rsponse from updating the user : " , response)
      return response ;
       }
 catch (error){
    console.error("failed to update the user : ",  error);
    throw error ;
    };
  }

  // fetching all the roles from the database 
  export const fetchRoles = async()=>{
    try {
      const response = await apiClient.get('users/fetchRoles');
       return response.data ;
      
    } catch (error) {
       console.error("failed to fetch company : " , error);
       throw error ;
    }
  }

// fetching user with userId 
export const getUserDetails = async (userId) => {
  try {
    const response = await apiClient.get(`/users/fetchUserWithId/${userId}`); 
    return response.data;  
  } catch (error) {
    console.log('An error occurred while fetching data from the server:', error);
    throw error;
  }
};

export const deleteUser = async (registration_id)=> {
  try {
    const response = await apiClient.post('/users/deleteUser' , {registration_id})
    console.log("this is response " , response);  
    return response.data;  
  } catch (error) {
    console.log('An error occurred while fetching data from the server:', error);
    throw error;
  }
}

