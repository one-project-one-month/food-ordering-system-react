import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../components/ui/sheet";
import { Menu, ShoppingCart } from "lucide-react";
import Nav from "../components/Nav";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from '../assets/logo.png'
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function Header() {
    const cartQuantity = useSelector((state: RootState) => state.cart.quantity);
    const navigate = useNavigate()
    const [isAuthenticated, ] = useState(false)
    const [sheetOpen, setSheetOpen] = useState(false);

    useEffect(() => {
        function handleResize() {
        if (window.innerWidth >= 767) {
            setSheetOpen(false);
        }
        }
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

  return (
    <header className="container bg-white sticky top-0 z-50 h-[96px] flex items-center">
        <div className="w-full flex h-16 items-center justify-between px-4">
            <div className="text-xl font-bold">
                <Link to="/"><img src={Logo} alt='logo' /></Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex justify-center flex-1">
                <Nav />
            </div>

            <div className="hidden md:flex items-center gap-4">
                <div className="relative inline-block">
                    <Button
                        variant="default"
                        size="sm"
                        className="rounded-full w-[36px] h-[36px]"
                        onClick={() => navigate("/cart")}
                        aria-label="Cart"
                    >
                        <ShoppingCart className="h-5 w-5" />
                    </Button>
                    {cartQuantity > 0 && (
                        <span
                        className="absolute -top-1 -right-1 inline-flex items-center justify-center
                                    px-1.5 py-0.5 text-xs font-medium leading-none text-white bg-red-500
                                    rounded-full"
                        style={{ minWidth: '18px', height: '18px' }}
                        >
                        {cartQuantity}
                        </span>
                    )}
                </div>

                {isAuthenticated ? (
                    <Button
                    variant="outline"
                    size="sm"
                    className="text-base rounded-full h-[36px]"
                    onClick={() => {
                        // logout logic
                    }}
                    >
                    Logout
                    </Button>
                ) : (
                    <Button
                    variant="default"
                    size="sm"
                    className="text-base rounded-full h-[36px]"
                    onClick={() => navigate("/login")}
                    >
                    Login / Sign Up
                    </Button>
                )}
            </div>

            {/* Mobile Buttons */}
            <div className="flex items-center gap-2 md:hidden">
                <div className="relative inline-block">
                    <Button
                        variant="default"
                        size="sm"
                        className="rounded-full w-[36px] h-[36px]"
                        onClick={() => navigate("/cart")}
                        aria-label="Cart"
                    >
                         <ShoppingCart className="h-5 w-5" />
                    </Button>
                    {cartQuantity > 0 && (
                        <span
                            className="absolute -top-1 -right-1 inline-flex items-center justify-center
                            px-1.5 py-0.5 text-xs font-medium leading-none text-white bg-red-500
                            rounded-full"
                            style={{ minWidth: '18px', height: '18px' }}
                        >
                        {cartQuantity}
                        </span>
                    )}
                </div>

            {/* Mobile Menu Button */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <Nav onLinkClick={() => {setSheetOpen(false) } }/>
                    <div className="mt-6">
                        {isAuthenticated ? (
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-base rounded-full h-[36px]"
                            onClick={() => {
                            // logout logic
                            }}
                        >
                            Logout
                        </Button>
                        ) : (
                        <Button
                            variant="default"
                            size="sm"
                            className="text-base rounded-full h-[36px]"
                            onClick={() => 
                                {
                                navigate("/login")
                                setSheetOpen(false);
                            }}
                        >
                            Login / Sign Up
                        </Button>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
            </div>
        </div>
    </header>
  );
}
