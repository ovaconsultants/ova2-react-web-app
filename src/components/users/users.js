import React, { useEffect, useState } from "react";
import { fetchUsers, fetchRoles } from "../../api/adminUserService";
import { fetchRegistrationTypes } from "../../api/registerService";
import { useNavigate } from "react-router-dom";
import "./users.scss";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [registrationTypeMap, setRegistrationTypeMap] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegistrationType, setSelectedRegistrationType] = useState(null);
  const [selectedActiveStatus, setSelectedActiveStatus] = useState(null); // State for active status filter

  const filteredUsers = users.filter((user) => {
    // Search filtering
    const matchesSearch =
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery) ||
      user.address.toLowerCase().includes(searchQuery.toLowerCase());

    // Registration type filtering
    const matchesRegistrationType =
      selectedRegistrationType === null ||
      user.registration_type_id === selectedRegistrationType;

    // Active status filtering
    const matchesActiveStatus =
      selectedActiveStatus === null || user.is_active === (selectedActiveStatus === "yes");

    // Combine all filters
    return matchesSearch && matchesRegistrationType && matchesActiveStatus;
  });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await fetchUsers();
        setUsers(users);
      } catch {
        setError("Failed to load users");
      }
    };

    loadUsers();
  }, []);

  const handleCompanyNameClicked = (userId) => {
    navigate("/admin/users/user-details", { state: { userId } });
  };

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

  useEffect(() => {
    loadRegistrationTypes();
  }, []);

  // Handlers for filtering dropdowns
  const handleRegistrationTypeChange = (e) => {
    const registrationTypeId = e.target.value ? parseInt(e.target.value) : null;
    setSelectedRegistrationType(registrationTypeId);
  };

  const handleActiveStatusChange = (e) => {
    setSelectedActiveStatus(e.target.value);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User List</h2>
      
      {/* Search, Registration Type, and Active Status in a single line */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="flex-grow-1 mr-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search for users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Registration Type Dropdown */}
        <div className="ml-2">
          <select
            id="registrationType"
            className="form-control"
            value={selectedRegistrationType || ""}
            onChange={handleRegistrationTypeChange}
          >
            <option value="">-- Select Registration Type --</option>
            {Object.entries(registrationTypeMap).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Active Status Dropdown */}
        <div className="ml-2">
          <select
            id="activeStatus"
            className="form-control"
            value={selectedActiveStatus || ""}
            onChange={handleActiveStatusChange}
          >
            <option value="">-- Select Active Status --</option>
            <option value="yes">Active</option>
            <option value="no">Inactive</option>
          </select>
        </div>
      </div>

      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Role</th>
                <th>Registration Type</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.registration_id}>
                  <td>{index + 1}</td>
                  <td
                    id="FirstName"
                    onClick={() => {
                      handleCompanyNameClicked(user.registration_id);
                    }}
                    className="firstName cursor-pointer"
                  >
                    {user.first_name}
                  </td>

                  <td
                    onClick={() =>
                      handleCompanyNameClicked(user.registration_id)
                    }
                    className="firstName cursor-pointer"
                  >
                    {user.last_name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>{user.role_id}</td>
                  <td>
                    {registrationTypeMap[user.registration_type_id] ||
                      user.registration_type_id}
                  </td>
                  <td>{user.is_active ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
