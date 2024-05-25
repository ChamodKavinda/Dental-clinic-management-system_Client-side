import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Features from './pages/Features';
import Login from './pages/Login';
import "bootstrap/dist/css/bootstrap.min.css";

import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./global/Navbar";
import Appiontment from "./components/Appointment/Appointment";
import Appointment from "./components/Appointment/Appointment";
import Patient from "./components/Patient/Patient";
import Staff from "./components/Staff/Staff";
import Dentist from "./components/Dentist";


function App() {
    return (
        <>
            <Routes>
                {/*<Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contactus" element={<Contact />} />
                <Route path="/features" element={<Features />} />*/}
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/patient" element={<Patient />} />
                <Route path="/dentist" element={<Dentist />} />
                <Route path="/staff" element={<Staff />} />
            </Routes>


        </>
    );
}

export default App;
