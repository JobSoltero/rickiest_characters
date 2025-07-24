// src/app/page.tsx
'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CharacterCard from '@/components/CharacterCard/CharacterCard';
import CharacterDetail from '@/components/CharacterDetail/CharacterDetail';
import pageStyles from './page.module.css';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchCharactersStart, selectCharacter, setSearchTerm } from '@/redux/features/characters/charactersSlice';
import { fetchFavoritesStart, removeFavoriteStart } from '@/redux/features/favorites/favoritesSlice';
import Loading from './loading';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { characters, loading, error, selectedCharacterId, searchTerm } = useSelector(
    (state: RootState) => state.characters
  );
  // Correctamente extraemos el array de personajes favoritos del slice.
  const { favorites: favoriteCharacters } = useSelector((state: RootState) => state.favorites);

  const [showFavoritesDropdown, setShowFavoritesDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // --- Estado para la paginación ---
  const [currentPage, setCurrentPage] = useState(1);
  const CHARACTERS_PER_PAGE = 4;

  useEffect(() => {
    dispatch(fetchCharactersStart());
    dispatch(fetchFavoritesStart());
  }, [dispatch]);

  // Efecto para cerrar el dropdown si se hace clic fuera de él
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFavoritesDropdown(false);
      }
    }
    // Añadir el listener cuando el dropdown está visible
    if (showFavoritesDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    // Limpiar el listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFavoritesDropdown]);

  // Resetea la página a 1 cuando cambia el término de búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  // Función para alternar la visibilidad del menú desplegable
  const handleToggleFavorites = (event: React.MouseEvent) => {
    event.stopPropagation(); // Evita que el listener del documento lo cierre inmediatamente
    setShowFavoritesDropdown((prev) => !prev);
  };
  
  const handleRemoveFavorite = (event: React.MouseEvent, characterId: string) => {
    event.stopPropagation(); // Evita que se dispare el click del item
    dispatch(removeFavoriteStart(characterId));
  };

  const handleCardClick = (id: number) => {
    dispatch(selectCharacter(id));
    setShowFavoritesDropdown(false); // Cierra el dropdown al seleccionar un personaje
  };

  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes((searchTerm || '').toLowerCase())
  );

  const selectedCharacter = characters.find(c => c.id === selectedCharacterId);

  // --- Lógica para la navegación en el detalle ---
  const currentCharacterIndex = selectedCharacterId
    ? filteredCharacters.findIndex(c => c.id === selectedCharacterId)
    : -1;

  const handlePrevCharacter = () => {
    if (currentCharacterIndex > 0) {
      const prevCharacterId = filteredCharacters[currentCharacterIndex - 1].id;
      dispatch(selectCharacter(prevCharacterId));
    }
  };

  const handleNextCharacter = () => {
    if (currentCharacterIndex > -1 && currentCharacterIndex < filteredCharacters.length - 1) {
      const nextCharacterId = filteredCharacters[currentCharacterIndex + 1].id;
      dispatch(selectCharacter(nextCharacterId));
    }
  };

  // --- Lógica de Paginación ---
  const totalPages = Math.ceil(filteredCharacters.length / CHARACTERS_PER_PAGE);
  const indexOfLastCharacter = currentPage * CHARACTERS_PER_PAGE;
  const indexOfFirstCharacter = indexOfLastCharacter - CHARACTERS_PER_PAGE;
  const currentCharacters = filteredCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <Loading />;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>;
  
  return (
    <div className={pageStyles.container}>
      <aside className={pageStyles.leftPanel}>
        <CharacterDetail 
          character={selectedCharacter} 
          onPrevClick={handlePrevCharacter}
          onNextClick={handleNextCharacter}
          isPrevDisabled={currentCharacterIndex <= 0}
          isNextDisabled={currentCharacterIndex >= filteredCharacters.length - 1 || currentCharacterIndex === -1}
        />
      </aside>

      <section className={pageStyles.rightPanel}>
        <input
          type="text"
          placeholder="🔍 Find your character..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={pageStyles.searchInput}
        />

        <div className={pageStyles.gridAndPaginationContainer}>
          <div className={pageStyles.characterGrid}>
            {/* Se itera sobre los personajes de la página actual */}
            {currentCharacters.length > 0 ? (
              currentCharacters.map((character) => (
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

          {/* --- Controles de Paginación Vertical --- */}
          {totalPages > 1 && (
            <div className={pageStyles.pagination}>
              <button onClick={handlePrevPage} disabled={currentPage === 1} aria-label="Página anterior">
                ▲
              </button>
              <span>{currentPage} / {totalPages}</span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages} aria-label="Página siguiente">
                ▼
              </button>
            </div>
          )}
        </div>

        <div className={pageStyles.bottomButtonContainer} ref={dropdownRef}>
          <button className={pageStyles.bottomButton} onClick={handleToggleFavorites}>
            Ver Favoritos
          </button>

          {/* Menú desplegable de favoritos - Renderizado condicional */}
          {showFavoritesDropdown && (
            <div className={pageStyles.favoritesDropdown}>
              {favoriteCharacters.length > 0 ? (
                favoriteCharacters.map((favCharacter) => (
                  <div
                    key={favCharacter.id}
                    className={pageStyles.dropdownItem}
                    onClick={() => handleCardClick(Number(favCharacter.id))}
                  >
                    <img src={favCharacter.image} alt={favCharacter.name} className={pageStyles.dropdownImage} />
                    <span>{favCharacter.name}</span>
                    <button
                      className={pageStyles.deleteFavoriteButton}
                      onClick={(e) => handleRemoveFavorite(e, String(favCharacter.id))}
                      aria-label={`Quitar de favoritos a ${favCharacter.name}`}
                    >
                      🗑️
                    </button>
                  </div>
                ))
              ) : (
                <p className={pageStyles.dropdownEmpty}>No hay favoritos todavía.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}