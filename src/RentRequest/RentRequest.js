import React, {useEffect, useState} from "react";
import './Rent.css';
import {wrapperGET, wrapperPOST} from "../wrapper";
import {useNavigate} from "react-router-dom";
import checkLogin from "../helpers/checkLogin";
import Header from "../parts/header";

function NewRentRequest() { // kijken of auto beschikbaar is op die dagen, prijs berekenen, invoerveld voor opmerkingen
    checkLogin(true);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [comment, setComment] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const [vehicle, setVehicle] = useState("");

    const navigate = useNavigate();

    function clearForm() {
        setStartDate("");
        setEndDate("");
        setComment("");
        setTotalPrice("");
        setVehicle("");
    }

    useEffect(() => {
        carName();
    }, []);

    const getImagePath = (vehicle) => {
        const imageName = "no-image.jpg"; // vehicle.vehicleType + '.gif';
        return `/vehicles/${imageName}`;
    };

    const handleImageError = (e) => {
        e.target.src = '/vehicles/no-image.jpg';
    };

    const getIsFormValid = () => {
        return isValidDate(startDate) && isValidDate(endDate);
    };

    const test = () => {
        console.log(startDate);
        console.log(endDate);
    };

    const isValidDate = (date) => {
        // Controleer of het veld leeg is
        if (!date || date.trim() === '') {
            return false;
        }

        // Regex voor een basis datumformaat (YYYY-MM-DD)
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(date);
    };

    const searchParams = new URLSearchParams(window.location.search);

    const carName = async () => {
        let vehicle = await wrapperGET("Vehicle", searchParams.get("id"), {});
        setVehicle(vehicle);
        console.log(vehicle.brand + " " + vehicle.type);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await wrapperPOST("RentRequest", "", {
                autoId: searchParams.get("id"),
                customerId: sessionStorage.getItem("customer_id"),
                startDate: startDate,
                endDate: endDate,
                comment: comment,
                accepted: false,
            });

            // Formulier leegmaken na succesvolle registratie
            clearForm();

            // Navigeer naar de bevestigingspagina
            // navigate("");
        } catch (error) {
            // Fout afhandelen
            console.error("Error during signup:", error);
        }
    };

    return (
        <div className="App">
            <Header />
            <div className="background">
                <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{ paddingTop: "50px" }}>
                    <div className="card shadow p-5" style={{maxWidth: "400px", width: "100%"}}>
                        <form onSubmit={handleSubmit}>
                            <h2 className="mb-2 text-center">Huurverzoek</h2>
                            <div className="card-body p-0">
                                <img
                                    src={getImagePath(vehicle)}
                                    className="w-100"
                                    onError={handleImageError}
                                    alt="Vehicle"
                                />
                            </div>
                            <p className="text-center">{vehicle.brand + " " + vehicle.type}</p>
                            <label className="form-label mt-3 mb-0"><b>Start date</b><span className="required">*</span></label>
                            <input
                                type="text"
                                id="startDate"
                                name="startDate"
                                className="form-control datepicker"
                                value={startDate}
                                onChange={(e) => {
                                    console.log("Start date value: ", e.target.value);
                                    setStartDate(e.target.value);
                                }}
                            />
                            <label className="form-label mt-3 mb-0"><b>End date</b> <span className="required">*</span></label>
                            <input
                                type="text"
                                id="endDate"
                                name="endDate"
                                className="form-control datepicker"
                                value={endDate}
                                onChange={(e) => {
                                    console.log("End date value:", e.target.value);
                                    setEndDate(e.target.value || "");
                                }}

                            />
                            <label className="form-label mt-3 mb-0"><b>Comment:</b></label>
                            <input
                                type="text"
                                className="form-control"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <br/>
                            <p><b>Totaalprijs:</b> &euro;420,69</p>
                            <button
                                type="button"
                                className={`btn ${getIsFormValid() ? 'btn-primary' : 'btn-danger'} btn-block w-100`}
                                onClick={test}
                            >
                                Test
                            </button>
                            <button
                                type="submit"
                                className={`btn ${getIsFormValid() ? 'btn-primary' : 'btn-danger'} btn-block w-100`}
                                disabled={!getIsFormValid()}
                            >
                                Huren
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewRentRequest;
