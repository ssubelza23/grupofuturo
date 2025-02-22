import React from 'react';
import { Box, Typography, List, ListItem, ListItemText,Container } from '@mui/material';

const HowToBuy = () => {
  return (
    <Container sx={{ mt: 8 }}> {/* Agregar margen superior */}
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Cómo Comprar
      </Typography>
      <Typography variant="body1" paragraph>
        Comprar una propiedad con nosotros es un proceso sencillo y directo. Aquí tienes los pasos que debes seguir:
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="1. Explora nuestras propiedades disponibles en el mapa interactivo." />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. Selecciona la propiedad que te interesa y revisa los detalles." />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. Contacta con nosotros para obtener más información o para programar una visita." />
        </ListItem>
        <ListItem>
          <ListItemText primary="4. Una vez que hayas decidido comprar, te guiaremos a través del proceso de reserva y compra." />
        </ListItem>
        <ListItem>
          <ListItemText primary="5. Completa la transacción y disfruta de tu nueva propiedad." />
        </ListItem>
      </List>
      <Typography variant="body1" paragraph>
        Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos. Estamos aquí para ayudarte en cada paso del camino.
      </Typography>
    </Box>
  </Container>
  );
};

export default HowToBuy;