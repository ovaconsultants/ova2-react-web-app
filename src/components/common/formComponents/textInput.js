  import React from "react";

  // TextInput Component
  export const TextInput = ({
    name,
    value,
    error,
    type = "text",
    onChange = ()=>{} ,
  }) => {
    return (
      <div className="form-group">
        <input
          name={name}
          type={type}
          className={`form-control ${value ? 'input-has-value' : ''}`}
          placeholder={name}
          value={value}
          onChange={onChange}
          required
        />
        <div className="error-space">
          {error && <span className="error-message">{error}</span>}
        </div>
      </div>
    );
  };


