import React from 'react';
import { MapContainer, TileLayer, Marker, LayersControl, Tooltip, useMapEvents } from 'react-leaflet';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography } from '@mui/material';
import Projects from './Projects';
import Blocks from './Blocks';
import Lots from './Lots';
import Streets from './Streets';
import L from 'leaflet';

const redIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const MapSection = ({ projects, lots, blocks, streets, showProjects, showLots, showBlocks, showStreets, setShowProjects, setShowLots, setShowBlocks, setShowStreets, zoomLevel, setZoomLevel, isFullScreen, setIsFullScreen, openModal, getLotColor, user }) => {
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
    <MapContainer center={[-34.977023, -58.053131]} zoom={zoomLevel} style={{ height: '100%', width: '100%' }} isFullScreen={isFullScreen}>
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
      {showLots && <Lots lots={lots} zoomLevel={zoomLevel} openModal={openModal} getLotColor={getLotColor} user={user} />}
      {showStreets && <Streets streets={streets} zoomLevel={zoomLevel} />}
      {/* Punto estático */}
      <Marker
        position={[-34.9215, -57.9546]} // Coordenadas estáticas
        icon={redIcon}
      >
        <Tooltip>Punto Estático</Tooltip>
      </Marker>
    </MapContainer>
  );
};

export default MapSection;