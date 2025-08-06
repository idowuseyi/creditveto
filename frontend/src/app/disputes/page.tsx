'use client';
import { useEffect, useState, useRef } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';
import { getSocket } from '@/utils/socket';
import axios from 'axios';

interface DisputeHistoryItem {
  status: string;
  date: string;
  note?: string;
}
interface DisputeWithHistory {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  history?: DisputeHistoryItem[];
}

export default function DisputesPage() {
  const [disputes, setDisputes] = useState<DisputeWithHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);
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
      .then((res) => setDisputes(res.data))
      .catch((err: unknown) => {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Failed to load disputes');
        } else {
          setError('Failed to load disputes');
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const socket = getSocket(token);
    socket.on(
      'disputeStatusUpdate',
      (data: { disputeId: number; status: string }) => {
        setDisputes((prev) =>
          prev.map((d) =>
            d.id === data.disputeId ? { ...d, status: data.status } : d
          )
        );
      }
    );
    return () => {
      socket.off('disputeStatusUpdate');
    };
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/auth');
      return;
    }
    try {
      const res = await api.post(
        '/disputes/create',
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDisputes((prev) => [res.data, ...prev]);
      setTitle('');
      setDescription('');
      titleRef.current?.focus();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to create dispute');
      } else {
        setError('Failed to create dispute');
      }
    } finally {
      setCreating(false);
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
            My Disputes
          </Typography>
          <Box
            component="form"
            onSubmit={handleCreate}
            sx={{ mb: 6, display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              inputRef={titleRef}
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
              autoFocus
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
              multiline
              rows={2}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={creating}
              sx={{ fontWeight: 600 }}
              fullWidth
            >
              {creating ? 'Creating...' : 'Create Dispute'}
            </Button>
          </Box>
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
                {Array.isArray(d.history) && (
                  <Box sx={{ mt: 1 }}>
                    <Typography fontWeight={600} variant="subtitle2">Status History:</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                      {d.history.map((h, idx) => (
                        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Button size="small" variant="outlined" disabled>{h.status}</Button>
                          <Typography variant="caption" sx={{ minWidth: 120 }}>{new Date(h.date).toLocaleString()}</Typography>
                          {h.note && <Typography variant="caption" color="text.secondary">{h.note}</Typography>}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
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
