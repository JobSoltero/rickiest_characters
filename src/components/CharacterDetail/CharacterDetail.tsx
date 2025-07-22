import React from 'react';
import styles from './CharacterDetail.module.css';
import { Character } from '@/types';

interface CharacterDetailProps {
  character?: Character | null;
}

export default function CharacterDetail({ character }: CharacterDetailProps) {
  if (!character) {
    return (
      <div className={styles.card} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center', backgroundColor: '#2b2b2b' }}>
        <p style={{ fontSize: '1.2rem', color: '#ccc' }}>Selecciona un personaje para ver sus detalles.</p>
      </div>
    );
  }

  const {
    image: imageUrl = '/hero-fallback.jpg',
    name = 'Nombre Desconocido',
    status = 'unknown',
    species = 'Desconocido',
    origin,
    location,
    gender = 'Desconocido',
    episode = [],
  } = character;

  const episodes = episode.length;
  const originName = origin?.name ?? 'Desconocido';
  const locationName = location?.name ?? 'Desconocido';

  const isAlive = status === 'Alive';
  const indicatorText = status === 'unknown' ? 'UNKNOWN' : isAlive ? 'LIVE' : 'DEAD';
  const indicatorDotClass = status === 'unknown' ? '' : isAlive ? styles.aliveDot : styles.deadDot;

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
            {originName && originName !== 'unknown' ? `, from ${originName}` : ''}
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
            {locationName}
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