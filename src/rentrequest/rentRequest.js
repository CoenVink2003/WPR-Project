import React, {useEffect, useState} from "react";
import {wrapperGET, wrapperPOST} from "../wrapper";
import {validateEmail} from "../utils";
import bcrypt from "bcryptjs";
import {useNavigate} from "react-router-dom";

function NewRentRequest() //kijken of auto beschikbaar is op die dagen, prijs berekenen, invoerveld voor opmerkingen
{
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [opmerking, setOpmerking] = useState("");

    const navigate = useNavigate();

    function clearForm() {
        setStartDate("");
        setEndDate("");
        setOpmerking("");
    }

    useEffect(() => {
        carName();
    }, []);

    const getIsFormValid = () => {
        //const startDate = startDate;
        //const endDate = endDate;
        return (
            isValidDate(startDate),
            isValidDate(endDate)
        );
    }

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
    //if (searchParams.has("id")) { //id is not final. Depends on what the id for the car is stated as
        const carName = async () =>
            {
                let carName = await wrapperGET("Vehicle", "", {
                    id: searchParams.get("id"), //second id has to be taken from the url
                });



                console.log(carName);
            }
    //}

     const handleSubmit = async (event) => {
         event.preventDefault();
    //
         try {
              await wrapperPOST("RentRequest", "", {
                  autoId: searchParams.get("id"),
                  customerId: sessionStorage.getItem("customer_id"),
                  startDate: startDate,
                  endDate: endDate,
                  opmerking: opmerking,

              });
             // Formulier leegmaken na succesvolle registratie
             clearForm();

             // Navigeer naar de bevestigings pagina
             //navigate("");
         } catch (error) {
             // Fout afhandelen
             console.error("Error during signup:", error);
         }
     };

    //const datepicker = require('js-datepicker')
    return (
    <div className="App">
        <div className="background">
            <div className="loginContainer p-4 dp-fadein-prep">
                <form onSubmit={handleSubmit}>
                    <h2 className="mb-2 text-center">Huurverzoek</h2>
                    //foto van de auto
                    <p className="text-center"></p> /*naam van de auto*/
                    <label className="form-label mt-3 mb-0"><b>Geef de startdatum van de huurtijd</b> <span
                        className="required">*</span>
                    </label>
                    <input type="text" id="startDate" name="startDate" className="datepicker" value={startDate.value}
                           onChange={(e) => {
                               setStartDate(e.target.value);
                           }}/>
                    <label className="form-label mt-3 mb-0"><b>Geef de einddatum van de huurtijd</b> <span
                        className="required">*</span>
                    </label>
                    <input type="text" id="endDate" name="endDate" className="datepicker" value={endDate.value}
                           onChange={(e) => {
                               setEndDate(e.target.value);
                           }}/>
                    <br/>
                    <label className="form-label mt-3 mb-0"><b>Vul hier uw opmerking in:</b> <span
                        className="required">*</span>
                    </label><br/>
                    <input type="text" value={opmerking.value}
                           onChange={(e) => {
                        setOpmerking(e.target.value);
                    }}/>
                    <button type="submit"
                            className={`btn ${getIsFormValid() ? 'btn-primary' : 'btn-danger'} btn-block w-100`}
                            disabled={!getIsFormValid()}
                    >Huren
                    </button>
                </form>
            </div>
        </div>
    </div>
)
}

export default NewRentRequest;
