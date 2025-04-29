import { create } from "zustand";

type FavoritesStore = {
  cities: string[];
};

export const useFavoritesStore = create<FavoritesStore>(() => ({
  cities: [],
}));
