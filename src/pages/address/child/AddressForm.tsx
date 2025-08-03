/* eslint-disable @typescript-eslint/no-unsafe-argument */
 
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { z } from 'zod';
import { toast } from 'react-toastify';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Button } from '../../../components/ui/button';
import { addressFormSchema } from '../../../schemas/addressFromSchema';
import type { AppDispatch, RootState } from '../../../store';
import { createAddress, updateAddress } from '../../../features/address/addressSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getAddress } from '../../../features/address/addressSlice';
import type { Address } from '../../../types/address.type';

export default function AddressForm() {
  const userRole = Cookies.get('role')
  const [address, setAddress] = useState<Address | null>(null);
  const id = useParams<{ id: string }>().id;
  const form = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    defaultValues:
      id && address
        ? {
            ...address,
            lat: String(address.lat),
            longitude: String(address.longitude),
          }
        : undefined,
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  console.log('AddressForm id:', id);
  const { loading: createdLoading } = useSelector((state: RootState) => state.address.new);
  const { loading } = useSelector((state: RootState) => state.address.detailed);

  async function onSubmit(values: z.infer<typeof addressFormSchema>) {
    console.log('Submitting address form with values:', values);
    if (address) {
      console.log('Updating address with values:', values);
      await updateAddressHandler(values);
    } else {
      await createAddressHandler(values);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const result = await dispatch(getAddress({ id: Number(id) }));
        console.log('Fetched address result:', result);
        if (result.payload.code === 200 && result.payload.data.addressDetail) {
          const addressData = result.payload.data.addressDetail;
          setAddress(addressData);
          form.reset({
            ...addressData,
            lat: String(addressData.lat),
            longitude: String(addressData.longitude),
          });
        }
      }
    };
    void fetchData();
  }, [dispatch, id]);

  const createAddressHandler = async (data: z.infer<typeof addressFormSchema>) => {
    try {
      if (data.entityType === 'RESTAURANT') {
        data.entityId = Number(Cookies.get('userId'));
        console.log('Creating address for restaurant with data:', data);
      } else {
        data.entityId = Number(Cookies.get('userId'));
      }
      if (!data.entityId) {
        toast.error('Entity ID is required for creating an address.');
        return;
      }
      const payload = {
        ...data,
        lat: Number(data.lat),
        longitude: Number(data.longitude),
        entityId: data.entityId,
      };
      const result = await dispatch(createAddress(payload));
      if (createAddress.fulfilled.match(result)) {
        toast.success('Address created successfully!');
        Cookies.set('addressId', String(result.payload.data.id));
      } else if (createAddress.rejected.match(result)) {
        toast.error('Errors when creating address!');
      }
      if (result.payload.code === 200 && result.payload) {
        const id = result.payload.data.id;
        if(userRole==='customer'){
          await navigate(`/address/${String(id)}`);
        }else{
          await navigate(`/my_address/${String(id)}`);
        }
      }
    } catch (e) {
      console.log('error ', e);
    }
  };

  const updateAddressHandler = async (data: z.infer<typeof addressFormSchema>) => {
    try {
      const payload = {
        ...data,
        id: Number(id),
        lat: Number(data.lat),
        longitude: Number(data.longitude),
        entityId: address?.entityId ?? Number(Cookies.get('restaurantId')),
      };
      const result = await dispatch(updateAddress(payload));
      if (updateAddress.fulfilled.match(result)) {
        toast.success('Address updated successfully!');
        Cookies.set('addressId', String(result.payload.data.id));
      } else if (updateAddress.rejected.match(result)) {
        toast.error('Errors when updating address!');
      }
      if (result.payload.code === 200 && result.payload) {
        await navigate(`/my_address/${String(payload.id)}`);
      }
    } catch (e) {
      console.log('error ', e);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex w-full justify-between gap-4">
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region </FormLabel>
                  <FormControl>
                    <Input placeholder="eg. Yangon" {...field} className="w-44" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Yangon"
                      {...field}
                      defaultValue={field.value}
                      className="w-44 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full justify-between gap-4">
            <FormField
              control={form.control}
              name="township"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Township</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Kamayut" {...field} className="w-44" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="road"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Road</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Pyay Road" {...field} className="w-44" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full justify-between gap-4">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 51st Street" {...field} className="w-44" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="entityType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entity</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-44">
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="RESTAURANT">Restaurant</SelectItem>
                      <SelectItem value="CUSTOMER">Customer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full justify-between gap-4">
            <FormField
              control={form.control}
              name="lat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 16.909029" {...field} className="w-44" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 16.909029" {...field} className="w-44" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">
            {(loading ?? createdLoading) && <Loader2 className="h-4 w-4 animate-spin" />}
            {id ? 'Update Address' : 'Create Address'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
