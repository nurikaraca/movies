import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieCredits, searchMovies } from "../api/movieService";
import { Link } from "react-router-dom";

import { useSearchMovies } from "../hooks/useSearchMovies";

const SearchResults = () => {
  const [params] = useSearchParams();
  const query = params.get("query");
  const [castMap, setCastMap] = useState({});

  const { data: results = [], isloading, isError } = useSearchMovies(query);

  if (isloading) {
    return <div className="pt-24 max-w-6xl mx-auto px-4">Loading...</div>;
  }
  if (isError) return <p>Error occurred</p>;

  return (
    <div className="pt-24 max-w-6xl mx-auto px-4 ">
      <h2 className="text-2xl font-bold mb-4">Search results for "{query}"</h2>

      <div className="mt-4">
        {results.map((movie) => (
          <Link
            key={movie.id}
            to={`/title/${movie.id}/${movie.title
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            <div className="flex flex-row  mt-2 ">
              {/* <div className="w-auto h-[90px]  md:h-[350px] "> */}
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className=" w-auto h-[120px] sm:h-[280px] md:h-[350px] object-cover"
              />
              {/* </div> */}

              <div className="flex flex-col items-start  overflow-hidden ml-5 text-left ">
                <p className="text-sm sm:text-base md:text-lg font-semibold  line-clamp-1 mt-4 ">
                  {movie.title}
                </p>

                <h4 className="  text-xs sm:text-sm  text-foreground/55">
                  {new Date(movie.release_date).getFullYear()}
                </h4>

                <h6 className="  text-xs sm:text-sm text-foreground/55  line-clamp-3 lg:mt-14">
                  {movie.overview}
                </h6>

                <p className="text-xs sm:text-sm text-foreground/80 mt-2">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
