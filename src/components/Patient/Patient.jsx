import Header from "../global/Header";
import Sidebar from "../global/Sidebar";
import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';

import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

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
    IconButton
} from '@mui/material';
import Axios from "axios";

function Patient() {

    const navigate=useNavigate();
    const [patient,setPatient]=useState([]);
    const [alertOpen, setAlertOpen] = useState(false);



    useEffect(()=>{
        getPatient();
    },[]);


    const getPatient=()=>{
        Axios.get('http://localhost:3000/patient/get')
            .then(response=>{
                setPatient(response.data || [])
            }).catch(error=>{
                console.error("Axios error :",error)
        })
    }


    const deletePatient=(userId)=>{

        const confirmed=confirm("Are you sure you want to delete this user?");
        if (confirmed){
            fetch('http://localhost:3000/patient/delete',{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userId })
            })
                .then(response=>{
                    getPatient()
                    setAlertOpen(true);
                    setTimeout(() => setAlertOpen(false), 3000);

                }).catch(error=>{
                    console.error('Axios error :',error);
            })
        }
    }



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
                                <Typography variant="h4">PATIENT DETAILS</Typography>
                            </Box>

                            {alertOpen && (
                                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                                    Deleted
                                </Alert>
                            )}

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
                                                        <TableRow>
                                                            <TableCell>Patient ID</TableCell>
                                                            <TableCell>Patient Name</TableCell>
                                                            <TableCell>Age</TableCell>
                                                            <TableCell>Phone Number</TableCell>
                                                            <TableCell>Sex</TableCell>
                                                            <TableCell>Address</TableCell>
                                                            <TableCell>Description</TableCell>
                                                            <TableCell>Actions</TableCell>
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
                                                                    <IconButton color="primary">
                                                                        <Edit />
                                                                    </IconButton>
                                                                    <IconButton color="secondary" onClick={()=>deletePatient(row.id)} >
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
        </>
    );
}

export default Patient;
