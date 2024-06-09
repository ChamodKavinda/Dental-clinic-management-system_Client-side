import Header from "../global/Header";
import Sidebar from "../global/Sidebar";
import React, {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";

import {
    Container,
    Box,
    Paper,
    Typography,
    Grid,
    TextField,
    MenuItem,
    Button
} from '@mui/material';



function AddPatient() {




    const [submitted, setSubmitted] = useState(false);


    const handleReset = () => {
        setPatient({
            id: '',
            name: '',
            age: '',
            phone: '',
            sex: '',
            address: '',
            description: ''
        });
    };


    useEffect(() => {
        if (submitted) {
            setPatient({
                id: '',
                name: '',
                age: '',
                phone: '',
                sex: '',
                address: '',
                description: ''
            });
            setSubmitted(false);
        }
    }, [submitted]);

    const navigate=useNavigate();

    const [patient, setPatient] = useState({
        id: '',
        name: '',
        age: '',
        phone: '',
        sex: '',
        address: '',
        description: ''
    });

    const handleChange = (e) => {
        setPatient({
            ...patient,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle form submission, e.g., save patient data
        console.log(patient);
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
                                <Typography variant="h4">ADD PATIENT</Typography>
                            </Box>

                            <Paper sx={{ p: 3 }}>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Patient ID"
                                                name="id"
                                                variant="outlined"
                                                value={patient.id}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Patient Name"
                                                name="name"
                                                variant="outlined"
                                                value={patient.name}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Age"
                                                name="age"
                                                variant="outlined"
                                                type="number"
                                                value={patient.age}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Phone Number"
                                                name="phone"
                                                variant="outlined"
                                                type="number"
                                                value={patient.phone}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                select
                                                fullWidth
                                                label="Sex"
                                                name="sex"
                                                variant="outlined"
                                                value={patient.sex}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="Male">Male</MenuItem>
                                                <MenuItem value="Female">Female</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Address"
                                                name="address"
                                                variant="outlined"
                                                value={patient.address}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Description"
                                                name="description"
                                                variant="outlined"
                                                multiline
                                                rows={4}
                                                value={patient.description}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box display="flex" justifyContent="flex-end">

                                                <Button type="submit" variant="contained" color="secondary" sx={{marginRight:'720px'}}
                                                        onClick={()=>navigate('/patient')}>
                                                    Back
                                                </Button>

                                                <Button type="reset" variant="contained" color="error" sx={{marginRight:'10px'}}
                                                        onClick={handleReset}>
                                                    Reset
                                                </Button>
                                                <Button type="submit" variant="contained" color="primary">
                                                    Submit
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </Container>
                    </Box>
                </Box>


            </div>
        </>
    );
}

export default AddPatient;
