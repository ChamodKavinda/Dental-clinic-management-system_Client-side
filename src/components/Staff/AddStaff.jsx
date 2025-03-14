import Header from "../global/Header";
import Sidebar from "../global/Sidebar";
import React, {useEffect,useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from "react-toastify";
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



function AddStaff() {


    const [id,setId] = useState('');
    const [name,setName] = useState('');
    const [age,setAge] = useState('');
    const [number,setNumber] = useState('');
    const [sex,setSex] = useState('');
    const [address,setAddress] = useState('');
    const [description,setDescription] = useState('');


    const navigate = useNavigate();
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

    useEffect(() => {
        fetchLastEmployeeId();
        if (id && name && age && number && sex && address) {
            setIsSubmitDisabled(false);
        } else {
            setIsSubmitDisabled(true);
        }

    }, [id, name, age, number, sex, address]);



    const handleSubmit = (e) => {
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

        axios.post('http://localhost:3000/employee/save', payload)
            .then(response => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Employee has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
                handleReset();
            }).catch(error => {
            console.error('Axios error :', error);
        });
    };

    const handleBlur = (field) => {
        setTouched({ ...touched, [field]: true });
    };

    const fetchLastEmployeeId = async () => {
        try {
            const response = await axios.get('http://localhost:3000/employee/last');

            if (Array.isArray(response.data) && response.data.length > 0) {
                const lastEmployee = response.data[response.data.length - 1];
                const lastId = lastEmployee?.id || "E000";
                const newIdNumber = parseInt(lastId.slice(1)) + 1;
                const newId = `E${String(newIdNumber).padStart(3, '0')}`;
                setId(newId);

            } else if (response.data?.id) {
                const lastId = response.data.id || "E000";
                const newIdNumber = parseInt(lastId.slice(1)) + 1;
                const newId = `E${String(newIdNumber).padStart(3, '0')}`;
                setId(newId);

            } else {
                const lastId = "E001";
                setId(lastId);
            }
        } catch (error) {
            console.error('Error fetching last employee ID:', error);
        }
    };

    return (
        <>
            <Header />

            <div className="main d-flex">
                <div className="sidebarWrapper">
                    <Sidebar />
                </div>


                <Box sx={{ display: 'flex', flexGrow: 1, bgcolor: '#F7F7F7',marginLeft: 30,marginTop: 8 }}>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Container maxWidth="lg">
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                <Typography variant="h4">ADD EMPLOYEE</Typography>
                            </Box>
                            <ToastContainer />
                            <Paper sx={{ p: 2 }}>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Employee ID"
                                                name="id"
                                                variant="outlined"
                                                value={id}
                                                onChange={e =>{setId(e.target.value)}}
                                                onBlur={() => handleBlur('id')}
                                                error={touched.id && !id}
                                                helperText={touched.id && !id ? "This field is required" : ""}
                                                required
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Employee Name"
                                                name="name"
                                                variant="outlined"
                                                value={name}
                                                onChange={e =>{setName(e.target.value)}}   
                                                onBlur={() => handleBlur('name')}
                                                error={touched.name && !name}
                                                helperText={touched.name && !name ? "This field is required" : ""}
                                                required                                         />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Age"
                                                name="age"
                                                variant="outlined"
                                                type="number"
                                                value={age}
                                                onChange={e =>{setAge(e.target.value)}} 
                                                onBlur={() => handleBlur('age')}
                                                error={touched.age && !age}
                                                helperText={touched.age && !age ? "This field is required" : ""}
                                                required                                           />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Phone Number"
                                                name="phone"
                                                variant="outlined"
                                                type="number"
                                                value={number}
                                                onChange={e =>{setNumber(e.target.value)}} 
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
                                                onChange={e =>{setSex(e.target.value)}}
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
                                                onChange={e =>{setAddress(e.target.value)}}
                                                onBlur={() => handleBlur('address')}
                                                error={touched.address && !address}
                                                helperText={touched.address && !address ? "This field is required" : ""}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Role"
                                                name="role"
                                                variant="outlined"
                                                multiline
                                                rows={4}
                                                value={description}
                                                onChange={e =>{setDescription(e.target.value)}}
                                                onBlur={() => handleBlur('description')}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box display="flex" justifyContent="flex-end">

                                                <Button type="submit" variant="contained" color="secondary" sx={{marginRight:'770px'}} onClick={()=>navigate('/staff')}>
                                                    Back
                                                </Button>

                                                <Button type="reset" variant="contained" color="error" sx={{marginRight:'10px'}}
                                                        onClick={handleReset}>
                                                    Reset
                                                </Button>
                                                <Button type="submit" variant="contained" color="primary" disabled={isSubmitDisabled}>
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

export default AddStaff;
