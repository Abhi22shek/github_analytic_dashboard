import { Link } from "react-router-dom";
import { FiStar } from "react-icons/fi";
import { IoIosGitCompare } from "react-icons/io";
import { FiHome } from "react-icons/fi";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { Github } from "lucide-react";

export const Sidebar = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0  bg-opacity-40 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR PANEL */}
      <div
        className={`fixed top-0 bg-background text-foreground h-full left-0 w-70  shadow-lg z-50 
        transform transition-transform duration-300 md:hidden
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 space-y-6">

            <div className="flex items-center gap-2">
                <Github className="w-6 h-6 text-primary"/>
                <h1 className="text-2xl font-bold text-primary">Github Analytics</h1>
            </div>

          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 text-lg px-4 py-3 rounded-2xl hover:bg-gray-400 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 hover:text-primary transition"
          >
            <FiHome />
            Home
          </Link>

          <Link
            to="/favorites"
            onClick={onClose}
            className="flex items-center gap-3 text-lg px-4 py-3 rounded-2xl hover:bg-gray-400 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 hover:text-primary transition"
          >
            <FiStar />
            Favorites
          </Link>

          <Link
            to="/compare"
            onClick={onClose}
            className="flex items-center gap-3 text-lg px-4 py-3 rounded-2xl hover:bg-gray-400 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 hover:text-primary transition"
          >
            <IoIosGitCompare />
            Compare
          </Link>
        </div>
      </div>
    </>
  );
};
