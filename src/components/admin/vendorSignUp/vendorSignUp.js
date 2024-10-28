import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { fetchCompanyTypes, postCompanyDetails } from "../../../api/companyServices";
import ToastMessage from "../../../constants/toastMessage";
import { ToastContainer } from "react-toastify";
import { TextInput } from "../../common/formComponents/textInput";
import {getCompanyDataInitialState , getFormFields} from "./companyDataState";
import '../../admin/vendorSignUp/vendorSignUp.scss';


const VendorSignUp = () => {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState(getCompanyDataInitialState());
  const [formErrors, setFormErrors] = useState({});
  const [companyTypes, setCompanyTypes] = useState([]);

  // Fetch company types
  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyTypes = await fetchCompanyTypes();
        setCompanyTypes(companyTypes);
      } catch (error) {
        console.error("Error fetching company types");
      }
    };
    fetchData();
  }, []);

  const handleCompanyDataChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" }); // Clear errors when user starts typing
  };

  const validateForm = () => {
    let errors = {};
    // Add validation logic here
    return errors;
  };

  const handleCompanyDataSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        ToastMessage("User registered successfully");
        await postCompanyDetails(companyData);
        setTimeout(() => {
          navigate("/admin/vendor");
        }, 3000);
      } catch (error) {
        console.log("Error occurred while posting the company data");
      }
    } else {
      setFormErrors(errors);
    }
  };

  const handleDescriptionChange = (value) => {
    setCompanyData({ ...companyData, description: value });
    setFormErrors({ ...formErrors, description: "" });
  };

  // Array of input field configurations
  const formFields = getFormFields();

  return (
    <div className="CompanyData-posting-form">
      <section className="contact-form">
        <div className="container mt-4">
          <form className="row block" onSubmit={handleCompanyDataSubmit}>
            <h4 className="text-center">Company Data Posting</h4>

            {formFields.map((field) => (
              <div className="col-md-4 col-sm-12" key={field.name}>
                <TextInput
                  name={field.name}
                  value={companyData[field.name]}
                  onChange={handleCompanyDataChange}
                  error={formErrors[field.name]}
                />
              </div>
            ))}
            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <select
                  name="company_type_id"
                  className="form-control"
                  value={companyData.company_type_id}
                  onChange={handleCompanyDataChange}
                >
                  <option value="">Select Company Type</option>
                  {companyTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.type_name}
                    </option>
                  ))}
                </select>
                {formErrors.company_type_id && <p className="error">{formErrors.company_type_id}</p>}
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <select
                  name="industry_sector"
                  className="form-control"
                  value={companyData.industry_sector}
                  onChange={handleCompanyDataChange}
                >
                  <option value="">Select Industry Sector</option>
                  <option value="IT industry">IT Industry</option>
                  <option value="Gaming Industry">Gaming Industry</option>
                  <option value="Finance Industry">Finance Industry</option>
                </select>
                {formErrors.industry_sector && <p className="error">{formErrors.industry_sector}</p>}
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <ReactQuill
                  theme="snow"
                  value={companyData.description}
                  onChange={handleDescriptionChange}
                  placeholder="Company Description"
                  className="description-area"
                />
                {formErrors.description && <p className="error">{formErrors.description}</p>}
              </div>
            </div>
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
