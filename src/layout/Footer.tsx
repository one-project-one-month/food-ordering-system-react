import { Link } from "react-router-dom";
import { FacebookIcon, IgIcon, TwitterIcon } from "../icons/icons";

const Footer = () => {
  return (
    <footer className="py-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-gray-700 text-sm">
        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Contact</h4>
          <p>info@sarmal.com</p>
          <p>910 468 587 1235</p>
          <p>Building 6, 6th Floor<br/>KyiMyinTaing, Yangon</p>
        </div>

        {/* Restaurant Menu */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Our Menu</h4>
          <ul className="flex flex-col gap-1">
            <Link to='' >Breakfast</Link>
            <Link to='' >Lunch</Link>
            <Link to='' >Dinner</Link>
          </ul>
        </div>

        {/* Info Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Information</h4>
          <ul className="flex flex-col gap-1">
            <Link to='' >About Us</Link>
            <Link to='' >Terms & Conditions</Link>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Connect With Us</h4>
          <ul className="flex flex-row gap-2">
            <Link to='' ><FacebookIcon /></Link>
            <Link to='' ><TwitterIcon /></Link>
            <Link to='' ><IgIcon /></Link>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-400 text-xs">
        © 2025 SarMal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
