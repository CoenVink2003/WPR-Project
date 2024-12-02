import React from "react";

function Homepage() {
    return (
        <>
            {/* Navigatiebalk */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                <a className="navbar-brand d-flex align-items-center" href="#">
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
                            <a className="nav-link active" href="#">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#particulier">
                                Particulier
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#zakelijk">
                                Zakelijk
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#about">
                                Over Ons
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="bg-primary text-white text-center py-5">
                <h1 className="display-4">Welkom bij CarAndALL</h1>
                <p className="lead">Jouw perfecte voertuig, altijd binnen bereik!</p>
                <div className="mt-4">
                    <a href="#particulier" className="btn btn-light btn-lg me-2">
                        Particulier
                    </a>
                    <a href="#zakelijk" className="btn btn-secondary btn-lg">
                        Zakelijk
                    </a>
                </div>
            </header>

            {/* Zoekfilters */}
            <section className="container my-5">
                <h2 className="text-center mb-4">Zoek jouw auto</h2>
                <form className="row g-3">
                    <div className="col-md-4">
                        <label htmlFor="brand" className="form-label">
                            Automerk
                        </label>
                        <select className="form-select" id="brand">
                            <option>BMW</option>
                            <option>Audi</option>
                            <option>Mercedes</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="type" className="form-label">
                            Model
                        </label>
                        <select className="form-select" id="type">
                            <option>GTS</option>
                            <option>R8</option>
                            <option>GTR BLACK SERIES</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="price" className="form-label">
                            Prijsklasse
                        </label>
                        <select className="form-select" id="price">
                            <option>€10.000 - €20.000</option>
                            <option>€20.000 - €30.000</option>
                            <option>€30.000 - €40.000</option>
                            <option>€40.000+</option>
                        </select>
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-primary mt-3">
                            Zoek
                        </button>
                    </div>
                </form>
            </section>

            {/* Zelf auto aanbieden */}
            <section className="bg-light py-5">
                <div className="container text-center">
                    <h2>Bekijk alle autos ?</h2>
                    <p>
                        Registreer je zelf en bekijk alle voertuig !
                    </p>
                    <a href="#register" className="btn btn-primary">
                        Registreer je zelf maar!
                    </a>
                </div>
            </section>

            {/* Recente gehuurde voertuigen */}
            <section className="container my-5">
                <h2 className="text-center mb-4">Recente gehuurde voertuigen</h2>
                <div className="row text-center">
                    <div className="col-md-4">
                        <img
                            src="https://icons.getbootstrap.com/assets/icons/badge-4k.svg"
                            alt="Voertuig 1"
                            width="100"
                            height="100"
                        />
                        <p>BMW M4 GTS</p>
                    </div>
                    <div className="col-md-4">
                        <img
                            src="https://icons.getbootstrap.com/assets/icons/badge-4k.svg"
                            alt="Voertuig 2"
                            width="100"
                            height="100"
                        />
                        <p>AUDI R8</p>
                    </div>
                    <div className="col-md-4">
                        <img
                            src="https://icons.getbootstrap.com/assets/icons/badge-4k.svg"
                            alt="Voertuig 3"
                            width="100"
                            height="100"
                        />
                        <p>Mercedes-AMG GTR</p>
                    </div>
                </div>
            </section>

            {/* Over Ons */}
            <section className="bg-light py-5" id="about">
                <div className="container text-center">
                    <h2>Over CarAndALL</h2>
                    <p>
                        Wij zijn gespecialiseerd in het vinden van de perfecte auto voor
                        jou, of je nu particulier of zakelijk zoekt. Met een breed scala
                        aan opties maken we het eenvoudig om een auto te vinden die past
                        bij jouw behoeften en budget.--chatGPT
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-dark text-white py-3 text-center">
                <p className="mb-0">
                    © 2024 CarAndALL. Alle rechten voorbehouden.
                </p>
            </footer>
        </>
    );
}

export default Homepage;
