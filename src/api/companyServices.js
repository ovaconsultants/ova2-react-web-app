import apiClient from '../apiClient/apiClient';
  
  // fetching all the company Types from databse 
  export const fetchCompanyTypes  = async ()=>{
    try {
      const response = await apiClient.get('company/fetchCompayTypes');
      console.log("response for company types :" , response.data);
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

// fetching communication mediums 
export const fetchCommunicationMediums = async() => {
  try {
   const response = await apiClient.get('/company/fetchCommunicationMediums');
   console.log(response);
   return response.data ;
  } catch (error) {
   console.log("error ocuured during updating a company ");
     throw error ;
   
  }
 }

// Client-side deleteCompany function (using POST)
export const deleteCompany = async (companyId) => {
  console.log("Deleting company with ID:", companyId);
  try {
    const response = await apiClient.post('/company/deleteCompany', { companyId });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error occurred while deleting the company");
    throw error;
  }
};

export const fetchAllEmployeeAllocations = async () => {
  try {
    const response = await apiClient.get('/company/fetchAllEmployeeAllocations');
    console.log(response);
    return response.data ;
   } catch (error) {
    console.log("error ocuured during updating a company ");
      throw error ;
    
   }
}

  // posting the compnay details to server 
  export const postContactQuery = async (query_data) => {
    try {
       const response = await apiClient.post('company/postCompanyData' , query_data);
       return response ;
    } catch (error) {
      console.log("error occured during the posting the company data");
      throw error ;
    }
      }