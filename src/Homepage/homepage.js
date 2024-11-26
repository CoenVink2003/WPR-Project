import React, {useState} from "react";

function Homepage() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                <a className="navbar-brand d-flex align-items-center" href="#">
                    <img
                        src="https://icons.getbootstrap.com/assets/icons/badge-4k.svg"
                        width="30"
                        height="30"
                        alt="icon"
                        className="me-2"
                    />
                    HOME PAGE
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
                            <a className="nav-link" href="/Employee/register">
                                Particulier
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Employee/register">
                                Zakelijk
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container text-center mt-5">
                <h1 className="display-4">Welkom bij de Home pagina</h1>
                <p className="lead">BMW M4 GTS FOR SALE...</p>
                <div className="mt-4">
                    <a href="/Employee/register" className="btn btn-primary me-2">
                        Particulier
                    </a>
                    <a href="/Employee/register" className="btn btn-secondary">
                        Zakelijk
                    </a>
                </div>
            </div>

            <footer className="bg-light py-3 mt-5 text-center">
                <p className="mb-0">© 2024 CarAndALL. rights reserverd.</p>
            </footer>
        </>
    );
}

export default Homepage;
