import axios from "axios";

export const weatherInstance = axios.create({
  baseURL: import.meta.env.VITE_WEATHER_URL
});
