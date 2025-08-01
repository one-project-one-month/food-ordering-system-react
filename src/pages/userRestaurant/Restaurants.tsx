/* eslint-disable @typescript-eslint/no-unsafe-argument */
import ItemCard from '../../components/card/ItemCard';
import { useEffect, useState } from 'react';
import { getAllRestaurant } from '../../features/restaurant/restaurantSlice';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';

export default function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch<AppDispatch>()

    const getAllRestaurantData = async()=>{
      try{
        const result = await dispatch(getAllRestaurant())
        const resultPayload = result.payload as any;
        if(resultPayload.code===200){
          setRestaurants(resultPayload.data.restaurants)
        }
      }catch(e){
        console.log("error ", e)
      }finally {
        setLoading(false);
      }
    }
  
    useEffect(()=>{
      void getAllRestaurantData()
    },[])

  return (
    <div className="container p-8">
        <h1 className="text-3xl text-primary font-bold mb-2">All restaurants</h1>
        <div className="grid gap-6 md:grid-cols-3 my-6 lg:grid-cols-4">
            {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-48 bg-gray-200 animate-pulse rounded-xl" />
            ))
          : restaurants.map((res: any) => (
              <ItemCard
                key={res.id}
                image={res?.restaurantImage?.replace(/^.*?(https:\/)/, 'https:/')}
                title={res.restaurantName}
                deliveryTime={'30mins'}
                deliveryFee={'500kyats'}
                isPromotion={false}
                type="restaurant"
                linkTo={`/restaurants/${String(res.id)}`}
              />
            ))}
        </div>
    </div>
  );
}
