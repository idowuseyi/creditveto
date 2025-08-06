'use client';
import Link from 'next/link';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  useTheme,
} from '@mui/material';
import { useState, useEffect } from 'react';

import Image from 'next/image';
const carouselItems = [
  {
    title: 'Manage Credit Disputes Effortlessly',
    description:
      'Track, create, and resolve disputes with a few clicks. Stay updated in real time.',
    image:
      '/undraw_add-file_lf11.svg',
    alt: 'Manage Disputes Illustration',
  },
  {
    title: 'AI-Powered Dispute Letters',
    description:
      'Generate professional dispute letters instantly using our AI tools.',
    image:
      '/undraw_chat-with-ai_ir62.svg',
    alt: 'AI Dispute Letters Illustration',
  },
  {
    title: 'Your Credit Profile, Visualized',
    description:
      'View and monitor your credit profile securely and intuitively.',
    image:
      '/undraw_terms_sx63.svg',
    alt: 'Credit Profile Visualization Illustration',
  },
];

export default function HomePage() {
  const theme = useTheme();
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'linear-gradient(135deg, #e0e7ff 0%, #bae6fd 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            p: { xs: 3, sm: 6 },
            mb: 6,
            textAlign: 'center',
            bgcolor: 'white',
          }}
        >
          <Typography
            variant="h2"
            fontWeight={800}
            color="primary"
            gutterBottom
          >
            Welcome to CreditVeto
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Your all-in-one platform for credit dispute management, AI-powered
            letters, and real-time updates.
          </Typography>
          <Box sx={{ mb: 6 }}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                bgcolor: theme.palette.background.default,
                minHeight: 180,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.5s',
              }}
            >
              <Box flex={1}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  color="primary"
                  gutterBottom
                >
                  {carouselItems[active].title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {carouselItems[active].description}
                </Typography>
              </Box>
              <Box flex={1} display="flex" justifyContent="center">
                <Image
                  src={carouselItems[active].image}
                  alt={carouselItems[active].alt}
                  width={180}
                  height={120}
                  style={{
                    objectFit: 'contain',
                    maxWidth: 180,
                    maxHeight: 120,
                  }}
                  priority
                  unoptimized
                />
              </Box>
              {/* Carousel indicators */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 12,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                {carouselItems.map((_, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: idx === active ? 'primary.main' : 'grey.300',
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                    }}
                    onClick={() => setActive(idx)}
                  />
                ))}
              </Box>
            </Paper>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mb: 2,
              flexWrap: 'wrap',
            }}
          >
            <Button
              component={Link}
              href="/auth?mode=login"
              variant="contained"
              color="primary"
              size="large"
              sx={{ px: 4, fontWeight: 600 }}
            >
              Login
            </Button>
            <Button
              component={Link}
              href="/auth?mode=register"
              variant="outlined"
              color="primary"
              size="large"
              sx={{ px: 4, fontWeight: 600 }}
            >
              Register
            </Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
            <Button component={Link} href="/about" color="secondary">
              About Us
            </Button>
            <Button component={Link} href="/contact" color="secondary">
              Contact
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
