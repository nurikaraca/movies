import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const showInput = useSelector((state) => state.search.showInput);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
      )}
    >
      <div className="container  max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl lg:text-3xl  font-bold text-primary mr-2">
          Movies
        </Link>

        {/* Search Bar */}
        <SearchBar />

        {/* User Menu */}

        <div
          className={cn("flex items-center gap-2", showInput && "hidden sm:flex")}
        >
        
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
