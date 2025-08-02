/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from 'react-hook-form';
import type { RestaurantFormPropsWithImage, restaurantProps } from '../../types/restaurant.types';
import { createRestaurant, updateRestaurant, uploadRestaurantImage } from "../../features/restaurant/restaurantSlice";
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import Cookies from 'js-cookie';
import { Button } from '../../components/ui/button';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { restaurantFormSchema } from '../../schemas/restaurantFormSchema'; 
import DropZoneMenuImage from '../../components/menus/DropZoneMenuImge';

type RestaurantFormType = z.infer<typeof restaurantFormSchema>;

export default function RestaurantForm({ type, defaultValues, onDataUpdated }: RestaurantFormPropsWithImage) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<RestaurantFormType>({
    resolver: zodResolver(restaurantFormSchema),
    defaultValues: defaultValues ?? undefined,
  });
    const ownerId = Cookies.get("userId")
    const dispatch = useDispatch<AppDispatch>()
    const [restaurantId,setRestaurantId] = useState<string>('');
    const { loading: createdLoading } = useSelector((state:RootState) => state.restaurant.new);
    const { loading } = useSelector((state:RootState) => state.restaurant.detailed);
    const { loading: uploadImageDataLoading } = useSelector((state:RootState) => state.restaurant.imageData);
    const [restaurantPic, setRestaurantPic] = useState<string>('')

    useEffect(() => {
        if (defaultValues) {
        setRestaurantId(defaultValues.id ?? "")
        const imageUrl = defaultValues.restaurantImage ?? '';
        if(imageUrl !== ''){
            const cleanedUrl = imageUrl.replace(/^.*?(https:\/)/, 'https:/');
            setRestaurantPic(cleanedUrl)
        }
        reset(defaultValues);
        }
    }, [defaultValues, reset]);
    const onFormSubmit = async(data: restaurantProps) => {
        if(type==='create'){
          await createRestaurantHandler(data)
        }else{
          await updateRestaurantHandler(data)
        }
    };

    const createRestaurantHandler = async(data:restaurantProps)=>{
        const payload = {
            ...data,
            resOwnerId: Number(ownerId),
        }
        try{
        const result = await dispatch(createRestaurant(payload))
          if (createRestaurant.fulfilled.match(result)) {
            toast.success('Restaurant updated successfully!');
            onDataUpdated?.();
          } else if (createRestaurant.rejected.match(result)) {
            toast.error('Errors when updating restaurant!');
          }
        }catch(e){
        console.log("error ", e)
        }
    }

    const updateRestaurantHandler = async(data:restaurantProps)=>{
        const payload = {
            ...data,
            id: restaurantId,
        }
        try{
        const result = await dispatch(updateRestaurant(payload))
            if (updateRestaurant.fulfilled.match(result)) {
              toast.success('Restaurant updated successfully!');
              onDataUpdated?.();
            } else if (updateRestaurant.rejected.match(result)) {
              toast.error('Errors when updating restaurant!');
            }
        }catch(e){
            console.log("error ", e)
        }
    }

    const handleImageUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        try{
        const result = await dispatch(uploadRestaurantImage({formData,restaurantId}))
            if (uploadRestaurantImage.fulfilled.match(result)) {
              onDataUpdated?.();
            }
        }catch(e){
            console.log("error ", e)
        }
    };

  const fields: { label: string; name: keyof RestaurantFormType; placeholder: string; type: string; required?: boolean }[] = [
    { label: 'Restaurant Name', name: 'restaurantName', placeholder: 'Restaurant Name', type: 'text', required: true },
    { label: 'Contact Number', name: 'contactNumber', placeholder: '00000000000', type: 'text', required: true },
    { label: 'NRC', name: 'nrc', placeholder: '12/kamata(N)111111', type: 'text', required: true },
    { label: 'Kpay Number', name: 'kpayNumber', placeholder: '00000000000', type: 'text', required: true }
  ];

  return (
    <>
    <div className="w-full mt-6 rounded-lg bg-white text-black rounded shadow-xl p-10 md:p-12 space-y-10 border border-gray-300 transition"
      >
      <h1 className="text-xl sm:text-3xl font-bold text-center text-primary">{type==='create'?'Create':'Edit'} Restaurant</h1>
      <div className="mb-6">
        {restaurantId !== '' && 
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Upload Restaurant Image
            </label>
            <div className='lg:w-[500px]'>
              <DropZoneMenuImage setDropDrown={(files) => {
                void handleImageUpload(files[0]);
              }} />
            </div>
          </div>
        }
        {restaurantPic !== '' && (
          <div className="w-full lg:w-[500px] h-[300px] mt-2 overflow-hidden border border-gray-200 rounded-lg">
            {uploadImageDataLoading ? (
              <div className="flex h-full justify-center items-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <img
                src={restaurantPic}
                className="object-cover w-full h-full"
                alt="restaurant image"
              />
            )}
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit(onFormSubmit)}
       >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fields.map(({ label, name, type, placeholder, required }) => (
            <div key={name} className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-2">{label}</label>
              <input
                type={type}
                placeholder={placeholder}
                {...register(name, required ? { required: `Pls Enter Your ${label}` } : {})}
                className="px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors[name] && (
                <span className="text-red-500 text-xs mt-1">{errors[name].message ?? ''}</span>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-6">
          <Button type='submit' className='w-[200px]' disabled={loading|| !isDirty}>
              {(loading || createdLoading) && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}{type==='create'?'Create':'Update'}</Button>
        </div>
      </form>
    </div>
    </>
  );
}
