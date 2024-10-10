import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserSearch = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  // Function to fetch users based on the search query
  const searchUsers = async (searchQuery) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/users/userSearch?query=${searchQuery}`);
      setUsers(response.data.users);
    } catch (err) {
      console.error('Error searching users:', err);
      setError('Failed to load users');
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { value } = e.target;
    setQuery(value);

    // Search when the input is not empty
    if (value) {
      searchUsers(value);
    } else {
      setUsers([]); // Clear users when input is empty
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search by name or email"
        style={{ width: '300px', padding: '10px', marginBottom: '20px' }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.first_name} {user.last_name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;
