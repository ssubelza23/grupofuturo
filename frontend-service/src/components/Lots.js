import React from 'react';
import PropTypes from 'prop-types';
import { Polygon, Tooltip } from 'react-leaflet';

const Lots = ({ lots, zoomLevel, openModal, getLotColor,user }) => {
  return (
    <>
          {zoomLevel >= 18 && lots.map((lot) => (
          <Polygon
            key={lot.id}
            positions={Array.isArray(lot.coordinates) && Array.isArray(lot.coordinates[0]) ? lot.coordinates[0].map(coord => [coord[1], coord[0]]) : []}
            pathOptions={{ color: getLotColor(lot.status) }}
            eventHandlers={{
              dblclick: () => openModal(lot,user),
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
    </>
  );
};

Lots.propTypes = {
  lots: PropTypes.array.isRequired,
  zoomLevel: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
  getLotColor: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Lots;