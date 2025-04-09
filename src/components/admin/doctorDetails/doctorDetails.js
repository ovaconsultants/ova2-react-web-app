import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../../../constants/toastMessage";
import { ToastContainer } from "react-toastify";
import {
  fetchAllDoctors,
  toggleDoctorAccount,
} from "../../../api/advertisementService";
import ToggleSwitch from "../../common/toggleSwitch/toggleSwitch";
import { Modal, Button } from "react-bootstrap";
import "./doctorDetails.scss";

const DoctorDetails = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetchAllDoctors();
        setDoctors(response.doctors);
      } catch (error) {
        ToastMessage("Error fetching doctors");
        console.error(error);
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

      // Extract the doctor's name for toast message
      const doctorName = `Doctor ${selectedDoctor.first_name} ${selectedDoctor.last_name}`;
      ToastMessage(
        `${doctorName} has been ${
          response.doctor_status === "Y" ? "activated" : "deactivated"
        }`
      );

      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor.doctor_id === selectedDoctor.doctor_id
            ? { ...doctor, is_active: response.doctor_status }
            : doctor
        )
      );
    } catch (error) {
      ToastMessage("Error toggling doctor account status");
      console.error(error);
    }
    setShowModal(false);
  };

  const openConfirmationModal = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleDoctorClick = (doctorId) => {
    navigate(`/admin/ova2-etoken/doctor-details/${doctorId}`);
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

      <table className="table table-bordered table-striped">
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
          {filteredDoctors.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No data available
              </td>
            </tr>
          ) : (
            filteredDoctors.map((doctor, index) => (
              <tr key={doctor.doctor_id}>
                <td>{index + 1}</td>
                <td>
                  <span
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => handleDoctorClick(doctor.doctor_id)}
                  >
                    {doctor.first_name} {doctor.last_name}
                  </span>
                </td>
                <td>{doctor.specialization_name}</td>
                <td>{doctor.mobile_number}</td>
                <td>{doctor.email}</td>
                <td>{doctor.is_active === "Y" ? "Active" : "Inactive"}</td>
                <td>
                  <ToggleSwitch
                    isOn={doctor.is_active === "Y"}
                    onToggle={() => openConfirmationModal(doctor)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title className="fs-5"> Confirm Status Change!</Modal.Title>
        </Modal.Header>
        <hr className="modal-separator" /> {/* Separator after Header */}
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
        <hr className="modal-separator" /> {/* Separator after Body */}
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
