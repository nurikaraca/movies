import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPopularMovies } from "../api/movieService";

const HeroSection = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <section
      id="hero"
      className=" flex flex-col items-center justify-center  mt-38 h-[550px]"
    >
      {/*   */}
      <div className=" mx-auto  max-w-7xl  w-full  h-full">
        <Swiper
          navigation={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1, // sm
            },
            768: {
              slidesPerView: 2, // md
            },
            1024: {
              slidesPerView: 3, // lg
            },
            1280: {
              slidesPerView: 4, // xl ve üzeri
            },
          }}
          modules={[Navigation, Autoplay]}
          className="w-full h-full "
        >
          {movies.map((movie) => (
            <SwiperSlide
              key={movie.id}
              className=" text-center text-xl w-full h-full   flex justify-center items-center "
            >
              <Link
                to={`/title/${movie.id}/${movie.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="block w-full h-full object-cover "
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HeroSection;
