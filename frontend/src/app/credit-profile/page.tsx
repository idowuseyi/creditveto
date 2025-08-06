'use client';
import { useEffect, useState } from 'react';
import { Container, Paper, Typography, Box, Button } from '@mui/material';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';

interface Account {
  type: string;
  balance: number;
  status: string;
}
interface NegativeItem {
  type: string;
  date: string;
  amount: number;
}
interface CreditProfile {
  userId: number;
  score: number;
  accounts: Account[];
  negativeItems: NegativeItem[];
}

export default function CreditProfilePage() {
  const [profile, setProfile] = useState<CreditProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/auth');
      return;
    }
    api
      .get('/credit-profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProfile(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || 'Failed to load profile')
      )
      .finally(() => setLoading(false));
  }, [router]);

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
            Credit Profile
          </Typography>
          {loading && <Typography>Loading...</Typography>}
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          {profile && (
            <Box>
              <Typography sx={{ mb: 2 }}>
                Credit Score:{' '}
                <Box
                  component="span"
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                  }}
                >
                  {profile.score}
                </Box>
              </Typography>
              <Typography fontWeight={600} sx={{ mb: 1 }}>
                Accounts:
              </Typography>
              <Box component="ul" sx={{ mb: 3, pl: 2 }}>
                {profile.accounts.map((a, i) => (
                  <li key={i}>
                    <Typography variant="body2">
                      {a.type} - ${a.balance} ({a.status})
                    </Typography>
                  </li>
                ))}
              </Box>
              <Typography fontWeight={600} sx={{ mb: 1 }}>
                Negative Items:
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                {profile.negativeItems.map((n, i) => (
                  <li key={i}>
                    <Typography variant="body2">
                      {n.type} - ${n.amount} on {n.date}
                    </Typography>
                  </li>
                ))}
              </Box>
            </Box>
          )}
          <Box sx={{ mt: 6 }}>
            <Button component="a" href="/dashboard" color="primary">
              &larr; Back to Dashboard
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
