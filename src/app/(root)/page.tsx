"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useFavoritesStore } from "@/store/store";

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const addCity = useFavoritesStore((state) => state.addCity);

  const fetchCurrentWeather = async (cityName: string) => {
    const { data } = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: cityName,
          units: "metric",
          lang: "en",
          appid: "a9968cffa2bf58395661bbb501750994",
        },
      },
    );
    setWeatherData(data);
  };

  return (
    <div className="container py-4">
      <form
        className="row g-2 align-items-center justify-content-center mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          fetchCurrentWeather(city);
        }}
      >
        <div className="col-12 col-md-8">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search your location..."
            className="form-control"
          />
        </div>
        <div className="col-12 col-md-4">
          <button type="submit" className="btn btn-primary w-100">
            Search
          </button>
        </div>
      </form>

      {weatherData && (
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <div className="card text-center">
              <div className="card-body">
                <h2 className="card-title">{weatherData.name}</h2>
                <div className="mb-3">
                  <Image
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt={weatherData.weather[0].description}
                    width={100}
                    height={100}
                  />
                </div>
                <p className="h4">Temperature: {weatherData.main.temp}°C</p>
                <p className="mb-1">Wind: {weatherData.wind.speed} m/s</p>
                <p className="mb-1">Humidity: {weatherData.main.humidity}%</p>
                <p>Feels like: {weatherData.main.feels_like}°C</p>
                <button
                  type="button"
                  className="btn btn-outline-warning mt-3"
                  onClick={() => addCity(weatherData.name)}
                >
                  Add to favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
