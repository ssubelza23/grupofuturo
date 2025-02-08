import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, TextField, Button, Typography, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { blocksApi, projectsApi } from '../services/axiosConfig';

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

const AddBlockModal = ({ open, handleClose, fetchBlocks }) => {
  const [name, setName] = useState('');
  const [projectId, setProjectId] = useState('');
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setName('');
      setProjectId('');
      setError('');
      fetchProjects();
    }
  }, [open]);

  const fetchProjects = async () => {
    try {
      const response = await projectsApi.get('/');
      setProjects(response.data);
    } catch (error) {
      console.error('Error al obtener los proyectos:', error);
    }
  };

  const handleAddBlock = async () => {
    try {
      const newBlock = {
        name,
        project_id: projectId,
      };
      await blocksApi.post('/', newBlock);
      fetchBlocks(); // Refrescar la lista de bloques
      handleClose(); // Cerrar el modal
    } catch (error) {
      console.error('Error al agregar el bloque:', error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Error al agregar el bloque.');
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
          Agregar Bloque
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
        <FormControl fullWidth margin="normal">
          <InputLabel id="project-select-label">Proyecto</InputLabel>
          <Select
            labelId="project-select-label"
            id="project-select"
            value={projectId}
            label="Proyecto"
            onChange={(e) => setProjectId(e.target.value)}
          >
            {projects.map((project) => (
              <MenuItem key={project.id} value={project.id}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleAddBlock}
          sx={{ mt: 3, mb: 2 }}
        >
          Agregar
        </Button>
      </Box>
    </Modal>
  );
};

// Definir las prop-types para el componente
AddBlockModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fetchBlocks: PropTypes.func.isRequired,
};

export default AddBlockModal;