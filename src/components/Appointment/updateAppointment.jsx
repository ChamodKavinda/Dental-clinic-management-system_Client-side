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

function UpdateAppointment({payload,onClose}) {
    const [id,setId] = useState('');
    const [patientId,setPatientId] = useState('');
    const [dentistId,setDentistId] = useState('');
    const [date,setDate] = useState('');
    const [time,setTime] = useState('');
    const [email,setEmail] = useState('');
    const [description,setDescription] = useState('');

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [dentist,setDentistData]=useState([]);
    const [touched, setTouched] = useState({
        id: false,
        patientId: false,
        dentistId: false,
        date: false,
        time: false,
        email: false,
        description: false
    });

    const handleReset = () => {
        setPatientId('');
        setDentistId('');
        setDate('');
        setTime('');
        setEmail('');
        setDescription('');
        setTouched({
            patientId: false,
            dentistId: false,
            date: false,
            time: false,
            email: false,
            description: false
        });
    };


    useEffect(() => {
        fetchAllData();
        if (payload) {
            setId(payload.id || '');
            setPatientId(payload.patientId || '');
            setDentistId(payload.dentistId || '');
            setDate(payload.date || '');
            setTime(payload.time || '');
            setEmail(payload.email || '');
            setDescription(payload.description || '');
        }
    }, [payload]);


    useEffect(() => {
        if (id && patientId && dentistId && date && time && email) {
            setIsSubmitDisabled(false);
        } else {
            setIsSubmitDisabled(true);
        }
    }, [id, patientId, dentistId, date, time, email]);

    const fetchAllData = async () => {
        try {
            const [dentistsRes] = await Promise.all([
                axios.get('http://localhost:3000/dentist/get'),
            ]);

            setDentistData(dentistsRes.data || []);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSubmit = (e) => {
        handleReset();
        e.preventDefault();
        const payload = {
            id: id,
            patientId: patientId,
            dentistId: dentistId,
            date: date,
            time: time,
            email:email,
            description: description
        };

        axios.put('http://localhost:3000/appointment/update', payload)
            .then(response => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your appointment has been updated",
                    showConfirmButton: false,
                    timer: 1500
                });
            }).catch(error => {
            console.error('Axios error :', error);
        });

        onClose();

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
                                <form onSubmit={handleSubmit} >
                                    <Grid container spacing={2} sx={{marginTop:'5px'}}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Appointment ID"
                                                name="id"
                                                variant="outlined"
                                                value={id}
                                                onChange={e =>{setId(e.target.value)}}
                                                onBlur={() => handleBlur('Appointment ID')}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Patient ID"
                                                name="pid"
                                                variant="outlined"
                                                value={patientId}
                                                onChange={e =>{setPatientId(e.target.value)}}
                                                onBlur={() => handleBlur('Patient ID')}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                select
                                                fullWidth
                                                label="Dentist ID"
                                                name="Dentist ID"
                                                variant="outlined"
                                                value={dentistId}
                                                onChange={e =>{setDentistId(e.target.value)}}
                                                onBlur={() => handleBlur('Dentist ID')}
                                            >
                                                {
                                                    dentist.map(d=>(
                                                        <MenuItem value={d.id} key={d.id}>
                                                            {d.id}
                                                        </MenuItem>
                                                    ))

                                                }


                                            </TextField>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Date"
                                                name="date"
                                                variant="outlined"
                                                type="Date"
                                                value={date}
                                                onChange={e =>{setDate(e.target.value)}}
                                                onBlur={() => handleBlur('Date')}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Time"
                                                name="time"
                                                variant="outlined"
                                                type="Time"
                                                value={time}
                                                onChange={e =>{setTime(e.target.value)}}
                                                onBlur={() => handleBlur('Time')}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                name="email"
                                                variant="outlined"
                                                value={email}
                                                onChange={e =>{setEmail(e.target.value)}}
                                                onBlur={() => handleBlur('Email')}
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

export default UpdateAppointment;
