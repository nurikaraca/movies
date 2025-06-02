import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useEffect, useState } from "react";
import { getMoviesByGenre, getWatchProviders } from "../../api/movieService";
import { Play, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const GenreMovies = ({ genreId }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const result = await getMoviesByGenre(genreId);
        setMovies(result);
      } catch (error) {
        console.error("Error fetching genre movies:", error);
      }
    };
    fetchMovies();
  }, [genreId]);

 
  return (
    <div className="container mx-auto my-10">
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        navigation={true}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1536: { slidesPerView: 4 },
        }}
        modules={[Navigation, Pagination]}
        simulateTouch={true}
        allowSlidePrev={false}
        allowSlideNext={false}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="flex flex-col text-left gap-4 bg-foreground/20">
              <Link
                to={`/title/${movie.id}/${movie.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[400px] object-cover rounded-lg"
                />
                {/* <div className="h-48 flex flex-col justify-between mb-1">
                <p className="text-xs sm:text-xl  text-foreground/80 p-2 ">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </p>

                <h3 className="text-lg p-2 ">{movie.title} </h3>

                <div className="flex flex-row  justify-baseline m-4 bg-background/20 pl-2 ">
                  <Play className="w-6 h-6 stroke-foreground " />
                  <span className="font-bold">Trailer</span>
                </div>
              </div> */}

                <div className="h-48 flex flex-col justify-between p-4 rounded-xl bg-background shadow-md hover:shadow-lg transition-shadow duration-300">
                  {/* Rating */}
                  <p className="text-sm sm:text-lg text-yellow-500 font-semibold">
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </p>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-foreground truncate">
                    {movie.title}
                  </h3>

                  {/* Trailer Button */}
                  <div className="flex items-center gap-2 mt-2 bg-primary/10 text-primary px-3 py-1 rounded-md cursor-pointer hover:bg-primary/20 transition-colors">
                    <Play className="w-5 h-5 stroke-current" />
                    <span className="font-medium text-sm">Watch Trailer</span>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GenreMovies;
