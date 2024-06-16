import Header from "../global/Header";
import Sidebar from "../global/Sidebar";
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
import { Edit, Delete } from '@mui/icons-material';
import AddStaff from '../Staff/AddStaff';
import UpdateStaff from "./updateStaff";

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
    IconButton, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import axios from "axios";
import { useEffect } from "react";


function Staff() {
    const [employee,setEmployee] = useState([]); 
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const [selectedEmployee, setSelectedEmployee] = useState(null);


    useEffect(()=>{
        getAllEmployee();

    },[])



    const getAllEmployee=()=>{
        axios.get('http://localhost:3000/employee/get')
        .then(response=>{
            setEmployee(response.data || []);
        }).catch(error=>{
            console.error('axios error :',error);
        })
    }

    const handleSuccess = (msg) =>
        toast.success(msg, {
            position:'top-right'
        });

    const deleteEmployee=(userId)=>{

        const confirmed=confirm("Are you sure you want to delete this user?");
        if (confirmed){
            fetch('http://localhost:3000/employee/delete',{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userId })
            })
                .then(response=>{
                    getAllEmployee()
                    handleSuccess('Successfully Deleted');

                }).catch(error=>{
                    console.error('Axios error :',error);
            })
        }
    }


    const handleClickOpen = (employee = null) => {
        setSelectedEmployee(employee);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        getAllEmployee();
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
                                <Typography variant="h4">EMPLOYEE DETAILS</Typography>
                            </Box>
                            <ToastContainer />
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
                                                                    <IconButton color="primary" onClick={()=>handleClickOpen(row)}>
                                                                        <Edit />
                                                                    </IconButton>
                                                                    <IconButton color="error" onClick={()=>deleteEmployee(row.id)}>
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

            <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
                <DialogTitle>Update Employee</DialogTitle>
                <DialogContent>
                    <UpdateStaff payload={selectedEmployee} onClose={handleClose}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Staff;
