import { useDispatch } from 'react-redux';
import ItemCard from '../../components/card/ItemCard';
import { useEffect, useState } from 'react';
import type { AppDispatch } from '../../store';
import { useParams } from 'react-router-dom';
import { getAllMenus } from '../../features/menu/userMenuSlice';
import { getRestaurantDetail } from '../../features/restaurant/restaurantSlice';

export default function UserMenu() {
  const [menus, setMenus] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [restaurantDetail, setRestaurantDetail] = useState<any>({})
  const dispatch = useDispatch<AppDispatch>()
  const {id} = useParams()

  const getMenuData = async()=>{
    try{
        const result = await dispatch(getAllMenus({id}))
          const resultPayload = result.payload;
          if(result.type==="userMenu/getAllMenus/fulfilled"){
            setMenus(resultPayload)
          }
        }catch(e){
          console.log("error ", e)
        }finally {
        setLoading(false);
      }
    }
    
    useEffect(()=>{
        void getMenuData()
    },[])

    const getRestaurantDetailData = async()=>{
    try{
        const result = await dispatch(getRestaurantDetail({id}))
          const resultPayload = result.payload as any;
          console.log("result of restaurant detail ", result)
          if(result.type==="restaurant/getRestaurantDetail/fulfilled"){
            setRestaurantDetail(resultPayload.data.restaurantDetail)
          }
        }catch(e){
          console.log("error ", e)
        }
    }
    
    useEffect(()=>{
        void getRestaurantDetailData()
    },[])

  return (
    <div className="container p-8">
        <div className="w-full h-64 relative mb-4 rounded-lg overflow-hidden border-b">
            <img
            src={restaurantDetail.restaurantImage?.replace(/^.*?(https:\/)/, 'https:/')}
            alt={restaurantDetail.restaurantName}
            className="w-full h-full object-cover"
            />
        </div>
        <h1 className="text-2xl text-primary font-bold mb-2">{restaurantDetail.restaurantName}</h1>
            <div className="flex text-xs text-gray-600 gap-3 mt-2">
                <span className="text-sm flex">📞 {restaurantDetail.contactNumber}</span>
                <span>🚴 500kyats</span>
            </div>
        <div className="grid gap-6 md:grid-cols-3 my-6 lg:grid-cols-4">
            {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-48 bg-gray-200 animate-pulse rounded-xl" />
            ))
          : <>
            {menus?.map((menu:any) => (
            <ItemCard
                key={menu.id}
                image={menu?.dishImg?.replace(/^.*?(https:\/)/, 'https:/')}
                title={menu.dish}
                subtitle={menu.cuisine}
                price={menu.price.toString()}
                isPromotion={false}
                type="menu"
                linkTo={`/menu/${String(menu.id)}`}
            />
            ))}
            </>}
        </div>
    </div>
  );
}
