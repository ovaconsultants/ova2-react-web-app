import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../../../constants/toastMessage";
import { ToastContainer } from "react-toastify";
import { TextInput } from "../../common/formComponents/textInput";
import {
  fetchAllDoctors,
  fetchClinicsByDoctorId,
  fetchAdvertisements,
  insertAdvertisementPayment,
} from "../../../api/advertisementService";
import { Form, Row, Col, Button, Container } from "react-bootstrap";

const PaymentAdvertisement = () => {
  const navigate = useNavigate();
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedClinicId, setSelectedClinicId] = useState("");
  const [selectedAdvertisementId, setSelectedAdvertisementId] = useState("");
  const [paymentData, setPaymentData] = useState({
    ad_id: "",
    amount: "",
    payment_date: "",
    is_paid: false,
    effective_date: "",
    end_date: "",
    company_name: "",
    payment_method: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const response = await fetchAllDoctors();
        setDoctors(response.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    getDoctors();
  }, []);

  useEffect(() => {
    if (selectedDoctorId) {
      const getClinicsByDoctorId = async () => {
        try {
          const response = await fetchClinicsByDoctorId(selectedDoctorId);
          setClinics(response.clinics || []);
        } catch (error) {
          ToastMessage("Error fetching clinics by doctor ID.");
        }
      };
      getClinicsByDoctorId();
    } else {
      setClinics([]);
    }
  }, [selectedDoctorId]);

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
          ToastMessage("Error fetching advertisements.");
        }
      };
      getAdvertisements();
    } else {
      setAdvertisements([]);
    }
  }, [selectedDoctorId, selectedClinicId]);

  const handlePaymentDataChange = ({ target: { name, value, type, checked } }) => {
    setPaymentData({ 
      ...paymentData, 
      [name]: type === 'checkbox' ? checked : value 
    });
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAdvertisementChange = (e) => {
    const adId = e.target.value;
    const selectedAd = advertisements.find(ad => ad.ad_id === Number(adId));

    
    setSelectedAdvertisementId(adId);
    setPaymentData(prev => ({ 
      ...prev, 
      ad_id: adId,
      company_name: selectedAd?.company_name || "",
      // You might want to pre-fill other fields from the selected advertisement
    }));
  };

  const validateForm = () => {
    const errors = {};
    ["ad_id", "amount", "payment_date", "effective_date", "end_date", "company_name", "payment_method"].forEach(
      (field) => {
        if (!paymentData[field]?.trim()) {
          errors[field] = `${field.replace(/_/g, " ")} is required.`;
        }
      }
    );
    if (paymentData.amount && isNaN(paymentData.amount)) {
      errors.amount = "Amount must be a valid number.";
    }
    return errors;
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        await insertAdvertisementPayment({
          ...paymentData,
          amount: Number(paymentData.amount) // Ensure amount is a number
        });
        ToastMessage("Advertisement payment inserted successfully");
        setTimeout(() => navigate("/admin/ova2-etoken/payment-advertisement"), 3000);
      } catch (error) {
        console.error("Payment error:", error);
        ToastMessage("Error occurred while inserting the advertisement payment");
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <Container className="mt-4">
      <Form className="p-4" onSubmit={handlePaymentSubmit}>
        <h4 className="text-center mb-4">Advertisement Payment</h4>

        {/* Doctor, Clinic, Advertisement */}
        <Row className="g-3 mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Select Doctor</Form.Label>
              <Form.Select 
                value={selectedDoctorId} 
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                isInvalid={!!formErrors.doctor_id}
              >
                <option value="">Select a Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.doctor_id} value={doctor.doctor_id}>
                    {doctor.first_name} {doctor.last_name}
                  </option>
                ))}
              </Form.Select>
              {formErrors.doctor_id && (
                <Form.Control.Feedback type="invalid">
                  {formErrors.doctor_id}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Select Clinic</Form.Label>
              <Form.Select 
                value={selectedClinicId} 
                onChange={(e) => setSelectedClinicId(e.target.value)} 
                disabled={!selectedDoctorId}
                isInvalid={!!formErrors.clinic_id}
              >
                <option value="">Select a Clinic</option>
                {clinics.map((clinic) => (
                  <option key={clinic.clinic_id} value={clinic.clinic_id}>
                    {clinic.clinic_name}
                  </option>
                ))}
              </Form.Select>
              {formErrors.clinic_id && (
                <Form.Control.Feedback type="invalid">
                  {formErrors.clinic_id}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Select Advertisement</Form.Label>
              <Form.Select 
                value={selectedAdvertisementId} 
                onChange={handleAdvertisementChange} 
                disabled={!selectedClinicId}
                isInvalid={!!formErrors.ad_id}
              >
                <option value="">Select an Advertisement</option>
                {advertisements.map((ad) => (
                  <option key={ad.ad_id} value={ad.ad_id}>
                    {ad.company_name}
                  </option>
                ))}
              </Form.Select>
              {formErrors.ad_id && (
                <Form.Control.Feedback type="invalid">
                  {formErrors.ad_id}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* Payment Details */}
        <Row className="g-3 mb-3">
          <Col md={4}>
            <Form.Label>Amount</Form.Label>
            <TextInput 
              name="amount" 
              type="number" 
              value={paymentData.amount} 
              onChange={handlePaymentDataChange} 
              error={formErrors.amount} 
              placeholder="Enter Amount" 
            />
          </Col>
          <Col md={4}>
            <Form.Label>Payment Date</Form.Label>
            <TextInput 
              name="payment_date" 
              type="date" 
              value={paymentData.payment_date} 
              onChange={handlePaymentDataChange} 
              error={formErrors.payment_date} 
            />
          </Col>
          <Col md={4}>
            <Form.Label>Effective Date</Form.Label>
            <TextInput 
              name="effective_date" 
              type="date" 
              value={paymentData.effective_date} 
              onChange={handlePaymentDataChange} 
              error={formErrors.effective_date} 
            />
          </Col>
        </Row>

        <Row className="g-3 mb-3">
          <Col md={4}>
            <Form.Label>End Date</Form.Label>
            <TextInput 
              name="end_date" 
              type="date" 
              value={paymentData.end_date} 
              onChange={handlePaymentDataChange} 
              error={formErrors.end_date} 
            />
          </Col>
          <Col md={4}>
            <Form.Label>Company Name</Form.Label>
            <TextInput 
              name="company_name" 
              type="text" 
              value={paymentData.company_name} 
              onChange={handlePaymentDataChange} 
              error={formErrors.company_name} 
              placeholder="Enter Company Name" 
            />
          </Col>
          <Col md={4}>
            <Form.Label>Payment Method</Form.Label>
            <TextInput 
              name="payment_method" 
              type="text" 
              value={paymentData.payment_method} 
              onChange={handlePaymentDataChange} 
              error={formErrors.payment_method} 
              placeholder="Enter Payment Method" 
            />
          </Col>
        </Row>

        {/* Add a Checkbox for is_paid */}
        <Row className="g-3 mb-3">
          <Col md={4}>
            <Form.Check 
              type="checkbox"
              label="Is Paid"
              name="is_paid"
              checked={paymentData.is_paid}
              onChange={handlePaymentDataChange}
            />
          </Col>
        </Row>

        <Button className="btn btn-default col-12" type="submit">
          Insert Payment
        </Button>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default PaymentAdvertisement;