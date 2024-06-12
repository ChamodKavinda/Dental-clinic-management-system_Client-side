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
import axios from "axios";

function AddAppointment() {
    const [id, setId] = useState('');
    const [patientId, setPatient] = useState('');
    const [dentistId, setDentist] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');

    const [patient,setPatientData]=useState([]);
    const [dentist,setDentistData]=useState([]);

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [touched, setTouched] = useState({
        id: false,
        patientId: false,
        dentistId: false,
        email: false,
        date: false,
        time: false,
        description: false
    });

    const handleSuccess = (msg) =>
        toast.success(msg, {
            position:'top-right'
        });


    const fetchAllData = async () => {
        try {
            const [patientsRes, dentistsRes] = await Promise.all([
                axios.get('http://localhost:3000/patient/get'),
                axios.get('http://localhost:3000/dentist/get'),
            ]);

            setPatientData(patientsRes.data || []);
            setDentistData(dentistsRes.data || []);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchAllData();
        if (id && time && patientId && dentistId && email && date) {
            setIsSubmitDisabled(false);
        } else {
            setIsSubmitDisabled(true);
        }
    }, [id, time, patientId, dentistId, email, date]);

    const handleReset = () => {
        setId('');
        setPatient('');
        setDentist('');
        setEmail('');
        setDate('');
        setTime('');
        setDescription('');
        setTouched({
            id: false,
            time: false,
            patientId: false,
            dentistId: false,
            email: false,
            date: false,
            description: false
        });
    };

    const navigate = useNavigate();


    const handleSubmit = (e) => {

        e.preventDefault();

        const payload = {
            id: id,
            time: time,
            patientId: patientId,
            dentistId: dentistId,
            email: email,
            date: date,
            description: description
        };

        Axios.post('http://localhost:3000/appointment/save', payload)
            .then(response => {

                Axios.post('http://localhost:3000/api/sendEmail', {
                    email: email,
                    subject: 'Appointment Confirmation',
                    message: `Dear patient, your appointment is scheduled on ${date} at ${time}.
                    Thankyou for contacting Us!`
                })
                    .then(response => {
                        console.log('Email sent successfully:', response);
                    })
                    .catch(error => {
                        console.error('Error sending email:', error);
                    });

                console.log(response);
            }).catch(error => {
            console.error('Axios error :', error);
        });
        console.log(payload);

        handleSuccess('Saved Successfully');
        handleReset();
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
                                <Typography variant="h4">ADD APPOINTMENT</Typography>
                            </Box>
                            <ToastContainer />
                            <Paper sx={{ p: 3 }}>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Appointment ID"
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
                                                select
                                                fullWidth
                                                label="Patient Id"
                                                name="Patient Id"
                                                variant="outlined"
                                                value={patientId}
                                                onChange={e => setPatient(e.target.value)}
                                                onBlur={() => handleBlur('patientId')}
                                                error={touched.patientId && !patientId}
                                                helperText={touched.patientId && !patientId ? "This field is required" : ""}
                                                required
                                            >
                                                {
                                                    patient.map(patients=>(
                                                        <MenuItem value={patients.id} key={patients.id}>
                                                            {patients.id}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </TextField>

                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                select
                                                fullWidth
                                                label="Dentist Id"
                                                name="Dentist Id"
                                                variant="outlined"
                                                value={dentistId}
                                                onChange={e => setDentist(e.target.value)}
                                                onBlur={() => handleBlur('dentistId')}
                                                error={touched.dentistId && !dentistId}
                                                helperText={touched.dentistId && !dentistId ? "This field is required" : ""}
                                                required
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
                                                label="Email"
                                                name="email"
                                                variant="outlined"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                onBlur={() => handleBlur('email')}
                                                error={touched.email && !email}
                                                helperText={touched.email && !email ? "This field is required" : ""}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth

                                                name="date"
                                                variant="outlined"
                                                type="date"
                                                value={date}
                                                onChange={e => setDate(e.target.value)}
                                                onBlur={() => handleBlur('date')}
                                                error={touched.date && !date}
                                                helperText={touched.date && !date ? "This field is required" : ""}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth

                                                name="time"
                                                variant="outlined"
                                                type="time"
                                                value={time}
                                                onChange={e => setTime(e.target.value)}
                                                onBlur={() => handleBlur('time')}
                                                error={touched.time && !time}
                                                helperText={touched.time && !time ? "This field is required" : ""}
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
                                                    onClick={() => navigate('/appointment')}
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

export default AddAppointment;
