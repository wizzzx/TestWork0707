"use client";

import React, { useEffect, useState } from "react";
import { useFavoritesStore } from "@/store/store";
import axios from "axios";
import Image from "next/image";

interface Weather {
  name: string;
  temp: number;
  icon: string;
}

export default function Favorites() {
  const cities = useFavoritesStore((s) => s.cities);
  const removeCity = useFavoritesStore((s) => s.removeCity);
  const [weather, setWeather] = useState<Record<string, Weather>>({});

  useEffect(() => {
    cities.forEach(async (city) => {
      if (!weather[city]) {
        const { data } = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              q: city,
              units: "metric",
              appid: "a9968cffa2bf58395661bbb501750994",
            },
          },
        );
        setWeather((prev) => ({
          ...prev,
          [city]: {
            name: data.name,
            temp: Math.round(data.main.temp),
            icon: data.weather[0].icon,
          },
        }));
      }
    });
  }, [cities]);

  return (
    <div className="container py-4">
      {cities.length === 0 ? (
        <p>You have no favorite cities.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {cities.map((city) => {
            const w = weather[city];
            return (
              <div key={city} className="col">
                <div className="card d-flex flex-row align-items-center p-2">
                  {w ? (
                    <>
                      <Image
                        src={`https://openweathermap.org/img/wn/${w.icon}.png`}
                        alt={w.name}
                        width={50}
                        height={50}
                      />
                      <div className="ms-3">
                        <h5 className="mb-1">{w.name}</h5>
                        <p className="mb-0">{w.temp}°C</p>
                      </div>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                  <button
                    className="btn btn-outline-danger btn-sm ms-auto"
                    onClick={() => removeCity(city)}
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
