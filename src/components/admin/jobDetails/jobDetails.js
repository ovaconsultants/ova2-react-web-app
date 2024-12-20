import React, { useEffect, useState, useRef } from 'react';
import { getJobPostings, deleteJobPosting } from '../../../api/jobPostingService';
import '../../jobs/jobs.scss';
import { useNavigate } from 'react-router-dom';

const JobDetails = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [error, setError] = useState(null);
    const [expandedRow, setExpandedRow] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [successMessage, setSuccessMessage] = useState('');
    const [jobIdDelete, setJobIdDelete] = useState(0);
    const observer = useRef();
    const username = localStorage.getItem('username');

    useEffect(() => {
        let isMounted = true;
        const country = 'ALL';
        async function fetchJobs() {
            try {
                if (isMounted) {
                    const response = await getJobPostings(country);
                    console.log('API Response:', );
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
    }, [jobIdDelete]);

    useEffect(() => {
        const filtered = jobs.filter(job =>
            Object.values(job).some(val =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredJobs(filtered.slice(0, pageSize));
    }, [searchTerm, pageSize, jobs]);

    const handleRemove = async (job) => {
        const jobId = job.jobId;
        try {
            const response = await deleteJobPosting(jobId, username);
            if (response.statusCode === 200) {
                setSuccessMessage('Job deleted successfully.');
                setTimeout(() => setSuccessMessage(''), 3000);
                setJobIdDelete(jobId);
            }
        } catch (err) {
            setError('Failed to delete the job posting.');
        }
    };

    const toggleExpandRow = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setPageSize(10);
    };

    const lastJobElementRef = useRef();
    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && filteredJobs.length < jobs.length) {
                setPageSize(prevPageSize => prevPageSize + 10);
            }
        });
        if (lastJobElementRef.current) observer.current.observe(lastJobElementRef.current);
    }, [filteredJobs, jobs]);

    const handlePostJob = () => {
        navigate('/admin/job-posting');
    }
    const handleJobClick = (jobId) => {
        navigate(`/job/${jobId}`);
      };

    if (error) {
        return <div className="alert alert-danger" role="alert">Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h4 className="text-center">Job Details</h4>
            {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
            <div className='row'>
                <div className='col'>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Search for jobs..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div className='col-auto'>
                    <button type="button" class="btn btn-primary post-job-btn" onClick={handlePostJob}>
                        <i class="bi bi-plus"></i> Post Job
                    </button>
                </div>
            </div>

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
                                    <td>{job.workplacetype}</td>
                                    <td>{job.employeelocation}</td>
                                    <td>
                                        <button
                                            onClick={() => handleRemove(job)}
                                            className="btn btn-danger"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                                {expandedRow === index && (
                                    <tr>
                                          <td colSpan="12" className="expanded-row">
                                            <div className='row'>
                                                <div className="expanded-content text-start col">
                                                    <div><strong>Title:</strong> {job.title}</div>

                                                    <div><strong>Workplace Type:</strong> {job.workplacetype}</div>

                                                    <div><strong>Experience:</strong> {job.experience}</div>

                                                    <div><strong>Work Authorization:</strong> {job.workauthorization}</div>
                                                </div>
                                                <div className="expanded-content text-start col">
                                                    <div><strong>Company:</strong> {job.company}</div>

                                                    <div><strong>Location:</strong> {job.employeelocation}</div>

                                                    <div><strong>Employment Type:</strong> {job.employmenttype}</div>
                                                    <div><strong>Posted Date:</strong> {job.createddate}</div>

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
        </div>
    );
};

export default JobDetails;
