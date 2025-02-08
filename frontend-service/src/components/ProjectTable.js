import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, TablePagination, TextField } from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { projectsApi } from '../services/axiosConfig';
import AddProjectModal from './AddProjectModal';

const ProjectTable = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [openAddProjectModal, setOpenAddProjectModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    setFilteredProjects(
      projects.filter((project) =>
        (project.name || '').toLowerCase().includes(filter.toLowerCase()) ||
        (project.description || '').toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, projects]);

  const fetchProjects = async () => {
    try {
      const response = await projectsApi.get('/');
      setProjects(response.data);
    } catch (error) {
      console.error('Error al obtener los proyectos:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await projectsApi.delete(`/${id}`);
      fetchProjects(); // Refrescar la lista de proyectos
    } catch (error) {
      console.error('Error al eliminar el proyecto:', error);
    }
  };

  const handleEdit = (id) => {
    // Lógica para editar el proyecto
    console.log(`Editar proyecto con id: ${id}`);
  };

  const handleView = (id) => {
    // Lógica para ver el proyecto
    console.log(`Ver proyecto con id: ${id}`);
  };

  const handleAddProject = () => {
    setOpenAddProjectModal(true);
  };

  const handleCloseAddProjectModal = () => {
    setOpenAddProjectModal(false);
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
        <Button variant="contained" color="primary" onClick={handleAddProject} style={{ margin: '10px' }}>
          Agregar Proyecto
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
            {filteredProjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.id}</TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleView(project.id)}>
                    <Visibility />
                  </IconButton>
                  <IconButton color="primary" onClick={() => handleEdit(project.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(project.id)}>
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
          count={filteredProjects.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <AddProjectModal open={openAddProjectModal} handleClose={handleCloseAddProjectModal} fetchProjects={fetchProjects} />
    </>
  );
};

export default ProjectTable;