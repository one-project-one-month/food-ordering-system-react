import { Link, useLocation } from "react-router-dom";

const links = [
  { href: "/menu", label: "Menu" },
  { href: "/categories", label: "Categories" },
  { href: "/restaurants", label: "Restaurant" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
];

export default function Nav({ onLinkClick }: { onLinkClick?: () => void }) {
  const { pathname } = useLocation();

  const renderLinks = (isMobile: boolean) =>
    links.map((link) => {
      const isActive = pathname === link.href;

      return (
        <Link
          key={link.href}
          to={link.href}
          className={`relative text-base font-semibold transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-primary after:transition-all after:duration-300 ${
            isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
          } ${isMobile ? "w-fit" : ""}`}
          onClick={() => {
            if (onLinkClick) onLinkClick();
          }}
        >
          {link.label}
        </Link>
      );
    });

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden md:flex lg:gap-16 md:gap-8">{renderLinks(false)}</nav>

      {/* Mobile Nav */}
      <div className="md:hidden flex flex-col gap-4 mt-4">{renderLinks(true)}</div>
    </>
  );
}
