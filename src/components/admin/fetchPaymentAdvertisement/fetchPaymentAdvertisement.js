import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchAllDoctors,
  fetchClinicsByDoctorId,
  fetchAdvertisements,
  fetchAdvertisementPaymentsByAdId,
  updateAdvertisementPayment,
} from "../../../api/advertisementService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToggleSwitch from "../../common/toggleSwitch/toggleSwitch";

const FetchPaymentAdvertisement = () => {
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedClinicId, setSelectedClinicId] = useState("");
  const [selectedAdvertisementId, setSelectedAdvertisementId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [advertisements, setAdvertisements] = useState([]);
  const [payments, setPayments] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [formData, setFormData] = useState({
    payment_id: "",
    ad_id: "",
    amount: "",
    payment_date: "",
    is_paid: false,
    effective_date: "",
    end_date: "",
    company_name: "",
    payment_method: "",
    modified_by: "admin",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [toggleModal, setToggleModal] = useState(false);
  const [togglePaymentId, setTogglePaymentId] = useState(null);
  const [toggleStatus, setToggleStatus] = useState(false);
  const navigate = useNavigate();

  // Fetch all doctors on component mount
  useEffect(() => {
    const getDoctors = async () => {
      try {
        const response = await fetchAllDoctors();
        setDoctors(response.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error("Error fetching doctors.");
      }
    };
    getDoctors();
  }, []);

  // Fetch clinics by doctor ID
  useEffect(() => {
    if (selectedDoctorId) {
      const getClinicsByDoctorId = async () => {
        try {
          const response = await fetchClinicsByDoctorId(selectedDoctorId);
          setClinics(response.clinics || []);
        } catch (error) {
          toast.error("Error fetching clinics by doctor ID.");
        }
      };
      getClinicsByDoctorId();
    } else {
      setClinics([]);
    }
  }, [selectedDoctorId]);

  // Fetch advertisements by doctor and clinic ID
  useEffect(() => {
    if (selectedDoctorId && selectedClinicId) {
      const getAdvertisements = async () => {
        try {
          const response = await fetchAdvertisements(
            selectedDoctorId,
            selectedClinicId,
            "ALL" // Using 'ALL' as filter_type to get all advertisements
          );
          setAdvertisements(response.advertisements || []);
        } catch (error) {
          toast.error("Error fetching advertisements.");
        }
      };
      getAdvertisements();
    } else {
      setAdvertisements([]);
    }
  }, [selectedDoctorId, selectedClinicId]);

  // Fetch advertisement payments by advertisement ID
  useEffect(() => {
    if (selectedAdvertisementId) {
      const getAdvertisementPayments = async () => {
        try {
          const response = await fetchAdvertisementPaymentsByAdId(
            selectedAdvertisementId
          );
          setPayments(response.payments || []);
        } catch (error) {
          toast.error("Error fetching advertisement payments.");
        }
      };
      getAdvertisementPayments();
    } else {
      setPayments([]);
    }
  }, [selectedAdvertisementId]);

  // Toggle expand row for editing
  const toggleExpandRow = (index, paymentId) => {
    if (expandedRow === index) {
      setExpandedRow(null);
      setIsEditing(false);
    } else {
      setExpandedRow(index);
      setIsEditing(false);
      const payment = payments.find(
        (payment) => payment.payment_id === paymentId
      );
      setFormData({
        payment_id: payment.payment_id,
        ad_id: payment.ad_id,
        amount: payment.amount,
        payment_date: payment.payment_date.split("T")[0],
        is_paid: payment.is_paid,
        effective_date: payment.effective_date.split("T")[0],
        end_date: payment.end_date.split("T")[0],
        company_name: payment.company_name,
        payment_method: payment.payment_method,
        modified_by: "admin",
      });
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission for updating payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateAdvertisementPayment(formData);
      toast.success("Payment updated successfully!");
      setIsEditing(false);
      setExpandedRow(null);
      const updatedPayments = await fetchAdvertisementPaymentsByAdId(
        selectedAdvertisementId
      );
      setPayments(updatedPayments.payments || []);
    } catch (error) {
      toast.error("Error updating payment.");
    }
  };

  // Handle delete action
  const handleDelete = (paymentId) => {
    setSelectedAction("delete");
    setSelectedPaymentId(paymentId);
    setShowModal(true);
  };

  // Handle toggle action (activate/deactivate)
  const handleToggle = (paymentId, isActive) => {
    setTogglePaymentId(paymentId);
    setToggleStatus(isActive);
    setToggleModal(true);
  };

  // Confirm toggle action
  const confirmToggle = async () => {
    try {
      const data = {
        payment_id: togglePaymentId,
        is_active: toggleStatus ? "N" : "Y", // Toggle the state
        modified_by: "admin",
      };

      await updateAdvertisementPayment(data);
      toast.success(
        `Payment ${toggleStatus ? "deactivated" : "activated"} successfully!`
      );

      // Refresh payments
      const updatedPayments = await fetchAdvertisementPaymentsByAdId(
        selectedAdvertisementId
      );
      setPayments(updatedPayments.payments || []);
    } catch (error) {
      toast.error(`Error toggling payment status.`);
    } finally {
      setToggleModal(false);
    }
  };

  // Confirm action (delete)
  const handleConfirmAction = async () => {
    try {
      const data = {
        payment_id: selectedPaymentId,
        is_deleted: "Y",
        modified_by: "admin",
      };

      await updateAdvertisementPayment(data);
      toast.success(`Payment deleted successfully!`);

      // Refresh payments
      const updatedPayments = await fetchAdvertisementPaymentsByAdId(
        selectedAdvertisementId
      );
      setPayments(updatedPayments.payments || []);
    } catch (error) {
      toast.error(`Error deleting payment.`);
    } finally {
      setShowModal(false);
      setSelectedAction(null);
      setSelectedPaymentId(null);
    }
  };

  // Confirmation Modal Component
  const ConfirmationModal = () => {
    if (!showModal && !toggleModal) return null;

    return (
      <div
        className="modal"
        style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {showModal ? "Confirm Delete" : "Confirm Toggle"}
              </h5>
            </div>
            <div className="modal-body">
              <p>
                {showModal
                  ? "Are you sure you want to delete this payment?"
                  : `Are you sure you want to ${
                      toggleStatus ? "deactivate" : "activate"
                    } this payment?`}
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() =>
                  showModal ? setShowModal(false) : setToggleModal(false)
                }
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={showModal ? handleConfirmAction : confirmToggle}
              >
                {showModal
                  ? "Delete"
                  : toggleStatus
                  ? "Deactivate"
                  : "Activate"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <h4 className="text-center mb-4">Fetch Advertisement Payments</h4>
      <ToastContainer />

      {/* Professional, Clinic, Advertisement Dropdowns and Add Payment Button */}
      <div className="container">
        <div className="row align-items-center justify-content-center mb-3">
          {/* Professional Selection */}
          <div className="col-md-3 col-sm-6 mb-2">
            <label>Select Professional</label>
            <select
              className="form-control"
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
            >
              <option value="">Select Professional</option>
              {doctors.map((doctor) => (
                <option key={doctor.doctor_id} value={doctor.doctor_id}>
                  {doctor.first_name} {doctor.last_name}
                </option>
              ))}
            </select>
          </div>

          {/* Clinic Selection */}
          <div className="col-md-3 col-sm-6 mb-2">
            <label>Select Clinic</label>
            <select
              className="form-control"
              value={selectedClinicId}
              onChange={(e) => setSelectedClinicId(e.target.value)}
              disabled={!selectedDoctorId}
            >
              <option value="">Select Clinic</option>
              {clinics.map((clinic) => (
                <option key={clinic.clinic_id} value={clinic.clinic_id}>
                  {clinic.clinic_name}
                </option>
              ))}
            </select>
          </div>

          {/* Advertisement Selection */}
          <div className="col-md-3 col-sm-6 mb-2">
            <label>Select Advertisement</label>
            <select
              className="form-control"
              value={selectedAdvertisementId}
              onChange={(e) => setSelectedAdvertisementId(e.target.value)}
              disabled={!selectedClinicId}
            >
              <option value="">Select Advertisement</option>
              {advertisements.map((ad) => (
                <option key={ad.ad_id} value={ad.ad_id}>
                  {ad.company_name}
                </option>
              ))}
            </select>
          </div>

          {/* Add Payment Button */}
          <div className="col-md-3 col-sm-6 text-center">
            <button
              className="btn btn-primary w-100"
              onClick={() =>
                navigate("/admin/ova2-etoken/payment-advertisement")
              }
            >
              Add Payment
            </button>
          </div>
        </div>
      </div>

      {/* Display Payments Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Payment ID</th>
              <th>Amount</th>
              <th>Payment Date</th>
              <th>Effective Date</th>
              <th>End Date</th>
              <th>Company Name</th>
              <th>Status</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <React.Fragment key={payment.payment_id}>
                  <tr>
                    <td>
                      <span
                        className="toggle-expand"
                        onClick={() =>
                          toggleExpandRow(index, payment.payment_id)
                        }
                      >
                        {expandedRow === index ? "-" : "+"}
                      </span>
                    </td>
                    <td>{payment.payment_id}</td>
                    <td>{payment.amount}</td>
                    <td>
                      {new Date(payment.payment_date).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(payment.effective_date).toLocaleDateString()}
                    </td>
                    <td>{new Date(payment.end_date).toLocaleDateString()}</td>
                    <td>{payment.company_name}</td>
                    <td>{payment.is_active === "Y" ? "Active" : "Inactive"}</td>
                    <td>{payment.payment_method}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(payment.payment_id)}
                        >
                          Delete
                        </button>
                        <div className="ms-auto">
                          {" "}
                          {/* Pushes the toggle switch to the right */}
                          <ToggleSwitch
                            isOn={payment.is_active === "Y"}
                            onToggle={() =>
                              handleToggle(
                                payment.payment_id,
                                payment.is_active === "Y"
                              )
                            }
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  {expandedRow === index && (
                    <tr>
                      <td colSpan="10">
                        <form onSubmit={handleSubmit}>
                          <div className="form-row">
                            <div className="form-group col-md-3">
                              <label>Amount</label>
                              <input
                                type="text"
                                className="form-control"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                disabled={!isEditing}
                              />
                            </div>
                            <div className="form-group col-md-3">
                              <label>Payment Date</label>
                              <input
                                type="date"
                                className="form-control"
                                name="payment_date"
                                value={formData.payment_date}
                                onChange={handleChange}
                                disabled={!isEditing}
                              />
                            </div>
                            <div className="form-group col-md-3">
                              <label>Effective Date</label>
                              <input
                                type="date"
                                className="form-control"
                                name="effective_date"
                                value={formData.effective_date}
                                onChange={handleChange}
                                disabled={!isEditing}
                              />
                            </div>
                            <div className="form-group col-md-3">
                              <label>End Date</label>
                              <input
                                type="date"
                                className="form-control"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleChange}
                                disabled={!isEditing}
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group col-md-3">
                              <label>Company Name</label>
                              <input
                                type="text"
                                className="form-control"
                                name="company_name"
                                value={formData.company_name}
                                onChange={handleChange}
                                disabled={!isEditing}
                              />
                            </div>
                            <div className="form-group col-md-3">
                              <label>Payment Method</label>
                              <input
                                type="text"
                                className="form-control"
                                name="payment_method"
                                value={formData.payment_method}
                                onChange={handleChange}
                                disabled={!isEditing}
                              />
                            </div>
                            <div className="form-group col-md-3">
                              <label>Status</label>
                              <select
                                className="form-control"
                                name="is_paid"
                                value={formData.is_paid}
                                onChange={handleChange}
                                disabled={!isEditing}
                              >
                                <option value={true}>Paid</option>
                                <option value={false}>Unpaid</option>
                              </select>
                            </div>
                            <div className="form-group col-md-3 d-flex align-items-end justify-content-end">
                              {!isEditing ? (
                                <button
                                  type="button"
                                  className="btn btn-warning"
                                  onClick={() => setIsEditing(true)}
                                >
                                  Edit
                                </button>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setIsEditing(false)}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn btn-primary ml-2"
                                  >
                                    Update
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </form>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal />
    </div>
  );
};

export default FetchPaymentAdvertisement;