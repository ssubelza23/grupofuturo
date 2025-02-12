import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Snackbar, Alert,Box } from '@mui/material';
import { usersApi } from '../services/axiosConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setOpenError(false);
    setOpenSuccess(false);

    if (!email || !password) {
      setError('Todos los campos son obligatorios.');
      setOpenError(true);
      return;
    }

    try {
      const response = await usersApi.post('/login', { email, password });
      const token = response.data.token;
  
      localStorage.setItem('token', token); // Guardar el token en localStorage
      setOpenSuccess(true);
      setTimeout(() => {
        window.location.href = '/'; // Redirigir al dashboard
      }, 2000);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      if (error.response) {
        setError(error.response.data.message || 'Credenciales incorrectas.');
      } else {
        setError('Error al conectar con el servidor.');
      }
      setOpenError(true);
    }
  };

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}
  >
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Iniciar Sesión
          </Button>
        </form>
        <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
        <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
          <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
            Inicio de sesión exitoso
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
    </Box>
  );
};

export default Login;