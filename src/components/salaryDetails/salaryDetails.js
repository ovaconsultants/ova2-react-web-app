import React from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useAtomValue } from "jotai";
import { usernameAtom  } from "../jotia/globalAtoms/userRelatedAtoms";


const SalaryDetails = () => {

  const location = useLocation();
  const userName = useAtomValue(usernameAtom);

  const { salaryDetails } = location.state || {}; // Retrieve passed state

  const downloadPdf = async () => {
    const element = document.getElementById("salary-details");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    console.log("pay month in text " , salaryDetails.pay_month);
    const payMonthText = new Date(salaryDetails.pay_month).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    pdf.save(`${ userName.replace(" ","_")}_ova2_paySlip_${payMonthText.replace(/\s+/g, "")}.pdf`);
  };

  const printDetails = () => {
    const printContent = document.getElementById("salary-details");
  
    // Open a new print window
    const printWindow = window.open("", "_blank", "width=800,height=600");
  
    // Write content and link to stylesheets
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Salary Slip</title>
          <!-- Bootstrap CSS -->
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
          <!-- Optional Custom Styling -->
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact; /* Preserve colors in print */
            }
            #salary-details {
              padding: 20px;
              background: #fff;
              border: 1px solid #e0e0e0;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            h1, h2, h5 {
              margin-bottom: 10px;
            }
            .card {
              margin-bottom: 20px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            /* Ensure 2-column layout */
            .salary-row {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
            }
            .salary-row p {
              margin: 0;
            }
          </style>
        </head>
        <body>
          <div class="container mt-4">
            <div id="salary-details">
              <!-- Start of Content -->
              <h1 class="text-center">Salary Details for ${new Date(salaryDetails.pay_month).toLocaleDateString('default', { month: 'long', year: 'numeric' })}</h1>
              <h2 class="text-center">${userName}</h2>
              
              <!-- Bank Details Card -->
              <div class="card mb-4 shadow-sm">
                <div class="card-body">
                  <h5 class="card-title border-bottom pb-2">Bank Details</h5>
                  <div class="salary-row">
                    <p><strong>Bank Name:</strong> ${salaryDetails.bank_name}</p>
                    <p><strong>Bank Transaction ID:</strong> ${salaryDetails.bank_transaction}</p>
                  </div>
                </div>
              </div>
  
              <!-- Salary Breakdown Card -->
              <div class="card mb-4 shadow-sm">
                <div class="card-body">
                  <h5 class="card-title border-bottom pb-2">Salary Breakdown</h5>
                  <div class="salary-row">
                    <p><strong>Basic Salary:</strong> ${salaryDetails.basic_salary}</p>
                    <p><strong>DA:</strong> ${salaryDetails.da}</p>
                    <p><strong>TA:</strong> ${salaryDetails.ta}</p>
                    <p><strong>HRA:</strong> ${salaryDetails.hra}</p>
                  </div>
                </div>
              </div>
  
              <!-- Summary Card -->
              <div class="card shadow-sm">
                <div class="card-body">
                  <h5 class="card-title border-bottom pb-2">Summary</h5>
                  <div class="salary-row">
                    <p><strong>Gross Salary:</strong> ${salaryDetails.gross_salary}</p>
                    <p><strong>Total Deductions:</strong> ${salaryDetails.total_deduction}</p>
                    <p><strong>Net Salary:</strong> ${salaryDetails.net_salary}</p>
                    <p><strong>Pay Month:</strong> ${new Date(salaryDetails.pay_month).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- End of Content -->
          </div>
        </body>
      </html>
    `);
  
    // Close the document to trigger rendering
    printWindow.document.close();
  
    // Focus the new window and print
    printWindow.focus();
    printWindow.print();
  
    // Optionally close the window after printing
    printWindow.onafterprint = () => {
      printWindow.close();
    };
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
        <div className="container my-4">
      {/* Bank Details */}
      <div className="card mb-4  shadow-sm">
        <div className="card-body ">
          <h5 className="card-title border-bottom pb-2">Bank Details</h5>
          <div className="row">
          <div className="col-md-6">
          <p><strong>Bank Name:</strong> {salaryDetails.bank_name}</p>
          </div>
          <div className="col-md-6">
          <p><strong>Bank Transaction ID:</strong> {salaryDetails.bank_transaction}</p>
          </div>     
          </div>
        </div>
      </div>

      {/* Salary Breakdown */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title border-bottom pb-2">Salary Breakdown</h5>
          <div className="row">
            <div className="col-md-6">
              <p><strong>Basic Salary:</strong> {salaryDetails.basic_salary}</p>
              <p><strong>DA:</strong> {salaryDetails.da}</p>
            </div>
            <div className="col-md-6">
              <p><strong>TA:</strong> {salaryDetails.ta}</p>
              <p><strong>HRA:</strong> {salaryDetails.hra}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title border-bottom pb-2">Summary</h5>
          <div className="row">
            <div className="col-md-6">
              <p><strong>Gross Salary:</strong> {salaryDetails.gross_salary}</p>
              <p><strong>Total Deductions:</strong> {salaryDetails.total_deduction}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Net Salary:</strong> {salaryDetails.net_salary}</p>
              <p>
                <strong>Pay Month:</strong>{" "}
                {new Date(salaryDetails.pay_month).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
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
