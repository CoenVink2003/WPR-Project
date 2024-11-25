import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Employee/Register/Register";
import Login from "./Employee/Login/Login";
import Subscription from "./Employee/Register/Subscription";

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
