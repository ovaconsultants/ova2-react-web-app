import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCompanies } from "../../../api/companyServices";

import "./vendor.scss";
const Vendor = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [error, setError] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSizeRef = useRef(10); // Use ref to avoid re-render on pageSize update
  const observer = useRef();

  // Fetch companies on component mount
  useEffect(() => {
    let isMounted = true;
    async function fetchCompanies() {
      try {
        if (isMounted) {
          const response = await getCompanies();
          console.log("API Response:", response);
          if (response && Array.isArray(response)) {
            setCompanies(response);
            setFilteredCompanies(response.slice(0, pageSizeRef.current));
            console.log(
              "Filtered Companies after set:",
              response.slice(0, pageSizeRef.current)
            ); 
          }
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      }
    }

    fetchCompanies();
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle Data Change Here

  // Handle search and filter logic
  useEffect(() => {
    if (Array.isArray(companies) && companies.length > 0) {
      const filtered = companies.filter((company) =>
        Object.values(company).some((val) =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredCompanies(filtered.slice(0, pageSizeRef.current));
      console.log("Filtered Companies after search:", filtered); // Log filtered companies after search
    } else {
      setFilteredCompanies([]);
    }
  }, [searchTerm, companies]);

  // Toggle row expansion
  const toggleExpandRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    pageSizeRef.current = 10; // Reset pageSize when search term changes
    setFilteredCompanies(companies.slice(0, 10)); // Reset filtered companies
  };

  // Handle lazy loading of data on scroll
  const lastCompanyElementRef = useRef();
  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        Array.isArray(filteredCompanies) &&
        Array.isArray(companies) &&
        filteredCompanies.length < companies.length
      ) {
        pageSizeRef.current += 10; // Increment page size
        setFilteredCompanies(companies.slice(0, pageSizeRef.current));
      }
    });

    if (lastCompanyElementRef.current) {
      observer.current.observe(lastCompanyElementRef.current);
    }
  }, [filteredCompanies, companies]);

  // Navigate to company details page
  const handleCompanyClick = (companyId) => {
    navigate('/admin/vendor/vendor-details', { state: { companyId } });
  };

  // Render error message if there's any error
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h4 className="text-center">Company Details</h4>
      <div className="row">
        <div className="col">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search for companies"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="col-auto">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/admin/sign-up-client")}
          >
            <i className="bi bi-plus"></i> Client
          </button>
        </div>
      </div>

      <div
        className="table-responsive"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Company Name</th>
              <th scope="col">Contact No</th>
              <th scope="col">Email</th>
              <th scope="col">Location</th>
              <th scope="col">Contact Person Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company, index) => (
                <React.Fragment key={company.id}>
                  <tr>
                    <td>
                      <span
                        className="toggle-expand"
                        onClick={() => toggleExpandRow(index)}
                      >
                        {expandedRow === index ? "-" : "+"}
                      </span>
                    </td>
                    <td
                      className="company-title"
                      onClick={() => handleCompanyClick(company.id)}
                    >
                      {company.company_name}
                    </td>
                    <td>{company.contact_person_phone}</td>
                    <td>{company.email_address}</td>
                    <td>{company.location}</td>
                    <td>{company.contact_person_name}</td>
                  </tr>
                  {expandedRow === index && (
                    <tr>
                      <td colSpan="7" className="expanded-row">
                        <div className="row">
                          <div className="expanded-content text-start col">
                            <div>
                              <strong>Industry Sector :</strong>{" "}
                              {company.industry_sector}
                            </div>
                            <div>
                              <strong>Contact Person Designation :</strong>{" "}
                              {company.contact_person_designation}
                            </div>
                            <div>
                              <div>
                                <strong>FollowUpStatus :</strong>{" "}
                                {company.followup}
                              </div>
                            </div>
                            <div>
                              <div>
                                <strong>Opt For Position :</strong>{" "}
                                {company.currentposition}
                              </div>
                            </div>
                            <div>
                              <div>
                                <strong>Communication Medium :</strong>{" "}
                                {company.communicationThrough}
                              </div>
                            </div>
                          </div>
                          <div className="expanded-content text-start col">
                            <div>
                              <strong>Website URL :</strong>{" "}
                              {company.website_url}
                            </div>
                            <div>
                              <strong>Contact Person :</strong>{" "}
                              {company.contact_person_phone}
                            </div>
                            <div>
                              <strong>Contact Person Email :</strong>{" "}
                              {company.contact_person_email}
                            </div>
                            <div>
                              <div>
                                <div>
                                  <strong>Recruiter :</strong>{" "}
                                  {company.employee}
                                </div>
                              </div>
                              <strong>Description :</strong>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: company.description,
                                }}
                              />
                              <strong>Comment If Any :</strong>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: company.comment,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No companies available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div ref={lastCompanyElementRef}></div>
    </div>
  );
};

export default Vendor;
