import React, { useState, useEffect } from 'react';
import { fetchAccounts, fetchSpecializations, insertDoctor } from '../../../api/advertisementService';
import { TextInput } from "../../common/formComponents/textInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDoctor = () => {
    // Dropdown states
    const [accounts, setAccounts] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    
    // Form states
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        mobile_number: '',
        phone_number: '',
        email: '',
        created_by: 'admin_user',
        gender: '',
        date_of_birth: '',
        qualification: '',
        experience_years: '',
        consultation_fee: '',
        biography: '',
        address: '',
        registration_number: '',
        specialization: '',
        account_id: '',
        specialization_id: ''
    });

    // Load accounts on mount
    useEffect(() => {
        const loadAccounts = async () => {
            try {
                const response = await fetchAccounts();
                if (response.success) {
                    setAccounts(response.accounts || []);
                } else {
                    toast.error(response.message || 'Failed to load accounts');
                }
            } catch (err) {
                toast.error('Failed to load accounts');
                console.error(err);
            }
        };
        loadAccounts();
    }, []);

    // Load specializations when account is selected
    useEffect(() => {
        if (formData.account_id) {
            const loadSpecializations = async () => {
                try {
                    const response = await fetchSpecializations(formData.account_id);
                    if (response.success) {
                        setSpecializations(response.specializations || []);
                    } else {
                        toast.error(response.message || 'Failed to load specializations');
                    }
                } catch (err) {
                    toast.error('Failed to load specializations');
                    console.error(err);
                }
            };
            loadSpecializations();
        } else {
            setSpecializations([]);
        }
    }, [formData.account_id]);

    const handleInputChange = ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value });
        clearFieldError(name);
    };

    const clearFieldError = (fieldName) => {
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
    };

    const validateForm = () => {
        const errors = {};
        const requiredFields = [
            'first_name',
            'last_name',
            'mobile_number',
            'email',
            'account_id',
            'specialization_id'
        ];

        requiredFields.forEach((field) => {
            if (!formData[field] || formData[field].trim() === "") {
                errors[field] = `${formatFieldName(field)} is required.`;
            }
        });

        // Validate email format
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Please enter a valid email address.";
        }

        // Validate mobile number
        if (formData.mobile_number && !/^[0-9]{10,15}$/.test(formData.mobile_number)) {
            errors.mobile_number = "Please enter a valid mobile number.";
        }

        return errors;
    };

    const formatFieldName = (name) => {
        return name.replace(/_/g, " ");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        
        if (Object.keys(errors).length === 0) {
            try {
                const response = await insertDoctor(formData);
                if (response.success) {
                    toast.success("Doctor added successfully!");
                    // Reset form
                    setFormData({
                        first_name: '',
                        last_name: '',
                        mobile_number: '',
                        phone_number: '',
                        email: '',
                        created_by: 'admin_user',
                        gender: '',
                        date_of_birth: '',
                        qualification: '',
                        experience_years: '',
                        consultation_fee: '',
                        biography: '',
                        address: '',
                        registration_number: '',
                        specialization: '',
                        account_id: '',
                        specialization_id: ''
                    });
                } else {
                    toast.error(response.message || 'Failed to add doctor');
                }
            } catch (err) {
                toast.error(err.message || 'Failed to add doctor');
                console.error(err);
            }
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <div className="doctor-form-container p-4">
            <section className="contact-form">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <h4 className="text-center mb-4">Add Doctor</h4>

                        <div className="row mb-3">
                            {/* Account */}
                            <div className="col-md-4">
                                <label className="form-label">Account</label>
                                <select
                                    name="account_id"
                                    value={formData.account_id}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="">Select Account</option>
                                    {accounts.map(account => (
                                        <option key={account.account_id} value={account.account_id}>
                                            {account.account_name}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.account_id && (
                                    <div className="text-danger small mt-1">{formErrors.account_id}</div>
                                )}
                            </div>

                            {/* Specialization */}
                            <div className="col-md-4">
                                <label className="form-label">Specialization</label>
                                <select
                                    name="specialization_id"
                                    value={formData.specialization_id}
                                    onChange={handleInputChange}
                                    className="form-select"
                                    disabled={!formData.account_id || specializations.length === 0}
                                >
                                    <option value="">Select Specialization</option>
                                    {specializations.map(spec => (
                                        <option key={spec.specialization_id} value={spec.specialization_id}>
                                            {spec.specialization_name}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.specialization_id && (
                                    <div className="text-danger small mt-1">{formErrors.specialization_id}</div>
                                )}
                            </div>

                            {/* Specialization Name */}
                            <div className="col-md-4">
                                <label className="form-label">Specialization Name</label>
                                <TextInput
                                    name="specialization"
                                    type="text"
                                    value={formData.specialization}
                                    onChange={handleInputChange}
                                    error={formErrors.specialization}
                                    placeholder="Specialization Name"
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            {/* First Name */}
                            <div className="col-md-4">
                                <label className="form-label">First Name</label>
                                <TextInput
                                    name="first_name"
                                    type="text"
                                    value={formData.first_name}
                                    onChange={handleInputChange}
                                    error={formErrors.first_name}
                                    placeholder="First Name"
                                    className="form-control"
                                />
                            </div>

                            {/* Last Name */}
                            <div className="col-md-4">
                                <label className="form-label">Last Name</label>
                                <TextInput
                                    name="last_name"
                                    type="text"
                                    value={formData.last_name}
                                    onChange={handleInputChange}
                                    error={formErrors.last_name}
                                    placeholder="Last Name"
                                    className="form-control"
                                />
                            </div>

                            {/* Registration Number */}
                            <div className="col-md-4">
                                <label className="form-label">Registration Number</label>
                                <TextInput
                                    name="registration_number"
                                    type="text"
                                    value={formData.registration_number}
                                    onChange={handleInputChange}
                                    error={formErrors.registration_number}
                                    placeholder="Registration Number"
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            {/* Mobile Number */}
                            <div className="col-md-4">
                                <label className="form-label">Mobile Number</label>
                                <TextInput
                                    name="mobile_number"
                                    type="tel"
                                    value={formData.mobile_number}
                                    onChange={handleInputChange}
                                    error={formErrors.mobile_number}
                                    placeholder="Mobile Number"
                                    className="form-control"
                                />
                            </div>

                            {/* Phone Number */}
                            <div className="col-md-4">
                                <label className="form-label">Phone Number</label>
                                <TextInput
                                    name="phone_number"
                                    type="tel"
                                    value={formData.phone_number}
                                    onChange={handleInputChange}
                                    error={formErrors.phone_number}
                                    placeholder="Phone Number"
                                    className="form-control"
                                />
                            </div>

                            {/* Email */}
                            <div className="col-md-4">
                                <label className="form-label">Email</label>
                                <TextInput
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    error={formErrors.email}
                                    placeholder="Email"
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            {/* Gender */}
                            <div className="col-md-4">
                                <label className="form-label">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                    <option value="O">Other</option>
                                </select>
                            </div>

                            {/* Date of Birth */}
                            <div className="col-md-4">
                                <label className="form-label">Date of Birth</label>
                                <TextInput
                                    name="date_of_birth"
                                    type="date"
                                    value={formData.date_of_birth}
                                    onChange={handleInputChange}
                                    error={formErrors.date_of_birth}
                                    className="form-control"
                                />
                            </div>

                            {/* Qualification */}
                            <div className="col-md-4">
                                <label className="form-label">Qualification</label>
                                <TextInput
                                    name="qualification"
                                    type="text"
                                    value={formData.qualification}
                                    onChange={handleInputChange}
                                    error={formErrors.qualification}
                                    placeholder="Qualification"
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            {/* Experience Years */}
                            <div className="col-md-4">
                                <label className="form-label">Experience (Years)</label>
                                <TextInput
                                    name="experience_years"
                                    type="number"
                                    value={formData.experience_years}
                                    onChange={handleInputChange}
                                    error={formErrors.experience_years}
                                    placeholder="Experience Years"
                                    min="0"
                                    className="form-control"
                                />
                            </div>

                            {/* Consultation Fee */}
                            <div className="col-md-4">
                                <label className="form-label">Consultation Fee</label>
                                <TextInput
                                    name="consultation_fee"
                                    type="number"
                                    value={formData.consultation_fee}
                                    onChange={handleInputChange}
                                    error={formErrors.consultation_fee}
                                    placeholder="Consultation Fee"
                                    min="0"
                                    step="0.01"
                                    className="form-control"
                                />
                            </div>

                            {/* Address */}
                            <div className="col-md-4">
                                <label className="form-label">Address</label>
                                <TextInput
                                    name="address"
                                    type="text"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    error={formErrors.address}
                                    placeholder="Address"
                                    className="form-control"
                                />
                            </div>
                        </div>

                        {/* Biography */}
                        <div className="row mb-3">
                            <div className="col-12">
                                <label className="form-label">Biography</label>
                                <textarea
                                    name="biography"
                                    value={formData.biography}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    rows="3"
                                    placeholder="Biography"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="row mt-4">
                            <div className="col-12">
                                <button className="btn btn-primary w-100" type="submit">
                                    Add Doctor
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            <ToastContainer />
        </div>
    );
};

export default AddDoctor;