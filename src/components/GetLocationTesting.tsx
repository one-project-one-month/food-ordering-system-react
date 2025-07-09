import MapWithLeaf from './map/MapWithLeaf';

export default function GetLocationTesting() {
  return (
    <div className=" flex flex-col w-full h-auto gap-2">
      <p>You can select custom address (OR) If you access GPS,you can easily click getLocation </p>
      <div className="w-full h-[500px]">
        <MapWithLeaf />
      </div>
    </div>
  );
}
