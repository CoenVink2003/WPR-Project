import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerRegister from "./Customer/Register/Register";
import CustomerLogin from "./Customer/Login/Login";
import Homepage from "./Homepage/homepage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<h1>Home Page</h1>} />
                <Route path="/Employee/register" element={<Register />} />
                <Route path="/Employee/login" element={<Login />} />
                <Route path="/Employee/subscription" element={<Subscription />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
