import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5500/forgotPassword', { email });
            setSubmitted(true);
        } catch (error) {
            setError("Failed to reset password. Please check your email and try again.");
        }
    };

    return (
        <div className="text-center">
            <br></br>
            <br></br>
            <h2>Forgot Password?</h2>

            <br></br>
            {submitted ? (
                <p>An email has been sent to {email} with instructions to reset your password.</p>
            ) : (
                <form onSubmit={handleSubmit} class="form-group">
                    <input
                        class="col-sm-10"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                    <br></br>
                    <br></br>
                    <button type="submit" className='btn btn-primary mb-2'>Reset Password</button>
                </form>
            )}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default ForgetPassword;
