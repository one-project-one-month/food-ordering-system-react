// import Header from "../Header"; // your header component
import { Outlet } from "react-router-dom";
import Header from "./Header";


const MainLayout = () => {
  return (
    <div className="w-full">
      <Header />
      <main className="mx-auto">
        <Outlet />
      </main>
       
    </div>
  );
};

export default MainLayout;
