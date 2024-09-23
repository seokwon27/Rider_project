import { weatherInstance } from "../axiosInstance/weatherInstance";

export const getWeather = async (lat, lon, setState) => {
  const response = await weatherInstance.get(
    `/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_KEY}&units=metric&lang=kr`
  );
  const icon = response.data.weather[0].icon;
  setState(`http://openweathermap.org/img/wn/${icon}@2x.png`);
};
