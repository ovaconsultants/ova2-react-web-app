import { dotNetApiClient } from "../apiClient/apiClient";

export const postAdvertisement = async (advertisementData) => {
    try {
      const response = await dotNetApiClient.post("/advertisement/insertAdvertisement", advertisementData  );
      return response.data;
    } catch (error) {
      console.error("Error occurred while posting the advertisement data");
      throw error;
    }
  };

  export const toggleDoctorAccount = async (data) => {
    try {
      const response = await dotNetApiClient.put("/doctor/doctorAccountToggle", data);
      return response.data;
    } catch (error) {
      console.error("Error toggling doctor account status");
      throw error;
    }
  };

export const fetchActiveAdvertisements = async (doctor_id, clinic_id) => {
    try {
      const response = await dotNetApiClient.get("/advertisement/fetchActiveAdvertisements", {
        params: { doctor_id, clinic_id },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching active advertisements:", error);
      throw error;
    }
};

export const fetchAdvertisements = async (doctor_id, clinic_id, filter_type = "ALL") => {
  try {
    const response = await dotNetApiClient.get("/advertisement/fetchAdvertisements", {
      params: { doctor_id, clinic_id, filter_type },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching advertisements:", error);
    throw error;
  }
};

  export const fetchClinicsByDoctorId = async (doctorId) => {
    try {
      const response = await dotNetApiClient.get(`/doctor/fetchClinicsByDoctorId`, {
        params: { doctor_id: doctorId }, 
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching clinics by doctor ID");
      throw error;
    }
  };

  export const insertAdvertisementPayment = async (paymentData) => {
    try {
      const response = await dotNetApiClient.post("/advertisement-payment/insertAdvertisementPayment", paymentData);
      return response.data;
    } catch (error) {
      console.error("Error inserting advertisement payment:", error);
      throw error;
    }
  };
  

  export const updateAdvertisement = async (data) => {
    try {
      const response = await dotNetApiClient.put("/advertisement/updateAdvertisement", data);
      return response.data;
    } catch (error) {
      console.error("Error updating advertisement:", error);
      throw error;
    }
  };

  export const fetchAdvertisementPaymentsByAdId = async (adId) => {
    try {
      const response = await dotNetApiClient.get("/advertisement-payment/fetchAdvertisementPaymentsByAdId",
        {
          params: { ad_id: adId },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching advertisement payments by ad ID:", error);
      throw error;
    }
  };

    export const updateAdvertisementPayment = async (data) => {
      try {
        const response = await dotNetApiClient.put("/advertisement-payment/updateAdvertisementPayment", data);
        return response.data;
      } catch (error) {
        console.error("Error updating advertisement payment:", error);
        throw error;
      }
    };

    export const fetchAllExceptions = async () => {
      try {
        const response = await dotNetApiClient.get("/exception/fetchAllExceptions");
        return response.data;
      } catch (error) {
        console.error("Error fetching exceptions");
        throw error;
      }
    };

    export const fetchAccounts = async () => {
      try {
        const response = await dotNetApiClient.get("/registration/accounts");
        return response.data;
      } catch (error) {
        console.error("Error fetching accounts");
        throw error;
      }
    };
    
    export const fetchSpecializations = async (account_id) => {
      try {
        const response = await dotNetApiClient.get("/registration/specializations", {
          params: { account_id }
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching specializations");
        throw error;
      }
    };

    export const insertDoctor = async (doctorData) => {
      try {
        const response = await dotNetApiClient.post("/doctor/addDoctor", doctorData);
        return response.data;
      } catch (error) {
        console.error("Error inserting doctor:", error);
        throw error;
      }
    };

    export const insertDoctorClinicSchedule = async (scheduleData) => {
      try {
        const response = await dotNetApiClient.post("/doctor/schedule", scheduleData);
        return response.data;
      } catch (error) {
        console.error("Error inserting doctor clinic schedule:", error);
        throw error;
      }
    };

    export const insertClinic = async (clinicData) => {
      try {
        const response = await dotNetApiClient.post("/doctor/addClinic", clinicData);
        return response.data;
      } catch (error) {
        console.error("Error inserting clinic:", error);
        throw error;
      }
    };

    export const fetchAllDoctors = async (doctor_id = null) => {
      try {
        const response = await dotNetApiClient.post("/doctor/fetchAllDoctors", {
          doctor_id: doctor_id || undefined 
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching doctors");
        throw error;
      }
    };
      
    export const fetchDoctorById = async ({ doctor_id }) => {
      try {
        const response = await dotNetApiClient.post("/doctor/fetchAllDoctors", {
          doctor_id,
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching doctor by ID");
        throw error;
      }
    };