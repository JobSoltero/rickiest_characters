// src/app/page.tsx
'use client';
import React from 'react';
import CharacterCard from '@/components/CharacterCard/CharacterCard';
import pageStyles from './page.module.css';

export default function HomePage() {
  return (
    <>
      <aside className={pageStyles.leftPanel}>
        <h3>Detalle del Personaje</h3>
        
        <div style={{ width: '100%', backgroundColor: '#333', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ccc', borderRadius: '8px', padding: '100px 0' /* Puedes usar padding para darle altura sin forzarla */ }}>
          Imagen Grande de Personaje
        </div>
        <p>Nombre del Personaje</p>
        <p>Estado: Alive</p>
        <p>Especie: Human</p>
        <p>Origen: Earth</p>
        <p>Ubicación: Citadel of Ricks</p>
        <p>Género: Male</p>
        <p>Episodios: 132</p>
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
          {[...Array(8)].map((_, index) => <CharacterCard key={index} index={index} />)}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
          <button style={{ padding: '8px 12px', backgroundColor: '#555', color: 'white', borderRadius: '5px', border: 'none' }}>Anterior</button>
          <span style={{ alignSelf: 'center' }}>Página 1 de X</span>
          <button style={{ padding: '8px 12px', backgroundColor: '#555', color: 'white', borderRadius: '5px', border: 'none' }}>Siguiente</button>
        </div>
      </section>
    </>
  );
}