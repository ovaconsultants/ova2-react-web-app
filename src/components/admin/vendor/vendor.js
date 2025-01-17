import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCompanies,
  fetchCompanyTypes,
  fetchAllEmployeeAllocations,
  fetchCommentsByCompanyId,
} from "../../../api/companyServices";
import "./vendor.scss";

const Vendor = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [error, setError] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [companyTypes, setCompanyTypes] = useState([]);
  const [responders, setResponders] = useState([]);
  const [comments, setComments] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({
    companyType: "",
    responder: "",
    isActive: "",
  });

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        if (isMounted) {
          const [companiesResponse, typesResponse, assignedEmployees] =
            await Promise.all([
              getCompanies(),
              fetchCompanyTypes(),
              fetchAllEmployeeAllocations(),
            ]);

          if (Array.isArray(companiesResponse)) {
            setCompanies(companiesResponse);
          }
          setCompanyTypes(typesResponse || []);
          setResponders(assignedEmployees);
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const fetchComments = async (companyId) => {
    try {
      const companyComments = await fetchCommentsByCompanyId(companyId);
      setComments((prevComments) => ({
        ...prevComments,
        [companyId]: companyComments,
      }));
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const filteredCompaniesMemo = useMemo(() => {
    return companies.filter((company) => {
      const matchesSearchTerm = Object.values(company).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesCompanyType =
        !selectedFilters.companyType ||
        String(company.company_type_id) === selectedFilters.companyType;
      const matchesResponder =
        !selectedFilters.responder ||
        String(company.employee) === selectedFilters.responder;
      const matchesIsActive =
        selectedFilters.isActive === "" ||
        String(company.is_active) === selectedFilters.isActive;

      return (
        matchesSearchTerm &&
        matchesCompanyType &&
        matchesResponder &&
        matchesIsActive
      );
    });
  }, [companies, searchTerm, selectedFilters]);

  useEffect(() => {
    setFilteredCompanies(filteredCompaniesMemo);
  }, [filteredCompaniesMemo]);

  const toggleExpandRow = (index, companyId) => {
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
      if (!comments[companyId]) fetchComments(companyId);
    }
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleCompanyClick = (companyId) => {
    navigate("/admin/vendor/vendor-details", { state: { companyId } });
  };

  const handleFilterChange = (e) => {
    setSelectedFilters({
      ...selectedFilters,
      [e.target.name]: e.target.value,
    });
  };

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error}
      </div>
    );
  }

  const Dropdown = ({ name, options, value, onChange, placeholder }) => (
    <div className="col-auto">
      <select
        className="form-control mb-3 dropdown-height"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.id || opt.value} value={opt.id || opt.value}>
            {opt.type_name || opt.employeename || opt.label}
          </option>
        ))}
      </select>
    </div>
  );

  const ExpandedRow = ({ company }) => (
    <tr>
      <td colSpan="9" className="expanded-row">
        <div className="row">
          <div className="col-md-6">
            <table className="table table-bordered">
              <tbody>
                {[
                  { label: "Comment", value: company.comment },
                  { label: "Communication Through", value: company.communicatethrough },
                  { label: "Contact No", value: company.contact_no },
                  { label: "Contact Person Designation", value: company.contact_person_designation },
                  { label: "Contact Person Email", value: company.contact_person_email },
                  { label: "Current Position", value: company.currentposition },
                ].map(({ label, value }) => (
                  <tr key={label}>
                    <td className="font-weight-bold">{label}:</td>
                    <td>{value || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            <table className="table table-bordered">
              <tbody>
                {[
                  { label: "Follow Up", value: company.followup },
                  // { label: "Follow Up Date", value: company.followupdate },
                  { label: "Website URL", value: company.website_url, isLink: true },
                  { label: "Industry Sector", value: company.industry_sector },
                  { label: "Description", value: company.description },
                ].map(({ label, value, isLink }) => (
                  <tr key={label}>
                    <td className="font-weight-bold">{label}:</td>
                    <td>
                      {isLink ? (
                        <a href={value} target="_blank" rel="noopener noreferrer">
                          {value}
                        </a>
                      ) : (
                        value || "N/A"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-12 mt-3">
            <strong>Comments:</strong>
            {comments[company.id] ? (
              comments[company.id].length > 0 ? (
                <table className="table table-bordered mt-2">
                  <thead>
                    <tr className="table-secondary">
                      <th>#</th>
                      <th>Comment</th>
                      <th>Follow Up Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comments[company.id].map((comment, index) => (
                      <tr key={comment.id}>
                        <td>{index + 1}</td>
                        <td>{comment.comment}</td>
                        <td><em>{new Date(comment.created_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}</em></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No comments available.</p>
              )
            ) : (
              <p>Loading comments...</p>
            )}
          </div>
        </div>
      </td>
    </tr>
  );

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
            style={{ height: "40px" }}
          />
        </div>
        <Dropdown
          name="companyType"
          options={companyTypes}
          value={selectedFilters.companyType}
          onChange={handleFilterChange}
          placeholder="--All Company Types--"
        />
        <Dropdown
          name="responder"
          options={responders}
          value={selectedFilters.responder}
          onChange={handleFilterChange}
          placeholder="--All Responders--"
        />
        <Dropdown
          name="isActive"
          options={[
            { value: "true", label: "Active" },
            { value: "false", label: "Inactive" },
          ]}
          value={selectedFilters.isActive}
          onChange={handleFilterChange}
          placeholder="--Status--"
        />
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

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Company Name</th>
              <th>Contact No</th>
              <th>Email</th>
              <th>Location</th>
              <th>Contact Person Name</th>
              <th>Responder</th>
              <th>Company Type</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company, index) => {
                const companyType = companyTypes.find(
                  (type) => type.id === company.company_type_id
                );
                return (
                  <React.Fragment key={company.id}>
                    <tr>
                      <td>
                        <span
                          className="toggle-expand"
                          onClick={() => toggleExpandRow(index, company.id)}
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
                      <td>
                        {responders.find(
                          (responder) => responder.id == company.employee
                        )?.employeename || "No Responder"}
                      </td>
                      <td>{companyType ? companyType.type_name : "Unknown"}</td>
                      <td>{company.is_active ? "Yes" : "No"}</td>
                    </tr>
                    {expandedRow === index && <ExpandedRow company={company} />}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  Loading available companies...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vendor;
