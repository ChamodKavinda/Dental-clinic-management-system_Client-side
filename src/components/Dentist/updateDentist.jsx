import React, {useEffect,useState} from "react";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import {
    Container,
    Box,
    Grid,
    TextField,
    MenuItem,
    Button
} from '@mui/material';

function UpdateDentist({payload,onClose}) {

    const [id,setId] = useState('');
    const [name,setName] = useState('');
    const [age,setAge] = useState('');
    const [number,setNumber] = useState('');
    const [sex,setSex] = useState('');
    const [address,setAddress] = useState('');
    const [description,setDescription] = useState('');
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
        setName('');
        setAge('');
        setNumber('');
        setSex('');
        setAddress('');
        setDescription('');
        setTouched({
            name: false,
            age: false,
            number: false,
            sex: false,
            address: false,
            description: false
        });
    };

    useEffect(() => {
        if (payload) {
            setId(payload.id || '');
            setName(payload.name || '');
            setAge(payload.age || '');
            setNumber(payload.number || '');
            setSex(payload.sex || '');
            setAddress(payload.address || '');
            setDescription(payload.description || '');
        }
    }, [payload]);


    useEffect(() => {
        if (id && name && age && number && sex && address) {
            setIsSubmitDisabled(false);
        } else {
            setIsSubmitDisabled(true);
        }
    }, [id, name, age, number, sex, address]);


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

        axios.put('http://localhost:3000/dentist/update', payload)
            .then(response => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your dentist has been updated",
                    showConfirmButton: false,
                    timer: 1500
                });
                window.location.reload();
            }).catch(error => {
            console.error('Axios error :', error);
        });

        onClose();
        handleSuccess('Updated Successfully');
        axios.get('http://localhost:3000/dentist/get')
            .then(response=>{
            }).catch(error=>{
            console.error('Axios error',error);
        })
    };

    const handleBlur = (field) => {
        setTouched({ ...touched, [field]: true });
    };

    return (
        <>
            <div className="main d-flex">
                <Box sx={{ display: 'flex', flexGrow: 1, bgcolor: '#F7F7F7' }}>
                    <Box component="main" sx={{ flexGrow: 1, p: 0}}>
                        <Container maxWidth="lg">
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2} sx={{marginTop:'5px'}}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Dentist ID"
                                                name="id"
                                                variant="outlined"
                                                value={id}
                                                onChange={e =>{setId(e.target.value)}}
                                                onBlur={() => handleBlur('id')}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Dentist Name"
                                                name="name"
                                                variant="outlined"
                                                value={name}
                                                onChange={e =>{setName(e.target.value)}}
                                                onBlur={() => handleBlur('name')}
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
                                                onChange={e =>{setAge(e.target.value)}}
                                                onBlur={() => handleBlur('age')}
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
                                                onChange={e =>{setNumber(e.target.value)}}
                                                onBlur={() => handleBlur('number')}
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
                                                onChange={e =>{setDescription(e.target.value)}}
                                                onBlur={() => handleBlur('description')}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box display="flex" justifyContent="flex-end">
                                                <Button type="reset" variant="contained" color="error" sx={{marginRight:'10px'}}
                                                        onClick={handleReset}>
                                                    Reset
                                                </Button>
                                                <Button type="submit" variant="contained" color="primary"  disabled={isSubmitDisabled}>
                                                    Update
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </form>
                        </Container>
                    </Box>
                </Box>
            </div>
        </>
    );
}

export default UpdateDentist;
