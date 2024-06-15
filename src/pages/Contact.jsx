import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, TextField, Button, Box , Modal } from '@mui/material';
import { CgMenuRightAlt } from "react-icons/cg";
import logo from '../assets/teeth.png'; 
import { useState } from 'react';
import Navbar from '../global/Navbar';

const Contact = () => {

    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
    };

  return (
    <div>
      <AppBar position="static" color="default" elevation={7} sx={{height:'80px'}}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, display: 'flex', alignItems: 'center',fontWeight:900 }}>
            <img src={logo} alt="logo" style={{ marginRight: 10, height: 40,backgroundColor:'black' }} />
            DENTAL CARE PRO
          </Typography>
          <IconButton color="inherit" aria-label="menu" sx={{marginRight:'100px',marginTop:'10px'}} onClick={handleOpenModal}>
            <CgMenuRightAlt size={40} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box>
          <Navbar open={modalOpen} onClose={handleCloseModal} />
        </Box>
      </Modal>


      <Box display="flex" justifyContent="center" alignItems="flex-start" padding={3}>
        <Box component="form" sx={{ width: '40%', marginRight: 4,marginLeft:'-300px' }}>
          <Typography variant="h5" sx={{fontWeight:800}} gutterBottom>PROBLEMS?</Typography>
          <Typography variant="h5" sx={{fontWeight:800}} gutterBottom>WE'RE HERE TO HELP YOU.</Typography>
          <TextField label="First name" fullWidth margin="normal" />
          <TextField label="Last name" fullWidth margin="normal" />
          <TextField label="Email" fullWidth margin="normal" />
          <TextField label="Message" fullWidth margin="normal" multiline rows={4} />
          <Button variant="contained" color="primary" type="submit" fullWidth>Submit</Button>
        </Box>

        <Box>
          <Typography variant="h7" gutterBottom sx={{fontWeight:700}}>CONTACT US</Typography>
          <Typography>0756584211</Typography>
          <Typography>dentalcare01@gmail.com</Typography>
        </Box>

        <Box sx={{paddingLeft:'50px'}}>
           <Typography variant="h7" gutterBottom style={{ marginTop: 16 }} sx={{fontWeight:700}}>MAIN BRANCH</Typography>
          <Typography>Colombo, Sri Lanka</Typography> 
        </Box>
      </Box>
    </div>
  );
};

export default Contact;
