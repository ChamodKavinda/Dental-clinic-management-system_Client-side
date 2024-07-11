
import { AppBar, Toolbar, Typography, IconButton, TextField, Button, Box , Modal } from '@mui/material';
import { CgMenuRightAlt } from "react-icons/cg";
import logo from '../assets/logoo.png';
import { useState } from 'react';
import Navbar from '../global/Navbar';
import emailjs from '@emailjs/browser';
import React, { useRef } from 'react';
import {toast, ToastContainer} from "react-toastify";
import { useNavigate } from "react-router-dom";

const Contact = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSuccess = (msg) => toast.success(msg, { position: "top-right" });

    const navigate = useNavigate();

    const handleOpenModal = () => {
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
    };

    const form = useRef();

    const handleSubmit = (e) =>{
        e.preventDefault();
        const serviceId = "service_ye50jdi";
        const templateId = "template_9yrt9u9";
        const publicKey = "6sxhfn4uG-nQPCpgh";

        const templateParams={
            from_name:name,
            from_email:email,
            to_name:'dentalcarepro0@gmail.com',
            message:message
        }

        emailjs.send(serviceId,templateId,templateParams,publicKey)
            .then((response)=>{
                handleSuccess("Email Send Successfully!");
                setName('');
                setEmail('');
                setMessage('');
            }).catch((error) =>{
                console.error(error);
        })
    };

  return (
    <div>
      <AppBar position="static" color="default" elevation={7} sx={{height:'80px'}}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, display: 'flex', alignItems: 'center',fontWeight:900 }}>
            <img src={logo} alt="logo" style={{ marginLeft: '50px', height: 40,cursor:"pointer"}} onClick={() => navigate('/Home')} />

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


        <form onSubmit={handleSubmit}>
      <Box display="flex" justifyContent="center"  alignItems="right" padding={5}>
        <Box component="form" sx={{ width: '40%', marginRight: 4,marginLeft:'-300px' }}>
          <Typography variant="h5" sx={{fontWeight:800}} gutterBottom>PROBLEMS?</Typography>
          <Typography variant="h5" sx={{fontWeight:800}} gutterBottom>WE'RE HERE TO HELP YOU.</Typography>

          <TextField label="Full Name" fullWidth margin="normal" value={name} onChange={(e)=>setName(e.target.value)} />
          <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <TextField label="Message" fullWidth margin="normal" value={message} multiline rows={4} onChange={(e)=>setMessage(e.target.value)} />
          <Button variant="contained" color="primary" type="submit" fullWidth onClick={handleSubmit}>Submit</Button>

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

        </form>
        <ToastContainer />
    </div>
  );
};

export default Contact;
