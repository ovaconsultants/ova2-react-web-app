import React from "react";

const Dropdown = ({ name, options, value, onChange, placeholder }) => {
  return (
    <div className="col-auto">
      <select
        className="form-control mb-3 dropdown-height"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.id || opt.value} value={opt.id || opt.value}>
            {opt.type_name || opt.employeename || opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
