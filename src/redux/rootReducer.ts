import { combineReducers } from '@reduxjs/toolkit';
import charactersReducer from './features/characters/charactersSlice';

const rootReducer = combineReducers({
  characters: charactersReducer,
});

export default rootReducer;
