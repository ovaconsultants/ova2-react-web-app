import React, { useEffect, useState } from "react";
import { fetchingAllEnrollments } from "../../../api/adminUserService";

const CourseEnrollementDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    studentName: "",
    courseName: "",
    enrollmentDate: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchingAllEnrollments();
        setData(response); // Assuming `response` is an array of enrollment data
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredData = data.filter((item) => {
    return (
      (filters.studentName
        ? item.student_name
            .toLowerCase()
            .includes(filters.studentName.toLowerCase())
        : true) &&
      (filters.courseName
        ? item.course_name
            .toLowerCase()
            .includes(filters.courseName.toLowerCase())
        : true) &&
      (filters.enrollmentDate
        ? item.enrollment_date.includes(filters.enrollmentDate)
        : true)
    );
  });

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Course Enrollment Details</h2>


      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <input
            type="text"
            className="form-control"
            name="studentName"
            placeholder="Filter by Student Name"
            value={filters.studentName}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <input
            type="text"
            className="form-control"
            name="courseName"
            placeholder="Filter by Course Name"
            value={filters.courseName}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <input
            type="date"
            className="form-control"
            name="enrollmentDate"
            value={filters.enrollmentDate}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Loading or Table */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Enrollment ID</th>
              <th>Course Name</th>
              <th>Student Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Enrollment Date</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No data available
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr key={item.enrollment_id}>
                  <td>{item.enrollment_id}</td>
                  <td>{item.course_name}</td>
                  <td>{item.student_name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone || "N/A"}</td>
                  <td>{new Date(item.enrollment_date).toLocaleDateString()}</td>
                  <td>{item.payment_status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CourseEnrollementDetails;
