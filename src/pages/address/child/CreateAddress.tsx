/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
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
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';

export default function CreateAddress() {
  const param = useParams();
  const userRole = Cookies.get('role');
  const userId = Cookies.get('userId');
  console.log(userRole, userId);
  const navigate = useNavigate();
  const addressId = param.id;
  return (
    <motion.div
      className={`${userRole === 'customer' && 'container mt-8'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-start ml-4 mt-2">
        <Button
          variant="outline"
          onClick={() => {
            void navigate(userRole === 'customer' ? `/address/${userId}` : '/my_address');
          }}
        >
          <ChevronLeft className="mr-2" />
          Back
        </Button>
      </div>
      <div className="flex justify-center lg:flex-nowrap flex-wrap w-full gap-2">
        <div className="lg:w-5/12 md:w-full h-[40vh] p-4">
          <Card className="px-4">
            <CardHeader>
              <CardTitle className="text-2xl font-medium ">
                <div className="flex gap-2">
                  <MapPin className=" text-green-600" />
                  <span>{addressId ? 'Update' : 'Create New'} Address</span>
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

        <MapWithLeaf />
      </div>
    </motion.div>
  );
}
