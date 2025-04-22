import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchClinicsByDoctorId, fetchAllDoctors } from "../../../api/advertisementService";
import "./clinicDetails.scss";
import ToastMessage from "../../../constants/toastMessage";
import { ToastContainer } from "react-toastify";
import LoadingSpinner from "../../common/loadingSpinner";

const ClinicDetails = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [clinics, setClinics] = useState([]);
  const [filteredClinics, setFilteredClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(doctorId || "");
  const [doctorsLoading, setDoctorsLoading] = useState(true);
  const [clinicsLoading, setClinicsLoading] = useState(false); 
  const [searchTerm, setSearchTerm] = useState("");
  const [hasCheckedClinics, setHasCheckedClinics] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetchAllDoctors();
        setDoctors(response.doctors);
      } catch (error) {
        ToastMessage("Error fetching doctors");
        console.error(error);
      } finally {
        setDoctorsLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (!selectedDoctor) {
      setClinics([]);
      setFilteredClinics([]);
      setHasCheckedClinics(false);
      return;
    }

    const fetchClinics = async () => {
      setClinicsLoading(true);
      try {
        const response = await fetchClinicsByDoctorId(selectedDoctor);
        setClinics(response.clinics);
        setFilteredClinics(response.clinics);
        
        if (hasCheckedClinics && response.clinics.length === 0) {
          const selectedDoc = doctors.find(d => d.doctor_id === selectedDoctor);
          const doctorName = selectedDoc ? `${selectedDoc.first_name} ${selectedDoc.last_name}` : "this doctor";
          ToastMessage(`No clinic is registered on ${doctorName}'s name!`);
        }
        
        setHasCheckedClinics(true);
      } catch (error) {
        ToastMessage("Error fetching clinics");
        console.error(error);
      } finally {
        setClinicsLoading(false);
      }
    };
    fetchClinics();
  }, [selectedDoctor, doctors, hasCheckedClinics]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredClinics(clinics);
    } else {
      const filtered = clinics.filter(clinic =>
        clinic.clinic_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.zip_code.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClinics(filtered);
    }
  }, [searchTerm, clinics]);

  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;
    // Clear previous clinics immediately
    setClinics([]);
    setFilteredClinics([]);
    setSelectedDoctor(doctorId);
    setHasCheckedClinics(false);
    navigate(`/admin/ova2-etoken/clinic-details`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (doctorsLoading) {
    return <LoadingSpinner fullPage={true} />;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Clinic Details</h1>
      
      <div className="row mb-2 align-items-center">
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="doctorSelect">Select Doctor:</label>
            <select
              id="doctorSelect"
              className="form-control"
              value={selectedDoctor}
              onChange={handleDoctorChange}
            >
              <option value="">-- Select a Doctor --</option>
              {doctors.map((doctor) => (
                <option key={doctor.doctor_id} value={doctor.doctor_id}>
                  {doctor.first_name} {doctor.last_name} ({doctor.specialization_name})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="searchInput">Search Clinics:</label>
            <input
              id="searchInput"
              type="text"
              className="form-control"
              placeholder="Search by clinic name, address, city, state, or zip code"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <button 
            className="btn btn-primary w-100" 
            style={{ height: '38px' }}  
            onClick={() => navigate("/admin/ova2-etoken/add-clinic")}
          >
            Add Clinic
          </button>
        </div>
      </div>

      {clinicsLoading ? (
        <div className="d-flex justify-content-center my-5">
          <LoadingSpinner />
        </div>
      ) : (
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
            {filteredClinics.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  {selectedDoctor ? (clinicsLoading ? "Loading..." : "No clinics found") : "Please select a doctor"}
                </td>
              </tr>
            ) : (
              filteredClinics.map((clinic, index) => (
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
      )}
      <ToastContainer />
    </div>
  );
};

export default ClinicDetails;