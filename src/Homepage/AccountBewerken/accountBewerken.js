import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import {wrapperGET} from "../../wrapper";

function AccountBewerken() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // Bevestig wachtwoord
    const [passwordCorrect, setPasswordCorrect] = useState(true);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!email.includes("@")) newErrors.email = "Voer een geldig emailadres in";
        if (newPassword.length > 0 && newPassword.length < 8) newErrors.newPassword = "Nieuw wachtwoord moet minimaal 8 tekens bevatten";
        if (newPassword !== confirmPassword) newErrors.confirmPassword = "Bevestig wachtwoord moet hetzelfde zijn als nieuw wachtwoord";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        try {
            const userData = await wrapperGET("users", 1); // Haal de gebruiker op via een ID (voor nu hardcoded)
            const isPasswordCorrect = bcrypt.compareSync(oldPassword, userData.password); // Vergelijk het oude wachtwoord

            if (isPasswordCorrect) {
                // Als het oude wachtwoord klopt, werk de gegevens bij
                console.log("Password correct, updating user details");
                alert("Gegevens zijn bijgewerkt");
                navigate("/profile"); // Navigeer naar de profielpagina na het bijwerken
            } else {
                setPasswordCorrect(false); // Stel in dat het wachtwoord niet correct is
            }
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    return (
        <div>
            {/* Navigatiebalk */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                <a className="navbar-brand d-flex align-items-center" href="/">
                    <img
                        src="https://icons.getbootstrap.com/assets/icons/badge-4k.svg"
                        width="30"
                        height="30"
                        alt="logo"
                        className="me-2"
                    />
                    CarAndALL
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link active" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Particulier</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Zakelijk</a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Account Bewerken Formulier */}
            <div className="container md-3">
                <h2 className="text-center mb-4">Account Bewerken</h2>
                <form onSubmit={handleSubmit} className="card p-4 shadow col-md-6 mx-auto">
                    {/* Foutmelding */}
                    {!passwordCorrect && (
                        <div className="alert alert-danger">
                            Het oude wachtwoord is niet correct!
                        </div>
                    )}

                    <div className="form-group md-2">
                        <label htmlFor="firstName">Voornaam</label>
                        <input
                            type="text"
                            id="firstName"
                            className="form-control"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group md-2">
                        <label htmlFor="lastName">Achternaam</label>
                        <input
                            type="text"
                            id="lastName"
                            className="form-control"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className="form-group md-2">
                        <label htmlFor="email">E-mailadres</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group md-2">
                        <label htmlFor="oldPassword">Oud Wachtwoord</label>
                        <input
                            type="password"
                            id="oldPassword"
                            className="form-control"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group md-2">
                        <label htmlFor="newPassword">Nieuw Wachtwoord</label>
                        <input
                            type="password"
                            id="newPassword"
                            className="form-control"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        {errors.newPassword && (
                            <small className="text-danger">{errors.newPassword}</small>
                        )}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="confirmPassword">Bevestig Wachtwoord</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errors.confirmPassword && (
                            <small className="text-danger">{errors.confirmPassword}</small>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Bijwerken
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AccountBewerken;
