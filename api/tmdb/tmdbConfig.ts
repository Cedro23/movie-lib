import axios from "axios";
import Config from "react-native-config";

export const tmdbAxios = axios.create({
  baseURL: Config.TMDB_API_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${Config.TMDB_API_READ_KEY}`,
  },
});
