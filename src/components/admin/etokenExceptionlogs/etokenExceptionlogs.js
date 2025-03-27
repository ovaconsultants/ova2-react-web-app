import React, { useState, useEffect } from "react";
import { fetchAllExceptions } from "../../../api/advertisementService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ExceptionLogs = () => {
  const [exceptions, setExceptions] = useState([]);
  const [filteredExceptions, setFilteredExceptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isActiveFilter, setIsActiveFilter] = useState("all");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [visibleRecords, setVisibleRecords] = useState(20);

  useEffect(() => {
    const loadExceptions = async () => {
      const data = await fetchAllExceptions();
      setExceptions(data.exceptions);
      setFilteredExceptions(data.exceptions);
    };
    loadExceptions();
  }, []);

  useEffect(() => {
    filterExceptions();
  }, [searchTerm, isActiveFilter, startDate, endDate, exceptions]);

  const filterExceptions = () => {
    let filtered = exceptions.filter((exception) => {
      const matchesSearch = exception.exception_description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        isActiveFilter === "all" ||
        (isActiveFilter === "active" && exception.is_active === "Y") ||
        (isActiveFilter === "inactive" && exception.is_active === "N");
      const exceptionDate = new Date(exception.created_date);
      const matchesDate =
        (!startDate || exceptionDate >= startDate) &&
        (!endDate || exceptionDate <= endDate);
      return matchesSearch && matchesStatus && matchesDate;
    });
    setFilteredExceptions(filtered);
  };

  const handleSeeMore = () => {
    setVisibleRecords((prev) => prev + 20);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Exception Logs</h1>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search exceptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={isActiveFilter}
            onChange={(e) => setIsActiveFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="col-md-3">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="form-control"
            placeholderText="Start Date"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="col-md-3">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="form-control"
            placeholderText="End Date"
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      {/* Table */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Exception ID</th>
            <th>Description</th>
            <th>Platform</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredExceptions.length > 0 ? (
            filteredExceptions
              .slice(0, visibleRecords)
              .map((exception) => (
                <tr key={exception.exception_id}>
                  <td>{exception.exception_id}</td>
                  <td>{exception.exception_description}</td>
                  <td>{exception.platform}</td>
                  <td>
                    {exception.is_active === "Y" ? (
                      <span className="badge bg-success">Active</span>
                    ) : (
                      <span className="badge bg-danger">Inactive</span>
                    )}
                  </td>
                  <td>{exception.created_by}</td>
                  <td>{new Date(exception.created_date).toLocaleString()}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No exceptions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* See More Button */}
      {filteredExceptions.length > visibleRecords && (
        <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={handleSeeMore}>
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default ExceptionLogs;