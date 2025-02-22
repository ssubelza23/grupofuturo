import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, LayersControl, Tooltip, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { projectsApi, lotsApi, blocksApi, streetsApi } from '../services/axiosConfig';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import LotModalCliente from '../components/LotModalCliente';
import Blocks from '../components/Blocks';
import Projects from '../components/Projects';
import Lots from '../components/Lots';
import Streets from '../components/Streets';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';

const redIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const getLotColor = (status) => {
  switch (status) {
    case 'available':
      return 'green';
    case 'reserved':
      return 'orange';
    case 'sold':
      return 'red';
    default:
      return 'gray';
  }
};

const Home = ({ user }) => {
  const [projects, setProjects] = useState([]);
  const [lots, setLots] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [streets, setStreets] = useState([]);
  const [showProjects, setShowProjects] = useState(true);
  const [showLots, setShowLots] = useState(true);
  const [showBlocks, setShowBlocks] = useState(true);
  const [showStreets, setShowStreets] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(11);
  const [isLotModalOpen, setIsLotModalOpen] = useState(false);
  const [selectedLot, setSelectedLot] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    projectsApi.get('/')
      .then(response => {
        setProjects(response.data);
      console.log(response.data);
      })
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  useEffect(() => {
    const fetchLots = async () => {
      try {
        const response = await lotsApi.get('/');
        setLots(response.data);
       
      } catch (error) {
        console.error('Error fetching lots:', error);
      }
    };

    fetchLots();
  }, []);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await blocksApi.get('/');
        setBlocks(response.data);
      
      } catch (error) {
        console.error('Error fetching blocks:', error);
      }
    };

    fetchBlocks();
  }, []);

  useEffect(() => {
    const fetchStreets = async () => {
      try {
        const response = await streetsApi.get('/');
        setStreets(response.data);
      } catch (error) {
        console.error('Error fetching streets:', error);
      }
    };

    fetchStreets();
  }, []);

  const handleLotUpdated = async () => {
    try {
      const lotsResponse = await lotsApi.get('/');
      setLots(lotsResponse.data);
    } catch (error) {
      console.error('Error actualizando los lotes:', error);
    }
  };

  const openModal = (lot) => {
    setSelectedLot(lot);
    setIsLotModalOpen(true);
  };

  const closeModal = () => {
    setIsLotModalOpen(false);
    setSelectedLot(null);
  };

  const MapEvents = () => {
    useMapEvents({
      zoomend: (e) => {
        setZoomLevel(e.target.getZoom());
        setIsFullScreen(true);
      },
      click: () => {
        setIsFullScreen(true);
      },
    });
    return null;
  };

  return (
    <div className="home-container">
      
      <Box sx={{ mt: 2, mb: 2 }}>
        <Hero projects={projects} />
      </Box>
      <Box sx={{ mt: 2, mb: 2 }}>
        <Benefits />
      </Box>
      <Box sx={{ height: '100vh' }}>
      <Box
        sx={{
          backgroundColor: '#25D366', // Fondo verde
          padding: '10px',
          borderRadius: '5px',
          textAlign: 'center',
          position: 'sticky', // Hacer que el elemento sea pegajoso
          top: 60, // Posición desde la parte superior de la pantalla
          zIndex: 1000, // Asegurar que el elemento esté por encima de otros elementos
        }}
      >
        <Typography
          variant="h5"
         
          component="h2"
          gutterBottom
          sx={{
            fontSize: {
              xs: '1.5rem', // Tamaño de fuente para pantallas pequeñas
              sm: '2rem', // Tamaño de fuente para pantallas medianas
              md: '2.5rem', // Tamaño de fuente para pantallas grandes
            },
            textShadow: '4px 4px 8px rgba(0, 0, 0, 1)', // Sombra más pronunciada
            color: '#FFFFFF', // Color blanco
            
          }}
        >
          Ubicaciones de proyectos y lotes disponibles
        </Typography>
      </Box>
        <MapContainer center={[-34.977023, -58.053131]} zoom={zoomLevel} style={{ height: '100%', width: '100%' }} isFullScreen = {isFullScreen}>
          <MapEvents />
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Google Streets">
              <TileLayer
                url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Google Satellite">
              <TileLayer
                url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
              />
            </LayersControl.BaseLayer>
          </LayersControl>

          <Accordion
            sx={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '5px',
              zIndex: 1000,
              width: '100px',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>...</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                className="layer-controls"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={showProjects}
                    onChange={() => setShowProjects(!showProjects)}
                  />
                  Proyectos
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={showLots}
                    onChange={() => setShowLots(!showLots)}
                  />
                  Lotes
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={showBlocks}
                    onChange={() => setShowBlocks(!showBlocks)}
                  />
                  Bloques
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={showStreets}
                    onChange={() => setShowStreets(!showStreets)}
                  />
                  Calles
                </label>
              </Box>
            </AccordionDetails>
          </Accordion>
          {showProjects && <Projects projects={projects} zoomLevel={zoomLevel} />}
          {showBlocks && <Blocks blocks={blocks} zoomLevel={zoomLevel} />}
          {showLots && <Lots lots={lots} zoomLevel={zoomLevel} openModal={openModal} getLotColor={getLotColor} user={user}/>}
          {showStreets && <Streets streets={streets} zoomLevel={zoomLevel} />}
          {/* Punto estático */}
          <Marker
            position={[-34.9215, -57.9546]} // Coordenadas estáticas
            icon={redIcon}
          >
            <Tooltip>Punto Estático</Tooltip>
          </Marker>
        </MapContainer>
      </Box>
      <LotModalCliente
        open={isLotModalOpen}
        handleClose={closeModal}
        lotId={selectedLot ? selectedLot.id : null}
        onLotUpdated={handleLotUpdated}
        user={user}
      />
      {/* Agregar ProjectTable y pasarle la lista de proyectos */}
  
    </div>
  );
};

Home.propTypes = {
     user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired, // Asegúrate de que el ID del usuario esté definido
  }).isRequired,
};

export default Home;