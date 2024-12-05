import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getCompanies, fetchCompanyTypes, fetchAllEmployeeAllocations } from "../../../api/companyServices";
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
  const [selectedFilters, setSelectedFilters] = useState({
    companyType: "",
    responder: "",
    isActive: ""
  });

  // Fetch initial data
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        if (isMounted) {
          const [companiesResponse, typesResponse, assignedEmployees] = await Promise.all([
            getCompanies(),
            fetchCompanyTypes(),
            fetchAllEmployeeAllocations()
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
    return () => { isMounted = false; };
  }, []);

  // Filter companies based on search term and selected filters
  const filteredCompaniesMemo = useMemo(() => {
    return companies.filter((company) => {
      const matchesSearchTerm = Object.values(company).some(val =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesCompanyType = !selectedFilters.companyType || String(company.company_type_id) === selectedFilters.companyType;
      const matchesResponder = !selectedFilters.responder || String(company.employee) === selectedFilters.responder;
      const matchesIsActive = selectedFilters.isActive === "" || String(company.is_active) === selectedFilters.isActive;

      return matchesSearchTerm && matchesCompanyType && matchesResponder && matchesIsActive;
    });
  }, [companies, searchTerm, selectedFilters]);

  useEffect(() => {
    setFilteredCompanies(filteredCompaniesMemo);
  }, [filteredCompaniesMemo]);

  const toggleExpandRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleCompanyClick = (companyId) => {
    navigate("/admin/vendor/vendor-details", { state: { companyId } });
  };

  const handleFilterChange = (e) => {
    setSelectedFilters({
      ...selectedFilters,
      [e.target.name]: e.target.value
    });
  };

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error}
      </div>
    );
  }

  // Reusable Dropdown component
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

  // Reusable Expanded Row Component
  const ExpandedRow = ({ company }) => (
    <tr>
      <td colSpan="9" className="expanded-row">
        <div className="row">
          <div className="col-md-6">
            {[
              { label: "Additional Info", value: company.additional_info?.rank },
              { label: "Comment", value: company.comment },
              { label: "Communication Through", value: company.communicatethrough },
              { label: "Contact No", value: company.contact_no },
              { label: "Contact Person Designation", value: company.contact_person_designation },
              { label: "Contact Person Email", value: company.contact_person_email },
              { label: "Current Position", value: company.currentposition },
              { label: "Deleted", value: company.is_deleted ? "Yes" : "No" }
            ].map(({ label, value }) => (
              <div key={label}>
                <strong>{label}:</strong> {value || "N/A"}
              </div>
            ))}
          </div>
          <div className="col-md-6">
            {[
              { label: "Follow Up", value: company.followup },
              { label: "Follow Up Date", value: company.followupdate },
              { label: "Created Date", value: company.created_date },
              { label: "Modified Date", value: company.modified_date },
              { label: "Website URL", value: company.website_url, isLink: true },
              { label: "Industry Sector", value: company.industry_sector },
              { label: "Description", value: company.description }
            ].map(({ label, value, isLink }) => (
              <div key={label}>
                <strong>{label}:</strong>
                {isLink ? (
                  <a href={value} target="_blank" rel="noopener noreferrer">{value}</a>
                ) : (
                  value || "N/A"
                )}
              </div>
            ))}
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
          options={[{ value: "true"  , label : "Active"}, { value: "false" , label : "Inactive"}]}
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
                const companyType = companyTypes.find(type => type.id === company.company_type_id);
                return (
                  <React.Fragment key={company.id}>
                    <tr>
                      <td>
                        <span className="toggle-expand" onClick={() => toggleExpandRow(index)}>
                          {expandedRow === index ? "-" : "+"}
                        </span>
                      </td>
                      <td className="company-title" onClick={() => handleCompanyClick(company.id)}>
                        {company.company_name}
                      </td>
                      <td>{company.contact_person_phone}</td>
                      <td>{company.email_address}</td>
                      <td>{company.location}</td>
                      <td>{company.contact_person_name}</td>
                      <td>{responders.find(responder => responder.id == company.employee)?.employeename || "No Responder"}</td>
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
