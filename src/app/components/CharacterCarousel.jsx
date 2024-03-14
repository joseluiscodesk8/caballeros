"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import Image from "next/image";
import characters from "./data/characters.json";
import styles from "../styles/index.module.scss";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.7,
    rotateY: direction > 0 ? -90 : 90, 
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0, 
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.7,
    rotateY: direction < 0 ? -90 : 90, 
  }),
};



const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

const CharacterCarousel = () => {
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, characters.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
    setCurrentIndex((prevIndex) => wrap(0, characters.length - 1, prevIndex + newDirection));
  };

  const handleCharacterSelect = (id) => {
    if (selectedCharacters.includes(id)) {
      setSelectedCharacters(
        selectedCharacters.filter((characterId) => characterId !== id)
      );
    } else {
      setSelectedCharacters([...selectedCharacters, id]);
    }
  };

  return (
    <>
      <section className={styles.characterCarousel}>
        <AnimatePresence initial={false} mode="wait">
          <motion.figure
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className={styles.carouselItem}
          >
            <Image
              src={characters[currentIndex].image}
              alt={characters[currentIndex].name}
              width={500}
              height={500}
              priority={true}
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
        <button
          className={`${styles.carouselButton} ${styles.prevButton}`}
          onClick={() => paginate(-1)}
        >
          <span className={styles.goldButton}>Anterior</span>
        </button>
        <button
          className={`${styles.carouselButton} ${styles.nextButton}`}
          onClick={() => paginate(1)}
        >
          <span className={styles.goldButton}>Siguiente</span>
        </button>
      </nav>
    </>
  );
};

export default CharacterCarousel;
