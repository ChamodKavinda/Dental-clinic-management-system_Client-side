
import {AppBar, Toolbar, Typography, IconButton, TextField, Button, Box, Modal, Link} from '@mui/material';
import { CgMenuRightAlt } from "react-icons/cg";
import logo from '../assets/logoo.png';
import { useState } from 'react';
import Navbar from '../global/Navbar';
import emailjs from '@emailjs/browser';
import React, { useRef } from 'react';
import {toast, ToastContainer} from "react-toastify";
import { useNavigate } from "react-router-dom";
import contactUs from '../assets/contactus.png';
import {styled} from "@mui/system";

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

    const Footer = styled('footer')(({ theme }) => ({
        backgroundColor: '#e8eae3',
        color: '#181818',
        padding: theme.spacing(3),
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            textAlign: 'left',
            padding: theme.spacing(3, 6),
        },
    }));

  return (
      <>
    <div>
      <AppBar position="static" color="default" elevation={1} sx={{height:'80px'}}>
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
        <div className="flex justify-center items-start p-10">
            <div className="bg-[#E8E6D9] p-10 rounded-lg shadow-lg w-full max-w-4xl flex">
                <div className="w-1/2 pr-10">
                    <h1 className="text-4xl font-bold text-[#2E4A21] mb-4">Get In Touch.</h1>
                    <p className="font-bold mb-2">DentalCare Pro is located in Srilanka.</p>
                    <p>Clinic</p>
                    <p>Colombo,Srilanka</p>
                    <p>SriLanka</p>
                    <p><span className="font-bold">Phone:</span> 519-833-0800</p>
                    <img src={contactUs} alt="contactUs" className="mt-4"/>
                </div>
                <div className="w-1/2">
                    <p className="text-sm mb-4">PROBLEMS? WE'RE HERE TO HELP YOU.</p>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-1" htmlFor="name">Full Name*</label>
                            <input type="text" id="name" className="w-full p-2 border border-gray-300 rounded"value={name} onChange={(e)=>setName(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1" htmlFor="location">Email*</label>
                            <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded"value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1" htmlFor="message">Message (optional)</label>
                            <textarea id="message" className="w-full p-2 border border-gray-300 rounded h-32" value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
                        </div>
                        <button type="submit" className="bg-black text-white px-4 py-2 rounded" onClick={handleSubmit} disabled={!name || !email}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
        <ToastContainer />

    </div>
    <Footer sx={{marginTop:'100px'}}>
        <Typography sx={{
            marginBottom: '20px',
            fontSize: { xs: '20px', md: '24px' },
            fontWeight: 900
        }}>
            Dental Care Pro
        </Typography>
        <Typography variant="body2">
            &copy; {new Date().getFullYear()} Dental Care Pro. All rights reserved.
        </Typography>
        <Typography variant="body2">
            <Link href="/" color="inherit">
                Privacy Policy
            </Link>{' '}
            |{' '}
            <Link href="/" color="inherit">
                Terms of Service
            </Link>
        </Typography>
    </Footer>
      </>
  );
};

export default Contact;
