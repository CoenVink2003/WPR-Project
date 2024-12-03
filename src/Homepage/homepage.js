import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/themes/base/all.css';
import {validateEmail} from "../utils";
import {wrapperGET} from "../wrapper";
import { useEffect } from 'react';



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
                                <img src="no-image.jpg" className="w-100"/>

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
                                        </tbody>
                                    </table>
                                </div>
                                <button className="btn btn-primary w-100">
                                    Huur deze auto
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                <a className="navbar-brand d-flex align-items-center" href="/">
                    <img
                        src="https://icons.getbootstrap.com/assets/icons/badge-4k.svg"
                        width="30"
                        height="30"
                        alt="logo"
                        className="me-2"
                    />
                    CarAndALL
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link active" href="/">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="">
                                Particulier
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="">
                                Zakelijk
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="">
                                Over Ons
                            </a>
                        </li>
                        <li className="nav-item">
                            {/* Dropdown voor Log out */}
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    variant="light"
                                    id="logoutDropdown"
                                    className="d-flex align-items-center border-0 bg-transparent"
                                >
                                    <img
                                        src="https://icons.getbootstrap.com/assets/icons/person-circle.svg"
                                        width="30"
                                        height="30"
                                        alt="Account"
                                    />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="/Customer/edit">Account bewerken</Dropdown.Item>
                                    <Dropdown.Item href="/Customer/login">Uitloggen</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                </div>
            </nav>

            <header className="bg-primary text-white text-center py-5">
                <h1 className="display-4">Welkom bij CarAndALL</h1>
                <p className="lead">Jouw perfecte voertuig, altijd binnen bereik!</p>
                <div className="mt-4">
                    <a href="" className="btn btn-light btn-lg me-2">
                        Particulier
                    </a>
                    <a href="" className="btn btn-secondary btn-lg">
                        Zakelijk
                    </a>
                </div>
            </header>

            <section className="bg-light py-5">
                <div className="container text-center">
                    <h2>Bekijk alle auto's</h2>
                    <p>Registreer je zelf en bekijk alle voertuigen!</p>
                    <a href="/Customer/register" className="btn btn-primary">
                        Registreer je zelf maar!
                    </a>
                </div>
            </section>

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