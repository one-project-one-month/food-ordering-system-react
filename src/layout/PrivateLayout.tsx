import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Bell } from "lucide-react";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import UserAvatarMenu from "../components/UserAvatarMenu";

const PrivateLayout = () => {
  const [orderCount, ] = useState<number>(0)
  const userId = Cookies.get('userId')
  const userName = Cookies.get('userName')
  const profilePic = Cookies.get('userProfileImage')

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-dashboard ">
          <nav className="flex sticky top-0 justify-end z-[7] bg-white shadow-sm shadow-gray-200 items-center h-[76px]">
            <div className="flex items-center px-6 flex-row">
              <div className="relative cursor-pointer">
                <Bell className="w-6 h-6 text-gray-600 hover:text-primary transition-colors" />
                  {orderCount > 0 && <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full" />
                }
              </div>
              <span className="inline-block w-[2px] h-5 bg-gray-300 mx-4" />
                <UserAvatarMenu userId={String(userId)} name={userName ?? 'John'} image={profilePic?.replace(/^.*?(https:\/)/, 'https:/') ?? ''} />
            </div>
          </nav>
          <div className="my-6 px-6">
            <ToastContainer position="top-right" className='top-[76px]' autoClose={2000} />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;
