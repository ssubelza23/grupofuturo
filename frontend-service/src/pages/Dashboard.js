import React, { useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { Tabs, Tab, Box, Typography, Container } from '@mui/material';
import UserTable from '../components/UserTable';
import ProjectTable from '../components/ProjectTable';
import BlockTable from '../components/BlockTable';
import LotTable from '../components/LotTable';

const Dashboard = () => {
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ marginTop: '80px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          centered
        >
          <Tab label="Administrar Usuarios" value="/dashboard/users" component={Link} to="/dashboard/users" />
          <Tab label="Administrar Proyectos" value="/dashboard/projects" component={Link} to="/dashboard/projects" />
          <Tab label="Administrar Manzanos" value="/dashboard/blocks" component={Link} to="/dashboard/blocks" />
          <Tab label="Administrar Lotes" value="/dashboard/lots" component={Link} to="/dashboard/lots" />
        </Tabs>
      </Box>
      <Routes>
        <Route path="users" element={<UserTable />} />
        <Route path="projects" element={<ProjectTable />} />
        <Route path="blocks" element={<BlockTable />} />
        <Route path="lots" element={<LotTable />} />
      </Routes>
    </Container>
  );
};

export default Dashboard;