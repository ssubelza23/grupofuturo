import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Snackbar, Alert, Box } from '@mui/material';
import { usersApi } from '../services/axiosConfig';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [openMessage, setOpenMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setOpenMessage(false);

    if (!email) {
      setMessage('El correo electrónico es obligatorio.');
      setOpenMessage(true);
      return;
    }

    try {
      await usersApi.post('/forgot-password', { email });
      setMessage('Se ha enviado un enlace de recuperación a tu correo electrónico.');
      setOpenMessage(true);
    } catch (error) {
      console.error('Error al enviar el correo de recuperación:', error);
      setMessage('Error al enviar el correo de recuperación.');
      setOpenMessage(true);
    }
  };

  const handleCloseMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenMessage(false);
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
            Recuperar Contraseña
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Enviar Enlace de Recuperación
            </Button>
          </form>
          <Snackbar open={openMessage} autoHideDuration={6000} onClose={handleCloseMessage}>
            <Alert onClose={handleCloseMessage} severity="info" sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPassword;