import Header from "../global/Header";
import Sidebar from "../global/Sidebar";
import {useState} from "react";
import {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import {
    Container,
    Box,
    Paper,
    Typography,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton, DialogTitle, DialogContent, DialogActions, Dialog
} from '@mui/material';
import axios, {Axios} from "axios";
import {toast} from "react-toastify";
import UpdateDentist from "../Dentist/updateDentist";
import {useCookies} from "react-cookie";
import Swal from "sweetalert2";

function Dentist() {

    const navigate = useNavigate();
    const [dentist,setDentist]=useState([]);
    const [cookies, removeCookie] = useCookies([]);
    const [open, setOpen] = useState(false);
    const [selectedDentist, setSelectedDentist] = useState(null);
    const [username, setUsername] = useState("");

    useEffect(()=>{
        getDentist();

        const verifyCookie = async () => {
            if (!cookies.token) {
                /*navigate("/login");*/
            }
            const { data } = await axios.post(
                "http://localhost:3000",
                {},
                { withCredentials: true }
            );
            const { status, user } = data;
            console.log(data)
            setUsername(user);
            if (!status){
                (removeCookie("token"), navigate("/login"));
            }

        };
        verifyCookie();
    },[],[cookies, navigate, removeCookie])

    const Logout = () => {
        removeCookie("token");
        navigate("/home");
    };

    const getDentist=()=>{
        axios.get('http://localhost:3000/dentist/get')
            .then(response=>{
                setDentist(response.data || []);
            }).catch(error=>{
                console.error('Axios error',error);
        })
    }

    const handleSuccess = (msg) =>
        toast.success(msg, {
            position:'top-right'
        });

    const deleteDentist=(userId)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed){
                fetch('http://localhost:3000/dentist/delete',{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: userId })
                })
                    .then(response => {
                        getDentist();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }).catch(error => {
                    console.error('Axios error :', error);
                });
            }
        });
    }

    const handleClickOpen = (dentist = null) => {
        setSelectedDentist(dentist);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        getDentist();
    };


    return (
        <>
            <Header logout={Logout}/>

            <div className="main d-flex">
                <div className="sidebarWrapper">
                    <Sidebar />
                </div>

                <Box sx={{ display: 'flex', flexGrow: 1, bgcolor: '#F7F7F7' }}>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Container maxWidth="lg">
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                <Typography variant="h4">DENTIST DETAILS</Typography>
                            </Box>

                            <Grid container spacing={2}>
                                <Grid item xs={20}>
                                    <Box mt={-2}>
                                        <Paper sx={{ p: 2 }}>
                                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                                <Typography variant="h6"></Typography>
                                                <Button variant="contained" color="primary" onClick={()=>navigate('/addDentist') }>Add Dentist</Button>
                                            </Box>
                                            <TableContainer component={Paper}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Dentist ID</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Dentist Name</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Age</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Phone Number</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Sex</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Address</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Description</TableCell>
                                                            <TableCell sx={{fontWeight:'revert',fontSize:'revert'}}>Actions</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {dentist.length > 0 ? dentist.map(row=> (
                                                            <TableRow key={row.id}>
                                                                <TableCell component='th' scope="row">{row.id}</TableCell>
                                                                <TableCell component='th' scope="row">{row.name}</TableCell>
                                                                <TableCell component='th' scope="row">{row.age}</TableCell>
                                                                <TableCell component='th' scope="row">{row.number}</TableCell>
                                                                <TableCell component='th' scope="row">{row.sex}</TableCell>
                                                                <TableCell component='th' scope="row">{row.address}</TableCell>
                                                                <TableCell component='th' scope="row">{row.description}</TableCell>
                                                                <TableCell>
                                                                    <IconButton color="primary" onClick={()=>handleClickOpen(row)}>
                                                                        <Edit />
                                                                    </IconButton>
                                                                    <IconButton color="error" onClick={()=>deleteDentist(row.id)}>
                                                                        <Delete />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        )):(
                                                            <TableRow >
                                                                <TableCell>No Data</TableCell>
                                                            </TableRow>
                                                        )
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Paper>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Box>
            </div>

            <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
                <DialogTitle>Update Dentist</DialogTitle>
                <DialogContent>
                    <UpdateDentist payload={selectedDentist} onClose={handleClose} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>

        </>
    );
}

export default Dentist;
