import React from 'react';
import { Typography, TextField, Button } from '@mui/material';
import Navbar from "../global/Navbar";

function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted!');
    };

    return (
        <>
            <Navbar/>
        <div
            style={{
                width: 400,
                margin: 'auto', // center horizontally
                marginTop: 64, // add some space from the top
                padding: 16,
                borderRadius: 4,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography variant="h5" gutterBottom>
                Contact Us
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    type="email"
                    required
                />
                <TextField
                    fullWidth
                    label="Message"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                    required
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    style={{ marginTop: 16 }}
                >
                    Submit
                </Button>
            </form>
        </div>
            </>
    );
}

export default Contact;
