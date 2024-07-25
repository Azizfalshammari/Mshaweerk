import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firbase";
import logo from "../assets/logo-jadw.png";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="w-full">
      <nav className="bg-[#9685CF] h-[10vh]">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center mr-2 hover:text-gray-300">
            <img
              src={logo}
              className="w-auto mr-4 h-[15vh] max-sm:h-[10vh]"
              alt="Logo"
            />
          </Link>
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="py-2 px-3 ml-3 text-2xl bg-[#FFA842] text-white rounded-lg transition duration-300"
              >
                تسجيل خروج
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-2 px-3 text-2xl border border-[#FFA842] text-white hover:text-[#9685CF] rounded-lg transition duration-300"
                >
                  تسجيل دخول
                </Link>
                <Link
                  to="/signup"
                  className="py-2 px-3 ml-3 text-2xl bg-[#FFA842] text-white rounded-lg transition duration-300"
                >
                  تسجيل جديد
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button" onClick={toggleMenu}>
              <svg
                className="w-6 h-6 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`mobile-menu ${
            menuOpen ? "block" : "hidden"
          } md:hidden bg-white`}
        >
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="block py-2 px-4 text-white bg-[#9685CF] hover:bg-[#7d6eb0] rounded"
            >
              تسجيل خروج
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="block py-2 px-4 text-black hover:bg-gray-300 border border-[#9685CF] rounded"
              >
                تسجيل دخول
              </Link>
              <Link
                to="/signup"
                className="block py-2 px-4 text-white bg-[#9685CF] hover:bg-[#7d6eb0] rounded"
              >
                تسجيل جديد
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
