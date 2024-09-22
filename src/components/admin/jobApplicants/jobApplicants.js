import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Spinner, Table, Form } from 'react-bootstrap';
import { fetchApplicants } from '../../../api/applicantService';
import { useNavigate } from 'react-router-dom';

const JobApplicants = () => {
    const navigate = useNavigate();
    const [applicants, setApplicants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const observer = useRef();
    console.log('applicants', applicants);

    useEffect(() => {
        const getApplicants = async () => {
            try {
                const response = await fetchApplicants();
                setApplicants(response.data);
                setIsLoading(false);
            } catch (err) {
                setError('Error fetching applicants');
                setIsLoading(false);
            }
        };

        getApplicants();
    }, []);

    const filteredApplicants = applicants?.filter((applicant) =>
        Object.values(applicant).some(
            (value) =>
                value &&
                value
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        )
    );

    const lastApplicantElementRef = useCallback(
        (node) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    // Logic to fetch more data if needed
                }
            });
            if (node) observer.current.observe(node);
        },
        [isLoading]
    );
    const handleJobClick = (jobId) => {
        navigate(`/job/${jobId}`);
      };

    if (isLoading) return <Spinner animation="border" />;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-4">
            <h4>Job Applicants</h4>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search Applicants"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Form.Group>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Job Id</th>
                        <th>Job Title</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Comments</th>
                        <th>Created Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredApplicants.map((applicant, index) => (
                        <tr
                            key={applicant.applicantId}
                            ref={filteredApplicants.length === index + 1 ? lastApplicantElementRef : null}
                        >
                            <td className='job-title' onClick={() => handleJobClick(applicant.jobId)} >{applicant.jobId}</td>
                            <td className='job-title' onClick={() => handleJobClick(applicant.jobId)} >{applicant.jobTitle}</td>
                            <td>{applicant.name}</td>
                            <td>{applicant.email}</td>
                            <td>{applicant.phone}</td>

                            <td>{applicant.comments}</td>
                            <td>{new Date(applicant.createdDate).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default JobApplicants;
