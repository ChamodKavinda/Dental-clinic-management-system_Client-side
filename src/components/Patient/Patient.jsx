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
import Axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import UpdatePatient from "../Patient/updatePatient";
import axios from "axios";
import {useCookies} from "react-cookie";


function Patient() {

    const navigate=useNavigate();
    const [patient,setPatient]=useState([]);
    const [username, setUsername] = useState("");
    const [cookies, removeCookie] = useCookies([]);
    const [open, setOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(()=>{
        getPatient();

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
    },[],[cookies, navigate, removeCookie]);
    const Logout = () => {
        removeCookie("token");
        navigate("/home");
    };

    const handleSuccess = (msg) =>
        toast.success(msg, {
            position:'top-right'
        });

    const getPatient=()=>{
        Axios.get('http://localhost:3000/patient/get')
            .then(response=>{
                setPatient(response.data || [])
            }).catch(error=>{
                console.error("Axios error :",error)
        })
    }

    const deletePatient=(userId)=>{

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
        if (result.isConfirmed){
            fetch('http://localhost:3000/patient/delete',{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userId })
            })
                .then(response => {
                    getPatient();
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

    const handleClickOpen = (patient = null) => {
        setSelectedPatient(patient);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        getPatient();
    };



    return (
        <>
            <Header logout={Logout}/>

            <div className="main d-flex">
                <div className="sidebarWrapper">
                    <Sidebar />
                </div>

                <Box sx={{ display: 'flex', flexGrow: 1, bgcolor: '#F7F7F7' }}>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Container maxWidth="lg">
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                <Typography variant="h4">PATIENT DETAILS</Typography>
                            </Box>
                            <ToastContainer />
                            <Grid container spacing={2}>
                                <Grid item xs={20}>
                                    <Box mt={-2}>
                                        <Paper sx={{ p: 2 }}>
                                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                                <Typography variant="h6"></Typography>
                                                <Button variant="contained" color="primary" onClick={()=>navigate('/addPatient')}>Add Patient</Button>
                                            </Box>
                                            <TableContainer component={Paper}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow >
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Patient ID</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Patient Name</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Age</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Phone Number</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Sex</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Address</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Description</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Actions</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {patient.length > 0 ? patient.map(row =>(
                                                            <TableRow key={row.id}>
                                                                <TableCell component='th' scope="row">{row.id}</TableCell>
                                                                <TableCell component='th' scope="row">{row.name}</TableCell>
                                                                <TableCell component='th' scope="row">{row.age}</TableCell>
                                                                <TableCell component='th' scope="row">{row.number}</TableCell>
                                                                <TableCell component='th' scope="row">{row.sex}</TableCell>
                                                                <TableCell component='th' scope="row">{row.address}</TableCell>
                                                                <TableCell component='th' scope="row">{row.description}</TableCell>
                                                                <TableCell>
                                                                    <IconButton color="primary" onClick={()=>handleClickOpen(row)}>
                                                                        <Edit />
                                                                    </IconButton>
                                                                    <IconButton color="error" onClick={()=>deletePatient(row.id)} >
                                                                        <Delete />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        )): (
                                                            <TableRow >
                                                            <TableCell component='th' scope="row">No Data</TableCell>
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
                <DialogTitle>Update Patient</DialogTitle>
                <DialogContent>
                    <UpdatePatient payload={selectedPatient} onClose={handleClose}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>

        </>
    );
}

export default Patient;
