import { useContext } from "react";

//context
import { AppContext } from "../context/AppContext";

const Footer = () => {
  const { isDisabled } = useContext(AppContext);

  return (
    <footer className="bg-gray-800 text-white py-4">
      <div
        className={`transition-opacity duration-300 ${
          isDisabled ? "opacity-50 pointer-events-none" : "opacity-100"
        } container mx-auto px-4 flex flex-col items-center text-sm`}
      >
        <p className="font-roboto text-center mb-2">
          &copy; 2024, BuddyBudget. All Rights Reserved
        </p>
        <div className="flex gap-2">
          <a href="#" className="hover:text-teal-300 transition duration-200">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="#" className="hover:text-teal-300 transition duration-200">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
