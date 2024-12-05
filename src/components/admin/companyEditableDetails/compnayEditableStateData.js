
import { Form } from "react-bootstrap";
export const getInitialCompanyDetails = () => ({
    company_name: "",
    contact_no: "",
    email_address: "",
    company_type_id: "",
    communicatethrough: "",
    website_url: "",
    location: "",
    industry_sector: "",
    comment: "",
    contact_person_name: "",
    contact_person_designation: "",
    contact_person_phone: "",
    contact_person_email: "",
    currentposition: "",
    employee: "",
  });
  
 export const  fieldsData = [
    { label: "Company Name", name: "company_name", type: "text" },
    { label: "Contact No", name: "contact_no", type: "text" },
    { label: "Email Address", name: "email_address", type: "email" },
    { label: "Website", name: "website_url", type: "text" },
    { label: "Location", name: "location", type: "text" },
    { label: "Industry Sector", name: "industry_sector", type: "text" },
  ];

  export const secondaryFieldsData = [
    { label: "Contact Person Name", name: "contact_person_name", type: "text" },
    { label: "Designation", name: "contact_person_designation", type: "text" },
    { label: "Contact Person Phone", name: "contact_person_phone", type: "text" },
  ];
  
  // Reusable Select  Component 
  export const SelectField = ({ label, name, options, value, onChange, isEditing, error }) => (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label className="fw-bold text-start w-100">{label}</Form.Label>
      {isEditing ? (
        <Form.Select  name={name} value={value} onChange={onChange} className="text-start single_dropDown">
          <option value="">--Select--</option>
          {options.map(option => (
            <option key={option.id} value={option.id}>{option.employeename || option.sts}</option>
          ))}
        </Form.Select>
      ) : (
        <p className="mb-0 text-start">
     {options.find(opt => opt.id == value)?.employeename || options.find(opt => opt.id === value)?.sts || "Not selected"}
        </p>
      )}
      {error && <small className="text-danger">{error}</small>}
    </Form.Group>
  );

  
  // Reusable Editable Component 
 export  const EditableField = ({ label, name, type = "text", value, onChange, error, isEditing }) => (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label className="fw-bold text-start w-100">{label}</Form.Label>
      {isEditing ? (
        <Form.Control type={type} name={name} value={value} onChange={onChange} className="text-start" />
      ) : (
        <p className="mb-0 text-start">{value}</p>
      )}
      {error && <small className="text-danger">{error}</small>}
    </Form.Group>
  );
  