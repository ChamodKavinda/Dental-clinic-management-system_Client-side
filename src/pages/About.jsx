import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, TextField, Button, Box , Modal } from '@mui/material';
import { CgMenuRightAlt } from "react-icons/cg";
import logo from '../assets/teeth.png'; 
import { useState } from 'react';
import Navbar from '../global/Navbar';

const About = () => {

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

    </div>
  );
};

export default About;
