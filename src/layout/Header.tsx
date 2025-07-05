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

export default function Header() {
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
    <header className="container bg-white sticky top-0 z-50">
        <div className="w-full flex h-16 items-center justify-between px-4">
            <div className="text-xl font-bold">
                <Link to="/">Logo</Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex justify-center flex-1">
                <Nav />
            </div>

            <div className="hidden md:flex items-center gap-4">
                <Button
                    variant="default"
                    size="sm"
                    onClick={() => navigate("/cart")}
                    aria-label="Cart"
                >
                    <ShoppingCart className="h-5 w-5" />
                </Button>

                {isAuthenticated ? (
                    <Button
                    variant="outline"
                    size="sm"
                    className="text-base"
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
                    className="text-base"
                    onClick={() => navigate("/login")}
                    >
                    Login / Sign Up
                    </Button>
                )}
            </div>

            {/* Mobile Buttons */}
            <div className="flex items-center gap-2 md:hidden">
            <Button
                variant="default"
                size="icon"
                onClick={() => navigate("/cart")}
                aria-label="Cart"
            >
                <ShoppingCart className="h-6 w-6" />
            </Button>

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
                            className="text-base"
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
                            className="text-base"
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
