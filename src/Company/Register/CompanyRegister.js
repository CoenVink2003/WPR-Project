import './Register.css';
import React, { useState } from "react";
import { wrapperPOST } from "../../wrapper";
import { validateEmail} from "../../utils";

function CompanySignUp() {
    const [companyName, setCompanyName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [houseNumber, setHouseNumber] = useState("");

    const [kvkNumber, setKvkNumber] = useState({
        value: "",
        isTouched: false,
    });
    const [email, setEmail] = useState({
        value: "",
        isTouched: false,
    })
    const [password, setPassword] = useState({
        value: "",
        isTouched: false,
    });



    const KvkNumberErrorMessage = () => {
        return (
            <p className="FieldError">KVK nummer dient uit 8 cijfers te bestaan.</p>
        );
    };

    const EmailErrorMessage = () => {
        return (
            <p className="EmailError">Dit E-mailadres is niet geldig</p>
        );
    };

    const PasswordErrorMessage = () => {
        return (
            <p className="FieldError">Uw wachtwoord dient minimaal 8 tekens te bevatten</p>
        );
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        wrapperPOST("Company", "SignUp", {
            companyName,
            address,
            city,
            zipCode,
            houseNumber,
            kvkNumber: kvkNumber.value,
            email: email.value,
            password: password.value
        });

        clearForm();
        window.location.href = "/Employee/login"
    };


    const getIsFormValid = () => {
        return (
            companyName &&
            address &&
            city &&
            zipCode &&
            houseNumber &&
            kvkNumber.value.length === 8 &&
            !isNaN(kvkNumber.value) &&
            validateEmail(email.value) &&
            password.value.length >= 8
        );
    };

    const clearForm = () => {
        setCompanyName("");
        setAddress("");
        setCity("");
        setZipCode("");
        setHouseNumber("");
        setKvkNumber({
            value: "",
            isTouched: false,
        });
        setEmail({
            value: "",
            isTouched: false,
        });
        setPassword({
            value: "",
            isTouched: false,
        })
    };

    /*
    * <div class="row">

    <div class="col-md-6">
        <label>Full Name</label>
        <div class="form-group">
            <asp:TextBox CssClass="form-control" ID="TextBox3" runat="server"
                placeholder="Full Name"></asp:TextBox>
        </div>
    </div>

    <div class="col-md-6">
        <label>Date of Birth</label>
        <div class="form-group">
            <asp:TextBox CssClass="form-control" ID="TextBox4" runat="server"
                placeholder="Date of Birth" TextMode="Date"></asp:TextBox>
        </div>
    </div>

</div>
    * */

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <form onSubmit={handleSubmit} className="w-50">
                <fieldset className="border p-4 rounded shadow-sm">
                    <h2 className="mb-4 text-center">Company Subscription</h2>
                    <div className="form-group mb-3">
                        <label className="form-label">
                            Bedrijfsnaam <sup>*</sup>
                        </label>
                        <input
                            className="form-control"
                            value={companyName}
                            onChange={(e) => {
                                setCompanyName(e.target.value);
                            }}
                            placeholder="ComapanyName"
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Address</label>
                        <input
                            className="form-control"
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value);
                            }}
                            placeholder="Adres"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">City</label>
                        <input
                            className="form-control"
                            value={city}
                            onChange={(e) => {
                                setCity(e.target.value);
                            }}
                            placeholder="City"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">ZipCode</label>
                        <input
                            className="form-control"
                            value={zipCode}
                            onChange={(e) => {
                                setZipCode(e.target.value);
                            }}
                            placeholder="ZipCode"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">HouseNumber</label>
                        <input
                            className="form-control"
                            value={houseNumber}
                            onChange={(e) => {
                                setHouseNumber(e.target.value);
                            }}
                            placeholder="HouseNumber"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">
                            KVK-nummer <sup>*</sup>
                        </label>
                        <input
                            className="form-control"
                            value={kvkNumber.value}
                            onChange={(e) => {
                                setKvkNumber({...kvkNumber, value: e.target.value});
                            }}
                            onBlur={() =>
                                setKvkNumber({...kvkNumber, isTouched: true})
                            }
                            placeholder="KVK-nummer"
                            required
                        />
                        {kvkNumber.isTouched && (kvkNumber.value.length < 8 || isNaN(kvkNumber.value)) && (
                            <div className="text-danger mt-1">
                                <KvkNumberErrorMessage />

                            </div>
                        )}
                    </div>
                    <div className={"form-group mb-3"}>
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
                    </div>
                    <div className= "form-group mb-3">
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
                        {password.isTouched && password.value.length < 8 && (
                            <div className="text-danger mt-1">
                                <PasswordErrorMessage />
                            </div>
                        )}
                    </div>
                    <div className="form-group d-grid">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!getIsFormValid()}
                        >
                            Abonnement Aanmelden
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default CompanySignUp;
