import { CityType, ForecastType } from "@/types/weather.types";

export type GetForecastDto = {
  city: CityType;
  cnt: number;
  list: ForecastType[];
};
