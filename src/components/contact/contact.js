import React, { useState } from "react";
import './contact.scss'; 
import { useNavigate  } from "react-router-dom";
import { postContactQuery } from "../../api/adminUserService";
import ToastMessage from "../../constants/toastMessage";
import { ToastContainer } from "react-toastify";
const Contact = () => {
  const navigate = useNavigate();

  const [contactQuery, setContactQuery] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    user_subject: "",
    user_message: "",
  });

  const [formErrors, setFormErrors] = useState({}); // For handling form errors

  // Validation function
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "user_name":
        if (!/^[a-zA-Z\s]{3,50}$/.test(value)) {
          error = "Name must be 3-50 characters and contain only letters.";
        }
        break;
      case "user_email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email address.";
        }
        break;
      case "user_phone":
        if (!/^\d{10}$/.test(value)) {
          error = "Phone number must be exactly 10 digits.";
        }
        break;
      case "user_subject":
        if (value.trim().length < 5 || value.trim().length > 100) {
          error = "Subject must be between 5-100 characters.";
        }
        break;
      case "user_message":
        if (value.trim().length < 10 || value.trim().length > 500) {
          error = "Message must be between 10-500 characters.";
        }
        break;
      default:
        break;
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // Handle change in form fields with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));

    validateField(name, value); // Perform validation on change
  };

  // Check if the form is valid
  const isFormValid = () => {
    return Object.values(contactQuery).every((value) => value.trim() !== "") &&
      Object.values(formErrors).every((error) => error === "");
  };

  const handleClick = async () => {
    if (!isFormValid()) {
      ToastMessage("Please fix the errors before submitting.", "error");
      return;
    }

    const { user_name, user_email, user_phone, user_subject, user_message } = contactQuery;
    const contactQueryData = {
      _visitor_name: user_name,
      _email_address: user_email,
      _phone_number: user_phone,
      _query_subject: user_subject,
      _message_text: user_message,
      _submission_date: new Date().toISOString(),
      _query_status: "New",
    };

    try {
      const response = await postContactQuery(contactQueryData);
      if (response) {
        ToastMessage("Query submitted successfully!", "success"); 
        setTimeout(()=> window.location.reload() , 4000);
      }
    } catch (error) {
      console.error(error);
      ToastMessage("Failed to submit the query. Please try again later.", "error"); 
    }
  };

  return (
    <div>
      <section className="page-title bg-2">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block">
                <h1>Drop Us An Email</h1>
                <p>Have a question, feedback, or just want to say hello? We’d love to hear from you! </p>
                <p>Feel free to contact us, and we’ll get back to you as soon as possible.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-form">
        <div className="container">
          <form className="row" id="contact-form">
            <div className="col-md-6 col-sm-12">
              <div className="block">
                <div className="form-group">
                  <input
                    name="user_name"
                    type="text"
                    className={`form-control ${formErrors.user_name ? "is-invalid" : ""}`}
                    placeholder="Your Name"
                    value={contactQuery.user_name}
                    onChange={handleInputChange}
                  />
                  {formErrors.user_name && <small className="text-danger">{formErrors.user_name}</small>}
                </div>
                <div className="form-group">
                  <input
                    name="user_email"
                    type="text"
                    className={`form-control ${formErrors.user_email ? "is-invalid" : ""}`}
                    placeholder="Email Address"
                    value={contactQuery.user_email}
                    onChange={handleInputChange}
                  />
                  {formErrors.user_email && <small className="text-danger">{formErrors.user_email}</small>}
                </div>
                <div className="form-group">
                  <input
                    name="user_subject"
                    type="text"
                    className={`form-control ${formErrors.user_subject ? "is-invalid" : ""}`}
                    placeholder="Subject"
                    value={contactQuery.user_subject}
                    onChange={handleInputChange}
                  />
                  {formErrors.user_subject && <small className="text-danger">{formErrors.user_subject}</small>}
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="block">
                <div className="form-group">
                  <input
                    name="user_phone"
                    type="number"
                    className={`form-control ${formErrors.user_phone ? "is-invalid" : ""}`}
                    placeholder="Mobile / Phone"
                    value={contactQuery.user_phone}
                    onChange={handleInputChange}
                  />
                  {formErrors.user_phone && <small className="text-danger">{formErrors.user_phone}</small>}
                </div>
                <div className="form-group-2">
                  <textarea
                    name="user_message"
                    className={`form-control ${formErrors.user_message ? "is-invalid" : ""}`}
                    rows="4"
                    placeholder="Your Message"
                    value={contactQuery.user_message}
                    onChange={handleInputChange}
                  ></textarea>
                  {formErrors.user_message && <small className="text-danger">{formErrors.user_message}</small>}
                </div>
              </div>
            </div>
            <div className="col-md-12 col-sm-12">
              <div className="block">
                <div className="form-group">
                  <button
                    className="btn btn-default"
                    type="button"
                    onClick={handleClick}
                    disabled={!isFormValid()} // Disable button if form is invalid
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
            <div className="error" id="error">Sorry, message was not sent.</div>
            <div className="success" id="success">Message Sent.</div>
          </form>
          <div className="contact-box row text-left">
            <div className="col-md-12 col-sm-12">
              <div className="block">
                <h2>Come visit us sometime!</h2>
                <div className='row'>
                <div className="col-md-6 col-sm-12">
                    <h4>USA Office</h4>
                <ul className="address-block">
                  <li>
                    <i className="ion-ios-location-outline"></i> 15 S Harrison Ave Iselin, NJ.
                  </li>
                  <li>
                    <i className="ion-ios-email-outline"></i> Email: hr@ova2consultancy.com
                  </li>
                  <li>
                    <i className="ion-ios-telephone-outline"></i> Phone: +1-848-467-9558
                  </li>
                </ul>
                </div>
                <div className="col-md-6 col-sm-12">
                    <h4>India Office</h4>
                <ul className="address-block">
                  <li>
                    <i className="ion-ios-location-outline"></i> Greater Noida, Uttar Pradesh, India
                  </li>
                  <li>
                    <i className="ion-ios-email-outline"></i> Email: hr@ova2consultancy.com
                  </li>
                  <li>
                    <i className="ion-ios-telephone-outline"></i> Phone: +91-9350520148
                  </li>
                </ul>
                </div>
                </div>
                <ul className="social-icons">
                  <li>
                    <a href="/"><i className="ion-social-googleplus-outline"></i></a>
                  </li>
                  <li>
                    <a href="/"><i className="ion-social-linkedin-outline"></i></a>
                  </li>
                  <li>
                    <a href="/"><i className="ion-social-pinterest-outline"></i></a>
                  </li>
                  <li>
                    <a href="/"><i className="ion-social-dribbble-outline"></i></a>
                  </li>
                  <li>
                    <a href="/"><i className="ion-social-twitter-outline"></i></a>
                  </li>
                  <li>
                    <a href="/"><i className="ion-social-facebook-outline"></i></a>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="col-md-6 mt-5 mt-md-0">
              <div className="block">
                <div className="google-map">
                  <div className="map" id="map_canvas" data-latitude="51.5223477" data-longitude="-0.1622023"
                    data-marker="images/marker.png"></div>
                </div>
              </div>
            </div> */}
          </div>  
        </div>
      </section>
      <ToastContainer />
    </div>
    
  );
};

export default Contact;
