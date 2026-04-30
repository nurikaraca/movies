import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useGenreMovies } from "../../hooks/useGenreMovies";

const GenreMovies = ({ genreId }) => {
  const { data: movies = [], isLoading, isError } = useGenreMovies(genreId);

  if (isLoading) {
    return <div className="container mx-auto my-10">Loading movies...</div>;
  }

  if (isError) {
    return <div className="container mx-auto my-10">Error loading movies.</div>;
  }

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

                <div className="h-48 flex flex-col justify-between p-4 rounded-xl bg-background shadow-md hover:shadow-lg transition-shadow duration-300">
                  <p className="text-sm sm:text-lg text-yellow-500 font-semibold">
                    Rating: {movie.vote_average?.toFixed(1)}
                  </p>

                  <h3 className="text-lg sm:text-xl font-bold text-foreground truncate">
                    {movie.title}
                  </h3>

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
