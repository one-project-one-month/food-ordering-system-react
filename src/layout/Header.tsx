import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../components/ui/sheet";
import { Menu, ShoppingCart} from "lucide-react";
import Nav from "../components/Nav";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { FacebookIcon, IgIcon, TwitterIcon } from "../icons/icons";
import Cookies from "js-cookie";

export default function Header() {
    const cartQuantity = useSelector((state: RootState) => state.cart.quantity);
    const navigate = useNavigate();
    const [isAuthenticated, ] = useState(false);
    const [sheetOpen, setSheetOpen] = useState(false);
    const userRole = Cookies.get("role")||'';

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
        <header className="bg-mainBg sticky top-0 z-50 h-[76px] flex items-center">
            <div className="container flex h-16 items-center justify-between w-full">
                {/* Left: Sheet Menu */}
                <div className="flex items-center">
                    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" className="w-10 h-10 p-0">
                                <Menu className="w-6 h-6 text-primary" style={{ width: '20px', height: '20px' }}/>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col justify-between"> 
                            <div>
                                {userRole==='user' && <Nav onLinkClick={() => setSheetOpen(false)} />}
                                <div className={`${userRole==='user' ? 'mt-6' : 'mt-10'} `}>
                                    {isAuthenticated ? (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-base flex h-[36px] md:h-[52px]"
                                        onClick={() => {
                                        // logout
                                        }}
                                    >
                                        Logout
                                    </Button>
                                    ) : (
                                    <div className="flex gap-4 flex-col">
                                        <Button
                                        variant="default"
                                        size="sm"
                                        className="text-base flex h-[36px] md:h-[52px]"
                                        onClick={() => {navigate("/signup"); setSheetOpen(false);}}
                                        >
                                        Sign Up
                                        </Button>
                                        <Button
                                        variant="default"
                                        size="sm"
                                        className="text-base flex h-[36px] md:h-[52px]"
                                        onClick={() => {navigate("/login"); setSheetOpen(false);}}
                                        >
                                        Login
                                        </Button> 
                                    </div>
                                    )}
                                </div>
                                {userRole==='' && 
                                <div className="mt-16 flex flex-col gap-4">
                                    <Link to='' className="text-sm font-medium">Create business accout</Link>
                                    <Link to='' className="text-sm font-medium">Add restaurant</Link>
                                    <Link to='' className="text-sm font-medium">Sign up to deliver</Link>
                                </div>
                                }
                            </div>
                            <div className="nav-foot flex flex-col justify-center items-center text-center">
                                <p className="font-lobster font-normal text-3xl text-primary">Sar Mal</p> 
                                <p className="font-poppins font-normal text-sm text-muted-foreground pt-4 leading-6">Be the fastest in<br/>delivering your<br/> foods</p> 
                                <div className="flex flex-row gap-4 mt-20 mb-10 justify-center">
                                    <Link to='' ><FacebookIcon /></Link>
                                    <Link to='' ><TwitterIcon /></Link>
                                    <Link to='' ><IgIcon /></Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <p className="font-lobster font-normal text-2xl text-primary italic">Sar Mal</p>
                </div>
                <div className="flex items-center gap-4">
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
                    className="text-base rounded-full h-[36px] hidden lg:flex"
                    onClick={() => {
                        // logout logic
                    }}
                    >
                    Logout
                    </Button>
                ) : (
                    <div className="flex gap-4 hidden lg:flex">
                        <Button
                        variant="default"
                        size="sm"
                        className="text-base rounded-full h-[36px]"
                        onClick={() => navigate("/login")}
                        >
                        Login
                        </Button>
                        <Button
                        variant="default"
                        size="sm"
                        className="text-base rounded-full h-[36px]"
                        onClick={() => navigate("/signup")}
                        >
                        Sign Up
                        </Button>
                    </div>
                )}
                </div>
            </div>
        </header>
    );
}
