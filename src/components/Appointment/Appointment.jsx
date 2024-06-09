import Header from "../global/Header";
import Sidebar from "../global/Sidebar";
import {useEffect, useState} from "react";
import Axios from "axios";


import {
    Grid,
    Typography,
    Input,
    Button,
    TableContainer,
    Paper,
    Table,
    TableRow,
    TableCell,
    TableHead, TableBody
} from "@mui/material";

const Appointment = () =>{

    const [id,setId]=useState(0);
    const [patient,setPatient]=useState('');
    const [dentist,setDentist]=useState('');
    const [date,setDate]=useState('');
    const [time,setTime]=useState('');
    const [isEdit,setIsEdit]=useState(false);

    const [appointment,setAppointment]=useState([]);
    const [submitted, setSubmitted] = useState(false);


    useEffect(()=>{
        if (!submitted){
            setId(0);
            setPatient('');
            setDentist('');
            setDate('');
            setTime('');
        }
    },[submitted]);

    useEffect(()=>{
        getAppointment();
    },[]);


    const setSelectedAppointment = (appointment)=>{
        setId(appointment.id);
        setPatient(appointment.patient);
        setDentist(appointment.dentist);
        setDate(appointment.date);
        setTime(appointment.time);

        setIsEdit(true);

    };

    const getAppointment = ()=>{
        Axios.get('http://localhost:3000/appointment/get')
            .then(response =>{
                setAppointment(response.data || []);
            }).catch(error =>{
                console.error("Axios error :",error)
        });
    }


    const saveAppointment = () => {
        setSubmitted(true);

        const payload = {
            id: id,
            patient: patient,
            dentist: dentist,
            date: date,
            time: time
        };

        Axios.post('http://localhost:3000/appointment/save', payload)
            .then(response => {
                getAppointment();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error => {
                console.error("Axios error :", error)
            });
    }

        const updateAppointment = ()=>{
            setSubmitted(true);


            const payload = {
                id: id,
                patient: patient,
                dentist: dentist,
                date: date,
                time: time
            };

            Axios.put('http://localhost:3000/appointment/update', payload)
                .then(response => {
                    getAppointment();
                    setSubmitted(false);
                    setIsEdit(false);
                })
                .catch(error => {
                    console.error("Axios error :", error)
                });
        }


        const deleteAppointment = (userId)=>{


        const confirmed = confirm("Are you sure you want to delete this user?");

        if (confirmed){
            fetch('http://localhost:3000/appointment/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: userId })
            })
                .then(response =>{
                    getAppointment();

                }).catch(error=>{
                console.error("Axios error :", error)
            });
        }


    }


    return(
        <>
            <Header/>

            <div className="main d-flex">
                <div className="sidebarWrapper">
                    <Sidebar/>
                </div>


                <div className="right-content w-100">
                    <div className="row dashboardBoxWrapperRow">
                        <div className="col-md-9">
                            <div className="dashboardBoxWrapper d-flex">

                                <Grid
                                    container
                                    spacing={1}
                                    sx={{
                                        backgroundColor:'white',
                                        marginBottom:'30px',
                                        display:'block',
                                    }}
                                >
                                    <Grid item xs={12} sm={6} sx={{display:'flex'}}>
                                        <Typography component={'h1'} sx={{color:'#000000',paddingBottom:'10px'}}>Add Appointment</Typography>
                                    </Grid>

                                    <Grid>
                                        <Typography component={'label'} htmlFor="id" sx={{color:'#000000',marginRight:'20px',fontSize:'15px',width:'100px',display:'block'}}>
                                            ID
                                        </Typography>
                                        <Input
                                            type="number"
                                            id='id'
                                            name="id"
                                            sx={{width:'400px'}}
                                            value={id}
                                            onChange={e => setId(e.target.value)}
                                        />
                                    </Grid>


                                    <Grid>
                                        <Typography component={'label'} htmlFor="id" sx={{color:'#000000',marginRight:'20px',fontSize:'15px',width:'100px',display:'block'}}>
                                            Patient Name
                                        </Typography>
                                        <Input
                                            type="String"
                                            id='patient'
                                            name="patient"
                                            sx={{width:'400px'}}
                                            value={patient}
                                            onChange={e => setPatient(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid>
                                        <Typography component={'label'} htmlFor="id" sx={{color:'#000000',marginRight:'20px',fontSize:'15px',width:'100px',display:'block'}}>
                                            Dentist
                                        </Typography>
                                        <Input
                                            type="String"
                                            id='dentist'
                                            name="dentist"
                                            sx={{width:'400px'}}
                                            value={dentist}
                                            onChange={e => setDentist(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid>
                                        <Typography component={'label'} htmlFor="id" sx={{color:'#000000',marginRight:'20px',fontSize:'15px',width:'100px',display:'block'}}>
                                            Date
                                        </Typography>
                                        <Input
                                            type="date"
                                            id='name'
                                            name="name"
                                            sx={{width:'400px'}}
                                            value={date}
                                            onChange={e => setDate(e.target.value)}
                                        />
                                    </Grid>


                                    <Grid>
                                        <Typography component={'label'} htmlFor="time" sx={{color:'#000000',marginRight:'20px',fontSize:'15px',width:'100px',display:'block'}}>
                                            Time
                                        </Typography>
                                        <Input
                                            type="time"
                                            id='name'
                                            name="name"
                                            sx={{width:'400px'}}
                                            value={time}
                                            onChange={e => setTime(e.target.value)}
                                        />
                                    </Grid>


                                </Grid>

                                <Button
                                    sx={{
                                        margin:'auto',
                                        marginBottom:'20px',
                                        backgroundColor:'#00c6e6',
                                        color:'#000000',
                                        marginLeft:'0px',
                                        '&:hover':{
                                            opacity:'0.8',
                                            backgroundColor:'#00c6e6'
                                        }
                                    }}
                                    onClick={()=> isEdit ? updateAppointment() : saveAppointment()}
                                >
                                    {
                                        isEdit ? 'Update Appointment' : 'Add Appointment'
                                    }
                                </Button>


                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ID</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Dentist</TableCell>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Time</TableCell>
                                                <TableCell>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>

                                            {
                                                appointment.length > 0 ? appointment.map(row =>(
                                                    <TableRow key={row.id}>
                                                        <TableCell component='th' scope="row">{row.id}</TableCell>
                                                        <TableCell component='th' scope="row">{row.patient}</TableCell>
                                                        <TableCell component='th' scope="row">{row.dentist}</TableCell>
                                                        <TableCell component='th' scope="row">{row.date}</TableCell>
                                                        <TableCell component='th' scope="row">{row.time}</TableCell>
                                                        <TableCell>
                                                            <Button
                                                                sx={{margin:'0px 10px'}}
                                                                onClick={()=>{setSelectedAppointment(row)}}
                                                            >
                                                                Update
                                                            </Button>

                                                            <Button
                                                                sx={{margin:'0px 10px'}}
                                                                onClick={()=>deleteAppointment(row.id)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                )) : (
                                                    <TableRow >
                                                        <TableCell component='th' scope="row">No Data</TableCell>
                                                    </TableRow>
                                                )
                                            }

                                        </TableBody>
                                    </Table>
                                </TableContainer>


                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </>
    );
}

export default Appointment