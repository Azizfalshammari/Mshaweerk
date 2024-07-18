import React from "react";
import logo from ".../assets/lan-fp.png";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="w-full mb-2">
      <nav className="bg-white h-[10vh]">
        <div className="flex items-center ">
          <div className="flex items-center space-x-4 mb-[0px]">
            <Link
              to="/"
              className="flex items-center mr-2 text-black hover:text-gray-300"
            >
              <img src={logo} className="w-auto h-[10vh] " alt="Logo" />
            </Link>
          </div>
          <div className="flex mr-auto">
            <div className="hidden md:flex items-center mr-auto gap-4 space-x-4">
              <Link
                to="/login"
                className="py-2 px-3 text-2xl border border-[#9685CF] text-black hover:text-[#9685CF] rounded-lg transition duration-300"
              >
                تسجيل دخول
              </Link>
              <Link
                to="/signup"
                className="py-2 px-3 text-2xl bg-[#9685CF] text-white rounded-lg transition duration-300"
              >
                تسجيل جديد
              </Link>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button">
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
        <div className="mobile-menu hidden md:hidden bg-white">
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
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
