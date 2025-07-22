'use client';

import React from 'react';
import styles from './CharacterCard.module.css';
import { Character } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { addFavoriteStart, removeFavoriteStart } from '@/redux/features/favorites/favoritesSlice';

interface CharacterCardProps {
  character: Character;
  isSelected?: boolean;
  onCardClick?: (id: number) => void;
}

export default function CharacterCard({
  character,
  isSelected = false,
  onCardClick,
}: CharacterCardProps) {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) =>
    state.favorites.favoriteIds.includes(String(character.id))
  );

  const finalImageUrl = character.image || '/hero-fallback.jpg';

  const handleCardClick = () => {
    onCardClick?.(character.id);
  };

  const handleLikeClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavoriteStart(String(character.id)));
    } else {
      dispatch(addFavoriteStart(character));
    }
  };

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selectedCard : ''}`}
      onClick={handleCardClick}
      aria-label={`Ver detalles de ${character.name || 'Personaje'}`}
    >
            <p className={styles.characterName}>{character.name || 'Desconocido'}</p>

      <div className={styles.imageContainer}>
        <img
          src={finalImageUrl}
          alt={character.name || 'Personaje Desconocido'}
          className={styles.characterImage}
        />
      </div>

      <button
        className={styles.likeButton}
        onClick={handleLikeClick}
        aria-label={isFavorite ? `Quitar de favoritos a ${character.name}` : `Añadir a favoritos a ${character.name}`}
      >
        <span className={styles.heartIcon} style={{ color: isFavorite ? 'var(--primary-green)' : 'white' }}>
          ❤
        </span>{' '}
        Favorito
      </button>
    </div>
  );
}