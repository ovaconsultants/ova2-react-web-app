import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchClinicsByDoctorId } from "../../../api/advertisementService";
import "./clinicDetails.scss";
import ToastMessage from "../../../constants/toastMessage";
import { ToastContainer } from "react-toastify";

const ClinicDetails = () => {
  const { doctorId } = useParams();
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await fetchClinicsByDoctorId(doctorId);
        setClinics(response.clinics);
      } catch (error) {
        ToastMessage("Error fetching clinics");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchClinics();
  }, [doctorId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Clinic Details</h1>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Clinic Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Status</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {clinics.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">No data available</td>
            </tr>
          ) : (
            clinics.map((clinic, index) => (
              <tr key={clinic.clinic_id}>
                <td>{index + 1}</td>
                <td>{clinic.clinic_name}</td>
                <td>{clinic.address}</td>
                <td>{clinic.city}</td>
                <td>{clinic.state}</td>
                <td>{clinic.zip_code}</td>
                <td>{clinic.is_active === "Y" ? "Active" : "Inactive"}</td>
                <td>{new Date(clinic.created_date).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
       <ToastContainer />
    </div>
  );
};

export default ClinicDetails;