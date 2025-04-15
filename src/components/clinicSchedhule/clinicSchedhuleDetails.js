import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { 
  fetchAllDoctors,
  fetchClinicsByDoctorId,
  insertDoctorClinicSchedule
} from "../../api/advertisementService";
import LoadingSpinner from '../common/loadingSpinner';

const ScheduleDetails = () => {
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedClinicId, setSelectedClinicId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Fetch doctors on component mount
  useEffect(() => {
    const getDoctors = async () => {
      try {
        const response = await fetchAllDoctors();
        if (response?.doctors?.length) {
          setDoctors(response.doctors);
        } else {
          setDoctors([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error("Error fetching doctors.");
        setError("Error fetching doctors.");
        setLoading(false);
      }
    };

    getDoctors();
  }, []);

  // Fetch clinics when a doctor is selected
  useEffect(() => {
    if (selectedDoctorId) {
      const getClinicsByDoctorId = async () => {
        try {
          setLoading(true);
          const response = await fetchClinicsByDoctorId(selectedDoctorId);
          if (response?.clinics?.length) {
            setClinics(response.clinics);
          } else {
            setClinics([]);
          }
          setSelectedClinicId("");
          setLoading(false);
        } catch (error) {
          console.error("Error fetching clinics by doctor ID:", error);
          toast.error("Error fetching clinics by doctor ID.");
          setError("Error fetching clinics by doctor ID.");
          setLoading(false);
        }
      };

      getClinicsByDoctorId();
    } else {
      setClinics([]);
    }
  }, [selectedDoctorId]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const scheduleData = {
        ...data,
        doctor_id: selectedDoctorId,
        clinic_id: selectedClinicId,
        created_by: 'admin'
      };
      
      await insertDoctorClinicSchedule(scheduleData);
      
      toast.success("Schedule created successfully!");
      reset();
      setSelectedDoctorId('');
      setSelectedClinicId('');
    } catch (error) {
      console.error("Error creating schedule:", error);
      toast.error("Failed to create schedule. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !error) return <LoadingSpinner fullPage text="Loading schedule data..." />;
  if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;

  return (
    <div className="Schedule-posting-form">
      {loading && <LoadingSpinner />} {/* For form submission loading */}
      <section className="contact-form">
        <div className="container mt-4">
          <form className="row block" onSubmit={handleSubmit(onSubmit)}>
            <h4 className="text-center mb-4">Doctor Schedule Management</h4>

            {/* Doctor Selection */}
            <div className="col-md-6 col-sm-12 mb-4">
              <label className="form-label">Doctor</label>
              <select
                className="form-control form-select"
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                required
              >
                <option value="">Select Doctor</option>
                {doctors.length > 0 ? (
                  doctors.map((doctor) => (
                    <option key={doctor.doctor_id} value={doctor.doctor_id}>
                      {doctor.first_name} {doctor.last_name}
                    </option>
                  ))
                ) : (
                  <option disabled>No Doctors Available</option>
                )}
              </select>
              {errors.doctor_id && (
                <p className="error text-danger mt-2">
                  {errors.doctor_id.message}
                </p>
              )}
            </div>

            {/* Clinic Selection */}
            <div className="col-md-6 col-sm-12 mb-4">
              <label className="form-label">Clinic</label>
              <select
                className="form-control form-select"
                value={selectedClinicId}
                onChange={(e) => setSelectedClinicId(e.target.value)}
                disabled={!selectedDoctorId || clinics.length === 0}
                required
              >
                <option value="">Select Clinic</option>
                {clinics.length > 0 ? (
                  clinics.map((clinic) => (
                    <option key={clinic.clinic_id} value={clinic.clinic_id}>
                      {clinic.clinic_name}
                    </option>
                  ))
                ) : (
                  <option disabled>
                    {selectedDoctorId ? "No Clinics Available" : "Select a doctor first"}
                  </option>
                )}
              </select>
              {errors.clinic_id && (
                <p className="error text-danger mt-2">
                  {errors.clinic_id.message}
                </p>
              )}
            </div>

            {/* Day of Week */}
            <div className="col-md-6 col-sm-12 mb-4">
              <label className="form-label">Day of Week</label>
              <select
                {...register("day_of_week", { required: "Day of week is required" })}
                className="form-control form-select"
              >
                <option value="">Select day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
              {errors.day_of_week && (
                <p className="error text-danger mt-2">
                  {errors.day_of_week.message}
                </p>
              )}
            </div>

            {/* Time Inputs */}
            <div className="col-md-6 col-sm-12 mb-4">
              <div className="row g-3">
                <div className="col-md-6 col-sm-12">
                  <label className="form-label">Start Time</label>
                  <input
                    type="time"
                    {...register("start_time", { required: "Start time is required" })}
                    className="form-control"
                  />
                  {errors.start_time && (
                    <p className="error text-danger mt-2">
                      {errors.start_time.message}
                    </p>
                  )}
                </div>
                <div className="col-md-6 col-sm-12">
                  <label className="form-label">End Time</label>
                  <input
                    type="time"
                    {...register("end_time", { 
                      required: "End time is required",
                      validate: (value, values) => 
                        value > values.start_time || "End time must be after start time"
                    })}
                    className="form-control"
                  />
                  {errors.end_time && (
                    <p className="error text-danger mt-2">
                      {errors.end_time.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="col-12 mt-4 mb-4">
              <button 
                className="btn btn-primary w-100 py-2" 
                type="submit"
                disabled={loading || !selectedDoctorId || !selectedClinicId}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Submitting...
                  </>
                ) : 'Add Schedule'}
              </button>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default ScheduleDetails;