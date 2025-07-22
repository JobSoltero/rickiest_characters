// src/app/page.tsx
'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CharacterCard from '@/components/CharacterCard/CharacterCard';
import CharacterDetail from '@/components/CharacterDetail/CharacterDetail';
import pageStyles from './page.module.css';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchCharactersStart, selectCharacter, setSearchTerm } from '@/redux/features/characters/charactersSlice';
import { fetchFavoritesStart } from '@/redux/features/favorites/favoritesSlice';
import Loading from './loading';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { characters, loading, error, selectedCharacterId, searchTerm } = useSelector(
    (state: RootState) => state.characters
  );

  useEffect(() => {
    dispatch(fetchCharactersStart());
    dispatch(fetchFavoritesStart());
  }, [dispatch]);

  const handleCardClick = (id: number) => {
    dispatch(selectCharacter(id));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const selectedCharacter = characters.find(c => c.id === selectedCharacterId);

  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes((searchTerm || '').toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>;
  
  return (
    <>
      <aside className={pageStyles.leftPanel}>
        <CharacterDetail character={selectedCharacter} />
      </aside>

      <section className={pageStyles.rightPanel}>
        <div className={pageStyles.searchAndFavs}>
          <input
            type="text"
            placeholder="🔍 Find your character..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #555', flexGrow: 1, backgroundColor: '#333', color: '#eee' }}
          />
          <button style={{ padding: '10px 15px', borderRadius: '5px', border: 'none', backgroundColor: 'var(--primary-green)', color: 'white', cursor: 'pointer' }}>
            FAVS
          </button>
        </div>

        <div className={pageStyles.characterGrid}>
          {filteredCharacters.length > 0 ? (
            filteredCharacters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onCardClick={handleCardClick}
                isSelected={character.id === selectedCharacterId}
              />
            ))
          ) : (
            <p style={{ color: '#ccc', textAlign: 'center', gridColumn: '1 / -1' }}>No se encontraron personajes con ese nombre.</p>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
          <button style={{ padding: '8px 12px', backgroundColor: '#555', color: 'white', borderRadius: '5px', border: 'none' }}>Favs</button>
          
        </div>
      </section>
    </>
  );
}