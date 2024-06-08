import Header from "../global/Header";
import Sidebar from "../global/Sidebar";
import React from "react";

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

function Patient() {
    const patients = [
        {
            id: 'P001',
            name: 'M.Peter',
            age: 25,
            phone: '0768765456',
            sex: 'Male',
            address: 'Colombo',
            description: 'Regular check-up'
        },
        {
            id: 'P002',
            name: 'M.Peter',
            age: 25,
            phone: '0768765456',
            sex: 'Male',
            address: 'Colombo',
            description: 'Dental cleaning'
        },
        {
            id: 'P003',
            name: 'M.Peter',
            age: 25,
            phone: '0768765456',
            sex: 'Male',
            address: 'Colombo',
            description: 'Cavity filling'
        },
        {
            id: 'P004',
            name: 'M.Peter',
            age: 25,
            phone: '0768765456',
            sex: 'Male',
            address: 'Colombo',
            description: 'Tooth extraction'
        }
    ];

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

                            <Grid container spacing={2}>
                                <Grid item xs={20}>
                                    <Box mt={-2}>
                                        <Paper sx={{ p: 2 }}>
                                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                                <Typography variant="h6"></Typography>
                                                <Button variant="contained" color="primary">Add Patient</Button>
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
                                                        {patients.map((patient, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell>{patient.id}</TableCell>
                                                                <TableCell>{patient.name}</TableCell>
                                                                <TableCell>{patient.age}</TableCell>
                                                                <TableCell>{patient.phone}</TableCell>
                                                                <TableCell>{patient.sex}</TableCell>
                                                                <TableCell>{patient.address}</TableCell>
                                                                <TableCell>{patient.description}</TableCell>
                                                                <TableCell>
                                                                    <IconButton color="primary">
                                                                        <Edit />
                                                                    </IconButton>
                                                                    <IconButton color="secondary">
                                                                        <Delete />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
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
