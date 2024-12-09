import './Register.css';
import { useState } from "react";
import { validateEmail } from "../../utils";
import { wrapperPOST } from "../../wrapper";
import bcrypt from 'bcryptjs';
import { useNavigate } from "react-router-dom";
import validator from "validator";

function CompanyRegister() {
    const [companyName, setCompanyName] = useState("");
    const [kvkNumber, setKVKNumber] = useState("");
    const [streetName, setStreetName] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [zipCode, setZipCode] = useState("");
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
        const zipcodeValidation = validateZipcode(zipCode);
        const houseNumberValidation = validateHouseNumber(houseNumber);
        const hasZipcodeError = zipCode.isTouched && !zipcodeValidation.isValid();
        const hasHouseNumberError = houseNumber.isTouched && !houseNumberValidation.isValid();
        const hasPasswordError = password.isTouched && !passwordValidation.isValid;
        const hasEmailError = email.isTouched && !validateEmail(email.value);

        if (!hasPasswordError && !hasEmailError && !hasZipcodeError && !hasHouseNumberError) {
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
                    {hasZipcodeError && (
                        <li className="m-0">Geen geldige postcode</li>
                    )}
                    {hasHouseNumberError && (
                        <li className="m-0">Geen geldig huisnummer</li>
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
            await wrapperPOST("Company", "", {
                CompanyName: companyName,
                KvkNumber: kvkNumber,
                StreetName: streetName,
                HouseNumber: houseNumber,
                ZipCode: zipCode,
                FirstName: firstName,
                LastName: lastName,
                email: email.value,
                password: hashedPassword,
            });

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
        setCompanyName("");
        setKVKNumber("");
        setStreetName("");
        setHouseNumber("");
        setZipCode("");
        setFirstName("");
        setLastName("");
        setEmail({ value: "", isTouched: false });
        setPassword({ value: "", isTouched: false });
    }

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

    const validateZipcode = (zipcode) => {
        const regex = /^[1-9][0-9]{3}[A-Za-z]{2}$/;
        return regex.test(zipcode);
    };

    const validateHouseNumber = (houseNumber) => {
        const regex = /^[0-9]+[a-zA-Z]?$/;
        return regex.test(houseNumber);
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
        <div className="App d-flex justify-content-center align-items-center vh-100">
            <div className="background w-100 d-flex justify-content-center align-items-center">
                <div className="registerContainer p-4 dp-fadein-prep shadow-lg rounded bg-white"
                     style={{maxWidth: "500px"}}>
                    <form onSubmit={handleSubmit}>
                        <h2 className="mb-2 text-center">Aanmelden Bedrijf</h2>
                        <div className="border-3 border-bottom border-dark w-25 m-auto mt-0 mb-3"></div>
                        <ErrorBox password={password} email={email}/>

                        <label className="form-label m-0"><b>Bedrijfsnaam <span
                            className="required">*</span></b></label>
                        <input
                            className="form-control"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Bedrijfsnaam"
                        />

                        <label className="form-label mt-3 mb-0"><b>KVK nummer <span
                            className="required">*</span></b></label>
                        <input
                            className="form-control"
                            value={kvkNumber}
                            onChange={(e) => setKVKNumber(e.target.value)}
                            placeholder="KVK nummer"
                        />

                        <div className="row">
                            <div className="col-md-7">
                                <label className="form-label mt-3 mb-0"><b>Straatnaam <span
                                    className="required">*</span></b></label>
                                <input
                                    className="form-control"
                                    value={streetName}
                                    onChange={(e) => setStreetName(e.target.value)}
                                    placeholder="Straatnaam"
                                />
                            </div>
                            <div className="col-md-5">
                                <label className="form-label mt-3 mb-0"><b>Huisnummer <span
                                    className="required">*</span></b></label>
                                <input
                                    className="form-control"
                                    value={houseNumber}
                                    onChange={(e) => setHouseNumber(e.target.value)}
                                    placeholder="Huisnummer"
                                />
                            </div>
                        </div>

                        <label className="form-label mt-3 mb-0"><b>Postcode <span
                            className="required">*</span></b></label>
                        <input
                            className="form-control"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            placeholder="Postcode"
                        />

                        <div className="row">
                            <div className="col-md-6">
                                <label className="form-label mt-3 mb-0"><b>Contactpersoon <span
                                    className="required">*</span></b></label>
                                <input
                                    className="form-control"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Voornaam"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label mt-3 mb-0"><b>Achternaam</b></label>
                                <input
                                    className="form-control"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Achternaam"
                                />
                            </div>
                        </div>

                        <label className="form-label mt-3 mb-0"><b>Email-adres</b> <span
                            className="required">*</span></label>
                        <input
                            className="form-control"
                            type="email"
                            value={email.value}
                            onChange={(e) => setEmail({...email, value: e.target.value})}
                            onBlur={() => setEmail({...email, isTouched: true})}
                            placeholder="Email adres"
                            required
                        />
                        <label className="form-label mt-3 mb-0"><b>Wachtwoord</b> <span
                            className="required">*</span></label>
                        <input
                            className="form-control"
                            type="password"
                            value={password.value}
                            onChange={(e) => setPassword({...password, value: e.target.value})}
                            onBlur={() => setPassword({...password, isTouched: true})}
                            placeholder="Wachtwoord"
                        />
                        <a href="/Customer/login" className="float-end mt-3 text-dark">Heb je al een account? Log
                            in!</a>
                        <button
                            type="submit"
                            className={`btn ${getIsFormValid() ? 'btn-primary' : 'btn-danger'} btn-block w-100 mt-3`}
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

export default CompanyRegister;
