//libraries
import { useContext } from "react";

//libraries
import { useState } from "react";
import { Link } from "react-router-dom";

//context
import { AppContext } from "../context/AppContext";

const MobileMenu = ({ handleClickLogout, isOpen, setIsOpen }) => {
  const { isLoggedIn, isHome } = useContext(AppContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsOpen(false);
    handleClickLogout();
  };

  const handleClickDashboard = () => {
    window.scrollTo(0, 0);
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={toggleMenu}
        className="flex flex-col items-center justify-center w-10 h-10 bg-gray-800 rounded focus:outline-none"
      >
        <div
          className={`w-8 h-1 mb-1 bg-white transition-all duration-300 ${
            isOpen ? "transform rotate-45 translate-y-2" : ""
          }`}
        ></div>
        <div
          className={`w-8 h-1 mb-1 bg-white transition-all duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></div>
        <div
          className={`w-8 h-1 bg-white transition-all duration-300 ${
            isOpen ? "transform -rotate-45 -translate-y-2" : ""
          }`}
        ></div>
      </button>

      {/* Mobile Menu */}
      {isOpen &&
        (!isLoggedIn ? (
          <div className="absolute top-14 right-0 w-screen bg-gray-800 text-white shadow-lg p-4 text-center">
            <ul>
              <li className="py-2 ml-4">
                <Link
                  className="registerBtn w-50 h-10"
                  onClick={() => setIsOpen(false)}
                  to="/register"
                >
                  Registration
                </Link>
              </li>
              <li className="py-2 ml-4">
                <Link
                  className="navBtn"
                  onClick={() => setIsOpen(false)}
                  to="/login"
                >
                  Login
                </Link>
              </li>
              {isHome && (
                <>
                  <li className="py-2 ml-4">
                    <a
                      className="navBtn"
                      onClick={() => setIsOpen(false)}
                      href="#about"
                    >
                      About
                    </a>
                  </li>
                  <li className="py-2 ml-4">
                    <Link
                      className="navBtn"
                      onClick={() => setIsOpen(false)}
                      to="#contact"
                    >
                      Contact
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        ) : (
          <div className="absolute top-14 right-0 w-screen bg-gray-800 text-white shadow-lg p-4 text-center">
            <ul>
              <li className="py-2 ml-4">
                <Link
                  className="navBtn"
                  onClick={handleClickDashboard}
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li className="py-2 ml-4">
                <Link
                  className="navBtn"
                  onClick={() => setIsOpen(false)}
                  to="/profile"
                >
                  Profile
                </Link>
              </li>
              <li className="py-2 ml-4">
                <button className="navBtn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ))}
    </div>
  );
};

export default MobileMenu;
