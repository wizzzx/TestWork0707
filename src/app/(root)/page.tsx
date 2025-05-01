"use client";

import React, { useEffect, useState } from "react";
import axios, { AxiosError, HttpStatusCode } from "axios";
import Image from "next/image";
import { useFavoritesStore } from "@/store/store";
import { weatherApi } from "@/api";
import { WeatherType } from "@/types/weather.types";
import { useDebounce } from "@/shared/hooks/useDebounce";
import styles from "./page.module.scss";

const isAxiosError = (e: unknown): e is InstanceType<typeof AxiosError> => {
  return axios.isAxiosError(e);
};

export default function Home() {
  const [city, setCity] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [addedToFavorites, setAddedToFavorites] = useState(false);
  const addCity = useFavoritesStore((state) => state.addCity);
  const searchValueDebounced = useDebounce(city, 1000);

  const handleSearchWeather = async () => {
    setWeatherData(null);

    try {
      const { data } = await weatherApi.getWeatherByCity(city);

      setError(null);
      setWeatherData(data);
    } catch (e) {
      if (isAxiosError(e)) {
        if (e.status == HttpStatusCode.NotFound) {
          setError("City not found");
        }
      }
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    handleSearchWeather();
  }, [searchValueDebounced]);

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPending(true);
    setError(null);
    setCity(e.target.value);
  };

  const handleClickFavorite = () => {
    addCity(weatherData ? weatherData.name : "");
    setAddedToFavorites(true);
    setTimeout(() => setAddedToFavorites(false), 2000);
  };

  return (
    <div className="container py-4">
      <form className="row g-2 align-items-center justify-content-center mb-4">
        <div className="col-12 col-md-8">
          <input
            value={city}
            onChange={onSearchInputChange}
            placeholder="Search your location..."
            className="form-control"
          />
        </div>
      </form>

      {isPending && (
        <div className="row justify-content-center mt-4">
          <div className="col-auto">
            <div className="d-flex align-items-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <span className="ms-2">Loading...</span>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="alert alert-danger text-center" role={"alert"}>
          {error}
        </div>
      )}

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
                  className={`btn mt-3 position-relative ${addedToFavorites ? "btn-warning" : "btn-outline-warning"}`}
                  onClick={handleClickFavorite}
                >
                  {addedToFavorites ? (
                    <i className={"fas fa-heart"}></i>
                  ) : (
                    <i className={"far fa-heart"}></i>
                  )}
                  <span
                    className={addedToFavorites ? styles.pulse_overlay : ""}
                  ></span>
                  {addedToFavorites ? "Added" : "Add to favorites"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
