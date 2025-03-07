import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Polygon, Marker, Tooltip, LayersControl, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LotModalCliente from '../components/LotModalCliente';
import { Typography, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { projectsApi, blocksApi, lotsApi } from '../services/axiosConfig';

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

const ProjectDetail = ({ user }) => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [projectBlocks, setProjectBlocks] = useState([]);
  const [projectLots, setProjectLots] = useState([]);
  const [isLotModalOpen, setIsLotModalOpen] = useState(false);
  const [selectedLot, setSelectedLot] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(16);
  const [updateFlag, setUpdateFlag] = useState(false); // Estado para forzar la actualización
  const navigate = useNavigate();

  useEffect(() => {
    loadProjectData();
  }, [projectId, updateFlag]); // Agregar updateFlag como dependencia

  const loadProjectData = async () => {
    try {
      const projectResponse = await projectsApi.get(`/${projectId}`);
      const foundProject = projectResponse.data;
      setProject(foundProject);

      const blocksResponse = await blocksApi.get('/');
      const relatedBlocks = blocksResponse.data.filter(b => b.project_id === foundProject.id);
      setProjectBlocks(relatedBlocks);

      const lotsResponse = await lotsApi.get('/');
      const relatedLots = lotsResponse.data.filter(l => relatedBlocks.some(b => b.id === l.block_id));
      setProjectLots(relatedLots);
    } catch (error) {
      console.error('Error loading project data:', error);
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  // Verificar y corregir el formato de las coordenadas
  const projectCoordinates = project.coordinates[0].map(coord => [coord[1], coord[0]]);
  const center = projectCoordinates[0];

  // Verificar que las coordenadas sean válidas
  if (!center || center.length !== 2 || isNaN(center[1]) || isNaN(center[0])) {
    return <div>Error: Coordenadas inválidas</div>;
  }

  const openModal = (lot) => {
    setSelectedLot(lot);
    setIsLotModalOpen(true);
  };

  const closeModal = () => {
    setIsLotModalOpen(false);
    setSelectedLot(null);
    setUpdateFlag(prev => !prev); // Cambiar el estado para forzar la actualización
  };

  const MapEvents = () => {
    useMapEvents({
      zoomend: (e) => {
        setZoomLevel(e.target.getZoom());
      }
    });
    return null;
  };

  const handleBackClick = () => {
    navigate('/projects');
  };

  return (
    <div>
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
        <IconButton sx={{ color: '#FFFFFF' }} onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>
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
          {project.name}
        </Typography>
      </Box>
      <MapContainer center={center} zoom={16} style={{ height: '800px', width: '100%' }}>
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
        {zoomLevel <= 16 && projectBlocks.map(block => (
          <Polygon
            key={block.id}
            positions={block.coordinates[0].map(coord => [coord[1], coord[0]])}
            pathOptions={{ color: 'blue' }}
          >
            <Tooltip>
              <div>
                <strong>{block.name}</strong><br />
              </div>
            </Tooltip>
          </Polygon>
        ))}
        {zoomLevel >= 17 && projectLots.map(lot => (
          <Polygon
            key={lot.id}
            positions={Array.isArray(lot.coordinates) && Array.isArray(lot.coordinates[0]) ? lot.coordinates[0].map(coord => [coord[1], coord[0]]) : []}
            pathOptions={{ color: getLotColor(lot.status) }}
            eventHandlers={{
              dblclick: () => openModal(lot),
            }}
          >
            <Tooltip>
              <div>
                <strong>Lote N°{lot.name}</strong><br />
                Superficie: {lot.surface} m²<br />
                Precio: ${lot.price} dolares
              </div>
            </Tooltip>
          </Polygon>
        ))}
        <Marker position={center} icon={redIcon}>
          <Tooltip>{project.name}</Tooltip>
        </Marker>
      </MapContainer>
      <LotModalCliente
        open={isLotModalOpen}
        handleClose={closeModal}
        lotId={selectedLot ? selectedLot.id : null}
        onLotUpdated={loadProjectData} // Recargar los datos después de actualizar el lote
        user={user}
      />
    </div>
  );
};

export default ProjectDetail;