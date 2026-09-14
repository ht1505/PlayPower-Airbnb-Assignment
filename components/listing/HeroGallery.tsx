"use client";

import type { Photo } from "@/lib/types";
import { getPlaceholderGradient } from "@/lib/utils";
import styles from "./HeroGallery.module.css";

interface HeroGalleryProps {
  photos: Photo[];
  onShowAllPhotos: () => void;
  onPhotoClick: (index: number) => void;
}

export default function HeroGallery({
  photos,
  onShowAllPhotos,
  onPhotoClick,
}: HeroGalleryProps) {
  const heroPhotos = photos.slice(0, 5);

  return (
    <div className={styles.gallery}>
      {heroPhotos.map((photo, i) => (
        <button
          key={photo.id}
          type="button"
          className={`${styles.imageWrapper} ${i === 0 ? styles.mainImage : ""}`}
          onClick={() => onPhotoClick(i)}
          aria-label={photo.alt}
        >
          {photo.src && !photo.src.includes("placeholder.svg") ? (
            <img
              src={photo.src}
              alt={photo.alt}
              className={styles.photoImg}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ) : (
            <div
              className={styles.imagePlaceholder}
              style={{ background: getPlaceholderGradient(photo.category, photo.categoryIndex) }}
            >
              {photo.category} {photo.categoryIndex}
            </div>
          )}
          <div className={styles.hoverOverlay} />
        </button>
      ))}

      <button
        type="button"
        className={styles.showAllButton}
        onClick={onShowAllPhotos}
      >
        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
          <circle cx="3" cy="8" r="1.5" />
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="13" cy="8" r="1.5" />
          <circle cx="3" cy="3" r="1.5" />
          <circle cx="8" cy="3" r="1.5" />
          <circle cx="13" cy="3" r="1.5" />
          <circle cx="3" cy="13" r="1.5" />
          <circle cx="8" cy="13" r="1.5" />
          <circle cx="13" cy="13" r="1.5" />
        </svg>
        Show all photos
      </button>
    </div>
  );
}
