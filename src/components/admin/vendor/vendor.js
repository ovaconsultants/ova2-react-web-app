import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCompanies,
  fetchCompanyTypes,
  fetchAllEmployeeAllocations,
  fetchCommentsByCompanyId,
  postExcelVendorFile,
} from "../../../api/companyServices";
import Dropdown from "./dropdown";
import ExpandedRow from "./expandRow";
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
  const [uploadMessage, setUploadMessage] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    companyType: "",
    responder: "",
    isActive: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [hasMoreRecords, setHasMoreRecords] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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
    setFilteredCompanies(filteredCompaniesMemo.slice(0, 20));
  }, [filteredCompaniesMemo]);

  const loadMoreCompanies = () => {
    const nextPage = currentPage + 1;
    const newCompanies = filteredCompaniesMemo.slice(
      nextPage * 20 - 20,
      nextPage * 20
    );

    if (newCompanies.length === 0) {
      setHasMoreRecords(false);
      return;
    }

    setFilteredCompanies((prev) => [...prev, ...newCompanies]);
    setCurrentPage(nextPage);
  };

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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadMessage("Vendor Data is uploading...");
    try {
      await postExcelVendorFile(file);
      const updatedCompanies = await getCompanies();
      setCompanies(updatedCompanies);
    } catch (err) {
      console.error("File upload error:", err);
    } finally {
      setIsUploading(false);
      setUploadMessage("");
    }
  };

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
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            style={{ display: "none" }}
            id="uploadFileInput"
          />
          <label
            htmlFor="uploadFileInput"
            className="btn btn-primary mb-3"
            style={{ cursor: "pointer" }}
          >
            {isUploading ? "Uploading..." : "Upload Excel"}
          </label>
        </div>
        {isUploading && (
          <div className="alert alert-info" role="alert">
            {uploadMessage || "Vendor Data is uploading... Please wait."}
          </div>
        )}

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
                          (responder) => responder.id === company.employee
                        )?.employeename || "No Responder"}
                      </td>
                      <td>{companyType ? companyType.type_name : "Unknown"}</td>
                      <td>{company.is_active ? "Yes" : "No"}</td>
                    </tr>
                    {expandedRow === index && <ExpandedRow company={company} comments={comments} />}
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

      {hasMoreRecords && (
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={loadMoreCompanies}>
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Vendor;
