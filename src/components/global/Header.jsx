import React, { useState } from 'react';
import {useNavigate,Link} from "react-router-dom";
import { AppBar, Toolbar, Typography, Avatar, Box, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';
import teeth from '../../assets/teeth.png';

const Header = ({logout}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLoginClick = (path) => {
        navigate(path);
    };

    return (
        <AppBar position="static" sx={{ bgcolor:"#8AA899" }}>
            <Toolbar>
                <Box component="img" src={teeth} sx={{ width: 70, height: 40, marginRight: 2 , bgcolor:'#CAE7DF', cursor:'pointer'}} onClick={()=>navigate('/dashboard')} />
                <Typography variant="h5" sx={{ flexGrow: 1 , color:'white', fontWeight:'bold',cursor:'pointer'}} onClick={()=>navigate('/dashboard')}>
                    Dental Pro Care
                </Typography>

                <Box display="flex" alignItems="center" onClick={handleClick} sx={{ cursor: 'pointer' }}>
                    <Avatar alt="Kamal" />
                    <Box ml={2} sx={{color:'white'}}>
                        <Typography>Kamal</Typography>
                        <Typography variant="body2">kamalsilva100@gmail.com</Typography>
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
