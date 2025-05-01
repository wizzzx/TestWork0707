import { WEATHER_APP_ID } from "@/constants";
import { WeatherType } from "@/types/weather.types";
import axios from "axios";
import { GetForecastDto } from "@/api/types";

export const weatherAxiosInstance = axios.create({
  baseURL: "https://api.openweathermap.org",
});

export const weatherApi = {
  getWeatherByCity: (name: string) => {
    return weatherAxiosInstance.get<WeatherType>("/data/2.5/weather", {
      params: {
        q: name,
        units: "metric",
        lang: "en",
        appid: WEATHER_APP_ID,
      },
    });
  },

  getForecast: (name: string) => {
    return weatherAxiosInstance.get<GetForecastDto>("/data/2.5/forecast", {
      params: {
        q: name,
        units: "metric",
        lang: "en",
        appid: WEATHER_APP_ID,
      },
    });
  },
};
