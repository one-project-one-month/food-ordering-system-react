import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Bell } from "lucide-react";
import { useState } from "react";

const PrivateLayout = () => {
  const [orderCount, ] = useState<number>(0)
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-dashboard ">
          <nav className="flex sticky top-0 justify-end items-center h-[77px]">
            <div className="flex items-center px-6 flex-row">
              <div className="relative cursor-pointer">
                <Bell className="w-6 h-6 text-gray-600 hover:text-primary transition-colors" />
                  {orderCount > 0 && <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full" />
                }
              </div>
              <span className="inline-block w-[2px] h-5 bg-gray-300 mx-4" />
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-gray-700">Name</p>
                </div>
            </div>
          </nav>
          <div className="mt-2 px-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;
