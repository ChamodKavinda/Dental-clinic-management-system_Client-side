import Header from "../global/Header";
import Sidebar from "../global/Sidebar";
import React, {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import axios, {Axios} from "axios";

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
import {toast, ToastContainer} from "react-toastify";



function AddDentist() {

    const [submitted, setSubmitted] = useState(false);

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [number, setNumber] = useState('');
    const [sex, setSex] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');

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


    const handleSubmit = (e) => {
        handleSuccess('Saved Successfully');
        e.preventDefault();

        const payload={
            id: id,
            name: name,
            age: age,
            number: number,
            sex: sex,
            address: address,
            description: description
        };

        axios.post('http://localhost:3000/dentist/save',payload)
            .then(response=>{
                console.log(response);
            }).catch(error=>{
                console.error('Axios error :',error)
        })

        console.log(dentist);
    };

    const handleSuccess = (msg) =>
        toast.success(msg, {
            position:'top-right'
        });

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
                            <ToastContainer />
                            <Paper sx={{ p: 3 }}>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Dentist ID"
                                                name="id"
                                                variant="outlined"
                                                value={id}
                                                onChange={e =>setId(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Dentist Name"
                                                name="name"
                                                variant="outlined"
                                                value={name}
                                                onChange={e =>setName(e.target.value)}
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
                                                onChange={e =>setAge(e.target.value)}
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
                                                onChange={e =>setNumber(e.target.value)}
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
                                                onChange={e =>setSex(e.target.value)}
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
                                                onChange={e =>setAddress(e.target.value)}
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
                                                onChange={e =>setDescription(e.target.value)}
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
