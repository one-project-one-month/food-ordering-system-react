/* eslint-disable @typescript-eslint/no-misused-promises */
import { ChevronLeft, MapPin } from 'lucide-react';
import MapWithLeaf from '../../../components/map/MapWithLeaf';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import AddressForm from './AddressForm';
import { Button } from '../../../components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function CreateAddress() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-start">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ChevronLeft className="mr-2" />
          Back
        </Button>
      </div>
      <div className="flex justify-center lg:flex-nowrap flex-wrap w-full gap-2">
        <div className="lg:w-5/12 md:w-full h-[40vh] p-2">
          <Card className="px-4">
            <CardHeader>
              <CardTitle className="text-2xl font-medium ">
                <div className="flex gap-2">
                  <MapPin className=" text-green-600" />
                  <span>Create New Address</span>
                </div>
              </CardTitle>
              <CardDescription>
                Please Fill in details and search your latitude and longitude in the map.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AddressForm />
            </CardContent>
          </Card>
        </div>
        <div className="lg:w-7/12 md:w-full h-[35vh] p-4">
          <MapWithLeaf />
        </div>
      </div>
    </div>
  );
}
