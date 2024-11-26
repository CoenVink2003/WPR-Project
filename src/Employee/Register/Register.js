import './Register.css';
import { useState } from "react";
import { validateEmail } from "../../utils";
import { wrapperPOST } from "../../wrapper";
import bcrypt from 'bcryptjs';
import { useNavigate } from "react-router-dom";

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

    // Plaats useNavigate hier bovenaan het component
    const navigate = useNavigate();

    const ErrorBox = () => {
        const hasPasswordError = password.isTouched && password.value.length < 8;
        const hasEmailError = email.isTouched && !validateEmail(email.value);

        if (!hasPasswordError && !hasEmailError) {
            return(""); // Don't render anything if there are no errors
        }

        return (
            <div className="alert alert-danger" style={{ paddingBottom: 0 }}>
                <ul>
                    {hasPasswordError && (
                        <li className="m-0">Wachtwoord dient minimaal 8 tekens te bevatten</li>
                    )}
                    {hasEmailError && (
                        <li className="m-0">Geen geldig email adres.</li>
                    )}
                </ul>
            </div>
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Hash het wachtwoord
        let hashedPassword = bcrypt.hashSync(password.value, 10);

        try {
            // Wacht tot de wrapperPOST klaar is
            await wrapperPOST("SignUp", "", {
                firstName,
                lastName,
                email: email.value,
                password: hashedPassword,
            });

            // Formulier leegmaken na succesvolle registratie
            clearForm();

            // Navigeer naar de login pagina
            navigate("/Employee/login");
        } catch (error) {
            // Fout afhandelen
            console.error("Error during signup:", error);
        }
    };

    function clearForm() {
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
                        <ErrorBox />
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
                            <a href="/Employee/login" className="float-end mt-3 text-dark">Heb je al een account? Log in!</a>
                            <button
                                type="submit"
                                className={`btn ${getIsFormValid() ? 'btn-primary' : 'btn-danger'} btn-block w-100`}
                                disabled={!getIsFormValid()}
                            >
                                Aanmelden
                            </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EmployeeRegister;
