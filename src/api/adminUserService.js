import axios from 'axios';
import environment from '../config/environment';

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
        console.log(response);
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
      console.log(response);
       return response.data ;
      
    } catch (error) {
       console.error("failed to fetch users : " , error);
       throw error ;
    }
  }