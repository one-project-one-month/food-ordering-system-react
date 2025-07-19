import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const links = [
  { href: "/", label: "Home" },
  { href: "/order_list", label: "Orders", roles: ["user"] },
];

export default function Nav({ onLinkClick }: { onLinkClick?: () => void }) {
  const { pathname } = useLocation();
  const userRole = Cookies.get("role");

  const visibleLinks = links.filter(
        ({ roles }) => !roles || roles.includes(userRole || "")
    );

  const renderLinks = (isMobile: boolean) =>
    visibleLinks.map((link) => {
      const isActive = pathname === link.href;

      return (
        <Link
          key={link.href}
          to={link.href}
          className={`relative text-base font-medium transition-colors ${
            isActive ? "text-primary" : "hover:text-primary"
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
      <div className="flex flex-col gap-4 mt-10">{renderLinks(true)}</div>
  );
}
