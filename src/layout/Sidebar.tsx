import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import Cookies from "js-cookie";
import { LayoutDashboard, ListOrdered, Menu, User, LogOut } from "lucide-react";
import { useState } from "react";
import { PanelLeftClose ,PanelRightClose  } from "lucide-react";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../store";
import { logout } from "../features/auth/authSlice";

const Sidebar = () => {
    const userRole = Cookies.get("role");
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [isOpen, setIsOpen] = useState(true);
    const links = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, },
        { href: "/order_list", label: "Order Lists", icon: ListOrdered, roles: ["owner"] },
        { href: "/restaurant", label: "My Restaurant", icon: ListOrdered, roles: ["owner"] },
        { href: "/categories", label: "Categories", icon: ListOrdered, roles: ["owner"] },
        { href: "/menus", label: "Menus", icon: Menu, roles: ["owner"] },
    ];

    const bottomLinks = [
        { href: "/profile", label: "Profile", icon: User },
    ];

    const visibleLinks = links.filter(
        ({ roles }) => !roles || roles.includes(userRole ?? "")
    );

    const handleLogout = () => {
      dispatch(logout())
      void navigate("/");
    };

  return (
    <div className="relative">
      <button
        onClick={() => { setIsOpen(!isOpen); }}
        className={`absolute top-6 ${isOpen? 'right-[-17px]' : 'left-6'} z-50 bg-white border border-gray-200 p-2 rounded-md shadow-md hover:bg-gray-100 transition`}
      >
        {isOpen ? <PanelLeftClose className="w-5 h-5 text-primary" /> : <PanelRightClose className="w-5 h-5 text-primary" />}
      </button>
      <aside className={`fixed top-0 left-0 h-full bg-white shadow-md shadow-gray-200 transform transition-transform duration-300 z-40 
          ${isOpen ? "translate-x-0 w-60" : "-translate-x-full w-0 hidden"}   sm:relative `}
      >
        <div className="h-[77px] px-3">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
          <p className="text-sm pt-1 text-gray-500">Admin Dashboard</p>
        </div>
        <nav className="space-y-2 pt-10">
          {visibleLinks.map(({ href, label, icon: Icon }) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) =>
                `flex items-center gap-2 py-2 px-3 rounded-md text-sm transition-colors duration-200 hover:bg-lightGreen hover:text-primary ${
                  isActive ? "bg-lightGreen text-primary" : "text-gray-700"
                }`
              }
            >
              <Icon className="w-5 h-5" />{label}
            </NavLink>
          ))}
          
          {/* common links */}
          {bottomLinks.map(({ href, label, icon: Icon }) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2 px-3 rounded-md text-sm transition-colors duration-200 hover:bg-lightGreen hover:text-primary ${
                  isActive ? "bg-lightGreen text-primary" : "text-gray-700"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>
        {/* Bottom Section */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 py-2 px-3 rounded-md text-sm text-gray-700 hover:bg-lightGreen hover:text-primary transition-colors duration-200 w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
