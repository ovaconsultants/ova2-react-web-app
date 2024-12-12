import React, { useEffect, useState } from "react";
import "./signUp.scss";
import {
  fetchRegistrationTypes,
  registerUser,
} from "../../api/registerService";
import ToastMessage from "../../constants/toastMessage";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../common/formComponents/textInput";
import { Dropdown } from "../common/formComponents/selectDropDown";
import { validateField } from "../common/formComponents/validateFields";
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
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const errors = validateField(name, value, formErrors);
    setFormErrors(errors);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const isFormValid = Object.keys(formData).every((field) => {
      const errors = validateField(field, formData[field], formErrors);
      setFormErrors(errors);
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
        ToastMessage("User registered successfully.");
      }
      setTimeout(() => {
        navigate("/admin");
      }, 4000);
    } catch (error) {
      console.error("Error during registration:", error);
      alert("There was an error registering the user.");
    }
  };

  const textFields = [
    { name: "FirstName", type: "text" },
    { name: "Email", type: "email" },
    { name: "Password", type: "password" },
  ];
  const secondaryTextFields = [
    { name: "LastName", type: "text" },
    { name: "Phone Number", type: "tel" },
    { name: "Address", type: "text" },
  ];

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
                {textFields.map(({ name, type }, index) => (
                  <TextInput
                    key={index}
                    name={name}
                    type={type}
                    value={formData[name]}
                    error={formErrors[name]}
                    onChange={handleChange}
                  />
                ))}
                <Dropdown
                  visibleSelectorString="Register as  "
                  name="registrationTypeId"
                  value={formData.registrationTypeId}
                  onChange={handleChange}
                  options={registrationTypes}
                  error={formErrors.registrationTypeId}
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="block">
                {secondaryTextFields.map(
                  ({ name, type, placeholder }, index) => (
                    <TextInput
                      key={index}
                      name={name}
                      type={type}
                      value={formData[name]}
                      error={formErrors[name]}
                      onChange={handleChange}
                    />
                  )
                )}
              </div>
            </div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-12 col-md-4 col-sm-12">
                  <button
                    className="btn btn-default mt-3 mb-4 w-100"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
