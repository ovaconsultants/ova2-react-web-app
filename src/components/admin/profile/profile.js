import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { updateUser, getUserDetails } from "../../../api/adminUserService";
import { FaPencilAlt } from "react-icons/fa";
import ToastMessage from "../../../constants/toastMessage";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faTimes,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const location = useLocation();
  const userId = location.state?.userId;
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const [editingField, setEditingField] = useState(null); // Track which field is being edited
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [newPassword, setNewPassword] = useState(""); // Temporary state for password input
  const [phoneInput, setPhoneInput] = useState(""); // Separate state for phone input

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const data = await getUserDetails(userId);
          setUserDetails(data);
          setPhoneInput(data.phone || ""); 
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = ({ target: { name, value } }) => {
    if (name === "phone") {
      // Allow only numeric values
      if (/^\d*$/.test(value)) {
        setPhoneInput(value);
        setFormErrors((prev) => ({
          ...prev,
          phone: value.length !== 10 ? "Phone number must be 10 digits" : "",
        }));
      }
    } else if (name === "password") {
      setNewPassword(value); // Store the password securely in the temporary state
    } else {
      setUserDetails((prev) => ({ ...prev, [name]: value }));
      setFormErrors((prev) => ({
        ...prev,
        [name]: !value ? `${name} is required` : "",
      }));
    }
  };

  const handleSave = async (field) => {
    if (formErrors[field]) {
      alert("Please fix the errors before saving.");
      return;
    }

    try {
      const updatedValue =
        field === "phone" ? { phone: phoneInput } : 
        field === "password" ? { password: newPassword } : 
        { [field]: userDetails[field] };

      await updateUser(userId, updatedValue);

      if (field === "phone") {
        setUserDetails((prev) => ({ ...prev, phone: phoneInput }));
      } else if (field === "password") {
        setUserDetails((prev) => ({ ...prev, password: newPassword }));
        setNewPassword(""); // Clear the temporary password state after saving
      }

      ToastMessage("Field updated successfully!");
      setEditingField(null); // Exit edit mode for the field
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  if (!userId ) {
    return <p>No user selected. Please go back and try again.</p>;
  }

  
  if (loading) {
    return <p>Loading...</p>; 
  }


  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      <div className="card p-4">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* First Name */}
          <div className="row mb-3">
            <div className="col-md-6 text-start">
              <strong className="me-3">First Name:</strong>
              <p className="mb-0">{userDetails.first_name || "Not Provided"}</p>
            </div>

            {/* Last Name */}
            <div className="col-md-6 text-start">
              <strong className="me-3">Last Name:</strong>
              <p className="mb-0">{userDetails.last_name || "Not Provided"}</p>
            </div>
          </div>

          {/* Email */}
          <div className="row mb-3">
            <div className="col-md-6 text-start">
              <strong className="me-3">Email:</strong>
              {editingField === "email" ? (
                <>
                  <input
                    type="email"
                    name="email"
                    value={userDetails.email || ""}
                    onChange={handleInputChange}
                    className="form-control me-2"
                    style={{ maxWidth: "300px" }}
                  />
                  <div className="mt-2">
                    <button
                      className="btn btn-primary me-3"
                      onClick={() => handleSave("email")}
                    >
                      <FontAwesomeIcon icon={faSave} />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => setEditingField(null)}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="mb-0 me-3">
                    {userDetails.email || "Not Provided"}
                  </p>
                  <button
                    className="btn btn-light btn-sm text-primary"
                    onClick={() => setEditingField("email")}
                  >
                    <FaPencilAlt />
                  </button>
                </>
              )}
            </div>

            {/* Phone */}
            <div className="col-md-6 text-start">
              <strong className="me-3">Phone:</strong>
              {editingField === "phone" ? (
                <>
                  <input
                    type="text"
                    name="phone"
                    value={phoneInput}
                    onChange={handleInputChange}
                    className="form-control me-2"
                    style={{ maxWidth: "300px" }}
                    maxLength="10"
                  />
                  {formErrors.phone && (
                    <p className="text-danger mt-1">{formErrors.phone}</p>
                  )}
                  <div className="mt-2">
                    <button
                      className="btn btn-primary me-3"
                      onClick={() => handleSave("phone")}
                      disabled={formErrors.phone !== ""}
                    >
                      <FontAwesomeIcon icon={faSave} />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => setEditingField(null)}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="mb-0 me-3">
                    {userDetails.phone || "Not Provided"}
                  </p>
                  <button
                    className="btn btn-light btn-sm text-primary"
                    onClick={() => setEditingField("phone")}
                  >
                    <FaPencilAlt />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="row mb-3">
            <div className="col-md-6 text-start">
              <strong className="me-3">Password:</strong>
              {editingField === "password" ? (
                <>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={handleInputChange}
                    className="form-control me-2"
                    style={{ maxWidth: "300px" }}
                  />
                  <div className="mt-2">
                    <button
                      className="btn btn-primary me-3"
                      onClick={() => handleSave("password")}
                    >
                      <FontAwesomeIcon icon={faSave} />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setEditingField(null);
                        setNewPassword("");
                      }}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <button
                      className="btn btn-light ms-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="mb-0 me-3">********</p>
                  <button
                    className="btn btn-light btn-sm text-primary"
                    onClick={() => setEditingField("password")}
                  >
                    <FaPencilAlt />
                  </button>
                </>
              )}
            </div>

            {/* Address */}
            <div className="col-md-6 text-start">
              <strong className="me-3">Address:</strong>
              {editingField === "address" ? (
                <>
                  <input
                    type="text"
                    name="address"
                    value={userDetails.address || ""}
                    onChange={handleInputChange}
                    className="form-control me-2"
                    style={{ maxWidth: "300px" }}
                  />
                  <div className="mt-2">
                    <button
                      className="btn btn-primary me-3"
                      onClick={() => handleSave("address")}
                    >
                      <FontAwesomeIcon icon={faSave} />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => setEditingField(null)}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="mb-0 me-3">
                    {userDetails.address || "Not Provided"}
                  </p>
                  <button
                    className="btn btn-light btn-sm text-primary"
                    onClick={() => setEditingField("address")}
                  >
                    <FaPencilAlt />
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
