import React from 'react';
import PropTypes from 'prop-types';
import { Polygon,Tooltip } from 'react-leaflet';

import L from 'leaflet';

const Blocks = ({ blocks, zoomLevel }) => {
  
  return (
    <>
        {zoomLevel < 17 && blocks.map((block) => (
          <Polygon
            key={block.id}
            positions={block.coordinates[0].map(coord => [coord[1], coord[0]])}
            pathOptions={{ color: 'purple' }}
          >
            <Tooltip>
              <div>
                <strong>{block.name}</strong><br />
              </div>
            </Tooltip>
          </Polygon>
        ))}

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