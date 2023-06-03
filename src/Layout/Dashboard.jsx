import {
  FaBook,
  FaCalendarAlt,
  FaEnvelope,
  FaHamburger,
  FaHome,
  FaRandom,
  FaShoppingBag,
  FaShoppingCart,
  FaUser,
  FaUsers,
  FaUtensils,
  FaWallet,
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [cart] = useCart();

  // TODO: load data from server to have dynamic isAdmin
  // const isAdmin = true;
  const [isAdmin] = useAdmin();

  return (
    <div className="drawer drawer-mobile ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side bg-[#D1A054]">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80">
          {/* Sidebar content here */}
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminhome">
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/additem">
                  <FaUtensils /> Add an Item
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageitems">
                  <FaWallet /> Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/adminhome">
                  <FaBook /> Manage Bookings (TBD)
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allusers">
                  <FaUsers /> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userhome">
                  <FaHome></FaHome> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/userhome">
                  <FaCalendarAlt></FaCalendarAlt> Reservations (TBD)
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/userhome">
                  <FaWallet></FaWallet> Payment History (TBD)
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/mycart">
                  <FaShoppingCart /> My Cart
                  <span className="badge inl badge-secondary">
                    {cart?.length || 0}
                  </span>
                </NavLink>
              </li>
            </>
          )}

          {/* DIVIDER */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu">
              <FaHamburger /> Our Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <FaShoppingBag /> Order Food
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
