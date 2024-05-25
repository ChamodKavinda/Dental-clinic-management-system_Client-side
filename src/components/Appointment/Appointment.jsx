import Header from "../global/Header";
import Sidebar from "../global/Sidebar";
import React from "react";
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
                                        backgroundColor:'#E1E2E2',
                                        marginBottom:'30px',
                                        display:'block',
                                    }}
                                >
                                    <Grid item xs={12} sm={6} sx={{display:'flex'}}>
                                        <Typography component={'h1'} sx={{color:'#000000',paddingBottom:'10px'}}>Add Appointment</Typography>
                                    </Grid>

                                    <Grid>
                                        <Typography component={'label'} htmlFor="id" sx={{color:'#000000',marginRight:'20px',fontSize:'15px',width:'100px',display:'block'}}>
                                            Appointment ID
                                        </Typography>
                                        <Input
                                            type="number"
                                            id='id'
                                            name="id"
                                            sx={{width:'400px'}}
                                            value={''}
                                            onChange={e => {}}
                                        />
                                    </Grid>


                                    <Grid>
                                        <Typography component={'label'} htmlFor="id" sx={{color:'#000000',marginRight:'20px',fontSize:'15px',width:'100px',display:'block'}}>
                                            Patient Name
                                        </Typography>
                                        <Input
                                            type="number"
                                            id='name'
                                            name="name"
                                            sx={{width:'400px'}}
                                            value={''}
                                            onChange={e => {}}
                                        />
                                    </Grid>

                                    <Grid>
                                        <Typography component={'label'} htmlFor="id" sx={{color:'#000000',marginRight:'20px',fontSize:'15px',width:'100px',display:'block'}}>
                                            Dentist
                                        </Typography>
                                        <Input
                                            type="number"
                                            id='name'
                                            name="name"
                                            sx={{width:'400px'}}
                                            value={''}
                                            onChange={e => {}}
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
                                            value={''}
                                            onChange={e => {}}
                                        />
                                    </Grid>


                                    <Grid>
                                        <Typography component={'label'} htmlFor="id" sx={{color:'#000000',marginRight:'20px',fontSize:'15px',width:'100px',display:'block'}}>
                                            Time
                                        </Typography>
                                        <Input
                                            type="time"
                                            id='name'
                                            name="name"
                                            sx={{width:'400px'}}
                                            value={''}
                                            onChange={e => {}}
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
                                >
                                    Add Appointment
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
                                            <TableRow>
                                                <TableCell component='th' scope="row">P01</TableCell>
                                                <TableCell component='th' scope="row">kamal</TableCell>
                                                <TableCell component='th' scope="row">Dr.perera</TableCell>
                                                <TableCell component='th' scope="row">2024/05/20</TableCell>
                                                <TableCell component='th' scope="row">9.00am</TableCell>
                                                <Button
                                                sx={{margin:'0px 10px'}}
                                                onClick={()=>{}}
                                                >
                                                    Update
                                                </Button>

                                                <Button
                                                    sx={{margin:'0px 10px'}}
                                                    onClick={()=>{}}
                                                >
                                                    Delete
                                                </Button>

                                            </TableRow>
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