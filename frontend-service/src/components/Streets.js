import React from 'react';
import PropTypes from 'prop-types';
import { Polyline, Tooltip } from 'react-leaflet';

const Streets = ({ streets, zoomLevel }) => {
  console.log("🚧 streets", streets);
  if (!streets || !Array.isArray(streets) || streets.length === 0) {
    console.warn("⚠️ No hay calles disponibles todavía.");
    return null; // Evita renderizar si no hay datos
  }
  return (
    <>
     {zoomLevel >= 18 && streets.map((street) => (
          <Polyline
            key={street.id}
            positions={street.geom.coordinates.map(coord => [coord[1], coord[0]])}
            pathOptions={{ color: 'white' ,weight: 5}}
          >
            <Tooltip>
              <div>
                <strong>{street.name}</strong>
              </div>
            </Tooltip>
          </Polyline>
        ))}
    </>
  );
};

Streets.propTypes = {
  streets: PropTypes.array.isRequired,
  zoomLevel: PropTypes.number.isRequired,
};

export default Streets;