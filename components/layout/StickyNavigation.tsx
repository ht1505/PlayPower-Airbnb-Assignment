"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import styles from "./StickyNavigation.module.css";

interface StickyNavigationProps {
  galleryRef: React.RefObject<HTMLDivElement | null>;
  rating: number;
  pricePerNight: number;
}

const TABS = [
  { id: "photos", label: "Photos", sectionId: "section-gallery" },
  { id: "amenities", label: "Amenities", sectionId: "section-amenities" },
  { id: "reviews", label: "Reviews", sectionId: "section-reviews" },
  { id: "location", label: "Location", sectionId: "section-location" },
];

export default function StickyNavigation({
  galleryRef,
  rating,
  pricePerNight,
}: StickyNavigationProps) {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("photos");
  const isScrollingRef = useRef(false);

  // Show/hide based on gallery visibility
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(gallery);
    return () => observer.disconnect();
  }, [galleryRef]);

  // Track active section based on scroll
  useEffect(() => {
    function handleScroll() {
      if (isScrollingRef.current) return;

      const headerOffset = 88 + 66 + 20;
      for (let i = TABS.length - 1; i >= 0; i--) {
        const el = document.getElementById(TABS[i].sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerOffset) {
            setActiveTab(TABS[i].id);
            return;
          }
        }
      }
      setActiveTab(TABS[0].id);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string, tabId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    setActiveTab(tabId);
    isScrollingRef.current = true;

    const headerOffset = 88 + 66;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  }, []);

  return (
    <nav
      className={cn(styles.nav, visible && styles.navVisible)}
      aria-label="Listing navigation"
    >
      <div className={styles.navInner}>
        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={cn(styles.tab, activeTab === tab.id && styles.tabActive)}
              onClick={() => scrollToSection(tab.sectionId, tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.rightSection}>
          <div className={styles.priceInfo}>
            <span className={styles.priceAmount}>
              {formatCurrency(pricePerNight)}
            </span>
            <span className={styles.priceNight}>night</span>
          </div>

          <div className={styles.ratingInfo}>
            <svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor">
              <path d="M6 1l1.5 3.1L11 4.5 8.5 7l.6 3.5L6 8.8 2.9 10.5l.6-3.5L1 4.5l3.5-.4L6 1z" />
            </svg>
            {rating}
          </div>

          <button type="button" className={styles.reserveSmall}>
            Reserve
          </button>
        </div>
      </div>
    </nav>
  );
}
