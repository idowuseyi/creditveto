'use client';
import { Container, Typography, Paper } from '@mui/material';

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 5 }}>
        <Typography variant="h4" color="primary" fontWeight={700} gutterBottom>
          About CreditVeto
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          CreditVeto is a modern platform designed to help you manage credit
          disputes, track your credit profile, and generate AI-powered dispute
          letters. Our mission is to empower users with secure, real-time, and
          easy-to-use tools for credit management.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Built with the latest technologies, CreditVeto ensures your data is
          safe and your experience is seamless. Whether you are a consumer or an
          admin, our platform adapts to your needs and grows with you.
        </Typography>
      </Paper>
    </Container>
  );
}
