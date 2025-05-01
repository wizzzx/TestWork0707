import { ForecastType } from "@/types/weather.types";

export const groupForecastByDay = (list: ForecastType[]) => {
  const groupedForecastObject = list.reduce<Record<string, ForecastType[]>>(
    (acc, item) => {
      const [date] = item.dt_txt.split(" ");

      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    },
    {},
  );

  return Object.entries(groupedForecastObject).map(([date, forecastList]) => {
    const weekday = new Date(date).toLocaleDateString("en-EN", {
      weekday: "long",
    });

    return {
      date,
      forecastList,
      weekday,
    };
  });
};
