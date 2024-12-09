import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerRegister from "./Customer/Register/Register";
import CustomerLogin from "./Customer/Login/Login";
import CustomerEdit from "./Customer/Edit/Edit";
import Homepage from "./Homepage/homepage";
import CompanyRegister from "./Company/Register/CompanyRegister";
import CompanyLogin from "./Company/Login/CompanyLogin";
import Subscription from "./Homepage/Subscription";
import NewRentRequest from "./rentrequest/rentRequest";
import CompanyRenterManagement from "./Company/Management/CompanyRenterManagement";
import AboutUs from "./Homepage/AboutUs";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/Customer/edit" element={<CustomerEdit/>} />
                <Route path="/Company/register" element={<CompanyRegister/>} />
                <Route path="/Company/login" element={<CompanyLogin/>} />
                <Route path="/Customer/register" element={<CustomerRegister />} />
                <Route path="/Customer/login" element={<CustomerLogin />} />
                <Route path="/Subscription" element={<Subscription/>} />
                <Route path="/RentRequest/new" element={<NewRentRequest/>} />
                <Route path="/Company/Management" element={<CompanyRenterManagement/>} />
                <Route path="/AboutUs" element={<AboutUs/>} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
