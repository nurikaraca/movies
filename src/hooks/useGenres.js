import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../api/movieService";

export const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });
};
