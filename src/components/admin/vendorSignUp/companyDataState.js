
// Define the field names for your form
const fieldNames = [
    "company_name",
    "contact_no",
    "email_address",
    "company_type_id",
    "website_url",
    "location",
    "industry_sector",
    "contact_person_name",
    "contact_person_designation",
    "contact_person_phone",
    "contact_person_email",
    "employee",
    "followup",
    "followupdate",
    "communicatethrough",
    "currentposition",
    "comment",
    "description"
  ];
  

  // Function to return the initial state for companyData
  export const getCompanyDataInitialState = () => {
    return fieldNames.reduce((acc, field) => {
      acc[field] = field === "company_type_id" ? "1" : ""; // Set default value for company_type_id
      return acc;
    }, {});
  };
  
 export const getFormFields = () => {
    return [
      { name: "company_name" },
      { name: "email_address" },
      { name: "contact_no" },
      { name: "location" },
      { name: "website_url" },
      { name: "contact_person_name" },
      { name: "contact_person_phone" },
      { name: "contact_person_email" },
      { name: "employee" },
      { name: "followup" },
      { name: "currentposition" },
      { name: "comment" }
    ];
  };
  

  