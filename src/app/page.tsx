// src/app/page.tsx
'use client';
import React from 'react';
import pageStyles from './page.module.css';

export default function HomePage() {
  return (
    <>
      {/* Columna Izquierda: Detalle del Personaje */}
      <aside className={pageStyles.leftPanel}>
        <h3>Detalle del Personaje</h3>
        {/* ELIMINA O AJUSTA LA ALTURA FIJA DEL PLACEHOLDER DE LA IMAGEN */}
        {/* En lugar de height: '300px', podrías usar un padding-top para mantener la proporción,
           o simplemente dejar que el contenido real dicte la altura.
           Para este placeholder, podemos quitar el height fijo y dejar que el padding del panel lo maneje. */}
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

      {/* Columna Derecha: Búsqueda y Lista de Personajes */}
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
          {/* ELIMINA EL minHeight DE LAS TARJETAS PLACEHOLDER */}
          {[...Array(8)].map((_, index) => (
            <div key={index} style={{
              backgroundColor: '#333',
              borderRadius: '8px',
              padding: '10px',
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              // minHeight: '150px' // <--- ¡ELIMINA ESTA LÍNEA!
            }}>
              <div style={{ width: '100px', height: '100px', backgroundColor: '#555', borderRadius: '5px', marginBottom: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ccc' }}>
                Char {index + 1}
              </div>
              <p style={{ margin: 0, fontSize: '0.9em' }}>Personaje {index + 1}</p>
              <button style={{ background: 'none', border: 'none', color: '#ff69b4', cursor: 'pointer' }}>
                ❤️ Like
              </button>
            </div>
          ))}
        </div>

        {/* Placeholder para la paginación */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
          <button style={{ padding: '8px 12px', backgroundColor: '#555', color: 'white', borderRadius: '5px', border: 'none' }}>Anterior</button>
          <span style={{ alignSelf: 'center' }}>Página 1 de X</span>
          <button style={{ padding: '8px 12px', backgroundColor: '#555', color: 'white', borderRadius: '5px', border: 'none' }}>Siguiente</button>
        </div>
      </section>
    </>
  );
}