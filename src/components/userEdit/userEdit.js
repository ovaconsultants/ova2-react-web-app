import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { IconName } from "react-icons/fa"

import {
  updateUser,
  fetchRoles,
  getUserDetails,
  deleteUser,
} from "../../api/adminUserService";
import { fetchRegistrationTypes } from "../../api/registerService";
import ToastMessage from "../../constants/toastMessage";
import { ToastContainer } from "react-toastify";
import "./userEdit.scss";

const UserEdit = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserDetails, setEditedUserDetails] = useState({});
  const [registrationTypeMap, setRegistrationTypeMap] = useState({});
  const [roleMap, setRoleMap] = useState({});
  const { userId } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleConfirmDelete = async () => {
    try {
      ToastMessage("user deleted successfully");
      await deleteUser(userId);
      setTimeout(() => {
        navigate("/admin/users");
      }, 3000);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    } finally {
      setShowDeleteModal(false);
    }
  };

  // Fetch user details
  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const data = await getUserDetails(userId);
        console.log("Data for user:", data);
        setEditedUserDetails(data);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    if (userId) {
      loadUserDetails();
    }
  }, [userId]);

  // Fetch registration types and roles
  useEffect(() => {
    const loadRegistrationTypes = async () => {
      try {
        const registrationTypes = await fetchRegistrationTypes();
        const map = registrationTypes.reduce((acc, type) => {
          acc[type.registration_type_id] = type.registration_type_name;
          return acc;
        }, {});
        setRegistrationTypeMap(map);
      } catch (error) {
        console.error("Failed to fetch registration types:", error);
      }
    };

    const loadRolesTypes = async () => {
      try {
        const rolesType = await fetchRoles();
        const map = rolesType.reduce((acc, type) => {
          acc[type.role_id] = type.role_name;
          return acc;
        }, {});
        setRoleMap(map);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    };

    loadRegistrationTypes();
    loadRolesTypes();
  }, []);

  // Input change handler for text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Input change handler for dropdowns (Role, Registration Type)
  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setEditedUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Active status change handler
  const handleActiveChange = (e) => {
    const value = e.target.value === "Yes";
    setEditedUserDetails((prevState) => ({
      ...prevState,
      is_active: value,
    }));
  };

  // Save updated user details
  const handleSave = async () => {
    try {
      await updateUser(userId, editedUserDetails);
      alert("User details updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user details", error);
      alert("Error updating user details");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-8 text-start">
          <h2>{isEditing ? "Edit User Details" : "User Details"}</h2>
        </div>
        <div className="col-4 text-end">
          {isEditing ? (
            <>
              <button className="btn btn-success" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn btn-secondary ms-2"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
               <FaEdit /> 
              </button>

              <button
                className="btn btn-danger ms-2"
                onClick={handleShowDeleteModal}
              >
                Delete
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
                <div className="mb-3">
                  <label>
                    <strong>First Name:</strong>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="first_name"
                      value={editedUserDetails.first_name || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{editedUserDetails.first_name}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label>
                    <strong>Role:</strong>
                  </label>
                  {isEditing ? (
                    <select
                      className="form-control"
                      name="role_id"
                      value={editedUserDetails.role_id || ""}
                      onChange={handleDropdownChange}
                    >
                      {Object.entries(roleMap).map(([id, name]) => (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p>
                      {roleMap[editedUserDetails.role_id] ||
                        editedUserDetails.role_id}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label>
                    <strong>Active:</strong>
                  </label>
                  {isEditing ? (
                    <select
                      className="form-control"
                      value={editedUserDetails.is_active ? "Yes" : "No"}
                      onChange={handleActiveChange}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  ) : (
                    <p>{editedUserDetails.is_active ? "Yes" : "No"}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label>
                    <strong>Email:</strong>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={editedUserDetails.email || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{editedUserDetails.email}</p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label>
                    <strong>Last Name:</strong>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="last_name"
                      value={editedUserDetails.last_name || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{editedUserDetails.last_name}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label>
                    <strong>Registration Type:</strong>
                  </label>
                  {isEditing ? (
                    <select
                      className="form-control"
                      name="registration_type_id"
                      value={editedUserDetails.registration_type_id || ""}
                      onChange={handleDropdownChange}
                    >
                      {Object.entries(registrationTypeMap).map(([id, name]) => (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p>
                      {registrationTypeMap[
                        editedUserDetails.registration_type_id
                      ] || editedUserDetails.registration_type_id}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label>
                    <strong>Address:</strong>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={editedUserDetails.address || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{editedUserDetails.address}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label>
                    <strong>Phone:</strong>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={editedUserDetails.phone || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{editedUserDetails.phone}</p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure! You want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseDeleteModal}
            className="cancel-btn"
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            ok
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default UserEdit;
