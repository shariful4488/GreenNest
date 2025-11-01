import React, { useContext, useState } from "react";
import { FaLeaf, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!", {
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: false,
      });
      setDropdownOpen(false);
      setMobileMenuOpen(false);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      toast.error(err.message, { position: "top-right" });
    }
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-green-600 font-semibold" : "hover:text-green-600"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/plants"
          className={({ isActive }) =>
            isActive ? "text-green-600 font-semibold" : "hover:text-green-600"
          }
        >
          Plants
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "text-green-600 font-semibold" : "hover:text-green-600"
          }
        >
          My Profile
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-white sticky top-0 z-50 shadow">
      <ToastContainer /> 
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-green-700 text-xl font-bold">
          <FaLeaf className="text-green-600" />
          GreenNest
        </Link>

        <ul className="hidden md:flex items-center gap-8">{navLinks}</ul>
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <div
                className="btn btn-ghost btn-circle avatar"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    alt="User Avatar"
                  />
                </div>
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-base-100 rounded shadow-lg z-50">
                  <p className="px-4 py-2 font-semibold border-b">{user.displayName || "User"}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="border border-green-600 text-green-600 px-4 py-1.5 rounded-md hover:bg-green-600 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="bg-green-600 text-white px-4 py-1.5 rounded-md hover:bg-green-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col gap-2 p-4">
            {navLinks}
            {user ? (
              <>
                <p className="font-semibold px-2 py-1">{user.displayName || "User"}</p>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-2 py-1 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="border border-green-600 text-green-600 px-4 py-1.5 rounded-md hover:bg-green-600 hover:text-white block text-center"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-green-600 text-white px-4 py-1.5 rounded-md hover:bg-green-700 block text-center"
                >
                  Register
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
