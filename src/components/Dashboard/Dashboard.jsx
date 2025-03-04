import React from 'react';
import Header from "../global/Header";
import Sidebar from "../global/Sidebar";
import {useLocation, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
);
import { Line } from 'react-chartjs-2';
import {
    Box,
    Container,
    Divider,
    Grid, IconButton,
    Paper, TableCell, TableRow,
    Typography
} from "@mui/material";
import {Delete, Edit, Event, Group, MedicalServices, Person} from "@mui/icons-material";
import TodayIcon from '@mui/icons-material/Today';
import 'react-toastify/dist/ReactToastify.css';


function Dashboard() {
    const [appointment,setAppointment]=useState([]);
    const [patient,setPatient]=useState([]);
    const [dentist,setDentist]=useState([]);
    const [employee,setEmployee]=useState([]);

    const [loading, setLoading] = useState(true);

    const fetchAllData = async () => {
        try {
            const [patientsRes, dentistsRes, appointmentsRes, employeeRes] = await Promise.all([
                axios.get('http://localhost:3000/patient/get'),
                axios.get('http://localhost:3000/dentist/get'),
                axios.get('http://localhost:3000/appointment/get'),
                axios.get('http://localhost:3000/employee/get'),
                setLoading(false)
            ]);

            setPatient(patientsRes.data || []);
            setDentist(dentistsRes.data || []);
            setAppointment(appointmentsRes.data || []);
            setEmployee(employeeRes.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };


    const pId=appointment.map(row=>(
        <ul key={row.id}>
            {row.patientId}
        </ul>
    ));

    const pName=patient.map(row=>(
        <ul key={row.id}>
            {row.name}
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


    const getAppointmentCountsByMonth = () => {
        const months = Array(12).fill(0);

        appointment.forEach(appointment => {
            const month = new Date(appointment.date).getMonth();
            months[month]++;
        });

        return months;
    };

    const chartData = {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [
            {
                label: 'Appointments per Month',
                data: getAppointmentCountsByMonth(),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.3,
                pointRadius: 5,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Number of Appointments Per Month',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Appointments',
                },
            },
        },
    };

    const location = useLocation();
    return (
        <>
            <Header email={location.state} logout={Logout}/>
            <div className="main d-flex">
                <div className="sidebarWrapper">
                    <Sidebar/>
                </div>

                <div>
                    <ToastContainer />

                    <Box sx={{ display: 'block', bgcolor:'#f1f2fc',marginTop: 8 ,marginLeft: 30}}>
                        <Box component="main" sx={{ flexGrow: 1, p: 3 ,minWidth: '83vw' }}>
                            <Container maxWidth="lg">
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                    <Typography variant="h4">Overview</Typography>
                                </Box>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
                                            <TodayIcon  sx={{ mr: 2,color:'#6f42c1' }}  style={{ fontSize: 50 }} />
                                            <Box>
                                                <Typography variant="h5" align="left" style={{ fontSize: 30 }}>{appointment.length}</Typography>
                                                <Typography style={{ fontSize: 17,fontWeight:'500' }}>Total Appointment</Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
                                            <Person fontSize="large" sx={{ mr: 2 ,color:'#fd7e14'}} style={{ fontSize: 50 }} />
                                            <Box>
                                                <Typography variant="h5" align="left" style={{ fontSize: 30 }}>{patient.length}</Typography>
                                                <Typography align="left" style={{ fontSize: 17,fontWeight:'500' }}>Total Patient</Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
                                            <MedicalServices fontSize="large" sx={{ mr: 2,color:'#20c997' }} style={{ fontSize: 50 }}/>
                                            <Box>
                                                <Typography variant="h5" align="left" style={{ fontSize: 30 }}>{dentist.length}</Typography>
                                                <Typography align="left"  style={{ fontSize: 17,fontWeight:'500' }}>Total Dentists</Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
                                            <Group fontSize="large" sx={{ mr: 2,color:'#0d6efd' }} style={{ fontSize: 50 }} />
                                            <Box>
                                                <Typography variant="h5" align="left" style={{ fontSize: 30 }}>{employee.length}</Typography>
                                                <Typography align="left" style={{ fontSize: 17,fontWeight:'500' }}>Total Employees</Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                </Grid>


                                <Box mt={4}>
                                    <Paper sx={{ p: 2 }}>
                                        <Typography variant="h6" gutterBottom sx={{fontWeight:'bold'}}>Appointments</Typography>
                                        <Grid container spacing={2} >
                                            <Grid item xs={12}>
                                                <Box
                                                    display="flex"
                                                    p={2}
                                                    bgcolor="grey.200"
                                                    borderRadius={1}
                                                    alignItems="center"
                                                    borderBottom="1px solid #ccc"
                                                >
                                                    <Typography variant="subtitle1" fontWeight={600}>
                                                        Patient Details
                                                    </Typography>
                                                    <Box flexGrow={1} />
                                                    <Typography variant="subtitle1" fontWeight={600}>
                                                        Dentist Details
                                                    </Typography>
                                                    <Box flexGrow={1} />
                                                    <Typography variant="subtitle1" fontWeight={600}>
                                                        Date
                                                    </Typography>
                                                    <Box flexGrow={1} />
                                                    <Typography variant="subtitle1" fontWeight={600}>
                                                        Time
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderBottom: '1px solid #ccc' }}>
                                                    <Box flexGrow={1}>
                                                        <Typography fontWeight={500}>{pId}</Typography>
                                                    </Box>
                                                    <Divider orientation="vertical" flexItem />
                                                    <Box flexGrow={1} textAlign="center">
                                                        <Typography fontWeight={500}>{dId}</Typography>
                                                    </Box>
                                                    <Divider orientation="vertical" flexItem />
                                                    <Box flexGrow={1} textAlign="center">
                                                        <Typography fontWeight={500}>{pDate}</Typography>
                                                    </Box>
                                                    <Divider orientation="vertical" flexItem />
                                                    <Box flexGrow={1} textAlign="right">
                                                        <Typography fontWeight={500}>{pTime}</Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Box>
                            </Container>

                            <main className="flex-1 p-6">

                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-2 bg-white p-3 rounded-md shadow-md">
                                        <div className="text-lg font-bold mb-4">Patients List</div>
                                        <table className="w-full text-left">
                                            <thead>
                                            <tr>
                                                <th className="pb-2">Patient Id</th>
                                                <th className="pb-2">Patient Name</th>
                                                <th className="pb-2">Age</th>
                                                <th className="pb-2">Phone Number</th>
                                                <th className="pb-2">Sex</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {patient.length > 0 ? patient.map(row =>(
                                                <TableRow key={row.id}>
                                                    <TableCell component='th' scope="row">{row.id}</TableCell>
                                                    <TableCell component='th' scope="row">{row.name}</TableCell>
                                                    <TableCell component='th' scope="row">{row.age}</TableCell>
                                                    <TableCell component='th' scope="row">{row.number}</TableCell>
                                                    <TableCell component='th' scope="row">{row.sex}</TableCell>
                                                </TableRow>
                                            )): (
                                                <TableRow >
                                                    <TableCell component='th' scope="row">No Data</TableCell>
                                                </TableRow>
                                            )
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="bg-white p-4 rounded-md shadow-md">
                                        <div className="text-lg font-bold mb-4">Doctors List</div>
                                        <table className="w-full text-left">
                                            <thead>
                                            <tr>
                                                <th className="pb-2">Doctor Id</th>
                                                <th className="pb-2">Doctor Name</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {dentist.length > 0 ? dentist.map(row=> (
                                                <TableRow key={row.id}>
                                                    <TableCell component='th' scope="row">{row.id}</TableCell>
                                                    <TableCell component='th' scope="row">{row.name}</TableCell>
                                                </TableRow>
                                            )):(
                                                <TableRow >
                                                    <TableCell>No Data</TableCell>
                                                </TableRow>
                                            )
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </main>
                        </Box>
                        <div style={{ width: '80%', margin: 'auto',backgroundColor:'white' }}>
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </Box>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
