import Header from "../global/Header";
import Sidebar from "../global/Sidebar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
import Swal from "sweetalert2";

function AddPatient() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [number, setNumber] = useState('');
    const [sex, setSex] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [touched, setTouched] = useState({
        id: false,
        name: false,
        age: false,
        number: false,
        sex: false,
        address: false,
        description: false
    });

    const handleSuccess = (msg) =>
        toast.success(msg, {
            position:'top-right'
        });

    useEffect(() => {
        if (id && name && age && number && sex && address) {
            setIsSubmitDisabled(false);
        } else {
            setIsSubmitDisabled(true);
        }
    }, [id, name, age, number, sex, address]);

    const handleReset = () => {
        setId('');
        setName('');
        setAge('');
        setNumber('');
        setSex('');
        setAddress('');
        setDescription('');
        setTouched({
            id: false,
            name: false,
            age: false,
            number: false,
            sex: false,
            address: false,
            description: false
        });
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {

        handleReset();
        e.preventDefault();
        const payload = {
            id: id,
            name: name,
            age: age,
            number: number,
            sex: sex,
            address: address,
            description: description
        };

        Axios.post('http://localhost:3000/patient/save', payload)
            .then(response => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Patient has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            }).catch(error => {
            console.error('Axios error :', error);
        });

    };

    const handleBlur = (field) => {
        setTouched({ ...touched, [field]: true });
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
                            <ToastContainer />
                            <Paper sx={{ p: 3 }}>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Patient ID"
                                                name="id"
                                                id="id"
                                                variant="outlined"
                                                value={id}
                                                onChange={e => setId(e.target.value)}
                                                onBlur={() => handleBlur('id')}
                                                error={touched.id && !id}
                                                helperText={touched.id && !id ? "This field is required" : ""}
                                                required
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
                                                onBlur={() => handleBlur('name')}
                                                error={touched.name && !name}
                                                helperText={touched.name && !name ? "This field is required" : ""}
                                                required
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
                                                onBlur={() => handleBlur('age')}
                                                error={touched.age && !age}
                                                helperText={touched.age && !age ? "This field is required" : ""}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Phone Number"
                                                name="phone"
                                                variant="outlined"
                                                type="number"
                                                value={number}
                                                onChange={e => setNumber(e.target.value)}
                                                onBlur={() => handleBlur('number')}
                                                error={touched.number && !number}
                                                helperText={touched.number && !number ? "This field is required" : ""}
                                                required
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
                                                onBlur={() => handleBlur('sex')}
                                                error={touched.sex && !sex}
                                                helperText={touched.sex && !sex ? "This field is required" : ""}
                                                required
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
                                                onBlur={() => handleBlur('address')}
                                                error={touched.address && !address}
                                                helperText={touched.address && !address ? "This field is required" : ""}
                                                required
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
                                                <Button
                                                    type="button"
                                                    variant="contained"
                                                    color="secondary"
                                                    sx={{ marginRight: '720px' }}
                                                    onClick={() => navigate('/patient')}
                                                >
                                                    Back
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="contained"
                                                    color="error"
                                                    sx={{ marginRight: '10px' }}
                                                    onClick={handleReset}
                                                >
                                                    Reset
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    disabled={isSubmitDisabled}
                                                >
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
