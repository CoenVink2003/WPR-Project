import './Register.css';
import React, { useState } from "react";
import { wrapperPOST } from "../../wrapper";

function CompanySubscription() {
    const [businessName, setBusinessName] = useState("");
    const [address, setAddress] = useState("");
    const [kvkNumber, setKvkNumber] = useState({
        value: "",
        isTouched: false,
    });


    const kvkNumberErrorMessage = () => {
        return (
            <p className="FieldError">KVK nummer dient uit 8 cijfers te bestaan.</p>
        );
    };

    //
    //
    // const handleSubmit = wrapperPOST("CreateCompanySubscription", "",
    //     {
    //         companyName,
    //         address,
    //         kvkNumber: kvkNumber.value
    //     }
    // );

    const getIsFormValid = () => {
        return (
            businessName &&
            address &&
            kvkNumber.value.length === 8 &&
            !isNaN(kvkNumber.value)
        );
    };

    const clearForm = () => {
        setBusinessName("");
        setAddress("");
        setKvkNumber({
            value: "",
            isTouched: false,
        });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <form onSubmit="" className="w-50">
                <fieldset className="border p-4 rounded shadow-sm">
                    <h2 className="mb-4 text-center">Company Subscription</h2>
                    <div className="form-group mb-3">
                        <label className="form-label">
                            Bedrijfsnaam <sup>*</sup>
                        </label>
                        <input
                            className="form-control"
                            value={businessName}
                            onChange={(e) => {
                                setBusinessName(e.target.value);
                            }}
                            placeholder="Bedrijfsnaam"
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Adres</label>
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
                                <kvkNumberErrorMessage />
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

export default CompanySubscription;
