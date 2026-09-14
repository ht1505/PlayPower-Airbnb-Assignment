"use client";

import { useState } from "react";
import type { Property, Amenity } from "@/lib/types";
import styles from "./ListingContent.module.css";

interface ListingContentProps {
  property: Property;
  amenities: Amenity[];
  onShowAllAmenities: () => void;
}

function HighlightIcon({ name }: { name: string }) {
  if (name.includes("entertainment"))
    return (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="7" width="20" height="13" rx="2" />
        <path d="M17 2l-5 5-5-5" />
      </svg>
    );
  if (name.includes("cool"))
    return (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M2 12h20M6 6l12 12M18 6L6 18" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

export default function ListingContent({
  property: prop,
  amenities,
  onShowAllAmenities,
}: ListingContentProps) {
  const [descExpanded, setDescExpanded] = useState(false);
  const previewAmenities = amenities.filter((a) => a.available).slice(0, 6);

  return (
    <div>
      {/* Property summary */}
      <div className={styles.propertySummary}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>
          {prop.propertyType} in {prop.location}
        </h2>
        <div className={styles.propertyMeta}>
          <span>{prop.guests} guests</span>
          <span className={styles.dot} />
          <span>{prop.bedrooms} bedroom</span>
          <span className={styles.dot} />
          <span>{prop.beds} beds</span>
          <span className={styles.dot} />
          <span>{prop.bathrooms} bath</span>
        </div>
      </div>

      {/* Guest favourite */}
      {prop.guestFavourite && (
        <div className={styles.guestFavourite}>
          <div className={styles.favouriteBadge}>
            <div className={styles.favouriteIcon}>
              <svg viewBox="0 0 32 32" width="32" height="32" fill="none">
                <path
                  d="M16 28C7 22 2 17 2 11a6 6 0 0112 0h4a6 6 0 0112 0c0 6-5 11-14 17Z"
                  fill="url(#fav-grad)"
                  stroke="var(--brand)"
                  strokeWidth="1.5"
                />
                <defs>
                  <linearGradient id="fav-grad" x1="2" y1="5" x2="30" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF385C" />
                    <stop offset="1" stopColor="#BD1E59" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className={styles.favouriteStats}>
              <span className={styles.favouriteRating}>{prop.rating}</span>
              <span className={styles.favouriteLabel}>Guest favourite</span>
            </div>
            <div style={{ width: 1, height: 40, background: "var(--border-light)" }} />
            <div className={styles.favouriteStats}>
              <span className={styles.favouriteReviews}>
                {prop.reviewCount} reviews
              </span>
            </div>
          </div>
          <p className={styles.favouriteDescription}>
            One of the most loved homes on Airbnb, according to guests
          </p>
        </div>
      )}

      {/* Host preview */}
      <div className={styles.hostPreview}>
        <div className={styles.hostAvatar}>
          {prop.host.name.charAt(0)}
        </div>
        <div className={styles.hostInfo}>
          <h3>Hosted by {prop.host.name}</h3>
          <p>{prop.host.hostingDuration} hosting</p>
        </div>
      </div>

      {/* Highlights */}
      <div className={styles.highlights}>
        {prop.highlights.map((highlight) => (
          <div key={highlight} className={styles.highlightItem}>
            <div className={styles.highlightIcon}>
              <HighlightIcon name={highlight.toLowerCase()} />
            </div>
            <div className={styles.highlightText}>
              <h4>{highlight}</h4>
              <p>
                {highlight.includes("entertainment")
                  ? "Enjoy the outdoor spaces with entertainment facilities"
                  : highlight.includes("cool")
                    ? "Air conditioning and fans keep this place comfortable"
                    : "Check yourself in with the lockbox"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className={styles.description}>
        <p
          className={styles.descriptionText}
          data-clamped={!descExpanded}
        >
          {prop.description}
        </p>
        <button
          type="button"
          className={styles.showMoreButton}
          onClick={() => setDescExpanded((v) => !v)}
          aria-expanded={descExpanded}
        >
          {descExpanded ? "Show less" : "Show more"}
          <svg
            viewBox="0 0 12 12"
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ transform: descExpanded ? "rotate(180deg)" : undefined }}
          >
            <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Sleeping arrangements */}
      <div className={styles.sleeping} id="section-sleeping">
        <h2>Where you&apos;ll sleep</h2>
        <div className={styles.sleepingGrid}>
          {prop.sleepingArrangements.map((arrangement) => (
            <div key={arrangement.room} className={styles.sleepingCard}>
              <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="12" width="28" height="14" rx="2" />
                <path d="M2 20h28" />
                <path d="M6 12V8a2 2 0 012-2h16a2 2 0 012 2v4" />
              </svg>
              <h3>{arrangement.room}</h3>
              <p>{arrangement.bed}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities preview */}
      <div className={styles.amenitiesPreview} id="section-amenities">
        <h2>What this place offers</h2>
        <div className={styles.amenitiesList}>
          {previewAmenities.map((amenity) => (
            <div key={amenity.id} className={styles.amenityItem}>
              <span className={styles.amenityIcon}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {amenity.name}
            </div>
          ))}
        </div>
        <button
          type="button"
          className={styles.showAllAmenities}
          onClick={onShowAllAmenities}
        >
          Show all {prop.amenitiesCount} amenities
        </button>
      </div>
    </div>
  );
}
