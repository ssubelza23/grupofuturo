import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, TextField, Button, Typography, Alert } from '@mui/material';
import { projectsApi } from '../services/axiosConfig';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddProjectModal = ({ open, handleClose, fetchProjects }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setName('');
      setDescription('');
      setError('');
    }
  }, [open]);

  const handleAddProject = async () => {
    try {
      const newProject = {
        name,
        description,
      };
      await projectsApi.post('/', newProject);
      fetchProjects(); // Refrescar la lista de proyectos
      handleClose(); // Cerrar el modal
    } catch (error) {
      console.error('Error al agregar el proyecto:', error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Error al agregar el proyecto.');
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Agregar Proyecto
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Nombre"
          name="name"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          label="Descripción"
          name="description"
          autoComplete="off"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleAddProject}
          sx={{ mt: 3, mb: 2 }}
        >
          Agregar
        </Button>
      </Box>
    </Modal>
  );
};

// Definir las prop-types para el componente
AddProjectModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
};

export default AddProjectModal;