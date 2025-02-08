import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PaymentIcon from '@mui/icons-material/Payment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import lotesImage from '../assets/images/lotes.jpg'; // Importa la imagen
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0)', // Fondo semitransparente
  padding: theme.spacing(2),
  textAlign: 'center',
  color: 'white', // Color del texto blanco
  boxShadow: 'none', // Sin sombra
  border: 'none', // Sin borde
}));




export default function Hero() {
  const [] = useState([]);

  const handleContactClick = () => {
    window.open('https://wa.me/+5492215693951', '_blank'); // Reemplaza '1234567890' con tu número de WhatsApp
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      position: 'relative',
      top: 50,

      }}>
      <Box
        sx={{
          position: 'absolute',
         
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${lotesImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -2,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.2)', // Fondo negro semitransparente con menos opacidad
          zIndex: -1,
        }}
      />
      <Grid
        container
        spacing={2}
        sx={{
          height: '100vh', // Ajusta la altura según tus necesidades
          color: 'white', // Asegúrate de que el texto sea visible sobre la imagen
        }}
       
        justifyContent='center'
      >
        {/* Primera fila: Título y eslogan */}
        <Grid item xs={12} textAlign='center' >
          <Item>
            <Typography
              variant='h1'
              component='h1'
              gutterBottom
              sx={{
                fontSize: {
                  xs: '2rem', // Tamaño de fuente para pantallas pequeñas
                  sm: '3rem', // Tamaño de fuente para pantallas medianas
                  md: '4rem', // Tamaño de fuente para pantallas grandes
                },
                textShadow: '6px 6px 12px rgba(0, 0, 0, 1)', // Sombra más pronunciada
                color: '#FFFFFF', // Color blanco
              }}
            >
              Tu próximo terreno más cerca que nunca
            </Typography>
            <Typography
              variant='h3'
              component='p'
              sx={{
                fontSize: {
                  xs: '1rem', // Tamaño de fuente para pantallas pequeñas
                  sm: '1.5rem', // Tamaño de fuente para pantallas medianas
                  md: '2rem', // Tamaño de fuente para pantallas grandes
                },
                textShadow: '4px 4px 8px rgba(0, 0, 0, 1)', // Sombra más pronunciada
                color: '#FFFFFF', // Color blanco
              }}
            >
              El futuro de tus proyectos empieza aquí
            </Typography>
            <Button
              variant='contained'
              color='primary'
              sx={{
                mt: 2,
                backgroundColor: '#25D366', // Color verde de WhatsApp
                '&:hover': {
                  backgroundColor: '#128C7E', // Color más oscuro al pasar el mouse
                },
                fontSize: '1rem',
                padding: '10px 20px',
                borderRadius: '50px',
                textTransform: 'none',
              }}
              onClick={handleContactClick}
            >
              Contactar por WhatsApp
            </Button>
          </Item>
        </Grid>

      
      </Grid>
  
    </Box>
  );
}