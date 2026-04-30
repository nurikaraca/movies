import { useQuery } from "@tanstack/react-query";
import { getWatchProviders } from "../api/movieService";

export const useWatchProviders = (movieId) => {
  return useQuery({
    queryKey: ["watchProviders", movieId],
    queryFn: () => getWatchProviders(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
