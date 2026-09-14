"use client";

import { useState } from "react";
import type { Review, ReviewCategory } from "@/lib/types";
import styles from "./ReviewsSection.module.css";

interface ReviewsSectionProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
  categories: ReviewCategory[];
  guestFavourite: boolean;
  onShowAllReviews?: () => void;
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

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const needsExpand = review.text.length > 150;

  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewHeader}>
        <div className={styles.reviewAvatar}>
          {review.guestName.charAt(0)}
        </div>
        <div className={styles.reviewInfo}>
          <h4>{review.guestName}</h4>
          <p>{review.guestLocation || review.date}</p>
        </div>
      </div>
      <div className={styles.reviewStars}>
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} filled={i < review.rating} />
        ))}
        <span style={{ fontSize: 14, color: "var(--text-secondary)", marginLeft: 6 }}>
          {review.date}
        </span>
      </div>
      <p className={styles.reviewText} data-clamped={needsExpand && !expanded}>
        {review.text}
      </p>
      {needsExpand && (
        <button
          type="button"
          className={styles.reviewShowMore}
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}

export default function ReviewsSection({
  reviews,
  rating,
  reviewCount,
  categories,
  guestFavourite,
  onShowAllReviews,
}: ReviewsSectionProps) {
  return (
    <section className={styles.reviews} id="section-reviews">
      {/* Rating header */}
      <div className={styles.ratingHeader}>
        <div className={styles.ratingBadge}>
          {guestFavourite && (
            <div className={styles.ratingIcon}>
              <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
                <path
                  d="M16 28C7 22 2 17 2 11a6 6 0 0112 0h4a6 6 0 0112 0c0 6-5 11-14 17Z"
                  fill="url(#rev-grad)"
                  stroke="var(--brand)"
                  strokeWidth="1.5"
                />
                <defs>
                  <linearGradient id="rev-grad" x1="2" y1="5" x2="30" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF385C" />
                    <stop offset="1" stopColor="#BD1E59" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}
          <span className={styles.ratingScore}>{rating}</span>
          <div className={styles.ratingMeta}>
            {guestFavourite && <span className={styles.ratingLabel}>Guest favourite</span>}
            <span className={styles.ratingReviewCount}>{reviewCount} reviews</span>
          </div>
        </div>
        <p className={styles.ratingDescription}>
          One of the most loved homes on Airbnb, according to guests
        </p>
      </div>

      {/* Category breakdown */}
      <div className={styles.categories}>
        {categories.map((cat) => (
          <div key={cat.name} className={styles.categoryChip}>
            <span>{cat.name}</span>
            <span className={styles.categoryScore}>{cat.score.toFixed(1)}</span>
          </div>
        ))}
      </div>

      {/* Review cards */}
      <div className={styles.reviewGrid}>
        {reviews.slice(0, 6).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <button
        type="button"
        className={styles.showAll}
        onClick={onShowAllReviews}
      >
        Show all {reviewCount} reviews
      </button>
    </section>
  );
}
