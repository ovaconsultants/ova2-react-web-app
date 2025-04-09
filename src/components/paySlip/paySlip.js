import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchSalaryData } from "../../api/employeeService";
import "./paySlip.scss"

const PaySlip = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // Initialize state based on localStorage or location state
  const [paySlipData, setPaySlipData] = useState(() => JSON.parse(localStorage.getItem("paySlipData")) || []);
  const employeeId = state?.employeeId || localStorage.getItem("employeeId");
  const year = state?.year || localStorage.getItem("year");

  // Update localStorage whenever employeeId or year changes
  useEffect(() => {
    if (employeeId && year) {
      localStorage.setItem("employeeId", employeeId);
      localStorage.setItem("year", year);
    }
  }, [employeeId, year]);

  // Fetch pay slip data when employeeId or year changes
  useEffect(() => {
    if (employeeId && year) {
      fetchSalaryData(employeeId, year)
        .then((data) => {
          setPaySlipData(data);
          localStorage.setItem("paySlipData", JSON.stringify(data));
        })
        .catch((error) => console.error("Error fetching salary data:", error));
    }
  }, [employeeId, year]);

  if (!employeeId || !year) return <p className="text-center text-danger">Employee ID or Year is missing.</p>;

  return (
    <div className="container my-4">
      <h2 className="text-center mb-5 fw-bold text-black border-bottom pb-3">
        Pay Slips for {year}
      </h2>

      {paySlipData.length > 0 ? (
        <div className="d-flex flex-wrap justify-content-start">
          {paySlipData.map(({ id, pay_month, ...data }) => (
            <div key={id} className="m-3">
              <button
                className="btn btn-pay-slip d-flex align-items-center"
                onClick={() =>
                  navigate("/pay-slip-years/pay-slip-months/pay-slip-details/", {
                    state: {
                      salaryDetails: data,
                      payMonth: pay_month,
                    },
                  })
                }
              >
                <i className="bi bi-file-earmark-text fs-4 me-2 text-white"></i>
                <span className="text-white fs-5">
                  {new Date(pay_month).toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No pay slips available.</p>
      )}
    </div>
  );
};

export default PaySlip;