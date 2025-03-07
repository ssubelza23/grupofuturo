import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Paper, Snackbar, Alert, Box } from '@mui/material';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [openMessage, setOpenMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setOpenMessage(false);

    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      setOpenMessage(true);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_USER_SERVICES_API_URL}/reset-password`, { token, password });
      setMessage('Contraseña restablecida con éxito.');
      setOpenMessage(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      setMessage('Error al restablecer la contraseña.');
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
            Restablecer Contraseña
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Nueva Contraseña"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmar Contraseña"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Restablecer Contraseña
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

export default ResetPassword;