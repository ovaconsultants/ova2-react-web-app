import React, { useState, useEffect } from "react";
import { getExceptionLogs } from "../../../api/adminUserService";

const ExceptionLogsDetails = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    date: new Date().toISOString().split("T")[0], // Default to today's date
    search: "",
  });
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Fetch logs data on component mount
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await getExceptionLogs();
        console.log("API Response: ", response);
        setLogs(response);
        setFilteredLogs(response); // Initialize filtered logs
      } catch (err) {
        setError("Failed to fetch exception logs. Please try again later.");
      }
    };
    fetchLogs();
  }, []);

  // Apply filters whenever filters or logs change
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...logs];

      // Apply date filter
      if (filters.date) {
        filtered = filtered.filter((log) => {
          const logDate = new Date(log.log_date).toISOString().split("T")[0];
          return logDate === filters.date;
        });
      }

      // Apply search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(
          (log) =>
            log.id.toString().includes(searchLower) ||
            log.exception_message.toLowerCase().includes(searchLower) ||
            log.source?.toLowerCase().includes(searchLower) || // Optional: source search
            new Date(log.log_date).toLocaleDateString().includes(searchLower)
        );
      }

      console.log("Filtered logs after applying filters: ", filtered);
      setFilteredLogs(filtered);
      setCurrentPage(1); // Reset to the first page when filters change
    };

    applyFilters();
  }, [filters, logs]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredLogs.length / recordsPerPage);

  const paginateLogs = () => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    return filteredLogs.slice(startIndex, startIndex + recordsPerPage);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Exception Logs Details</h2>

      {/* Filter and Search Controls */}
      <div className="mb-3 d-flex flex-wrap justify-content-between align-items-end">
        {/* Date Filter */}
        <div className="me-3">
          <input
            type="date"
            name="date"
            id="dateFilter"
            className="form-control"
            value={filters.date}
            onChange={handleFilterChange}
          />
        </div>

        {/* Search Filter */}
        <div className="flex-grow-1">
          <input
            type="text"
            name="search"
            id="searchFilter"
            className="form-control"
            placeholder="Search by ID, Message, or Date"
            value={filters.search}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Message</th>
              <th>Source</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {paginateLogs().length > 0 ? (
              paginateLogs().map((log) => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>{log.exception_message}</td>
                  <td>{log.source}</td>
                  <td>{new Date(log.log_date).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No logs found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-primary me-2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="align-self-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-primary ms-2"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ExceptionLogsDetails;
