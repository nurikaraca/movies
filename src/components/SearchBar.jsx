import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { searchMovies } from "../api/movieService";
import { cn } from "../lib/utils";

{
  /* Redux Hooks */
}
import { useSelector, useDispatch } from "react-redux";
import { toggleInput, setInputVisible } from "../features/searchSlice";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const showInput = useSelector((state) => state.search.showInput);
  console.log("showInput:", showInput);

  const dispatch = useDispatch();

  //  useEffect(() => {
  //     const handleResize = () => {
  //       const isSmallScreen = window.innerWidth < 640;
  //       dispatch(setInputVisible(isSmallScreen)); // Küçük ekranda göster, büyük ekranda gizle
  //     };

  //     handleResize(); // ilk render'da kontrol et
  //     window.addEventListener("resize", handleResize); // ekran boyutu değişince kontrol et

  //     return () => window.removeEventListener("resize", handleResize);
  //   }, [dispatch]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.length > 1) {
        const data = await searchMovies(searchTerm);
        setResults(data.slice(0, 5));
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (results.length === 1) {
      navigate(`/movie/${results[0].id}`);
    } else if (searchTerm.trim()) {
      navigate(`/search-results?query=${searchTerm}`);
    }
    setSearchTerm("");
    setResults([]);
    setShowInput(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 ">
        <div
          className={cn(
            "hidden sm:flex  w-full justify-center ",
            showInput ? "flex" : "hidden"
          )}
        >
          <Input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 "
          />
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="sm:hidden ml-auto"
          onClick={() => {
            if (showInput) {
              dispatch(setInputVisible(false));
              setSearchTerm("");
              setResults([]);
            } else {
              dispatch(setInputVisible(true));
            }
          }}
        >
          {showInput ? (
            <X className="h-5 w-5" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </Button>
      </form>

      {/* search results */}
      {searchTerm.length > 1 && (
        <div className="absolute top-full mt-2 w-full bg-background rounded-md shadow-lg z-50 max-h-60 overflow-auto">
          {results.length > 0 ? (
            <>
              {results.map((movie) => (
                <Link
                  key={movie.id}
                  to={`/title/${movie.id}/${movie.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="block px-4 py-2 hover:bg-gray-100 text-left"
                  onClick={() => {
                    navigate(`/movie/${movie.id}`);
                    setResults([]);
                    setSearchTerm("");
                    setShowInput(false);
                  }}
                >
                  <div className="flex items-center justify-baseline ">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="block w-12 h-12 object-cover "
                    />
                   <span className="ml-4 ">{movie.title}</span> 
                  </div>
                </Link>
              ))}
              {results.length >= 5 && (
                <Button
                  onClick={() => {
                    navigate(`/search-results?query=${searchTerm}`);
                    setTimeout(() => {
                      setSearchTerm("");
                      setResults([]);
                    }, 0);
                  }}
                  variant="link"
                >
                  See all results for "{searchTerm}"
                </Button>
              )}
            </>
          ) : (
            <div className={cn("px-4 py-2 text-gray-500")}>
              No results found for "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
