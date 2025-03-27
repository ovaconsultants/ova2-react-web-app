import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextInput } from "../../common/formComponents/textInput";
import {
  postAdvertisement,
  fetchAllDoctors,
  fetchClinicsByDoctorId,
} from "../../../api/advertisementService";

const Advertisement = () => {
  const navigate = useNavigate();
  const [advertisementData, setAdvertisementData] = useState({
    doctor_id: "",
    clinic_id: "",
    company_name: "",
    content_type: "",
    content_url: "",
    display_duration: "",
    display_frequency: "1 hour",
    start_date: "",
    end_date: "",
    start_time: "09:00:00",
    end_time: "18:00:00",
  });
  const [formErrors, setFormErrors] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]); // State to store clinics

  // Fetch all doctors when the component mounts
  useEffect(() => {
    const getDoctors = async () => {
      try {
        const response = await fetchAllDoctors();
        setDoctors(response.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    getDoctors();
  }, []);

  // Fetch clinics when a doctor is selected
  useEffect(() => {
    if (advertisementData.doctor_id) {
      const getClinicsByDoctorId = async () => {
        try {
          const response = await fetchClinicsByDoctorId(advertisementData.doctor_id);
          setClinics(response.clinics || []); // Ensure it's an array
        } catch (error) {
          console.error("Error fetching clinics by doctor ID:", error);
          toast.error("Error fetching clinics by doctor ID.");
        }
      };

      getClinicsByDoctorId();
    } else {
      setClinics([]); // Clear clinics if no doctor is selected
    }
  }, [advertisementData.doctor_id]);

  // Handle input changes for advertisement form
  const handleAdvertisementDataChange = ({ target: { name, value } }) => {
    setAdvertisementData({ ...advertisementData, [name]: value });
    clearFieldError(name); // Clear errors when user starts typing
  };

  // Clear error for a specific field
  const clearFieldError = (fieldName) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};

    const requiredFields = [
      "doctor_id",
      "clinic_id",
      "company_name",
      "content_type",
      "content_url",
      "display_duration",
    ];

    requiredFields.forEach((field) => {
      if (!advertisementData[field] || advertisementData[field].trim() === "") {
        errors[field] = `${formatFieldName(field)} is required.`;
      }
    });

    // Validate display_duration is a number
    if (advertisementData.display_duration && isNaN(advertisementData.display_duration)) {
      errors.display_duration = "Display Duration must be a valid number.";
    }

    return errors;
  };

  // Format field name for display
  const formatFieldName = (name) => {
    return name.replace(/_/g, " ");
  };

  // Handle form submission
  const handleAdvertisementSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        await postAdvertisement(advertisementData);
        toast.success("Advertisement inserted successfully");
        setAdvertisementData({
          doctor_id: "",
          clinic_id: "",
          company_name: "",
          content_type: "",
          content_url: "",
          display_duration: "",
          display_frequency: "1 hour",
          start_date: "",
          end_date: "",
          start_time: "09:00:00",
          end_time: "18:00:00",
        }); // Clear form fields
        setTimeout(() => navigate("/admin/etoken-advertisement"), 3000); // Redirect after success
      } catch (error) {
        toast.error("Error occurred while inserting the advertisement");
        console.error(error);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="Advertisement-posting-form">
      <section className="contact-form">
        <div className="container mt-4">
          <form className="row block" onSubmit={handleAdvertisementSubmit}>
            <h4 className="text-center">Advertisement Posting</h4>

            {/* Doctor ID Dropdown */}
            <div className="col-md-4 col-sm-12">
              <label>Doctor</label>
              <select
                name="doctor_id"
                value={advertisementData.doctor_id}
                onChange={handleAdvertisementDataChange}
                className="form-control"
              >
                <option value="">Select a Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.doctor_id} value={doctor.doctor_id}>
                    {doctor.first_name} {doctor.last_name}
                  </option>
                ))}
              </select>
              {formErrors.doctor_id && (
                <p className="error" style={{ color: "red", marginTop: "5px" }}>
                  {formErrors.doctor_id}
                </p>
              )}
            </div>

            {/* Clinic ID Dropdown */}
            <div className="col-md-4 col-sm-12">
              <label>Clinic</label>
              <select
                name="clinic_id"
                value={advertisementData.clinic_id}
                onChange={handleAdvertisementDataChange}
                className="form-control"
                disabled={!advertisementData.doctor_id || clinics.length === 0}
              >
                <option value="">Select a Clinic</option>
                {clinics.map((clinic) => (
                  <option key={clinic.clinic_id} value={clinic.clinic_id}>
                    {clinic.clinic_name}
                  </option>
                ))}
              </select>
              {formErrors.clinic_id && (
                <p className="error" style={{ color: "red", marginTop: "5px" }}>
                  {formErrors.clinic_id}
                </p>
              )}
            </div>

            {/* Company Name */}
            <div className="col-md-4 col-sm-12">
              <label>Company Name</label>
              <TextInput
                name="company_name"
                type="text"
                value={advertisementData.company_name}
                onChange={handleAdvertisementDataChange}
                error={formErrors.company_name}
                placeholder="Enter Company Name"
              />
              {formErrors.company_name && (
                <p className="error" style={{ color: "red", marginTop: "5px" }}>
                  {formErrors.company_name}
                </p>
              )}
            </div>

            {/* Content Type Dropdown */}
            <div className="col-md-4 col-sm-12">
              <label>Content Type</label>
              <select
                name="content_type"
                value={advertisementData.content_type}
                onChange={handleAdvertisementDataChange}
                className="form-control"
              >
                <option value="">Select Content Type</option>
                <option value="Image">Image</option>
                <option value="Video">Video</option>
              </select>
              {formErrors.content_type && (
                <p className="error" style={{ color: "red", marginTop: "5px" }}>
                  {formErrors.content_type}
                </p>
              )}
            </div>

            {/* Content URL */}
            <div className="col-md-4 col-sm-12">
              <label>Content URL</label>
              <TextInput
                name="content_url"
                type="url"
                value={advertisementData.content_url}
                onChange={handleAdvertisementDataChange}
                error={formErrors.content_url}
                placeholder="Enter Content URL"
              />
              {formErrors.content_url && (
                <p className="error" style={{ color: "red", marginTop: "5px" }}>
                  {formErrors.content_url}
                </p>
              )}
            </div>

            {/* Display Duration */}
            <div className="col-md-4 col-sm-12">
              <label>Display Duration (in seconds)</label>
              <TextInput
                name="display_duration"
                type="number"
                value={advertisementData.display_duration}
                onChange={handleAdvertisementDataChange}
                error={formErrors.display_duration}
                placeholder="Enter Display Duration"
              />
              {formErrors.display_duration && (
                <p className="error" style={{ color: "red", marginTop: "5px" }}>
                  {formErrors.display_duration}
                </p>
              )}
            </div>

            {/* Display Frequency */}
            <div className="col-md-4 col-sm-12">
              <label>Display Frequency</label>
              <TextInput
                name="display_frequency"
                type="text"
                value={advertisementData.display_frequency}
                onChange={handleAdvertisementDataChange}
                error={formErrors.display_frequency}
                placeholder="Enter Display Frequency (e.g., 1 hour)"
              />
              {formErrors.display_frequency && (
                <p className="error" style={{ color: "red", marginTop: "5px" }}>
                  {formErrors.display_frequency}
                </p>
              )}
            </div>

            {/* Start Date */}
            <div className="col-md-4 col-sm-12">
              <label>Start Date</label>
              <TextInput
                name="start_date"
                type="date"
                value={advertisementData.start_date}
                onChange={handleAdvertisementDataChange}
                error={formErrors.start_date}
                placeholder="Enter Start Date"
              />
              {formErrors.start_date && (
                <p className="error" style={{ color: "red", marginTop: "5px" }}>
                  {formErrors.start_date}
                </p>
              )}
            </div>

            {/* End Date */}
            <div className="col-md-4 col-sm-12">
              <label>End Date</label>
              <TextInput
                name="end_date"
                type="date"
                value={advertisementData.end_date}
                onChange={handleAdvertisementDataChange}
                error={formErrors.end_date}
                placeholder="Enter End Date"
              />
              {formErrors.end_date && (
                <p className="error" style={{ color: "red", marginTop: "5px" }}>
                  {formErrors.end_date}
                </p>
              )}
            </div>

            {/* Start Time */}
            <div className="col-md-4 col-sm-12">
              <label>Start Time</label>
              <TextInput
                name="start_time"
                type="time"
                value={advertisementData.start_time}
                onChange={handleAdvertisementDataChange}
                error={formErrors.start_time}
                placeholder="Enter Start Time"
              />
              {formErrors.start_time && (
                <p className="error" style={{ color: "red", marginTop: "5px" }}>
                  {formErrors.start_time}
                </p>
              )}
            </div>

            {/* End Time */}
            <div className="col-md-4 col-sm-12">
              <label>End Time</label>
              <TextInput
                name="end_time"
                type="time"
                value={advertisementData.end_time}
                onChange={handleAdvertisementDataChange}
                error={formErrors.end_time}
                placeholder="Enter End Time"
              />
              {formErrors.end_time && (
                <p className="error" style={{ color: "red", marginTop: "5px" }}>
                  {formErrors.end_time}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="col-12 text-left">
              <button className="btn btn-default col-12" type="submit">
                Post Advertisement
              </button>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Advertisement;