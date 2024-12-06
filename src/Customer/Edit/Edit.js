import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { wrapperGET, wrapperPUT, wrapperPOST } from "../../wrapper";
import checkLogin from "../../helpers/checkLogin";
import Header from "../../parts/header";

function CustomerEdit() {
    checkLogin();
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

    const loadUserData = async () => {
        try {
            // Wacht tot de wrapperPOST klaar is
            let userData = await wrapperGET("Customer", sessionStorage.getItem("customer_id"), {});
            if (userData.id) {
                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setEmail(userData.email);

            }
        } catch (error) {
            console.error("Error during signup:", error);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        try {
            await wrapperPUT("Customer", sessionStorage.getItem("customer_id"), "", {
                "email": email,
                "firstName": firstName,
                "lastName": lastName,
            });


        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    return (
            <div>
            <Header />

            {/* Account Bewerken Form */}
            <div className="container md-3">
                <h2 className="text-center mb-4 mt-3">Account Bewerken</h2>
                <form onSubmit={handleSubmit} className="card p-4 shadow col-md-6 mx-auto">
                    {/* Foutmelding */}
                    {!passwordCorrect && (
                        <div className="alert alert-danger">
                            Het oude wachtwoord is niet correct!
                        </div>
                    )}

                    <div className="form-group md-2">
                        <label htmlFor="firstName"><b>Voornaam</b></label>
                        <input
                            type="text"
                            id="firstName"
                            className="form-control"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group md-2 mt-2">
                        <label htmlFor="lastName"><b>Achternaam</b></label>
                        <input
                            type="text"
                            id="lastName"
                            className="form-control"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className="form-group md-2 mt-2">
                        <label htmlFor="email"><b>E-mailadres</b></label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mt-2">
                        Bijwerken
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CustomerEdit;
