import './Login.css';
import { useState } from "react";
import { validateEmail } from "../../utils";
import bcrypt from "bcryptjs";
import {wrapperPOST} from "../../wrapper";

function EmployeeLogin() {
    const [email, setEmail] = useState({
        value: "",
        isTouched: false,
    });
    const [password, setPassword] = useState({
        value: "",
        isTouched: false,
    });

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

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //
    //
    //     try {
    //         // Wacht tot de wrapperPOST klaar is
    //         let info = await wrapperGET("SignUp", "", {
    //             email: email.value,
    //             password: doesPasswordMatch,
    //         });
    //
    //         const doesPasswordMatch = bcrypt.compareSync(password.value, info.password);
    //         clearForm();
    //         if(doesPasswordMatch) {
    //             // INLOGGEN
    //         }
    //
    //     } catch (error) {
    //         // Fout afhandelen
    //         console.error("Error during signup:", error);
    //     }
    // };



    return (
        <div className="App">
            <div className="background">
                <div className="loginContainer p-4 dp-fadein-prep">
                    <form onSubmit="">
                        <h2 className="mb-2 text-center">Log in</h2>
                        <div className="border-3 border-bottom border-dark w-25 m-auto mt-0 mb-3"></div>
                        <ErrorBox />
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
                        <a href="/Employee/register" className="float-end mt-3 text-dark">Heb je nog geen account? Registreer hier!</a>
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

export default EmployeeLogin;
