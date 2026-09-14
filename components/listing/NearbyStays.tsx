"use client";

import { useState, useMemo } from "react";
import type { NearbyStay } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import styles from "./NearbyStays.module.css";

interface NearbyStaysProps {
  stays: NearbyStay[];
}

const ITEMS_PER_PAGE = 4;


export default function NearbyStays({ stays }: NearbyStaysProps) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(stays.length / ITEMS_PER_PAGE);

  const visibleStays = useMemo(
    () => stays.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE),
    [stays, page],
  );

  return (
    <section className={styles.nearby}>
      <h2>More places to stay nearby</h2>

      <div className={styles.carouselWrapper}>
        <div className={styles.carousel}>
          {visibleStays.map((stay) => (
            <div key={stay.id} className={styles.card}>
              <div className={styles.cardImage}>
              <img
                src={stay.image}
                alt={stay.title}
                className={styles.cardImageElement}
              />
              </div>
              <h3 className={styles.cardTitle}>{stay.title}</h3>
              <div className={styles.cardMeta}>
                <span className={styles.cardPrice}>
                  <span>{formatCurrency(stay.price)}</span> night
                </span>
                <span className={styles.cardRating}>
                  <svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor">
                    <path d="M6 1l1.5 3.1L11 4.5 8.5 7l.6 3.5L6 8.8 2.9 10.5l.6-3.5L1 4.5l3.5-.4L6 1z" />
                  </svg>
                  {stay.rating}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <button
          type="button"
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 0}
          aria-label="Previous"
        >
          <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 2L4 6l4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= totalPages - 1}
          aria-label="Next"
        >
          <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className={styles.pageIndicator}>
        {page + 1} / {totalPages}
      </div>
    </section>
  );
}
