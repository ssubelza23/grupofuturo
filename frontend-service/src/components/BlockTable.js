import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, TablePagination, TextField } from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { blocksApi } from '../services/axiosConfig';
import AddBlockModal from './AddBlockModal';

const BlockTable = () => {
  const [blocks, setBlocks] = useState([]);
  const [filteredBlocks, setFilteredBlocks] = useState([]);
  const [openAddBlockModal, setOpenAddBlockModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchBlocks();
  }, []);

  useEffect(() => {
    setFilteredBlocks(
      blocks.filter((block) =>
        (block.name || '').toLowerCase().includes(filter.toLowerCase()) ||
        (block.description || '').toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, blocks]);

  const fetchBlocks = async () => {
    try {
      const response = await blocksApi.get('/');
      setBlocks(response.data);
    } catch (error) {
      console.error('Error al obtener los bloques:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await blocksApi.delete(`/${id}`);
      fetchBlocks(); // Refrescar la lista de bloques
    } catch (error) {
      console.error('Error al eliminar el bloque:', error);
    }
  };

  const handleEdit = (id) => {
    // Lógica para editar el bloque
    console.log(`Editar bloque con id: ${id}`);
  };

  const handleView = (id) => {
    // Lógica para ver el bloque
    console.log(`Ver bloque con id: ${id}`);
  };

  const handleAddBlock = () => {
    setOpenAddBlockModal(true);
  };

  const handleCloseAddBlockModal = () => {
    setOpenAddBlockModal(false);
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
        <Button variant="contained" color="primary" onClick={handleAddBlock} style={{ margin: '10px' }}>
          Agregar Bloque
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
              <TableCell>Descripción</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBlocks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((block) => (
              <TableRow key={block.id}>
                <TableCell>{block.id}</TableCell>
                <TableCell>{block.name}</TableCell>
                <TableCell>{block.project_name}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleView(block.id)}>
                    <Visibility />
                  </IconButton>
                  <IconButton color="primary" onClick={() => handleEdit(block.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(block.id)}>
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
          count={filteredBlocks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <AddBlockModal open={openAddBlockModal} handleClose={handleCloseAddBlockModal} fetchBlocks={fetchBlocks} />
    </>
  );
};

export default BlockTable;