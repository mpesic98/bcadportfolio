import { useState } from "react";
import closeImg from "../../assets/close.png";
import menuImg from "../../assets/menu.png";
import logo from "../../assets/BClogo.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center p-6 border-b border-gray-300 text-xl shadow-lg">
      <img src={logo} alt="logo-img" className="w-20 h-20 rounded-md shadow-lg"/>

      <ul className="hidden md:flex gap-15">
        <Link to = "/"><li className="cursor-pointer hover:text-green-500">USA</li></Link>
        <Link to = "/latam"><li className="cursor-pointer hover:text-green-500">LATAM</li></Link>
        <Link to = "/modal"><li className="cursor-pointer hover:text-green-500">EUROPE</li></Link>
      </ul>

    <button className="hidden md:inline-flex relative items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-black rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
        Ads Preview
      </span>
    </button>


      <button
        className="block md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={isOpen ? closeImg : menuImg}
          alt="menu toggle"
          className="w-6 h-6"
        />
      </button>

      {isOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-white shadow-md md:hidden">
          <ul className="flex flex-col items-center gap-4 py-6">
            <li className="cursor-pointer hover:text-gray-500">Ad1</li>
            <li className="cursor-pointer hover:text-gray-500">Ad2</li>
            <li className="cursor-pointer hover:text-gray-500">Ad3</li>
            <button className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100">
              Ads Preview
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
