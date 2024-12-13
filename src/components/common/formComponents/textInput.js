// TextInput Component
export const TextInput = ({
  name,
  label,
  value,
  error,
  type = "text",
  onChange = () => {},
}) => {
  return (
    <div className="form-group">
      {name === "Phone Number" ? (
        <input
        name={name}
        type="tel" // Use tel for phone number (helps mobile devices show a numeric keypad)
        className={`form-control ${value ? 'input-has-value' : ''}`}
        placeholder={label || name}
        value={value}
        onChange={onChange}
        maxLength="10" // Limit input to 10 digits
        pattern="[0-9]{10}" // Validates 10 digits
        onInput={(e) => {
          // Allow only numeric digits and update the value
          e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
        }}
        required
      />
      
      ) : (
        <input
          name={name}
          type={type} // Default to 'text', or use the type passed as a prop
          className={`form-control ${value ? 'input-has-value' : ''}`}
          placeholder={label || name} // Use 'label' if provided, otherwise use 'name'
          value={value}
          onChange={onChange}
          required
        />
      )}
      <div className="error-space">
        {error && <span className="error-message">{error}</span>}
      </div>
    </div>
  );
};
