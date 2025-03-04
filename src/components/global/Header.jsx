import React, { useState } from 'react';
import {useNavigate,Link} from "react-router-dom";
import { AppBar, Toolbar, Typography, Avatar, Box, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';
import logo from '../../assets/logoWhite.png';

const Header = ({email,logout}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ bgcolor:"#8AA899",position:'fixed' }}>
            <Toolbar>
                <Box component="img" src={logo} sx={{width: 90, height: 40, marginLeft: '50px' ,cursor:'pointer'}} onClick={()=>navigate('/dashboard')} />

                <Box display="flex" alignItems="center" onClick={handleClick} sx={{ cursor: 'pointer',marginLeft:'770px' }}>
                    <Avatar alt="Kamal"  sx={{ml:20}}/>
                    <Box ml={2} sx={{color:'white'}}>

                        <Typography variant="body2">dentalcarepro0@gmail.com</Typography>
                    </Box>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={() => {logout()}}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
