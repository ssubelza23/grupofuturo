import React from 'react';
import PropTypes from 'prop-types';
import { Polygon, Marker, Tooltip } from 'react-leaflet';
import { uploadsApi } from '../services/axiosConfig';
import L from 'leaflet';

const Projects = ({ projects, zoomLevel }) => {
  return (
    <>
      {projects.map((project) => {
        if (zoomLevel <= 16 && project.coordinates && project.coordinates.length > 0) {
          const positions = project.coordinates[0].map(coord => [coord[1], coord[0]]);
          const bounds = L.latLngBounds(positions);
          
          const icon = L.icon({
            iconUrl: `${uploadsApi.defaults.baseURL}/${project.photos[0]}`,
            iconSize: [100, 100], // Ajusta el tamaño del icono según sea necesario
            iconAnchor: [0, 0], // Ajusta el punto de anclaje del icono
            popupAnchor: [0, -50], // Ajusta el punto de anclaje del popup
          });

          return (
            <React.Fragment key={project.id}>
              <Polygon
                positions={positions}
                pathOptions={{
                  color: 'green',
                  fillColor: 'green',
                  fillOpacity: 0.5,
                }}
              />
              <Marker position={bounds.getCenter()} icon={icon}>
              </Marker>
            </React.Fragment>
          );
        }
        return null;
      })}
    </>
  );
};

Projects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      coordinates: PropTypes.arrayOf(
        PropTypes.arrayOf(
          PropTypes.arrayOf(PropTypes.number)
        )
      ).isRequired,
      photos: PropTypes.arrayOf(PropTypes.string).isRequired, // Asegúrate de que cada proyecto tenga una URL de imagen
    })
  ).isRequired,
  zoomLevel: PropTypes.number.isRequired,
};

export default Projects;