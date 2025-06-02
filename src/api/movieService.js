import axiosClient from "./axiosClient";

export const getPopularMovies = async() => {
    try {
        const response = await axiosClient.get("/movie/popular?language=en-US&page=1");
        return response.data.results;
       
        
    } catch (error) {
        console.error("Error fetching popular movies:", error);
        throw error;
        
    }
}


export const searchMovies = async (query) => {
    try {
        const response = await axiosClient.get(`search/movie?query=${query}&language=en-US&page=1&include_adult=false`);
        return response.data.results;
    } catch (error) {
        console.error("Error searching movies:", error);
        throw error;
    }
}

export const getMovieCredits = async (movieId) => {
  try {
    const response = await axiosClient.get(`/movie/${movieId}/credits?language=en-US`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    return [];
  }
};


export const getMovieById = async(movieId) => {
  const response = await axiosClient.get(`/movie/${movieId}?language=en-US`);
  return response.data;
};




export const getMovieVideos = async (movieId) => {
  try {
    const response = await axiosClient.get(`/movie/${movieId}/videos?language=en-US`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    throw error;
  }
};




export const getMovieImages= async(movieId) => {
  try {
    const response = await axiosClient.get(`/movie/${movieId}/images`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie images:", error);
    throw error;
  }
}



export const getGenres = async () => {
  try {
    const response = await axiosClient.get('/genre/movie/list?language=en-US');
    return response.data.genres; 
    
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};


export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await axiosClient.get(`/discover/movie?with_genres=${genreId}&language=en-US&page=${page}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error;
  }
};


export const getWatchProviders = async (movieId) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
  );
  const data = await res.json();
  return data.results?.US?.flatrate || []; 
};
