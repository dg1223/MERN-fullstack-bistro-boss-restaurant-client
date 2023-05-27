import {
  FaCalendarAlt,
  FaEnvelope,
  FaHamburger,
  FaHome,
  FaShoppingBag,
  FaShoppingCart,
  FaWallet,
} from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <Outlet></Outlet>
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          {/* Sidebar content here */}
          <li>
            <Link>
              <FaHome /> User Home
            </Link>
          </li>
          <li>
            <Link>
              <FaCalendarAlt /> Reservations
            </Link>
          </li>
          <li>
            <Link>
              <FaWallet /> Payment History
            </Link>
          </li>
          <li>
            <Link to="/dashboard/mycart">
              <FaShoppingCart /> My Cart
            </Link>
          </li>
          <div className="divider"></div>
          <li>
            <Link to="/">
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/menu">
              <FaHamburger /> Menu
            </Link>
          </li>
          <li>
            <Link to="/order/salad">
              <FaShoppingBag /> Order Food
            </Link>
          </li>
          <li>
            <Link>
              <FaEnvelope /> Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
