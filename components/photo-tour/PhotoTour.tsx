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

/* Per-category room features shown under the heading */
const CATEGORY_FEATURES: Partial<Record<PhotoCategory, string>> = {
  "Living room 1": "Sofa · Air conditioning · Ceiling fan · TV",
  "Living room 2": "Ceiling fan · Hot tub",
  "Full kitchen":
    "Freezer · Fridge · Blender · Cooker · Cooking basics · Kettle · Microwave · Toaster · Wine glasses · Coffee · Crockery and cutlery",
  Bedroom:
    "Double bed · Air conditioning · Bed linen · Ceiling fan · Clothes storage · Cot · Hangers · Iron · Room-darkening blinds · Cleaning available during stay · Cleaning products · Long-term stays allowed · Private entrance · Wifi",
  "Full bathroom":
    "Hair dryer · Shower · Hot water · Shampoo · Body soap · Towels",
  Gym: "Gym equipment · Exercise bike · Weights",
  Exterior: "Garden · Outdoor seating · BBQ grill",
  Pool: "Private pool · Sun loungers · Towels provided",
  "Additional photos": "",
};

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

  /* Group photos by category, preserving insertion order */
  const categories = useMemo(() => {
    const map = new Map<PhotoCategory, Photo[]>();
    for (const photo of photos) {
      const existing = map.get(photo.category);
      if (existing) existing.push(photo);
      else map.set(photo.category, [photo]);
    }
    return Array.from(map.entries());
  }, [photos]);

  /* Track active category as user scrolls */
  useEffect(() => {
    const overlay = document.querySelector('[role="dialog"]') as HTMLElement | null;
    if (!overlay) return;

    const handleScroll = () => {
      const offset = 220;
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
      if (categories.length > 0) setActiveCategory(categories[0][0]);
    };

    overlay.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => overlay.removeEventListener("scroll", handleScroll);
  }, [categories]);

  /* Scroll nav chip into view when active changes */
  useEffect(() => {
    if (!activeCategory || !navRef.current) return;
    const btn = navRef.current.querySelector<HTMLElement>(
      `[data-category="${CSS.escape(activeCategory)}"]`,
    );
    btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeCategory]);

  const scrollToCategory = useCallback((category: PhotoCategory) => {
    const el = categoryRefs.current[category];
    if (!el) return;
    setActiveCategory(category);
    const overlay = document.querySelector('[role="dialog"]') as HTMLElement | null;
    if (overlay) {
      const navHeight = 64 + 120; /* modal header + sticky nav */
      const top = el.offsetTop - navHeight;
      overlay.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  const getGlobalIndex = useCallback(
    (photo: Photo) => photos.findIndex((p) => p.id === photo.id),
    [photos],
  );

  function PhotoImg({ photo }: { photo: Photo }) {
    if (photo.src && !photo.src.includes("placeholder.svg")) {
      return (
        <img
          src={photo.src}
          alt={photo.alt}
          className={styles.photoImg}
          loading="lazy"
        />
      );
    }
    return (
      <div
        className={styles.photoPlaceholder}
        style={{ background: getPlaceholderGradient(photo.category, photo.categoryIndex) }}
      />
    );
  }

  return (
    <ModalShell
      onClose={onClose}
      title="Photo tour"
      headerRight={
        <>
          <button type="button" className={styles.headerAction} onClick={onShare}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" strokeLinecap="round" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
            Share
          </button>
          <button type="button" className={styles.headerAction} onClick={onSave}>
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill={saved ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            {saved ? "Saved" : "Save"}
          </button>
        </>
      }
    >
      {/* ── Category navigation strip ── */}
      <div className={styles.categoryNav} ref={navRef}>
        {categories.map(([category, categoryPhotos]) => {
          const preview = categoryPhotos[0];
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              data-category={category}
              className={`${styles.categoryButton} ${isActive ? styles.categoryButtonActive : ""}`}
              onClick={() => scrollToCategory(category)}
            >
              <div className={styles.categoryThumb}>
                {preview.src && !preview.src.includes("placeholder.svg") ? (
                  <img
                    src={preview.src}
                    alt=""
                    className={styles.categoryThumbImage}
                  />
                ) : (
                  <div
                    className={styles.categoryThumbPlaceholder}
                    style={{ background: getPlaceholderGradient(preview.category, preview.categoryIndex) }}
                  />
                )}
              </div>
              <span className={styles.categoryLabel}>{category}</span>
            </button>
          );
        })}
      </div>

      {/* ── Category sections ── */}
      <div className={styles.sections}>
        {categories.map(([category, categoryPhotos]) => {
          const [firstPhoto, ...restPhotos] = categoryPhotos;
          const features = CATEGORY_FEATURES[category];

          return (
            <div
              key={category}
              ref={(el) => { categoryRefs.current[category] = el; }}
              className={styles.categorySection}
              id={`photo-category-${category.replace(/\s+/g, "-").toLowerCase()}`}
            >
              {/* Two-column row */}
              <div className={styles.categoryRow}>
                {/* Left: heading + features */}
                <div className={styles.categoryInfo}>
                  <h2 className={styles.categoryTitle}>{category}</h2>
                  {features && (
                    <p className={styles.categoryFeatures}>{features}</p>
                  )}
                </div>

                {/* Right: photos */}
                <div className={styles.photoStack}>
                  {/* First photo — full width */}
                  <button
                    type="button"
                    className={`${styles.photoButton} ${styles.photoButtonHero}`}
                    onClick={() => onPhotoClick(getGlobalIndex(firstPhoto))}
                    aria-label={firstPhoto.alt}
                  >
                    <PhotoImg photo={firstPhoto} />
                  </button>

                  {/* Remaining photos — 2-column grid */}
                  {restPhotos.length > 0 && (
                    <div className={styles.photoGrid}>
                      {restPhotos.map((photo) => (
                        <button
                          key={photo.id}
                          type="button"
                          className={styles.photoButton}
                          onClick={() => onPhotoClick(getGlobalIndex(photo))}
                          aria-label={photo.alt}
                        >
                          <PhotoImg photo={photo} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ModalShell>
  );
}
