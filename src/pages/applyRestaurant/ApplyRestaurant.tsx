import { useEffect, useState } from 'react'
import { Card, CardContent } from '../../components/ui/card'
import { Clock4, Loader2 } from 'lucide-react'
import { applyRestaurant, getAppliedRestaurant } from '../../features/applyRestaurant/applyRestaurantSlice';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../store';
import { getAllRestaurant } from '../../features/restaurant/restaurantSlice';
import { Button } from '../../components/ui/button';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const ApplyRestaurant = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [appliedStatus, setAppliedStatus] = useState<boolean>(false)
    const [appliedRestaurants, setAppliedRestaurants] = useState<any>([]);
    const [allRestaurants, setAllRestaurants] = useState<any>([]);
    const userId = Cookies.get("userId")
    const { data: allData, loading } = useSelector((state: RootState) => state.applyRestaurant.searched);
    const { data: allRestaurantsData, loading: getAllRestaurantloading } = useSelector((state: RootState) => state.restaurant.searched);
    
    useEffect(()=>{
        void getAppliedRestaurantList()
        void getAllRestaurantList()
    },[appliedStatus])

    useEffect(() => {
        const restaurants = (allData as any)?.data?.restaurants ?? [];
        setAppliedRestaurants(restaurants);
    }, [allData]);

    useEffect(() => {
        const restaurants = (allRestaurantsData as any)?.data?.restaurants ?? [];
        setAllRestaurants(restaurants);
    }, [allRestaurantsData]);

    const applyRestaurantToDeliver = async(id:number)=>{
        const payload = {
            restaurantId: id,
            userId
        }
        try{
            const result = await dispatch(applyRestaurant(payload))
                if (applyRestaurant.fulfilled.match(result)) {
                    toast.success('Applied restaurant successfully!');
                    setAppliedStatus(!appliedStatus)
                } else if (applyRestaurant.rejected.match(result)) {
                    toast.error('Errors when updating category!');
                }
            }catch(e){
                    console.log("error ", e)
            }
    }

    const getAppliedRestaurantList = async()=>{
        try{
            await dispatch(getAppliedRestaurant())
        }catch(e){
            console.log("error ", e)
        }
    }

    const getAllRestaurantList = async()=>{
        try{
            await dispatch(getAllRestaurant())
        }catch(e){
            console.log("error ", e)
        }
    }

    const applyRestaurantHandler = (id:number)=>{
        void applyRestaurantToDeliver(id)
    }

  return (
    <div>
        <div>
            <h2 className="text-3xl font-bold text-gray-700">Start Delivering Today</h2>
            <p className="text-sm pt-1">If you haven’t applied to any restaurants yet, Browse and apply available restaurants to start delivering orders in your area.</p>           
            <Card className="rounded-2xl p-4 shadow-md mt-6">
                <h2 className="text-lg m:text-2xl font-normal text-left">
                    Applied Restaurant
                </h2>
                {appliedRestaurants.length === 0 && <p className='text-sm mt-1 text-yellow-500'>You need to apply at least one restaurant to start your job!</p>}
                {
                loading ? 
                <div className='flex mt-4 h-full justify-center items-center'>
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div> : 
                <div className='grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {appliedRestaurants?.map((appliedRes:any) => (
                        <Card key={appliedRes.id} >
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="rounded-full w-[70px] h-[70px] overflow-hidden flex justify-center items-center bg-lightGreen">
                                    <img src={appliedRes.restaurantImage?.replace(/^.*?(https:\/)/, 'https:/')} alt="restaurant image" className='object-cover w-full h-full'/>
                                </div>
                                <div className="flex flex-col flex-1">
                                <span className="text-lg font-normal text-gray-800">
                                    {appliedRes.restaurantName}
                                </span>
                                <span className="text-sm text-gray-500">{appliedRes.location}</span>
                                <div className="flex items-center gap-1 text-sm mt-1 text-gray-400">
                                    <Clock4 className="w-4 h-4" />
                                    <span>Opened on: {new Date(appliedRes.createdAt as string).toLocaleDateString()}</span>
                                </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                }
                <h2 className="text-lg m:text-2xl mt-8 font-normal text-left">
                    All Restaurants
                </h2>
                {
                getAllRestaurantloading ? 
                <div className='flex mt-4 h-full justify-center items-center'>
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div> : 
                <div className='grid grid-cols-2 mt-4 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {allRestaurants?.map((restaurant:any) => 
                    {
                    const appliedIds = new Set(Array.isArray(appliedRestaurants) ? appliedRestaurants.map(r => r.id) : []
);
                    const isApplied = appliedIds.has(restaurant.id);
                     return   (
                        <Card key={restaurant.id} >
                            <CardContent className="p-4 flex flex-col gap-4">
                                <div className="rounded-full md:w-[100px] mx-auto md:h-[100px] lg:w-[150px] lg:h-[150px] overflow-hidden flex justify-center items-center bg-lightGreen">
                                    {
                                        restaurant.restaurantImage !== null ? <img src={restaurant.restaurantImage?.replace(/^.*?(https:\/)/, 'https:/')} alt="restaurant image" className='object-cover w-full h-full'/>
                                        : <span>no image</span>
                                    }
                                </div>
                                <div className="flex flex-col flex-1">
                                <span className="text-lg md:text-md font-normal text-gray-800">
                                    {restaurant.restaurantName}
                                </span>
                                <span className="text-sm text-gray-500">{restaurant.location}</span>
                                <div className="flex items-center gap-1 text-sm mt-1 text-gray-400">
                                    <Clock4 className="w-4 h-4" />
                                    <span>Opened on: {new Date(restaurant.createdAt as string).toLocaleDateString()}</span>
                                </div>
                                <div className="text-xs mt-1 text-gray-500">                             
                                    {isApplied ? <span className="font-medium text-md text-primary mt-2 block">Applied</span> : <Button type='button' className='w-full mt-2' onClick={()=>{applyRestaurantHandler(restaurant.id as number)}}>Apply this restaurant</Button>}
                                </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })
                }
                </div>
                }
            </Card>
        </div>
    </div>
  )
}

export default ApplyRestaurant
