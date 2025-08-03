/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { Loader2, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';
import { Button } from '../../components/ui/button';
import type { Address } from '../../types/address.type';
import type { AppDispatch } from '../../store';
import { getAddress, deleteAddress } from '../../features/address/addressSlice';
import { Card, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import Map from '../../components/map/Map';
import DeleteDialogBox from './child/DeleteDialogBox';
import { motion } from "framer-motion"

export default function Address() {
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleteDia, setIsDeleteDia] = useState<boolean>(false);
  const navigate = useNavigate();
  const userRole = Cookies.get('role')
  const [addressType, setAddressType] = useState('')
  const handleCloseDialog = () => {
    setIsDeleteDia((prev) => !prev);
  };
  const handleDeleteAddress = async () => {
    const result = await dispatch(deleteAddress(param.id as any));
    if (result) {
      setAddress(null);
      setLoading(false);
      handleCloseDialog();
      Cookies.remove('addressId');
      toast.success('Address deleted successfully');
      void navigate('/my_address');
    }
  };
  const location = useLocation();
  const param = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchData = async () => {
      if (param) {
        const id = Number(param.id);
        const result = await dispatch(getAddress({ id }));
        if (result.payload.code === 200 && result.payload) {
          const addressData = result.payload.data.length!==0 ? result.payload.data[0] : result.payload.data;
          if (addressData.length!==0) {
            setLoading(false);
            setAddress(addressData);
          }else{
            setAddressType('create')
          }
        }
      } else {
        setAddress(null);
      }
    };

    void fetchData();
  }, [dispatch, location.pathname]);

  return (
    <motion.div className={`flex flex-col w-full ${userRole==='customer' && 'container mt-8'}`} 
    initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>
      {userRole === 'customer' ? <>
        <div className="flex justify-end right-4">
          {location.pathname.includes('/address/') && addressType!=='create' ? (
            <Button onClick={() => navigate(`/address/update/${String(param.id)}`)}>
              Update Location
            </Button>
          ) : (
            <Button onClick={() => navigate('/address/create')}>Add Location</Button>
          )}
        </div>
      </> : 
        <div className="flex justify-end right-4">
          {/* {location.pathname.length > 11 ? (
            <Button onClick={() => navigate(`/my_address/update/${String(param.id)}`)}>
              Update Location
            </Button>
          ) : ( */}
          {userRole==='customer'?<Button onClick={() => navigate('/address/create')}>Add Location</Button>:<Button onClick={() => navigate('/my_address/create')}>Add Location</Button>}
          {/* )} */}
        </div>
      }
      {param.id ? (
        loading ? (
          <div className="text-center mt-10 mx-auto">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : (
          address && (
            <div className={`flex flex-col items-center justify-center mt-10 ${userRole==='customer'?'container':''}`}>
              <Card className="w-8/12">
                <CardHeader className="text-start w-full">
                  <div className="flex w-full justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold mb-4">Address Details</h2>
                    <Button variant="destructive" size="lg" onClick={handleCloseDialog}>
                      Delete
                    </Button>
                  </div>
                  <CardDescription className="text-lg font-normal text-gray-500">
                    <div className="flex items-center gap-2">
                      <MapPin className="text-green-500" />
                      <span>
                        {address.street}, {address.road}, {address.township} Township,{' '}
                        {address.city} City,
                        {address.region} Region
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
              <div className="w-8/12 h-42 mt-4">
                <Map
                  position={{ lat: Number(address.lat), lng: Number(address.longitude) }}
                  type="toShow"
                />
              </div>
            </div>
          )
        )
      ) : (
        <Card className="mt-10 w-8/12 mx-auto">
          <CardHeader>
            <CardTitle>You don't create the address.</CardTitle>
          </CardHeader>
        </Card>
      )}
      <DeleteDialogBox
        open={isDeleteDia}
        onOpenChange={handleCloseDialog}
        handleDeleteAddress={handleDeleteAddress}
      />
    </motion.div>
  );
}
