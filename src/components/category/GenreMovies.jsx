

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useEffect, useState } from "react";
import { getMoviesByGenre } from "../../api/movieService";
import { Play, Plus } from "lucide-react";

const GenreMovies = ({ genreId }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMoviesByGenre(genreId);
        setMovies(data);
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
        modules={[Navigation, Pagination]}
        breakpoints={{
                    0: { slidesPerView: 1},
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="flex flex-col text-left gap-2 bg-foreground/20">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[400px] object-cover rounded-lg"
              />
              <div className="h-48 flex flex-col justify-between mb-1">
                <p className="text-xs sm:text-sm text-foreground/80 ">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </p>

                <h3 className="">{movie.title} </h3>
                <div className=" my-3 bg-background/50 text-primary rounded-2xl flex flex-row items-center p-3">
                  <Plus /> <span className="  text-center">Watch options</span>
                </div>
                <div className="flex flex-row  justify-center m-2">
                  <Play className="w-6 h-6 stroke-foreground " />
                  <span className="font-bold">Trailer</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GenreMovies;
