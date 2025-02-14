import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { lotsApi } from '../services/axiosConfig';
import { usersApi } from '../services/axiosConfig';
import { Autocomplete } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const LotModalCliente = ({ open, lotId, handleClose, onLotUpdated, user }) => {
  const createWhatsAppLink = (lot) => {
    const message = `Hola, estoy interesado en el Lote N°${lot.name}.\nSuperficie: ${lot.surface} m²\nPrecio: $${lot.price} dólares. Proyecto ${lot.project_name} ${lot.block_name}.`;
    return `https://wa.me/+5492215693951?text=${encodeURIComponent(message)}`;
  };

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await usersApi.get('/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const [lotData, setLotData] = useState({
    name: '',
    price: '',
    surface: '',
    status: '',
    reserved_by: '',
    reserved_for: '',
    project_name: '',
    block_name: '',
  });

  const [setOriginalLotData] = useState({});
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
            project_name: data.project_name || '',
            block_name: data.block_name || '',
          });
          setOriginalLotData(data);
          if (isAuthenticated) {
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
    if (name === 'status' && (value === 'reserved' || value === 'sold')) {
      setLotData(prevState => ({
        ...prevState,
        reserved_by: selectedUser ? `${selectedUser.first_name} ${selectedUser.last_name}` : '',
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

  // Función para manejar el cambio de usuario seleccionado
  const handleUserChange = (event, value) => {
    setSelectedUser(value);
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
         Información del Lote
        </Typography>
        <a href={createWhatsAppLink(lotData)} target="_blank" rel="noopener noreferrer">
          <Button
            variant="contained"
            color="success"
            startIcon={<WhatsAppIcon />}
            sx={{ mt: 2, mb: 2 }}
          >
            Enviar a WhatsApp
          </Button>
        </a>
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
            sx={{
              backgroundColor: lotData.status === 'available' ? 'lightgreen' :
                               lotData.status === 'sold' ? 'lightcoral' :
                               lotData.status === 'reserved' ? 'orange' : 'white',
            }}
          >
            <MenuItem value="available">Disponible</MenuItem>
            <MenuItem value="sold">Vendido</MenuItem>
            <MenuItem value="reserved">Reservado</MenuItem>
          </Select>
        </FormControl>
        {isAuthenticated && (
        <Box>
          <Typography variant="h6" component="h2">
            Vendedor
          </Typography>
          <Autocomplete
            name="reserved_by"
            options={users}
            getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
            value={selectedUser}
            onChange={handleUserChange}
            renderInput={(params) => <TextField {...params} label="Vendedor" variant="outlined" />}
          />
        </Box>
        )}
        {isAuthenticated && (
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
        /> )}
        {isAuthenticated && (
          <Button onClick={handleUpdate} sx={{ mt: 2 }} variant="contained" color="primary">
            Actualizar Lote
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default LotModalCliente;