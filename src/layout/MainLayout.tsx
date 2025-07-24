// import Header from "../Header"; // your header component
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  return (
    <div className="w-full">
      <Header />
      <main className="mx-auto">
        <ToastContainer position="top-right" className='top-[76px]' autoClose={2000} />
        <Outlet />
      </main>    
    </div>
  );
};

export default MainLayout;
