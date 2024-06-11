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
    IconButton
} from '@mui/material';
import axios, {Axios} from "axios";

function Dentist() {

    const navigate = useNavigate();
    const [dentist,setDentist]=useState([]);

    useEffect(()=>{
        getDentist();
    },[])

    const getDentist=()=>{
        axios.get('http://localhost:3000/dentist/get')
            .then(response=>{
                setDentist(response.data || []);
            }).catch(error=>{
                console.error('Axios error',error);
        })
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
                                <Typography variant="h4">DENTIST DETAILS</Typography>
                            </Box>

                            <Grid container spacing={2}>
                                <Grid item xs={20}>
                                    <Box mt={-2}>
                                        <Paper sx={{ p: 2 }}>
                                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                                <Typography variant="h6"></Typography>
                                                <Button variant="contained" color="primary" onClick={()=>navigate('/addDentist') }>Add Dentist</Button>
                                            </Box>
                                            <TableContainer component={Paper}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Dentist ID</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Dentist Name</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Age</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Phone Number</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Sex</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Address</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Description</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Actions</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {dentist.length > 0 ? dentist.map(row=> (
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
                                                                    <IconButton color="secondary">
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
        </>
    );
}

export default Dentist;
