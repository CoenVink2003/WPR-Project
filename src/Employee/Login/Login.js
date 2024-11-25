import './Login.css';
import { useState } from "react";
import { validateEmail } from "../../utils";

function EmployeeLogin() {
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

    const getIsFormValid = () => {
        return (
            validateEmail(email.value),
            password.value.length >= 8
        );
    }

    const clearForm = () => {
        setEmail({
            value: "",
            isTouched: false,
        });
        setPassword({
            value: "",
            isTouched: false,
        });
    }



    return (
        <div className="App container mt-5">
            <form onSubmit="">
                <fieldset className="border p-4 rounded shadow-sm">
                    <h2 className="mb-4 text-center">Login</h2>
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
                        <button
                            type="Login"
                            className="btn btn-primary"
                            disabled={!getIsFormValid()}
                        >
                            Login
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default EmployeeLogin;
