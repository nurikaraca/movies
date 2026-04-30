import { useQuery } from "@tanstack/react-query";
import { getMoviesByGenre } from "../api/movieService";

export const useGenreMovies = (genreId) => {
  return useQuery({
    queryKey: ["genreMovies", genreId],
    queryFn: () => getMoviesByGenre(genreId),
    enabled: !!genreId,
    staleTime: 1000 * 60 * 60,
  });
};
