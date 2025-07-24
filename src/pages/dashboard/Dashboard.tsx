import { useEffect } from "react"
import DashboardCards from "../../components/DashboardCards"
import { useDispatch } from "react-redux"
import { type AppDispatch } from "../../store"
import { getOwnerRestaurant } from "../../features/restaurant/restaurantSlice"
import Cookies from "js-cookie"

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const getOwnerRestaurantData = async()=>{
    try{
      const result = await dispatch(getOwnerRestaurant())
      if(result.payload.code===200){
       if(result.payload.data.restaurants.length!==0){
        Cookies.set('restaurantId',result.payload.data.restaurants[0].id as string)
       }
      }
    }catch(e){
      console.log("error ", e)
    }
  }

  useEffect(()=>{
    void getOwnerRestaurantData()
  },[])

  return (
    <div>
        <div>
            <h2 className="text-3xl font-bold text-gray-700">Dashboard</h2>
            <p className="text-sm pt-1">Hi, John. Welcome back to SarMl dashboard.</p>
        </div>
        <DashboardCards />
    </div>
  )
}

export default Dashboard
