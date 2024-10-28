
export const validateField = (name, value, formErrors) => {
    let errors = { ...formErrors };
  
    const validationRules = {
      FirstName: {
        minLength: 2,
        errorMessage: "First name must be at least 2 characters",
        containsNumber: "First name contains numbers",
      },
      LastName: {
        minLength: 2,
        errorMessage: "Last name must be at least 2 characters",
        containsNumber: "Last name contains numbers",
      },
      Email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: "Invalid email address",
      },
      Phone_number: {
        regex: /^\+?[0-9]{10,15}$/,
        errorMessage: "Invalid phone number",
      },
      Password: {
        minLength: 8,
        errorMessage: "Password must be at least 8 characters long",
      },
      Address: {
        minLength: 8,
        errorMessage: "Address must be at least 8 characters",
      },
      registrationTypeId: {
        required: true,
        errorMessage: "Please select a registration type",
      },
    };
  
    const fieldRule = validationRules[name];
  
    if (fieldRule) {
      // Check for minimum length
      if (fieldRule.minLength && value.length < fieldRule.minLength) {
        errors[name] = fieldRule.errorMessage;
      } else {
        errors[name] = "";
      }
  
      // Check for numbers in names
      if ((name === "FirstName" || name === "LastName") && value.search(/\d/) !== -1) {
        errors[name] += ` ${fieldRule.containsNumber}`;
      }
  
      // Check for regex pattern match
      if (fieldRule.regex && !fieldRule.regex.test(value)) {
        errors[name] = fieldRule.errorMessage;
      }
  
      // Check for required field
      if (fieldRule.required && value === "") {
        errors[name] = fieldRule.errorMessage;
      }
    }
    return errors;
  };
  