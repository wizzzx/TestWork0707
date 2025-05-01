"use client";

import React, { useEffect, useState, useMemo } from "react";
import axios, { AxiosError, HttpStatusCode } from "axios";
import Image from "next/image";
import { weatherApi } from "@/api";
import { ForecastType } from "@/types/weather.types";
import { groupForecastByDay } from "@/helpers/groupForecastByDate";
import { useDebounce } from "@/shared/hooks/useDebounce";
import styles from "./page.module.scss";

const isAxiosError = (e: unknown): e is InstanceType<typeof AxiosError> => {
  return axios.isAxiosError(e);
};

export default function DetailedWeatherForecast() {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 1000);
  const [city, setCity] = useState<string | null>(null);
  const [forecast, setForecast] = useState<ForecastType[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherForecast = async (cityName: string) => {
    setIsPending(true);
    setError(null);
    setForecast([]);
    try {
      const { data } = await weatherApi.getForecast(cityName);
      setCity(data.city.name);
      setForecast(data.list);
    } catch (e) {
      if (isAxiosError(e) && e.status === HttpStatusCode.NotFound) {
        setError("City not found");
      } else {
        setError("Something went wrong. Please try again.");
      }
      setCity(null);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (debouncedValue) fetchWeatherForecast(debouncedValue);
  }, [debouncedValue]);

  const grouped = useMemo(() => groupForecastByDay(forecast), [forecast]);

  return (
    <div className="container py-4">
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-8">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search city for forecast..."
            className={`form-control form-control-lg shadow ${styles.searchInput}`}
          />
        </div>
      </div>
      {isPending && (
        <div className="row justify-content-center">
          <div className="col-auto d-flex align-items-center">
            <div className="spinner-border text-info me-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span className="text-info">Loading forecast...</span>
          </div>
        </div>
      )}
      {error && (
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          </div>
        </div>
      )}
      {city && !error && (
        <div className="row justify-content-center mb-3">
          <h2 className={`text-center ${styles.cityTitle}`}>
            Forecast for {city}
          </h2>
        </div>
      )}
      {grouped.map(({ date, weekday, forecastList }) => (
        <section key={date} className="mb-5">
          <h4
            className={`text-capitalize mb-3 border-bottom pb-2 ${styles.weekday}`}
          >
            {weekday}
          </h4>
          <div className="row row-cols-2 row-cols-sm-4 g-4">
            {forecastList.map((f) => {
              const time = f.dt_txt.split(" ")[1].slice(0, 5);
              return (
                <div key={f.dt} className="col">
                  <div
                    className={`card text-center h-100 shadow-sm ${styles.card}`}
                  >
                    <div className="card-body p-3">
                      <small className="d-block mb-2 text-muted">{time}</small>
                      <Image
                        src={`https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`}
                        alt={f.weather[0].description}
                        width={60}
                        height={60}
                      />
                      <p className="h5 my-2">{Math.round(f.main.temp)}°C</p>
                      <p className="small text-secondary">
                        {f.weather[0].description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
