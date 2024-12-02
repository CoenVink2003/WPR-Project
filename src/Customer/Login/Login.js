import './Login.css';
import { useState } from "react";
import { validateEmail } from "../../utils";
import bcrypt from "bcryptjs";
import {wrapperGET, wrapperPOST} from "../../wrapper";
import { useNavigate } from "react-router-dom";


function EmployeeLogin() {
    const [email, setEmail] = useState({
        value: "",
        isTouched: false,
    });
    const [password, setPassword] = useState({
        value: "",
        isTouched: false,
    });

    const [passwordCorrect, setPasswordCorrect] = useState({
        value: 1,
    });

    const navigate = useNavigate();

    const ErrorBox = () => {
        const hasEmailError = email.isTouched && !validateEmail(email.value);
        const hasPasswordError = !passwordCorrect.value;

        if (!hasPasswordError && !hasEmailError) {
            return(""); // Don't render anything if there are no errors
        }

        return (
            <div className="alert alert-danger" style={{ paddingBottom: 0 }}>
                <ul>
                    {hasPasswordError &&(
                        <li className="m-0">Deze combinatie is niet juist!</li>
                    )}
                    {hasEmailError &&(
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        let passwordCorrect = 1;

        try {
            // Wacht tot de wrapperPOST klaar is
            let info = await wrapperGET("SignUp", "", {
                email: email.value,
            });

            if(info.length == 1)
            {
                const doesPasswordMatch = bcrypt.compareSync(password.value, info[0].password);
                if(doesPasswordMatch) {
                    clearForm();

                    sessionStorage.setItem("employee_id", info[0].id);
                    sessionStorage.setItem("first_name", info[0].first_name);
                    sessionStorage.setItem("last_name", info[0].last_name);

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
            console.error("Error during signup:", error);
        }
    };



    return (
        <div className="App">
            <div className="background">
                <div className="loginContainer p-4 dp-fadein-prep">
                    <form onSubmit={handleSubmit}>
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
                        <a href="/Customer/register" className="float-end mt-3 text-dark">Heb je nog geen account? Registreer hier!</a>
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
