import React from 'react';
import styles from './CharacterDetail.module.css';

interface CharacterDetailProps {
  imageUrl?: string;
  name?: string;
  status?: 'Alive' | 'Dead' | 'unknown';
  species?: string;
  origin?: string;
  location?: string;
  gender?: string;
  episodes?: number;
}

export default function CharacterDetail({
  imageUrl = '/hero-fallback.jpg',
  name = 'Nombre Desconocido',
  status = 'unknown',
  species = 'Desconocido',
  origin = 'Desconocido',
  location = 'Desconocido',
  gender = 'Desconocido',
  episodes = 0,
}: CharacterDetailProps) {
  const isAlive = status === 'Alive';
  const indicatorText = isAlive ? 'LIVE' : 'DEAD';
  const indicatorDotClass = isAlive ? styles.aliveDot : styles.deadDot;

  return (
    <div
      className={styles.card}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className={styles.liveIndicator}>
        <span className={`${styles.liveDot} ${indicatorDotClass}`}></span>
        {indicatorText}
      </div>

      <div className={styles.contentOverlay}>
        {/* Nueva sección para nombre y descripción corta */}
        <div className={styles.nameSection}>
          <p className={styles.characterName}>{name}</p>
          <p className={styles.characterSpeciesOrigin}>
            {species}
            {origin && origin !== 'unknown' ? `, ${origin}` : ''} {/* Agrega origen si existe */}
          </p>
        </div>

        {/* Sección de la cuadrícula de información */}
        <div className={styles.infoGrid}>
          <p>
            <span className={styles.infoLabel}>Estado</span>
            {status}
          </p>
          <p>
            <span className={styles.infoLabel}>Ubicación</span>
            {location}
          </p>
          <p>
            <span className={styles.infoLabel}>Género</span>
            {gender}
          </p>
          <p>
            <span className={styles.infoLabel}>Episodios</span>
            {episodes}
          </p>
        </div>
      </div>
    </div>
  );
}