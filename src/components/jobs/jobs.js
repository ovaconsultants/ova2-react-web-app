import React, { useEffect, useState, useRef } from 'react';
import { getJobPostings } from '../../api/jobPostingService';
import ApplyJob from '../admin/applyJob/applyJob';
import { useNavigate } from 'react-router-dom';
import './jobs.scss';

const Jobs = ({ country }) => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [error, setError] = useState(null);
    const [expandedRow, setExpandedRow] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const observer = useRef();
    const lastJobElementRef = useRef();

    useEffect(() => {
        let isMounted = true;
        async function fetchJobs() {
            try {
                if (isMounted) {
                    const response = await getJobPostings(country);
                    setJobs(response.data);
                    setFilteredJobs(response.data.slice(0, 10));
                }
            } catch (err) {
                if (isMounted) setError(err.message);
            }
        }

        fetchJobs();

        return () => {
            isMounted = false;
        };
    }, [country]);

    useEffect(() => {
        const filtered = jobs.filter(job =>
            Object.values(job).some(val =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredJobs(filtered.slice(0, pageSize));
    }, [searchTerm, pageSize, jobs]);

    const handleApplyNow = (job) => {
        setSelectedJob(job);
        setShowModal(true);  // Open the modal when "Apply Now" is clicked
    };

    const toggleExpandRow = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setPageSize(10);  // Reset pageSize when a search is performed
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const handleJobClick = (jobId) => {
        navigate(`/job/${jobId}`);
      };


    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && filteredJobs.length < jobs.length) {
                setPageSize(prevPageSize => prevPageSize + 10);
            }
        });
        if (lastJobElementRef.current) observer.current.observe(lastJobElementRef.current);
    }, [filteredJobs, jobs]);

    if (error) {
        return <div className="alert alert-danger" role="alert">Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h4 className="text-center">Job Listings - {country}</h4>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search for jobs..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <div className="table-responsive" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Company</th>
                            <th scope="col">Workplace Type</th>
                            <th scope="col">Location</th>
                            <th scope="col">Apply</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredJobs.map((job, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td>
                                        <span
                                            className="toggle-expand"
                                            onClick={() => toggleExpandRow(index)}
                                        >
                                            {expandedRow === index ? '-' : '+'}
                                        </span>
                                    </td>
                                    <td className='job-title' onClick={() => handleJobClick(job.jobId)} >{job.title}</td>
                                    <td>{job.company}</td>
                                    <td>{job.workplaceType}</td>
                                    <td>{job.employeeLocation}</td>
                                    <td>
                                        <button
                                            onClick={() => handleApplyNow(job)}
                                            className="btn btn-primary"
                                        >
                                            Apply Now
                                        </button>
                                    </td>
                                </tr>
                                {expandedRow === index && (
                                    <tr>
                                        <td colSpan="12" className="expanded-row">
                                            <div className='row'>
                                                <div className="expanded-content text-start col">
                                                    <div><strong>Title:</strong> {job.title}</div>

                                                    <div><strong>Workplace Type:</strong> {job.workplaceType}</div>

                                                    <div><strong>Experience:</strong> {job.experience}</div>

                                                    <div><strong>Work Authorization:</strong> {job.workAuthorization}</div>
                                                </div>
                                                <div className="expanded-content text-start col">
                                                    <div><strong>Company:</strong> {job.company}</div>

                                                    <div><strong>Location:</strong> {job.employeeLocation}</div>

                                                    <div><strong>Employment Type:</strong> {job.employmentType}</div>
                                                    <div><strong>Posted Date:</strong> {job.createdDate}</div>

                                                </div>
                                            </div>
                                            <div className='row text-start'>
                                                <strong>Description:</strong>
                                                <div dangerouslySetInnerHTML={{ __html: job.description }} />
                                            </div>

                                        </td>

                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            <div ref={lastJobElementRef}></div>

            {/* Modal */ }
    {
        showModal && (
            <div className="modal show d-block" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Apply for {selectedJob?.title}</h5>
                            <button type="button" className="close" onClick={closeModal}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <ApplyJob closeModal={closeModal} jobId={selectedJob.jobId} />  {/* Pass the closeModal function to ApplyJob */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
        </div >
    );
};

export default Jobs;
