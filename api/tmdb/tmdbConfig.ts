import axios from "axios";

const TMDB_API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzZjZmViNmI5ZTdkZmE3M2FlOTUxOWI5Y2FkMzZkOSIsIm5iZiI6MTc3MDcxODAzMC4zODgsInN1YiI6IjY5OGIwMzRlYWZhYTY2NWRkMzhlZmFmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rZV2ybbkIcskxYzQnAnTu1twyx2vGn_i7I8cN7pDwlw";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const tmdbAxios = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
});
