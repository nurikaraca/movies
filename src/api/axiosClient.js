

import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_TMDB_BEARER_TOKEN,
  },
});

export default axiosClient;


