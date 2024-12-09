import './Register.css';
import { useState } from "react";
import { validateEmail } from "../../utils";
import { wrapperPOST } from "../../wrapper";
import bcrypt from 'bcryptjs';
import { useNavigate } from "react-router-dom";
import validator from "validator";
import Email from "../../Email/Email";

function CustomerRegister() {
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

    const ErrorBox = ({ password, email }) => {
        const passwordValidation = validatePassword(password.value);
        const hasPasswordError = password.isTouched && !passwordValidation.isValid;
        const hasEmailError = email.isTouched && !validateEmail(email.value);

        if (!hasPasswordError && !hasEmailError) {
            return ""; // Don't render anything if there are no errors
        }

        return (
            <div className="alert alert-danger" style={{ paddingBottom: 0 }}>
                <ul>
                    {hasPasswordError && (
                        <>
                            {!passwordValidation.minLength && (
                                <li className="m-0">Wachtwoord dient minimaal 8 tekens te bevatten</li>
                            )}
                            {!passwordValidation.minLowercase && (
                                <li className="m-0">Wachtwoord dient minimaal 1 kleine letter te bevatten</li>
                            )}
                            {!passwordValidation.minUppercase && (
                                <li className="m-0">Wachtwoord dient minimaal 1 hoofdletter te bevatten</li>
                            )}
                            {!passwordValidation.minNumbers && (
                                <li className="m-0">Wachtwoord dient minimaal 1 cijfer te bevatten</li>
                            )}
                            {!passwordValidation.minSymbols && (
                                <li className="m-0">Wachtwoord dient minimaal 1 speciaal teken te bevatten</li>
                            )}
                        </>
                    )}
                    {hasEmailError && (
                        <li className="m-0">Geen geldig email adres.</li>
                    )}
                </ul>
            </div>
        );
    };


    const validatePassword = (password) => {
        const validation = {
            minLength: password.length >= 8,
            minLowercase: /[a-z]/.test(password),
            minUppercase: /[A-Z]/.test(password),
            minNumbers: /[0-9]/.test(password),
            minSymbols: /[^a-zA-Z0-9]/.test(password),
        };

        return {
            ...validation,
            isValid: Object.values(validation).every(Boolean),
        };
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Hash het wachtwoord
        let hashedPassword = bcrypt.hashSync(password.value, 10);

        try {
            // Wacht tot de wrapperPOST klaar is
            await wrapperPOST("Customer", "", {
                firstName,
                lastName,
                email: email.value,
                password: hashedPassword,
            });

            Email(email.value, "Account aangemaakt", "Hoi " + firstName + " " + lastName + "\n\n" +
                "Leuk dat je meedoet met ons leuke project! " +
                "Coen wilde eigenlijk geen mail versturen. Maar dat doen we toch!");

            // Formulier leegmaken na succesvolle registratie
            clearForm();

            // Navigeer naar de login pagina
            navigate("/Customer/login");
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
        const passwordValidation = validatePassword(password.value);
        return (
            firstName &&
            validateEmail(email.value) &&
            passwordValidation.isValid
        );
    }

    return (
        <div className="App">
            <div className="background">
                <div className="registerContainer p-4 dp-fadein-prep">
                    <form onSubmit={handleSubmit}>


                        <h2 className="mb-2 text-center">Sign Up</h2>
                        <div className="border-3 border-bottom border-dark w-25 m-auto mt-0 mb-3"></div>
                        <ErrorBox password={password} email={email} />
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
                            <a href="/Customer/login" className="float-end mt-3 text-dark">Heb je al een account? Log in!</a>
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

export default CustomerRegister;
