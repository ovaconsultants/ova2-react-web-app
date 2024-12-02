import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendMail } from "../../api/adminUserService";

const ForgotPassword = () => {
    const [userRecoveryItem, setUserRecoveryItem] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setUserRecoveryItem(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setIsLoading(true);
        setError('');
        try {
            const response = await sendMail(userRecoveryItem);
            if (response) {
                setIsSuccess(true);
            }
        } catch (err) {
            console.log(err);
            setError('There was an error processing your request. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            {isSuccess ? (
                <section className="page-title bg-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="block text-center">
                                    <h1>Password Reset</h1>
                                    <p className="text-white m-3">
                                        We have sent you an email with instructions to reset your password. Please check your inbox.
                                    </p>
                                    <div>
                                        <Link to="/login" className="btn btn-primary m-3">Back to Login</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <>
                    <section className="page-title bg-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="block">
                                        <h1>Forgot Password</h1>
                                        <p>Enter your registered email or phone number to reset your password.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="contact-form">
                        <div className="container">
                            <form className="row" id="forgot-password-form" onSubmit={handleSubmit}>
                                <div className="col-md-6 col-sm-12">
                                    <div className="block">
                                        {error && <p className="text-danger">{error}</p>}
                                        <div className="form-group">
                                            <input
                                                name="contactInput"
                                                type="text"
                                                className="form-control"
                                                placeholder="Email or Phone"
                                                value={userRecoveryItem}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <button
                                            className="btn btn-default w-100"
                                            type="submit"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Sending..." : "Reset Password"}
                                        </button>
                                        <div className="text-center mt-4">
                                            <p className="mb-0">
                                                Remembered your account details?{" "}
                                                <Link
                                                    to="/login"
                                                    className="text-primary text-decoration-none fw-bold"
                                                >
                                                    Login here
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

export default ForgotPassword;
