import React, { useEffect, useState } from "react";
import {
  fecthingEmployeeNames,
  postingEmployeeSalaryData,
} from "../../../api/employeeService";
import "./generatePaySlip.scss";
import { ToastContainer } from "react-toastify";
import ToastMessage from "../../../constants/toastMessage";

const GeneratePaySlip = () => {
  const [employeeNames, setEmployeeNames] = useState([]);
  const [fullNames, setFullNames] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    employeeId: "",
    designation: "",
    monthYear: "",
    bankName: "",
    bankTransaction: "",
    salary: 0,
    da: 0,
    ta: 0,
    hra: 0,
    providentFund: 0,
    esi: 0,
    tax: 0,
    loan: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const names = await fecthingEmployeeNames();
        setEmployeeNames(names);
        const namesList = names.map(
          (employee) => `${employee.first_name} ${employee.last_name}`
        );
        setFullNames(namesList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === "" ? "" : isNaN(value) ? value : parseFloat(value),
    }));
  };

  const computeGrossSalary = () =>
    (Number(formData.salary) || 0) +
    (Number(formData.da) || 0) +
    (Number(formData.ta) || 0) +
    (Number(formData.hra) || 0);
  
  const computeTotalDeduction = () =>
    (Number(formData.providentFund) || 0) +
    (Number(formData.esi) || 0) +
    (Number(formData.tax) || 0) +
    (Number(formData.loan) || 0);
  

  const computeNetSalary = () =>
    computeGrossSalary() - computeTotalDeduction();

  const handleSave = async () => {
    const salaryData = {
      employee_id: formData.employeeId,
      basic_salary: formData.salary,
      da: formData.da,
      ta: formData.ta,
      hra: formData.hra,
      provident_fund: formData.providentFund,
      esi: formData.esi,
      tax: formData.tax,
      loan: formData.loan,
      pay_month: formData.monthYear,
      bank_name: formData.bankName,
      bank_transaction: formData.bankTransaction,
    };

    try {
      const response = await postingEmployeeSalaryData(salaryData);
     ToastMessage('Payslip updated successfully');
    
    } catch (error) {
      console.log("Error saving pay slip:", error); 
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: "",
      employeeId: "",
      designation: "",
      monthYear: "",
      bankName: "",
      bankTransaction: "",
      salary: 0,
      da: 0,
      ta: 0,
      hra: 0,
      providentFund: 0,
      esi: 0,
      tax: 0,
      loan: 0,
    });
  };

  return (
    <div>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block">
                <h1>Generate Pay Slip</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-form">
        <div className="container">
          <form className="row" id="generatePaySlip-form">
            {/* Employee Details Section */}
            <table className="table table-bordered mt-3">
              <tbody>
                <tr>
                  <td> Employee Name </td>
                  <td> <div className=" d-flex">
              <div className="form-group w-100">
                <select
                  className={`form-select mt-3 ${
                    formData.fullName ? "input-has-value" : ""
                  } form-control `}
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>choose name</option>
                  {fullNames.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div></td>
                  <td>Employee Id</td>
                  <td>
                    <input
                      type="text"
                      name="employeeId"
                      className="form-control"
                      placeholder="Employee ID"
                      value={formData.employeeId || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>Designation</td>
                  <td>
                    <input
                      type="text"
                      name="designation"
                      className="form-control"
                      placeholder="Designation"
                      value={formData.designation || ""}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Bank Name</td>
                  <td>
                    <input
                      type="text"
                      name="bankName"
                      className="form-control"
                      placeholder="Bank Name"
                      value={formData.bankName || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>Bank Transaction</td>
                  <td>
                    <input
                      type="text"
                      name="bankTransaction"
                      className="form-control"
                      placeholder="Bank Transaction"
                      value={formData.bankTransaction || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>Month/Year</td>
                  <td>
                    <input
                      type="date"
                      name="monthYear"
                      className="form-control"
                      placeholder="Month and year"
                      value={formData.monthYear || ""}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Income and Deduction Section */}
            <table className="table table-bordered mt-4">
              <thead>
                <tr>
                  <th>Income</th>
                  <th></th>
                  <th>Deduction</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Basic Salary</td>
                  <td>
                    <input
                      type="number"
                      name="salary"
                      className="form-control"
                      placeholder="Basic Salary"
                      value={formData.salary || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>Provident Fund</td>
                  <td>
                    <input
                      type="number"
                      name="providentFund"
                      className="form-control"
                      placeholder="Provident Fund"
                      value={formData.providentFund || ""}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>DA</td>
                  <td>
                    <input
                      type="number"
                      name="da"
                      className="form-control"
                      placeholder="DA"
                      value={formData.da || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>ESI</td>
                  <td>
                    <input
                      type="number"
                      name="esi"
                      className="form-control"
                      placeholder="ESI"
                      value={formData.esi || ""}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>TA</td>
                  <td>
                    <input
                      type="number"
                      name="ta"
                      className="form-control"
                      placeholder="TA"
                      value={formData.ta || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>Tax</td>
                  <td>
                    <input
                      type="number"
                      name="tax"
                      className="form-control"
                      placeholder="Tax"
                      value={formData.tax || ""}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>HRA</td>
                  <td>
                    <input
                      type="number"
                      name="hra"
                      className="form-control"
                      placeholder="HRA"
                      value={formData.hra || ""}
                      onChange={handleChange}
                    />
                  </td>
                  <td>Loan</td>
                  <td>
                    <input
                      type="number"
                      name="loan"
                      className="form-control"
                      placeholder="Loan"
                      value={formData.loan || ""}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Gross Salary</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      value={`₹${computeGrossSalary().toFixed(2)}`}
                    />
                  </td>
                  <td>Total Deduction</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      value={`₹${computeTotalDeduction().toFixed(2)}`}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2"></td>
                  <td>Net Salary</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      value={`₹${computeNetSalary().toFixed(2)}`}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Buttons */}
            <div className="d-flex justify-content-end mt-4">
              <button
                type="button"
                className="btn btn-primary me-3"
                onClick={handleSave}
              >
              save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
              cancel
              </button>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer/>
    </div>
  );
};

export default GeneratePaySlip;
