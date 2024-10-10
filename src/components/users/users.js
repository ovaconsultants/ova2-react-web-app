import React, { useEffect, useState } from "react";
import { fetchUsers, updateUser } from "../../api/adminUserService";
import { fetchRegistrationTypes } from "../../api/registerService";
import { fetchRoles } from "../../api/adminUserService";
// Ensure updateUser is defined in your service

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null); // State to track the user being edited
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [registrationTypeMap, setRegistrationTypeMap] = useState({});
  const [roleMap, setRoleMap] = useState({});

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
  }, [updateTrigger]);

  useEffect(() => {}, []);
  const loadRegistrationTypes = async () => {
    try {
      const registrationTypes = await fetchRegistrationTypes();
      console.log(registrationTypes);
      // Transform to map
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
      // Transform to map
      console.log(rolesType);
      const map = rolesType.reduce((acc, type) => {
        acc[type.role_id] = type.role_name;
        return acc;
      }, {});
      setRoleMap(map);
    } catch (error) {
      console.error("Failed to fetch registration types:", error);
    }
  };
  useEffect(() => {
    loadRegistrationTypes();
    loadRolesTypes();
  }, []);

  const handleEditClick = (userId) => {
    setEditingUserId(userId); // Set the user ID being edited
  };

  const handleChange = (e, userId) => {
    const { name, value } = e.target;
    const newValue = name === "is_active" ? value === "true" : value;
    setUsers(
      users.map((user) =>
        user.registration_id === userId ? { ...user, [name]: newValue } : user
      )
    ); // Update the specific user field
  };

  const handleSubmit = async (e, userId) => {
    e.preventDefault();
    const userToUpdate = users.find((user) => user.registration_id === userId);
    try {
      await updateUser(userId, userToUpdate); // Update user in the backend
      setUpdateTrigger((prev) => !prev); // Clear the editing user ID
      setEditingUserId(null); // Set the user ID being edited
    } catch (error) {
      setError("Failed to update user"); // Handle error
    }
  };

  // Mapping for r

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User List</h2>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-light">
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Role</th> {/* Changed header to Role */}
                <th>Registration Type</th>{" "}
                {/* Changed header to Registration Type */}
                <th>Created Date</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.registration_id}>
                  <td>{index + 1}</td>
                  {editingUserId === user.registration_id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="first_name"
                          value={user.first_name}
                          onChange={(e) =>
                            handleChange(e, user.registration_id)
                          }
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="last_name"
                          value={user.last_name}
                          onChange={(e) =>
                            handleChange(e, user.registration_id)
                          }
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={(e) =>
                            handleChange(e, user.registration_id)
                          }
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="phone"
                          value={user.phone}
                          onChange={(e) =>
                            handleChange(e, user.registration_id)
                          }
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="address"
                          value={user.address}
                          onChange={(e) =>
                            handleChange(e, user.registration_id)
                          }
                          className="form-control"
                        />
                      </td>
                      <td>
                        <select
                          name="role_id"
                          value={user.role_id}
                          onChange={(e) =>
                            handleChange(e, user.registration_id)
                          }
                          className="form-control"
                        >
                          <option value="" disabled>
                            Select a role
                          </option>
                          <option value="1">User</option>
                          <option value="2">Admin</option>
                          <option value="3">Sub-admin</option>
                          <option value="4">Manager</option>
                          <option value="5">Sales Team</option>
                        </select>
                      </td>
                      <td>
                        <select
                          name="registration_type_id"
                          value={user.registration_type_id}
                          onChange={(e) =>
                            handleChange(e, user.registration_id)
                          }
                          className="form-control"
                        >
                          <option value="" disabled>
                            Select a registration type
                          </option>
                          <option value="1">Employee</option>
                          <option value="2">Vendor</option>
                          <option value="3">Client</option>
                          <option value="4">Trainee</option>
                          <option value="5">Educator</option>
                        </select>
                      </td>
                      <td>{new Date(user.created_date).toLocaleString()}</td>
                      <td>
                        <select
                          name="is_active"
                          value={user.is_active ? "true" : "false"}
                          onChange={(e) =>
                            handleChange(e, user.registration_id)
                          }
                          className="form-control"
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </td>

                      <td>
                        <button
                          className="btn btn-success"
                          onClick={(e) => handleSubmit(e, user.registration_id)}
                        >
                          <i className="bi bi-save fs-6"></i>
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setEditingUserId(null)} // Cancel editing
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.address}</td>
                      <td>{roleMap[user.role_id] || user.role_id}</td>
                      <td>
                        {registrationTypeMap[user.registration_type_id] ||
                          user.registration_type_id}
                      </td>
                      <td>{new Date(user.created_date).toLocaleString()}</td>
                      <td>{user.is_active ? "Yes" : "No"}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEditClick(user.registration_id)}
                        >
                          Edit
                        </button>
                      </td>
                    </>
                  )}
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
