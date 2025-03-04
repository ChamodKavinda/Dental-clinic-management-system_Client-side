import React, { useRef, useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Container, Modal, Grid, Link, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import logo from '../assets/logoo.png';
import { CgMenuRightAlt } from "react-icons/cg";
import Navbar from '../global/Navbar';
import { FaArrowDown } from "react-icons/fa6";
import backgroundGif from '../assets/backk.png';
import cleaning from '../assets/cleaning.jpg';
import fissure from '../assets/fissure.jpeg';
import filling from '../assets/fillings.jpg';
import remove from '../assets/remove.jpg';
import './app.css';
import { styled } from '@mui/system';

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  position: 'relative',
  textAlign: 'center',
  overflowX: 'hidden',
  overflow: 'hidden'
}));

const Logo = styled('img')(({ theme }) => ({
  width: '150px',
  marginRight: 'auto',
  marginLeft: '20px',
  cursor: 'pointer',
  [theme.breakpoints.down('md')]: {
    width: '100px',
    marginLeft: '10px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '80px',
  },
}));

const Header = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  color: '#181818',
  fontSize: '3.5rem',
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const SubHeader = styled(Typography)(({ theme }) => ({
  color: '#373833',
  marginBottom: theme.spacing(4),
  fontWeight: 700,
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

const ContainerStyled = styled(Container)(({ theme }) => ({
  maxWidth: 'md',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const PhotosSection = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(4),
  backgroundColor: 'white',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const Photo = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '300px',
  height: 'auto',
  display: 'block',
  margin: '0 auto',
  marginBottom: theme.spacing(2),
}));

const Description = styled(Typography)(({ theme }) => ({
  color: 'black',
  marginBottom: theme.spacing(4),
  fontWeight: 500,
  fontSize: '1rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
  },
}));

const Footer = styled('footer')(({ theme }) => ({
  backgroundColor: '#222',
  color: 'white',
  padding: theme.spacing(3),
  textAlign: 'center',
}));

function Home() {
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const photosSectionRef = useRef(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

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

  const backgroundStyle = {
    backgroundImage: `url(${backgroundGif})`,
    backgroundSize: isMobile ? 'cover' : '80%',
    backgroundPosition: isMobile ? 'center' : 'top right',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    minHeight: isMobile ? '500px' : '680px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  return (
      <>
        <Root>
          <div style={backgroundStyle}>
            <AppBar position="fixed" color="transparent" elevation={0}>
              <Toolbar sx={{ justifyContent: 'space-between', width: '100%', marginTop:'60px' }}>
                <Logo
                    src={logo}
                    alt="Dental Care Pro"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                />
                <IconButton
                    color="inherit"
                    onClick={handleOpenModal}
                    sx={{ marginRight: isMobile ? '10px' : '20px' }}
                >
                  <CgMenuRightAlt size={isMobile ? 30 : 40} />
                </IconButton>
              </Toolbar>
            </AppBar>

            <Modal open={modalOpen} onClose={handleCloseModal}>
              <Box>
                <Navbar open={modalOpen} onClose={handleCloseModal} />
              </Box>
            </Modal>

            <ContainerStyled className="fade-in-section">
              <Header>
                BRIGHT TEETH <br/> FOR BRIGHT LIFE
              </Header>
              <SubHeader>
                High quality dental care management system
                {!isMobile && <br/>}
                for modern clinics
              </SubHeader>
            </ContainerStyled>

            <Button
                onClick={scrollToPhotosSection}
                variant="contained"
                sx={{
                  mt: 4,
                  width: isMobile ? '180px' : '220px',
                  borderRadius: '20px',
                  color: 'white',
                  backgroundColor: '#1D1D1D',
                  fontFamily: 'Suisse Intl,sans-serif'
                }}
            >
              <Box display="flex" flexDirection="column" alignItems="center" >
                Explore Our Services
                <FaArrowDown />
              </Box>
            </Button>
          </div>

          <PhotosSection ref={photosSectionRef} className="fade-in-section">
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: 900,
                  fontSize: isMobile ? '1.5rem' : '2rem'
                }}
            >
              Our Services
            </Typography>
            <Grid container spacing={isMobile ? 2 : 4} justifyContent="center">
              {[
                { img: cleaning, title: "Professional teeth cleaning", desc: "Dental cleaning removes plaque, tartar, and stains to keep teeth healthy and prevent gum disease. Performed by dental professionals, it's typically recommended every six months to maintain oral hygiene and prevent future dental issues." },
                { img: fissure, title: "Dental fissure sealants", desc: "Fissure sealants are a protective treatment for molars and premolars, covering grooves that are hard to clean. This barrier helps prevent tooth decay by keeping food and bacteria from getting trapped." },
                { img: filling, title: "Dental filling", desc: "Dental fillings restore teeth damaged by decay or fractures. The procedure removes the damaged area and fills the cavity to restore the tooth's function and structure." },
                { img: remove, title: "Tooth removal", desc: "Tooth removal, or extraction, is when a dentist removes a tooth from its socket. It's done due to decay, gum disease, trauma, overcrowding, or in preparation for orthodontics." }
              ].map((service, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Typography sx={{ fontWeight: 900, fontSize: isMobile ? '1rem' : '1.125rem' }}>
                      {service.title}
                    </Typography>
                    <Photo src={service.img} alt={`Service ${index + 1}`} />
                    <Description variant="body1">
                      {service.desc}
                    </Description>
                  </Grid>
              ))}
            </Grid>
          </PhotosSection>
        </Root>

        <Footer>
          <Typography sx={{
            marginBottom: '20px',
            fontSize: { xs: '1.25rem', md: '1.5rem' },
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