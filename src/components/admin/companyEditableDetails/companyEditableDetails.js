import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faEdit, faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import Multiselect from "multiselect-react-dropdown";
import { Button, Modal, Row, Col, Card, Form } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import {
  getCompanyDetails, updateCompanyDetails, fetchCompanyTypes, fetchCommunicationMediums,
  deleteCompany, fetchAllEmployeeAllocations
} from "../../../api/companyServices";
import ToastMessage from "../../../constants/toastMessage";
import { validateCompanyEditingField } from "../../common/formComponents/validateFields";
import { getInitialCompanyDetails } from "./compnayEditableStateData";
import "../../admin/companyEditableDetails/companyEditableDetails.scss";
import { fieldsData  , secondaryFieldsData , SelectField , EditableField } from "./compnayEditableStateData";

const CompanyEditableDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialCompanyId = location.state?.companyId || localStorage.getItem("companyId");
  const [companyDetails, setCompanyDetails] = useState(getInitialCompanyDetails());
  const [communicationMediums, setCommunicationMediums] = useState([]);
  const [selectedMedium, setSelectedMedium] = useState([]);
  const [companyTypes, setCompanyTypes] = useState([]);
  const [responders, setResponders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [initialData, setInitialData] = useState(getInitialCompanyDetails());

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [companyResponse, typesResponse, mediumsData, employees] = await Promise.all([
        getCompanyDetails(initialCompanyId), fetchCompanyTypes(), fetchCommunicationMediums(), fetchAllEmployeeAllocations()
      ]);
      setCompanyDetails({
        ...companyResponse,
        employee: companyResponse.employee , // Assuming `responderId` is the ID of the selected responder
        is_active: companyResponse.is_active ? "true" : "false" // Convert boolean to string for selection
      }); // Set the initial responder ID
      setInitialData(companyResponse);
      setCompanyTypes(typesResponse);
      setCommunicationMediums(mediumsData);
      setSelectedMedium(mediumsData.filter(m => companyResponse.communicatethrough.includes(m.id)));
      setResponders(employees);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [initialCompanyId]);
  

  useEffect(() => { if (initialCompanyId) fetchData(); }, [fetchData, initialCompanyId]);

  const handleInputChange = ({ target: { name, value } }) => {
    setCompanyDetails({ ...companyDetails, [name]: value });
    setFormErrors(validateCompanyEditingField(name, value, formErrors));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedDetails = { ...companyDetails, communicatethrough: selectedMedium.map(m => m.id).join(", ") };
      const response = await updateCompanyDetails(initialCompanyId, updatedDetails);
      if (response.message === "Company updated successfully.") {
        ToastMessage(response.message);
        setIsEditing(false);
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
    // Reset companyDetails to the initial data
    setCompanyDetails(initialData);
    setIsEditing(false);
    setShowDeleteModal(false); // Ensure modal is hidden when canceling
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="container mt-4">
      <Row className="mb-4">
        <Col xs={12} className="d-flex justify-content-between align-items-center">
          <h2>{isEditing ? "Edit Company Details" : "Company Details"}</h2>
          <div>
            <Button variant="primary" onClick={isEditing ? handleSubmit : () => setIsEditing(true)} className="me-2">
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
      <EditableField  key={field.name}  label={field.label}  name={field.name} type={field.type} value={companyDetails[field.name]}  onChange={handleInputChange} error={formErrors[field.name]} isEditing={isEditing}
      />
    ))}
        </Col>
              <Col md={6}>
                {secondaryFieldsData.map((field) => (
        <EditableField key={field.name}  label={field.label}   name={field.name}   type={field.type}  value={companyDetails[field.name]} onChange={handleInputChange} error={formErrors[field.name]} isEditing={isEditing}
        />
      ))}
                <SelectField label="Responder" name="employee" options={responders} value={companyDetails.employee} onChange={handleInputChange} isEditing={isEditing} error={formErrors.employee} />
                <SelectField label="Status" name="is_active" options={ [ { id : "true" , sts : "active" },  { id:  "false" , sts : "Inactive" }]} value={companyDetails.is_active} onChange={handleInputChange} isEditing={isEditing} error={formErrors.employee} />
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold text-start w-100">Communication Through</Form.Label>
                  {isEditing ? (
                    <Multiselect  options={communicationMediums} selectedValues={selectedMedium} onSelect={setSelectedMedium}onRemove={setSelectedMedium} displayValue="medium"className="fw-bold text-start w-100"/>
                  ) : (
                    <p className="mb-0 text-start">{selectedMedium.map(m => m.medium).join(", ")}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
      <Modal.Header closeButton><Modal.Title>Confirm Deletion</Modal.Title></Modal.Header>
    <Modal.Body>Are you sure you want to delete this company?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowDeleteModal(false)}></Button>
      <Button variant="danger" onClick={handleDelete}></Button>
    </Modal.Footer>
  </Modal>

  <ToastContainer />
</div>
); };
export default CompanyEditableDetails ;