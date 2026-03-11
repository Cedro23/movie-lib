import axios from "axios";

const TMDB_API_KEY = "";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const tmdbAxios = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
});
