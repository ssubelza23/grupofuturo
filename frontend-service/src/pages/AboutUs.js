import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';

const AboutUs = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Sobre Nosotros
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Bienvenido a Grupo Futuro
        </Typography>
        <Typography variant="body1" paragraph>
          En Grupo Futuro, nos dedicamos a ofrecer las mejores soluciones inmobiliarias para nuestros clientes. Con años de experiencia en el mercado, nos enorgullece brindar un servicio personalizado y de alta calidad.
        </Typography>
        <Typography variant="body1" paragraph>
          Nuestro equipo está compuesto por profesionales altamente capacitados y comprometidos con la satisfacción de nuestros clientes. Nos esforzamos por entender las necesidades de cada cliente y ofrecer soluciones que se adapten a sus expectativas.
        </Typography>
        <Typography variant="body1" paragraph>
          Ya sea que estés buscando comprar, vender o alquilar una propiedad, en Grupo Futuro estamos aquí para ayudarte en cada paso del camino.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              Misión
            </Typography>
            <Typography variant="body1">
              Nuestra misión es proporcionar servicios inmobiliarios de alta calidad, ayudando a nuestros clientes a encontrar la propiedad perfecta que se ajuste a sus necesidades y presupuesto.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              Visión
            </Typography>
            <Typography variant="body1">
              Ser la empresa líder en el mercado inmobiliario, reconocida por nuestra integridad, profesionalismo y compromiso con la satisfacción del cliente.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              Valores
            </Typography>
            <Typography variant="body1">
              Nos guiamos por valores de integridad, transparencia, compromiso y excelencia en todo lo que hacemos.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUs;