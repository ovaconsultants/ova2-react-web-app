import React, { useState, useEffect } from 'react';
import { fetchAllDoctors, insertClinic } from '../../../api/advertisementService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetchAllDoctors();
        setDoctors(response.doctors || []);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error("Error fetching doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.clinic_name.trim()) errors.clinic_name = 'Clinic name is required';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.state.trim()) errors.state = 'State is required';
    if (!formData.zip_code.trim()) errors.zip_code = 'Zip code is required';
    if (!formData.doctor_id) errors.doctor_id = 'Please select a doctor';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Convert doctor_id to number if backend expects it
      const dataToSend = {
        ...formData,
        doctor_id: Number(formData.doctor_id) || formData.doctor_id
      };

      console.log("Submitting data:", dataToSend); // Debug log

      const response = await insertClinic(dataToSend);
      
      if (response.success) {
        toast.success(response.message || 'Clinic added successfully');
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
      } else {
        toast.error(response.message || 'Failed to add clinic');
      }
    } catch (error) {
      console.error('AddClinic::handleSubmit - Error:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to add clinic');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
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
              {/* Doctor Selection */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Select Doctor *</label>
                <select
                  className={`form-control ${formErrors.doctor_id ? 'is-invalid' : ''}`}
                  value={formData.doctor_id}
                  onChange={handleChange}
                  name="doctor_id"
                  required
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doctor) => (
                    <option 
                      key={doctor.doctor_id} 
                      value={doctor.doctor_id}
                    >
                      {doctor.first_name} {doctor.last_name}
                      {doctor.specialization_name && ` (${doctor.specialization_name})`}
                    </option>
                  ))}
                </select>
                {formErrors.doctor_id && (
                  <div className="invalid-feedback">{formErrors.doctor_id}</div>
                )}
              </div>

              {/* Clinic Name */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Clinic Name *</label>
                <input
                  type="text"
                  name="clinic_name"
                  value={formData.clinic_name}
                  onChange={handleChange}
                  className={`form-control ${formErrors.clinic_name ? 'is-invalid' : ''}`}
                  placeholder="Enter clinic name"
                />
                {formErrors.clinic_name && (
                  <div className="invalid-feedback">{formErrors.clinic_name}</div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              {/* Address */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`form-control ${formErrors.address ? 'is-invalid' : ''}`}
                  placeholder="Enter address"
                />
                {formErrors.address && (
                  <div className="invalid-feedback">{formErrors.address}</div>
                )}
              </div>

              {/* City */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`form-control ${formErrors.city ? 'is-invalid' : ''}`}
                  placeholder="Enter city"
                />
                {formErrors.city && (
                  <div className="invalid-feedback">{formErrors.city}</div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              {/* State */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`form-control ${formErrors.state ? 'is-invalid' : ''}`}
                  placeholder="Enter state"
                />
                {formErrors.state && (
                  <div className="invalid-feedback">{formErrors.state}</div>
                )}
              </div>

              {/* Zip Code */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Zip Code *</label>
                <input
                  type="text"
                  name="zip_code"
                  value={formData.zip_code}
                  onChange={handleChange}
                  className={`form-control ${formErrors.zip_code ? 'is-invalid' : ''}`}
                  placeholder="Enter zip code"
                />
                {formErrors.zip_code && (
                  <div className="invalid-feedback">{formErrors.zip_code}</div>
                )}
              </div>
            </div>

            <div className="d-grid mt-4">
              <button 
                type="submit" 
                className="btn btn-primary btn-lg"
                disabled={isSubmitting || doctors.length === 0}
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
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AddClinic;