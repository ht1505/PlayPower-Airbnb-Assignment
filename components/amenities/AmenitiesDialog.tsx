"use client";

import { useMemo } from "react";
import type { Amenity } from "@/lib/types";
import ModalShell from "@/components/common/ModalShell";
import styles from "./AmenitiesDialog.module.css";

interface AmenitiesDialogProps {
  amenities: Amenity[];
  onClose: () => void;
}

export default function AmenitiesDialog({
  amenities,
  onClose,
}: AmenitiesDialogProps) {
  const grouped = useMemo(() => {
    const groups: Record<string, Amenity[]> = {};
    for (const amenity of amenities) {
      if (!groups[amenity.category]) {
        groups[amenity.category] = [];
      }
      groups[amenity.category].push(amenity);
    }
    return Object.entries(groups);
  }, [amenities]);

  return (
    <ModalShell
      variant="dialog"
      title="What this place offers"
      onClose={onClose}
    >
      {grouped.map(([category, items]) => (
        <div key={category} className={styles.category}>
          <h3 className={styles.categoryTitle}>{category}</h3>
          {items.map((amenity) => (
            <div
              key={amenity.id}
              className={`${styles.amenityRow} ${!amenity.available ? styles.amenityUnavailable : ""}`}
            >
              <span className={styles.amenityIcon}>
                {amenity.available ? (
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                )}
              </span>
              <span>
                {amenity.name}
                {!amenity.available && " – unavailable"}
              </span>
            </div>
          ))}
        </div>
      ))}
    </ModalShell>
  );
}
