import React from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useAtomValue } from "jotai";
import { usernameAtom } from "../jotia/globalAtoms/userRelatedAtoms";

const SalaryDetails = () => {
  const { state: { salaryDetails, payMonth } } = useLocation();

  const userName = useAtomValue(usernameAtom);

  if (!salaryDetails) {
    return <p className="text-center text-danger">No salary details available.</p>;
  }

  // Ensure pay_month is a valid Date object
  const payMonthDate = new Date(payMonth); // Convert payMonth to Date object
  const payMonthText = payMonthDate.toLocaleDateString("default", { month: "long", year: "numeric" });

  const downloadPdf = async () => {
    const element = document.getElementById("salary-details");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${userName.replace(" ", "_")}_ova2_paySlip_${payMonthText.replace(/\s+/g, "")}.pdf`);
  };

  const printDetails = () => {
    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Salary Slip</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
        </head>
        <body>
          ${document.getElementById("salary-details").outerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  };

  const DetailCard = ({ title, details }) => (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title border-bottom pb-2">{title}</h5>
        <div className="row">
          {details.map(({ label, value }, idx) => (
            <div key={idx} className="col-md-6">
              <p>
                <strong>{label}:</strong> {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-4" style={{ maxWidth: "800px" }}>
      <h1 className="text-center mb-4">
        Salary Details for {payMonthText}
      </h1>
      <h2 className="text-center text-primary">{userName}</h2>

      <div id="salary-details" className="p-4 bg-white border rounded shadow-sm">
        <DetailCard
          title="Bank Details"
          details={[
            { label: "Bank Name", value: salaryDetails.bank_name },
            { label: "Bank Transaction ID", value: salaryDetails.bank_transaction },
          ]}
        />
        <DetailCard
          title="Salary Breakdown"
          details={[
            { label: "Basic Salary", value: salaryDetails.basic_salary },
            { label: "DA", value: salaryDetails.da },
            { label: "TA", value: salaryDetails.ta },
            { label: "HRA", value: salaryDetails.hra },
          ]}
        />
        <DetailCard
          title="Summary"
          details={[
            { label: "Gross Salary", value: salaryDetails.gross_salary },
            { label: "Total Deductions", value: salaryDetails.total_deduction },
            { label: "Net Salary", value: salaryDetails.net_salary },
            { label: "Pay Month", value: payMonth }, // Use the formatted date
          ]}
        />
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary me-3" onClick={downloadPdf}>
          <i className="bi bi-download"></i> Download PDF
        </button>
        <button className="btn btn-success" onClick={printDetails}>
          <i className="bi bi-printer"></i> Print
        </button>
      </div>
    </div>
  );
};

export default SalaryDetails;
