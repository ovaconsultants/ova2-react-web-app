import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import {
  updateAdvertisement,
  fetchAllDoctors,
  fetchClinicsByDoctorId,
  fetchActiveAdvertisements,
} from "../../../api/advertisementService";
import ToastMessage from "../../../constants/toastMessage";
import { ToastContainer } from "react-toastify";


const UpdateAdvertisement = () => {
  const { ad_id } = useParams();
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
  });
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetchAllDoctors();
        setDoctors(response.doctors || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        alert.error("Error fetching doctors.");
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    if (formData.doctor_id) {
      const fetchClinics = async () => {
        try {
          const response = await fetchClinicsByDoctorId(formData.doctor_id);
          setClinics(response.clinics || []);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching clinics:", error);
          alert.error("Error fetching clinics.");
          setLoading(false);
        }
      };

      fetchClinics();
    } else {
      setClinics([]);
    }
  }, [formData.doctor_id]);

  useEffect(() => {
    if (formData.doctor_id && formData.clinic_id) {
      const fetchAds = async () => {
        try {
          const response = await fetchActiveAdvertisements(
            formData.doctor_id,
            formData.clinic_id
          );
          setAdvertisements(response.advertisements || []);

          const selectedAd = response.advertisements.find(
            (ad) => ad.ad_id === parseInt(ad_id)
          );

          if (selectedAd) {
            setFormData({
              ...selectedAd,
              display_frequency: selectedAd.display_frequency?.hours || "",
              start_date: selectedAd.start_date.split("T")[0],
              end_date: selectedAd.end_date.split("T")[0],
            });
          } else {
         alert.error("Advertisement not found.");
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching advertisements:", error);
          alert.error("Error fetching advertisements.");
          setLoading(false);
        }
      };

      fetchAds();
    } else {
      setAdvertisements([]);
    }
  }, [formData.doctor_id, formData.clinic_id, ad_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "display_frequency" ? Number(value) || "" : value,
    });
  };

  const handleDoctorChange = async (e) => {
    const doctorId = e.target.value;
    setFormData({
      ...formData,
      doctor_id: doctorId,
      clinic_id: "",
    });
  };

  const handleClinicChange = async (e) => {
    const clinicId = e.target.value;
    setFormData({
      ...formData,
      clinic_id: clinicId,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ad_id,
        ...formData,
        display_frequency: { hours: Number(formData.display_frequency) || 0 },
      };

      const response = await updateAdvertisement(data);
      ToastMessage(response.message || "Advertisement updated successfully!");
      console.error("Toast is not defined. Check ToastContainer initialization.");
      setIsEditing(false);
    } catch (error) {
      alert.error("Error updating advertisement.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <Row className="mb-4">
        <Col xs={12} className="d-flex justify-content-between align-items-center">
          <h2>Update Advertisement</h2>
          <div>
            <Button
              variant="secondary"
              onClick={() => setIsEditing(!isEditing)}
              className="me-2"
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={!isEditing}
            >
              Update
            </Button>
          </div>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Doctor</Form.Label>
                  <Form.Select
                    name="doctor_id"
                    value={formData.doctor_id}
                    onChange={handleDoctorChange}
                    disabled={!isEditing}
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.doctor_id} value={doctor.doctor_id}>
                        {doctor.first_name} {doctor.last_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Clinic</Form.Label>
                  <Form.Select
                    name="clinic_id"
                    value={formData.clinic_id}
                    onChange={handleClinicChange}
                    disabled={!isEditing || !formData.doctor_id || clinics.length === 0}
                  >
                    <option value="">Select Clinic</option>
                    {clinics.map((clinic) => (
                      <option key={clinic.clinic_id} value={clinic.clinic_id}>
                        {clinic.clinic_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Content Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="content_type"
                    value={formData.content_type}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Display Frequency (Hours)</Form.Label>
                  <Form.Control
                    type="number"
                    name="display_frequency"
                    value={formData.display_frequency}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Content URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="content_url"
                    value={formData.content_url}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Display Duration (sec)</Form.Label>
                  <Form.Control
                    type="number"
                    name="display_duration"
                    value={formData.display_duration}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default UpdateAdvertisement;