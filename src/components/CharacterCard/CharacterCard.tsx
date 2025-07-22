'use client';

import React from 'react';
import { useState } from 'react';
import styles from './CharacterCard.module.css';
import { Character } from '@/types';

interface CharacterCardProps {
  character: Character;
  isLiked?: boolean;
  isSelected?: boolean;
  onCardClick?: (id: number) => void;
  onLikeClick?: (id: number, isLiked: boolean) => void;
}

export default function CharacterCard({
  character,
  isLiked = false,
  isSelected = false,
  onCardClick,
  onLikeClick,
}: CharacterCardProps) {
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const finalImageUrl = character.image || '/hero-fallback.jpg';

  const handleCardClick = () => {
    onCardClick?.(character.id);
  };

  const handleLikeClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const newLikedState = !localIsLiked;
    setLocalIsLiked(newLikedState);
    onLikeClick?.(character.id, newLikedState);
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
        aria-label={localIsLiked ? `Quitar "me gusta" a ${character.name}` : `Dar "me gusta" a ${character.name}`}
      >
        <span className={styles.heartIcon} style={{ color: localIsLiked ? 'red' : 'white' }}>
          ❤
        </span>{' '}
        Like
      </button>
    </div>
  );
}