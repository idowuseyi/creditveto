'use client';
import { useState } from 'react';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('user');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin ? { email, password } : { email, password, role };
      const res = await api.post(endpoint, payload);
      if (isLogin) {
        localStorage.setItem('token', res.data.access_token);
        router.push('/dashboard');
      } else {
        setIsLogin(true);
      }
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
        setError('Failed to login');
      }
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper elevation={4} sx={{ p: 5, width: '100%' }}>
        <Typography
          variant="h4"
          fontWeight={700}
          color="primary"
          align="center"
          gutterBottom
        >
          {isLogin ? 'Login' : 'Register'}
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            autoFocus
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          {!isLogin && (
            <FormControl fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ fontWeight: 600 }}
          >
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </Box>
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button color="secondary" onClick={() => setIsLogin((v) => !v)}>
            {isLogin
              ? "Don't have an account? Register"
              : 'Already have an account? Login'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
