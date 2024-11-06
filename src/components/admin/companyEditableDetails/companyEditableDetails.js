import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../admin/companyEditableDetails/companyEditableDetails.scss";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import Multiselect from "multiselect-react-dropdown";
import {
  getCompanyDetails,
  updateCompanyDetails,
  fetchCompanyTypes,
} from "../../../api/companyServices";
import ToastMessage from "../../../constants/toastMessage";
import { ToastContainer } from "react-toastify";
import { validateCompanyEditingField } from "../../common/formComponents/validateFields";
const CompanyEditableDetails = () => {
  const location = useLocation();
  const companyId =
    location.state?.companyId || localStorage.getItem("companyId");
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

  const [selectedCommunicationMedium, setSelectedCommunicationMedium] =
    useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const optionsForCommunication = [
    { name: "Email", id: 1 },
    { name: "Phone Number", id: 2 },
    { name: "Chat", id: 3 },
  ];

  const [companyTypes, setCompanyTypes] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [originalDetails, setOriginalDetails] = useState({});
  const [formErrors, setFormErrors] = useState({});

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
    async function fetchCompanyTypes() {
      try {
        const response = await fetchCompanyTypes(); // API call for fetching company types
        setCompanyTypes(response);
      } catch (err) {
        setError("Error fetching company types");
      }
    }
    fetchCompanyTypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails({
      ...companyDetails,
      [name]: value,
    });

    const updatedErrors = validateCompanyEditingField(name, value, formErrors);
    setFormErrors(updatedErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      ToastMessage("User registered successfully.");
      const data = await updateCompanyDetails(companyId, companyDetails); // API call for updating company
      if (data.message === "Company updated successfully.") {
        setIsEditing(false);
        // Persist companyId in localStorage
        if (companyId) {
          localStorage.setItem("companyId", companyId);
        }

        navigate("/admin/vendor/vendor-details");
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

  // Update companyDetails.communicatethrough when selectedCommunicationMedium changes
  useEffect(() => {
    setCompanyDetails((prevDetails) => ({
      ...prevDetails,
      communicatethrough: selectedCommunicationMedium
        .map((item) => item.name)
        .join(", "),
    }));
  }, [selectedCommunicationMedium]);

  const onSelect = (selectedList) => {
    setSelectedCommunicationMedium(selectedList);
    setIsAllSelected(selectedList.length === optionsForCommunication.length);
  };

  const onRemove = (selectedList) => {
    setSelectedCommunicationMedium(selectedList);
    setIsAllSelected(selectedList.length === optionsForCommunication.length);
  };

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
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                title="Save"
              >
                <FontAwesomeIcon icon={faSave} />
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={handleCancel}
                data-bs-toggle="tooltip"
                title="Cancel"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
              data-bs-toggle="tooltip"
              title="Edit"
            >
              <i className="bi bi-pencil"></i>
            </button>
          )}
        </div>
      </div>

      <div className="card mb-4 text-start">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
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
                  {formErrors.company_name && (
                    <small className="text-danger">
                      {formErrors.company_name}
                    </small>
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
                  {formErrors.contact_no && (
                    <small className="text-danger">
                      {formErrors.contact_no}
                    </small>
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
                  {formErrors.email_address && (
                    <small className="text-danger">
                      {formErrors.email_address}
                    </small>
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
                      {companyTypes?.map((cmpy) => (
                        <option key={cmpy.id} value={cmpy.id}>
                          {cmpy.type_name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p>
                      <p>
                        {companyTypes?.find(
                          (type) => type.id === companyDetails.company_type_id
                        ).type_name || "N/A"}  
                      </p>
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
                  {formErrors.website_url && (
                    <small className="text-danger">
                      {formErrors.website_url}
                    </small>
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
                  {formErrors.location && (
                    <small className="text-danger">{formErrors.location}</small>
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
                  {formErrors.industry_sector && (
                    <small className="text-danger">
                      {formErrors.industry_sector}
                    </small>
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
                  {formErrors.comment && (
                    <small className="text-danger">{formErrors.comment}</small>
                  )}
                </div>
              </div>

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
                  {formErrors.contact_person_name && (
                    <small className="text-danger">
                      {formErrors.contact_person_name}
                    </small>
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
                  {formErrors.contact_person_designation && (
                    <small className="text-danger">
                      {formErrors.contact_person_designation}
                    </small>
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
                  {formErrors.contact_person_phone && (
                    <small className="text-danger">
                      {formErrors.contact_person_phone}
                    </small>
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
                  {formErrors.contact_person_email && (
                    <small className="text-danger">
                      {formErrors.contact_person_email}
                    </small>
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
                  {formErrors.currentposition && (
                    <small className="text-danger">
                      {formErrors.currentposition}
                    </small>
                  )}
                </div>

                <div className="mb-3">
                  <label>
                    <strong>Responder:</strong>
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
                  {formErrors.employee && (
                    <small className="text-danger">{formErrors.employee}</small>
                  )}
                </div>

                <div className="mb-3">
                  <label>
                    <strong>Communication Through:</strong>
                  </label>
                  {isEditing ? (
                    <Multiselect
                      options={optionsForCommunication}
                      selectedValues={selectedCommunicationMedium}
                      onSelect={onSelect}
                      onRemove={onRemove}
                      displayValue="name"
                      showCheckbox={true}
                      hidePlaceholder={isAllSelected ? true : false}
                      closeIcon="cancel"
                      avoidHighlightFirstOption
                      placeholder={
                        selectedCommunicationMedium.length ===
                        optionsForCommunication.length
                          ? ""
                          : "Select"
                      }
                      style={{
                        optionContainer: {
                          display: isAllSelected ? "none" : "block",
                        },
                      }}
                    />
                  ) : (
                    <p>{companyDetails.communicatethrough}</p>
                  )}
                  {formErrors.communicatethrough && (
                    <small className="text-danger">
                      {formErrors.communicatethrough}
                    </small>
                  )}
                </div>
              </div>

              <div className="col-12">
                <div className="mb-3">
                  <label>
                    <strong>Description:</strong>
                  </label>
                  {isEditing ? (
                    <textarea
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
                  {formErrors.description && (
                    <small className="text-danger">
                      {formErrors.description}
                    </small>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CompanyEditableDetails;
