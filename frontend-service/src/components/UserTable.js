import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, TablePagination, TextField } from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { usersApi } from '../services/axiosConfig';
import AddUserModal from './AddUserModal';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        (user.name || '').toLowerCase().includes(filter.toLowerCase()) ||
        (user.email || '').toLowerCase().includes(filter.toLowerCase()) ||
        (user.role || '').toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, users]);

  const fetchUsers = async () => {
    try {
      const response = await usersApi.get('/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await usersApi.delete(`/${id}`);
      fetchUsers(); // Refrescar la lista de usuarios
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleEdit = (id) => {
    // Lógica para editar el usuario
    console.log(`Editar usuario con id: ${id}`);
  };

  const handleView = (id) => {
    // Lógica para ver el usuario
    console.log(`Ver usuario con id: ${id}`);
  };

  const handleAddUser = () => {
    setOpenAddUserModal(true);
  };

  const handleCloseAddUserModal = () => {
    setOpenAddUserModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Button variant="contained" color="primary" onClick={handleAddUser} style={{ margin: '10px' }}>
          Agregar Usuario
        </Button>
        <TextField
          label="Filtrar"
          variant="outlined"
          value={filter}
          onChange={handleFilterChange}
          style={{ margin: '10px' }}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.user_type}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleView(user.id)}>
                    <Visibility />
                  </IconButton>
                  <IconButton color="primary" onClick={() => handleEdit(user.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(user.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <AddUserModal open={openAddUserModal} handleClose={handleCloseAddUserModal} fetchUsers={fetchUsers} />
    </>
  );
};

export default UserTable;