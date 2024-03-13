'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import characters from './data/characters.json';
import styles from '../styles/index.module.scss';

const CharacterCarousel = () => {
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCharacterSelect = (id) => {
    if (selectedCharacters.includes(id)) {
      setSelectedCharacters(selectedCharacters.filter((characterId) => characterId !== id));
    } else {
      setSelectedCharacters([...selectedCharacters, id]);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? characters.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === characters.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <section className={styles.characterCarousel}>
        <AnimatePresence initial={false} mode='wait'>
          <motion.figure
            key={currentIndex}
            initial={{ x: '100%', opacity: 0, scale: 0.7 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: '-100%', opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.5 }}
            className={styles.carouselItem}
          >
            <Image
              src={characters[currentIndex].image}
              alt={characters[currentIndex].name}
              width={500}
              height={500}
            />
            <figcaption>{characters[currentIndex].name}</figcaption>
          </motion.figure>
        </AnimatePresence>
        <input
          type="checkbox"
          checked={selectedCharacters.includes(characters[currentIndex].id)}
          onChange={() => handleCharacterSelect(characters[currentIndex].id)}
        />
      </section>
      <nav className={styles.carouselControls}>
        <button className={`${styles.carouselButton} ${styles.prevButton}`} onClick={handlePrevious}>
          <span className={styles.goldButton}>Anterior</span>
        </button>
        <button className={`${styles.carouselButton} ${styles.nextButton}`} onClick={handleNext}>
          <span className={styles.goldButton}>Siguiente</span>
        </button>
      </nav>
    </>
  );
};

export default CharacterCarousel;