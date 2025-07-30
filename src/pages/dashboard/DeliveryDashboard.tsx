import { useEffect, useState } from "react";
import DashboardCards from "../../components/DashboardCards"
import { getSummaryByDelivery } from "../../features/dashboard/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";

const DeliveryDashboard = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {data: summaryAllData } = useSelector(((state:RootState) => state.dashboard.deliverySummaryData)) 
    const [, setSummaryData] = useState<any>(null)
//   const data = {
//     noOfOrderPerDay: 90,
//     noOfOrderPerMonth: 1200,
//     noOfOrderPerYear: 10000,
//     amountOfTotalOrderPerDay: 1000000.0,
//     amountOfTotalOrderPerMonth: 1000000.0,
//     amountOfTotalOrderPerYear: 10000000.0,
//   };

    useEffect(()=>{
        if(summaryAllData){
            setSummaryData(summaryAllData)
        }
    },[summaryAllData])
    useEffect(()=>{
        void getSummaryData()
    },[])
    const getSummaryData = async()=>{
        try{
        const result = await dispatch(getSummaryByDelivery())
            if (getSummaryByDelivery.fulfilled.match(result)) {
                console.log("Result ", result)
            }
        }catch(e){
        console.log("error ", e)
        }
    }

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

export default DeliveryDashboard
