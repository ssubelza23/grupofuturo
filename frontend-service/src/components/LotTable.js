import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination, TextField } from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { lotsApi } from '../services/axiosConfig';


const LotTable = () => {
  const [lots, setLots] = useState([]);
  const [filteredLots, setFilteredLots] = useState([]);
 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchLots();
  }, []);

  useEffect(() => {
    setFilteredLots(
      lots.filter((lot) =>
        (lot.name || '').toLowerCase().includes(filter.toLowerCase()) ||
         (lot.status || '').toLowerCase().includes(filter.toLowerCase()) ||
         (lot.project || '').toLowerCase().includes(filter.toLowerCase()) ||
        (lot.description || '').toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, lots]);

  const fetchLots = async () => {
    try {
      const response = await lotsApi.get('/');
      setLots(response.data);
      console.log('Lotes:', response.data);
    } catch (error) {
      console.error('Error al obtener los lotes:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await lotsApi.delete(`/${id}`);
      fetchLots(); // Refrescar la lista de lotes
    } catch (error) {
      console.error('Error al eliminar el lote:', error);
    }
  };

  const handleEdit = (id) => {
    // Lógica para editar el lote
    console.log(`Editar lote con id: ${id}`);
  };

  const handleView = (id) => {
    // Lógica para ver el lote
    console.log(`Ver lote con id: ${id}`);
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
              <TableCell>precio</TableCell>
              <TableCell>estado</TableCell>
              <TableCell>Reservado por</TableCell>
              <TableCell>Reservado para</TableCell>
              <TableCell>Proyecto</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLots.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((lot) => (
              <TableRow key={lot.id}>
                <TableCell>{lot.id}</TableCell>
                <TableCell>{lot.name}</TableCell>
                <TableCell>{lot.price}</TableCell>
                <TableCell>{lot.status}</TableCell>
                <TableCell>{lot.reserved_by}</TableCell>
                <TableCell>{lot.reserved_for}</TableCell>
                <TableCell>{lot.project_name}</TableCell>
                <TableCell>
               
                  <IconButton color="primary" onClick={() => handleEdit(lot.id)}>
                    <Edit />
                  </IconButton>
               
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredLots.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      
    </>
  );
};

export default LotTable;