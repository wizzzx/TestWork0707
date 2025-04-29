"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import cn from "classnames";
import axios from "axios";
import { SmartForm } from "@/helpers/hocs/SmartForm";
import { useForm } from "react-hook-form";
import Image from "next/image";

export default function Home() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const city = "London";

  useEffect(() => {
    async function fetchCurrentWeather() {
      try {
        const { data } = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              q: city,
              units: "metric",
              lang: "en",
              appid: "a9968cffa2bf58395661bbb501750994",
            },
          },
        );
        setWeatherData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCurrentWeather();
  }, [city]);

  if (!weatherData) return <p>Loading...</p>;

  return (
    <>
      <h3 className={"card-title"}>{weatherData.name}</h3>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt={weatherData.weather[0].description}
      />
      <p>Temperature: {weatherData.main.temp} градусов Цельсия</p>
    </>
  );
}
