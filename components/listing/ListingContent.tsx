"use client";

import { useState } from "react";
import type { Property, Amenity } from "@/lib/types";
import styles from "./ListingContent.module.css";

interface ListingContentProps {
  property: Property;
  amenities: Amenity[];
  onShowAllAmenities: () => void;
}

function AmenityIcon({ name }: { name: string }) {
  const n = name.toLowerCase();
  if (n.includes("kitchen"))
    return (<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 3v4a1 1 0 001 1h6a1 1 0 001-1V3" /><path d="M3 8h18v13H3z" /><path d="M12 12v5" strokeLinecap="round" /></svg>);
  if (n.includes("wifi"))
    return (<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12.55a11 11 0 0114.08 0" /><path d="M1.42 9a16 16 0 0121.16 0" /><path d="M8.53 16.11a6 6 0 016.95 0" /><circle cx="12" cy="20" r="1" fill="currentColor" /></svg>);
  if (n.includes("pool"))
    return (<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12c1.5 2 3.5 2 5 0s3.5-2 5 0 3.5 2 5 0" strokeLinecap="round" /><path d="M2 17c1.5 2 3.5 2 5 0s3.5-2 5 0 3.5 2 5 0" strokeLinecap="round" /><circle cx="7" cy="5" r="2" /><path d="M7 7v3h4l2-3" strokeLinecap="round" /></svg>);
  if (n.includes("workspace") || n.includes("desk"))
    return (<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="11" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /><path d="M2 13h20" /></svg>);
  if (n.includes("parking"))
    return (<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 17V7h4a3 3 0 010 6H9" strokeLinecap="round" /></svg>);
  if (n.includes("hot tub") || n.includes("jacuzzi"))
    return (<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 14h16M4 10h16" strokeLinecap="round" /><path d="M8 6c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2" /><path d="M2 18h20v2H2z" /></svg>);
  if (n.includes("pet"))
    return (<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="4.5" cy="6.5" r="1.5" /><circle cx="9.5" cy="3.5" r="1.5" /><circle cx="14.5" cy="3.5" r="1.5" /><circle cx="19.5" cy="6.5" r="1.5" /><path d="M17 12c0 2.8-2.2 6-5 8.5C9.2 18 7 14.8 7 12c0-2.8 2.2-5 5-5s5 2.2 5 5z" /></svg>);
  if (n.includes("camera") || n.includes("security"))
    return (<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" /></svg>);
  if (n.includes("tv") || n.includes("television"))
    return (<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="14" rx="2" /><path d="M8 20h8M12 18v2" strokeLinecap="round" /></svg>);
  if (n.includes("refrigerator") || n.includes("fridge"))
    return (<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M5 10h14" /><path d="M9 6v2M9 14v2" strokeLinecap="round" /></svg>);
  // Default
  return (<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>);
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
          {prop.sleepingArrangements.map((arrangement, idx) => (
            <div key={arrangement.room} className={styles.sleepingCard}>
              <div className={styles.sleepingCardImage}>
                {idx === 0 ? (
                  <img src="/images/property/bedroom_bed_straight_on.jpg" alt="Bedroom" className={styles.sleepingImg} loading="lazy" />
                ) : (
                  <img src="/images/property/living_room_wide.jpg" alt="Living room" className={styles.sleepingImg} loading="lazy" />
                )}
              </div>
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
                <AmenityIcon name={amenity.name} />
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
