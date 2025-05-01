"use client";

import React, { useEffect, useState } from "react";
import { useFavoritesStore } from "@/store/store";
import Image from "next/image";
import { weatherApi } from "@/api";
import { WeatherType } from "@/types/weather.types";

export default function Favorites() {
  const { cities, removeCity } = useFavoritesStore();
  const [weatherList, setWeatherList] = useState<WeatherType[]>([]);

  const handleGetWeather = async () => {
    const response = await Promise.all(
      cities.map((city) => weatherApi.getWeatherByCity(city)),
    );
    setWeatherList(response.map((res) => res.data));
  };

  useEffect(() => {
    if (cities.length) {
      handleGetWeather();
    }
  }, [cities]);

  return (
    <div className="container py-4">
      {cities.length === 0 ? (
        <p>You have no favorite cities.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {weatherList.map((weather) => {
            return (
              <div key={weather.name} className="col">
                <div className="card d-flex flex-row align-items-center p-2">
                  <Image
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    alt={weather.name}
                    width={50}
                    height={50}
                  />
                  <div className="ms-3">
                    <h5 className="mb-1">{weather.name}</h5>
                    <p className="mb-0">{weather.main.temp}°C</p>
                  </div>

                  <button
                    className="btn btn-outline-danger btn-sm ms-auto"
                    onClick={() => removeCity(weather.name)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
