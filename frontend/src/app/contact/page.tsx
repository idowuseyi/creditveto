'use client';
import { Container, Typography, Paper, TextField, Button } from '@mui/material';
import { Box } from '@mui/material';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend or email service
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 5 }}>
        <Typography variant="h4" color="primary" fontWeight={700} gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Have questions or feedback? Fill out the form below and we’ll get back
          to you soon.
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}
        >
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
            autoFocus
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            fullWidth
            type="email"
          />
          <TextField
            label="Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={4}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitted}
            size="large"
            sx={{ fontWeight: 600 }}
          >
            {submitted ? 'Message Sent!' : 'Send Message'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
