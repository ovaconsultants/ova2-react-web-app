import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../admin/companyEditableDetails/companyEditableDetails.scss';
import {
  getCompanyDetails,
  updateCompanyDetails,
  fetchCompanyTypes,
} from "../../../api/companyServices";

const CompanyEditableDetails = () => {
  const { companyId } = useParams(); // Get company ID from URL params
  const navigate = useNavigate();

  const [companyDetails, setCompanyDetails] = useState({
    company_name: "",
    contact_no: "",
    email_address: "",
    company_type_id: "",
    website_url: "",
    location: "",
    established_year: "",
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

  const [companyTypes, setCompanyTypes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [originalDetails, setOriginalDetails] = useState({});

  // Fetch company details based on companyId
  useEffect(() => {
    async function fetchCompany() {
      try {
        const response = await getCompanyDetails(companyId);
        setCompanyDetails(response);
        setOriginalDetails(response); // Save original details to reset if cancelled
        setLoading(false);
      } catch (err) {
        setError("Error fetching company details");
        setLoading(false);
      }
    }
    fetchCompany();
  }, [companyId]);

  // Fetch company types for the dropdown
  useEffect(() => {
    async function fetchCompany_Types() {
      try {
        const response = await fetchCompanyTypes(); // API call for fetching company types
        console.log("response from API for fetch company Types ", response);
        setCompanyTypes(response);
      } catch (err) {
        setError("Error fetching company types");
      }
    }
    fetchCompany_Types();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCompanyDetails({
      ...companyDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await updateCompanyDetails(companyId, companyDetails); // API call for updating company
      if (data.message == "Company updated successfully.") {
        setIsEditing(false);
        alert("user updated successfully");
        navigate(`/admin/vendor/${companyId}`);
      } else {
        setError("Error updating company details");
      }
    } catch (err) {
      setError("Error updating company details");
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing); // Toggle between view and edit modes
  };

  const handleCancel = () => {
    // Reset company details to original state and exit edit mode
    setCompanyDetails(originalDetails);
    setIsEditing(false);
  };

  // Conditional rendering to display loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-8 text-start">
          <h2>{isEditing ? "Edit Company Details" : "Company Details"}</h2>
        </div>
        <div className="col-4 text-end">
          {isEditing ? (
            <>
              <button className="btn btn-success" onClick={handleSubmit}>
                Save
              </button>
              <button className="btn btn-secondary ms-2" onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={toggleEditMode}>
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="card mb-4 text-start">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Left Column */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label>
                    <strong>Company Name:</strong>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="company_name"
                      value={companyDetails.company_name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{companyDetails.company_name}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label>
                    <strong>Contact No:</strong>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="contact_no"
                      value={companyDetails.contact_no}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{companyDetails.contact_no}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label>
                    <strong>Email Address:</strong>
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      className="form-control"
                      name="email_address"
                      value={companyDetails.email_address}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{companyDetails.email_address}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label>
                    <strong>Company Type:</strong>
                  </label>
                  {isEditing ? (
                    <select
                      className="form-control"
                      name="company_type_id"
                      value={companyDetails.company_type_id}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Company Type</option>
                      {companyTypes.map((cmpy) => (
                        <option key={cmpy.id} value={cmpy.id}>
                          {cmpy.type_name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p>
                      {companyTypes.find(
                        (type) => type.id === companyDetails.company_type_id
                      )?.name || "N/A"}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label>
                    <strong>Website:</strong>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="website_url"
                      value={companyDetails.website_url}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{companyDetails.website_url}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label>
                    <strong>Location:</strong>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={companyDetails.location}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{companyDetails.location}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label>
                    <strong>Industry Sector:</strong>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="industry_sector"
                      value={companyDetails.industry_sector}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{companyDetails.industry_sector}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label>
                    <strong>Comment:</strong>
                  </label>
                  {isEditing ? (
                    <textarea
                      className="form-control"
                      name="comment"
                      value={companyDetails.comment}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{companyDetails.comment}</p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label>
                    <strong>Contact Person Name:</strong>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="contact_person_name"
                      value={companyDetails.contact_person_name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{companyDetails.contact_person_name}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label>
                    <strong>Designation:</strong>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="contact_person_designation"
                      value={companyDetails.contact_person_designation}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{companyDetails.contact_person_designation}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label>
                    <strong>Contact Person Phone:</strong>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="contact_person_phone"
                      value={companyDetails.contact_person_phone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{companyDetails.contact_person_phone}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label>
                    <strong>Contact Person Email:</strong>
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      className="form-control"
                      name="contact_person_email"
                      value={companyDetails.contact_person_email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{companyDetails.contact_person_email}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label>
                    <strong>Current Position:</strong>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="currentposition"
                      value={companyDetails.currentposition}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{companyDetails.currentposition}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label>
                    <strong>Responder :</strong>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="employee"
                      value={companyDetails.employee}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{companyDetails.employee}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label>
                    <strong>Communication Through:</strong>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="communicatethrough"
                      value={companyDetails.communicatethrough}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{companyDetails.communicatethrough}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="col-12">
                <div className="mb-3">
                  <label>
                    <strong>Description:</strong>
                  </label>
                  {isEditing ? (
                    <textarea
                      id="text_area"
                      className="form-control"
                      name="description"
                      value={companyDetails.description}
                      onChange={handleInputChange}
                      rows="4"
                    />
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: companyDetails.description,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyEditableDetails;
