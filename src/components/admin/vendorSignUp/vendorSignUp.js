import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { fetchCompanyTypes, postCompanyDetails } from "../../../api/companyServices";
import ToastMessage from "../../../constants/toastMessage";
import { ToastContainer } from "react-toastify";
import { TextInput } from "../../common/formComponents/textInput";
import { getCompanyDataInitialState, getFormFields } from "./companyDataState";
import "../../admin/vendorSignUp/vendorSignUp.scss";

const VendorSignUp = () => {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState(getCompanyDataInitialState());
  const [formErrors, setFormErrors] = useState({});
  const [companyTypes, setCompanyTypes] = useState([]);

  // Fetch company types
  useEffect(() => {
    const fetchCompanyTypesData = async () => {
      try {
        const types = await fetchCompanyTypes();
        setCompanyTypes(types);
      } catch (error) {
        console.error("Error fetching company types");
      }
    };
    fetchCompanyTypesData();
  }, []);

  // Handle input changes with restrictions
  const handleCompanyDataChange = ({ target: { name, value } }) => {
    if (isNumericField(name) && !isValidNumericInput(value)) {
      return; // Ignore invalid numeric inputs
    }

    if (isNumericField(name) && value.length > 10) {
      return; // Prevent entering more than 10 digits
    }

    setCompanyData({ ...companyData, [name]: value });
    clearFieldError(name); // Clear errors when user starts typing
  };

  // Check if the field is a numeric field
  const isNumericField = (name) => {
    return name === "contact_no" || name === "contact_person_phone";
  };

  // Validate numeric input
  const isValidNumericInput = (value) => {
    return /^\d*$/.test(value); // Allow only digits
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

    formFields.forEach((field) => {
      const value = companyData[field.name];

      // Required fields
      if (field.required && (!value || value.trim() === "")) {
        errors[field.name] = `${field.label || formatFieldName(field.name)} is required.`;
        return;
      }

      // Numeric field validation (10 digits required)
      if (field.type === "number" && value) {
        if (!isValidNumericInput(value)) {
          errors[field.name] = `${field.label || formatFieldName(field.name)} must be a valid number.`;
        } else if (value.length !== 10) {
          errors[field.name] = `${field.label || formatFieldName(field.name)} must be exactly 10 digits.`;
        }
      }

      // Email validation
      if (field.type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors[field.name] = `${field.label || formatFieldName(field.name)} must be a valid email address.`;
        }
      }

      // URL validation
      if (field.type === "url" && value) {
        const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\/?].*)?$/;
        if (!urlRegex.test(value)) {
          errors[field.name] = `${field.label || formatFieldName(field.name)} must be a valid URL.`;
        }
      }
    });

    return errors;
  };

  // Format field name for display
  const formatFieldName = (name) => {
    return name.replace(/_/g, " "); // Replace underscores with spaces
  };

  // Handle form submission
  const handleCompanyDataSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        await postCompanyDetails(companyData);
        ToastMessage("Vendor registered successfully");
        setTimeout(() => navigate("/admin/vendor"), 3000);
      } catch (error) {
        console.error("Error occurred while posting the company data");
      }
    } else {
      setFormErrors(errors);
    }
  };

  // Handle description field changes
  const handleDescriptionChange = (value) => {
    setCompanyData({ ...companyData, description: value });
    clearFieldError("description");
  };

  // Get form field configurations
  const formFields = getFormFields().map((field) => ({
    ...field,
    required: true, // Mark all fields as required
    ...(isNumericField(field.name) ? { type: "number", maxLength: 10 } : {}),
    ...(field.name === "email_address" || field.name === "contact_person_email"
      ? { type: "email" }
      : {}),
    ...(field.name === "website_url" ? { type: "url" } : {}),
  }));

  return (
    <div className="CompanyData-posting-form">
      <section className="contact-form">
        <div className="container mt-4">
          <form className="row block" onSubmit={handleCompanyDataSubmit}>
            <h4 className="text-center">Company Data Posting</h4>

            {/* Render form fields dynamically */}
            {formFields.map((field) => (
              <div className="col-md-4 col-sm-12" key={field.name}>
                <TextInput
                  name={field.name}
                  type={field.type || "text"}
                  value={companyData[field.name]}
                  onChange={handleCompanyDataChange}
                  error={formErrors[field.name]}
                  maxLength={field.maxLength || ""}
                  placeholder={`Enter ${field.label || formatFieldName(field.name)}`}
                />
                {formErrors[field.name] && (
                  <p className="error" style={{ color: "red", marginTop: "5px" }}>
                    {formErrors[field.name]}
                  </p>
                )}
              </div>
            ))}

            {/* Description Field */}
            <div className="col-12">
              <div className="form-group">
                <ReactQuill
                  theme="snow"
                  value={companyData.description}
                  onChange={handleDescriptionChange}
                  placeholder="Company Description"
                  className="description-area"
                />
                {formErrors.description && (
                  <p className="error" style={{ color: "red", marginTop: "5px" }}>
                    {formErrors.description}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="col-12 text-left">
              <button className="btn btn-default col-12" type="submit">
                Post Company Data
              </button>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default VendorSignUp;
