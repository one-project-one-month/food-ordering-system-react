import { Card, CardContent } from "../components/ui/card";
import { Package, Truck, XCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import Cookies from "js-cookie";

const stats = [
  {
    title: "Total Orders",
    amount: "0",
    percent: "15%",
    trend: "up",
    image: <Package className="w-12 h-12 text-primary" />,
    roles: ["owner"]
  },
  {
    title: "Total Delivered",
    amount: "4",
    percent: "3%",
    trend: "down",
    image: <Truck className="w-12 h-12 text-primary" />,
    roles: ["delivery"]
  },
  {
    title: "Total canceled",
    amount: "3",
    percent: "8%",
    trend: "up",
    image: <XCircle className="w-12 h-12 text-primary" />,
  },
];

const DashboardCards = () => {
    const userRole = Cookies.get("role");
    const visibleCards = stats.filter(
        ({ roles }) => !roles || roles.includes(userRole ?? "")
    );

  return (
    <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {visibleCards.map(({ title, amount, percent, trend, image }) => (
        <Card key={title} className="rounded-2xl shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="rounded-full w-[70px] h-[70px] flex justify-center items-center bg-lightGreen">
                {/* <img src={image} alt={title} className="w-12 h-12 rounded-full object-cover" /> */}
                {image}
            </div>
            <div className="flex flex-col flex-1">
                <span className="text-2xl font-bold text-gray-700">{amount}</span>
                <span className="text-xs text-gray-500">{title}</span>
                <div className={`flex items-center text-sm mt-1`}>
                    {trend === "up" ? <ArrowUpRight className="w-4 h-4 text-green-600" /> : <ArrowDownRight className="w-4 h-4 text-red-500" />}
                    <span className={trend === "up" ? "text-green-600" : "text-red-500"}>{percent}</span><span className="ml-1 text-gray-300 text-[10px]">(30 days)</span>
                </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardCards;
