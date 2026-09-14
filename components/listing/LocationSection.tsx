import styles from "./LocationSection.module.css";

interface LocationSectionProps {
  location: string;
}

export default function LocationSection({ location }: LocationSectionProps) {
  return (
    <section className={styles.location} id="section-location">
      <h2>Where you&apos;ll be — {location}</h2>

      <div className={styles.mapContainer}>
        <div className={styles.water} />

        <div className={styles.mapGrid} />

        <div className={`${styles.mapCircle} ${styles.circleOne}`} />
        <div className={`${styles.mapCircle} ${styles.circleTwo}`} />

        {/* Search */}
        <button
          type="button"
          className={styles.searchButton}
          aria-label="Search this area"
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" strokeLinecap="round" />
          </svg>
        </button>

        {/* Property marker */}
        <div className={styles.propertyMarker}>
          <svg
            viewBox="0 0 32 32"
            width="32"
            height="32"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 14.5 16 6l10 8.5" />
            <path d="M8 13v13h16V13" />
            <path d="M13 26v-7h6v7" />
          </svg>
        </div>

        {/* Map controls */}
        <div className={styles.mapControls}>
          <button
            type="button"
            className={styles.mapControlButton}
            aria-label="Zoom in"
          >
            <svg
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M8 3v10M3 8h10" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            className={styles.mapControlButton}
            aria-label="Zoom out"
          >
            <svg
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 8h10" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.locationInfo}>
        <h3>Candolim, Goa, India</h3>

        <p>
          Nestled in the heart of North Goa, Candolim is a charming coastal
          village known for its stunning beach, vibrant nightlife, and a
          wonderful blend of Portuguese and Indian culture. The area offers
          easy access to popular attractions, local markets, and a variety of
          dining options.
        </p>

        <p className={styles.privacyNote}>
          Exact location will be provided after booking.
        </p>
      </div>
    </section>
  );
}