import React from 'react';
import styles from './CharacterCard.module.css';

// Por ahora, solo usamos el índice, pero esto se puede expandir
// para recibir el objeto completo del personaje.
interface CharacterCardProps {
  index: number;
}

export default function CharacterCard({ index }: CharacterCardProps) {
  return (
    <div className={styles.card}>
      <p className={styles.characterName}>Personaje {index + 1}</p>
      <div className={styles.imagePlaceholder}>
        Char {index + 1}
      </div>
      <button className={styles.likeButton}>
        ❤️ Like
      </button>
    </div>
  );
}