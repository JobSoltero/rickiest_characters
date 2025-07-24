import charactersReducer, {
    fetchCharactersStart,
    fetchCharactersSuccess,
    fetchCharactersFailure,
    selectCharacter,
    setSearchTerm,
  } from '../charactersSlice';
  import { mockCharacters, mockCharacter1, mockCharacter2 } from '@/__mocks__/characterMocks';
  
  const initialState = {
    characters: [],
    loading: false,
    selectedCharacterId: null,
    error: null,
    searchTerm: '',
  };
  
  describe('characters slice', () => {
    it('debería devolver el estado inicial', () => {
      expect(charactersReducer(undefined, { type: '' })).toEqual(initialState);
    });
  
    it('debería manejar fetchCharactersStart', () => {
      const action = { type: fetchCharactersStart.type };
      const state = charactersReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });
  
    it('debería manejar fetchCharactersSuccess', () => {
      const action = { type: fetchCharactersSuccess.type, payload: mockCharacters };
      const state = charactersReducer({ ...initialState, loading: true }, action);
      expect(state.loading).toBe(false);
      expect(state.characters).toEqual(mockCharacters);
      // Verifica que el primer personaje se selecciona por defecto
      expect(state.selectedCharacterId).toBe(mockCharacters[0].id);
    });

    it('debería manejar fetchCharactersSuccess con una lista vacía', () => {
        const action = { type: fetchCharactersSuccess.type, payload: [] };
        const state = charactersReducer({ ...initialState, loading: true }, action);
        expect(state.loading).toBe(false);
        expect(state.characters).toEqual([]);
        expect(state.selectedCharacterId).toBeNull();
      });
  
    it('debería manejar fetchCharactersFailure', () => {
      const error = 'Error al cargar personajes';
      const action = { type: fetchCharactersFailure.type, payload: error };
      const state = charactersReducer({ ...initialState, loading: true }, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(error);
    });
  
    it('debería manejar selectCharacter', () => {
      const characterId = mockCharacter2.id;
      const action = { type: selectCharacter.type, payload: characterId };
      const stateWithChars = { ...initialState, characters: mockCharacters };
      const state = charactersReducer(stateWithChars, action);
      expect(state.selectedCharacterId).toBe(characterId);
    });

    it('debería manejar selectCharacter con null', () => {
        const action = { type: selectCharacter.type, payload: null };
        const stateWithSelection = { ...initialState, characters: mockCharacters, selectedCharacterId: mockCharacter1.id };
        const state = charactersReducer(stateWithSelection, action);
        expect(state.selectedCharacterId).toBeNull();
      });
  
    it('debería manejar setSearchTerm', () => {
      const searchTerm = 'Morty';
      const action = { type: setSearchTerm.type, payload: searchTerm };
      const state = charactersReducer(initialState, action);
      expect(state.searchTerm).toBe(searchTerm);
    });
  });