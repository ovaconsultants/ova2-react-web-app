import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';

const InternInformationForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    primarySkill: '',
    gender: '',
    nationality: '',
    dob: '',
    placeOfBirth: '',
    fathersName: '',
    mothersName: '',
    contactNumber: '',
    email: '',
    currentAddress: '',
    permanentAddress: '',
    qualification: '',
    reasonsForGap: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    page.drawText('Internship Application Form', { x: 50, y: 750, size: 18, color: rgb(0, 0, 0) });

    page.drawText(`Title: ${formData.title}`, { x: 50, y: 700, size: 12 });
    page.drawText(`First Name: ${formData.firstName}`, { x: 50, y: 680, size: 12 });
    page.drawText(`Middle Name: ${formData.middleName}`, { x: 50, y: 660, size: 12 });
    page.drawText(`Last Name: ${formData.lastName}`, { x: 50, y: 640, size: 12 });
    page.drawText(`Primary Skill: ${formData.primarySkill}`, { x: 50, y: 620, size: 12 });
    page.drawText(`Gender: ${formData.gender}`, { x: 50, y: 600, size: 12 });
    page.drawText(`Nationality: ${formData.nationality}`, { x: 50, y: 580, size: 12 });
    page.drawText(`Date of Birth: ${formData.dob}`, { x: 50, y: 560, size: 12 });
    page.drawText(`Place of Birth: ${formData.placeOfBirth}`, { x: 50, y: 540, size: 12 });
    page.drawText(`Father's Name: ${formData.fathersName}`, { x: 50, y: 520, size: 12 });
    page.drawText(`Mother's Name: ${formData.mothersName}`, { x: 50, y: 500, size: 12 });
    page.drawText(`Contact Number: ${formData.contactNumber}`, { x: 50, y: 480, size: 12 });
    page.drawText(`Email: ${formData.email}`, { x: 50, y: 460, size: 12 });
    page.drawText(`Current Address: ${formData.currentAddress}`, { x: 50, y: 440, size: 12 });
    page.drawText(`Permanent Address: ${formData.permanentAddress}`, { x: 50, y: 420, size: 12 });
    page.drawText(`Qualification: ${formData.qualification}`, { x: 50, y: 400, size: 12 });
    page.drawText(`Reasons for Gap in Education: ${formData.reasonsForGap}`, { x: 50, y: 380, size: 12 });

    const pdfBytes = await pdfDoc.save();
    saveAs(new Blob([pdfBytes]), 'Internship_Application_Form.pdf');
  };

  return (
    <div>
      <h1>Internship Application Form</h1>
      <form>
        <div>
          <label>Title (Mr./Ms.):</label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} style={styles.input} />
        </div>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} style={styles.input} />
        </div>
        <div>
          <label>Middle Name:</label>
          <input type="text" name="middleName" value={formData.middleName} onChange={handleInputChange} style={styles.input} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} style={styles.input} />
        </div>
        {/* Add other fields similarly */}
        <button type="button" onClick={generatePDF}>
          Save as PDF
        </button>
      </form>
    </div>
  );
};

const styles = {
  input: {
    border: 'none',
    borderBottom: '2px solid black',
    outline: 'none',
    margin: '10px 0',
    padding: '5px',
  },
};

export default InternInformationForm;
