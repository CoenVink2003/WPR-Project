import './Register.css';
import React, { useState } from "react";
import { validateEmail } from "../../utils";
import { wrapperPOST } from "../../wrapper";

function EmployeeRegister() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState({
        value: "",
        isTouched: false,
    });
    const [password, setPassword] = useState({
        value: "",
        isTouched: false,
    });

    const PasswordErrorMessage = () => {
        return (
            <p className="FieldError">Uw wachtwoord dient minimaal 8 tekens te bevatten</p>
        );
    };

    const EmailErrorMessage = () => {
        return (
            <p className="EmailError">Dit E-mailadres is niet geldig</p>
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        wrapperPOST("SignUp", "", {
            firstName,
            lastName,
            email: email.value,
            password: password.value
        });

        clearForm();
        window.location.href = "/Employee/login"
    };

    function clearForm()
    {
        setFirstName("");
        setLastName("");
        setEmail({ value: "", isTouched: false });
        setPassword({ value: "", isTouched: false });
    }

    const getIsFormValid = () => {
        return (
            firstName &&
            validateEmail(email.value) &&
            password.value.length >= 8
        );
    }

    return (
        <div className="App">
            <div className="background">
                <div className="registerContainer p-4 dp-fadein-prep">
                    <form onSubmit={handleSubmit}>
                         <h2 className="mb-2 text-center">Sign Up</h2>
                         <div className="border-3 border-bottom border-dark w-25 m-auto mt-0 mb-3"></div>
                            <label className="form-label m-0"><b>Voornaam <span className="required">*</span></b></label>
                            <input
                                className="form-control"
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                }}
                                placeholder="Voornaam"
                            />

                            <label className="form-label mt-3 mb-0"><b>Achternaam</b></label>
                            <input
                                className="form-control"
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                                placeholder="Achternaam"
                            />

                                <label className="form-label mt-3 mb-0"><b>Email-adres</b> <span className="required">*</span></label>
                                <input
                                    className="form-control"
                                    type="email"
                                    value={email.value}
                                    onChange={(e) => {
                                        setEmail({ ...email, value: e.target.value });
                                    }}
                                    onBlur={() => {
                                        setEmail({ ...email, isTouched: true });
                                    }}
                                    placeholder="Email adres"
                                    required
                                />
                                {email.isTouched && !validateEmail(email.value) && (
                                    <div className="text-danger mt-1">
                                        <EmailErrorMessage />
                                    </div>
                                )}
                            <label className="form-label mt-3 mb-0"><b>Wachtwoord</b> <span className="required">*</span>
                            </label>
                            <input
                                className="form-control"
                                value={password.value}
                                type="password"
                                onChange={(e) => {
                                    setPassword({ ...password, value: e.target.value });
                                }}
                                onBlur={() => {
                                    setPassword({ ...password, isTouched: true });
                                }}
                                placeholder="Wachtwoord"
                            />
                            {password.isTouched && password.value.length < 8 && (
                                <div className="text-danger mt-1">
                                    <PasswordErrorMessage />
                                </div>
                            )}
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block w-100 mt-3"
                                    disabled={!getIsFormValid()}
                                >
                                    Aanmelden
                                </button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EmployeeRegister;
