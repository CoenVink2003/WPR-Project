import React, { useState } from "react";
import Header from "../../parts/header";
import { wrapperPOST } from "../../wrapper";

function SubscriptionCard({ title, features, price, modalId, modalContent, children }) {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="card text-center" style={{ maxWidth: "600px", margin: "20px" }}>
                <div className="card-body">
                    <h3 className="card-title">{title}</h3>
                    <p>
                        {features &&
                            features.map((feature, index) => (
                                <span key={index}>
                                    <i className="bi bi-check"></i>&nbsp;{feature}
                                    <br />
                                </span>
                            ))}
                    </p>
                    <p className="card-text">{price && price.description}</p>
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
}

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = function() {
            resolve(reader.result); // Geef de Base64 string terug wanneer het bestand is ingelezen
        };
        reader.onerror = function(error) {
            reject(error); // Als er een fout optreedt tijdens het lezen
        };
        reader.readAsDataURL(file); // Start het lezen van het bestand
    });
}


const Upload = ({ onFileUpload }) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Direct de blob doorgeven zonder enige conversie
            onFileUpload(file);
        }
    };

    return (
        <input type="file" onChange={handleFileChange} />
    );

    return (
        <div className="form-group">
            <label htmlFor="fileUpload">Upload afbeelding</label>
            <input
                type="file"
                className="form-control-file"
                id="fileUpload"
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    );
};


function AddVehicle() {
    const [vehicleType, setVehicleType] = useState("");
    const [licencePlate, setLicencePlate] = useState("");
    const [color, setColor] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [brand, setBrand] = useState("");
    const [bought, setBought] = useState("");
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setUploadedFile(reader.result.split(',')[1]);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        // Zorg ervoor dat alle benodigde velden zijn ingevuld
        if (!vehicleType || !licencePlate || !color || !price || !type || !bought) {
            alert("Vul alle velden in.");
            return;
        }

        let uploadData = new FormData();
        uploadData.append("brand", brand);
        uploadData.append("bought", bought);
        uploadData.append("vehicleType", vehicleType);
        uploadData.append("licencePlate", licencePlate);
        uploadData.append("color", color);
        uploadData.append("price", price);
        uploadData.append("type", type);
        uploadData.append("image", uploadedFile);


        let dataObject = {};
        uploadData.forEach((value, key) => {
            dataObject[key] = value;
        });


        console.log(dataObject)

        const response = await wrapperPOST("Vehicle", "", dataObject);



        // try {
        //     // Verstuur de FormData naar de server
        //
        //
        //     if (!response.ok) {
        //         throw new Error("Fout bij opslaan van voertuiggegevens.");
        //     }
        //
        //     const savedVehicle = await response.json();
        //     alert("Voertuig succesvol toegevoegd!");
        //
        // } catch (error) {
        //     console.error("Fout tijdens opslaan:", error);
        //     alert("Er is een fout opgetreden bij het toevoegen van het voertuig.");
        // }
    };

    return (
        <>
            <Header />
            <form onSubmit={handleSubmit}>
                <SubscriptionCard
                    title="Voertuig Informatie"
                    features={[]}
                    price={{description: "Voer uw voertuig details in."}}
                    modalId="vehicleModal"
                    modalContent="Dit zijn de voorwaarden voor voertuigregistratie."
                >
                    <div className="form-group row">
                        <label htmlFor="type" className="col-sm-4 col-form-label">
                            Brand
                        </label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className="form-control"
                                id="brand"
                                placeholder="Enter type (e.g., Audi, BMW)"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="type" className="col-sm-4 col-form-label">
                            Type
                        </label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className="form-control"
                                id="type"
                                placeholder="Enter type (e.g., A4, M6)"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="licencePlate" className="col-sm-4 col-form-label">
                            Kenteken
                        </label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className="form-control"
                                id="licencePlate"
                                placeholder="Kenteken"
                                value={licencePlate}
                                onChange={(e) => setLicencePlate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="type" className="col-sm-4 col-form-label">
                            Gekocht
                        </label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className="form-control"
                                id="gekocht"
                                placeholder="Jaar aangeschat (2020)"
                                value={bought}
                                onChange={(e) => setBought(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="color" className="col-sm-4 col-form-label">
                            Color
                        </label>
                        <div className="col-sm-8">
                            <input
                                type="text"
                                className="form-control"
                                id="color"
                                placeholder="Enter color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="price" className="col-sm-4 col-form-label">
                            Price
                        </label>
                        <div className="col-sm-8">
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="vehicleType" className="form-label">
                            <b>Autotype</b>
                        </label>
                        <select
                            className="form-select"
                            id="vehicleType"
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                        >
                            <option value="default">-- Maak uw keuze --</option>
                            <option value="Car">Auto</option>
                            <option value="Caravan">Caravan</option>
                            <option value="Camper">Camper</option>
                        </select>
                    </div>
                    <Upload onFileUpload={setUploadedFile}/>
                    <div className="form-group row">
                        <div className="col-sm-8 offset-sm-4">
                            <button type="submit" className="btn btn-primary w-100" onChange={handleImageChange}>
                                Upload Vehicle
                            </button>
                        </div>
                    </div>
                </SubscriptionCard>
            </form>
        </>
    );
}

export default AddVehicle;
