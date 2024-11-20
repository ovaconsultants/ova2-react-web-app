import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { updateUser, fetchRoles, getUserDetails, deleteUser } from "../../api/adminUserService";
import { fetchRegistrationTypes } from "../../api/registerService";
import ToastMessage from "../../constants/toastMessage";
import { ToastContainer } from "react-toastify";
import { TextInput } from "../common/formComponents/textInput";
import { validateEditingField } from "../common/formComponents/validateFields";
import "./userEdit.scss";

const UserEdit = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [registrationTypes, setRegistrationTypes] = useState([]);
  const [roles, setRoles] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const userId = useLocation().state?.userId;

  const loadData = async (fetchFn, setFn, errorMessage) => {
    try {
      const data = await fetchFn();
      setFn(data);
    } catch (error) {
      console.error(errorMessage, error);
    }
  };

  useEffect(() => {
    if (userId) loadData(() => getUserDetails(userId), setUserDetails, "Failed to fetch user details");
    loadData(fetchRegistrationTypes, setRegistrationTypes, "Failed to fetch registration types");
    loadData(fetchRoles, setRoles, "Failed to fetch roles");
  }, [userId]);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormErrors((prev) => validateEditingField(name, value, prev));
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (Object.values(formErrors).some((error) => error)) return alert("Fix errors before saving.");
    try {
      await updateUser(userId, userDetails);
      const updatedDetails = {
        ...userDetails,
        role_name: roles.find((role) => role.role_id === userDetails.role_id)?.role_name,
        registration_type_name: registrationTypes.find(
          (type) => type.registration_type_id === userDetails.registration_type_id
        )?.registration_type_name,
      };
      setUserDetails(updatedDetails);
      ToastMessage("User updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user details", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      ToastMessage("User deleted successfully!");
      navigate("/admin/users");
    } catch (error) {
      console.error("Failed to delete user", error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const FormField = ({ label, name, type = "text", options = [] }) => (
    <div className="mb-3 text-start">
  <label className="d-block mb-1"><strong>{label}:</strong></label>
  {isEditing ? (
    <div>
      {options.length > 0 ? (
        <select name={name} className="form-control" value={userDetails[name] || ""} onChange={handleInputChange}>
          <option value="">Select {label}</option>
          {options.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
        </select>
      ) : (
        <TextInput name={name} value={userDetails[name] || ""} onChange={handleInputChange} type={type} error={formErrors[name]} />
      )}
    </div>
  ) : (
    <p className="d-block mb-0">{options.find((opt) => opt.id == userDetails[name])?.name || userDetails[name] || "Not Selected"}</p>
  )}
</div>

  );

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-4">
        <h2>{isEditing ? "Edit User Details" : "User Details"}</h2>
        <div>
          {isEditing ? (
            <>
              <button className="btn btn-primary" onClick={handleSave}><FontAwesomeIcon icon={faSave} /></button>
              <button className="btn btn-danger ms-2" onClick={() => setIsEditing(false)}><FontAwesomeIcon icon={faTimes} /></button>
            </>
          ) : (
            <>
              <button className="btn btn-primary" onClick={() => setIsEditing(true)}><FaEdit /></button>
              <button className="btn btn-danger ms-2" onClick={() => setShowDeleteModal(true)}>Delete</button>
            </>
          )}
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="row">
              <div className="col-md-6 text-start">
                <FormField label="First Name" name="first_name" />
                <FormField label="Last Name" name="last_name" />
                <FormField label="Email" name="email" type="email" />
                <FormField label="Active" name="is_active" options={[{ id: true, name: "Yes" }, { id: false, name: "No" }]} />
              </div>
              <div className= "col-md-6 text-start ">
                <FormField label="Address" name="address" />
                <FormField label="Phone" name="phone" type="tel" />
                <FormField label="Role" name="role_id" options={roles.map((role) => ({ id: role.role_id, name: role.role_name }))} />
                <FormField label="Registration Type" name="registration_type_id" options={registrationTypes.map((type) => ({ id: type.registration_type_id, name: type.registration_type_name }))} />
              </div>
            </div>
          </form>
        </div>
      </div>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton><Modal.Title>Confirm Delete</Modal.Title></Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Ok</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default UserEdit;
