import React from 'react';
import Header from "../global/Header";
import Sidebar from "../global/Sidebar";
import './dashboard.css';
import { FaUserDoctor } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import { MdCalendarMonth } from "react-icons/md";
import { FaWheelchair } from "react-icons/fa";
import {useNavigate} from "react-router-dom";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Dashboard() {

    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
                navigate("/login");
            }
            const { data } = await axios.post(
                "http://localhost:3000",
                {},
                { withCredentials: true }
            );
            const { status, user } = data;
            setUsername(user);
            return status
                ? toast(`Hello ${user}`, {
                    position: "top-right",
                })
                : (removeCookie("token"), navigate("/login"));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    const Logout = () => {
        removeCookie("token");
        navigate("/login");
    };

    return (

        <>

            <Header/>

            <div className="main d-flex">
                <div className="sidebarWrapper">
                    <Sidebar/>
                </div>


                <div className="right-content w-100">
                   <div className="row dashboardBoxWrapperRow">
                       <div className="col-md-9">
                           <div className="dashboardBoxWrapper d-flex">
                               <div className="dashboardBox" >
                                    <h4>Appointment</h4>
                                   <p>4</p>
                                   <span className="icon"><MdCalendarMonth/></span>


                               </div>


                               <div className="dashboardBox">
                                   <h4>Employee</h4>
                                   <p>20</p>
                                   <span className="icon"><GrUserWorker/></span>

                               </div>

                               <div className="dashboardBox">
                                   <h4>Dentists</h4>
                                   <p>2</p>
                                   <span className="icon"><FaUserDoctor/></span>

                               </div>

                               <div className="dashboardBox">
                                   <h4>Patients</h4>
                                   <p>10</p>
                                   <span className="icon"><FaWheelchair/></span>

                                </div>

                           </div>
                       </div>

                       <div className="col-md-3">
                           <div className="box">

                           </div>
                       </div>


                   </div>

                    {/*<div className="table-responsive mt-3">
                        <div className="table table-bordered">
                            <thead className="thead-dark">
                            <tr>
                                <th>PID</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Dentist</th>
                                <th>Time</th>
                            </tr>
                            </thead>
                        </div>
                    </div>*/}
                </div>


            </div>

        </>
    );
}

export default Dashboard;
