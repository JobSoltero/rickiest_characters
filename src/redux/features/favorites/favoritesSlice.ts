import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '@/types';

interface FavoritesState {
  favorites: Character[];
  favoriteIds: string[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  favoriteIds: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // Fetching favorites
    fetchFavoritesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFavoritesSuccess(state, action: PayloadAction<Character[]>) {
      state.loading = false;
      state.favorites = action.payload;
      // Estandarizamos todos los IDs a string para consistencia.
      state.favoriteIds = action.payload.map((fav) => String(fav.id));
    },
    fetchFavoritesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // Adding a favorite
    addFavoriteStart(state, _action: PayloadAction<Character>) {
      state.loading = true;
    },
    addFavoriteSuccess(state, action: PayloadAction<Character>) {
      state.loading = false;
      state.favorites = [...state.favorites, action.payload];
      const newId = String(action.payload.id);
      if (!state.favoriteIds.includes(newId)) {
        state.favoriteIds = [...state.favoriteIds, newId];
      }
    },
    addFavoriteFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // Removing a favorite
    removeFavoriteStart(state, _action: PayloadAction<number | string>) {
      state.loading = true;
    },
    removeFavoriteSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.favorites = state.favorites.filter((fav) => String(fav.id) !== action.payload);
      state.favoriteIds = state.favoriteIds.filter((id) => id !== action.payload);
    },
    removeFavoriteFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchFavoritesStart,
  fetchFavoritesSuccess,
  fetchFavoritesFailure,
  addFavoriteStart,
  addFavoriteSuccess,
  addFavoriteFailure,
  removeFavoriteStart,
  removeFavoriteSuccess,
  removeFavoriteFailure,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;