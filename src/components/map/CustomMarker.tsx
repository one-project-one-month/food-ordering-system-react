import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { customIcon } from '../../utils/customIcon';
import { Marker } from 'react-leaflet';

interface CustomMarkerProps {
  position: L.LatLngExpression;
  children: React.ReactNode; // Content to display inside the marker
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ position, children }) => {
  return (
    <Marker position={position} icon={customIcon}>
      {children}
    </Marker>
  );
};

export default CustomMarker;
