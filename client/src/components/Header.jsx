//libraries
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

//context
import { AppContext } from "../context/AppContext";

//components
import MobileMenu from "./MobileMenu";

//assets
import appLogo from "../assets/budgetBuddy_logo.png";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, isHome, isDisabled } =
    useContext(AppContext);

  const [isOpen, setIsOpen] = useState(false);

  const handleClickLogout = async () => {
    try {
      const { refreshToken } = JSON.parse(localStorage.getItem("token"));

      const response = await fetch("http://localhost:8080/api/v1/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ refreshToken }),
      });

      await response.json();

      if (!response.ok) {
        console.log("Error logging out");
      } else {
        localStorage.setItem("token", {});
        setIsLoggedIn(false);
        navigate("/login");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleLogoCLick = () => {
    window.scrollTo(0, 0);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-gray-800 text-white drop-shadow-2xl z-100">
      <nav
        className={`transition-opacity duration-300 ${
          isDisabled ? "opacity-50 pointer-events-none" : "opacity-100"
        } h-full w-full flex gap-4 items-center px-8 2xl:px-80`}
      >
        <Link to={isLoggedIn ? "/dashboard" : "/"} onClick={handleLogoCLick}>
          <img className="h-12" src={appLogo} alt="App Logo" />
        </Link>
        {isLoggedIn ? (
          <div className="flex w-full justify-end">
            <div className="hidden lg:flex w-full justify-between gap-6 items-center ">
              <div className="flex gap-8 w-full items-center justify-end">
                <Link className="navBtn" to="/dashboard">
                  Dashboard
                </Link>
                <Link className="navBtn" to="/profile">
                  Profile
                </Link>
                <button className="navBtn" onClick={handleClickLogout}>
                  Logout
                </button>
              </div>
            </div>
            <div className="lg:hidden">
              <MobileMenu
                handleClickLogout={handleClickLogout}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </div>
          </div>
        ) : (
          <div className="flex w-full justify-end">
            <div className="hidden lg:flex w-full justify-between gap-6 items-center">
              {isHome && (
                <div className="flex gap-4">
                  <a className="navBtn" href="#about">
                    About
                  </a>
                  <Link className="navBtn" to="#contact">
                    Contact
                  </Link>
                </div>
              )}
              <div className="flex gap-8 w-full items-center justify-end">
                <Link className="navBtn" to="/login">
                  Login
                </Link>
                <Link className="registerBtn h-10 w-40" to="/register">
                  Registration
                </Link>
              </div>
            </div>
            <div className="lg:hidden">
              <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
