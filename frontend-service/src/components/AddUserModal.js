import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, TextField, Button,FormControl,InputLabel,Select, MenuItem} from '@mui/material';
import { usersApi } from '../services/axiosConfig';

const AddUserModal = ({ open, handleClose, fetchUsers }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');

  const handleAddUser = async () => {
    try {
      await usersApi.post('/', {
        user_name: `${firstName} ${lastName}`,
        first_name: firstName,
        last_name: lastName,
        email: email,
        user_type: userType,
      });
      console.log('Usuario agregado correctamente');
      fetchUsers(); // Refrescar la lista de usuarios
      handleClose(); // Cerrar el modal
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Agregar Usuario
        </Typography>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Apellido"
          variant="outlined"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
         <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="user-type-label">Rol</InputLabel>
          <Select
            labelId="user-type-label"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            label="Rol"
          >
            <MenuItem value="vendedor">Vendedor</MenuItem>
            <MenuItem value="comprador">Comprador</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleAddUser}>
          Agregar
        </Button>
      </Box>
    </Modal>
  );
};

AddUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
};

export default AddUserModal;