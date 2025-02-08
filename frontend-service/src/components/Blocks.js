import React from 'react';
import PropTypes from 'prop-types';
import { Polygon, Marker, Tooltip } from 'react-leaflet';
import { uploadsApi } from '../services/axiosConfig';
import L from 'leaflet';

const Blocks = ({ blocks, zoomLevel }) => {
  return (
    <>
      {blocks.map((project) => {
        if (zoomLevel < 18 && project.coordinates && project.coordinates.coordinates) {
          const positions = project.coordinates.coordinates[0].map(coord => [coord[1], coord[0]]);
         
          return (
            <React.Fragment key={project.id}>
              <Polygon
                positions={positions}
                pathOptions={{
                  color: 'blue',
                  fillColor: 'blue',
                  fillOpacity: 0.5,
                }}
                
                  >
                          <Tooltip>
                            <div>
                              <strong>{project.name}</strong><br />
                             
                            </div>
                          </Tooltip>
                        </Polygon>
          
             
            </React.Fragment>
          );
        }
        return null;
      })}
    </>
  );
};

Blocks.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      coordinates: PropTypes.shape({
        coordinates: PropTypes.arrayOf(
          PropTypes.arrayOf(
            PropTypes.arrayOf(PropTypes.number)
          )
        ).isRequired,
      }).isRequired,
     
    })
  ).isRequired,
  zoomLevel: PropTypes.number.isRequired,
};

export default Blocks;