import React, { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { registrationIdAtom } from '../components/jotia/globalAtoms/userRelatedAtoms';
import { fetchPaySlipYears } from '../api/employeeService';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './paySlipYear.scss';

const PaySlipYear = () => {
    const employeeId = useAtomValue(registrationIdAtom);
    const [paySlipYears, setPaySlipYears] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('asc');
    const navigate = useNavigate();

    useEffect(() => {
        if (!employeeId) return;
        (async () => {
            try {
                setPaySlipYears(await fetchPaySlipYears(employeeId));
            } catch {
                setPaySlipYears([]);
            } finally {
                setLoading(false);
            }
        })();
    }, [employeeId]);

    const toggleSortOrder = () => {
        setSortOrder((order) => (order === 'asc' ? 'desc' : 'asc'));
        setPaySlipYears((years) => [...years].sort((a, b) => (sortOrder === 'asc' ? b.year - a.year : a.year - b.year)));
    };

    if (loading) return <div className="text-center my-5">Loading...</div>;

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Pay Slips</h2>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5>Employee ID: {employeeId}</h5>
                <Button onClick={toggleSortOrder} className="global-color">
                    <i className={`bi ${sortOrder === 'asc' ? 'bi-sort-numeric-up' : 'bi-sort-numeric-down'}`}></i> Sort
                </Button>
            </div>
            <div className="row">
                {paySlipYears.length > 0 ? (
                    paySlipYears.map(({ year }) => (
                        <div className="col-lg-2 col-md-5 col-sm-6 mb-4" key={year}>
                            <div className="card text-center shadow" onClick={() => navigate('/pay-slip-years/months', { state: { year, employeeId } })}>
                                <div className="card-body p-1 cursor-pointer hover-scale">
                                    <i className="bi bi-folder-fill text-warning mb-2" style={{ fontSize: '3rem' }}></i>
                                    <h4 className="card-title">{year}</h4>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted text-center w-100">No pay slips available for this employee.</p>
                )}
            </div>
        </div>
    );
};

export default PaySlipYear;
