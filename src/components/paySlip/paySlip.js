import React, { useEffect, useState } from "react";
import {  useAtomValue } from "jotai";
import { registrationIdAtom } from "../jotia/globalAtoms/userRelatedAtoms";
import { fetchSalaryData } from "../../api/employeeService";
import { useNavigate } from "react-router-dom";

const PaySlip = () => {
  const registrationId  = useAtomValue(registrationIdAtom);
  const [paySlipData, setPaySlipData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!registrationId) {
        console.log("registrationId is not yet available. Skipping fetch.");
        return;
      }

      console.log("Fetching data with registrationId:", registrationId);
      try {
        const response = await fetchSalaryData(registrationId);
        setPaySlipData(response);
      } catch (error) {
        console.error("Error fetching salary data:", error);
      }
    };

    fetchData();
  }, [registrationId]);

  const handleViewDetails = (data) => {
    navigate('/pay-slip/salary-details/', {
      state: { salaryDetails: data },
    });
  };

  if (!registrationId) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>User Pay Slips</h1>
      <div>
        {paySlipData.length > 0 ? (
          <ul>
            {paySlipData.map((data) => {
              const payMonthText = new Date(data.pay_month).toLocaleString("default", {
                month: "long",
                year: "numeric",
              });
              return (
                <li key={data.id}>
                  <button onClick={() => handleViewDetails(data)}>
                    {payMonthText}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No pay slips available.</p>
        )}
      </div>
    </div>
  );
};

export default PaySlip;
