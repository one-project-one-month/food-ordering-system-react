/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from 'react';
import { type LatLngExpression } from 'leaflet';
import { useMapEvents, Popup } from 'react-leaflet';
import CustomMarker from './CustomMarker';
import { getAddress } from '../../services/apiGecoding';

export default function LocationMarker() {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState<{ state: string; city: string; locality: string } | null>(
    null
  );

  useEffect(() => {
    if (position) {
      const latitude = position.lat;
      const longitude = position.lng;
      async function fetchAddress() {
        try {
          const data = await getAddress({ latitude, longitude });
          if (data) {
            setAddress(data);
          }
        } catch (error) {
          console.error('Error fetching address:', error);
        }
      }
      void fetchAddress();
    }
  }, [position]);
  // Custom Location Marker
  const map = useMapEvents({
    click(e: { latlng: LatLngExpression }) {
      const latlng = e.latlng as { lat: number; lng: number };
      setPosition({ lat: latlng.lat, lng: latlng.lng });
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position !== null ? (
    <div>
      <CustomMarker position={position}>
        <Popup>
          {
            <p>
              {address
                ? `${address.state},${address.city} City,${address.locality} Township`
                : 'We cannot access your location.'}{' '}
              <br />
              {`Latitude: ${position.lat.toFixed(8)}`} <br />
              {`Longitude: ${position.lng.toFixed(8)}`}
            </p>
          }
        </Popup>
      </CustomMarker>
    </div>
  ) : null;
}
