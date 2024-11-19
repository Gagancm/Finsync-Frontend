import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Simulate login process
  const handleLogin = (e) => {
    e.preventDefault();

    // Simulating a login check (e.g., hardcoded credentials)
    if (email === 'user@example.com' && password === 'password123') {
      // Store the token in localStorage to simulate login
      localStorage.setItem('authToken', 'your-auth-token');
      // Redirect to dashboard
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
        <Typography variant="h5" align="center">Login</Typography>
        <form onSubmit={handleLogin} noValidate>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
          <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
            <Grid item>
              <Typography variant="body2" component="span">
                Don't have an account?{' '}
                <Link to="/signup" style={{ color: 'blue' }}>
                  Sign Up
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
