import React, { useState, useEffect } from "react";
import ToastMessage from "../../../constants/toastMessage";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchAdvertisements,
  fetchAllDoctors,
  fetchClinicsByDoctorId,
  updateAdvertisement,
} from "../../../api/advertisementService";

const ActiveAdvertisement = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedClinicId, setSelectedClinicId] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [formData, setFormData] = useState({
    doctor_id: "",
    clinic_id: "",
    company_name: "",
    content_type: "",
    content_url: "",
    display_duration: "",
    display_frequency: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    amount: "",
    payment_method: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Fetch all doctors on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetchAllDoctors();
        setDoctors(response.doctors || []);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        ToastMessage.error("Error fetching doctors");
        setError("Error fetching doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Fetch clinics when a doctor is selected
  useEffect(() => {
    if (selectedDoctorId) {
      const getClinicsByDoctorId = async () => {
        try {
          setLoading(true);
          const response = await fetchClinicsByDoctorId(selectedDoctorId);
          setClinics(response?.clinics || []);
          setSelectedClinicId("");
        } catch (error) {
          console.error("Error fetching clinics by doctor ID:", error);
          ToastMessage.error("Error fetching clinics by doctor ID.");
          setError("Error fetching clinics by doctor ID.");
        } finally {
          setLoading(false);
        }
      };

      getClinicsByDoctorId();
    } else {
      setClinics([]);
    }
  }, [selectedDoctorId]);

  // Fetch advertisements when both doctor and clinic are selected
  useEffect(() => {
    if (selectedDoctorId && selectedClinicId) {
      const getAdvertisements = async () => {
        try {
          setLoading(true);
          const response = await fetchAdvertisements(
            selectedDoctorId,
            selectedClinicId,
            "ALL"
          );
          setAdvertisements(response.advertisements || []);
        } catch (error) {
          setError("Error fetching advertisements.");
          ToastMessage.error("Error fetching advertisements.");
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      getAdvertisements();
    } else {
      setAdvertisements([]);
    }
  }, [selectedDoctorId, selectedClinicId]);

  // Handle expand/collapse row
  const toggleExpandRow = (index, adId) => {
    if (expandedRow === index) {
      setExpandedRow(null);
      setIsEditing(false);
    } else {
      setExpandedRow(index);
      setIsEditing(false);
      const ad = advertisements.find((ad) => ad.ad_id === adId);
      setFormData({
        doctor_id: ad.doctor_id,
        clinic_id: ad.clinic_id,
        company_name: ad.company_name,
        content_type: ad.content_type,
        content_url: ad.content_url,
        display_duration: ad.display_duration,
        display_frequency: ad.display_frequency?.hours || "",
        start_date: ad.start_date?.split("T")[0] || "",
        end_date: ad.end_date?.split("T")[0] || "",
        start_time: ad.start_time,
        end_time: ad.end_time,
        amount: ad.amount,
        payment_method: ad.payment_method,
      });
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "display_frequency" ? Number(value) || "" : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ad_id: advertisements[expandedRow].ad_id,
        ...formData,
        display_frequency: { hours: Number(formData.display_frequency) || 0 },
      };

      await updateAdvertisement(data);
      ToastMessage.success("Advertisement updated successfully!");
      setIsEditing(false);
      setExpandedRow(null);
      const updatedAdvertisements = await fetchAdvertisements(
        selectedDoctorId,
        selectedClinicId,
        "ALL"
      );
      setAdvertisements(updatedAdvertisements.advertisements || []);
    } catch (error) {
      ToastMessage.error("Error updating advertisement.");
    }
  };

  // Filter advertisements based on search term
  const filteredAdvertisements = advertisements.filter((ad) => {
    return (
      ad.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.content_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.content_url?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ad.display_frequency?.hours || "").toString().includes(searchTerm) ||
      (ad.start_date ? new Date(ad.start_date).toLocaleDateString().includes(searchTerm) : false) ||
      (ad.end_date ? new Date(ad.end_date).toLocaleDateString().includes(searchTerm) : false)
    );
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h4 className="text-center">Advertisements</h4>
      <ToastContainer />

      {/* Doctor and Clinic Search Boxes */}
      <div className="d-flex justify-content-between mb-3">
        <div className="w-25">
          <label>Select Doctor</label>
          <select
            className="form-control"
            value={selectedDoctorId}
            onChange={(e) => {
              setSelectedDoctorId(e.target.value);
              setSelectedClinicId("");
            }}
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.doctor_id} value={doctor.doctor_id}>
                {doctor.first_name} {doctor.last_name}
                {doctor.specialization_name && ` (${doctor.specialization_name})`}
              </option>
            ))}
          </select>
        </div>

        <div className="w-25">
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

        <div className="w-25">
          <label>Search Advertisements</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="d-flex align-items-end">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/admin/etoken-advertisement")}
          >
            Add Advertisement
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Company Name</th>
              <th>Content Type</th>
              <th>Content URL</th>
              <th>Display Duration (sec)</th>
              <th>Display Frequency</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Days Left</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdvertisements.length > 0 ? (
              filteredAdvertisements.map((ad, index) => (
                <React.Fragment key={ad.ad_id}>
                  <tr>
                    <td>
                      <span
                        className="toggle-expand"
                        onClick={() => toggleExpandRow(index, ad.ad_id)}
                      >
                        {expandedRow === index ? "-" : "+"}
                      </span>
                    </td>
                    <td>{ad.company_name}</td>
                    <td>{ad.content_type}</td>
                    <td>
                      <a
                        href={ad.content_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {ad.content_url}
                      </a>
                    </td>
                    <td>{ad.display_duration}</td>
                    <td>{ad.display_frequency?.hours || 0} hour(s)</td>
                    <td>{ad.start_date ? new Date(ad.start_date).toLocaleDateString() : ''}</td>
                    <td>{ad.end_date ? new Date(ad.end_date).toLocaleDateString() : ''}</td>
                    <td>{ad.start_time}</td>
                    <td>{ad.end_time}</td>
                    <td>${ad.amount}</td>
                    <td>{ad.payment_method}</td>
                    <td>{ad.days_left_to_expire !== null ? ad.days_left_to_expire : '-'}</td>
                  </tr>
                  {expandedRow === index && (
                    <tr>
                      <td colSpan="13">
                        <form onSubmit={handleSubmit}>
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
                              <label>Content Type</label>
                              <input
                                type="text"
                                className="form-control"
                                name="content_type"
                                value={formData.content_type}
                                onChange={handleChange}
                                disabled={!isEditing}
                              />
                            </div>
                            <div className="form-group col-md-3">
                              <label>Content URL</label>
                              <input
                                type="text"
                                className="form-control"
                                name="content_url"
                                value={formData.content_url}
                                onChange={handleChange}
                                disabled={!isEditing}
                              />
                            </div>
                            <div className="form-group col-md-3">
                              <label>Display Duration (sec)</label>
                              <input
                                type="text"
                                className="form-control"
                                name="display_duration"
                                value={formData.display_duration}
                                onChange={handleChange}
                                disabled={!isEditing}
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group col-md-3">
                              <label>Display Frequency (hours)</label>
                              <input
                                type="text"
                                className="form-control"
                                name="display_frequency"
                                value={formData.display_frequency}
                                onChange={handleChange}
                                disabled={!isEditing}
                              />
                            </div>
                            <div className="form-group col-md-3">
                              <label>Start Date</label>
                              <input
                                type="date"
                                className="form-control"
                                name="start_date"
                                value={formData.start_date}
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
                            <div className="form-group col-md-3">
                              <label>Start Time</label>
                              <input
                                type="time"
                                className="form-control"
                                name="start_time"
                                value={formData.start_time}
                                onChange={handleChange}
                                disabled={!isEditing}
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group col-md-3">
                              <label>End Time</label>
                              <input
                                type="time"
                                className="form-control"
                                name="end_time"
                                value={formData.end_time}
                                onChange={handleChange}
                                disabled={!isEditing}
                              />
                            </div>
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
                <td colSpan="13" className="text-center">
                  {selectedDoctorId && selectedClinicId 
                    ? "No advertisements found for selected doctor and clinic" 
                    : "Please select a doctor and clinic to view advertisements"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveAdvertisement;