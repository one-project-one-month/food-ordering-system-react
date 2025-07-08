import { Input } from './ui/input';
import { Button } from './ui/button';
import MapWithLeaf from './map/MapWithLeaf';
import { getAddress } from '../services/apiGecoding';

export default function GetLocationTesting() {
  const getPosition = () => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
  const handleGetLocation = async () => {
    const position = await getPosition();
    const { latitude, longitude } = position.coords;
    const data = await getAddress({ latitude, longitude });
    console.log('Address data:', data);
    return data;
  };
  return (
    <div className=" flex flex-col w-full h-auto gap-2">
      <div>
        <Input type="text" placeholder="Please fill your address." />
        <Button type="button" onClick={handleGetLocation} variant="outline">
          Subscribe
        </Button>
        <div className="w-full h-[500px]">
          <MapWithLeaf />
        </div>
      </div>
    </div>
  );
}
