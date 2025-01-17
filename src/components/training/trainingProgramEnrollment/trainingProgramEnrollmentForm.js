import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ToastMessage from "../../../constants/toastMessage";
import { postEnrollmentCourseDetails } from "../../../api/adminUserService";
import "react-toastify/dist/ReactToastify.css";

const TrainingProgramEnrollmentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data || {};
  const { courseName: originalCourseName } = useParams();

  // Capitalize the first letter of each word in the course name
  const capitalizeWords = (str) =>
    str
      .split(/[- ]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("-");

  const courseName = capitalizeWords(originalCourseName);

  // State to hold form data
  const [formData, setFormData] = useState({
    course_name: courseName,
    student_name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && value.length > 10) return;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on change
  };

  // Validate individual fields
  const validateField = (fieldName) => {
    const fieldErrors = { ...errors };

    if (fieldName === "student_name" && !/^[A-Za-z ]+$/.test(formData.student_name)) {
      fieldErrors.student_name = "Please enter your full name.";
    }

    if (fieldName === "email" && !/\S+@\S+\.\S+/.test(formData.email)) {
      fieldErrors.email = "Please enter your email.";
    }

    if (fieldName === "phone" && !/^[0-9]{10}$/.test(formData.phone)) {
      fieldErrors.phone = "Please enter a 10-digit number.";
    }

    setErrors(fieldErrors);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const requiredFields = ["student_name", "email", "phone"];
    let valid = true;
  
    requiredFields.forEach((field) => {
      validateField(field);
      if (!formData[field]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: `Please fill out the ${field.replace("_", " ")} field.`,
        }));
        valid = false;
      }
    });
  
    if (!valid) return;
  
    try {
      const response = await postEnrollmentCourseDetails(formData);
  
      // If email is already registered, show an error
      if (response?.emailAlreadyRegistered) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email already registered.",
        }));
        return;
      }
  
      // Show success message and toast
      const successMessage = `Thank you for enrolling in ${courseName}!`;
      setSuccessMessage(successMessage);
      ToastMessage(successMessage);
  
      // Delay navigation to allow users to see the success message
      setTimeout(() => {
        navigate("/training");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error submitting the enrollment:", error);
      ToastMessage("Failed to submit the enrollment. Please try again.");
    }
  };
  

  return (
    <div>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="block">
                <h1 className="display-8 mb-4">Training Program Enrollment</h1>
                <p className="lead">
                  Please fill in the details to enroll in the course
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-form py-5">
        <div className="container">
          <form className="row g-4" id="contact-form" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <div className="block">
                <div className="mb-4">
                  <input
                    type="text"
                    id="course_name"
                    name="course_name"
                    className="form-control"
                    value={formData.course_name}
                    disabled
                    placeholder="Course Name"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    id="student_name"
                    name="student_name"
                    className="form-control"
                    value={formData.student_name}
                    onChange={handleChange}
                    onBlur={() => validateField("student_name")}
                    placeholder="Student Name"
                  />
                  {errors.student_name && (
                    <small className="text-danger">{errors.student_name}</small>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="block">
                <div className="mb-4">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => validateField("email")}
                    placeholder="Email Address"
                  />
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={() => validateField("phone")}
                    placeholder="Phone Number"
                  />
                  {errors.phone && <small className="text-danger">{errors.phone}</small>}
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8 col-sm-12">
                <button
                  className="btn btn-primary w-100 mt-3 mb-4"
                  type="submit"
                  style={{ backgroundColor: "#47424c", borderColor: "#47424c" }}
                >
                  Submit Enrollment
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <ToastContainer />
    </div>
  );
};

export default TrainingProgramEnrollmentForm;
