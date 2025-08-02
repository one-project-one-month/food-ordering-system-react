/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
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
import { Package, Truck } from "lucide-react"

const OwnerDashboard = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {data: summaryAllData } = useSelector(((state:RootState) => state.dashboard.ownerSummaryData)) 
    const [barData, setBarData] = useState<any>([]);
    const [pieData, setPieData] = useState<any>([]);
    const [statsData, setStatsData] = useState<any[]>([]);

  useEffect(()=>{
    if(summaryAllData){
      console.log("Summary data ", summaryAllData)
      const summaryData = summaryAllData.data as any;
        const bar = [
            { name: "Daily", Orders: summaryData?.summary?.noOfOrderPerDay },
            { name: "Monthly", Orders: summaryData?.summary?.noOfOrderPerMonth },
            { name: "Yearly", Orders: summaryData?.summary?.noOfOrderPerYear },
        ];

        const pie = [
        { name: "Daily", value: summaryData?.summary?.amountOfTotalOrderPerDay },
        { name: "Monthly", value: summaryData?.summary?.amountOfTotalOrderPerMonth },
        { name: "Yearly", value: summaryData?.summary?.amountOfTotalOrderPerYear },
        ];

        setBarData(bar);
        setPieData(pie);

        const calcPercent = (value: number) => {
          if (!summaryData?.summary?.noOfOrderPerMonth || summaryData?.summary?.noOfOrderPerMonth === 0) return "0%";
          return `${Math.round((value / summaryData?.summary?.noOfOrderPerMonth) * 100)}%`;
        };
        const stats = [
          {
            title: "Total Orders",
            amount: summaryData?.summary?.totalOrders?.toString() ?? "0",
            percent: calcPercent(summaryData?.summary?.totalOrders),
            trend: summaryData?.summary?.totalOrders >= 50 ? "up" : "down",
            image: <Package className="w-12 h-12 text-primary" />,
            roles: ["owner"]
          },
          {
            title: "Total Delivered",
            amount: summaryData?.summary?.totalDelivered?.toString() ?? "0",
            percent: calcPercent(summaryData?.summary?.totalDelivered),
            trend: summaryData?.summary?.totalDelivered >= 50 ? "up" : "down",
            image: <Truck className="w-12 h-12 text-primary" />,
            roles: ["owner"]
          },
        ];

        setStatsData(stats);
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
        <DashboardCards stats={statsData}/>
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
              {pieData.every((item: any) => item.value === 0) ? (
                  <div className="flex justify-center items-center h-full text-gray-500">
                    No order amounts to display
                  </div>
                ) : (
                  <OrderPieChart data={pieData} />
                )}
            </CardContent>
          </Card>
        </div>
    </div>
  )
}

export default OwnerDashboard
