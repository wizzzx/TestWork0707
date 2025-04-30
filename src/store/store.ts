import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  cities: string[];
  addCity: (city: string) => void;
  removeCity: (city: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      cities: [],
      addCity: (city) => {
        const list = get().cities;
        if (!list.includes(city)) {
          set({ cities: [...list, city] });
        }
      },
      removeCity: (city) =>
        set({ cities: get().cities.filter((c) => c !== city) }),
    }),
    {
      name: "weather-favorites",
    },
  ),
);
