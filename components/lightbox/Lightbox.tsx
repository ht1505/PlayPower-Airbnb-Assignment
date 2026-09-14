"use client";

import { useEffect, useRef, useCallback } from "react";
import type { Photo } from "@/lib/types";
import { getPlaceholderGradient } from "@/lib/utils";
import styles from "./Lightbox.module.css";

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onChange: (index: number) => void;
}

export default function Lightbox({
  photos,
  currentIndex,
  onClose,
  onChange,
}: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<Element | null>(null);

  const photo = photos[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === photos.length - 1;

  const goPrev = useCallback(() => {
    if (currentIndex > 0) onChange(currentIndex - 1);
  }, [currentIndex, onChange]);

  const goNext = useCallback(() => {
    if (currentIndex < photos.length - 1) onChange(currentIndex + 1);
  }, [currentIndex, photos.length, onChange]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Store triggering element for focus return
  useEffect(() => {
    triggerRef.current = document.activeElement;
    closeRef.current?.focus();
    return () => {
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      // Ignore if focus is in input/textarea/contenteditable
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          onClose();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goPrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          goNext();
          break;
      }
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose, goPrev, goNext]);

  if (!photo) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${currentIndex + 1} of ${photos.length}`}
    >
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <span>{photo.category}</span>
          <span>
            {currentIndex + 1} / {photos.length}
          </span>
        </div>
        <button
          ref={closeRef}
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className={styles.body}>
        <button
          type="button"
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={goPrev}
          disabled={isFirst}
          aria-label="Previous photo"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className={styles.imageContainer}>
          {photo.src && !photo.src.includes("placeholder.svg") ? (
            <img
              src={photo.src}
              alt={photo.alt}
              className={styles.photoImg}
            />
          ) : (
            <div
              className={styles.imagePlaceholder}
              style={{ background: getPlaceholderGradient(photo.category, photo.categoryIndex) }}
            >
              {photo.category} {photo.categoryIndex}
            </div>
          )}
        </div>

        <button
          type="button"
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={goNext}
          disabled={isLast}
          aria-label="Next photo"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
