'use client';
import { useEffect, useState } from 'react';
import { Container, Paper, Typography, Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  email: string;
  role: string;
  exp?: number;
  iat?: number;
}

export default function DashboardPage() {
  const [user, setUser] = useState<{ email: string; role: string } | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/auth');
      return;
    }
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      setUser({ email: decoded.email, role: decoded.role });
    } catch {
      localStorage.removeItem('token');
      router.replace('/auth');
    }
  }, [router]);

  if (!user) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        Loading...
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 5 }}>
          <Typography
            variant="h4"
            color="primary"
            fontWeight={700}
            gutterBottom
          >
            Welcome, {user.email}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Role:{' '}
            <Box component="span" sx={{ fontFamily: 'monospace' }}>
              {user.role}
            </Box>
          </Typography>
          <Box sx={{ mt: 6, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              component="a"
              href="/disputes"
              variant="contained"
              color="primary"
            >
              Disputes
            </Button>
            <Button
              component="a"
              href="/credit-profile"
              variant="contained"
              color="success"
            >
              Credit Profile
            </Button>
            <Button
              component="a"
              href="/ai"
              variant="contained"
              color="secondary"
            >
              AI Letter
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
