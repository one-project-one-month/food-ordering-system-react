/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from 'react'
import RestaurantForm from './RestaurantForm';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { type AppDispatch } from '../../store';
import { getOwnerRestaurant } from '../../features/restaurant/restaurantSlice';
import type { restaurantProps } from '../../types/restaurant.types';

const Restaurant = () => {
  const [formType, setFormType] = useState('create');
  const dispatch = useDispatch<AppDispatch>()
  const [detailData, setDetailData] = useState<restaurantProps>()

  const getOwnerRestaurantData = async()=>{
    try{
      const result = await dispatch(getOwnerRestaurant())
      if(result.payload.code===200){
       if(result.payload.data.restaurants.length===0){
        setFormType('create')
       }else{
        setFormType('update')
        setDetailData(result.payload.data.restaurants[0])
        Cookies.set('restaurantId',result.payload.data.restaurants[0].id)
       }
      }
    }catch(e){
      console.log("error ", e)
    }
  }

  useEffect(()=>{
    void getOwnerRestaurantData()
  },[])

  const handleDataUpdated = () => {
    void getOwnerRestaurantData();
  };

  return (
     <div>
        <div>
            <h2 className="text-3xl font-bold text-gray-700">{formType==='create'? 'You Haven’t Opened a Restaurant Yet' : 'Restaurant details'}</h2>
            <p className="text-sm pt-1">Start managing your business online. Create your restaurant profile to begin accepting orders, updating menus, and tracking performance.</p>
            <RestaurantForm type={formType} defaultValues={detailData} onDataUpdated={handleDataUpdated}/>
        </div>
    </div>
  )
}

export default Restaurant
