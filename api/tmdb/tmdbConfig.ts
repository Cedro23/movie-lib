import axios from "axios";

export const tmdbAxios = axios.create({
  baseURL: process.env.EXPO_PUBLIC_TMDB_API_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_READ_KEY}`,
  },
});
