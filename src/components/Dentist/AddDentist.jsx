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



function AddDentist() {

    const [submitted, setSubmitted] = useState(false);

    const handleReset = () => {
        setDentist({
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
            setDentist({
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

    const [dentist, setDentist] = useState({
        id: '',
        name: '',
        age: '',
        phone: '',
        sex: '',
        address: '',
        description: ''
    });

    const handleChange = (e) => {
        setDentist({
            ...dentist,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(dentist);
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
                                <Typography variant="h4">ADD DENTIST</Typography>
                            </Box>

                            <Paper sx={{ p: 3 }}>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Dentist ID"
                                                name="id"
                                                variant="outlined"
                                                value={dentist.id}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Dentist Name"
                                                name="name"
                                                variant="outlined"
                                                value={dentist.name}
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
                                                value={dentist.age}
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
                                                value={dentist.phone}
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
                                                value={dentist.sex}
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
                                                value={dentist.address}
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
                                                value={dentist.description}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box display="flex" justifyContent="flex-end">

                                                <Button type="submit" variant="contained" color="secondary" sx={{marginRight:'720px'}}
                                                        onClick={()=>navigate('/dentist')}>
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

export default AddDentist;
