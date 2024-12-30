import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Removed `useLocation`
import { ToastContainer } from "react-toastify";
import ToastMessage from "../../../constants/toastMessage";
import { postEnrollmentCourseDetails } from "../../../api/adminUserService";
import "react-toastify/dist/ReactToastify.css";

const TrainingProgramEnrollmentForm = () => {
  const { courseName: originalCourseName } = useParams();

  // Capitalize the first letter of each word in the course name
  const capitalizeWords = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const courseName = capitalizeWords(originalCourseName);

  // State to hold form data
  const [formData, setFormData] = useState({
    course_name: courseName,
    student_name: "",
    email: "",
    phone: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default submission behavior
    if (!formData.course_name || !formData.student_name || !formData.email) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    try {
      const response = await postEnrollmentCourseDetails(formData);
      if (response) {
        ToastMessage("You have successfully registered for the course.");
      }
    } catch (error) {
      console.error(
        "Error in getting response from the server while posting:",
        error
      );
    }
  };

  return (
    <div>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="block">
                <h1 className="display-4 mb-4">Training Program Enrollment</h1>
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
            {/* First column with two fields */}
            <div className="col-md-6">
              <div className="block">
                {[
                  { name: "course_name", type: "text", placeholder: "Course Name" },
                  { name: "student_name", type: "text", placeholder: "Student Name" },
                ].map(({ name, type, placeholder }, index) => (
                  <div key={index} className="mb-4">
                    <input
                      type={type}
                      id={name}
                      name={name}
                      className="form-control"
                      value={formData[name]}
                      onChange={handleChange}
                      required
                      placeholder={placeholder}
                    />
                    {errorMessage && (
                      <div className="text-danger">{errorMessage}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Second column with two fields */}
            <div className="col-md-6">
              <div className="block">
                {[
                  { name: "email", type: "email", placeholder: "Email Address" },
                  { name: "phone", type: "text", placeholder: "Phone Number" },
                ].map(({ name, type, placeholder }, index) => (
                  <div key={index} className="mb-4">
                    <input
                      type={type}
                      id={name}
                      name={name}
                      className="form-control"
                      value={formData[name]}
                      onChange={handleChange}
                      required
                      placeholder={placeholder}
                    />
                  </div>
                ))}
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

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <ToastContainer />
    </div>
  );
};

export default TrainingProgramEnrollmentForm;
