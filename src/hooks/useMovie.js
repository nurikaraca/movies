import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "../api/movieService";


export const useMovie = (id) => {
    return useQuery({
        queryKey: ["movie", id],
        queryFn: ()=> getMovieById(id),
        enabled: !!id,
    })
}