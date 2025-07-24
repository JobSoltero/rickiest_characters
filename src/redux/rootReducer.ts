import { combineReducers } from '@reduxjs/toolkit';
import charactersReducer from './features/characters/charactersSlice';
import favoritesReducer from './features/favorites/favoritesSlice';

const rootReducer = combineReducers({
  characters: charactersReducer,
  favorites: favoritesReducer,
});

export default rootReducer;
