import React from "react";

export const Dropdown = ({
    name,
    value,
    onChange = () => {}, // Default to no-op function
    options = [], // Default to empty array
    error,
  }) => {
    return (
      <div className="form-group">
        <select
          className={`form-select mt-3 ${value ? 'input-has-value' : ''}`}
          name={name}
          value={value}
          onChange={onChange}
          required
        >
          <option value="" disabled>
            Register as a
          </option>
          {options.map((type) => (
            <option key={type.registration_type_id} value={type.registration_type_id}>
              {type.registration_type_name}
            </option>
          ))}
        </select>
        <div className="error-space">
          {error && <span className="error-message">{error}</span>}
        </div>
      </div>
    );
  };