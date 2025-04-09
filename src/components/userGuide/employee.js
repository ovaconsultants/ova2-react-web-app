import React from "react";
import './userGuide.scss';

const Employee = () => {
  return (
    <div className="container mt-4">
    <h1 className="text-start mb-3">Employee Registration Guide</h1>
    
    <p className="text-start">
      Easily register as an employee by following these simple steps. Here's a comprehensive guide to help you through the process:
    </p>
    <ol className="list-group list-group-numbered">
    <li className="list-group-item">
  <span className="fw-bold">Go to Login/Signup:</span> In the header section, there is an option for login/signup.
  <a href="https://www.ova2consultancy.com/sign-up" target="_blank" rel="noopener noreferrer" className="ms-1 text-primary">Sign-Up</a> to proceed.
  {/* Image Section */}
  <div className="text-start mb-3">
    <img 
      src="/images/Sign-up-employee.png" 
      alt="Sign Up Page" 
      className="img-fluid rounded shadow"
      style={{ width: "300px", marginTop: "10px", borderRadius: "5px" }}
    />
  </div>
</li>
      <li className="list-group-item">
        <span className="fw-bold">Fill up details (Registration Form):</span> Enter the required details such as First Name, Last Name, Email Address, Mobile Number, Password, and Address in the registration form.
        add this photo in this code
 <div className="text-start mb-3">
    <img 
      src="/images/name-id-contact.png" 
      alt="Registration form fields" 
      className="img-fluid rounded shadow"
      style={{ width: "400px", marginTop: "40px", borderRadius: "5px" }}
    />
  </div>
      </li>
      <li className="list-group-item">
        <span className="fw-bold">Select Registration Option:</span> In the registration form, choose the "Employee" option under the registration type.
        <div className="text-start mb-3">
    <img 
      src="/images/employee.png" 
      alt="Employee registration option" 
      className="img-fluid rounded shadow"
      style={{ width: "300px", marginTop: "10px", borderRadius: "5px" }}
    />
  </div>
      </li>
      <li className="list-group-item">
        <span className="fw-bold">Sign Up:</span> After providing all the details, click the Sign-Up button to proceed.
        <div className="text-start mb-3">
    <img 
      src="/images/sign-up.png" 
      alt="Sign Up button" 
      className="img-fluid rounded shadow"
      style={{ width: "300px", marginTop: "10px", borderRadius: "5px" }}
    />
  </div>
      </li>
      <li className="list-group-item">
        <span className="fw-bold">Verify Your Details:</span> Double-check all the information you've submitted to avoid any delays in the process.
        <div className="text-start mb-3">
    <img 
      src="/images/details-check.png" 
      alt="Submitted details for verification" 
      className="img-fluid rounded shadow"
      style={{ width: "300px", marginTop: "10px", borderRadius: "5px" }}
    />
  </div>
      </li>
      <li className="list-group-item">
        <span className="fw-bold">Follow Up (if needed):</span> Contact HR for assistance or updates on the process if you face any issues.
        
      </li>
    </ol>
    <p className="text-muted mt-3 fst-italic">
      For more guidance, refer to our website or contact your HR department.
    </p>
  </div>  
  );
};

export default Employee;