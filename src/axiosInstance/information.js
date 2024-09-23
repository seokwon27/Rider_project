import axios from "axios";

const informationInstance = axios.create({
  baseURL: import.meta.env.VITE_PATH_INFORMATION_URL
});

export default informationInstance;
