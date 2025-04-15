import React, { useState, useEffect } from 'react';
import { fetchAllDoctors, insertClinic } from '../../../api/advertisementService';
import { ToastContainer, toast } from "react-toastify";
import LoadingSpinner from '../../common/loadingSpinner';

const AddClinic = () => {
  const [formData, setFormData] = useState({
    clinic_name: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    doctor_id: '',
    created_by: 'Receptionist' 
  });

  const [formErrors, setFormErrors] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // For initial doctors loading

  // Fetch doctors on component mount
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const response = await fetchAllDoctors();
        setDoctors(response.doctors || []);
      } catch (error) {
        console.error("Error loading doctors:", error);
        toast.error("Failed to load doctors");
      } finally {
        setIsLoading(false);
      }
    };
    loadDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.clinic_name.trim()) errors.clinic_name = "Clinic name is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.state.trim()) errors.state = "State is required";
    if (!formData.zip_code.trim()) errors.zip_code = "Zip code is required";
    if (!formData.doctor_id) errors.doctor_id = "Please select a doctor";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await insertClinic(formData);
      toast.success(response.message);
      // Reset form after success
      setFormData({
        clinic_name: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        doctor_id: '',
        created_by: 'Receptionist'
      });
    } catch (error) {
      console.error("Error adding clinic:", error);
      toast.error(error.response?.data?.message || "Failed to add clinic");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner fullPage={true} />;
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-white border-bottom">
          <h2 className="mb-0">Add New Clinic</h2>
        </div>
        <div className="card-body">
          {isSubmitting && <LoadingSpinner />}
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              {/* Doctor Dropdown - Left Column */}
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label className="form-label fw-bold">Doctor</label>
                  <select
                    name="doctor_id"
                    value={formData.doctor_id}
                    onChange={handleChange}
                    className={`form-control ${formErrors.doctor_id ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select a Doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.doctor_id} value={doctor.doctor_id}>
                        {doctor.first_name} {doctor.last_name}
                      </option>
                    ))}
                  </select>
                  {formErrors.doctor_id && (
                    <div className="invalid-feedback">
                      {formErrors.doctor_id}
                    </div>
                  )}
                </div>
              </div>

              {/* Clinic Name - Right Column */}
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label className="form-label fw-bold">Clinic Name</label>
                  <input
                    type="text"
                    name="clinic_name"
                    value={formData.clinic_name}
                    onChange={handleChange}
                    className={`form-control ${formErrors.clinic_name ? 'is-invalid' : ''}`}
                  />
                  {formErrors.clinic_name && (
                    <div className="invalid-feedback">
                      {formErrors.clinic_name}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Address - Full Width */}
            <div className="mb-3">
              <div className="form-group">
                <label className="form-label fw-bold">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`form-control ${formErrors.address ? 'is-invalid' : ''}`}
                />
                {formErrors.address && (
                  <div className="invalid-feedback">
                    {formErrors.address}
                  </div>
                )}
              </div>
            </div>

            {/* City, State, Zip Code - Equal Width */}
            <div className="row mb-4">
              <div className="col-md-4 mb-3">
                <div className="form-group">
                  <label className="form-label fw-bold">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`form-control ${formErrors.city ? 'is-invalid' : ''}`}
                  />
                  {formErrors.city && (
                    <div className="invalid-feedback">
                      {formErrors.city}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <div className="form-group">
                  <label className="form-label fw-bold">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`form-control ${formErrors.state ? 'is-invalid' : ''}`}
                  />
                  {formErrors.state && (
                    <div className="invalid-feedback">
                      {formErrors.state}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-4 mb-3">
                <div className="form-group">
                  <label className="form-label fw-bold">Zip Code</label>
                  <input
                    type="text"
                    name="zip_code"
                    value={formData.zip_code}
                    onChange={handleChange}
                    className={`form-control ${formErrors.zip_code ? 'is-invalid' : ''}`}
                  />
                  {formErrors.zip_code && (
                    <div className="invalid-feedback">
                      {formErrors.zip_code}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button - Full Width */}
            <div className="d-grid">
              <button 
                type="submit" 
                className="btn btn-primary btn-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Adding Clinic...
                  </>
                ) : 'Add Clinic'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddClinic;