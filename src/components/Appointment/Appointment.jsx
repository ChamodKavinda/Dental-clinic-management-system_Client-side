import Header from "../global/Header";
import Sidebar from "../global/Sidebar";
import React from "react";
import {Grid, Typography, Input, Button} from "@mui/material";

const Appointment = props =>{

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

                                    <Grid>
                                        <Typography component={'label'} htmlFor="id" sx={{color:'#000000',marginRight:'20px',fontSize:'15px',width:'100px',display:'block'}}>
                                            message
                                        </Typography>
                                        <Input
                                            type="comment"
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

                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </>
    );
}

export default Appointment