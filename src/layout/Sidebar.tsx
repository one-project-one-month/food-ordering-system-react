import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/logo.png';
import Cookies from 'js-cookie';
import {
  LayoutDashboard,
  ListOrdered,
  Menu,
  MapPinHouse,
  Utensils,
  LayoutGrid,
} from 'lucide-react';
import { useState } from 'react';
import { PanelLeftClose, PanelRightClose } from 'lucide-react';

const Sidebar = () => {
  const userRole = Cookies.get('role');
  const [isOpen, setIsOpen] = useState(true);
  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/orders', label: 'Order Lists', icon: ListOrdered, roles: ['owner'] },
    { href: '/delivery_orders', label: 'Order Lists', icon: ListOrdered, roles: ['delivery'] },
    { href: '/restaurant', label: 'My Restaurant', icon: Utensils, roles: ['owner'] },
    { href: '/categories', label: 'Categories', icon: LayoutGrid, roles: ['owner'] },
    { href: '/menus', label: 'Menus', icon: Menu, roles: ['owner'] },
    { href: '/apply_restaurant', label: 'Restaurants', icon: Utensils, roles: ['delivery'] },
    {
      href: '/my_address',
      label: 'My Address',
      icon: MapPinHouse,
      roles: ['owner', 'delivery'],
    },
  ];

  const visibleLinks = links.filter(({ roles }) => !roles || roles.includes(userRole ?? ''));

  return (
    <div className="relative z-[10]">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={`absolute top-6 ${isOpen ? 'right-[-17px]' : 'left-6'} z-50 bg-white border border-gray-200 p-2 rounded-md shadow-md hover:bg-gray-100 transition`}
      >
        {isOpen ? (
          <PanelLeftClose className="w-5 h-5 text-primary" />
        ) : (
          <PanelRightClose className="w-5 h-5 text-primary" />
        )}
      </button>
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-md shadow-gray-200 transform transition-transform duration-300 z-40 
          ${isOpen ? 'translate-x-0 w-60' : '-translate-x-full w-0 hidden'}   sm:relative `}
      >
        <div className="h-[77px] px-3">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
          <p className="text-sm pt-1 text-gray-500">
            {userRole === 'owner'
              ? 'Owner Dashboard'
              : userRole === 'delivery'
                ? 'Delivery Dashboard'
                : 'Admin Dashboard'}
          </p>
        </div>
        <nav className="space-y-2 pt-10">
          {visibleLinks.map(({ href, label, icon: Icon }) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) =>
                `flex items-center gap-2 py-2 px-3 rounded-md text-sm transition-colors duration-200 hover:bg-lightGreen hover:text-primary ${
                  isActive ? 'bg-lightGreen text-primary' : 'text-gray-700'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
