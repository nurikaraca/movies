import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../api/movieService";


export const useMovieCredits = (movieId) => {
  return useQuery({
    queryKey: ["movieCredits", movieId],
    queryFn: () => getMovieCredits(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 5,
  });
};