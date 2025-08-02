/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from "react";
import DashboardCards from "../../components/DashboardCards"
import { getSummaryByDelivery } from "../../features/dashboard/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { Package, Truck } from "lucide-react";

const DeliveryDashboard = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {data: summaryAllData } = useSelector(((state:RootState) => state.dashboard.deliverySummaryData)) 
    const [summaryData, setSummaryData] = useState<any>(null)
    const [statsData, setStatsData] = useState<any[]>([]);

    const calcPercent = (value: number) => {
        if (!summaryData?.summar?.noOfOrderPerMonth || summaryData?.summary?.noOfOrderPerMonth === 0) return "0%";
          return `${Math.round((value / summaryData?.summary?.noOfOrderPerMonth) * 100)}%`;
    };
    
    useEffect(()=>{
        if(summaryAllData){
            const summaryData = summaryAllData.data as any;
            setSummaryData(summaryData?.summary)
            const stats = [
                {
                    title: "Total Delivered",
                    amount: summaryData?.summary?.noOfDeliveredPerMonth?.toString() ?? "0",
                    percent: calcPercent(summaryData?.summary?.noOfDeliveredPerMonth),
                    trend: summaryData?.summary?.noOfDeliveredPerMonth >= 50 ? "up" : "down",
                    image: <Truck className="w-12 h-12 text-primary" />,
                    roles: ["delivery"]
                },
                                {
                    title: "Total Cancelled",
                    amount: summaryData?.summary?.noOfCancelledPerMonth?.toString() ?? "0",
                    percent: calcPercent(summaryData?.summary?.noOfCancelledPerMonth),
                    trend: summaryData?.summary?.noOfCancelledPerMonth >= 50 ? "up" : "down",
                    image: <Package className="w-12 h-12 text-primary" />,
                    roles: ["delivery"]
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
        <DashboardCards stats={statsData}/>
    </div>
  )
}

export default DeliveryDashboard
