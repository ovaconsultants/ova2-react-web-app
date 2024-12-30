import React, { useState } from 'react';
import { createApplicant } from '../../../api/applicantService';
import './applyJob.scss';
import ToastMessage from "../../../constants/toastMessage";
import { ToastContainer } from "react-toastify";

const ApplyJob = ({ closeModal, jobId }) => {
 // const [applications, setApplications] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleApplicationSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const application = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      comments: formData.get('comments'),
      jobId,
    };
    const response = await createApplicant(application);
    ToastMessage("Application registered successfully");
    console.log('Job Updated:', response);
    setShowSuccess(true);
    e.target.reset();
    setTimeout(() => {
      setShowSuccess(false);
      closeModal();
    }, 3000);
  };

  return (
    <div className="apply-job-form">
      <section className="contact-form">
        <div className="container">
        {/* {showSuccess && (
            <div className="alert alert-success mt-3" role="alert">
              Application Submitted Successfully! HR will connect you soon.
            </div>
          )} */}
          <form className="row" onSubmit={handleApplicationSubmit}>
            <div className="col-md-12 col-sm-12">
              <div className="block">
                <div className="form-group">
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    name="phone"
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    name="comments"
                    type="text"
                    className="form-control"
                    placeholder="Comments(Optional)"                    
                  />
                </div>
                <button className="btn btn-default" type="submit">
                  Submit Application
                </button>
              </div>
            </div>
          </form>
      
        </div>
      </section>
       <ToastContainer />
    </div>
  );
};

export default ApplyJob;
