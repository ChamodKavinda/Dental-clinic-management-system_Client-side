import React, { useRef, useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Container, Modal, Grid, Link } from '@mui/material';
import logo from '../assets/logoo.png';
import { CgMenuRightAlt } from "react-icons/cg";
import Navbar from '../global/Navbar';
import { FaArrowDown } from "react-icons/fa6";
import backgroundGif from '../assets/background.jpg';
import cleaning from '../assets/cleaning.jpg';
import fissure from '../assets/fissure.jpeg';
import filling from '../assets/fillings.jpg';
import remove from '../assets/remove.jpg';
import './app.css';
import { styled, useTheme } from '@mui/system';

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  position: 'relative',
  textAlign: 'center',
}));

const Logo = styled('img')(({ theme }) => ({
  marginRight: '8px',
  marginLeft: '100px',
  width: '150px',
  marginTop: '-150px',
  [theme.breakpoints.down('md')]: {
    width: '120px',
    marginLeft: '20px',
    marginTop: '-100px',
  },
}));

const Header = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  color: '#1E201E',
  fontSize: '65px',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '40px',
  },
}));

const SubHeader = styled(Typography)(({ theme }) => ({
  color: '#201E43',
  marginBottom: theme.spacing(4),
  fontWeight: 700,
  marginTop: '30px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
  },
}));

const PhotosSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#f7f7f7',
  textAlign: 'center',
  marginTop: theme.spacing(4),
}));

const Photo = styled('img')(({ theme }) => ({
  width: '300px',
  display: 'block',
  height: '220px',
  marginLeft: 'auto',
  marginRight: '150px',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));


const Description = styled(Typography)(({ theme }) => ({
  color: 'black',
  marginBottom: theme.spacing(4),
  fontWeight:500,
  fontSize:'15px'
}));

const Footer = styled('footer')(({ theme }) => ({
  backgroundColor: '#1d1d1d',
  color: '#fff',
  padding: theme.spacing(3),
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    padding: theme.spacing(3, 6),
  },
}));

function Home() {
  const theme = useTheme();
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
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            } else {
              entry.target.classList.remove('is-visible');
            }
          });
        },
        { threshold: 0.1 }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  const image = {
    background: `url(${backgroundGif})`,
    height: '610px',
    width: '100%',
    marginTop: '0px',
    fontSize: '50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
      <>
        <Root>
          <div style={image}>
            <AppBar position="fixed" color="transparent" elevation={0} sx={{ top: '100px' }}>
              <Toolbar>
                <Logo src={logo} alt="Dental Care Pro" />
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}></Typography>
                <IconButton color="inherit" onClick={handleOpenModal} sx={{
                  marginTop: '-150px',
                  marginRight: '150px',
                  [theme.breakpoints.down('md')]: {
                    marginTop: '-120px',
                    marginRight: '50px',
                  },
                  [theme.breakpoints.down('sm')]: {
                    marginTop: '-100px',
                    marginRight: '20px',
                  },
                }}>
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
              <Header>BRIGHT TEETH FOR BRIGHT LIFE</Header>
              <SubHeader variant="h6">High quality dental care management system for modern clinics</SubHeader>
              <Button
                  onClick={scrollToPhotosSection}
                  variant="contained"
                  sx={{
                    marginTop: '40px',
                    width: '220px',
                    borderRadius: '20px',
                    color: 'white',
                    backgroundColor: '#3DC2EC',
                  }}
              >
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
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 900 , fontSize:'18px'}}>Professional teeth cleaning</Typography>
                <hr />
                <Photo src={cleaning} alt="Service 1" />
                <Description variant="body1">
                  Dental cleaning removes plaque, tartar, and stains to keep teeth healthy and prevent gum disease. Performed by dental professionals, it’s typically recommended every six months to maintain oral hygiene and prevent future dental issues.
                </Description>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 900 , fontSize:'18px'}}>Dental fissure sealants</Typography>
                <hr />
                <Photo src={fissure} alt="Service 2" />
                <Description variant="body1">
                  Fissure sealants are a protective treatment for molars and premolars, covering grooves that are hard to clean. This barrier helps prevent tooth decay by keeping food and bacteria from getting trapped.
                </Description>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 900 , fontSize:'18px'}}>Dental filling</Typography>
                <hr />
                <Photo src={filling} alt="Service 3" />
                <Description variant="body1">
                  Dental fillings restore teeth damaged by decay or fractures. The procedure removes the damaged area and fills the cavity to restore the tooth’s function and structure.
                </Description>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 900 , fontSize:'18px'}}>Tooth removal</Typography>
                <hr />
                <Photo src={remove} alt="Service 4" />
                <Description variant="body1">
                  Tooth removal, or extraction, is when a dentist removes a tooth from its socket. It's done due to decay, gum disease, trauma, overcrowding, or in preparation for orthodontics.
                </Description>
              </Grid>
            </Grid>
          </PhotosSection>
        </Root>

        <Footer>
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

export default Home;
