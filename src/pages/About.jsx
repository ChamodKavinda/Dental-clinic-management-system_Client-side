import React, {useEffect} from 'react';
import {AppBar, Toolbar, Typography, IconButton, Box, Modal, Container, Grid, Link} from '@mui/material';
import { CgMenuRightAlt } from "react-icons/cg";
import about from '../assets/about4.jpg';
import about1 from '../assets/about3.jpg';
import { useState } from 'react';
import Navbar from '../global/Navbar';
import dental from '../assets/logo.jpg';
import './app.css';
import {useNavigate} from "react-router-dom";
import logo from "../assets/logoo.png";
import {styled} from "@mui/system";


const About = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const navigate = useNavigate();

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        const elements = document.querySelectorAll('.fade-in-section');
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    } else {
                        entry.target.classList.remove('is-visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        elements.forEach(element => {
            observer.observe(element);
        });

        return () => {
            elements.forEach(element => {
                observer.unobserve(element);
            });
        };
    }, []);

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
        <div className="flex flex-col items-center">
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
            <main className="flex flex-col items-center mt-16">
                <h1 className="text-4xl font-light">Who <span className="text-green-500 font-medium">we are</span></h1>
                <p className="text-center text-gray-600 mt-8 max-w-2xl">
                    At Dental Care Pro, we are committed to providing modern, high-quality dental services to ensure your smile is healthy and bright. Our skilled team uses advanced technology and personalized care to offer a full range of treatments, from preventive cleaning and dental fillings to more specialized services like sealants and extractions. With a focus on comfort and care, we aim to make every visit stress-free and tailored to your unique needs, so you can leave with confidence in your dental health.
                </p>
                <div className="flex justify-center items-center bg-white mt-8 mb-5">
                <div className="grid grid-cols-3 gap-5">
                    <img alt="A hand in a blue glove holding a large tooth model with dental tools in the background"
                         height="200"
                         src={about}
                         width="300"/>
                    <img alt="A hand in a blue glove holding a large tooth model with dental tools in the background"
                         height="200"
                         src={about1}
                         width="300"/>
                    <img alt="A hand in a blue glove holding a large tooth model with dental tools in the background"
                         height="200"
                         src={dental}
                         width="300"/>
                </div>
                </div>
                <h1 className="text-4xl font-light">Our <span className="text-green-500 font-medium">experience  </span></h1>
                <p className="text-center text-gray-600 mt-8 max-w-2xl">
                    With years of hands-on experience in the dental field, our team at Dental Care Pro has consistently delivered exceptional care to patients. From routine cleanings and preventive treatments to advanced restorative procedures, we combine deep expertise with state-of-the-art technology to meet all your dental needs. Our commitment to continuous learning and patient-centered care ensures that we provide the highest standards of treatment in a comfortable and welcoming environment. Every smile we treat reflects our dedication to improving oral health and enhancing patient well-being.
                </p>

            </main>
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
}

export default About;
