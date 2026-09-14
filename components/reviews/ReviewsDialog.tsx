"use client";

import { useState, useMemo } from "react";
import type { Review, ReviewCategory } from "@/lib/types";
import ModalShell from "@/components/common/ModalShell";
import styles from "./ReviewsDialog.module.css";

interface ReviewsDialogProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
  categories: ReviewCategory[];
  guestFavourite: boolean;
  onClose: () => void;
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 12 12" width="12" height="12">
      <path
        d="M6 1l1.5 3.1L11 4.5 8.5 7l.6 3.5L6 8.8 2.9 10.5l.6-3.5L1 4.5l3.5-.4L6 1z"
        fill={filled ? "var(--text-primary)" : "var(--border)"}
      />
    </svg>
  );
}

export default function ReviewsDialog({
  reviews,
  rating,
  reviewCount,
  categories,
  onClose,
}: ReviewsDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReviews = useMemo(() => {
    if (!searchQuery.trim()) return reviews;
    const q = searchQuery.toLowerCase();
    return reviews.filter(
      (r) =>
        r.text.toLowerCase().includes(q) ||
        r.guestName.toLowerCase().includes(q) ||
        (r.guestLocation && r.guestLocation.toLowerCase().includes(q)),
    );
  }, [reviews, searchQuery]);

  return (
    <ModalShell onClose={onClose} title="Reviews" variant="dialog">
      <div className={styles.container}>
        {/* Left Sidebar: Ratings breakdown */}
        <aside className={styles.sidebar}>
          <div className={styles.ratingHeader}>
            <span className={styles.ratingScore}>★ {rating.toFixed(2)}</span>
            <div className={styles.ratingMeta}>
              <span className={styles.ratingLabel}>Overall rating</span>
              <span className={styles.ratingCount}>{reviewCount} reviews</span>
            </div>
          </div>

          <div className={styles.categoryList}>
            {categories.map((cat) => (
              <div key={cat.name} className={styles.categoryItem}>
                <div className={styles.categoryRow}>
                  <span className={styles.categoryName}>{cat.name}</span>
                  <span className={styles.categoryScore}>{cat.score.toFixed(1)}</span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${(cat.score / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Content: Search and list */}
        <div className={styles.content}>
          <div className={styles.searchBox}>
            <svg
              className={styles.searchIcon}
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="7" cy="7" r="5" />
              <path d="M11 11l4 4" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search reviews"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search reviews"
            />
          </div>

          <div className={styles.reviewsCount}>
            {filteredReviews.length} {filteredReviews.length === 1 ? "review" : "reviews"}
            {searchQuery && ` matching "${searchQuery}"`}
          </div>

          <div className={styles.reviewsList}>
            {filteredReviews.length === 0 ? (
              <p className={styles.emptyMessage}>No reviews found matching &quot;{searchQuery}&quot;</p>
            ) : (
              filteredReviews.map((review) => (
                <article key={review.id} className={styles.reviewItem}>
                  <div className={styles.reviewer}>
                    <div className={styles.avatar}>
                      {review.guestName.charAt(0)}
                    </div>
                    <div className={styles.reviewerMeta}>
                      <h4>{review.guestName}</h4>
                      <p>{review.guestLocation || review.date}</p>
                    </div>
                  </div>

                  <div className={styles.stars}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon key={i} filled={i < review.rating} />
                    ))}
                    <span className={styles.reviewDate}>{review.date}</span>
                  </div>

                  <p className={styles.reviewText}>{review.text}</p>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
