import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { Button } from '../ui/button';
import { LocateIcon } from 'lucide-react';
import type { LatLngExpression } from 'leaflet';
import { customIcon, questionIcon } from '../../utils/customIcon';
import { getAddress } from '../../services/apiGecoding';
import LocationMarker from './LocationMarker';

export default function MapWithLeaf() {
  // Custom Location Marker
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  const [address, setAddress] = useState<{ state: string; city: string; locality: string } | null>(
    null
  );
  const getCoordinate = (p: any) => {
    setPosition({ lat: p.coords.latitude, lng: p.coords.longitude });
  };

  useEffect(() => {
    if (position) {
      const latitude = position?.lat;
      const longitude = position?.lng;
      async function fetchAddress() {
        try {
          const data = await getAddress({ latitude, longitude });
          setAddress(data);
        } catch (error) {
          console.error('Error fetching address:', error);
        }
      }
      fetchAddress();
    }
  }, [position]);
  const locateUser = () => {
    navigator.geolocation.getCurrentPosition(getCoordinate);
    console.log(position);
  };
  return (
    <div className="relative">
      <h1 className="text-2xl font-bold mb-4">Please select your current address.</h1>
      <div className="absolute  top-14 right-5 z-[1000]">
        <Button onClick={locateUser}>
          <LocateIcon /> Get Location
        </Button>
      </div>
      <MapContainer
        center={[16.802104200884262, 96.15716131013824]}
        zoom={12}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {position ? (
          //If user access GPS,collect the location
          <Marker
            position={[position.lat, position.lng]}
            icon={address?.state ? customIcon : questionIcon}
          >
            <Popup>
              <span>This is just only township and city.Sorry,we cannot guess your quarter.</span>
              <p>
                {address
                  ? `${address?.state},${address?.city} City,${address?.locality} Township`
                  : 'We cannot access you location.'}
              </p>
            </Popup>
          </Marker>
        ) : (
          //If user doesn't access,this is for the custom location.
          <LocationMarker />
        )}
      </MapContainer>
    </div>
  );
}
