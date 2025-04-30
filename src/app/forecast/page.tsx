"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";

type ForecastItem = {
  dt: number;
  dt_txt: string;
  main: { temp: number };
  weather: { icon: string; description: string }[];
};

export default function DetailedWeatherForecast() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState<ForecastItem[]>([]);

  const fetchWeatherForecast = async (cityName: string) => {
    const { data } = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          q: cityName,
          units: "metric",
          lang: "en",
          appid: "a9968cffa2bf58395661bbb501750994",
        },
      },
    );
    setForecast(data.list);
  };

  const groupByDay = (list: ForecastItem[]) =>
    list.reduce<Record<string, ForecastItem[]>>((acc, item) => {
      const [date] = item.dt_txt.split(" ");
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {});

  const grouped = groupByDay(forecast);

  return (
    <div className="container py-4">
      <form
        className="row g-2 align-items-center justify-content-center mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          fetchWeatherForecast(city);
        }}
      >
        <div className="col-12 col-md-8">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="form-control"
          />
        </div>
        <div className="col-12 col-md-4">
          <button type="submit" className="btn btn-primary w-100">
            Search
          </button>
        </div>
      </form>

      {Object.entries(grouped).map(([date, items]) => {
        const weekday = new Date(date).toLocaleDateString("en-EN", {
          weekday: "long",
        });
        return (
          <section key={date} className="mb-5">
            <h4 className="text-capitalize mb-3">{weekday}</h4>
            <div className="row row-cols-2 row-cols-sm-4 g-3">
              {items.map((item) => {
                const time = item.dt_txt.split(" ")[1].slice(0, 5);
                return (
                  <div key={item.dt} className="col">
                    <div className="card text-center">
                      <div className="card-body p-2">
                        <small className="d-block mb-1">{time}</small>
                        <Image
                          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                          alt={item.weather[0].description}
                          width={50}
                          height={50}
                        />
                        <p className="mb-0">{Math.round(item.main.temp)}°C</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
