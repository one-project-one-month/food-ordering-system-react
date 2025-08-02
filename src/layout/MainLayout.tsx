// import Header from "../Header"; // your header component
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer";

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="w-full">
      <Header />
      <main className="mx-auto">
        <ToastContainer position="top-right" className='top-[76px]' autoClose={2000} />
        <Outlet />
      </main>  
     {location.pathname === '/' && <Footer />}
    </div>
  );
};

export default MainLayout;
