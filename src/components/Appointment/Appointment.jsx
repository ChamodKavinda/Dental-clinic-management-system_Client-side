import Header from "../global/Header";
import Sidebar from "../global/Sidebar";
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import Swal from 'sweetalert2';

import {
    Container,
    Box,
    Paper,
    Typography,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton, DialogTitle, DialogContent, DialogActions, Dialog
} from '@mui/material';
import axios from "axios";
import UpdateAppointment from "../Appointment/updateAppointment";
import {useCookies} from "react-cookie";

function Appointment() {

    const navigate = useNavigate();
    const [appointment,setAppointment]=useState([]);
    const [cookies, removeCookie] = useCookies([]);
    const [open, setOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [username, setUsername] = useState("");

    useEffect(()=>{
        getAppointment();
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
            console.log(data)
            setUsername(user);
            if (!status){
                (removeCookie("token"), navigate("/login"));
            }

        };
        verifyCookie();

    },[],[cookies, navigate, removeCookie])
    const Logout = () => {
        removeCookie("token");
        navigate("/home");
    };

    const getAppointment=()=>{
        axios.get('http://localhost:3000/appointment/get')
            .then(response=>{
                setAppointment(response.data || []);
            }).catch(error=>{
            console.error('Axios error',error);
        })
    }

    const deleteAppointment = (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('http://localhost:3000/appointment/delete', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: userId })
                })
                    .then(response => {
                        getAppointment();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }).catch(error => {
                    console.error('Axios error :', error);
                });
            }
        });
    };

    const handleClickOpen = (appointment = null) => {
        setSelectedAppointment(appointment);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        getAppointment();
    };

    return (
        <>
            <Header  logout={Logout}/>

            <div className="main d-flex">
                <div className="sidebarWrapper">
                    <Sidebar />
                </div>

                <Box sx={{ display: 'flex', flexGrow: 1, bgcolor: 'white',marginLeft: 30 }}>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Container maxWidth="lg">
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                <Typography variant="h4">APPOINTMENT DETAILS</Typography>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={20}>
                                    <Box mt={-2}>
                                        <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            mb={2}
                                            sx={{
                                                position: 'sticky',
                                                top: '64px',
                                                zIndex: 1,
                                                backgroundColor: 'transparent'
                                            }}
                                        >
                                            <Typography variant="h6"></Typography>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => navigate('/addAppointment')}
                                            >
                                                Add Appointment
                                            </Button>
                                        </Box>
                                            <TableContainer component={Paper}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Appointment ID</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Patient ID</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Dentist ID</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Date</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Time</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Email</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Description</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Actions</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {appointment.length > 0 ? appointment.map(row=> (
                                                            <TableRow key={row.id}>
                                                                <TableCell component='th' scope="row">{row.id}</TableCell>
                                                                <TableCell component='th' scope="row">{row.patientId}</TableCell>
                                                                <TableCell component='th' scope="row">{row.dentistId}</TableCell>
                                                                <TableCell component='th' scope="row">{row.date}</TableCell>
                                                                <TableCell component='th' scope="row">{row.time}</TableCell>
                                                                <TableCell component='th' scope="row">{row.email}</TableCell>
                                                                <TableCell component='th' scope="row">{row.description}</TableCell>
                                                                <TableCell>
                                                                    <IconButton color="primary" onClick={()=>handleClickOpen(row)}>
                                                                        <Edit />
                                                                    </IconButton>
                                                                    <IconButton color="error" onClick={()=>deleteAppointment(row.id)}>
                                                                        <Delete />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        )):(
                                                            <TableRow >
                                                                <TableCell>No Data</TableCell>
                                                            </TableRow>
                                                        )
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>

                                    </Box>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Box>
            </div>

            <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
                <DialogTitle>Update Appointment</DialogTitle>
                <DialogContent>
                    <UpdateAppointment payload={selectedAppointment} onClose={handleClose}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>

        </>
    );
}

export default Appointment;
