import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles
import { useNavigate } from "react-router-dom";
import { workAuthorizationOptions } from "../../../constants/workAuthorizationOptions";
import '../../admin/vendorSignUp/vendorSignUp.scss'
import {
  fetchCompanyTypes,
  postCompanyDetails,
} from "../../../api/adminUserService";

const VendorSignUp = () => {
  const navigate = useNavigate();
  const [companyData, setcompanyData] = useState({
    company_name: "",
    contact_no: "",
    email_address: "",
    company_type_id: "1",
    website_url: "",
    location: "",
    industry_sector: "",
    contact_person_name: "",
    contact_person_designation: "",
    contact_person_phone: "",
    contact_person_email: "",
    is_active: true,
    is_deleted: false,
    description: "",
    employee: "",
    followup: "",
    followupdate: "",
    communicatethrough: "",
    currentposition: "",
    comment: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [companyTypes, setCompanyTypes] = useState([]);

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
    setcompanyData({ ...companyData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" }); // Clear errors when user starts typing
  };

  const validateForm = () => {
    let errors = {};

    // if (!companyData.company_name) errors.company_name = "Company Name is required";
    // if (!companyData.contact_no) errors.contact_no = "Contact Number is required";
    // if (!companyData.email_address) errors.email_address = "Email is required";
    // if (!companyData.company_type_id) errors.company_type_id = "Company Type is required";
    // if (!companyData.location) errors.location = "Location is required";
    // if (!companyData.industry_sector) errors.industry_sector = "Industry Sector is required";
    // if (!companyData.contact_person_name) errors.contact_person_name = "Contact Person Name is required";
    // if (!companyData.contact_person_phone) errors.contact_person_phone = "Contact Person Phone is required";
    // if (!companyData.description) errors.description = "Description is required";
    // if (!companyData.employee) errors.employee = "Employee count is required";
    // if (!companyData.followup) errors.followup = "Follow-up details are required";
    // if (!companyData.followupdate) errors.followupdate = "Follow-up date is required";
    // if (!companyData.communicatethrough) errors.communicatethrough = "Communication method is required";
    // if (!companyData.currentposition) errors.currentposition = "Current position is required";
    // if (!companyData.comment) errors.comment = "Comment is required";

    return errors;
  };

  const handleCompanyDataSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
      
    if (Object.keys(errors).length === 0) {
      try {
        const response = await postCompanyDetails(companyData);
        console.log("Company Data Posted:", response);
        navigate("/admin/vendor");
      } catch (error) {
        console.log("Error occurred while posting the company data");
      }
    } else {
      setFormErrors(errors);
    }
  };

  const handleDescriptionChange = (value) => {
    setcompanyData({ ...companyData, description: value });
    setFormErrors({ ...formErrors, description: "" });
  };

  return (
    <div className="CompanyData-posting-form">
      <section className="contact-form">
        <div className="container mt-4">
          <form className="row block" onSubmit={handleCompanyDataSubmit}>
            <h4 className="text-center">Company Data Posting</h4>

            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <input
                  type="text"
                  name="company_name"
                  className="form-control"
                  value={companyData.company_name}
                  onChange={handleCompanyDataChange}
                  placeholder="Company Name"
                />
                {formErrors.company_name && <p className="error">{formErrors.company_name}</p>}
              </div>
            </div>

            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <input
                  type="text"
                  name="email_address"
                  className="form-control"
                  value={companyData.email_address}
                  onChange={handleCompanyDataChange}
                  placeholder="Company Email"
                />
                {formErrors.email_address && <p className="error">{formErrors.email_address}</p>}
              </div>
            </div>

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
                <input
                  name="location"
                  className="form-control"
                  value={companyData.location}
                  onChange={handleCompanyDataChange}
                  placeholder="Location"
                />
                {formErrors.location && <p className="error">{formErrors.location}</p>}
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

            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <input
                  type="text"
                  name="contact_person_name"
                  className="form-control"
                  value={companyData.contact_person_name}
                  onChange={handleCompanyDataChange}
                  placeholder="Contact Person Name"
                />
                {formErrors.contact_person_name && <p className="error">{formErrors.contact_person_name}</p>}
              </div>
            </div>

            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <input
                  type="text"
                  name="contact_person_phone"
                  className="form-control"
                  value={companyData.contact_person_phone}
                  onChange={handleCompanyDataChange}
                  placeholder="Contact Person Phone Number"
                />
                {formErrors.contact_person_phone && <p className="error">{formErrors.contact_person_phone}</p>}
              </div>
            </div>

            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <input
                  type="text"
                  name="employee"
                  className="form-control"
                  value={companyData.employee}
                  onChange={handleCompanyDataChange}
                  placeholder="Number of Employees"
                />
                {formErrors.employee && <p className="error">{formErrors.employee}</p>}
              </div>
            </div>

            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <input
                  type="text"
                  name="followup"
                  className="form-control"
                  value={companyData.followup}
                  onChange={handleCompanyDataChange}
                  placeholder="Follow-up Details"
                />
                {formErrors.followup && <p className="error">{formErrors.followup}</p>}
              </div>
            </div>

            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <input
                  type="date"
                  name="followupdate"
                  className="form-control"
                  value={companyData.followupdate}
                  onChange={handleCompanyDataChange}
                />
                {formErrors.followupdate && <p className="error">{formErrors.followupdate}</p>}
              </div>
            </div>

            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <select
                  name="communicatethrough"
                  className="form-control"
                  value={companyData.communicatethrough}
                  onChange={handleCompanyDataChange}
                >
                  <option value="">Select Communication Method</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="video">Video</option>
                </select>
                {formErrors.communicatethrough && <p className="error">{formErrors.communicatethrough}</p>}
              </div>
            </div>

            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <input
                  type="text"
                  name="currentposition"
                  className="form-control"
                  value={companyData.currentposition}
                  onChange={handleCompanyDataChange}
                  placeholder="Current Position"
                />
                {formErrors.currentposition && <p className="error">{formErrors.currentposition}</p>}
              </div>
            </div>

            <div className="col-12">
              <div className="form-group">
                <textarea
                  name="comment"
                  className="form-control"
                  value={companyData.comment}
                  onChange={handleCompanyDataChange}
                  placeholder="Comments"
                />
                {formErrors.comment && <p className="error">{formErrors.comment}</p>}
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
    </div>
  );
};

export default VendorSignUp;
