'use client';
import { useEffect, useState } from 'react';
import { Container, Paper, Typography, Box, Button, Chip } from '@mui/material';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';

interface DisputeHistoryItem {
  id: number;
  title: string;
  description: string;
  history: Array<{ status: string; date: string; note?: string }>;
  createdAt: string;
}

export default function DisputeHistoryPage() {
  const [history, setHistory] = useState<DisputeHistoryItem[]>([]);
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
      .get('/disputes/history', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setHistory(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || 'Failed to load history')
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
            Dispute History
          </Typography>
          {loading && <Typography>Loading...</Typography>}
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
            {history.map((d) => (
              <Box
                key={d.id}
                component="li"
                sx={{ mb: 4, borderBottom: 1, borderColor: 'grey.200', pb: 2 }}
              >
                <Typography fontWeight={600}>{d.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {d.description}
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  Created: {new Date(d.createdAt).toLocaleString()}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography fontWeight={600} variant="subtitle2">
                    Status History:
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    {d.history.map((h, idx) => (
                      <Box
                        key={idx}
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Chip
                          label={h.status}
                          size="small"
                          color={
                            h.status === 'resolved'
                              ? 'success'
                              : h.status === 'rejected'
                              ? 'error'
                              : 'default'
                          }
                        />
                        <Typography variant="caption" sx={{ minWidth: 120 }}>
                          {new Date(h.date).toLocaleString()}
                        </Typography>
                        {h.note && (
                          <Typography variant="caption" color="text.secondary">
                            {h.note}
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
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
