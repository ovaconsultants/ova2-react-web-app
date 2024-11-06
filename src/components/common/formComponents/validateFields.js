
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
    console.log("errors from edit page",errors);
    return errors;
  };
  
  // validateFields.js
  export const validateEditingField = (name, value, formErrors) => {
    const errors = { ...formErrors };
  
    switch (name) {
      case 'first_name':
      case 'last_name':
        if (!value) {
          errors[name] = 'This field is required';
        } else {
          delete errors[name]; // Clear the error if it passes validation
        }
        break;
  
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errors[name] = 'Email is required';
        } else if (!emailRegex.test(value)) {
          errors[name] = 'Invalid email format';
        } else {
          delete errors[name];
        }
        break;
  
      case 'address':
        if (!value) {
          errors[name] = 'Address is required';
        } else if (value.length < 5) { // Minimum 5 characters for address
          errors[name] = 'Address must be at least 5 characters long';
        } else {
          delete errors[name];
        }
        break;
  
      case 'phone':
        const phoneRegex = /^[0-9]{10}$/; // Adjust based on your phone number format
        if (!value) {
          errors[name] = 'Phone number is required';
        } else if (!phoneRegex.test(value)) {
          errors[name] = 'Phone number must be 10 digits';
        } else {
          delete errors[name];
        }
        break;
  
      // Add more cases as needed for other fields
      default:
        break;
    }
  
    return errors;
  };
  
  export const validateCompanyEditingField = (name, value, formErrors) => {
    const errors = { ...formErrors };
    
    switch (name) {
      case 'company_name':
        if (!value) {
          errors[name] = 'Company name is required';
        } else if (value.length < 2) {
          errors[name] = 'Company name must be at least 2 characters long';
        } else {
          delete errors[name];
        }
        break;
  
      case 'contact_no':
        const contactNoRegex = /^\+?[0-9]{10,15}$/;
        if (!value) {
          errors[name] = 'Contact number is required';
        } else if (!contactNoRegex.test(value)) {
          errors[name] = 'Invalid contact number format';
        } else {
          delete errors[name];
        }
        break;
  
      case 'email_address':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errors[name] = 'Email address is required';
        } else if (!emailRegex.test(value)) {
          errors[name] = 'Invalid email address format';
        } else {
          delete errors[name];
        }
        break;
  
      case 'company_type_id':
        if (!value) {
          errors[name] = 'Please select a company type';
        } else {
          delete errors[name];
        }
        break;
  
      case 'website_url':
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
        if (value && !urlRegex.test(value)) {
          errors[name] = 'Invalid website URL format';
        } else {
          delete errors[name];
        }
        break;
  
      case 'location':
        if (!value) {
          errors[name] = 'Location is required';
        } else {
          delete errors[name];
        }
        break;
  
      case 'established_year':
        const yearRegex = /^(19|20)\d{2}$/;
        if (!value) {
          errors[name] = 'Established year is required';
        } else if (!yearRegex.test(value)) {
          errors[name] = 'Invalid year format';
        } else {
          delete errors[name];
        }
        break;
  
      case 'industry_sector':
        if (!value) {
          errors[name] = 'Industry sector is required';
        } else {
          delete errors[name];
        }
        break;
  
      case 'contact_person_name':
        if (!value) {
          errors[name] = 'Contact person name is required';
        } else {
          delete errors[name];
        }
        break;
  
      case 'contact_person_designation':
        if (!value) {
          errors[name] = 'Contact person designation is required';
        } else {
          delete errors[name];
        }
        break;
  
      case 'contact_person_phone':
        if (!value) {
          errors[name] = 'Contact person phone is required';
        } else if (!contactNoRegex.test(value)) {
          errors[name] = 'Invalid phone number format';
        } else {
          delete errors[name];
        }
        break;
  
      case 'contact_person_email':
        if (!value) {
          errors[name] = 'Contact person email is required';
        } else if (!emailRegex.test(value)) {
          errors[name] = 'Invalid email format';
        } else {
          delete errors[name];
        }
        break;
  
      case 'currentposition':
        if (!value) {
          errors[name] = 'Current position is required';
        } else {
          delete errors[name];
        }
        break;
  
      case 'employee':
        if (!value) {
          errors[name] = 'Responder is required';
        } else {
          delete errors[name];
        }
        break;
  
      case 'description':
        if (value && value.length < 10) {
          errors[name] = 'Description must be at least 10 characters';
        } else {
          delete errors[name];
        }
        break;
  
      case 'comment':
        if (value && value.length < 5) {
          errors[name] = 'Comment must be at least 5 characters';
        } else {
          delete errors[name];
        }
        break;
  
      default:
        break;
    }
  
    return errors;
  };
  