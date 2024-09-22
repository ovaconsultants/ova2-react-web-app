import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles
import { createJobPosting } from '../../../api/jobPostingService';
import './jobPosting.scss';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { workAuthorizationOptions } from '../../../constants/workAuthorizationOptions';

const JobPosting = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: '',
    description: '',
    company: '',
    workplaceType: '',
    employeeLocation: '',
    employmentType: '',
    experience: '',
    workAuthorization: '',
    country: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleJobChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (
      job.title &&
      job.description &&
      job.company &&
      job.workplaceType &&
      job.employeeLocation &&
      job.employmentType &&
      job.experience &&
      job.workAuthorization &&
      job.country
    ) {
      try {
        const response = await createJobPosting(job);
        setSuccess('Job Posted Successfully!');
        navigate('/admin/job-details');
        console.log('Job Posted:', response);
      } catch (error) {
        setError('Failed to post the job. Please try again.');
      }
    } else {
      setError('Please fill out all fields.');
    }
  };

  const handleDescriptionChange = (value) => {
    setJob({ ...job, description: value });
  };
  const handleWorkAuthorization = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value).join(', ') : '';
    handleJobChange({ target: { name: 'workAuthorization', value: selectedValues } });
  };
  

  return (
    <div className="job-posting-form">
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <section className="contact-form">
        <div className="container mt-4">
          <form className="row block" onSubmit={handleJobSubmit}>

            <h4 className="text-center">Job Posting</h4>
            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={job.title}
                  onChange={handleJobChange}
                  required
                  placeholder="Job Title"
                />
              </div>
            </div>

            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <input
                  type="text"
                  name="company"
                  className="form-control"
                  value={job.company}
                  onChange={handleJobChange}
                  required
                  placeholder="Company"
                />
              </div>
            </div>

            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <select
                  name="workplaceType"
                  className="form-control"
                  value={job.workplaceType}
                  onChange={handleJobChange}
                  required
                >
                  <option value="">Select Workplace Type</option>
                  <option value="Office">Office</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            </div>

            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <input
                  type="text"
                  name="employeeLocation"
                  className="form-control"
                  value={job.employeeLocation}
                  onChange={handleJobChange}
                  required
                  placeholder="Employee Location"
                />
              </div>
            </div>

            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <select
                  name="employmentType"
                  className="form-control"
                  value={job.employmentType}
                  onChange={handleJobChange}
                  required
                >
                  <option value="">Select Employment Type</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Part-Time">Part-Time</option>
                </select>
              </div>
            </div>

            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <select
                  name="experience"
                  className="form-control"
                  value={job.experience}
                  onChange={handleJobChange}
                  required
                >
                  <option value="">Select Experience</option>
                  <option value="0-2 years">0-2 years</option>
                  <option value="2-5 years">2-5 years</option>
                  <option value="5-7 years">5-7 years</option>
                  <option value="7-10 years">7-10 years</option>
                  <option value="10-12 years">10-12 years</option>
                  <option value="12-15 years">12-15 years</option>
                  <option value="15-20 years">15-20 years</option>
                </select>
              </div>
            </div>

            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <select
                  name="country"
                  className="form-control"
                  value={job.country}
                  onChange={handleJobChange}
                  required
                >
                  <option value="">Select Country</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                </select>
              </div>

            </div>

            <div className="col-md-8 col-sm-12">
              <div className="form-group">
                <Select
                  isMulti
                  name="workAuthorization"
                  options={workAuthorizationOptions}
                  className="form-control"
                  classNamePrefix="select"
                  value={workAuthorizationOptions.filter(option =>
                    job.workAuthorization.includes(option.value)
                  )}
                  onChange={handleWorkAuthorization}
                  required
                />
              </div>
            </div>

            <div className="col-12">
              <div className="form-group">
                <ReactQuill
                  theme="snow"
                  value={job.description}
                  onChange={handleDescriptionChange}
                  placeholder="Job Description"
                  className="description-area"
                />
                
              </div>
            </div>

            <div className="col-12 text-left">
              <button className="btn btn-default col-12" type="submit">Post Job</button>
            </div>

          </form>
        </div>
      </section>
    </div>
  );
};

export default JobPosting;
