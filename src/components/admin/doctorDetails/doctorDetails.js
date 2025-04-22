import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../../../constants/toastMessage";
import { ToastContainer } from "react-toastify";
import { toggleDoctorAccount, fetchAllDoctors } from "../../../api/advertisementService";
import ToggleSwitch from "../../common/toggleSwitch/toggleSwitch";
import { Modal, Button } from "react-bootstrap";
import "./doctorDetails.scss";

const DoctorDetails = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [expandedDoctorDetails, setExpandedDoctorDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetchAllDoctors();
        setDoctors(response.doctors || []);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        ToastMessage.error("Error fetching doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleToggleDoctorAccount = async () => {
    if (!selectedDoctor) return;

    try {
      const response = await toggleDoctorAccount({
        doctor_id: selectedDoctor.doctor_id,
      });

      const doctorName = `Doctor ${selectedDoctor.first_name} ${selectedDoctor.last_name}`;
      ToastMessage(
        `${doctorName} has been ${
          response.doctor_status === "Y" ? "activated" : "deactivated"
        }`
      );

      // Refresh the doctors list
      const updatedResponse = await fetchAllDoctors();
      setDoctors(updatedResponse.doctors || []);
    } catch (error) {
      ToastMessage("Error toggling doctor account status");
      console.error(error);
    }
    setShowModal(false);
  };

  const openConfirmationModal = (doctor, e) => {
    e.stopPropagation();
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const toggleExpandRow = async (index, doctorId) => {
    if (expandedRow === index) {
      setExpandedRow(null);
      setExpandedDoctorDetails(null);
    } else {
      setExpandedRow(index);
      setLoadingDetails(true);
      try {
        const doctor = doctors.find(d => d.doctor_id === doctorId);
        setExpandedDoctorDetails(doctor);
      } catch (error) {
        ToastMessage("Error fetching doctor details");
        console.error(error);
      } finally {
        setLoadingDetails(false);
      }
    }
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearchQuery =
      doctor.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      doctor.mobile_number.includes(searchQuery) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatusFilter =
      statusFilter === "" ||
      (statusFilter === "Active" && doctor.is_active === "Y") ||
      (statusFilter === "Inactive" && doctor.is_active === "N");
    return matchesSearchQuery && matchesStatusFilter;
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Doctor Details</h1>
      <div className="row mb-2 align-items-center">
        <div className="col-md-7 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name, Specialization, Mobile, or Email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-2">
          <select
            className="form-control"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">---Select Doctor Status---</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="col-md-2 mb-2 text-end">
          <button
            className="btn text-white w-100"
            style={{ backgroundColor: "#47424c" }}
            onClick={() => navigate("/admin/ova2-etoken/add-doctor")}
          >
            Add Doctor
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Doctor Name</th>
              <th>Specialization</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center">
                  Loading doctors...
                </td>
              </tr>
            ) : filteredDoctors.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No data available
                </td>
              </tr>
            ) : (
              filteredDoctors.map((doctor, index) => (
                <React.Fragment key={doctor.doctor_id}>
                  <tr>
                    <td>
                      <span
                        className="toggle-expand"
                        onClick={() => toggleExpandRow(index, doctor.doctor_id)}
                      >
                        {expandedRow === index ? "-" : "+"}
                      </span>
                    </td>
                    <td>
                      {doctor.first_name} {doctor.last_name}
                    </td>
                    <td>{doctor.specialization_name}</td>
                    <td>{doctor.mobile_number}</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.is_active === "Y" ? "Active" : "Inactive"}</td>
                    <td>
                      <ToggleSwitch
                        isOn={doctor.is_active === "Y"}
                        onToggle={(e) => openConfirmationModal(doctor, e)}
                      />
                    </td>
                  </tr>
                  {expandedRow === index && (
                    <tr>
                      <td colSpan="7" className="p-4">
                        {loadingDetails ? (
                          <div className="text-center">Loading details...</div>
                        ) : (
                          expandedDoctorDetails && (
                            <div className="doctor-details-expanded">
                              <div className="row">
                                <div className="col-md-3 text-center">
                                  {expandedDoctorDetails.profile_picture_url ? (
                                    <img
                                      src={expandedDoctorDetails.profile_picture_url}
                                      alt="Profile"
                                      className="img-fluid rounded-circle mb-3"
                                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                    />
                                  ) : (
                                    <div className="no-image-placeholder d-flex align-items-center justify-content-center bg-light rounded-circle mb-3"
                                      style={{ width: '150px', height: '150px', margin: '0 auto' }}>
                                      No Image
                                    </div>
                                  )}
                                </div>
                                <div className="col-md-9">
                                  <div className="row">
                                    <div className="col-md-6">
                                      <p><strong>First Name:</strong> {expandedDoctorDetails.first_name}</p>
                                      <p><strong>Last Name:</strong> {expandedDoctorDetails.last_name}</p>
                                      <p><strong>Specialization:</strong> {expandedDoctorDetails.specialization_name}</p>
                                      <p><strong>Mobile:</strong> {expandedDoctorDetails.mobile_number}</p>
                                    </div>
                                    <div className="col-md-6">
                                      <p><strong>Phone:</strong> {expandedDoctorDetails.phone_number || 'N/A'}</p>
                                      <p><strong>Email:</strong> {expandedDoctorDetails.email}</p>
                                      <p><strong>Status:</strong> 
                                        <span className={expandedDoctorDetails.is_active === "Y" ? "text-success" : "text-danger"}>
                                          {expandedDoctorDetails.is_active === "Y" ? " Active" : " Inactive"}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                  <hr />
                                  <div className="row">
                                    <div className="col-md-6">
                                      <p><strong>Created By:</strong> {expandedDoctorDetails.created_by}</p>
                                      <p><strong>Created Date:</strong> {new Date(expandedDoctorDetails.created_date).toLocaleString()}</p>
                                    </div>
                                    <div className="col-md-6">
                                      {expandedDoctorDetails.modified_by && (
                                        <p><strong>Modified By:</strong> {expandedDoctorDetails.modified_by}</p>
                                      )}
                                      {expandedDoctorDetails.modified_date && (
                                        <p><strong>Modified Date:</strong> {new Date(expandedDoctorDetails.modified_date).toLocaleString()}</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title className="fs-5"> Confirm Status Change!</Modal.Title>
        </Modal.Header>
        <hr className="modal-separator" />
        <Modal.Body className="modal-body-custom">
          <p className="text-muted">
            Are you sure you want to{" "}
            <strong
              className={
                selectedDoctor?.is_active === "Y"
                  ? "text-danger"
                  : "text-success"
              }
            >
              {selectedDoctor?.is_active === "Y" ? "deactivate" : "activate"}
            </strong>{" "}
            Dr. {selectedDoctor?.first_name} {selectedDoctor?.last_name}?
          </p>
        </Modal.Body>
        <hr className="modal-separator" />
        <Modal.Footer className="modal-footer-custom">
          <Button
            variant="secondary"
            className="btn-close-custom"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
          <Button
            variant="danger"
            className="btn-cancel-custom"
            onClick={handleToggleDoctorAccount}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default DoctorDetails;