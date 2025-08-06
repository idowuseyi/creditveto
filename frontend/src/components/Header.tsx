'use client';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const isLoggedIn =
    typeof window !== 'undefined' && localStorage.getItem('token');
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: 'divider' }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h5"
            color="primary"
            fontWeight={700}
            component={Link}
            href="/"
            sx={{ textDecoration: 'none' }}
          >
            CreditVeto
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button component={Link} href="/" color="primary">
              Home
            </Button>
            <Button component={Link} href="/about" color="primary">
              About Us
            </Button>
            <Button component={Link} href="/contact" color="primary">
              Contact
            </Button>
            {!isLoggedIn && (
              <>
                <Button
                  component={Link}
                  href="/auth?mode=login"
                  color="primary"
                  variant="outlined"
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  href="/auth?mode=register"
                  color="primary"
                  variant="contained"
                >
                  Register
                </Button>
              </>
            )}
            {isLoggedIn && (
              <IconButton color="primary" onClick={handleLogout} title="Logout">
                <LogoutIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
