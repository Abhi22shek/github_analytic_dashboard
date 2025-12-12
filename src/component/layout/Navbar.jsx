import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiGithub, FiMoon, FiSun, FiStar } from "react-icons/fi";
import { IoIosGitCompare } from "react-icons/io";
import { Menu,X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "../common/Button";
import { Sidebar } from "./Sidebar";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <nav className="text-foreground bg-background shadow-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <FiGithub className="w-8 h-8 text-primary" />
              <span className="text-xl font-semibold text-gray-800 dark:text-white">
                Github Analytics
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
              >
                Home
              </Link>

              <Link
                to="/favorites"
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
              >
                <FiStar className="w-4 h-4" />
                <span>Favorites</span>
              </Link>

              <Link
                to="/compare"
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
              >
                <IoIosGitCompare className="w-4 h-4" />
                <span>Compare</span>
              </Link>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="rounded-full  p-2"
              >
                {theme === "light" ? (
                  <FiSun className="w-5 h-5" />
                ) : (
                  <FiMoon className="w-5 h-5" />
                )}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="block md:hidden px-2 gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                
              >
                {theme === "light" ? (
                  <FiMoon className="size-4" />
                ) : (
                  <FiSun className="size-4" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMenu(!showMenu)}
                
              >
                {showMenu ? <X className="size-4"/> : <Menu className="size-4"/>}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* SIDEBAR INJECTION */}
      <Sidebar isOpen={showMenu} onClose={() => setShowMenu(false)} />
    </>
  );
};
