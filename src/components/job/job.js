import React, { useEffect, useState } from 'react';
import { getJobPostingById } from '../../api/jobPostingService';
import ApplyJob from '../admin/applyJob/applyJob';
import '../jobs/jobs.scss';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../utils/commonUtil';
import LoadingSpinner from '../common/loadingSpinner/loadingSpinner';

const Job = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState({});
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        async function fetchJob() {
            try {
                if (isMounted) {
                    const response = await getJobPostingById(jobId);
                    setJob(response.data);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) setError(err.message);
                setLoading(false);
            }
        }

        fetchJob();

        return () => {
            isMounted = false;
        };
    }, [jobId]);

    const handleApplyNow = (job) => {
        setSelectedJob(job);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    if (error) {
        return <div className="alert alert-danger" role="alert">Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            {loading ? <div><LoadingSpinner /> Loading Job details soon .......</div> :
                <div>
                    <div className="row mb-4">
                        <div className="col-8 text-start">
                            <h2>{job.title}</h2>
                            <p className="text-muted">
                                <i className="bi bi-building"></i> {job.company} &middot;
                                <i className="bi bi-geo-alt"></i> {job.employeeLocation} &middot;
                                <i className="bi bi-calendar"></i> {formatDate(new Date(job?.createdDate))}
                            </p>
                        </div>
                        <div className="col-4 text-end">
                            <button
                                onClick={() => handleApplyNow(job)}
                                className="btn btn-primary"
                            >
                                Apply Now
                            </button>
                        </div>
                    </div>

                    <div className="card mb-4 text-start">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <p><strong>Experience:</strong> {job.experience}</p>

                                    <p><strong>Employment Type:</strong> {job.employmentType}</p>
                                </div>
                                <div className="col-md-4">

                                    <p><strong>Workplace Type:</strong> {job.workplaceType}</p>
                                    <p><strong>Company:</strong> {job.company}</p>

                                </div>
                                <div className="col-md-4">
                                    <p><strong>Work Authorization:</strong> {job.workAuthorization}</p>

                                </div>
                            </div>
                            <div className="row mt-1">
                                <p><strong>Job Description:</strong></p>
                                <div className="col-12" dangerouslySetInnerHTML={{ __html: job.description }} />
                            </div>
                        </div>
                    </div>

                    {/* Modal */}
                    {showModal && (
                        <div className="modal show d-block" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Apply for {selectedJob?.title}</h5>
                                        <button type="button" className="btn-close" onClick={closeModal}></button>
                                    </div>
                                    <div className="modal-body">
                                        <ApplyJob closeModal={closeModal} jobId={selectedJob.jobId} />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>}
        </div>
    );
};

export default Job;
