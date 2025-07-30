import { useEffect, useState } from "react"
import DashboardCards from "../../components/DashboardCards"
import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "../../store"
import { getOwnerRestaurant } from "../../features/restaurant/restaurantSlice"
import Cookies from "js-cookie"
import { Card, CardContent } from "../../components/ui/card"
import OrderBarChart from "../../components/charts/OrderBarChart"
import OrderPieChart from "../../components/charts/OrderPieChart"
import { getSummaryByOwner } from "../../features/dashboard/dashboardSlice"

const OwnerDashboard = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {data: summaryAllData } = useSelector(((state:RootState) => state.dashboard.ownerSummaryData)) 
    const [barData, setBarData] = useState<any>([]);
    const [pieData, setPieData] = useState<any>([]);

  useEffect(()=>{
    if(summaryAllData){
        const bar = [
            { name: "Daily", Orders: summaryAllData.noOfOrderPerDay },
            { name: "Monthly", Orders: summaryAllData.noOfOrderPerMonth },
            { name: "Yearly", Orders: summaryAllData.noOfOrderPerYear },
        ];

        const pie = [
        { name: "Daily", value: summaryAllData.amountOfTotalOrderPerDay },
        { name: "Monthly", value: summaryAllData.amountOfTotalOrderPerMonth },
        { name: "Yearly", value: summaryAllData.amountOfTotalOrderPerYear },
        ];

        setBarData(bar);
        setPieData(pie);
    }
  },[summaryAllData])

  useEffect(()=>{
    void getSummaryData()
  },[])

    const getSummaryData = async()=>{
        try{
        const result = await dispatch(getSummaryByOwner())
            if (getSummaryByOwner.fulfilled.match(result)) {
                console.log("Result ", result)
            }
        }catch(e){
        console.log("error ", e)
        }
    }

//   const data = {
//     noOfOrderPerDay: 90,
//     noOfOrderPerMonth: 1200,
//     noOfOrderPerYear: 10000,
//     amountOfTotalOrderPerDay: 1000000.0,
//     amountOfTotalOrderPerMonth: 1000000.0,
//     amountOfTotalOrderPerYear: 10000000.0,
//   };

//   const barData = [
//     { name: "Daily", Orders: data.noOfOrderPerDay },
//     { name: "Monthly", Orders: data.noOfOrderPerMonth },
//     { name: "Yearly", Orders: data.noOfOrderPerYear },
//   ];

//   const pieData = [
//     { name: "Daily", value: data.amountOfTotalOrderPerDay },
//     { name: "Monthly", value: data.amountOfTotalOrderPerMonth },
//     { name: "Yearly", value: data.amountOfTotalOrderPerYear },
//   ];

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardContent className="h-[400px] my-8">
              <h2 className="text-lg font-bold mb-4 text-gray-700">Orders Overview</h2>
              <OrderBarChart data={barData} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="h-[400px] my-8">
              <h2 className="text-lg font-bold mb-4 text-gray-700">Orders Amount Breakdown</h2>
              <OrderPieChart data={pieData} />
            </CardContent>
          </Card>
        </div>
    </div>
  )
}

export default OwnerDashboard
