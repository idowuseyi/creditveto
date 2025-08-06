'use client';
import { useState } from 'react';
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

export default function AiPage() {
  const [disputeType, setDisputeType] = useState('');
  const [details, setDetails] = useState('');
  const [letter, setLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLetter('');
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/auth');
      return;
    }
    try {
      const res = await api.post(
        '/ai/generate-letter',
        { disputeType, details },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLetter(res.data.letter);
    } catch (err: unknown) {
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response &&
        err.response.data &&
        typeof err.response.data === 'object' &&
        'message' in err.response.data
      ) {
        setError(
          (err.response as { data: { message?: string } }).data.message ||
            'Failed to generate letter'
        );
      } else {
        setError('Failed to generate letter');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    setError('');
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/auth');
      return;
    }
    try {
      const res = await api.post(
        '/ai/generate-letter-pdf',
        { disputeType, details },
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob',
        }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'dispute_letter.pdf';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (err: unknown) {
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response &&
        err.response.data &&
        typeof err.response.data === 'object' &&
        'message' in err.response.data
      ) {
        setError(
          (err.response as { data: { message?: string } }).data.message ||
            'Failed to download PDF'
        );
      } else {
        setError('Failed to download PDF');
      }
    } finally {
      setLoading(false);
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
            AI Dispute Letter Generator
          </Typography>
          <Box
            component="form"
            onSubmit={handleGenerate}
            sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              label="Dispute Type"
              value={disputeType}
              onChange={(e) => setDisputeType(e.target.value)}
              required
              fullWidth
              autoFocus
            />
            <TextField
              label="Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
              fullWidth
              multiline
              rows={4}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ fontWeight: 600 }}
              fullWidth
            >
              {loading ? 'Generating...' : 'Generate Letter'}
            </Button>
          </Box>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          {letter && (
            <Box sx={{ mb: 4 }}>
              <Typography fontWeight={600} sx={{ mb: 1 }}>
                Generated Letter:
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  bgcolor: 'grey.50',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace',
                }}
              >
                {letter}
              </Paper>
              <Button
                onClick={handleDownloadPdf}
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
                disabled={loading}
              >
                Download as PDF
              </Button>
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
