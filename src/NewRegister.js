import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import PaymentPage from './PaymentPage';

const RegistrationPage = ({ onSubmit }) => {
  const [course, setCourse] = useState('');
  const [duration, setDuration] = useState('');
  const [fee, setFee] = useState('');
  const [showPaymentPage, setShowPaymentPage] = useState(false);

  const handleSubmit = () => {
    // Validate the input data, perform any additional checks as needed

    // Call the onSubmit callback with the registration data
    onSubmit({
      course,
      duration,
      fee,
    });

    // Show the PaymentPage after successful registration
    setShowPaymentPage(true);
  };

  const handlePaymentComplete = () => {
    // Reset the state to hide the PaymentPage
    setShowPaymentPage(false);
  };


  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          New Student Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            required
            label="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            label="Course Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            label="Course Fee"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Proceed to Payment
          </Button>
        </form>
      </Box>
      {showPaymentPage && (
        <PaymentPage
          course={course}
          duration={duration}
          fee={fee}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </Container>
  );
};

export default RegistrationPage;
