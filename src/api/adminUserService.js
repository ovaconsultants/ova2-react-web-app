
import apiClient from '../apiClient/apiClient';

// Authenticating users 
export const authenticate_user = async (payload) => {
    try {
        const response = await apiClient.post('/users/authenticateAdminUser' , payload);
        console.log("response from the authenticate user : " , response)
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

  // updating user technology
  export const updateUserTechnologies = async (id , technologyIds) => {
    console.log("this is the id and technologyIds from updateUserTechnologies function " , id , technologyIds)
    try {
       const response = await apiClient.put('/users/updateUserTechnologies', {id , technologyIds}) ;
       console.log("response from updating the user : " , response)
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
    console.log("response from getUserDetails function " , response);
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


export const sendMail = async (userName) => {
  try {
    const  payload = { 
        "to": userName,
        "subject": "Password recovery  Email from ova2consultancies",
        "text": "This is your password generated : ",
        "html": "<p><strong>Please do not share it with any one </strong></p>"
      }
      const response = await apiClient.post('/send-email' , payload);
      return response.data ;
     
  } catch (error) {
      console.error('failed to authenticate user');
      throw error ;
  }
}


  // posting the compnay details to server 
  export const postContactQuery = async (query_data) => {
    try {
       const response = await apiClient.post('/contact-query' ,  query_data);
       console.log(query_data)
       return response ;
    } catch (error) {
      console.log("error occured during the posting the contact data");
      throw error ;
    }
      }
    
  // getting all the queries from the database 
  export const fetchAllQueries = async ()=> {
    try {
      const response  = await apiClient.get('/getAllQueries')
      return response.data ;
    } catch (error) {
      console.log("error occured during the fetching all the queries");
      throw error ;
    }
  }    

  // posting enrolled course Details 
  export const postEnrollmentCourseDetails = async (enrollData)=> {
    try {
      const response  = await apiClient.post('users/registerEnrollment' , enrollData);
      const respons  = await apiClient.get('users/fetchAllEnrollments');
      console.log("fetched data from the api for all enrollments " , respons)
     
      return response.data ;
    } catch (error) {
      console.log("error occured during the fetching all the queries");
      throw error ;
    }
  }    

// fetching all the employees 
export const fetchingAllEnrollments = async ()=> {
  try {
    const response  = await apiClient.get('users/fetchAllEnrollments');
    console.log("response for all the enrollments "  , response);
    return response.data ;
  } catch (error) {
    console.log("error occured during the fetching all the queries");
    throw error ;
  }
} 
export const fetchSoftwareTechnologies = async () => {
  try {
    const response = await apiClient.get('users/fetchtechnologies');
    console.log(response); 
    return response.data;  
  } catch (error) {
    console.log("Error occurred while fetching software technologies");
    throw error; 
  }
};

export const fetchUserTechnologies = async (_registration_id) => {  
  try {
    const response = await apiClient.get(`users/fetchUserTechnologies/${_registration_id}`);
    console.log(response); 
    return response;  
  } catch (error) {
    console.log("Error occurred while fetching user technologies");
    throw error; 
  }
}  

export const postExceptionLogs = async (logData) => {
  try {
    const response = await apiClient.post('/exception/insert-exception-logs', logData);
    console.log(logData);
    return response;
  } catch (error) {
    console.log("Error occurred while posting the exception log");
    throw error;
  }
};


export const getExceptionLogs = async (severity, source) => { 
  try {
    // Prepare query parameters for the request.
    const params = {};
    if (severity) params.severity = severity;
    if (source) params.source = source;

    // Make a GET request with query parameters.
    const response = await apiClient.get('/exception/get-exception-logs', { params });

    console.log('Fetched exception logs:', response.data);
    return response.data; // Return the data from the response.
  } catch (error) {
    console.error('Error occurred while fetching the exception logs:', error);
    throw error; // Propagate the error to handle it in the calling code.
  }
};

export const postExcelUserFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post("users/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Response from the Excel file upload:', response);
    return response.data;
  } catch (error) {
    console.error('Error occurred during the Excel file upload:', error);
    throw error;
  }
};



