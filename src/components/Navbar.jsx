import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {Link, NavLink} from "react-router-dom";

function Navbar(){
    const handleTextClick = () => {
        window.location.reload();
    };

    return(
        <AppBar position='static' sx={{ backgroundColor: 'white',boxShadow:'none' }}>
            <Toolbar>
                <IconButton size='large' edge='start' color='black' aria-label='logo'>
                    <LocalHospitalIcon/>
                </IconButton>
                <Typography varient='h6' component='div' sx={{flexGrow:1}} style={{ textDecoration: 'none', color: 'black', margin: '0 10px',cursor:'pointer' }} onClick={handleTextClick}>Dental-Clinic-Management-System</Typography>
            <Box>
                <NavLink to="/home" style={{ textDecoration: 'none', color: 'black', margin: '0 10px' }} className="link">Home</NavLink>
                <NavLink to="/features" style={{ textDecoration: 'none', color: 'black', margin: '0 10px' }}className="link">Features</NavLink>
                <NavLink to="/contactus" style={{ textDecoration: 'none', color: 'black', margin: '0 10px' }}className="link">Contact Us</NavLink>
                <NavLink to="/about" style={{ textDecoration: 'none', color: 'black', margin: '0 10px' }}className="link">About</NavLink>
                <NavLink to="/login" style={{ textDecoration: 'none', color: 'black', margin: '0 10px' }}>Login</NavLink>
            </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar