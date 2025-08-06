'use client';
import { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';

interface Dispute {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  user: { email: string };
}

const statuses = [
  'pending',
  'submitted',
  'under_review',
  'resolved',
  'rejected',
];

export default function AdminPage() {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/auth');
      return;
    }
    // Check role
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.role !== 'admin') {
        router.replace('/dashboard');
        return;
      }
    } catch {
      router.replace('/auth');
      return;
    }
    api
      .get('/disputes', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDisputes(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || 'Failed to load disputes')
      )
      .finally(() => setLoading(false));
  }, [router]);

  const handleStatusChange = async (id: number, status: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await api.post(
        `/disputes/${id}/stat`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDisputes((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status } : d))
      );
    } catch {
      setError('Failed to update status');
    }
  };

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
            Admin: All Disputes
          </Typography>
          {loading && <Typography>Loading...</Typography>}
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
            {disputes.map((d) => (
              <Box
                key={d.id}
                component="li"
                sx={{ mb: 3, borderBottom: 1, borderColor: 'grey.200', pb: 2 }}
              >
                <Typography fontWeight={600}>{d.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {d.description}
                </Typography>
                <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                  Status:{' '}
                  <Box component="span" sx={{ fontFamily: 'monospace' }}>
                    {d.status}
                  </Box>
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  Created: {new Date(d.createdAt).toLocaleString()}
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  User: {d.user?.email}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel id={`status-select-label-${d.id}`}>
                      Status
                    </InputLabel>
                    <Select
                      labelId={`status-select-label-${d.id}`}
                      id={`status-select-${d.id}`}
                      value={d.status}
                      label="Status"
                      onChange={(e) => handleStatusChange(d.id, e.target.value)}
                    >
                      {statuses.map((s) => (
                        <MenuItem key={s} value={s}>
                          {s}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
