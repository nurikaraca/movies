import { useQuery } from "@tanstack/react-query"
import { searchMovies } from "../api/movieService"


export const useSearchMovies = (query) => {
    return useQuery({
        queryKey: ["searchMovies", query],
        queryFn: () => searchMovies(query),
        enabled: !!query,
        staleTime: 1000 * 60 * 60 * 24 * 30,// 30 days

    })
}