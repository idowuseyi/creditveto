'use client';
import { Box, Typography, Container } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        mt: 8,
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} CreditVeto. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
