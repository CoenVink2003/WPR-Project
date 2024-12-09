import './Login.css';
import React, { useState } from "react";
import {wrapperGET, wrapperPOST} from "../../wrapper";
import { validateEmail} from "../../utils";
import bcrypt from "bcryptjs";
import { useNavigate} from "react-router-dom";

function LoginCompany() {
    const [email, setEmail] = useState({
        value: "",
        isTouched: false,
    })
    const [password, setPassword] = useState({
        value: "",
        isTouched: false,
    });
    const [passwordCorrect, setPasswordCorrect] = useState({
        value: 1,
    });


    const navigate = useNavigate();




    const ErrorBox = () => {
        const hasPasswordError = !password.value.value;
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

    const getIsFormValid = () => {
        return (
            validateEmail(email.value) &&
            password.value.length >= 8
        );
    };

    const clearForm = () => {
        setEmail({
            value: "",
            isTouched: false,
        });
        setPassword({
            value: "",
            isTouched: false,
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let passwordCorrect = 1;

        try {
            // Wacht tot de wrapperPOST klaar is
            let info = await wrapperGET("Company", "", {
                email: email.value,
            });

            if(info.length == 1)
            {
                const doesPasswordMatch = bcrypt.compareSync(password.value, info[0].password);
                if(doesPasswordMatch) {
                    clearForm();

                    sessionStorage.setItem("company_id", info[0].Id);
                    sessionStorage.setItem("company_name", info[0].CompanyName);
                    sessionStorage.setItem("company_kvknumber", info[0].KvkNumber);
                    sessionStorage.setItem("company_streetname", info[0].StreetName);
                    sessionStorage.setItem("company_housenumber", info[0].HouseNumber);
                    sessionStorage.setItem("company_zipcode", info[0].ZipCode);
                    sessionStorage.setItem("company_contactpersoon", info[0].FirstName);
                    sessionStorage.setItem("company_lastname", info[0].LastName);
                    sessionStorage.setItem("company_email", info[0].Email);
                    sessionStorage.setItem("company_password", info[0].Password);


                    // Navigeer naar de login pagina
                    navigate("/");
                }
                else
                {
                    setPasswordCorrect(0);
                }
            }
            else
            {
                setPasswordCorrect(0);
            }



        } catch (error) {
            // Fout afhandelen
            console.error("Error during Login:", error);
        }
    };

    return (
        <div className="App">
            <div className="background">
                <div className="loginContainer p-4 dp-fadein-prep">
                    <form onSubmit= { handleSubmit }>
                        <h2 className="mb-2 text-center">Bedrijf Login</h2>
                        <div className="border-3 border-bottom border-dark w-25 m-auto mt-0 mb-3"></div>
                        <ErrorBox />
                        <label className="form-label mt-3 mb-0"><b>E-mailadres</b> <span className="required">*</span></label>
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
                            placeholder="Email address"
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
                            placeholder="Password"
                        />
                        <a href="/Company/register" className="float-end mt-3 text-dark">Heb je nog geen account? Registreer hier!</a>
                        <button
                            type="submit"
                            className={`btn ${getIsFormValid() ? 'btn-primary' : 'btn-danger'} btn-block w-100`}
                            disabled={!getIsFormValid()}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginCompany;
