import dental from '../assets/dental.jpg'
import Navbar from "../global/Navbar";
import React from "react";

function Home(){
    return(
        <>
            <Navbar/>
            <h1 >Welcome to Dental Clinic Management System</h1>
            <img src={dental} alt="dental"/>
        </>
        );
}

export default Home