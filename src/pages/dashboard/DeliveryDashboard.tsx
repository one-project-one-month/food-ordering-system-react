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
        if (!summaryData.summary.noOfOrderPerMonth || summaryData.summary.noOfOrderPerMonth === 0) return "0%";
          return `${Math.round((value / summaryData.summary.noOfOrderPerMonth) * 100)}%`;
    };
    
    useEffect(()=>{
        if(summaryAllData){
            setSummaryData(summaryAllData)
            const stats = [
                {
                    title: "Total Orders",
                    amount: summaryData.summary.totalOrders?.toString() ?? "0",
                    percent: calcPercent(summaryData.summary.totalOrders),
                    trend: summaryData.summary.totalOrders >= 50 ? "up" : "down",
                    image: <Package className="w-12 h-12 text-primary" />,
                    roles: ["owner"]
                },
                {
                    title: "Total Delivered",
                    amount: summaryData.summary.totalDelivered?.toString() ?? "0",
                    percent: "4%",
                    trend: "down",
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
