import { useParams, useSearchParams } from "react-router-dom";
import { useMovieVideos } from "../hooks/useMovieVideos";
import { useEffect, useState } from "react";
import { Plus, Eye } from "lucide-react";

import { useMovie } from "../hooks/useMovie";
import { cn } from "../lib/utils";
import { useMovieCredits } from "../hooks/useMovieCredits";
import { Button } from "../components/ui/button";
import { getMovieImages, getWatchProviders } from "../api/movieService";
import MovieImages from "../components/image/MovieImages";

const Title = () => {
  const { id, slug } = useParams();
  const [images, setImages] = useState([]);
  const [params] = useSearchParams();
  const query = params.get("query");
  const { data: credits = {}, isLoading: isCreditsLoading } =
    useMovieCredits(id);

  const { data: movie = [], isloading, isError } = useMovie(id);
  const { data: videos = [] } = useMovieVideos(id);
  const [providers, setProviders] = useState([]);

  if (isloading) {
  return <div className="pt-24 max-w-6xl mx-auto px-4">Loading...</div>;
}
if (isError) {
  return <p>Error occurred</p>;
}

  const trailer = videos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
  useEffect(() => {
    const fetchImages = async () => {
      const images = await getMovieImages(id);
      console.log("movie images", images);
      setImages(images);
    };
    fetchImages();
    window.scroll(0,0)
  }, [id]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const providers = await getWatchProviders(movie.id);
        setProviders(providers);
      } catch (error) {
        console.error("Error fetching genre movies:", error);
      }
    };
    fetchProviders();
  }, [movie]);

 

  return (
    <div className="container mx-auto min-h-screen px-4 py-8 mt-14 bg-background  ">
      <div className="flex flex-col items-start gap-4">
        <h1 className="text-2xl font-semibold  text-left overflow-wrap: break-words">
          {movie.title}
        </h1>
        <div className="flex flex-row items-center text-foreground/55">
          <span>{new Date(movie.release_date).getFullYear()} </span>
          <span className="mx-2">-</span>
          <span>
            {movie.vote_average ? Math.floor(movie.vote_average) + "+" : "N/A"}
          </span>
          <span className="mx-2">-</span>
          <span>{movie.runtime}</span>
        </div>
      </div>

      <div className="grid grid-cols-6 grid-rows-auto gap-4 sm:mb-5">
        {/* Trailer Video */}
        <div
          className={cn(
            "max-[600px]:col-span-6  max-[600px]:col-start-1  max-[600px]:row-start-1  ",
            " min-[600px]:col-span-4  min-[600px]:col-start-3"
          )}
        >
          {trailer ? (
            <iframe
              className="aspect-video w-full h-full "
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p>No trailer available</p>
          )}
        </div>

        {/* Poster  */}
        <div
          className={cn(
            "max-[600px]:col-span-2 max-[600px]:col-start-1 max-[600px]:row-start-2 ",
            "min-[600px]:col-span-2 min-[600px]:col-start-1 min-[600px]:row-start-1"
          )}
        >
          {/* Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="  object-cover"
          />
        </div>

        {/* Overview */}
        <div
          className={cn(
            "text-foreground text-sm",
            "max-[600px]:col-span-4  max-[600px]:col-start-3 max-[600px]:row-start-2",
            "min-[600px]:col-span-6 min-[600px]:row-start-2"
          )}
        >
          <div className="text-lg font-semibold mb-2 flex flex-row gap-4 overflow-x-auto">
            {movie.genres?.map((genre, key) => (
              <span
                key={key}
                className="border border-yellow-200/50 rounded-full px-3 py-1 text-sm text-foreground "
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p className="overflow-y-auto max-h-[5rem] line-clamp-4">
            {movie.overview}
          </p>
        </div>
      </div>

      <hr className="hidden  min-[600px]:flex mt-4 border-t border-gray-300/30" />

      <div class="grid grid-cols-1 lg:grid-cols-6 gap-4 mt-3">
        <div class=" h-40 lg:col-span-4 text-left backdrop-blur-3xl  shadow-md">
          {/* Director */}
          <div className="flex items-center gap-2 ">
            <h2 className="">Director</h2>
            {isCreditsLoading ? (
              <p>Loading...</p>
            ) : (
              <p className="text-blue-500">
                {credits.crew?.find((person) => person.job === "Director")
                  ?.name || "Not found"}
              </p>
            )}
          </div>

          <hr className="border-t border-gray-300/30" />

          {/* Writers */}
          <div className="flex items-center gap-2">
            <h2>Writers</h2>
            {isCreditsLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="flex flex-wrap gap-2 text-blue-500">
                {credits.crew
                  ?.filter(
                    (person) =>
                      person.job === "Writer" || person.job === "Screenplay"
                  )
                  .map((writer) => writer.name)
                  .join(" - ")}
              </div>
            )}
          </div>
          <hr className="border-t border-gray-300/30" />

          {/* Stars */}
          <div className="flex items-center gap-2">
            <h2>Stars</h2>
            {isCreditsLoading ? (
              <p>Loading...</p>
            ) : (
              <span className="text-blue-500">
                {credits.cast
                  ?.slice(0, 3)
                  .map((actor) => actor.name)
                  .join(" - ")}
              </span>
            )}
          </div>

          {/* Watch Options */}
          <div className="flex items-center gap-2">
            <h2>Watch options</h2>
            {providers && providers.length > 0 ? (
              providers.map((provider) => (
                <span key={provider.provider_id} className="text-blue-500">
                  {provider.provider_name}
                </span>
              ))
            ) : (
              <span className="text-gray-500">
                 No Options
              </span>
            )}
          </div>

          <hr className="border-t border-gray-300/30" />
        </div>
        <div class=" h-40 lg:col-span-2">
          <div className="flex flex-col ">
            <Button variant="default">
              <Plus className="mr-2 h-6 w-6" />

              <a
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                <span>Add to Watchlist</span>
              </a>
            </Button>
            <Button variant="outline">
              <Eye className="mr-2 h-6 w-6" />
              <a
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                Mark as watched
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="flex  flex-col  ">
        <div className="flex justify-start">
          <div className="bg-yellow-400 w-1 h-7"></div>
          <h2 className="ml-4">Photos {images.backdrops?.length ?? 0} </h2>
        </div>

        <MovieImages movieId={movie.id} />
      </div>

      {/* Cast Section */}

      <div className="mt-6">
        <div className="flex justify-start">
          <div className="bg-yellow-400 w-1 h-7"></div>
          <h2 className="ml-4 mb-4">Cast</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {credits.cast
            ?.sort((a, b) => b.popularity - a.popularity)
            .slice(0, 18)
            .map((actor, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-4 p-4 bg-white rounded"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                  alt={actor.name}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <div className="text-center">
                  <p className="font-semibold">{actor.name}</p>
                  <p className="text-sm text-gray-600">{actor.character}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Title;
