import React from 'react';
import Header from "../global/Header";
import Sidebar from "../global/Sidebar";
import {useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
    Box,
    Container,
    Divider,
    Grid,
    Paper,
    Typography
} from "@mui/material";
import { Event, Group, MedicalServices, Person} from "@mui/icons-material";
import TodayIcon from '@mui/icons-material/Today';
import 'react-toastify/dist/ReactToastify.css';


function Dashboard() {
    const [appointment,setAppointment]=useState([]);
    const [patient,setPatient]=useState([]);
    const [dentist,setDentist]=useState([]);
    const [employee,setEmployee]=useState([]);

    const fetchAllData = async () => {
        try {
            const [patientsRes, dentistsRes, appointmentsRes, employeeRes] = await Promise.all([
                axios.get('http://localhost:3000/patient/get'),
                axios.get('http://localhost:3000/dentist/get'),
                axios.get('http://localhost:3000/appointment/get'),
                axios.get('http://localhost:3000/employee/get')
            ]);

            setPatient(patientsRes.data || []);
            setDentist(dentistsRes.data || []);
            setAppointment(appointmentsRes.data || []);
            setEmployee(employeeRes.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const pId=appointment.map(row=>(
        <ul key={row.id}>
            {row.patientId}
        </ul>
    ));

    const pDate=appointment.map(row=>(
        <ul key={row.id}>
            {row.date}
        </ul>
    ));


    const pTime = appointment.map(row=>(
        <ul key={row.id}>
            {row.time}
        </ul>
    ))

    const dId = appointment.map(row=>(
        <ul key={row.id}>
            {row.dentistId}
        </ul>
    ))

    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "top-right",
        });


    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        fetchAllData();
        const verifyCookie = async () => {
            if (!cookies.token) {
                /*navigate("/login");*/
            }
            const { data } = await axios.post(
                "http://localhost:3000",
                {},
                { withCredentials: true }
            );
            const { status, user } = data;
            setUsername(user);

            if (status && !localStorage.getItem("welcomeMessageShown")) {
                toast(`Welcome to ${user}`, {
                    position: "top-right",
                });
                localStorage.setItem("welcomeMessageShown", "true");
            } else if (!status) {
                removeCookie("token");
                navigate("/login");
            }
        };

        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    const Logout = () => {
        localStorage.removeItem("welcomeMessageShown");
        removeCookie("token");
        navigate("/home");
    };


    return (
        <>
            <Header logout={Logout}/>

            <div className="main d-flex">
                <div className="sidebarWrapper">
                    <Sidebar/>
                </div>

                <div>
                    <ToastContainer />

                    <Box sx={{ display: 'flex', bgcolor:'#F7F7F7' }}>
                        <Box component="main" sx={{ flexGrow: 1, p: 3 ,minWidth: '83vw' }}>
                            <Container maxWidth="lg">
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                    <Typography variant="h4">Overview</Typography>
                                </Box>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
                                            <TodayIcon fontSize="large" sx={{ mr: 2 }} />
                                            <Box>
                                                <Typography variant="h5" align="left">{appointment.length}</Typography>
                                                <Typography>Total Appointment</Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
                                            <Person fontSize="large" sx={{ mr: 2 }} />
                                            <Box>
                                                <Typography variant="h5" align="left">{patient.length}</Typography>
                                                <Typography align="left">Total Patient</Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
                                            <MedicalServices fontSize="large" sx={{ mr: 2 }} />
                                            <Box>
                                                <Typography variant="h5" align="left">{dentist.length}</Typography>
                                                <Typography align="left">Total Dentists</Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
                                            <Group fontSize="large" sx={{ mr: 2 }} />
                                            <Box>
                                                <Typography variant="h5" align="left">{employee.length}</Typography>
                                                <Typography align="left">Total Employees</Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                </Grid>


                                <Box mt={4}>
                                    <Paper sx={{ p: 2 }}>
                                        <Typography variant="h6" gutterBottom sx={{fontWeight:'bold'}}>Appointments</Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Box display="flex" p={1} bgcolor="grey.200" borderRadius={1}>
                                                    <Box flexGrow={1}>
                                                        <Typography variant="subtitle1">Patient Details</Typography>
                                                    </Box>
                                                    <Box flexGrow={0.8}>
                                                        <Typography variant="subtitle1">Dentist Details</Typography>
                                                    </Box>
                                                    <Box flexGrow={1.5}>
                                                        <Typography variant="subtitle1">Date</Typography>
                                                    </Box>
                                                    <Box flexGrow={-1}>
                                                        <Typography variant="subtitle1">Time</Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                                <Grid item xs={12}>
                                                    <Paper sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                                                        <Box flexGrow={1}>
                                                                        <Typography >
                                                                            {pId}
                                                                        </Typography>
                                                        </Box>
                                                        <Divider orientation="vertical" flexItem />
                                                        <Box flexGrow={1} textAlign="center">
                                                            <Typography>
                                                                {dId}
                                                            </Typography>
                                                        </Box>
                                                        <Divider orientation="vertical" flexItem />
                                                        <Box flexGrow={1} textAlign="center">
                                                            <Typography>
                                                                {pDate}
                                                            </Typography>
                                                        </Box>
                                                        <Divider orientation="vertical" flexItem />
                                                        <Box flexGrow={1} textAlign="right">
                                                            <Typography>
                                                                {pTime}
                                                            </Typography>
                                                        </Box>
                                                    </Paper>
                                                </Grid>
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
