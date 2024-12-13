
import React, { useState} from "react";
import {wrapperDELETE, wrapperGET} from "../../wrapper";
import { useEffect } from 'react'
import Header from "../../parts/header";



function CompanyRenterManagement () {
    const [renter, setRenter] = useState( [] );
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);



    const RenterOverview = () => {

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const companyId = sessionStorage.getItem("company_id");
                    console.log('Company Id from sessionStorage',companyId);
                    if (!companyId) {
                        throw new Error("Company ID not found in sessionStorage.");
                    }


                    const data = await wrapperGET("CompanyCustomer", "", {
                        companyId: companyId,
                    });
                    setRenter(data);


                } catch (err) {
                    console.error("Error fetching Company Renters:", err);
                    setError("Failed to load Company Renters.");
                } finally {
                    setIsLoading(false);
                }
            };
            fetchData();
        }, []);


        if (isLoading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p>{error}</p>;
        }
        if (renter.length === 0) {
            return <p>No Company Renters.</p>;
        }



        const handleDelete = async (controller, id) => {
            await wrapperDELETE(controller, id)
                .then((result) => {
                    if(result) {
                        alert("Huurder succesvol verwijderd!");
                    } else {
                        alert("Verwijder mislukt!");
                    }
                })
                .catch((error) => {
                    console.log("Fout bij verwijderen", error);
                })
        }

        return (
            <>
                <div className="row">
                    {renter.map((CompanyCustomer, index) => (
                        <div className="col-3 mb-3" key={CompanyCustomer.id}>
                            <div className="card">
                                <h5 className="card-header">{CompanyCustomer.FirstName} {CompanyCustomer.LastName}</h5>
                                <div className="card-body p-0">
                                    {/* Dynamisch de afbeelding toevoegen met fallback op error */}


                                    <div className="px-2">
                                        <table className="table table-bordered table-striped mt-2 p-2">
                                            <tbody>
                                            <tr>
                                                <td className="fw-bold">Id</td>
                                                <td>{CompanyCustomer.id}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-bold">Email</td>
                                                <td>{CompanyCustomer.email}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <button
                                        id="renterDelete"
                                        className="btn btn-danger w-100"
                                        onClick={() => handleDelete("CompanyCustomer", CompanyCustomer.id)}
                                        >
                                        Verwijder
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    }

    return (
        <div className="container-fluid">
            <Header/>
            <div className="row">
                <div className="col">

                    <div className="card">
                        <div className="card-body">

                            <div className="row">
                                <div className="col">
                                    <center>
                                        <h2>Zakelijke Huurder Beheer</h2>
                                    </center>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col text-lg-end">
                                    <a href="/Company/addRenter" className="btn btn-success">Toevoegen</a>

                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <center>
                                        <hr/>
                                    </center>
                                </div>
                            </div>

                            <RenterOverview/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CompanyRenterManagement;