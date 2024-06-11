import Header from "../global/Header";
import Sidebar from "../global/Sidebar";
import React, { useState } from "react";
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
import axios from "axios";
import { useEffect } from "react";

function Staff() {
    const [employee,setEmployee] = useState([]); 
    const navigate = useNavigate();

    useEffect(()=>{
        getAllEmployee();
    })

    const getAllEmployee=()=>{
        axios.get('http://localhost:3000/employee/get')
        .then(response=>{
            console.log(response);
            setEmployee(response.data || []);
        }).catch(error=>{
            console.error('axios error :',error);
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
                                <Typography variant="h4">EMPLOYEE DETAILS</Typography>
                            </Box>

                            <Grid container spacing={2}>
                                <Grid item xs={20}>
                                    <Box mt={-2}>
                                        <Paper sx={{ p: 2 }}>
                                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                                <Typography variant="h6"></Typography>
                                                <Button variant="contained" color="primary" onClick={()=>navigate('/addStaff')}>Add Employee</Button>
                                            </Box>
                                            <TableContainer component={Paper}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Employee ID</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Employee Name</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Age</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Phone Number</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Sex</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Address</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Description</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Actions</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {employee.length > 0 ? employee.map(row => (
                                                            <TableRow key={row.id}>
                                                                <TableCell>{row.id}</TableCell>
                                                                <TableCell>{row.name}</TableCell>
                                                                <TableCell>{row.age}</TableCell>
                                                                <TableCell>{row.number}</TableCell>
                                                                <TableCell>{row.sex}</TableCell>
                                                                <TableCell>{row.address}</TableCell>
                                                                <TableCell>{row.description}</TableCell>
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
                                                            <TableCell component='th' scope="row">No Data</TableCell>
                                                            </TableRow>
                                                        )}
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

export default Staff;
