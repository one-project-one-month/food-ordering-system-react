/* eslint-disable @typescript-eslint/restrict-template-expressions */
// import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { LocateIcon } from 'lucide-react';
import Map from './Map';
import { getAddress } from '../../services/apiGecoding';
import { useEffect, useState } from 'react';

// interface MapWithLeafProps {
//   getCoordinate: (p: GeolocationPosition) => GeolocationPosition;
// }
export default function MapWithLeaf() {
  const [address, setAddress] = useState<{ state: string; city: string; locality: string } | null>(
    null
  );
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const getCoordinate = (p: GeolocationPosition) => {
    setPosition({ lat: p.coords.latitude, lng: p.coords.longitude });
    return position;
  };
  console.log(position);

  const getCoordinates = (p: GeolocationPosition) => {
    return getCoordinate(p);
  };

  const fetchAddress = async () => {
    try {
      if (position) {
        const data = await getAddress({ latitude: position.lat, longitude: position.lng });
        if (data) {
          setAddress(data);
        }
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  useEffect(() => {
    if (position) {
      void fetchAddress();
    }
  }, [position]);
  const locateUser = () => {
    navigator.geolocation.getCurrentPosition(getCoordinates);
  };

  return (
    <div className="relative">
      <div id="map" className=" h-56 w-full  lg:mt-0 mt-64 mb-10 ">
        <div className="flex justify-between">
          <div className="mb-3">
            <h1 className="text-2xl font-bold mb-4">Select Location.</h1>
            <span className="text-sm italic underline text-yellow-500">
              By clicking the mark,get your latitude and longitude .
            </span>
          </div>
          <Button onClick={locateUser}>
            <LocateIcon /> Get Location
          </Button>
        </div>
        <Map position={position} address={address} type={'toCreate'} />
      </div>
    </div>
  );
}
