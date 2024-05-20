import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Dashboard from '../components/Dashboard'
import { useNavigate  } from 'react-router-dom';
import Navbar from "../components/Navbar";



export default function LoginFinal() {

    const navigate = useNavigate();
    const handleLoginClick = path => {
        navigate(path);
    };

    return (
        <main>
            <Navbar/>

            <CssBaseline />
            <div
                style={{
                    width: 300,
                    margin: 'auto', // center horizontally
                    marginTop: 64, // add some space from the top
                    padding: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    borderRadius: 4,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <div>
                    <Typography variant="h4">
                        <b>Welcome!</b>
                    </Typography>
                    <Typography variant="body2">Sign in to continue.</Typography>
                </div>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                        name="email"
                        type="email"
                        placeholder="johndoe@email.com"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                        name="password"
                        type="password"
                        placeholder="password"
                    />
                </FormControl>
                <Button variant="contained" onClick={() => handleLoginClick('/dashboard')} >Log in</Button>
                <Typography variant="body2" align="center">
                    Don't have an account?{' '}
                    <Link href="/sign-up" underline="always">
                        Sign up
                    </Link>
                </Typography>
            </div>
        </main>
    );
}
