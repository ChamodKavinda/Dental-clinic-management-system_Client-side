import Header from "../global/Header";
import Sidebar from "../global/Sidebar";
import React, {useEffect} from "react";
import { useState } from "react";

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

import {useNavigate} from "react-router-dom";

function AddPatient() {


    const [id,setId]=useState('');
    const [name,setName]=useState('');
    const [age,setAge]=useState('');
    const [phone,setPhone]=useState('');
    const [sex,setSex]=useState('');
    const [address,setAddress]=useState('');
    const [description,setDescription]=useState('');

    const [submitted, setSubmitted] = useState(false);


    useEffect(()=>{
        if (!submitted){
            setId('');
            setName('');
            setAge('');
            setPhone('');
            setSex('');
            setAddress(''),
                setDescription('')
        }
    },[submitted]);

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
                                                value={id}
                                                onChange={e => setId(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Patient Name"
                                                name="name"
                                                variant="outlined"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Age"
                                                name="age"
                                                variant="outlined"
                                                type="number"
                                                value={age}
                                                onChange={e => setAge(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Phone Number"
                                                name="phone"
                                                variant="outlined"
                                                type="number"
                                                value={phone}
                                                onChange={e => setPhone(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                select
                                                fullWidth
                                                label="Sex"
                                                name="sex"
                                                variant="outlined"
                                                value={sex}
                                                onChange={e => setSex(e.target.value)}
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
                                                value={address}
                                                onChange={e => setAddress(e.target.value)}
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
                                                value={description}
                                                onChange={e => setDescription(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box display="flex" justifyContent="flex-end">

                                                <Button type="submit" variant="contained" color="secondary" sx={{marginRight:'720px'}}
                                                        onClick={()=>navigate('/patient')}>
                                                    Back
                                                </Button>

                                                <Button type="reset" variant="contained" color="error" sx={{marginRight:'10px'}}
                                                        onClick={()=>setSubmitted(false)}>
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
