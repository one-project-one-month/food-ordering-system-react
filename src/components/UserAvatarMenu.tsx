/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { User, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { logout } from "../features/auth/authSlice";

const UserAvatarMenu = ({ userId, name = "Name", image }: { userId: string; name?: string; image: string }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    void navigate("/");
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer border border-lightGray">
            {image!==''&&image!==null ?<img src={image} alt={name}/> : <AvatarImage src="https://github.com/shadcn.png" />}
            <AvatarFallback>{name?.[0] ?? "U"}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-44 bg-white shadow-md rounded-xl"
        >
          <DropdownMenuItem asChild>
            <Link to={`/view/${userId}`} className="flex items-center gap-2 w-full text-gray-700">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <p className="text-gray-700">{name}</p>
    </div>
  );
};

export default UserAvatarMenu;
