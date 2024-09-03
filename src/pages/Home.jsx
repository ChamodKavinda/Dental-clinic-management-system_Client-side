import React, { useRef, useState, useEffect } from 'react';
import {AppBar, Toolbar, Typography, Box, Button, IconButton, Container, Modal, Grid, Link} from '@mui/material';
import { styled } from '@mui/system';
import logo from '../assets/logoo.png';
import cover from '../assets/background.gif';
import { CgMenuRightAlt } from "react-icons/cg";
import Navbar from '../global/Navbar';
import { FaArrowDown } from "react-icons/fa6";
import backgroundGif from '../assets/background.jpg';
import cleaning from '../assets/cleaning.jpg';
import fissure from '../assets/fissure.jpeg';
import filling from '../assets/fillings.jpg';
import remove from '../assets/remove.jpg';
import './app.css';

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  position: 'relative',
  textAlign: 'center',

}));

const Logo = styled('img')({
  marginRight: '8px',
  marginLeft: '100px',
  width: '150px',
  marginTop: '-150px',
});

const Header = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  color: '#1E201E',
  fontSize: '65px',
  marginBottom: theme.spacing(2),
}));

const BackgroundVideo = styled('video')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '620px',
  objectFit: 'cover',
  zIndex: -1,
});

const SubHeader = styled(Typography)(({ theme }) => ({
  color: '#16423C',
  marginBottom: theme.spacing(4),
  fontWeight: 700,
  marginTop:'30px'
}));

const PhotosSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#f7f7f7',
  textAlign: 'center',
  marginTop: theme.spacing(4),
}));

const Photo = styled('img')(({ theme }) => ({
  width: '300px',
  display:'block',
  height: '220px',
  marginLeft:'150px',
  marginBottom: theme.spacing(2),
}));

const Description = styled(Typography)(({ theme }) => ({
  color: 'black',
  marginBottom: theme.spacing(4),
}));

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const photosSectionRef = useRef(null);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const scrollToPhotosSection = () => {
    photosSectionRef.current.scrollIntoView({ behavior: 'smooth' });
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

  const image = {
    background: `url(${backgroundGif})`,
    height: "610px",
    width:"100%",
    marginTop: "0px",
    fontSize: "50px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",

  };


  const Footer = styled('footer')(({ theme }) => ({
    backgroundColor: 'black',
    color: '#fff',
    padding: theme.spacing(3),

    position: 'flex-end',
    bottom: 0,
    width: '100%',
  }));
  return (
      <>
      <Root>
        <div style={image}>
        {/*<BackgroundVideo autoPlay loop muted>
          <source src={backgroundGif} type="video/mp4" />
        </BackgroundVideo>*/}
        <AppBar position="fixed" color="transparent" elevation={0} sx={{ top: '100px' }}>
          <Toolbar >
            <Logo src={logo} alt="Dental Care Pro"  />
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, marginTop: '-150px', marginRight: '700px', fontWeight: 800 }}>
            </Typography>
            <IconButton color="inherit" sx={{ marginTop: '-150px', marginRight: '150px' }} onClick={handleOpenModal}>
              <CgMenuRightAlt size={40} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Modal open={modalOpen} onClose={handleCloseModal}>
          <Box>
            <Navbar open={modalOpen} onClose={handleCloseModal} />
          </Box>
        </Modal>
        <Container maxWidth="sm" sx={{ marginTop: '150px' }} className="fade-in-section">
          <Header>
            BRIGHT TEETH FOR BRIGHT LIFE
          </Header>
          <SubHeader variant="h6">
            High quality dental care management system for modern clinics
          </SubHeader>
          <Button onClick={scrollToPhotosSection} variant="contained" sx={{ marginTop: '40px', width: '220px',borderRadius:'20px', color:'white',backgroundColor:'#3DC2EC' }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              Explore Our Services
              <FaArrowDown />
            </Box>
          </Button>
        </Container>
        </div>
        <PhotosSection ref={photosSectionRef} className="fade-in-section">
          <Typography variant="h4" gutterBottom>
            Our Services
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} >
              <Typography sx={{fontWeight:900}}>Professional teeth cleaning</Typography>
              <hr/>
              <Photo src={cleaning} alt="Service 1" sx={{width:'400px'}} />
              <Description variant="body1">
                Dental cleaning is a crucial aspect of maintaining oral health and preventing dental diseases. It involves the removal of plaque, tartar, and stains from the teeth to keep them clean and healthy. This procedure is typically performed by a dental hygienist or a dentist and is recommended every six months for most individuals.
              </Description>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{fontWeight:900}}>Dental fissure sealants</Typography>
              <hr/>
              <Photo src={fissure} alt="Service 2" />
              <Description variant="body1">
                Dental fissure sealants are a preventive dental treatment designed to protect the chewing surfaces of the back teeth (molars and premolars) from tooth decay. These teeth have grooves, known as fissures, which can be deep and difficult to clean effectively with a toothbrush. Sealants create a smooth, protective barrier over these fissures, preventing food particles and bacteria from getting trapped and causing decay.
              </Description>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{fontWeight:900}}>Dental filling</Typography>
              <hr/>
              <Photo src={filling} alt="Service 3" />
              <Description variant="body1">
                Dental fillings are a common restorative dental treatment used to repair teeth damaged by decay, fractures, or wear. The process involves removing the decayed or damaged portion of the tooth and filling the cavity with a suitable material to restore the tooth's function and integrity.
              </Description>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{fontWeight:900}}>Tooth removal</Typography>
              <hr/>
              <Photo src={remove} alt="Service 4" />
              <Description variant="body1">
                Tooth removal, also known as dental extraction, is a procedure performed by a dentist to remove a tooth from its socket in the jawbone. This procedure may be necessary for various reasons, including severe tooth decay, advanced gum disease, dental trauma, overcrowding, or to prepare for orthodontic treatment.
              </Description>
            </Grid>
          </Grid>
        </PhotosSection>
      </Root>
  <Footer sx={{backgroundColor:'#1d1d1d'}}>
    <Typography sx={{marginRight:'1000px',marginTop:'20px',fontSize:'40px',fontWeight:900}}>
      Dental Care Pro
    </Typography>
    <Typography variant="body2" component="p">
      &copy; {new Date().getFullYear()} Dental Care Pro. All rights reserved.
    </Typography>
    <Typography variant="body2" component="p">
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

export default Home;
