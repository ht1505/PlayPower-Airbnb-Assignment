"use client";

import { useRef, useEffect, useMemo, useCallback, useState } from "react";
import type { Photo, PhotoCategory } from "@/lib/types";
import { getPlaceholderGradient } from "@/lib/utils";
import ModalShell from "@/components/common/ModalShell";
import styles from "./PhotoTour.module.css";

interface PhotoTourProps {
  photos: Photo[];
  onPhotoClick: (globalIndex: number) => void;
  onClose: () => void;
  onShare: () => void;
  onSave: () => void;
  saved: boolean;
}

export default function PhotoTour({
  photos,
  onPhotoClick,
  onClose,
  onShare,
  onSave,
  saved,
}: PhotoTourProps) {
  const [activeCategory, setActiveCategory] = useState<PhotoCategory | null>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const navRef = useRef<HTMLDivElement>(null);

  // Group photos by category, preserving order
  const categories = useMemo(() => {
    const map = new Map<PhotoCategory, Photo[]>();
    for (const photo of photos) {
      const existing = map.get(photo.category);
      if (existing) {
        existing.push(photo);
      } else {
        map.set(photo.category, [photo]);
      }
    }
    return Array.from(map.entries());
  }, [photos]);

  // Track active category based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = 200;
      for (let i = categories.length - 1; i >= 0; i--) {
        const el = categoryRefs.current[categories[i][0]];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            setActiveCategory(categories[i][0]);
            return;
          }
        }
      }
      if (categories.length > 0) {
        setActiveCategory(categories[0][0]);
      }
    };

    // The scroll container is the modal overlay itself
    const overlay = document.querySelector('[role="dialog"]') as HTMLElement | null;
    if (overlay) {
      overlay.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => overlay.removeEventListener("scroll", handleScroll);
    }
  }, [categories]);

  const scrollToCategory = useCallback((category: PhotoCategory) => {
    const el = categoryRefs.current[category];
    if (el) {
      setActiveCategory(category);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const getGlobalIndex = useCallback(
    (photo: Photo) => photos.findIndex((p) => p.id === photo.id),
    [photos],
  );

  return (
    <ModalShell
      onClose={onClose}
      title="Photo tour"
      headerRight={
        <>
          <button type="button" className={styles.headerAction} onClick={onShare}>
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 10v4h12v-4" />
              <path d="M8 2v8" />
              <path d="M4 5l4-3 4 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Share
          </button>
          <button type="button" className={styles.headerAction} onClick={onSave}>
            <svg viewBox="0 0 16 16" width="14" height="14" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
              <path d="M8 14S1 9 1 5.5a3.5 3.5 0 017 0 3.5 3.5 0 017 0C15 9 8 14 8 14z" />
            </svg>
            {saved ? "Saved" : "Save"}
          </button>
        </>
      }
    >
      <div className={styles.container}>
        {/* Category navigation */}
        <div className={styles.categoryNav} ref={navRef}>
  {categories.map(([category, categoryPhotos]) => {
    const previewPhoto = categoryPhotos[0];

    return (
      <button
        key={category}
        type="button"
        className={`${styles.categoryButton} ${
          activeCategory === category
            ? styles.categoryButtonActive
            : ""
        }`}
        onClick={() => scrollToCategory(category)}
      >
        <div className={styles.categoryThumbnail}>
          {previewPhoto.src &&
          !previewPhoto.src.includes("placeholder.svg") ? (
            <img
              src={previewPhoto.src}
              alt=""
              className={styles.categoryThumbnailImage}
            />
          ) : (
            <div
              className={styles.categoryThumbnailPlaceholder}
              style={{
                background: getPlaceholderGradient(
                  previewPhoto.category,
                  previewPhoto.categoryIndex,
                ),
              }}
            />
          )}
        </div>

        <span className={styles.categoryName}>
          {category}
        </span>

        <span className={styles.categoryCount}>
          {categoryPhotos.length}
        </span>
      </button>
    );
  })}
</div>

        {/* Category sections */}
        {categories.map(([category, categoryPhotos]) => (
          <div
            key={category}
            ref={(el) => { categoryRefs.current[category] = el; }}
            className={styles.categorySection}
            id={`photo-category-${category.replace(/\s+/g, "-").toLowerCase()}`}
          >
            <h2 className={styles.categoryTitle}>{category}</h2>
            <div className={styles.photoGrid}>
              {categoryPhotos.map((photo) => (
                <button
                  key={photo.id}
                  type="button"
                  className={styles.photoButton}
                  onClick={() => onPhotoClick(getGlobalIndex(photo))}
                  aria-label={photo.alt}
                >
                  {photo.src && !photo.src.includes("placeholder.svg") ? (
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className={styles.photoImg}
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className={styles.photoPlaceholder}
                      style={{ background: getPlaceholderGradient(photo.category, photo.categoryIndex) }}
                    >
                      {photo.category} {photo.categoryIndex}
                    </div>
                  )}
                  <div className={styles.photoOverlay} />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ModalShell>
  );
}
