import { useQuery } from "@tanstack/react-query";
import { getMovieImages } from "../api/movieService";

export const useMovieImages = (movieId) => {
  return useQuery({
    queryKey: ["movieImages", movieId],
    queryFn: () => getMovieImages(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
