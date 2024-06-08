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
import {Avatar, Box, Container, Divider, Grid, List, ListItem, ListItemText, Paper, Typography} from "@mui/material";
import { Event, Group, MedicalServices, Person} from "@mui/icons-material";

import { SlCalender } from "react-icons/sl";
import TodayIcon from '@mui/icons-material/Today';

function Dashboard() {



    const appointments = [
        {
            patientName: 'M.Peter',
            patientPhone: '+94771234564',
            date: '05 June 2024, 6:50 PM',
            dentistName: 'Dr. Perera',
            dentistSpecialty: 'Orthodontist'
        },
        {
            patientName: 'M.Peter',
            patientPhone: '+94771234564',
            date: '05 June 2024, 6:50 PM',
            dentistName: 'Dr. Perera',
            dentistSpecialty: 'Orthodontist'
        },
        {
            patientName: 'M.Peter',
            patientPhone: '+94771234564',
            date: '05 June 2024, 6:50 PM',
            dentistName: 'Dr. Perera',
            dentistSpecialty: 'Orthodontist'
        }
    ];


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


                <div>

                    <Box sx={{ display: 'flex', bgcolor:'#F7F7F7' }}>
                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                            <Container maxWidth="lg">
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                    <Typography variant="h4">Overview</Typography>
                                </Box>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
                                            <TodayIcon fontSize="large" sx={{ mr: 2 }} />
                                            <Box>
                                                <Typography variant="h5" align="left">150</Typography>
                                                <Typography>Total Appointment</Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
                                            <Person fontSize="large" sx={{ mr: 2 }} />
                                            <Box>
                                                <Typography variant="h5" align="left">20</Typography>
                                                <Typography align="left">Total Patient</Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
                                            <MedicalServices fontSize="large" sx={{ mr: 2 }} />
                                            <Box>
                                                <Typography variant="h5" align="left">10</Typography>
                                                <Typography align="left">Total Dentists</Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
                                            <Group fontSize="large" sx={{ mr: 2 }} />
                                            <Box>
                                                <Typography variant="h5" align="left">15</Typography>
                                                <Typography align="left">Total Employees</Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>

                                </Grid>


                                <Box mt={4}>
                                    <Paper sx={{ p: 2 }}>
                                        <Typography variant="h6" gutterBottom sx={{fontWeight:'bold'}}>Appointment</Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Box display="flex" p={1} bgcolor="grey.200" borderRadius={1}>
                                                    <Box flexGrow={1}>
                                                        <Typography variant="subtitle1">Patient Details</Typography>
                                                    </Box>
                                                    <Box flexGrow={1.3}>
                                                        <Typography variant="subtitle1">Date</Typography>
                                                    </Box>
                                                    <Box flexGrow={-1}>
                                                        <Typography variant="subtitle1">Dentist Details</Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            {appointments.map((appointment, index) => (
                                                <Grid item xs={12} key={index}>
                                                    <Paper sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                                                        <Box flexGrow={1}>
                                                            <Typography>{appointment.patientName}</Typography>
                                                            <Typography>{appointment.patientPhone}</Typography>
                                                        </Box>
                                                        <Divider orientation="vertical" flexItem />
                                                        <Box flexGrow={1} textAlign="center">
                                                            <Typography>{appointment.date}</Typography>
                                                        </Box>
                                                        <Divider orientation="vertical" flexItem />
                                                        <Box flexGrow={1} textAlign="right">
                                                            <Typography>{appointment.dentistName}</Typography>
                                                            <Typography>{appointment.dentistSpecialty}</Typography>
                                                        </Box>
                                                    </Paper>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Paper>
                                </Box>

                            </Container>
                        </Box>
                    </Box>


                </div>
            </div>

        </>
    );
}

export default Dashboard;
