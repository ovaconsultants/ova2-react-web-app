import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  updateUser,
  fetchRoles,
  getUserDetails,
  deleteUser,
} from "../../api/adminUserService";
import { fetchRegistrationTypes } from "../../api/registerService";
import ToastMessage from "../../constants/toastMessage";
import { ToastContainer } from "react-toastify";
import { validateEditingField } from "../common/formComponents/validateFields";
import { TextInput } from "../common/formComponents/textInput";
import { Dropdown } from "../common/formComponents/selectDropDown";
import "./userEdit.scss";

const UserEdit = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserDetails, setEditedUserDetails] = useState({});
  const [registrationTypeMap, setRegistrationTypeMap] = useState([]);
  const [roleMap, setRoleMap] = useState([]);
  const [formErrors, setFormErrors] = useState({}); // State to store validation errors

  const location = useLocation();
  const userId = location.state?.userId;
  console.log("passed userid :", userId);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleConfirmDelete = async () => {
    try {
      ToastMessage("User deleted successfully");
      await deleteUser(userId);
      setTimeout(() => navigate("/admin/users"), 3000);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    } finally {
      setShowDeleteModal(false);
    }
  };

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const data = await getUserDetails(userId);
        setEditedUserDetails(data);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };
    if (userId) loadUserDetails();
  }, [userId]);

  useEffect(() => {
    const loadRegistrationTypes = async () => {
      try {
        const registrationTypes = await fetchRegistrationTypes();
        setRegistrationTypeMap(registrationTypes);
      } catch (error) {
        console.error("Failed to fetch registration types:", error);
      }
    };

    const loadRolesTypes = async () => {
      try {
        const rolesType = await fetchRoles();
        setRoleMap(rolesType);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    };

    loadRegistrationTypes();
    loadRolesTypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedErrors = validateEditingField(name, value, formErrors);
    setFormErrors(updatedErrors); // Update errors state
    setEditedUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    const updatedErrors = validateEditingField(name, value, formErrors);
    setFormErrors(updatedErrors);
    setEditedUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const hasErrors = Object.values(formErrors).some((error) => error);
    if (hasErrors) {
      alert("Please fix the errors before saving.");
      return;
    }

    try {
      await updateUser(userId, editedUserDetails);
      alert("User details updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user details", error);
      alert("Error updating user details");
    }
  };

  const textFields1 = [
    { name: "first_name", label: "First Name" },
    { name: "last_name", label: "Last Name" },
    { name: "email", label: "Email", type: "email" },
  ];
  const textFields2 = [
    { name: "address", label: "Address" },
    { name: "phone", label: "Phone", type: "tel" },
  ];

  const dropdownFields = [
    {
      name: "role_id",
      label: "Role",
      options: roleMap,
      visibleSelectorString: "Select Role",
    },
    {
      name: "registration_type_id",
      label: "Registration Type",
      options: registrationTypeMap,
      visibleSelectorString: "Select Registration Type",
    },
  ];

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-8 text-start">
          <h2>{isEditing ? "Edit User Details" : "User Details"}</h2>
        </div>
        <div className="col-4 text-end">
          {isEditing ? (
            <>
              <button
                className="btn btn-primary"
                onClick={handleSave}
                data-bs-toggle="tooltip"
                title="Save"
              >
                 <FontAwesomeIcon icon={faSave} />
              </button>
              <button
      className="btn btn-danger ms-2"
      onClick={() => setIsEditing(false)}
      data-bs-toggle="tooltip"
      title="Cancel"
    >
      <FontAwesomeIcon icon={faTimes} />
    </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
                data-bs-toggle="tooltip"
                title="Edit"
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={handleShowDeleteModal}
                data-bs-toggle="tooltip"
                title="Delete"
              >
                <i className="bi bi-trash"></i>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="card mb-4 text-start">
        <div className="card-body">
          <form onSubmit={handleSave}>
            <div className="row">
              <div className="col-md-6">
                {textFields1.map(({ name, label, type }) => (
                  <div key={name} className="mb-3">
                    <label>
                      <strong>{label}:</strong>
                    </label>
                    {isEditing ? (
                      <TextInput
                        name={name}
                        value={editedUserDetails[name] || ""}
                        onChange={handleInputChange}
                        type={type || "text"}
                        error={formErrors[name]} // Show error message
                      />
                    ) : (
                      <p>{editedUserDetails[name]}</p>
                    )}
                  </div>
                ))}
                <div className="mb-3">
                  <label>
                    <strong>Active:</strong>
                  </label>
                  {isEditing ? (
                    <select
                      className="form-control"
                      value={editedUserDetails.is_active ? "Yes" : "No"}
                      onChange={(e) =>
                        handleInputChange({
                          target: {
                            name: "is_active",
                            value: e.target.value === "Yes",
                          },
                        })
                      }
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  ) : (
                    <p>{editedUserDetails.is_active ? "Yes" : "No"}</p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                {textFields2.map(({ name, label, type }) => (
                  <div key={name} className="mb-3">
                    <label>
                      <strong>{label}:</strong>
                    </label>
                    {isEditing ? (
                      <TextInput
                        name={name}
                        value={editedUserDetails[name] || ""}
                        onChange={handleInputChange}
                        type={type || "text"}
                        error={formErrors[name]}
                      />
                    ) : (
                      <p>{editedUserDetails[name]}</p>
                    )}
                  </div>
                ))}
                {dropdownFields.map(
                  ({ name, label, options, visibleSelectorString }) => (
                    <div key={name} className="mb-3">
                      <label>
                        <strong>{label}:</strong>
                      </label>
                      {isEditing ? (
                        <Dropdown
                          name={name}
                          value={editedUserDetails[name] || ""}
                          onChange={handleDropdownChange}
                          options={options}
                          visibleSelectorString={visibleSelectorString}
                          error={formErrors[name]}
                        />
                      ) : (
                        <p>
                          {(options.find(
                            (opt) =>
                              opt[
                                options[0] ? Object.keys(options[0])[0] : "id"
                              ] === editedUserDetails[name]
                          ) || {})[
                            options[0] ? Object.keys(options[0])[1] : "name"
                          ] || editedUserDetails[name]}
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseDeleteModal}
            className="cancel-btn"
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default UserEdit;
