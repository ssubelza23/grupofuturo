import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { lotsApi } from '../services/axiosConfig';

const LotModalCliente = ({ open, lotId, handleClose, onLotUpdated, user }) => {
  const [lotData, setLotData] = useState({
    name: '',
    price: '',
    surface: '',
    status: '',
    reserved_by: '',
    reserved_for: '',
  });
  const [originalLotData, setOriginalLotData] = useState({});
  const [canEdit, setCanEdit] = useState(false); // Estado para controlar si el usuario puede modificar el lote
  const isAuthenticated = !!localStorage.getItem('token'); // Verificar si el usuario está autenticado
  const token = localStorage.getItem('token'); // Obtener el token de autenticación
  const userId = localStorage.getItem('id_user'); // Obtener el user_id del usuario autenticado

  const fetchLotData = () => {
    if (lotId) {
      // Fetch lot data when the modal opens
      lotsApi.get(`/${lotId}`)
        .then(response => {
          const data = response.data;
          setLotData({
            name: data.name || '',
            price: data.price || '',
            surface: data.surface || '',
            status: data.status || '',
            reserved_by: data.reserved_by || '',
            reserved_for: data.reserved_for || '',
          });
          setOriginalLotData(data);
          if (isAuthenticated && user && (data.status === 'available' || (user.email === data.reserved_by && (data.status === 'reserved' || data.status === 'sold')))) {
            setCanEdit(true);
          } else {
            setCanEdit(false);
          }
        })
        .catch(error => {
          console.error('Error fetching lot or seller data:', error);
        });
    }
  };

  useEffect(() => {
    if (open) {
      fetchLotData();
    }
  }, [open, lotId, token, userId, isAuthenticated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLotData(prevState => ({
      ...prevState,
      [name]: value,
    }));

    // Asignar el seller_id del usuario autenticado si el estado cambia a "reservado" o "vendido"
    if (name === 'status' && (value === 'reserved' || value === 'sold') && user) {
      setLotData(prevState => ({
        ...prevState,
        reserved_by: user.email,
      }));
    }

    // Limpiar los campos seller_id y buyer si el estado cambia a "disponible"
    if (name === 'status' && value === 'available') {
      setLotData(prevState => ({
        ...prevState,
        reserved_by: '',
        reserved_for: '',
      }));
    }
  };

  const handleUpdate = async () => {
    // Verificar que todos los campos requeridos estén presentes
    if (!lotData.name || !lotData.price || !lotData.surface || !lotData.status) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }

    console.log('Datos enviados lotmodal:', lotData); // Imprimir los datos antes de enviarlos
    try {
      const response = await lotsApi.put(`/${lotId}`, lotData);
      onLotUpdated(response.data);
      handleClose();
    } catch (error) {
      console.error('Error updating lot modal:', error);
      alert('Error updating lot');
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      BackdropProps={{
        onClick: handleClose,
      }}
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography id="modal-title" variant="h6" component="h2">
          {isAuthenticated ? 'Modificar Lote' : 'Información del Lote'}
        </Typography>
        <TextField
          label="Nombre"
          name="name"
          value={lotData.name}
          onChange={handleChange}
          fullWidth
          sx={{ mt: 2 }}
          InputProps={{
            readOnly: !canEdit,
          }}
        />
        <TextField
          label="Precio"
          name="price"
          value={lotData.price}
          onChange={handleChange}
          fullWidth
          sx={{ mt: 2 }}
          InputProps={{
            readOnly: !canEdit,
          }}
        />
        <TextField
          label="Superficie"
          name="surface"
          value={lotData.surface}
          onChange={handleChange}
          fullWidth
          sx={{ mt: 2 }}
          InputProps={{
            readOnly: !canEdit,
          }}
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="status-label">Estado</InputLabel>
          <Select
            labelId="status-label"
            name="status"
            value={lotData.status}
            label="Estado"
            onChange={handleChange}
            disabled={!canEdit}
          >
            <MenuItem value="available">Disponible</MenuItem>
            <MenuItem value="sold">Vendido</MenuItem>
            <MenuItem value="reserved">Reservado</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Reservado para"
          name="reserved_for"
          value={lotData.reserved_for}
          onChange={handleChange}
          fullWidth
          sx={{ mt: 2 }}
          InputProps={{
            readOnly: !canEdit,
          }}
        />
        {canEdit && (
          <Button onClick={handleUpdate} sx={{ mt: 2 }} variant="contained" color="primary">
            Actualizar Lote
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default LotModalCliente;