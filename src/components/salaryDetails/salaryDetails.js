import React from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useAtom } from "jotai";
import { usernameAtom } from "../jotia/globalAtoms/userRelatedAtoms";

const SalaryDetails = () => {
  const location = useLocation();
  const [userName] = useAtom(usernameAtom);
  const { salaryDetails } = location.state || {}; // Retrieve passed state

  const downloadPdf = async () => {
    const element = document.getElementById("salary-details");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`salary-details-${salaryDetails.pay_month}.pdf`);
  };

  const printDetails = () => {
    const printContent = document.getElementById("salary-details").outerHTML;
    const printWindow = window.open("", "_blank", "width=600,height=800");
    printWindow.document.write(`
      <html>
        <head>
          <title>Salary Slip</title>
          <style>
            body {
              margin: 0;
              font-family: Arial, sans-serif;
            }
            #salary-details {
              padding: 20px;
              background: #fff;
              border: 1px solid #e0e0e0;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            h2, p {
              margin: 5px 0;
            }
            .print-only {
              display: none;
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  if (!salaryDetails) {
    return <p>No salary details available.</p>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        Salary Details for {new Date(salaryDetails.pay_month).toLocaleDateString('default', { month: 'long', year: 'numeric' })}
      </h1>

      <div
        id="salary-details"
        style={{
          padding: "20px",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e0e0e0",
        }}
      >
        {/* User Info */}
        <h2 style={{ marginBottom: "10px", color: "#007BFF" }}>{userName}</h2>
        <p><strong>Bank Name:</strong> {salaryDetails.bank_name}</p>
        <p><strong>Bank Transaction ID:</strong> {salaryDetails.bank_transaction}</p>

        {/* Two-column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
          <p><strong>Basic Salary:</strong> {salaryDetails.basic_salary}</p>
          <p><strong>DA:</strong> {salaryDetails.da}</p>
          <p><strong>TA:</strong> {salaryDetails.ta}</p>
          <p><strong>HRA:</strong> {salaryDetails.hra}</p>
          <p><strong>Gross Salary:</strong> {salaryDetails.gross_salary}</p>
          <p><strong>Total Deductions:</strong> {salaryDetails.total_deduction}</p>
          <p><strong>Net Salary:</strong> {salaryDetails.net_salary}</p>
          <p><strong>Pay Month:</strong> {new Date(salaryDetails.pay_month).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={downloadPdf}
          style={{
            padding: "10px 20px",
            margin: "0 10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Download PDF
        </button>
        <button
          onClick={printDetails}
          style={{
            padding: "10px 20px",
            margin: "0 10px",
            backgroundColor: "#28A745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default SalaryDetails;
