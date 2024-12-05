import React, { useEffect, useState } from "react";
import { fetchAllQueries } from "../../../api/adminUserService";


const ContactQueryDetails = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const getQueries = async () => {
      const fetchedQueries = await fetchAllQueries();
      console.log("fetchQueries looks like : " , fetchedQueries)
      setQueries(fetchedQueries);
    };
    getQueries();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4"> Queries From Visitors </h1>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Query ID</th>
            <th>Visitor Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Submission Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {queries.length > 0 ? (
            queries.map((query) => (
              <tr key={query.queryid}>
                <td>{query.queryid}</td>
                <td>{query.visitor_name}</td>
                <td>{query.email_address}</td>
                <td>{query.phone}</td>
                <td>{query.subject}</td>
                <td>{query.message}</td>
                <td>{new Date(query.submission_date).toLocaleString()}</td>
                <td>{query.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No contact queries available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactQueryDetails;
