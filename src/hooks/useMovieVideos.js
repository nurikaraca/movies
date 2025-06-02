import { useQuery } from "@tanstack/react-query";
import { getMovieVideos } from "../api/movieService";

export const useMovieVideos= (movieId) => {
    return useQuery({
        queryKey: ["movieVideos",movieId],
        queryFn: ()=> getMovieVideos(movieId),
        enabled: !!movieId,
    })
}