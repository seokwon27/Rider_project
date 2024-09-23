import axios from "axios";

const feedInstance = axios.create({
  baseURL: import.meta.env.VITE_FEED_URL
});

export default feedInstance;
