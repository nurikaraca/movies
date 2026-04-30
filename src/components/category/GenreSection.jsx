import GenreMovies from "./GenreMovies";
import { useGenres } from "../../hooks/useGenres";

const GenreSection = () => {
  const { data: genres = [], isLoading, isError } = useGenres();

  if (isLoading) {
    return (
      <section id="genre" className="px-4 py-6">
        Loading genres...
      </section>
    );
  }

  if (isError) {
    return (
      <section id="genre" className="px-4 py-6">
        Error loading genres.
      </section>
    );
  }

  return (
    <section id="genre">
      <div className="space-y-12 px-4 py-6">
        {genres.map((genre) => (
          <div key={genre.id}>
            <div className="flex justify-start">
              <div className="bg-yellow-400 w-1 h-7"></div>
              <h2 className="ml-4 mb-4">{genre.name}</h2>
            </div>

            <GenreMovies genreId={genre.id} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GenreSection;
