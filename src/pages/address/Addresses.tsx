/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getAddress } from '../../features/address/addressSlice';
import { Button } from '../../components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardDescription, CardHeader } from '../../components/ui/card';
import { EyeIcon, Loader2, MapPin } from 'lucide-react';
import type { AppDispatch, RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import type { Address } from '../../types/address.type';

export default function Addresses() {
  const [addresses, setAddresses] = useState<Address[] | []>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.address.searched.loading);

  useEffect(() => {
    const id = Number(Cookies);
    const fetchAddresses = async () => {
      const result = await dispatch(getAddress({ id }));
      if (result.payload.code === 200 && result.payload.data) {
        setAddresses(result.payload.data);
      }
    };
    void fetchAddresses();
  }, [dispatch]);

  if (loading && addresses.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div>
        <Button
          onClick={() => {
            void navigate('create');
          }}
        >
          Ceate New Address
        </Button>
      </div>
      <div>
        {addresses.length > 0 ? (
          addresses.map((address, index) => (
            <Card className="w-8/12 m-4" key={index}>
              <CardHeader className="text-start w-full">
                <div className="flex w-full justify-between items-center mb-4">
                  <h2 className="text-xl font-bold mb-4">
                    Address Details For Restaurant -{address.addressId}
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      void navigate(`/my_address/${String(address.addressId)}`);
                    }}
                  >
                    <EyeIcon />
                  </Button>
                </div>

                <CardDescription className="text-lg font-normal text-gray-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-green-500" />
                    <span>
                      {address.street} Street, {address.road} Road, {address.township} Township,
                      {address.city} City, {address.region} Region
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>
          ))
        ) : (
          <p>No addresses found.</p>
        )}
      </div>
    </div>
  );
}
