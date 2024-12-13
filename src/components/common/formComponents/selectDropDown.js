import React from "react";

export const Dropdown = ({
  visibleSelectorString,
  name,
  value,
  onChange = () => {},
  options = [],
  error,
}) => {
  const keyField = options[0] ? Object.keys(options[0])[0] : "id";
  const valueField = options[0] ? Object.keys(options[0])[0] : "id";
  const labelField = options[0] ? Object.keys(options[0])[1] : "name";

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
          {visibleSelectorString}
        </option>
        {options.map((option) => (
  <option key={option[keyField]} value={option[valueField]}>
    {option[labelField]
      .toLowerCase() // Convert the entire string to lowercase first
      .replace(/^\w/, (c) => c.toUpperCase()) // Capitalize the first letter
    }
  </option>
))}

      </select>
      <div className="error-space">
        {error && <span className="error-message">{error}</span>}
      </div>
    </div>
  );
};
