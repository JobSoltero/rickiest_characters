// src/app/page.tsx
'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CharacterCard from '@/components/CharacterCard/CharacterCard';
import CharacterDetail from '@/components/CharacterDetail/CharacterDetail';
import pageStyles from './page.module.css';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchCharactersStart } from '@/redux/features/characters/charactersSlice';
import Loading from './loading';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { characters, loading, error } = useSelector((state: RootState) => state.characters);

  useEffect(() => {
    dispatch(fetchCharactersStart());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>;
  
  return (
    <>
      <aside className={pageStyles.leftPanel}>
        <CharacterDetail />
      </aside>

      <section className={pageStyles.rightPanel}>
        <div className={pageStyles.searchAndFavs}>
          <input
            type="text"
            placeholder="🔍 Find your character..."
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #555', flexGrow: 1, backgroundColor: '#333', color: '#eee' }}
          />
          <button style={{ padding: '10px 15px', borderRadius: '5px', border: 'none', backgroundColor: 'var(--primary-green)', color: 'white', cursor: 'pointer' }}>
            FAVS
          </button>
        </div>

        <div className={pageStyles.characterGrid}>
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
          <button style={{ padding: '8px 12px', backgroundColor: '#555', color: 'white', borderRadius: '5px', border: 'none' }}>Favs</button>
          
        </div>
      </section>
    </>
  );
}