import React from "react";

const Header = () => {

    const AccountHead = () => {
        if (sessionStorage.getItem("customer_id")) {
            let firstName = sessionStorage.getItem("customer_first_name")
                return (
                    <div className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            id="navbarDropdownMenuLink"
                            href="#"
                            role="button"
                            aria-haspopup="true"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="bi bi-person"></i>{firstName}
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="/Customer/edit">
                                Edit account
                            </a>
                            <a className="dropdown-item" href="/Customer/login">
                                Log out
                            </a>
                        </div>
                    </div>
                );
            } else {
                return (
                    <li className="nav-item">
                        <a className="nav-link" href="/Customer/login">
                            Inloggen
                        </a>
                    </li>
                );
            }
        }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <a className="navbar-brand d-flex align-items-center" href="/">
                <img
                    src="https://icons.getbootstrap.com/assets/icons/badge-4k.svg"
                    width="30"
                            height="30"
                            alt="logo"
                            className="ms-4"
                        />
                        <span className="ms-2">CarAndAll</span>
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
                                <a className="nav-link" href="/Subscription">
                                    Abonnementen
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="">
                                    Over Ons
                                </a>
                            </li>
                            <AccountHead />
                        </ul>
                    </div>
                </nav>
                );
                };

                export default Header;
