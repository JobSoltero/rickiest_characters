import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '@/types';

interface CharactersState {
  characters: Character[];
  loading: boolean;
  selectedCharacterId: number | null;
  error: string | null;
  searchTerm: string;
}

const initialState: CharactersState = {
  characters: [],
  loading: false,
  selectedCharacterId: null,
  error: null,
  searchTerm: '',
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    fetchCharactersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCharactersSuccess(state, action: PayloadAction<Character[]>) {
      state.characters = action.payload;
      state.loading = false;
    },
    fetchCharactersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    selectCharacter(state, action: PayloadAction<number | null>) {
      state.selectedCharacterId = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  },
});

export const { fetchCharactersStart, fetchCharactersSuccess, fetchCharactersFailure, selectCharacter, setSearchTerm } = charactersSlice.actions;
export default charactersSlice.reducer;
