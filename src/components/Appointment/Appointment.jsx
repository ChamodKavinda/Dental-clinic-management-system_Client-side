import Header from "../global/Header";
import Sidebar from "../global/Sidebar";
import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
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
import {toast, ToastContainer} from "react-toastify";
import UpdateAppointment from "../Appointment/updateAppointment";

function Appointment() {

    const navigate = useNavigate();
    const [appointment,setAppointment]=useState([]);

    const [open, setOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(()=>{
        getAppointment();
    },[])

    const getAppointment=()=>{
        axios.get('http://localhost:3000/appointment/get')
            .then(response=>{
                setAppointment(response.data || []);
            }).catch(error=>{
            console.error('Axios error',error);
        })
    }

    const handleSuccess = (msg) =>
        toast.success(msg, {
            position:'top-right'
        });

    const deleteAppointment=(userId)=>{
        const confirmed=confirm("Are you sure you want to delete this appointment?");
        if (confirmed){
            fetch('http://localhost:3000/appointment/delete',{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userId })
            })
                .then(response=>{
                    getAppointment()
                    handleSuccess('Successfully Deleted');

                }).catch(error=>{
                console.error('Axios error :',error);
            })
        }
    }

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
            <Header />

            <div className="main d-flex">
                <div className="sidebarWrapper">
                    <Sidebar />
                </div>

                <Box sx={{ display: 'flex', flexGrow: 1, bgcolor: '#F7F7F7' }}>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Container maxWidth="lg">
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                <Typography variant="h4">APPOINTMENT DETAILS</Typography>
                            </Box>
                            <ToastContainer />
                            <Grid container spacing={2}>
                                <Grid item xs={20}>
                                    <Box mt={-2}>
                                        <Paper sx={{ p: 2 }}>
                                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                                <Typography variant="h6"></Typography>
                                                <Button variant="contained" color="primary" onClick={()=>navigate('/addAppointment') }>Add Appointment</Button>
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
                                        </Paper>
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
                    <UpdateAppointment payload={selectedAppointment} onClose={handleClose} getAppointment={getAppointment()}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>

        </>
    );
}

export default Appointment;
