import apiClient from '../apiClient/apiClient';

// fetching registration function 
export const fetchRegistrationTypes = async ()=>{
  try {
          const response = await apiClient.get('users/registrationType')
          return response.data.message ;
  }
  catch(error){
    console.error('Failed to fetch registration types', error);
        throw error;
  }
};

// handling signUpform data function 
export const registerUser =  async (userData)=> {
  try {
    const response = await apiClient.post('users/registerUser', userData);
    return response ;
  } catch (error) {
    console.error('Failed to register new user', error);
    throw error;
  }
}