// src/ContactDetails.js
import React, { useEffect, useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { getContacts } from '../../../service/contactService';

function ContactDetails() {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchContacts() {
            try {
                const data = await getContacts();
                setContacts(data);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchContacts();
    }, []);

    const columnDefs = useMemo(() => [
        { headerName: 'Name', field: 'name' },
        { headerName: 'Email', field: 'emailAddress' },
        { headerName: 'Phone', field: 'phoneNo' },
        { headerName: 'Country', field: 'countryCode' },
        { headerName: 'Message', field: 'message' },
        { headerName: 'Subject', field: 'subject' }
    ], []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
            <h1>Contact Details</h1>
            <AgGridReact
                rowData={contacts}
                columnDefs={columnDefs}
                defaultColDef={{ sortable: true, filter: true }}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
    );
}

export default ContactDetails;
