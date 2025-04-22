// src/hooks/useDoctors.js
import { useState, useEffect } from 'react';
import { fetchAllDoctors } from '../api/advertisementService';
import ToastMessage from '../constants/toastMessage';

const useDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all doctors
  const fetchDoctors = async (doctorId = null) => {
    try {
      setLoading(true);
      const response = await fetchAllDoctors(doctorId);
      setDoctors(response.doctors || []);
      setError(null);
    } catch (err) {
      setError(err);
      ToastMessage.error("Error fetching doctors");
      console.error("Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initialize with all doctors
  useEffect(() => {
    fetchDoctors();
  }, []);

  // Get doctor by ID
  const getDoctorById = (id) => {
    return doctors.find(doctor => doctor.doctor_id === id);
  };

  // Get dropdown options
  const getDropdownOptions = () => {
    return doctors.map(doctor => ({
      value: doctor.doctor_id,
      label: `${doctor.first_name} ${doctor.last_name} (${doctor.specialization_name})`
    }));
  };

  // Get active doctors dropdown options
  const getActiveDoctorsDropdownOptions = () => {
    return doctors
      .filter(doctor => doctor.is_active === "Y")
      .map(doctor => ({
        value: doctor.doctor_id,
        label: `${doctor.first_name} ${doctor.last_name} (${doctor.specialization_name})`
      }));
  };

  return {
    doctors,
    loading,
    error,
    fetchDoctors,
    getDoctorById,
    getDropdownOptions,
    getActiveDoctorsDropdownOptions,
    refreshDoctors: () => fetchDoctors()
  };
};

export default useDoctors;