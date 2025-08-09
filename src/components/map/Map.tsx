import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import LocationMarker from './LocationMarker';
import { customIcon, questionIcon } from '../../utils/customIcon';

interface MapProps {
  position: { lat: number; lng: number } | null;
  address?: { state: string; city: string; locality: string } | null;
  type: 'toShow' | 'toCreate';
}
export default function Map({ position, address, type }: MapProps) {
  return (
    <MapContainer
      center={
        type === 'toCreate'
          ? [16.82187719, 96.1296443]
          : [Number(position?.lat), Number(position?.lng)]
      }
      zoom={15}
      scrollWheelZoom={true}
      style={{
        width: '100%',
        height: '400px',
        marginBottom: '20px',
        borderRadius: '8px',
        zIndex: 1,
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {position ? (
        //If user access GPS,collect the location
        <Marker
          position={[position.lat, position.lng]}
          icon={address !== null ? customIcon : questionIcon}
        >
          <Popup>
            <p>
              {address ? `${address.state},${address.city} City,${address.locality} Township` : ''}{' '}
              <br />
              Latitude: {String(position.lat).length > 12
                ? position.lat.toFixed(8)
                : position.lat}{' '}
              <br /> Longitude:{' '}
              {String(position.lng).length > 12 ? position.lng.toFixed(8) : position.lng}
            </p>
          </Popup>
        </Marker>
      ) : (
        //If user doesn't access,this is for the custom location.
        <LocationMarker />
      )}
    </MapContainer>
  );
}
