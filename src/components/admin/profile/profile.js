import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  updateUser,
  updateUserTechnologies,
  getUserDetails,
  fetchSoftwareTechnologies,
} from "../../../api/adminUserService";
import ToastMessage from "../../../constants/toastMessage";
import { ToastContainer } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";
import EditableField from "./editableField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FaPencilAlt } from "react-icons/fa";

// Custom hooks for user details and technologies
const useUserDetails = (userId) => {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getUserDetails(userId);
        setUserDetails(data);
      } catch (err) {
        setError("Error fetching user details.");
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchDetails();
  }, [userId]);

  return { userDetails, setUserDetails, loading, error };
};

const useTechnologies = () => {
  const [technologies, setTechnologies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const data = await fetchSoftwareTechnologies();
        setTechnologies(data);
      } catch (err) {
        setError("Error fetching technologies.");
      }
    };
    fetchTechnologies();
  }, []);

  return { technologies, error };
};

const Profile = () => {
  const { userId } = useParams();
  const { userDetails, setUserDetails, loading, error: userError } = useUserDetails(userId);
  const { technologies, error: techError } = useTechnologies();

  const [editingField, setEditingField] = useState(null);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [showPassword ] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (userDetails.technologies) {
      const techArray = userDetails.technologies.split(",").map(Number);
      setSelectedTechnologies(techArray);
    }
  }, [userDetails]);

  const handleInputChange = ({ target: { name, value } }) => {
    if (name === "phone") {
      if (/^\d*$/.test(value)) {
        setFormErrors((prev) => ({ ...prev, phone: value.length !== 10 ? "Phone number must be 10 digits" : "" }));
        setUserDetails((prev) => ({ ...prev, phone: value }));
      }
    } else if (name === "password") {
      setNewPassword(value);
    } else {
      setUserDetails((prev) => ({ ...prev, [name]: value }));
      setFormErrors((prev) => ({ ...prev, [name]: !value ? `${name} is required` : "" }));
    }
  };

  const handleSave = async (field) => {
    if (formErrors[field]) return;
    try {
      const payload = field === "password" ? { password: newPassword } : { [field]: userDetails[field] };
      await updateUser(userId, payload);
      ToastMessage(`${field} updated successfully!`);
      setEditingField(null);
      if (field === "password") setNewPassword("");
    } catch (err) {
      console.error(`Error updating ${field}:`, err);
    }
  };

  const handleSaveTechnologies = async () => {
    try {
      const techIds = selectedTechnologies.join(",");
      await updateUserTechnologies(userId, techIds);
      ToastMessage("Technologies updated successfully!");
      setEditingField(null);
    } catch (err) {
      console.error("Error updating technologies:", err);
    }
  };

  if (!userId) return <p>No user selected. Please provide a valid user ID.</p>;
  if (loading) return <p>Loading...</p>;
  if (userError || techError) return <p>{userError || techError}</p>;

  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      <div className="card p-4">
        <form onSubmit={(e) => e.preventDefault()} className="row">
          {/* Left Section */}
          <div className="col-md-6">
          <div className="col-md-6 text-start">
              <strong className="me-3">First Name:</strong>
              <p className="mb-0">{userDetails.first_name || "Not Provided"}</p>
            </div>
            <EditableField
              label="Email"
              name="email"
              value={userDetails.email}
              onSave={handleSave}
              onChange={handleInputChange}
              editing={editingField === "email"}
              setEditing={setEditingField}
              error={formErrors.email}
            />
            <EditableField
              label="Phone"
              name="phone"
              value={userDetails.phone}
              onSave={handleSave}
              onChange={handleInputChange}
              editing={editingField === "phone"}
              setEditing={setEditingField}
              error={formErrors.phone}
            />
            <EditableField
              label="Password"
              name="password"
              value={newPassword}
              onSave={handleSave}
              onChange={handleInputChange}
              editing={editingField === "password"}
              setEditing={setEditingField}
              type={showPassword ? "text" : "password"}
            />
            <div className="mb-3">
            <div className="col-md-6 text-start">
              <strong>Technologies:</strong>
              {editingField === "technology" ? (
                <>
                  <Multiselect
                    options={technologies}
                    selectedValues={selectedTechnologies.map((id) =>
                      technologies.find((tech) => tech.id === id)
                    )}
                    onSelect={(list) => setSelectedTechnologies(list.map((item) => item.id))}
                    onRemove={(list) => setSelectedTechnologies(list.map((item) => item.id))}
                    displayValue="technology"
                  />
                  <div className="mt-2 d-flex gap-3">
                    <button className="btn btn-primary" onClick={handleSaveTechnologies}>
                      <FontAwesomeIcon icon={faSave} />
                    </button>
                    <button className="btn btn-danger" onClick={() => setEditingField(null)}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>{selectedTechnologies.map((id) => technologies.find((t) => t.id === id)?.technology).join(", ")}</p>
                  <button
                    className="btn btn-light btn-sm text-primary"
                    onClick={() => setEditingField("technology")}
                  >
                    <FaPencilAlt />
                  </button>
                </>
              )}
            </div>
          </div>
          </div>

          {/* Right Section */}
          <div className="col-md-6">
          <div className="col-md-6 text-start">
              <strong className="me-3">Last Name:</strong>
              <p className="mb-0">{userDetails.last_name || "Not Provided"}</p>
            </div>
            <EditableField
              label="Address"
              name="address"
              value={userDetails.address}
              onSave={handleSave}
              onChange={handleInputChange}
              editing={editingField === "address"}
              setEditing={setEditingField}
              error={formErrors.address}
            />
            <EditableField
              label="Current Location"
              name="current_location"
              value={userDetails.current_location}
              onSave={handleSave}
              onChange={handleInputChange}
              editing={editingField === "current_location"}
              setEditing={setEditingField}
              error={formErrors.current_location}
            />
            <EditableField
              label="Experience (Years)"
              name="experience_in_years"
              value={userDetails.experience_in_years}
              onSave={handleSave}
              onChange={handleInputChange}
              editing={editingField === "experience_in_years"}
              setEditing={setEditingField}
              error={formErrors.experience_in_years}
            />
            
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
