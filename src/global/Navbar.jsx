import React from 'react';
import { Box, Typography, List, ListItem, Divider, IconButton } from '@mui/material';
import { RiCloseLargeLine } from "react-icons/ri";
import { styled } from '@mui/system';
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/teeth.png';

const Container = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    color:'white',
    padding: theme.spacing(4),
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(8px)',
    zIndex: 9999,
}));

const Logo = styled('img')({
    marginBottom: '8px',
    width: '60px',
});

const CloseButton = styled(IconButton)({
    position: 'absolute',
    top: 16,
    right: 16,
});

const Navbar = ({ open, onClose }) => {
    if (!open) return null;
    const navigate = useNavigate();

    return (
        <Container>
            <Box display="flex" alignItems="center" mb={4}>
                <Logo src={logo} alt="Dental Care Pro" />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    DENTAL CARE PRO
                </Typography>
                <CloseButton onClick={onClose} color="inherit" sx={{ marginRight: '170px', marginTop: '50px' }}>
                    <RiCloseLargeLine />
                </CloseButton>
            </Box>
            <Box display="flex" justifyContent="space-between">
                <List sx={{ fontSize: '40px', fontWeight: '800', marginLeft: '100px' }}>
                    <ListItem>WE</ListItem>
                    <ListItem>CARE</ListItem>
                    <ListItem>ABOUT</ListItem>
                    <ListItem>YOUR</ListItem>
                    <ListItem>TEETH</ListItem>
                </List>
                <Divider orientation="vertical" flexItem />
                <List sx={{ marginRight: '150px', fontSize: '20px', cursor: "pointer", marginTop: '40px' }}>
                    <ListItem onClick={() => navigate('/login')}>Login</ListItem>
                    <ListItem onClick={() => navigate('/signup')}>Signup</ListItem>
                    <ListItem onClick={() => navigate('/contactus')}>Contact Us</ListItem>
                    <ListItem onClick={() => navigate('/about')}>About</ListItem>
                    <ListItem sx={{ marginTop: '30px', fontSize: '30px', fontWeight: 'bold' }}>Dental Care Pro</ListItem>
                    <List sx={{ display: 'flex' }}>
                        <ListItem><FaFacebook /></ListItem>
                        <ListItem><FaInstagram /></ListItem>
                        <ListItem><FaLinkedin /></ListItem>
                        <ListItem><FaXTwitter /></ListItem>
                    </List>
                </List>
            </Box>
        </Container>
    );
};

export default Navbar;
