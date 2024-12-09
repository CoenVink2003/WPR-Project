import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/themes/base/all.css';
import {validateEmail} from "../utils";
import {wrapperGET} from "../wrapper";
import { useEffect } from 'react';
import Header from "../parts/header";



function Homepage() {

    const [vehicleType, setVehicleType] = useState({
        value: "",
    });

    const [startDate, setStartDate] = useState({
        value: "",
    });

    const [endDate, setEndDate] = useState({
        value: "",
    });


    const getImagePath = (vehicle) => {
        const imageName = "no-image.jpg"; //vehicle.vehicleType + '.gif';
        return `/vehicles/${imageName}`;
    };

    const handleImageError = (e) => {
        e.target.src = '/vehicles/no-image.jpg';
    };

    const VehicleOverview = () => {
        const [vehicles, setVehicles] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            const fetchVehicles = async () => {
                try {
                    const data = await wrapperGET("Vehicle", "", {
                        startDate: startDate.value,
                        endDate: endDate.value,
                        vehicleType: vehicleType.value ?? 'Car',
                    });
                    setVehicles(data);
                } catch (err) {
                    console.error("Error fetching vehicles:", err);
                    setError("Failed to load vehicles.");
                } finally {
                    setIsLoading(false);
                }
            };

            fetchVehicles();
        }, [startDate.value, endDate.value, vehicleType.value]);

        if (isLoading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p>{error}</p>;
        }

        if (vehicles.length === 0) {
            return <p>No vehicles available.</p>;
        }

        const vehicleTypeMap = {
            Car: 'Auto',
            Caravan: 'Caravan',
            Camper: 'Camper',
        };

        return (
            <div className="row">
                {vehicles.map((vehicle, index) => (
                    <div className="col-3 mb-3" key={vehicle.id}>
                        <div className="card">
                            <h5 className="card-header">{vehicle.brand} {vehicle.type}</h5>
                            <div className="card-body p-0">
                                {/* Dynamisch de afbeelding toevoegen met fallback op error */}
                                <img
                                    src={getImagePath(vehicle)}
                                    className="w-100"
                                    onError={handleImageError}
                                />

                                <div className="px-2">
                                    <table className="table table-bordered table-striped mt-2 p-2">
                                        <tbody>
                                        <tr>
                                            <td className="fw-bold">Type</td>
                                            <td>{vehicleTypeMap[vehicle.vehicleType] || 'Onbekend'}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Merk</td>
                                            <td>{vehicle.brand} {vehicle.type}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Kenteken</td>
                                            <td>{vehicle.licencePlate}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Kleur</td>
                                            <td>{vehicle.color}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Vanaf</td>
                                            <td>{new Intl.NumberFormat('nl-NL', {
                                                style: 'currency',
                                                currency: 'EUR'
                                            }).format(vehicle.price)}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <a
                                    className="btn btn-primary w-100"
                                    href={`/RentRequest/new?id=${vehicle.id}`}
                                >
                                    Huur deze auto
                                </a>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };


    return (
        <>
            <Header />
            <header className="bg-primary text-white text-center py-5">
                <h1 className="display-4">Welkom bij CarAndAll</h1>
                <p className="lead">Jouw perfecte voertuig, altijd binnen handbereik!</p>
            </header>


            <section className="container my-5">
                <h2 className="text-center mb-4">Zoek jouw auto</h2>
                <form className="row g-3">
                    <div className="col-md-4">
                        <label htmlFor="vehicleType" className="form-label">
                            <b>Autotype</b>
                        </label>
                        <select className="form-select"
                                id="vehicleType"
                                value={vehicleType.value}
                                onChange={(e) => setVehicleType({ value: e.target.value })}>
                            <option value="default">-- Maak uw keuze --</option>
                            <option value="Car">Auto</option>
                            <option value="Caravan">Caravan</option>
                            <option value="Camper">Camper</option>
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="startDate" className="form-label">
                            <b>Ophaaldatum</b>
                        </label>
                        <input type="text" className="form-control datepicker"
                               id="startDate"
                               value={startDate.value}
                               onChange={(e) => setStartDate({ value: e.target.value })}/>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="endDate" className="form-label">
                            <b>Inleverdatum</b>
                        </label>
                        <input className="form-control datepicker"
                               id="endDate"
                               value={endDate.value}
                               onChange={(e) => setEndDate({ value: e.target.value })}/>
                    </div>
                </form>
            </section>


            <section className="container my-5">
                <h2 className="text-center mb-4">Deze voertuigen passen binnen jouw zoekresultaten:</h2>
                <VehicleOverview />
            </section>

            {/* Over Ons */}
            <section className="bg-light py-5" id="about">
                <div className="container text-center">
                    <h2>Over CarAndALL</h2>
                    <p>
                        Wij zijn gespecialiseerd in het vinden van de perfecte auto voor
                        jou, of je nu particulier of zakelijk zoekt. Met een breed scala
                        aan opties maken we het eenvoudig om een auto te vinden die past
                        bij jouw behoeften en budget.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-dark text-white py-3 text-center">
                <p className="mb-0">
                    ©️ 2024 CarAndALL. Alle rechten voorbehouden.
                </p>
            </footer>
        </>
    );
}

export default Homepage;