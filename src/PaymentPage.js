import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';

const PaymentPage = ({ course, duration, fee, onPaymentComplete }) => {
  const handlePayment = () => {
    // Simulate payment processing (you can integrate with a payment gateway in a real application)
    // After successful payment, you can call the onPaymentComplete callback
    onPaymentComplete();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Payment
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Course: {course}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Duration: {duration}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Fee: {fee}
        </Typography>
        <Button onClick={handlePayment} fullWidth variant="contained" sx={{ mt: 3 }}>
          Proceed with Payment
        </Button>
      </Box>
    </Container>
  );
};

export default PaymentPage;
