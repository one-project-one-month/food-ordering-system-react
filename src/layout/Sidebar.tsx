import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import Cookies from "js-cookie";
import { LayoutDashboard, ListOrdered,User, LogOut } from "lucide-react";

const Sidebar = () => {
    const userRole = Cookies.get("role");
    const navigate = useNavigate()
    const links = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, },
        { href: "/order_list", label: "Order Lists", icon: ListOrdered, roles: ["owner"] },
    ];

    const bottomLinks = [
        { href: "/profile", label: "Profile", icon: User },
    ];

    const visibleLinks = links.filter(
        ({ roles }) => !roles || roles.includes(userRole || "")
    );

    const handleLogout = () => {
    Cookies.remove("role");
    navigate("/login");
  };

  return (
    <aside className="w-60 h-full p-6 pt-4 bg-white shadow-lg shadow-gray-500">
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
  );
};

export default Sidebar;
