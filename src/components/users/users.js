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
  const [roleMap, setRoleMap] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery) ||
      user.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    navigate(`/admin/users/${userId}`);
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

  useEffect(() => {
    loadRegistrationTypes();
    loadRolesTypes();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User List</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search for users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
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
                <th>Created Date</th>
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
