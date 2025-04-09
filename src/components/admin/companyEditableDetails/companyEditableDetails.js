import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faEdit, faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import Multiselect from "multiselect-react-dropdown";
import { Button, Modal, Row, Col, Card, Form } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import {
  getCompanyDetails,
  updateCompanyDetails,
  fetchCompanyTypes,
  fetchCommunicationMediums,
  deleteCompany,
  fetchAllEmployeeAllocations,
  addVendorComment,
} from "../../../api/companyServices";
import ToastMessage from "../../../constants/toastMessage";
import { validateCompanyEditingField } from "../../common/formComponents/validateFields";
import { getInitialCompanyDetails } from "./compnayEditableStateData";
import "../../admin/companyEditableDetails/companyEditableDetails.scss";
import { fieldsData, secondaryFieldsData, SelectField, EditableField } from "./compnayEditableStateData";

const CompanyEditableDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialCompanyId = location.state?.companyId || localStorage.getItem("companyId");

  const [companyDetails, setCompanyDetails] = useState(getInitialCompanyDetails());
  const [communicationMediums, setCommunicationMediums] = useState([]);
  const [selectedMedium, setSelectedMedium] = useState([]);
  const [responders, setResponders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [initialData, setInitialData] = useState(getInitialCompanyDetails());
  const [comment, setComment] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [companyResponse, mediumsData, employees] = await Promise.all([
        getCompanyDetails(initialCompanyId),
        fetchCompanyTypes(), // Removed assignment to suppress warning
        fetchCommunicationMediums(),
        fetchAllEmployeeAllocations(),
      ]);

      setCompanyDetails({
        ...companyResponse,
        employee: companyResponse.employee,
        is_active: companyResponse.is_active ? "true" : "false",
      });
      setInitialData(companyResponse);
      setCommunicationMediums(mediumsData);
      setSelectedMedium(mediumsData.filter((m) => companyResponse.communicatethrough.includes(m.id)));
      setResponders(employees);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [initialCompanyId]);

  useEffect(() => {
    if (initialCompanyId) fetchData();
  }, [fetchData, initialCompanyId]);

  const handleInputChange = ({ target: { name, value } }) => {
    setCompanyDetails({ ...companyDetails, [name]: value });
    setFormErrors(validateCompanyEditingField(name, value, formErrors));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedDetails = {
        ...companyDetails,
        communicatethrough: selectedMedium.map((m) => m.id).join(", "),
      };

      const hasDetailsChanged = JSON.stringify(updatedDetails) !== JSON.stringify(initialData);

      if (!hasDetailsChanged && !comment) {
        ToastMessage("No changes detected", "info");
        return;
      }

      if (hasDetailsChanged) {
        const response = await updateCompanyDetails(initialCompanyId, updatedDetails);
        if (response.message === "Company updated successfully.") {
          ToastMessage(response.message);
          setIsEditing(false);
          setInitialData(updatedDetails);
        }
      }

      if (comment) {
        const response = await addVendorComment({ company_id: initialCompanyId, comment });
        if (response.success) {
          setComment("");
          ToastMessage("Comment added successfully!", "success");
          setIsEditing(false);
        }
      }
    } catch (error) {
      console.error("Error updating company details:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCompany(initialCompanyId);
      ToastMessage("Company deleted successfully");
      navigate("/admin/vendor", { replace: true });
    } catch (error) {
      console.error("Error deleting company:", error);
      alert("Failed to delete company");
    }
  };

  const handleCancel = () => {
    setCompanyDetails(initialData);
    setIsEditing(false);
    setShowDeleteModal(false);
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="container mt-4">
      <Row className="mb-4">
        <Col xs={12} className="d-flex justify-content-between align-items-center">
          <h2>{isEditing ? "Edit Company Details" : "Company Details"}</h2>
          <div>
            <Button
              variant="primary"
              onClick={isEditing ? handleSubmit : () => setIsEditing(true)}
              className="me-2"
            >
              <FontAwesomeIcon icon={isEditing ? faSave : faEdit} /> {isEditing ? "Save" : "Edit"}
            </Button>
            <Button variant="danger" onClick={handleCancel}>
              <FontAwesomeIcon icon={isEditing ? faTimes : faTrash} /> {isEditing ? "Cancel" : "Delete"}
            </Button>
          </div>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                {fieldsData.map((field) => (
                  <EditableField
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    value={companyDetails[field.name]}
                    onChange={handleInputChange}
                    error={formErrors[field.name]}
                    isEditing={isEditing}
                  />
                ))}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold-comments">Add Comments</Form.Label>
                  {isEditing ? (
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                    />
                  ) : (
                    <p className="mb-0 text-start">{comment || "No comments added yet"}</p>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                {secondaryFieldsData.map((field) => (
                  <EditableField
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    value={companyDetails[field.name]}
                    onChange={handleInputChange}
                    error={formErrors[field.name]}
                    isEditing={isEditing}
                  />
                ))}
                <SelectField
                  label="Responder"
                  name="employee"
                  options={responders}
                  value={companyDetails.employee}
                  onChange={handleInputChange}
                  isEditing={isEditing}
                  error={formErrors.employee}
                />
                <SelectField
                  label="Status"
                  name="is_active"
                  options={[
                    { id: "true", sts: "Active" },
                    { id: "false", sts: "Inactive" },
                  ]}
                  value={companyDetails.is_active}
                  onChange={handleInputChange}
                  isEditing={isEditing}
                  error={formErrors.is_active}
                />
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold text-start w-100">Communication Through</Form.Label>
                  {isEditing ? (
                    <Multiselect
                      options={communicationMediums}
                      selectedValues={selectedMedium}
                      onSelect={setSelectedMedium}
                      onRemove={setSelectedMedium}
                      displayValue="medium"
                      className="fw-bold text-start w-100"
                    />
                  ) : (
                    <p className="mb-0 text-start">{selectedMedium.map((m) => m.medium).join(", ")}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this company?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CompanyEditableDetails;