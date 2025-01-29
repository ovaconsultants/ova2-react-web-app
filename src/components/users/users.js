import React, { useEffect, useState, useRef } from "react";
import {
  fetchUsers,
  fetchRoles,
  postExcelUserFile,
} from "../../api/adminUserService";
import { fetchRegistrationTypes } from "../../api/registerService";
import { useNavigate } from "react-router-dom";
import "./users.scss";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [registrationTypeMap, setRegistrationTypeMap] = useState({});
  const [roleMap, setRoleMap] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegistrationType, setSelectedRegistrationType] =
    useState(null);
  const [selectedActiveStatus, setSelectedActiveStatus] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const fileInputRef = useRef(null);

  // File upload states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState(null);
  const [uploadResponse, setUploadResponse] = useState("");
  const [visibleUsers, setVisibleUsers] = useState(20);
  const loadMoreRef = useRef(null);

  // Filtered users based on selected filters
  const filteredUsers = users.filter((user) => {
    // Search filtering
    const matchesSearch =
      (user.first_name &&
        user.first_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.last_name &&
        user.last_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.email &&
        user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.phone && user.phone.includes(searchQuery)) ||
      (user.address &&
        user.address.toLowerCase().includes(searchQuery.toLowerCase()));

    // Registration type filtering
    const matchesRegistrationType =
      selectedRegistrationType === null ||
      user.registration_type_id === selectedRegistrationType;

    const matchesRole = selectedRole === null || user.role_id === selectedRole;

    // Active status filtering
    const matchesActiveStatus =
      selectedActiveStatus === null ||
      user.is_active === (selectedActiveStatus === "yes");

    // Combine all filters
    return (
      matchesSearch &&
      matchesRegistrationType &&
      matchesRole &&
      matchesActiveStatus
    );
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

  const handleRegistrationTypeChange = (e) => {
    const registrationTypeId = e.target.value ? parseInt(e.target.value) : null;
    setSelectedRegistrationType(registrationTypeId);
  };

  const handleRoleChange = (e) => {
    const roleid = e.target.value ? parseInt(e.target.value) : null;
    setSelectedRole(roleid);
  };

  const handleActiveStatusChange = (e) => {
    setSelectedActiveStatus(e.target.value);
  };

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleUsers((prev) => prev + 20);
        }
      },
      { threshold: 1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [visibleUsers]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadResponse("");
    setUploadMessage("User Data is uploading... Please wait.");

    try {
      const response = await postExcelUserFile(file);

      if (response) {
        const { successfulRegistrations, failedRegistrations } = response;

        if (
          successfulRegistrations.length === 0 &&
          failedRegistrations.length > 0
        ) {
          setUploadResponse("All records already exist.");
        } else if (successfulRegistrations.length > 0) {
          setUploadResponse("Records updated Successfully!");
        }
      } else {
        setUploadResponse("No data returned from server.");
      }

      // Refresh user list
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
    } catch (err) {
      setUploadResponse("File upload failed. Please try again.");
      console.error("File upload error:", err);
    } finally {
      setIsUploading(false);
      setUploadMessage("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setTimeout(() => {
        setUploadResponse("");
      }, 3000);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User List</h2>

      {/* 🔹 Search and Filters */}
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
        {/* Role  Type Dropdown */}
        <div className="ml-2">
          <select
            id="roleType"
            className="form-control"
            value={selectedRole || ""}
            onChange={handleRoleChange}
          >
            <option value="">-- Select Role Type --</option>
            {Object.entries(roleMap).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
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

        {/* 🔹 Upload Section */}
        <div className="ml-2">
          <input
            type="file"
            accept=".xlsx, .xls"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: "none" }}
            id="uploadFileInput"
            disabled={isUploading}
          />

          <label
            htmlFor="uploadFileInput"
            className={`btn ${
              isUploading ? "btn-secondary" : "btn-primary"
            } mb-3`}
          >
            {isUploading ? "Uploading..." : "Upload Excel"}
          </label>

          {isUploading && (
            <div className="alert alert-info mt-2" role="alert">
              {uploadMessage || "Vendor Data is uploading... Please wait."}
            </div>
          )}
          {uploadResponse && (
            <div className="text-info mt-2">{uploadResponse}</div>
          )}
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
                    onClick={() =>
                      handleCompanyNameClicked(user.registration_id)
                    }
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
                  <td>{roleMap[user.role_id] || user.role_id}</td>
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
      {visibleUsers < filteredUsers.length && (
        <div className="text-center mt-3">
          <button
            className="btn btn-primary"
            onClick={() => setVisibleUsers((prev) => prev + 20)}
          >
            Show More
          </button>
        </div>
      )}
      <div ref={loadMoreRef} style={{ height: "20px" }}></div>
    </div>
  );
};

export default Users;
