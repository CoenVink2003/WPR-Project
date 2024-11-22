import './App.css';
import { useState } from "react";
import { validateEmail } from "../src/utils";

function App() {
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
    const [role, setRole] = useState("role");

    const PasswordErrorMessage = () => {
        return (
            <p className="FieldError">Wachtwoord dient minimaal 8 tekens te bevatten</p>
        );
    }
    const EmailErrorMessage = () => {
        return (
            <p className="EmailError">Geen geldig email adres.</p>
        );
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://localhost:7211/api/SignUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email: email.value,
                    password: password.value,
                    role,
                }),
            });

            console.log(response);
            if (response.ok) {
                alert('Account aangemaakt');
                clearForm();
            } else {
                alert('Error creating account');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to connect to the server');
        }
    };

    const getIsFormValid = () => {
        return (
            firstName &&
            validateEmail(email.value) &&
            password.value.length >= 8 &&
            role !== "role"
        );
    }

    const clearForm = () => {
        setFirstName("");
        setLastName("");
        setEmail({
            value: "",
            isTouched: false,
        });
        setPassword({
            value: "",
            isTouched: false,
        });
        setRole("role");
    }

    return (
        <div className="App container mt-5">
            <form onSubmit={handleSubmit}>
                <fieldset className="border p-4 rounded shadow-sm">
                    <h2 className="mb-4 text-center">Sign Up</h2>
                    <div className="form-group">
                        <label className="form-label">
                            Voornaam <sup>*</sup>
                        </label>
                        <input
                            className="form-control"
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                            placeholder="Voornaam"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Achternaam</label>
                        <input
                            className="form-control"
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                            placeholder="Achternaam"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Email adres <sup>*</sup>
                        </label>
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
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Wachtwoord <sup>*</sup>
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
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Role <sup>*</sup>
                        </label>
                        <select
                            className="form-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="role">Role</option>
                            <option value="customer">Customer</option>
                            <option value="employee">Employee</option>
                            <option value="owner">Owner</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!getIsFormValid()}
                        >
                            Aanmelden
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default App;
