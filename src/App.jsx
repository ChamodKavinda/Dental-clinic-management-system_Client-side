import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from "./components/Dashboard/Dashboard";
import Appointment from "./components/Appointment/Appointment";
import Patient from "./components/Patient/Patient";
import Staff from "./components/Staff/Staff";
import Dentist from "./components/Dentist";
import Signup from "./pages/Signup";
import AddPatient from './components/Patient/AddPatient';
import AddDentist from "./components/Dentist/AddDentist";
import AddAppointment from "./components/Appointment/AddAppointment";
import AddStaff from "./components/Staff/AddStaff";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
    return (

        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contactus" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/addAppointment" element={<AddAppointment />} />
                <Route path="/patient" element={<Patient />} />
                <Route path="/dentist" element={<Dentist />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/addStaff" element={<AddStaff />} />
                <Route path="/addPatient" element={<AddPatient />} />
                <Route path="/addDentist" element={<AddDentist />} />
            </Routes>
        </>
    );
}

export default App;
