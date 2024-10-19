import React, { useEffect, useState } from "react";
import "./signUp.scss";
import { fetchRegistrationTypes, registerUser } from "../../api/registerService";

const SignUp = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Phone_number: "",
    Address: "",
    Password: "",
    registrationTypeId: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [registrationTypes, setRegistrationTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const types = await fetchRegistrationTypes();
        setRegistrationTypes(types);
      } catch (error) {
        console.error("Error fetching registration types:", error);
      }
    };
    fetchData();
  }, []);

  const validateField = (name, value) => {
    let errors = { ...formErrors };

    switch (name) {
      case "FirstName":
        errors.FirstName = value.length < 2 ? "First name must be at least 2 characters" : "";
        if (value.search(/\d/) !== -1) errors.FirstName = errors.FirstName + " contains numbers";
        break;
      case "LastName":
        errors.LastName = value.length < 2 ? "Last name must be at least 2 characters" : "";
        if (value.search(/\d/) !== -1) errors.LastName = errors.LastName + " contains numbers";
        break;
      case "Email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errors.Email = !emailRegex.test(value) ? "Invalid email address" : "";
        break;
      case "Phone_number":
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        errors.Phone_number = !phoneRegex.test(value) ? "Invalid phone number" : "";
        break;
      case "Password":
        errors.Password = value.length < 8 ? "Password must be at least 8 characters long" : "";
        break;
      case "Address":
        errors.Address = value.length < 8 ? "Address must be at least 8 characters" : "";
        break;
      case "registrationTypeId":
        errors.registrationTypeId = value === "" ? "Please select a registration type" : "";
        break;
      default:
        break;
    }
    setFormErrors(errors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    const isFormValid = Object.keys(formData).every((field) => {
      validateField(field, formData[field]);
      return !formErrors[field]; 
    });

    if (!isFormValid) {
      alert("Please correct the errors in the form.");
      return;
    }

    const userData = {
      first_name: formData.FirstName,
      last_name: formData.LastName,
      email: formData.Email,
      phone: formData.Phone_number,
      password: formData.Password,
      address: formData.Address,
      registration_type_id: formData.registrationTypeId,
    };

    try {
      const response = await registerUser(userData);
      if (response.status === 200) {
        alert("User registered successfully!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("There was an error registering the user.");
    }
  };

  return (
    <div>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block">
                <h1>Sign Up</h1>
                <p>Please register your account.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-form">
        <div className="container">
          <form className="row" id="contact-form" onSubmit={handleSignup}>
            <div className="col-md-6 col-sm-12">
              <div className="block">
                <div className="form-group">
                  <input
                    name="FirstName"
                    type="text"
                    className={`form-control ${formData.FirstName ? 'input-has-value' : ''}`}
                    placeholder="First Name"
                    value={formData.FirstName}
                    onChange={handleChange}
                    required
                  />
                  <div className="error-space">
                    {formErrors.FirstName && (
                      <span className="error-message">{formErrors.FirstName}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <input
                    name="Email"
                    type="email"
                    className={`form-control ${formData.Email ? 'input-has-value' : ''}`}
                    placeholder="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    required
                  />
                  <div className="error-space">
                    {formErrors.Email && (
                      <span className="error-message">{formErrors.Email}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <input
                    name="Password"
                    type="password"
                    className={`form-control ${formData.Password ? 'input-has-value' : ''}`}
                    placeholder="Password"
                    value={formData.Password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />
                  <div className="error-space">
                    {formErrors.Password && (
                      <span className="error-message">{formErrors.Password}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <select
                    className={`form-select mt-3 ${formData.registrationTypeId ? 'input-has-value' : ''}`}
                    name="registrationTypeId"
                    value={formData.registrationTypeId}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Register as a
                    </option>
                    {registrationTypes.map((type) => (
                      <option key={type.registration_type_id} value={type.registration_type_id}>
                        {type.registration_type_name}
                      </option>
                    ))}
                  </select>
                  <div className="error-space">
                    {formErrors.registrationTypeId && (
                      <span className="error-message">{formErrors.registrationTypeId}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="block">
                <div className="form-group">
                  <input
                    name="LastName"
                    type="text"
                    className={`form-control ${formData.LastName ? 'input-has-value' : ''}`}
                    placeholder="Last Name"
                    value={formData.LastName}
                    onChange={handleChange}
                    required
                  />
                  <div className="error-space">
                    {formErrors.LastName && (
                      <span className="error-message">{formErrors.LastName}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <input
                    name="Phone_number"
                    type="tel"
                    className={`form-control ${formData.Phone_number ? 'input-has-value' : ''}`}
                    placeholder="Phone +1234567890"
                    value={formData.Phone_number}
                    onChange={handleChange}
                    required
                  />
                  <div className="error-space">
                    {formErrors.Phone_number && (
                      <span className="error-message">{formErrors.Phone_number}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <input
                    name="Address"
                    type="text"
                    className={`form-control ${formData.Address ? 'input-has-value' : ''}`}
                    placeholder="Address"
                    value={formData.Address}
                    onChange={handleChange}
                    required
                  />
                  <div className="error-space">
                    {formErrors.Address && (
                      <span className="error-message">{formErrors.Address}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button
                className="btn btn-default mt-3 ms-3 col-md-4 col-sm-12 mb-4"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
