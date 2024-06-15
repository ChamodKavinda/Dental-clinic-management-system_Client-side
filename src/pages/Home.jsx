import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Container,Modal  } from '@mui/material';
import { styled } from '@mui/system';
import backgroundGif from '../assets/bubble.jpg'; 
import logo from '../assets/teeth.png'; 
import { CgMenuRightAlt } from "react-icons/cg";
import { useState } from 'react';
import Navbar from '../global/Navbar';

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  background: `url(${backgroundGif}) no-repeat center center fixed`,
  backgroundSize: 'cover',
  textAlign: 'center',
}));

const Logo = styled('img')({
  marginRight: '8px',
  marginLeft:'100px',
  width: '80px',
  marginTop:'-150px',
  backgroundColor:'black'
});

const Header = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: '#000',
  fontSize:'55px',
  marginBottom: theme.spacing(2),
}));

const SubHeader = styled(Typography)(({ theme }) => ({
  color: '#555',
  marginBottom: theme.spacing(4),
  fontWeight: 'bold'
}));

function Home() {

    const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Root>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Logo src={logo} alt="Dental Care Pro" />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1,marginTop:'-150px', marginRight: '700px',fontWeight:800}}>
            Dental Care Pro
          </Typography>
          <IconButton color="inherit" sx={{marginTop:'-150px',marginRight:'150px'}} onClick={handleOpenModal}>
            <CgMenuRightAlt size={40}/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box>
          <Navbar open={modalOpen} onClose={handleCloseModal} />
        </Box>
      </Modal>
      <Container maxWidth="sm">
        <Header >
          BRIGHT TEETH FOR BRIGHT LIFE
        </Header>
        <SubHeader variant="h6">
          High quality dental care management system for modern clinics
        </SubHeader>
        <Button variant="contained" color="primary">
          Explore Our Services
        </Button>
      </Container>
    </Root>
  );
}

export default Home;
