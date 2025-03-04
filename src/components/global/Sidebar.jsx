import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Dashboard, Event, Person, MedicalServices, Group } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
const Sidebar = () => {
    const location = useLocation();

    const getListItemStyle = (path) => {
        return location.pathname === path ? { backgroundColor: '#DDEDF4', color: 'black' } : {};
    };

    return (
        <Box sx={{ width: 240, height: '100vh', backgroundColor: '#95D2B3', color: 'white',position:'fixed',marginTop: 8 }}>
            <List>
                <ListItem button component={Link} to="/dashboard" sx={getListItemStyle('/dashboard')}>
                    <ListItemIcon>
                        <Dashboard sx={{ color: location.pathname === '/dashboard' ? 'white' : 'black' }} />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component={Link} to="/appointment" sx={getListItemStyle('/appointment')}>
                    <ListItemIcon>
                        <Event sx={{ color: location.pathname === '/appointment' ? 'white' : 'black' }} />
                    </ListItemIcon>
                    <ListItemText primary="Appointment" />
                </ListItem>
                <ListItem button component={Link} to="/patient" sx={getListItemStyle('/patient')}>
                    <ListItemIcon>
                        <Person sx={{ color: location.pathname === '/patient' ? 'white' : 'black' }} />
                    </ListItemIcon>
                    <ListItemText primary="Patient" />
                </ListItem>
                <ListItem button component={Link} to="/dentist" sx={getListItemStyle('/dentist')}>
                    <ListItemIcon>
                        <MedicalServices sx={{ color: location.pathname === '/dentist' ? 'white' : 'black' }} />
                    </ListItemIcon>
                    <ListItemText primary="Dentist" />
                </ListItem>
                <ListItem button component={Link} to="/staff" sx={getListItemStyle('/staff')}>
                    <ListItemIcon>
                        <Group sx={{ color: location.pathname === '/staff' ? 'white' : 'black' }} />
                    </ListItemIcon>
                    <ListItemText primary="Employee" />
                </ListItem>
            </List>
            <Divider />
        </Box>
    );
};

export default Sidebar;